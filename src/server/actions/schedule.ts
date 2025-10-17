'use server'

import 'use-server'
import { scheduleFormSchema } from '@/schema/schedule'
import { z } from 'zod'

export async function saveSchedule(values: z.infer<typeof scheduleFormSchema>) {

}
