import { DAYS_OF_WEEK_IN_ORDER } from '@/data/constants'
import { z } from 'zod'

export const scheduleFormSchema = z.object({
  timezone: z
    .string()
    .min(1, 'Required'),
  availabilities: z
    .array(z
      .object({
        dayOfWeek: z.
          enum(DAYS_OF_WEEK_IN_ORDER),
        startTime: z
          .string()
          .regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in the format HH:MM'),
        endTime: z
          .string()
          .regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in the format HH:MM'),
      })
    ).superRefine((availabilities, ctx) => {
      availabilities.forEach((availibility, index) => {
        const overlaps = availabilities.some((a, i) => {
          return i !== index && a.dayOfWeek === availibility.dayOfWeek && 
        })
      })
    }),
})

function timeToInt(time: string) {
  return parseFloat(time.replace(':', '.'))
}
