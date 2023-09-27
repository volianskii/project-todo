import TodoItem from '../todo-item/todo-item';
import { useSelector } from 'react-redux';

type itemType = {
  title: string
};
type itemsListType = itemType[];

const TodoList = (): JSX.Element => {
  const itemsListStore = useSelector((state) => state.todoList)
  return (
    <>
      {itemsListStore.map((item, index) => {
        const keyValue = `item-${index}`;
        return (
          <TodoItem title={item.title} key={keyValue} />
        );
      })}
    </>
  );
}

export default TodoList;
