'use server'

import 'use-server'
import { scheduleFormSchema } from '@/schema/schedule'
import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'

export async function saveSchedule(unsafeData: z.infer<typeof scheduleFormSchema>) {
  const { userId } = auth()  
  const { success, data} = scheduleFormSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true}
  }
}
