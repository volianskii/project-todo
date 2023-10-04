import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';
import DoneList from '../done-list/done-list';

const App = () => {
  return (
    <div className='main-container'>
      <h1>ToDo App</h1>
      <div className='container'>
        <section>
          <Add />
          <div className='grid-container'>
            <TodoList />
          </div>
          <CompletedCount />
        </section>
        <section className='task-list bg-yellow'>
          <h2>WIP</h2>
        </section>
        <section className='task-list bg-green'>
          <h2>Done</h2>
          <DoneList />
        </section>
      </div>
    </div>
  )
}

export default App;
