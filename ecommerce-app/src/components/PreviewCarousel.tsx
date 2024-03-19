import { useId, useState } from "react";
import { useCartContext } from "../context/CartContext";

type Props = {
  isModalWindow?: boolean;
  openModal?: () => void;
};

function PreviewCarousel({ isModalWindow = false, openModal }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cartProduct } = useCartContext();
  const { images, thumbnails } = cartProduct;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClickChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div className="relative">
        <div className="w-full h-[320px] lg:h-auto lg:rounded-xl overflow-hidden">
          <div
            onClick={openModal}
            className={`flex transition-all duration-[800ms] ${
              !isModalWindow ? "hover:cursor-pointer" : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={useId()}
                className={`w-full h-full flex-none opacity-0 transition-opacity duration-500 ${
                  isModalWindow ? "lg:h-[520px]" : "lg:h-[440px]"
                } ${index === currentIndex ? "opacity-100" : ""}`}
              >
                <img
                  src={image}
                  alt="Slide"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            className={`${
              isModalWindow ? "" : "lg:hidden"
            } absolute w-10 h-10 pr-[2px] flex items-center justify-center top-1/2 left-4 lg:left-[-1.25rem] transform -translate-y-1/2 bg-white rounded-full`}
            onClick={handlePrevious}
            aria-label="swipe left"
          >
            <img
              className="w-[10px] h-[14px]"
              src="images/icon-previous.svg"
              alt="previous button"
            />
          </button>
          <button
            className={`${
              isModalWindow ? "" : "lg:hidden"
            } absolute w-10 h-10 pl-[2px] flex items-center justify-center top-1/2 right-4 lg:right-[-1.25rem] transform -translate-y-1/2 bg-white rounded-full`}
            onClick={handleNext}
            aria-label="swipe right"
          >
            <img
              className="w-[10px] h-[14px]"
              src="images/icon-next.svg"
              alt="next button"
            />
          </button>
        </div>
      </div>
      <div
        className={`hidden lg:flex justify-between lg:mt-7 ${
          isModalWindow ? "px-10" : ""
        }`}
      >
        {thumbnails.map((image, index) => (
          <button
            key={useId()}
            onClick={() => handleClickChange(index)}
            className={`group ${
              currentIndex === index ? "" : "hover:opacity-100"
            }`}
            aria-label="Click on image to change the big one"
          >
            <div
              className={`w-[85px] h-[85px] overflow-hidden rounded-md ${
                currentIndex === index
                  ? "border-2 border-[var(--orange)]"
                  : "border-2 border-transparent"
              }`}
            >
              <div className="relative">
                <img src={image} alt="thumbnail" />
                <div
                  className={`pointer-events-none z-10 absolute inset-0 bg-[var(--light-grayish-blue)] ${
                    currentIndex === index
                      ? "opacity-50"
                      : "opacity-0 group-hover:opacity-35"
                  }`}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PreviewCarousel;
