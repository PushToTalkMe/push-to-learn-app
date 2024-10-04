'use client';
import { useSectionsPatchTitleMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useSectionsPatchTitle() {
  const sectionsPatchTitle = useSectionsPatchTitleMutation();

  const { control, register, handleSubmit, watch, formState } = useForm<{
    titleSectionForInput: string;
  }>();

  const error = sectionsPatchTitle.error?.response?.data.message;

  const onSubmit = (data: any, sectionId: number) => {
    return sectionsPatchTitle.mutateAsync({
      patchSectionDto: { title: data.titleSectionForInput },
      sectionId,
    });
  };

  const handleCustomSubmit = (sectionId: number) => {
    return handleSubmit((data) => onSubmit(data, sectionId));
  };

  return {
    error,
    handleSubmit: handleCustomSubmit,
    register,
    formState,
    watch,
    isPending: sectionsPatchTitle.isPending,
    isSuccess: sectionsPatchTitle.isSuccess,
  };
}
