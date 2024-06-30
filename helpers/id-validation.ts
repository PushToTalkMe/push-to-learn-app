export function idValidation(value: string) {
  const number = value.match(/^\d+$/);
  if (!number) {
    return false;
  }
  return true;
}
