import { useSelector } from 'react-redux';
import TodoItem, { TodoItemProps } from '../todo-item/todo-item';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

type WIPProps = {
  onDrop: (e) => void;
  onDragOver: (e) => void;
}

const WIPList = ({ onDrop, onDragOver }: WIPProps): JSX.Element => {
  const itemList = useAppSelector((state) => state.todoList);
  const wipList = itemList.filter((item) => (item.wip === true) && (item.completed === false));

  return (
    <div onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)} className='WIPdiv'>
      <div className='grid-container'>
        {wipList.length !== 0 ?
          wipList.map((item) => {
            return (
              <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} />
            );
          }) : <p>Nothing to be done</p>}
      </div>
    </div>
  );
}

export default WIPList;
