import Header from "./components/Header";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <>
      <div className="bg-mobile-light dark:bg-mobile-dark md:bg-desktop-light md:dark:bg-desktop-dark bg-cover h-[200px] md:h-[300px] w-full absolute z-[-1]"></div>
      <div className="w-full px-6 pt-11 md:pt-20 md:max-w-[580px] md:mx-auto">
        <Header />
        <TodoApp />
        <p className="text-base text-center mt-10 text-dark-grayish-blue2">
          Drag and drop to reorder list
        </p>
      </div>
    </>
  );
}

export default App;
