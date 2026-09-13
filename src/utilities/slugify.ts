const COMBINING_MARKS_REGEX = /[̀-ͯ]/g

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS_REGEX, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
