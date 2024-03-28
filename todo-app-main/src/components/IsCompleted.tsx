type Props = {
  isCompleted: boolean;
};

function IsCompleted({ isCompleted }: Props) {
  return (
    <div className="relative flex items-center justify-center rounded-full h-5 w-5">
      <div
        className={`absolute transition-opacity duration-300 ${
          isCompleted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-br from-gradient-start to-gradient-end">
          <img src="images/icon-check.svg" alt="Checked" />
          <span className="sr-only">Click to check as uncompleted</span>
        </div>
      </div>
      <div
        className={`absolute transition-opacity duration-300 ${
          isCompleted ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="md:bg-gradient-to-br md:from-gradient-start md:to-gradient-end md:hover:p-[1px] rounded-full">
          <div className="md:hover:border-none md:dark:bg-very-dark-desaturated-blue md:bg-white rounded-full h-5 w-5 border border-light-grayish-blue dark:border-very-dark-grayish-blue">
            <span className="sr-only">Click to check as completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsCompleted;
