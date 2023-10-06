import TodoItem from '../todo-item/todo-item';
import { DragEvent } from 'react';
import { useAppSelector } from '../../hooks';

type WIPProps = {
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragStart: (id: string) => void;
}

const WIPList = ({ onDrop, onDragOver, onDragStart }: WIPProps): JSX.Element => {
  const itemList = useAppSelector((state) => state.todoList);
  const wipList = itemList.filter((item) => (item.wip === true) && (item.completed === false));

  return (
    <div onDrop={(event) => onDrop(event)} onDragOver={(event) => onDragOver(event)} className='WIPdiv'>
      <div className='grid-container'>
        {wipList.length !== 0 ?
          wipList.map((item) => {
            return (
              <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} onDragStart={onDragStart} />
            );
          }) : <p>Nothing to be done</p>}
      </div>
    </div>
  );
}

export default WIPList;
