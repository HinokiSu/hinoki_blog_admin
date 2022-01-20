import dayjs from 'dayjs'

/**
 * format date
 * @param format Converted format
 * @returns formated date
 */
export function nowDateFormat(format: string): string {
  return <string>dayjs().format(format)
}
