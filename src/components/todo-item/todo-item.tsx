import { FormEvent } from "react";
import { deleteTodoAsync, toggleFlagsAsync } from "../../store/todo-list/todo-list.slice";
import { useAppDispatch } from "../../hooks";

export type TodoItemProps = {
  title: string;
  id: string;
  completed: boolean;
  onDragStart: (id: string) => void;
  ishidden?: boolean;
}

const TodoItem = ({ title, id, completed = false, onDragStart, ishidden }: TodoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteTodoAsync({ id }));
    console.log(`${title} deleted`);
  };
  const completedHandler = () => {
    dispatch(toggleFlagsAsync({
      id: id,
      completed: !completed,
      wip: false
    }));
  };

  return (
    <div hidden={ishidden} className="item-container" draggable onDragStart={() => onDragStart(id)}>
      <form>
        <input type="checkbox" onChange={completedHandler} checked={completed} style={{ width: '20px', height: '20px' }} />
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
