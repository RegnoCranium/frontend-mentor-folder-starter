type Props = {
  btnText: string[];
  sortRule: number;
  setSortRule: (index: number) => void;
};

const FilterButtons = ({ btnText, sortRule, setSortRule }: Props) => {
  return (
    <div className="md:shadow-none h-14 font-bold text-base flex shadow-md rounded-md justify-center items-center gap-5 bg-white dark:bg-very-dark-desaturated-blue text-dark-grayish-blue">
      {btnText.map((text, index) => (
        <button
          className={`${
            sortRule === index
              ? "text-bright-blue"
              : "hover:text-very-dark-grayish-blue dark:hover:text-white"
          }`}
          key={text}
          onClick={() => setSortRule(index)}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
