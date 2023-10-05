import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';
import DoneList from '../done-list/done-list';
import WIPList from '../wip-list/wip-list';
import { useState } from 'react';
import { toggleWIPAsync } from '../../store/todo-list/todo-list.slice';
import { useAppDispatch } from '../../hooks';

const App = () => {
  const dispatch = useAppDispatch();
  //сохраняем id переносимого таска
  const [dragItemId, setDragItemId] = useState<string>();
  const onWIPDropHandler = (event: DragEvent) => {
    event.preventDefault();
    console.log(`dispatching ${dragItemId}`);
    if (dragItemId) {
      dispatch(toggleWIPAsync({
        id: dragItemId,
        wip: true
      }));
    }
  }
  const onWIPOverHandler = (event: DragEvent) => {
    event.preventDefault();
  }
  const onDragStartHandler = (id: string) => {
    /* console.log(id); */
    setDragItemId(id);
  };

  return (
    <div className='main-container'>
      <h1>ToDo App</h1>
      <div className='container'>
        <section>
          <Add />
          <div className='grid-container'>
            <TodoList onDragStart={onDragStartHandler} />
          </div>
          <CompletedCount />
        </section>
        <section className='task-list bg-yellow'>
          <h2>WIP</h2>
          <WIPList onDragOver={onWIPOverHandler} onDrop={onWIPDropHandler} />
        </section>
        <section className='task-list bg-green'>
          <h2>Done</h2>
          <div className='grid-container'>
            <DoneList />
          </div>
        </section>
      </div>
    </div>
  )
}

export default App;
