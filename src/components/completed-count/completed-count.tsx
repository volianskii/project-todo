import { useAppSelector } from '../../hooks/index';

const CompletedCount = () => {
  const todoList = useAppSelector((state) => state.todoList);
  const completedTasks = todoList.filter((item) => item.completedStatus === true);

  return (
    <div>
      <p>Completed: {completedTasks.length}</p>
    </div>
  )
}

export default CompletedCount;