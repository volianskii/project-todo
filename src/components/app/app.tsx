import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';
import DoneList from '../done-list/done-list';
import WIPList from '../wip-list/wip-list';
import { useState, DragEvent } from 'react';
import { toggleFlagsAsync, toggleStatus } from '../../store/todo-list/todo-list.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const [dragItemId, setDragItemId] = useState<string>();

  const onOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if ((event.target as HTMLDivElement).className == 'drop-div') {
      (event.target as HTMLDivElement).style.border = '5px dashed gray';
      (event.target as HTMLDivElement).style.transition = '0.2s';
    }
  };

  const onDragStartHandler = (id: string) => {
    setDragItemId(id);
  };

  const onWIPDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleFlagsAsync({
        id: dragItemId,
        completed: false,
        wip: true
      }));
      dispatch(toggleStatus({
        id: dragItemId,
        completed: false,
        wip: true
      }));
    }
    if ((event.target as HTMLDivElement).className == 'drop-div') {
      (event.target as HTMLDivElement).style.backgroundColor = 'unset';
      (event.target as HTMLDivElement).style.border = 'unset';
    };
  };

  const onDoneDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleFlagsAsync({
        id: dragItemId,
        completed: true,
        wip: false
      }));
      dispatch(toggleStatus({
        id: dragItemId,
        completed: true,
        wip: false
      }));
    }
    if ((event.target as HTMLDivElement).className == 'drop-div') {
      (event.target as HTMLDivElement).style.backgroundColor = 'unset';
      (event.target as HTMLDivElement).style.border = 'unset';
    };
  };

  const onTodoDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleFlagsAsync({
        id: dragItemId,
        completed: false,
        wip: false
      }));
      dispatch(toggleStatus({
        id: dragItemId,
        completed: false,
        wip: false
      }));
    }
    if ((event.target as HTMLDivElement).className == 'drop-div') {
      (event.target as HTMLDivElement).style.backgroundColor = 'unset';
      (event.target as HTMLDivElement).style.border = 'unset';
    };
  };

  const onDragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {

    event.preventDefault();
    if ((event.target as HTMLDivElement).className == 'drop-div') {
      (event.target as HTMLDivElement).style.backgroundColor = 'unset';
      (event.target as HTMLDivElement).style.border = 'unset';
    };
  };

  return (
    <div className='main-container'>
      <h1>ToDo App</h1>
      <div className='container'>
        <div className='container-column'>
          <section className='task-list bg-pink'>
            <h2>Backlog</h2>
            <Add />
            <TodoList onDragOver={onOverHandler} onDrop={onTodoDropHandler} onDragStart={onDragStartHandler} onDragLeave={onDragLeaveHandler} />
            <CompletedCount />
          </section>
        </div>
        <div className='container-column'>
          <section className='task-list bg-yellow'>
            <h2>WIP</h2>
            <WIPList onDragOver={onOverHandler} onDrop={onWIPDropHandler} onDragStart={onDragStartHandler} onDragLeave={onDragLeaveHandler} />
          </section>
        </div>
        <div className='container-column'>
          <section className='task-list bg-green'>
            <h2>Done</h2>
            <DoneList onDragOver={onOverHandler} onDrop={onDoneDropHandler} onDragStart={onDragStartHandler} onDragLeave={onDragLeaveHandler} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default App;
