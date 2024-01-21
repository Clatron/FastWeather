import React from 'react'

type ConditionProps = {
  title: string
  value: string
}

const Condition = ({ condition }: { condition: ConditionProps }) => {
  return (
    <div className='flex flex-col gap-2 items-center text-center'>
      <p className='text-medium border-b-2 border-primary'>{condition.title}</p>
      <p className='text-normal'>{condition.value}</p>
    </div>
  )
}

export default Condition