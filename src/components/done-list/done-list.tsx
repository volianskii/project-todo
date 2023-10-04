import TodoItem from '../todo-item/todo-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useEffect } from 'react';
import { getTodosAsync } from '../../store/todo-list/todo-list.slice';
import React from 'react';

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
