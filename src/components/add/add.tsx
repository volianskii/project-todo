import { FormEvent, useState } from "react";
import { useAppDispatch } from '../../hooks/index';
import { addTodo } from '../../store/todo-list/todo-list.slice'

const Add = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(addTodo(value));
    setValue('');
  }


  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Add todo.." value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

export default Add;
