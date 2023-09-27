import { FormEvent } from "react";

type TodoItemProps = {
  title: string;
}

const TodoItem = ({ title }: TodoItemProps): JSX.Element => {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`${title} deleted`);
  }

  return (
    <div>
      <form>
        <input type="checkbox" />
      </form>
      <p>{title}</p>
      <form onSubmit={submitHandler}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default TodoItem;
