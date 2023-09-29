import TodoItem from '../todo-item/todo-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useEffect } from 'react';
import { getTodosAsync } from '../../store/todo-list/todo-list.slice';

const TodoList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch])
  const itemsList = useAppSelector((state) => state.todoList);
  return (
    <>
      {itemsList.map((item) => {
        return (
          <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} />
        );
      })}
    </>
  );
}

export default TodoList;
