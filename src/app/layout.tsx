import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Sirius',
  description: 'Calendar scheduler application using Next JS, Neon, Drizzle, Clerk, TypeScript, Shadcn and TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(
        'min-h-screen',
        poppins.className
      )}>
        {children}
      </body>
    </html>
  )
}
