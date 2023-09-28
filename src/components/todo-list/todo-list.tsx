import TodoItem from '../todo-item/todo-item';
import { useAppSelector } from '../../hooks/index';

const TodoList = (): JSX.Element => {
  const itemsList = useAppSelector((state) => state.todoList);
  return (
    <>
      {itemsList.map((item) => {
        return (
          <TodoItem title={item.title} id={item.id} key={item.id} completedStatus={item.completedStatus} />
        );
      })}
    </>
  );
}

export default TodoList;
