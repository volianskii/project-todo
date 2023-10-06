import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';
import DoneList from '../done-list/done-list';
import WIPList from '../wip-list/wip-list';
import { useState, DragEvent } from 'react';
import { toggleCompletedAsync, toggleWIPAsync } from '../../store/todo-list/todo-list.slice';
import { useAppDispatch } from '../../hooks';

const App = () => {
  const dispatch = useAppDispatch();
  //сохраняем id переносимого таска
  const [dragItemId, setDragItemId] = useState<string>();
  const onWIPDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleWIPAsync({
        id: dragItemId,
        wip: true,
        completed: false
      }));
      dispatch(toggleCompletedAsync({
        id: dragItemId,
        completed: false,
        wip: true
      }));
    }
  };
  const onOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDragStartHandler = (id: string) => {
    setDragItemId(id);
  };
  const onDoneDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleWIPAsync({
        id: dragItemId,
        wip: false,
        completed: true
      }));
      dispatch(toggleCompletedAsync({
        id: dragItemId,
        completed: true,
        wip: false
      }));
    }
  };
  const onTodoDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragItemId) {
      dispatch(toggleWIPAsync({
        id: dragItemId,
        wip: false,
        completed: false
      }));
      dispatch(toggleCompletedAsync({
        id: dragItemId,
        completed: false,
        wip: false
      }));
    }
  }

  return (
    <div className='main-container'>
      <h1>ToDo App</h1>
      <div className='container'>
        <section className='task-list bg-pink'>
          <h2>Backlog</h2>
          <Add />
          <TodoList onDragOver={onOverHandler} onDrop={onTodoDropHandler} onDragStart={onDragStartHandler} />
          <CompletedCount />
        </section>
        <section className='task-list bg-yellow'>
          <h2>WIP</h2>
          <WIPList onDragOver={onOverHandler} onDrop={onWIPDropHandler} onDragStart={onDragStartHandler} />
        </section>
        <section className='task-list bg-green'>
          <h2>Done</h2>
          <DoneList onDragOver={onOverHandler} onDrop={onDoneDropHandler} onDragStart={onDragStartHandler} />
        </section>
      </div>
    </div>
  )
}

export default App;
