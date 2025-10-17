'use server'

import 'use-server'
import { scheduleFormSchema } from '@/schema/schedule'
import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/drizzle/db'
import { ScheduleTable } from '@/drizzle/schema'

export async function saveSchedule(
  unsafeData: z.infer<typeof scheduleFormSchema>
) {
  const { userId } = auth()  
  const { success, data} = scheduleFormSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true}
  }

  const { availabilities, ...scheduleData } = data

  await db.insert(ScheduleTable).values({
    ...scheduleData,
    clerkUserId: userId
  }).onConflictDoUpdate({
    target: ScheduleTable.clerkUserId,
    set: scheduleData,
  })
}
