import Condition from "./Condition"

type ConditionGroupProps = {
  title: string
  value: string
}[]

const ConditionGroup = ({ conditions }: { conditions: ConditionGroupProps }) => {
  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center gap-4">
      <hr className="w-full text-red-400" />
      <div className="flex w-full justify-start items-center gap-4">
        {conditions.map(condition => (
          <Condition key={condition.value} condition={condition} />
        ))}
      </div>
    </div>
  )
}

export default ConditionGroup