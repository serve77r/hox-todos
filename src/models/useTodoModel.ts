import { createModel } from "hox"
import { useMemo, useRef, useState } from "react"
import { VISIBILITY_FILTERS } from "../constants"
import { ITodo } from "../types/todo"
import { useAddFormModel, useEditFormModel } from "./useTodoFormModel"

const useTodo = () => {
  const nextTodoIdRef = useRef(0);
  const [todos,setTodos] = useState<ITodo[]>([])
  const adderForm = useAddFormModel()
  const editorForm = useEditFormModel()
  const [activeFilter, setActiveFilter] = useState(VISIBILITY_FILTERS.All);
  
  const doneList = useMemo(() => {
    return todos.filter(i => i.done);
  },[todos])
  const activeList = useMemo(() => {
    return todos.filter(i => !i.done);
  },[todos])
  const activeCount = useMemo(() => {
    return activeList.length;
  }, [activeList])
  const hasDoneTodos = useMemo(() => {
    return doneList.length > 0;
  },[doneList])
  const isShowMain = useMemo(() => {
    return todos.length > 0;
  },[todos])
  const isAllDone = useMemo(() => {
    return doneList.length === todos.length;
  }, [doneList,todos])
  const showList = useMemo(() => {
    switch (activeFilter) {
      case VISIBILITY_FILTERS.All:
        return todos;
      case VISIBILITY_FILTERS.Active:
        return activeList;
      case VISIBILITY_FILTERS.Completed:
        return doneList;
      default:
        return []
    }
  }, [todos, activeFilter, activeList, doneList]);
  
  const addTodo = () => {
    if (adderForm.valid) {
      setTodos(
        todos.concat([
          {
            id: nextTodoIdRef.current,
            title: adderForm.trimedValue,
            done: false
          }
        ])
      );
      adderForm.reset()
      nextTodoIdRef.current++;
    }
  }
  const updateTodo = () => {
    if (editorForm.valid) {
      setTodos(
        todos.map(todo => {
          if (todo.id === editorForm.id) {
            return {
              ...todo,
              title: editorForm.title,
            };
          } else {
            return todo;
          }
        })
      );
      editorForm.reset()
    }
  }
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done
          };
        } else {
          return todo;
        }
      })
    );
  }
  const removeTodo = (id: number) => {
    setTodos(
      todos.filter(todo => {
        if (todo.id === id) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
  const switchAllDone = (done?: boolean) => {
    if (typeof done !== 'boolean') {
      done = !isAllDone;
    }
    setTodos(
      todos.map(todo => {
          return {
            ...todo,
            done: done!,
          };
      })
    );
  }
  const clearDone = () => {
    setTodos(
      todos.filter(todo => !todo.done)
    );
  }
  return {
    todos: showList,
    adderForm,
    editorForm,
    activeFilter,
    activeCount,
    hasDoneTodos,
    isShowMain,
    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
    setActiveFilter,
    switchAllDone,
    clearDone,
  }
}
export default createModel(useTodo)