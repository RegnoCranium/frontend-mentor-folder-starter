type Props = {
  filters: string[];
  clearFilters: () => void;
  deleteFilter: (filter: string) => void;
};

function FiltersContainer({ filters, clearFilters, deleteFilter }: Props) {
  return (
    <div className="absolute top-32 px-5 md:px-[15%] 2xl:px-[21%] w-full">
      <div className="bg-white py-4 px-5 rounded-md shadow-md flex justify-between items-center font-bold">
        <div className="flex gap-3 flex-wrap w-full pr-8 text-desaturated-dark-cyan">
          {filters.map((filter, index) => (
            <div
              key={"filter:" + index}
              className="flex rounded-md overflow-hidden"
            >
              <div className="p-1 px-2 bg-light-grayish-cyan-background">
                {filter}
              </div>
              <button
                onClick={() => deleteFilter(filter)}
                className="bg-desaturated-dark-cyan hover:bg-very-dark-grayish-cyan px-2"
              >
                <img
                  className="w-3"
                  src="./images/icon-remove.svg"
                  alt="Cross Symbol"
                />
                <span className="sr-only">Delete {filter} filter</span>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={clearFilters}
          className="shrink-0 text-dark-grayish-cyan text-sm hover:underline hover:text-desaturated-dark-cyan transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FiltersContainer;
