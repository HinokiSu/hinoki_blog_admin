// default import not work, issue: https://github.com/aurelia/skeleton-navigation/issues/606
import moment from 'moment'

/**
 * format date
 * @param rawDate raw date resource
 * @param format Converted format
 * @returns formated date
 */
export function dateFormat(rawDate: Date, format: string): string {
  return <string>moment(rawDate).format(format)
}
