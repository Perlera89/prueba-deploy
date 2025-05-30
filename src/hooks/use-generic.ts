import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useFetchData<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  enabled: boolean = true,
  staleTime: number = 1000 * 60 * 5
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
  });
}

export function useFindData<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  enabled: boolean = true,
  staleTime: number = 1000 * 60 * 15
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
  });
}

export function useSaveData<T, R = any>(
  mutationFn: (data: T) => Promise<R>,
  queryKey: string[],
  successMessage: string,
  errorMessage: string,
  navigation?: string
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.refetchQueries({ queryKey });
      toast.success(successMessage);

      if (navigation) {
        router.push(navigation);
      } else {
        router.refresh();
      }

      return data;
    },
    onError: (error) => {
      toast.error(errorMessage, {
        description:
          (error as any)?.response?.data?.message || (error as Error).message,
      });
    },
  });
}

export function useDeleteData<T>(
  mutationFn: (data: T) => Promise<void>,
  queryKey: string[],
  successMessage: string,
  errorMessage: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(successMessage);
    },
    onError: (error) => {
      toast.error(errorMessage, {
        description:
          (error as any)?.response?.data?.message || (error as Error).message,
      });
    },
  });
}
