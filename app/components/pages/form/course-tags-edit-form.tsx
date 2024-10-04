'use client';
import { useFieldArray } from 'react-hook-form';
import { useCoursePatchTags, useCoursesCreate } from '@/hooks/courses';
import { useAccount } from '@/hooks/account';
import styles from './form.module.css';
import cn from 'classnames';
import { Button, Htag, ImageCourse, P, Span } from '@/app/components/ui';
import { TrashIcon } from '@/public/icons';
import { useRef } from 'react';

export function CourseCreateForm({
  courseId,
  tags,
}: {
  courseId: number;
  tags: string[];
}) {
  const {
    register: registerTags,
    handlePatchTags,
    watch: watchTags,
    control,
    errorMessage: errorMessageTags,
    isSuccess: isSuccessPatchTags,
  } = useCoursePatchTags(courseId);
  const [tagsCourseForInput] = watchTags(['tagsCourseForInput']);
  const inputRefTags = useRef<HTMLInputElement | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagsCourseForInput',
  });

  return (
    <form
      id="tagsCourse"
      className={styles.editInfo}
      onSubmit={handlePatchTags}
    >
      <div className={cn(styles.tags)}>
        {fields.map((item, index) => (
          <div className={cn(styles.tag)} key={item.id}>
            <div>
              <input
                placeholder={`Тэг ${index + 1}`}
                form="tagsCourse"
                className={cn(styles.tagInput)}
                defaultValue={item.value}
                {...registerTags(`tagsCourseForInput.${index}.value`, {
                  required: `Заполните тэг`,
                })}
                ref={(e) => {
                  inputRefTags.current = e;
                  return registerTags(`tagsCourseForInput.${index}.value`, {
                    required: `Заполните тэг`,
                  }).ref(e);
                }}
              />
            </div>
            {fields.length <= 1 ? (
              <></>
            ) : (
              <button
                className={cn(styles.remove)}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(index);
                  return remove(index);
                  // handlePatchTags(
                  //   fields.filter((_, i) => i !== index),
                  // );
                }}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        ))}
        {fields.length >= 4 ? (
          <></>
        ) : (
          <button
            className={cn(styles.append)}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log(fields);
              return append({ value: `Новый тег` });
              // handlePatchTags([...fields, { value: 'Новый тег' }]);
            }}
          >
            +
          </button>
        )}
      </div>
      {isSuccessPatchTags && (
        <SideUp status="success">Тэги курса успешно изменены</SideUp>
      )}
      {!!errorMessageTags && <SideUp status="error">{errorMessageTags}</SideUp>}
    </form>
  );
}
