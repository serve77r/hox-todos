import { createModel } from "hox"
import { useMemo, useState } from "react"
import { ITodo } from "../types/todo"

export const useTodoForm = () => {
  const [id, setId] = useState<string|number>('')
  const [title, setTitle] = useState('')
  const trimedValue = useMemo(() => {
    return title.trim()
  },[title])
  const valid = useMemo(() => {
    return trimedValue.length > 0;
  }, [trimedValue])
  const setTarget = (todo: ITodo) => {
    setId(todo.id)
    setTitle(todo.title)
  }
  const update = (value: string) => {
    setTitle(value);
  }
  const reset = () => {
    setId('')
    setTitle('')
  }
  return {
    id,
    title,
    valid,
    trimedValue,
    setTarget,
    reset,
    update
  }
}
export const useAddFormModel = createModel(useTodoForm);
export const useEditFormModel = createModel(useTodoForm);