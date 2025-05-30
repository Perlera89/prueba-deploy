"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import {
  useFetchPostReplies,
  useSaveReply,
  useUpdateReply,
} from "@/hooks/forum/use-reply";
import { PostReply } from "@/schema/post";
import { DiscussionSkeleton } from "@/components/page/forum/discussion/discussion-skeleton";
import { NotFoundDiscussion } from "@/components/page/forum/discussion/nofounddiscussion";
import { DiscussionHeader } from "@/components/page/forum/discussion/discussion-header";
import { NoReplies } from "@/components/page/forum/discussion/no-replies";
import { ReplyForm } from "@/components/page/forum/discussion/reply-form";
import dynamic from "next/dynamic";
import { Post } from "@/types";

const DiscussionReplyLazy = dynamic(
  () =>
    import("@/components/page/forum/discussion/discussion-reply").then(
      (mod) => mod.DiscussionReply
    ),
  { loading: () => <DiscussionSkeleton /> }
);

dayjs.extend(relativeTime);
dayjs.locale("es");

interface DiscussionTabProps {
  forumId: string;
  details: Post;
  isClosed?: boolean;
}

export function DiscussionTab({ forumId, details, isClosed }: DiscussionTabProps) {
  const [visibleReplies, setVisibleReplies] = useState<number>(3);
  const [editingReplyId, setEditingReplyId] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");

  const { data = { replies: [] }, isLoading } = useFetchPostReplies(forumId);

  const PostAllReplies = data.replies || [];

  const updateReplyMutation = useUpdateReply();
  const saveReplyMutation = useSaveReply();

  const loadAllReplies = () => {
    setVisibleReplies((prev) => prev + 3);
  };

  const handleEditReply = useCallback((replyId: string, content: string) => {
    setEditingReplyId(replyId);
    setEditingContent(content);

    requestAnimationFrame(() => {
      const formElement = document.getElementById("reply-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingReplyId("");
    setEditingContent("");
  }, []);

  const onSubmit = async (data: PostReply) => {
    try {
      if (editingReplyId) {
        await updateReplyMutation.mutateAsync({
          reply: { ...data, replyId: editingReplyId, forumId: forumId },
        });
        setEditingReplyId("");
        setEditingContent("");
      } else {
        await saveReplyMutation.mutateAsync({
          reply: { reply: data.reply, forumId: forumId },
        });
      }
    } catch (error) {
    }
  };

  if (isLoading) return <DiscussionSkeleton />;
  if (!PostAllReplies) return <NotFoundDiscussion />;

  const hasReplies = PostAllReplies.length > 0;
  const canLoadMore = visibleReplies < PostAllReplies.length;

  const sortedReplies = [...PostAllReplies].sort(
    (a, b) =>
      new Date(b?.createdAt ?? "").getTime() -
      new Date(a?.createdAt ?? "").getTime()
  );

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <DiscussionHeader
          title={details.title}
          instructor={details.author}
          createdAt={details.createdAt}
          description={details.description}
        />
      </Card>

      <Card className="overflow-hidden">
        <div
          className={`p-4 ${visibleReplies > 3 ? "max-h-[450px] overflow-y-auto pr-4 scrollbar-thin" : ""}`}
        >
          {!hasReplies ? (
            <NoReplies />
          ) : (
            <div className="space-y-5">
              {sortedReplies
                .slice(0, visibleReplies)
                .map((reply) =>
                  reply ? (
                    <DiscussionReplyLazy
                      key={reply.id}
                      onEdit={handleEditReply}
                      forumId={forumId}
                      reply={reply}
                    />
                  ) : null
                )}

              {canLoadMore && (
                <div className="mt-8 mb-2 flex flex-col items-center gap-2">
                  <div className="w-full border-t border-border mb-2"></div>
                  <Button
                    variant="outline"
                    onClick={loadAllReplies}
                    className="text-sm"
                    size="sm"
                  >
                    Ver 3 respuestas mas de (
                    {PostAllReplies.length - visibleReplies})
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div id="reply-form" className="border-t border-border">
          {editingReplyId && (
            <div className="flex items-center justify-between bg-muted p-2">
              <p className="text-sm font-medium">Editando respuesta</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="h-8 px-2"
              >
                Cancelar
              </Button>
            </div>
          )}

          {(PostAllReplies && !isClosed) && (
            <ReplyForm
              initialValue={editingContent}
              onSubmit={onSubmit}
              isLoading={
                saveReplyMutation.isPending || updateReplyMutation.isPending
              }
            />
          )}
        </div>
      </Card>
    </div>
  );
}
