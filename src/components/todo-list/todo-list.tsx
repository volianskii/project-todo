import TodoItem from '../todo-item/todo-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useEffect, DragEvent } from 'react';
import { getTodosAsync } from '../../store/todo-list/todo-list.slice';

type ToDoListProps = {
  onDragStart: (id: string) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
}

const TodoList = ({ onDragStart, onDrop, onDragOver }: ToDoListProps): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch])
  const itemsList = useAppSelector((state) => state.todoList);
  const todoItemsList = itemsList.filter((item) => (item.completed === false) && (item.wip === false));

  return (
    <div onDrop={(event) => onDrop(event)} onDragOver={(event) => onDragOver(event)} className='WIPdiv'>
      <div className='grid-container'>
        {todoItemsList.length !== 0 ?
          todoItemsList.map((item) => {
            return (
              <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} onDragStart={onDragStart} />
            );
          }) : <p>No tasks in backlog</p>}
      </div>
    </div>
  );
}

export default TodoList;
