'use client'

const Error = ({ error }: { error: string }) => {
  console.error(error)
  return (
    <div className="mx-auto flex flex-col items-center">
      <h1 className='h1-bold text-red-400'>Error</h1>
      <p className="text-normal">{error}</p>
    </div>
  )
}

export default Error