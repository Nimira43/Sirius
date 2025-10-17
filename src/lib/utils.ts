import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeToInt(time: string) {
  return parseFloat(time.replace(':', '.'))
}

export function timeToInt2(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
