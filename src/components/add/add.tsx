import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { addTodo, addTodoAsync } from '../../store/todo-list/todo-list.slice'
import { changeRejectedStatus } from "../../store/rejected-status/rejected-status.slice";
import { toast } from 'react-toastify';

const Add = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const rejectedStatus = useAppSelector((state) => state.rejectedStatus.rejectedStatus);
  const pendingStatus = useAppSelector((state) => state.rejectedStatus.pendingStatus);
  const todos = useAppSelector((state) => state.todoList);
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (value !== '') {
      dispatch(addTodoAsync({
        title: value,
      }));
    }
  }

  useEffect(() => {
    if (rejectedStatus) {
      toast.warn(
        'The server is not available. Please do not reload the page.',
        {
          autoClose: 2700
        }
      );
      dispatch(addTodo({
        title: value,
      }));
      dispatch(changeRejectedStatus(false));
    }
  }, [rejectedStatus])

  useEffect(() => {
    setValue('');
  }, [todos])

  return (
    <form onSubmit={submitHandler} className="add-form">
      <input type="text" className="add-input" placeholder="Add todo.." value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit" disabled={pendingStatus} className="add-button">Add</button>
    </form>
  )
}

export default Add;
