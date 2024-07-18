import {
  commentsControllerGetComments,
  commentsControllerCreate,
} from '@/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const commentsKey = ['comments'];
export function useCommentsQuery(lessonId: number) {
  return useQuery({
    queryKey: [...commentsKey, lessonId],
    queryFn: () => commentsControllerGetComments(lessonId),
  });
}

export function useUpdateQueryMutation(lessonId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentsControllerCreate,
    onSuccess(data) {
      queryClient.setQueryData([...commentsKey, lessonId], data);
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: commentsKey });
    },
  });
}
