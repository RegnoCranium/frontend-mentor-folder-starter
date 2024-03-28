import { useState } from "react";

type TodoFormProps = {
  addTodo: (todoText: string) => void;
};

function TodosForm({ addTodo }: TodoFormProps) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-white px-5 py-4 rounded-md gap-3 dark:bg-very-dark-desaturated-blue">
          <div className="rounded-full h-5 w-5 border bg:light-grayish-blue dark:border-very-dark-grayish-blue shrink-0"></div>
          <input
            className="caret-bright-blue w-full h-full outline-none text-base bg-transparent text-very-dark-grayish-blue2 dark:text-light-grayish-blue"
            placeholder="Create a new todo..."
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
        </div>
      </form>
    </div>
  );
}

export default TodosForm;
