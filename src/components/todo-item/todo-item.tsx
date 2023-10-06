import { FormEvent } from "react";
import { deleteTodoAsync, toggleCompletedAsync, toggleWIPAsync } from "../../store/todo-list/todo-list.slice";
import { useAppDispatch } from "../../hooks";

export type TodoItemProps = {
  title: string;
  id: string;
  completed: boolean;
  onDragStart: (id: string) => void;
}

const TodoItem = ({ title, id, completed = false, onDragStart }: TodoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteTodoAsync({ id }));
    console.log(`${title} deleted`);
  };
  const completedHandler = () => {
    dispatch(toggleCompletedAsync({
      id: id,
      completed: !completed,
      wip: false
    }));
    dispatch(toggleWIPAsync({
      id: id,
      wip: false,
      completed: !completed
    }));
  };

  return (
    <div className="item-container" draggable onDragStart={() => onDragStart(id)}>
      <form>
        <input type="checkbox" onChange={completedHandler} checked={completed} />
      </form>
      <div>
        <p>{title}</p>
      </div>
      <form onSubmit={submitHandler}>
        <button type="submit" className="delete-button">Delete</button>
      </form>
    </div>
  );
}

export default TodoItem;
