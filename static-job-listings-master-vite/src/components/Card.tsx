import { cardData } from "../types/types";

type Props = {
  cardData: cardData;
  addFilter: (filter: string) => void;
  filterElements: (tags: string[]) => boolean;
};

export default function Card({ cardData, addFilter, filterElements }: Props) {
  const {
    company,
    logo,
    new: isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = cardData;

  const tags = [role, level, ...languages, ...tools];

  return (
    <div
      className={`bg-white rounded-md p-6 pt-7 relative shadow-md lg:flex lg:items-center ${
        filterElements(tags) ? "" : "animate-slide-out"
      }`}
    >
      {featured && (
        <div className="absolute rounded-l-md h-full left-0 top-0 w-1 bg-desaturated-dark-cyan" />
      )}
      <img
        className="w-11 absolute top-[-20px] lg:static lg:h-full lg:w-auto lg:mr-5"
        src={logo}
        alt={`Logo of ${company}`}
      />
      <div className="flex flex-col border-b lg:border-b-0 border-gray-300 lg:mr-20 lg:shrink-0">
        <div className="mb-2 h-6 flex items-center lg:mb-1">
          <span className="mr-4 inline-block text-desaturated-dark-cyan font-bold lg:text-base">
            {company}
          </span>
          {isNew && (
            <span className="mr-2 h-full inline-block pt-[5px] px-2 rounded-xl bg-desaturated-dark-cyan text-xs text-white font-bold uppercase">
              New!
            </span>
          )}
          {featured && (
            <span className="h-full inline-block pt-[5px] px-2 rounded-xl bg-black text-xs text-white font-bold uppercase">
              Featured
            </span>
          )}
        </div>
        <div className="h-5 font-bold text-very-dark-grayish-cyan lg:text-lg hover:text-desaturated-dark-cyan transition-all duration-200">
          <a href="#">{position}</a>
        </div>
        <ul className="flex mb-4 mt-3 text-dark-grayish-cyan gap-5 list-disc lg:mb-0 lg:mt-2 lg:gap-7">
          <li className="list-none h-6 flex items-end">{postedAt}</li>
          <li className="lg:pl-2">{contract}</li>
          <li className="lg:pl-2">{location}</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 pr-3 text-base font-bold text-desaturated-dark-cyan mt-4 lg:mt-0 lg:ml-auto lg:gap-3">
        {tags.map((tag, index) => (
          <button
            onClick={() => addFilter(tag)}
            className="p-1 px-2 rounded-md bg-light-grayish-cyan-background hover:bg-desaturated-dark-cyan hover:text-white transition-all duration-200"
            key={"tag:" + index}
          >
            {tag}
            <span className="sr-only">Add {tag} tag to filters</span>
          </button>
        ))}
      </div>
    </div>
  );
}
