import { boolean, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const createdAt = timestamp('createdAt').notNull().defaultNow()
const updatedAt = timestamp('updatedAt')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()
)

export const EventTable = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  durationInMinutes: integer('durationInMinutes').notNull(),
  clerkUserId: text('clerkUserId').notNull(),
  isActive: boolean('isActive').notNull().default(true),
  createdAt,
  updatedAt
}, table => ({
  clerkUserIndex: index('clerkUserIdIndex').on(table.clerkUserId)
}) )

export const ScheduleTable = pgTable('schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  timezone: text('timezone').notNull(),
  clerkUserId: text('clerkUserId').notNull().unique(),
  createdAt,
  updatedAt
})

export const ScheduleAvailabilityTable = pgTable('scheduleAvailabilities', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduleId: uuid('scheduleId')
    .notNull()
    .references(() => ScheduleTable.id, { onDelete: 'cascade'}),
  startTime: text('startTime').notNull(),
  endTime: text('endTime').notNull(),
  dayOfWeek: scheduleDayOfWeekEnum('dayOfWeek').notNull()
})