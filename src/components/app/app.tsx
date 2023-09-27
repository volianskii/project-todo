import '../../style/style.scss';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';

type AppProps = {
  name: string;
}

const App = ({ name }: AppProps) => {
  return (
    <div>
      <h1>ToDo App</h1>
      <Add />
      <TodoList />
    </div>
  )
}

export default App;
