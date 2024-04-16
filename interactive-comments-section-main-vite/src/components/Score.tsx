type Props = {
  increaseScore: () => void;
  decreaseScore: () => void;
  score: number;
};

export default function Score({ increaseScore, decreaseScore, score }: Props) {
  return (
    <span className="flex sm:flex-col items-center gap-3 sm:gap-2 h-full sm:h-auto bg-very-light-gray rounded-lg px-3 sm:px-2 sm:py-1">
      <button
        className="h-6 shrink-0 flex items-center"
        onClick={increaseScore}
      >
        <img src="/icon-plus.svg" alt="Upvote" />
      </button>
      <span className="w-5 flex justify-center items-center text-moderate-blue font-medium">
        {score}
      </span>
      <button
        className="h-6 shrink-0 flex items-center"
        onClick={decreaseScore}
      >
        <img src="/icon-minus.svg" alt="Downvote" />
      </button>
    </span>
  );
}
