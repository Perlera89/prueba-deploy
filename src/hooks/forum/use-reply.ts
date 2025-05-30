import { Reply, ReplyProps } from "@/types";
import { useDeleteData, useFetchData, useSaveData } from "@/hooks/use-generic";
import { useSession } from "@/hooks/use-session";
import {
  createReply,
  deleteReply,
  getForumAllReplies,
  updateReply,
} from "@/route/forum/reply";

const KEY_REPLY = "replies";

interface ResponseReply {
  replies: Reply[];
}
export function useFetchPostReplies(forumId: string) {
  const { token } = useSession();
  return useFetchData<ResponseReply>(
    [KEY_REPLY, forumId],
    async () => await getForumAllReplies(forumId, token)
  );
}
export function useSaveReply() {
  const { token } = useSession();
  return useSaveData(
    async ({ reply }: { reply: Partial<Reply> }) => {
      await createReply(reply, token);
    },
    [KEY_REPLY],
    "Respuesta enviada",
    "Ocurrio un error al enviar la respuesta, por favor intente nuevamente"
  );
}

export function useUpdateReply() {
  const { token } = useSession();

  return useSaveData(
    async ({ reply }: { reply: Partial<Reply> }) => {
      await updateReply(reply, token);
    },
    [KEY_REPLY],
    "Respuesta Actualizada",
    "Ocurrio un error al actualizar la respuesta, por favor intente nuevamente"
  );
}

export function useDeleteReply() {
  const { token } = useSession();

  return useDeleteData(
    async ({ replyId, forumId }: ReplyProps) => {
      await deleteReply({ replyId, forumId }, token);
    },
    [KEY_REPLY],
    "Respuesta eliminada",
    "Ocurrio un error al eliminar la respuesta, por favor intente nuevamente"
  );
}
