import IsCompleted from "./IsCompleted";
import React, { ReactElement } from "react";

type TodoObj = {
  text: string;
  isCompleted: boolean;
  order: number;
  id: string;
};

type TodosListProps = {
  todos: TodoObj[];
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  onDragStart: (e: any, todo: TodoObj) => void;
  onDrop: (e: any, todo: TodoObj) => void;
  onDragLeave: (e: any) => void;
  onDragEnd: (e: any) => void;
  onDragOver: (e: any) => void;
  rawTodos: TodoObj[];
  children: ReactElement;
};

function TodosList({
  todos,
  completeTodo,
  deleteTodo,
  clearCompleted,
  onDragStart,
  onDrop,
  onDragLeave,
  onDragEnd,
  onDragOver,
  rawTodos,
  children,
}: TodosListProps) {
  return (
    <div className="flex flex-col shadow-lg bg-white rounded-md dark:bg-very-dark-desaturated-blue">
      <ul className="flex flex-col max-h-[50vh] overflow-y-auto">
        {todos
          .sort((a, b) => a.order - b.order)
          .map((todo) => (
            <React.Fragment key={todo.id}>
              <li
                onDragStart={(e) => onDragStart(e, todo)}
                onDragLeave={(e) => onDragLeave(e)}
                onDragEnd={(e) => onDragEnd(e)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, todo)}
                draggable={true}
                className="flex items-center px-5 gap-3 h-14 md:h-16 shrink-0 group"
              >
                <button onClick={() => completeTodo(todo.id)}>
                  <IsCompleted isCompleted={todo.isCompleted} />
                </button>
                <div className="hover:cursor-grab w-full">
                  <p
                    className={`pt-[1px] text-base max-h-12 overflow-y-auto break-all ${
                      todo.isCompleted
                        ? "dark:text-very-dark-grayish-blue text-light-grayish-blue line-through"
                        : "dark:text-light-grayish-blue text-very-dark-grayish-blue2"
                    }`}
                  >
                    {todo.text}
                  </p>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-auto scale-90 shrink-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                >
                  <img src="images/icon-cross.svg" alt="Delete" />
                </button>
              </li>
              <div className="h-px shrink-0 bg-light-grayish-blue dark:bg-very-dark-grayish-blue"></div>
            </React.Fragment>
          ))}
      </ul>
      <div className="h-14 px-5 flex items-center justify-between text-sm text-dark-grayish-blue dark:text-very-dark-grayish-blue">
        <p>{rawTodos.filter((e) => !e.isCompleted).length} items left</p>
        <div className="hidden md:block">{children}</div>
        <button
          className="hover:text-very-dark-grayish-blue dark:hover:text-white"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodosList;
