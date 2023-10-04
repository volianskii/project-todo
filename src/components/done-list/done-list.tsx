import TodoItem from '../todo-item/todo-item';
import { useAppSelector } from '../../hooks/index';


const DoneList = (): JSX.Element => {
  const itemsList = useAppSelector((state) => state.todoList);
  const doneItemsList = itemsList.filter((item) => item.completed === true);
  return (
    <>
      {doneItemsList.length !== 0 ?
        doneItemsList.map((item) => {
          return (
            <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} />
          );
        }) : <p>Nothing's done yet</p>}
    </>
  );
}

export default DoneList;
