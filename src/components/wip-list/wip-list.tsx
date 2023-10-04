import { useSelector } from 'react-redux';
import TodoItem, { TodoItemProps } from '../todo-item/todo-item';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

type WIPProps = {
  idList: number[];
}

const WIPList = ({ idList }: WIPProps): JSX.Element => {
  const itemList = useAppSelector((state) => state.todoList);
  /*  const wipList = itemList.filter((item) => item.wip === true); */
  const [list, setList] = useState<TodoItemProps[]>([]);

  useEffect(() => {
    /* if (list.find((item) => item.id === id)) {
      setList(list.push(itemList.find((item) => item.id === id)));
    } */
    idList.forEach((id) => {
      const element = itemList.find((item) => item.id === id);
      if (element) {
        list.push(element);
      }
    });
  }, [idList])
  return (
    <>
      {list.length !== 0 ?
        list.map((item) => {
          return (
            <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} />
          );
        }) : <p>Nothing to be done</p>}
    </>
  );
}

export default WIPList;
