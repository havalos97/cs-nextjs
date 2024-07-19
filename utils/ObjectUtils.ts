export const getValue = <T>(obj: Record<string, unknown>, property?: string): T => {
  try {
    return obj ? (obj[property as keyof typeof obj] as T) : (null as T);
  } catch (e) {
    return null as T;
  }
}
