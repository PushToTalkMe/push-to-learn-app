'use client';
import { useSectionsPatchTitleMutation } from '@/queries/courses/queries';
import { useForm } from 'react-hook-form';

export function useSectionsPatchTitle(sectionId: number) {
  const sectionsPatchTitle = useSectionsPatchTitleMutation(sectionId);

  const { control, register, handleSubmit, watch, formState } = useForm<{
    titleSectionForInput: string;
  }>();

  const error = sectionsPatchTitle.error?.response?.data.message;

  return {
    error,
    handleSubmit: handleSubmit((data) =>
      sectionsPatchTitle.mutate({ title: data.titleSectionForInput }),
    ),
    register,
    formState,
    watch,
    isPending: sectionsPatchTitle.isPending,
    isSuccess: sectionsPatchTitle.isSuccess,
  };
}
