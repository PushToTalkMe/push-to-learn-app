export function progressValue(value: number, max: number) {
  const percentage = Math.ceil((value / max) * 100);
  return percentage > 100 ? 100 : percentage;
}
