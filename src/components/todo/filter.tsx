import { VISIBILITY_FILTERS } from "../../constants"
import useTodoModel from "../../models/useTodoModel"

const Filter = () => {
  const {activeFilter, setActiveFilter} = useTodoModel()
  return (
    <ul className="filters">
      {Object.keys(VISIBILITY_FILTERS).map((item) => {
        return (
          <li key={item}>
            <span
              className={activeFilter === item ? 'selected':''}
              onClick={() => setActiveFilter(item)}
            >{item}</span>
          </li>
        )
      })}
    </ul>
  )
}
export default Filter