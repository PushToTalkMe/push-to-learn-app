export function dateExecute(value: string) {
  const date = value.match(/\d+/g);
  if (date) {
    return {
      day: date[2],
      month: date[1],
      year: date[0],
      hour: date[3],
      minute: date[4],
      second: date[5],
    };
  }
  return;
}
