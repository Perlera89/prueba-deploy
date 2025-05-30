import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  useClosedPost,
  useDeletePost,
  useFetchAllPostsByModuleId,
  useSavePost,
  useUpdatePost,
  useUpdateVisibilityPost,
} from "@/hooks/forum/use-post";
import { Post } from "@/types";
import { PostForm } from "@/schema/post";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ForumCategoriesCard } from "@/components/page/forum/post/forum-categories";
import { NewDiscussionDialog } from "@/components/page/forum/post/forum-form";
import { DiscussionTab } from "./discussion-tab";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePostStore } from "@/store/post";
import { ForumPostSkeleton } from "@/components/page/forum/post/forum-post-skeleton";
import { EmptyForumState } from "@/components/page/forum/post/empty-forumpost";
import { useAuthStore } from "@/store/auth";
import { useFetchCategoryPosts } from "@/hooks/forum/use-category-post";
import { SkeletonCategoriesCard } from "@/components/page/forum/post/skeleton-categories";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import dynamic from "next/dynamic";
import { useModuleStore } from "@/store/module";

const ForumPostItemLazy = dynamic(
  () =>
    import("@/components/page/forum/post/forum-post-item").then(
      (mod) => mod.ForumPostItem
    ),
  {
    loading: () => <ForumPostSkeleton />,
  }
);

dayjs.locale("es");
export default function ForumTab() {
  const [view, setView] = useState("list");
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { setCategories } = usePostStore();
  const moduleId = useModuleStore((state) => state.module.id);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const role = useAuthStore((state) => state.user?.role);

  const deletePostMutation = useDeletePost();
  const updatePostMutation = useUpdatePost();
  const closedPostMustation = useClosedPost();
  const updateVisibilytyMutation = useUpdateVisibilityPost();
  const savePostMutation = useSavePost(moduleId);

  const {
    data = {
      forums: [],
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
    isLoading: postsLoading,
  } = useFetchAllPostsByModuleId(moduleId, currentPage, itemsPerPage);

  const {
    data: allCategories = [],
    isLoading: loadingCategory,
    isFetching: fetchingCategory,
    refetch,
  } = useFetchCategoryPosts(moduleId);

  const posts = data.forums || [];
  const pagination = data.pagination || {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCategories(allCategories);
    return () => {
      setCategories([]);
    };
  }, [fetchingCategory]);

  const handleViewDiscussion = (post: Post) => {
    setSelectedPost(post);
    setView("discussion");
  };

  const handleDeletePost = async (value: string) => {
    await deletePostMutation.mutateAsync({ postId: value });
    refetch();
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPost(undefined);
  };

  const handleCreateDiscussion = () => {
    setIsNewDiscussionOpen(true);
  };

  const handleEdited = async (values: Partial<Post>) => {
    try {
      await updatePostMutation.mutateAsync({
        post: {
          id: values.id,
          title: values.title,
          description: values.description,
          category: { id: values.category?.id },
        },
      });
      refetch();
    } catch (error) {
    }
  };

  const handleSubmitPost = async (values: PostForm) => {
    await savePostMutation.mutateAsync({
      post: { ...values, moduleId: moduleId },
    });
    refetch();

    setIsNewDiscussionOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsNewDiscussionOpen(open);
  };

  const handleClosedPost = async (postId: string) => {
    await closedPostMustation.mutateAsync({ postId });
    refetch();
  };

  const handleChangeVisibility = async (postId: string) => {
    await updateVisibilytyMutation.mutateAsync({
      postId,
    });
    refetch();
  };

  if (view === "discussion" && selectedPost) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="pl-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleBackToList}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a discusiones
        </Button>

        <div className="w-full ">
          <DiscussionTab forumId={selectedPost.id} details={selectedPost} isClosed={selectedPost.isClosed} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/60">
            <div>
              <CardTitle className="text-lg font-medium">
                Discusiones del Curso
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Comparte y participa en conversaciones con profesores y
                estudiantes
              </p>
            </div>

            {posts.length > 0 && (isInstructor || role === "manager") && (
              <Button
                onClick={() => handleOpenChange(true)}
                className="shadow-sm"
                size="sm"
              >
                Nueva Discusión
              </Button>
            )}
          </CardHeader>

          <CardContent className="p-4 pt-5">
            <div className="space-y-5">
              {postsLoading ? (
                <div className="space-y-4">
                  <ForumPostSkeleton />
                </div>
              ) : posts.length !== 0 ? (
                posts.map((post) => (
                  <ForumPostItemLazy
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    onViewDiscussion={handleViewDiscussion}
                    onEdited={handleEdited}
                    onClosed={handleClosedPost}
                    onVisible={handleChangeVisibility}
                  />
                ))
              ) : (
                <EmptyForumState onCreateDiscussion={handleCreateDiscussion} />
              )}
            </div>

            {posts && posts.length > 0 && (
              <div className="mt-6 border-t border-border/60 pt-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      Mostrar
                    </span>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder={itemsPerPage.toString()} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground text-sm">
                      por página
                    </span>
                  </div>

                  {/* Controles de paginación */}
                  {pagination.totalItems > itemsPerPage && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            className={
                              currentPage > 1
                                ? "cursor-pointer"
                                : "pointer-events-none opacity-50"
                            }
                            onClick={handlePrevPage}
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((pageNum) => {
                          if (
                            pageNum === 1 ||
                            pageNum === pagination.totalPages ||
                            (pageNum >= currentPage - 1 &&
                              pageNum <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={pageNum}>
                                <PaginationLink
                                  isActive={pageNum === currentPage}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className="cursor-pointer"
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }

                          if (
                            (pageNum === 2 && currentPage > 3) ||
                            (pageNum === pagination.totalPages - 1 &&
                              currentPage < pagination.totalPages - 2)
                          ) {
                            return (
                              <PaginationItem key={`ellipsis-${pageNum}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            className={
                              currentPage < pagination.totalPages
                                ? "cursor-pointer"
                                : "pointer-events-none opacity-50"
                            }
                            onClick={handleNextPage}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}

                  {/* Contador de elementos */}
                  <div className="text-muted-foreground text-sm">
                    Mostrando&nbsp;
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      pagination.totalItems
                    )}
                    -
                    {Math.min(
                      currentPage * itemsPerPage,
                      pagination.totalItems
                    )}
                    &nbsp; de {pagination.totalItems} discusiones
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {loadingCategory ? <SkeletonCategoriesCard /> : <ForumCategoriesCard />}
      </div>

      <NewDiscussionDialog
        open={isNewDiscussionOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmitPost}
      />
    </div>
  );
}
