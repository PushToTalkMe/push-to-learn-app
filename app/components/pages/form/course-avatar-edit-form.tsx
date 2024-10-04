'use client';
import { useCourseAvatarUpdate } from '@/hooks/courses';
import styles from './form.module.css';
import cn from 'classnames';
import { useState, ChangeEvent, BaseSyntheticEvent } from 'react';
import { ImageCourse, SideUp } from '@/app/components/ui';
import { imageValidation } from '@/helpers/image-validation';

export function CourseAvatarEditForm({
  courseId,
  img,
}: {
  courseId: number;
  img: string;
}) {
  const {
    handleSubmit,
    isPending,
    register,
    formState: { errors },
    errorMessage,
    isSuccess,
  } = useCourseAvatarUpdate(courseId);

  const [image, setImage] = useState<string>();

  const handleFileUpload = (event: BaseSyntheticEvent) => {
    const files = imageValidation(event.target.files, setImage);
    if (!files) {
      setImage('');
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const value = event.target;
      if (!value) {
        return;
      }
      const fileContent = value.result;
      if (!fileContent || typeof fileContent === 'string') {
        return;
      }
      const byteArray = new Uint8Array(fileContent);
      const blob = new Blob([byteArray], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    };
    reader.readAsArrayBuffer(file);
    handleSubmit(event);
  };

  return (
    <form className={styles.courseAvatarForm} id="formCourseAvatar">
      {isSuccess && <SideUp status="success">Изображение сохранено</SideUp>}
      {!!errorMessage && <SideUp status="error">{errorMessage}</SideUp>}
      <input
        type="file"
        className={cn(styles.inputFile)}
        id="upload-file"
        form="formCourseAvatar"
        accept="image/jpeg, image/png, image/jpg"
        {...register('files', {
          required: 'Загрузите файл',
          onChange: (event) => handleFileUpload(event),
        })}
      />
      {errors.files && (
        <div className={styles.messages}>
          <span className={styles.errorInput}>{errors.files.message}</span>
        </div>
      )}
      <div className={cn(styles.imgContainer)}>
        {image ? (
          <img
            src={image}
            alt="Изображение курса"
            className={styles.imgCourse}
          />
        ) : img ? (
          <ImageCourse type="edit" url={img} />
        ) : (
          <ImageCourse type="edit" />
        )}
        <label
          className={cn(styles.labelFileForCourseAvatar)}
          htmlFor="upload-file"
        >
          <span>+</span>
        </label>
      </div>
    </form>
  );
}
