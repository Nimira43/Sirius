import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z

export default function EventForm() {
  const form = useForm<>

  return (
    <div>EventForm</div>
  )
}