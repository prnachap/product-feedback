import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type ReplyCrudType<TData, TError, TVariables, TContext> = {
  feedbackId: string;
  commentId?: string;
  queryKey?: string;
  queryFn: MutationFunction<TData, TVariables>;
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
};

const useReplyMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>({
  feedbackId,
  queryFn,
  options,
  queryKey,
}: ReplyCrudType<TData, TError, TVariables, TContext>): UseMutationResult<
  TData,
  TError,
  TVariables,
  TContext
> => {
  const queryClient = useQueryClient();
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: queryFn,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKey, feedbackId],
      });
    },
    ...options,
  });
};

export default useReplyMutation;
