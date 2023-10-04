import { FormEvent, useState } from "react";
import { useAppDispatch } from '../../hooks/index';
import { addTodo, addTodoAsync } from '../../store/todo-list/todo-list.slice'

const Add = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (value !== '') {
      dispatch(addTodoAsync({
        title: value,
      }));
      setValue('');
    }
  }


  return (
    <form onSubmit={submitHandler} className="add-form">
      <input type="text" className="add-input" placeholder="Add todo.." value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit" className="add-button">Add</button>
    </form>
  )
}

export default Add;
