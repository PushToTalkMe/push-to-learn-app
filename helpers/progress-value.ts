export function progressValue(value: number, max: number) {
  return Math.ceil((value / max) * 100);
}
