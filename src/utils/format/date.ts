import dayjs from 'dayjs'
import { Ref } from 'vue'

/**
 * 获取实时时间
 * @param val Proxy 实时的时间
 * @param delay 实时时间的更新间隔
 * @param format 时间的格式,default:'YYYY-MM-DD hh:mm:ss'
 * @returns intervalId，用于清除定时器
 */
export function getRealTime(val: Ref, delay: number, format: string = 'YYYY-MM-DD HH:mm:ss') {
  return setInterval(
    (val: { value: string }, format: string) => {
      val.value = dayjs().format(format)
    },
    delay,
    val,
    format
  )
}
