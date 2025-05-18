import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <>
      <div className='p-8 bg-main'>
        <h1 className='text-4xl text-light logo'>Sirius</h1>
      </div>
      <div className='mt-10'>
        <Button className='m-4 uppercase'>Login</Button>
      </div>
    </>
    
  )
}

export default HomePage
