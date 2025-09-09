'use server'

import { eventFormSchema } from '@/schema/events'
import 'use-server'
import { z } from 'zod'

export async function createEvent(values: z.infer<typeof eventFormSchema>) {}