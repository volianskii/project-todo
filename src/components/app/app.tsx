import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';
import DoneList from '../done-list/done-list';
import WIPList from '../wip-list/wip-list';
import { useState, DragEvent } from 'react';
import { toggleFlagsAsync } from '../../store/todo-list/todo-list.slice';
import { useAppDispatch } from '../../hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const [dragItemId, setDragItemId] = useState<string>();

  const onOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    /* console.log(event);
    event.target.style.backgroundColor = 'lightgray'; */
    if (event.target.className == 'drop-div') {
      event.target.style.border = '5px dashed gray';
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
    }
    if (event.target.className == 'drop-div') {
      event.target.style.backgroundColor = 'unset';
      event.target.style.border = 'unset';
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
    }
    if (event.target.className == 'drop-div') {
      event.target.style.backgroundColor = 'unset';
      event.target.style.border = 'unset';
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
    }
    if (event.target.className == 'drop-div') {
      event.target.style.backgroundColor = 'unset';
      event.target.style.border = 'unset';
    };
  };
  const onDragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {

    event.preventDefault();
    /* console.log(event);
    event.target.style.backgroundColor = 'lightgray'; */
    if (event.target.className == 'drop-div') {
      event.target.style.backgroundColor = 'unset';
      event.target.style.border = 'unset';
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
