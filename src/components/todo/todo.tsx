import useTodoModel from "../../models/useTodoModel";
import EditTodo from "./editTodo";
import Filter from "./filter";
import TodoItem from "./todoItem";

const Todo = () => {
  const {todos, adderForm, activeCount, hasDoneTodos, isShowMain, addTodo,  switchAllDone,  clearDone} = useTodoModel()
  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <EditTodo
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          model={adderForm}
          onEnter={addTodo}
        />
      </header>
      <section className="main" style={{display: todos.length ? 'block' : 'none'}}>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={(e) => switchAllDone(e.target.checked)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <TodoItem key={todo.id} todo={todo} />
            )
          })}
        </ul>
      </section>
      <footer className="footer" style={{display: isShowMain ? 'block' : 'none'}}>
        <span className="todo-count">
          <strong>{activeCount}</strong> items left
        </span>
        <Filter />
        <button
          className="clear-completed"
          style={{display: hasDoneTodos ? 'block' : 'none'}}
          onClick={clearDone}
        >
          Clear completed
        </button>
      </footer>
    </div>
  )
}
export default Todo;