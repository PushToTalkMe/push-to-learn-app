import { dateExecute } from '@/helpers/date-execute';

export const Time = ({ value }: { value: string }): JSX.Element => {
  const time = dateExecute(value);

  return <>{time && time.hour + ':' + time.minute}</>;
};
