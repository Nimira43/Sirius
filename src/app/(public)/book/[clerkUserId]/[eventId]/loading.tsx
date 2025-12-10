import { TbLoader } from 'react-icons/tb'

export default function Loading() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center'>
      <div className='text-3xl font-medium text-center text-main'>Loading...</div>
      <TbLoader className='text-main size-24 animate-spin' />
    </div>
  )
}