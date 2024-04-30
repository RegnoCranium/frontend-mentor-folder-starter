import { useEffect, useState } from "react";
import Card from "./components/Card";
import { cardData } from "./types/types";
import FiltersContainer from "./components/FiltersContainer";

function App() {
  const [data, setData] = useState<cardData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const hasLocalStorageData = data.length > 0;

    if (!hasLocalStorageData) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const clearFilters = () => {
    setFilters([]);
  };

  const deleteFilter = (filter: string) => {
    const newFilters = filters.filter((innerFilter) => innerFilter !== filter);

    setFilters(newFilters);
  };

  const addFilter = (filter: string) => {
    const newFilters = new Set([...filters, filter]);

    setFilters([...newFilters]);
  };

  const filterElements = (tags: string[]) => {
    for (let filter of filters) {
      if (!tags.includes(filter)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="text-[15px] font-medium font-leagueSpartan">
      <div className="bg-desaturated-dark-cyan">
        <img
          className="w-full h-[156px] md:hidden"
          src="./images/bg-header-mobile.svg"
          alt="Background image"
        />
        <img
          className="w-full h-[156px] md:block hidden"
          src="./images/bg-header-desktop.svg"
          alt="Background image"
        />
      </div>
      {filters.length != 0 && (
        <FiltersContainer
          filters={filters}
          clearFilters={() => clearFilters()}
          deleteFilter={deleteFilter}
        />
      )}
      <main
        style={{
          paddingTop:
            filters.length !== 0
              ? `${
                  window.innerWidth > 768
                    ? 100
                    : 100 + Math.floor(filters.length / 2) * 28
                }px`
              : "56px",
        }}
        className={`flex flex-col gap-10 px-5 md:px-[15%] 2xl:px-[21%] pb-6 min-h-screen w-full bg-light-grayish-cyan-background transition-all duration-500 ease-in-out`}
      >
        {isLoading
          ? "Loading..."
          : data.map((cardData) => (
              <Card
                key={cardData.id}
                cardData={cardData}
                addFilter={addFilter}
                filterElements={filterElements}
              />
            ))}
      </main>
    </div>
  );
}

export default App;
