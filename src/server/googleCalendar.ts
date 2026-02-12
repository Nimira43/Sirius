'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'
import { endOfDay, startOfDay } from 'date-fns'

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date }
) {
  const oAuthClient = await getOAuthClient(clerkUserId)

  // If no OAuth client, user hasn't connected Google Calendar
  if (!oAuthClient) return []

  const events = await google.calendar('v3').events.list({
    calendarId: 'primary',
    eventTypes: ['default'],
    singleEvents: true,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    maxResults: 2500,
    auth: oAuthClient
  })

  return (
    events.data.items
      ?.map(event => {
        // All‑day events
        if (event.start?.date && event.end?.date) {
          return {
            start: startOfDay(event.start.date),
            end: endOfDay(event.end.date)
          }
        }

        // Timed events
        if (event.start?.dateTime && event.end?.dateTime) {
          return {
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime)
          }
        }

        return null
      })
      .filter(Boolean) ?? []
  )
}

async function getOAuthClient(clerkUserId: string) {
  const tokenResponse = await clerkClient.users.getUserOauthAccessToken(
    clerkUserId,
    'oauth_google'
  )

  // tokenResponse.data can be: array | null | undefined
  const tokens = tokenResponse?.data

  // No tokens → user hasn't connected Google
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return null
  }

  const accessToken = tokens[0]?.token
  if (!accessToken) return null

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URL
  )

  client.setCredentials({ access_token: accessToken })

  return client
}

// Previous version

// 'use server'

// import { clerkClient } from '@clerk/nextjs/server'
// import { google } from 'googleapis'
// import { endOfDay, startOfDay } from 'date-fns';

// export async function getCalendarEventTimes(
//   clerkUserId: string,
//   { start, end }: { start: Date; end: Date }
// ) {
//   const oAuthClient = await getOAuthClient(clerkUserId)

//   const events = await google.calendar('v3').events.list({
//     calendarId: 'primary',
//     eventTypes: ['default'],
//     singleEvents: true,
//     timeMin: start.toISOString(),
//     timeMax: end.toISOString(),
//     maxResults: 2500,
//     auth: oAuthClient
//   })

//   return events.data.items?.map(event => {
//     if (event.start?.date != null && event.end?.date != null) {
//       return {
//         start: startOfDay(event.start.date),
//         end: endOfDay(event.end.date)
//       }
//     }
//     if (event.start?.dateTime != null && event.end?.dateTime != null) {
//       return {
//         start: new Date(event.start.dateTime),
//         end: new Date(event.end.dateTime)
//       }
//     }   
//   }).filter(date => date != null) || []
// }

// async function getOAuthClient(clerkUserId: string) {
//   const token = await clerkClient.users.getUserOauthAccessToken(clerkUserId, 'oauth_google')

//   if (token.data.length === 0 || token.data[0].token == null) {
//     return
//   }

//   const client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT_ID,
//     process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//     process.env.GOOGLE_OAUTH_REDIRECT_URL
//   )


//   client.setCredentials({ access_token: token.data[0].token })
  
//   return client
// }
