import { FormEvent } from "react";
import { deleteTodo, toggleCompletedStatus } from "../../store/todo-list/todo-list.slice";
import { useAppDispatch } from "../../hooks";

type TodoItemProps = {
  title: string;
  id: number;
  completedStatus: boolean;
}

const TodoItem = ({ title, id, completedStatus = false }: TodoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteTodo(id));
    console.log(`${title} deleted`);
  }
  const completedHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch(toggleCompletedStatus({
      id: id,
      completedStatus: !completedStatus
    }))
  }

  return (
    <div>
      <form>
        <input type="checkbox" onChange={completedHandler} checked={completedStatus} />
      </form>
      <p>{title}</p>
      <form onSubmit={submitHandler}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default TodoItem;
