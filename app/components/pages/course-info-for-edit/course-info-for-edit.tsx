'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, ImageCourse, SideUp, Span } from '../../ui';
import { CourseInfoForEditProps } from './course-info-for-edit.props';
import styles from './course-info-for-edit.module.css';
import cn from 'classnames';
import { AngleDownIcon, AngleUpIcon, TrashIcon } from '@/public/icons';
import { CourseAvatarEditForm } from '../form/course-avatar-edit-form';
import {
  useCoursePatchDuration,
  useCoursePatchTags,
  useCoursePatchTitle,
  useCourseRelease,
} from '@/hooks/courses';
import { set, useFieldArray } from 'react-hook-form';

export function CourseInfoForEdit({ course }: CourseInfoForEditProps) {
  const [open, setOpen] = useState(false);
  const [disableTags, setDisableTags] = useState(true);

  const { handleReleaseCourse, error, isSuccess } = useCourseRelease(course.id);

  const {
    register,
    handlePatch,
    watch,
    errorMessage,
    formState: { errors: errorTitleCourseForInput },
    isSuccess: isSuccessPatchTitle,
  } = useCoursePatchTitle(course.id);
  const [titleCourseForInput] = watch(['titleCourseForInput']);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register: registerDuration,
    handlePatchDuration,
    watch: watchDuration,
    formState: { errors: errorDurationCourseForInput },
    errorMessage: errorMessageDuration,
    isSuccess: isSuccessPatchDuration,
  } = useCoursePatchDuration(course.id);
  const [durationCourseForInput] = watchDuration(['durationCourseForInput']);
  const inputRefDuration = useRef<HTMLInputElement | null>(null);

  const {
    register: registerTags,
    handlePatchTags,
    watch: watchTags,
    control,
    errorMessage: errorMessageTags,
    isSuccess: isSuccessPatchTags,
  } = useCoursePatchTags(course.id);
  const [tagsCourseForInput] = watchTags(['tagsCourseForInput']);
  const inputRefTags = useRef<HTMLInputElement[] | []>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagsCourseForInput',
  });

  const handleClickButton = () => {
    setOpen(() => !open);
  };

  useEffect(() => {
    course.tags.map((tag) => append({ value: tag }));
  }, []);

  return (
    <div className={styles.courseInfo}>
      <CourseAvatarEditForm courseId={course.id} img={course.img} />
      <div className={styles.status}>
        <Button
          appearance="primary"
          disabled={!course.inDeveloping}
          onClick={handleReleaseCourse}
        >
          {course.inDeveloping ? 'Опубликовать' : 'Курс опубликован'}
        </Button>
        {isSuccess && <SideUp status="success">Курс опубликован</SideUp>}
        {!!error && <SideUp status="error">{error}</SideUp>}
      </div>
      <div className={cn(styles.tab)}>
        <div style={{ width: '100%' }}>
          <div className={styles.titleContainer} onClick={handleClickButton}>
            <span className={cn(styles.titleTab)}>Информация о курсе</span>
            <button className={cn(styles.angle)}>
              {open ? <AngleUpIcon /> : <AngleDownIcon />}
            </button>
          </div>
          {open ? (
            <div>
              <form
                className={styles.editInfo}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputRef.current) {
                    inputRef.current.blur();
                  }
                }}
                onBlur={handlePatch}
                id="titleCourse"
              >
                <div className={cn(styles.info)}>
                  <h3>Заголовок курса:</h3>
                  {'\u00A0'}
                  <input
                    type="text"
                    defaultValue={course.title}
                    className={cn(styles.inputForCourse)}
                    autoComplete="title"
                    placeholder="Заголовок"
                    form="titleCourse"
                    {...register(`titleCourseForInput`, {
                      required: `Заполните заголовок курса`,
                    })}
                    ref={(e) => {
                      inputRef.current = e;
                      return register('titleCourseForInput', {
                        required: 'Введите заголовок курса',
                      }).ref(e);
                    }}
                  />
                  {isSuccessPatchTitle && (
                    <SideUp status="success">
                      Название курса успешно изменено
                    </SideUp>
                  )}
                  {!!errorMessage && (
                    <SideUp status="error">{errorMessage}</SideUp>
                  )}
                </div>
                {errorTitleCourseForInput && (
                  <Span className={styles.errorInput}>
                    {errorTitleCourseForInput.titleCourseForInput?.message}
                  </Span>
                )}
              </form>
              <form
                id="durationCourse"
                className={styles.editInfo}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputRefDuration.current) {
                    inputRefDuration.current.blur();
                  }
                }}
                onBlur={handlePatchDuration}
              >
                <div className={cn(styles.info)}>
                  <h3>Длительность:</h3>
                  {'\u00A0'}
                  <input
                    type="text"
                    defaultValue={course.duration}
                    form="durationCourse"
                    className={cn(styles.inputForCourse)}
                    autoComplete="duration"
                    placeholder="Длительность"
                    {...registerDuration(`durationCourseForInput`, {
                      required: `Заполните длительность курса`,
                    })}
                    ref={(e) => {
                      inputRefDuration.current = e;
                      return registerDuration('durationCourseForInput', {
                        required: 'Введите длительность курса',
                      }).ref(e);
                    }}
                  />
                  {isSuccessPatchDuration && (
                    <SideUp status="success">
                      Длительность курса успешно изменена
                    </SideUp>
                  )}
                  {!!errorMessageDuration && (
                    <SideUp status="error">{errorMessageDuration}</SideUp>
                  )}
                </div>
                {errorDurationCourseForInput && (
                  <Span className={styles.errorInput}>
                    {
                      errorDurationCourseForInput.durationCourseForInput
                        ?.message
                    }
                  </Span>
                )}
              </form>
              <form
                id="tagsCourse"
                className={styles.editInfoTags}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDisableTags(true);
                  handlePatchTags(e);
                }}
              >
                <div className={cn(styles.tags)}>
                  {fields.map((item, index) => (
                    <div className={cn(styles.tag)} key={item.id}>
                      <div>
                        <input
                          placeholder={`Тэг ${index + 1}`}
                          form="tagsCourse"
                          className={cn(styles.tagInput)}
                          {...registerTags(
                            `tagsCourseForInput.${index}.value`,
                            {
                              required: `Заполните тэг`,
                              onChange: () => {
                                setDisableTags(false);
                              },
                            },
                          )}
                        />
                      </div>
                      {tagsCourseForInput.length <= 1 ? (
                        <></>
                      ) : (
                        <button
                          className={cn(styles.remove)}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDisableTags(false);
                            return remove(index);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  ))}
                  {tagsCourseForInput.length >= 4 ? (
                    <></>
                  ) : (
                    <button
                      className={cn(styles.append)}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDisableTags(false);
                        return append({ value: `Новый тег` });
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={disableTags}
                  form="tagsCourse"
                  className={styles.saveTags}
                >
                  Сохранить тэги
                </button>
              </form>
              {isSuccessPatchTags && (
                <SideUp status="success">Тэги курса успешно изменены</SideUp>
              )}
              {!!errorMessageTags && (
                <SideUp status="error">{errorMessageTags}</SideUp>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
