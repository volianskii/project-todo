import TodoItem from '../todo-item/todo-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useEffect } from 'react';
import { getTodosAsync } from '../../store/todo-list/todo-list.slice';
type ToDoListProps = {
  onDragStart: (id: string) => void;
}
const TodoList = ({ onDragStart }: ToDoListProps): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch])
  const itemsList = useAppSelector((state) => state.todoList);
  const todoItemsList = itemsList.filter((item) => (item.completed === false) && (item.wip === false));
  const onDragStartHandler = (id: number) => {
    console.log(id);
  };
  return (
    <>
      {todoItemsList.map((item) => {
        return (
          <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} onDragStart={onDragStart} />
        );
      })}
    </>
  );
}

export default TodoList;
