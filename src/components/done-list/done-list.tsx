import TodoItem from '../todo-item/todo-item';
import { useAppSelector } from '../../hooks/index';
import { DragEvent } from 'react';

type DoneListProps = {
  onDragStart: (id: string) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
}

const DoneList = ({ onDragStart, onDrop, onDragOver, onDragLeave }: DoneListProps): JSX.Element => {
  const itemsList = useAppSelector((state) => state.todoList);
  const doneList = itemsList.filter((item) => (item.completed === true && (item.wip === false)));

  return (
    <div onDrop={(event) => onDrop(event)} onDragOver={(event) => onDragOver(event)} onDragLeave={(event) => onDragLeave(event)} className='drop-div'>
      <div className='grid-container'>
        {doneList.length !== 0 ?
          doneList.map((item) => {
            return (
              <TodoItem title={item.title} id={item.id} key={item.id} completed={item.completed} onDragStart={onDragStart} />
            );
          }) : <p>Nothing's done yet</p>}
      </div>
    </div>
  );
}

export default DoneList;
