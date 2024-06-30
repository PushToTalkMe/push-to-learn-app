import { buyControllerBuyCourse } from '@/api/generated';
import { ROUTES } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useBuyCourse(courseId: number) {
  const router = useRouter();

  const buyCourseMutation = useMutation({
    mutationFn: () => buyControllerBuyCourse(courseId),
    onSuccess() {
      router.push(ROUTES.APP);
    },
  });

  const errorMessage = buyCourseMutation.error ? 'Ошибка покупки' : undefined;

  return {
    errorMessage,
    isPending: buyCourseMutation.isPending,
    handleClick: () => buyCourseMutation.mutate(),
  };
}
