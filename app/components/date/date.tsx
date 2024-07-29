import { dateExecute } from '@/helpers/date-execute';

export const Date = ({ value }: { value: string }): JSX.Element => {
  const date = dateExecute(value);

  return <>{date && date.day + '.' + date.month + '.' + date.day}</>;
};
