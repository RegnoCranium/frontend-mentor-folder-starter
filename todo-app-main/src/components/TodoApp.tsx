import { useState } from "react";
import TodosForm from "./TodosForm";
import TodosList from "./TodosList";
import { useLocalStorage } from "usehooks-ts";
import FilterButtons from "./FilterButtons";

type TodoObj = {
  text: string;
  isCompleted: boolean;
  order: number;
  id: string;
};

const btnText = ["All", "Active", "Completed"];

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage<TodoObj[]>("todos", []);
  const [sortRule, setSortRule] = useState(0);
  const [currentTodo, setCurrentTodo] = useState<TodoObj>();

  const addTodo = (todoText: string) => {
    if (todoText.trim() === "") return;
    const sortedTodos = todos.sort((a, b) => a.order - b.order);
    setTodos(() => [
      ...sortedTodos,
      {
        text: todoText.trim(),
        isCompleted: false,
        order: sortedTodos.length
          ? sortedTodos[sortedTodos.length - 1].order + 1
          : 0,
        id: Date.now().toString().slice(-6),
      },
    ]);
  };

  const completeTodo = (id: string) => {
    const newTodos = todos.map((e) => {
      if (e.id === id) {
        return { ...e, isCompleted: !e.isCompleted };
      } else {
        return e;
      }
    });

    setTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((e) => e.id !== id);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((e) => e.isCompleted === false);
    setTodos(newTodos);
  };

  const sortTodos = (todos: TodoObj[], sortRule: number) => {
    switch (sortRule) {
      case 0: // All
        return todos;
      case 1: // Active
        return todos.filter((todo) => !todo.isCompleted);
      case 2: // Completed
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  };

  const onDragStart = (_e: any, todo: TodoObj) => {
    setCurrentTodo(todo);
  };

  const onDragLeave = (e: any) => {
    e.currentTarget.classList.remove("translate-y-[-5px]", "duration-300");
  };

  const onDragEnd = (e: any) => {
    e.currentTarget.classList.remove("translate-y-[-5px]", "duration-300");
  };

  const onDragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.classList.add("translate-y-[-5px]", "duration-300");
  };

  const onDrop = (e: any, todo: TodoObj) => {
    e.stopPropagation();
    e.preventDefault();
    setTodos(
      todos.map((todoInner) => {
        if (todoInner.text === todo.text) {
          return { ...todoInner, order: currentTodo!.order };
        }
        if (todoInner.text === currentTodo!.text) {
          return { ...todoInner, order: todo.order };
        }
        return todoInner;
      })
    );
    e.currentTarget.classList.remove("translate-y-[-5px]", "duration-300");
  };

  const sortedTodos = sortTodos(todos, sortRule);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TodosForm addTodo={addTodo} />
      <TodosList
        todos={sortedTodos}
        rawTodos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        clearCompleted={clearCompleted}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="pl-8">
          <FilterButtons
            btnText={btnText}
            sortRule={sortRule}
            setSortRule={(index) => setSortRule(index)}
          />
        </div>
      </TodosList>
      <div className="md:hidden">
        <FilterButtons
          btnText={btnText}
          sortRule={sortRule}
          setSortRule={(index) => setSortRule(index)}
        />
      </div>
    </div>
  );
};

export default TodoApp;
