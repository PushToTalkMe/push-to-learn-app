import { Dispatch, SetStateAction } from 'react';

export const imageValidation = (
  files: FileList | Blob[] | null,
  setState?: Dispatch<SetStateAction<string | undefined>>,
) => {
  if (!files || files.length === 0) {
    if (setState) {
      setState('');
    }
    return;
  }
  const file = files[0];
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/x-icon'
  ) {
    alert('Пожалуйста, загрузите изображение в формате JPEG, JPG, PNG или ICO');
    if (setState) {
      setState('');
    }
    return;
  }

  if (file.size > 10485760) {
    alert(
      'Файл слишком большой. Пожалуйста, загрузите изображение размером до 10Мб.',
    );
    if (setState) {
      setState('');
    }
    return;
  }
  return files;
};
