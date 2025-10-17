import { DAYS_OF_WEEK_IN_ORDER } from '@/data/constants'
import { z } from 'zod'

export const scheduleFormSchema = z.object({
  timezone: z.string().min(1, 'Required'),
  availabilities: z.array(z.object({
    dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER)
  }))

})
