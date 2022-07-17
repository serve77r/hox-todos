import classNames from "classnames"
import { FC } from "react"
import useTodoModel from "../../models/useTodoModel"
import { ITodoItemProps } from "../../types/todo"
import EditTodo from "./editTodo"


const TodoItem: FC<ITodoItemProps> = (props) => {
  const {todo} = props
  const {editorForm, updateTodo, toggleTodo, removeTodo } = useTodoModel()
  const editing = editorForm.id === todo.id
  return (
    <li className={classNames('todo',{ completed: todo.done, editing })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.done}
            onChange={e => toggleTodo(todo.id)}
          />
          <label onDoubleClick={() => editorForm.setTarget(todo)}>{todo.title}</label>
          <button className="destroy" onClick={() => removeTodo(todo.id)}></button>
        </div>
        {editing && <EditTodo className="edit" autoFocus
          model={editorForm}
          onEnter={updateTodo}
          onCancel={editorForm.reset}
        />}
    </li>
  )
}
export default TodoItem