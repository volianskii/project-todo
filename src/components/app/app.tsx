import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';
import CompletedCount from '../completed-count/completed-count';

type AppProps = {
  name: string;
}

const App = ({ name }: AppProps) => {
  return (
    <div>
      <h1>ToDo App</h1>
      <Add />
      <TodoList />
      <CompletedCount />
    </div>
  )
}

export default App;
