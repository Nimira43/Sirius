import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 

const schema = z.object({
  name: z.string()
})

export default function EventForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
      durationInMinutes: 30
    }
  })

  return null
}