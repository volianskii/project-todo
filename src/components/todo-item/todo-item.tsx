import { FormEvent } from "react";
import { deleteTodo, toggleCompletedStatus, toggleCompletedAsync } from "../../store/todo-list/todo-list.slice";
import { useAppDispatch } from "../../hooks";

type TodoItemProps = {
  title: string;
  id: number;
  completed: boolean;
}

const TodoItem = ({ title, id, completed = false }: TodoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteTodo(id));
    console.log(`${title} deleted`);
  }
  const completedHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(toggleCompletedAsync({
      id: id,
      completed: !completed
    }))
  }

  return (
    <div>
      <form>
        <input type="checkbox" onChange={completedHandler} checked={completed} />
      </form>
      <p>{title}</p>
      <form onSubmit={submitHandler}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default TodoItem;
