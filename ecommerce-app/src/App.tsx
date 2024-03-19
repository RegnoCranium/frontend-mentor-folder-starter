import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { CartProvider } from "./context/CartContext";
import PreviewCarousel from "./components/PreviewCarousel";
import useStopScroll from "./hooks/useStopScroll";

function App() {
  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useStopScroll(isModalOpen);

  return (
    <div className="font-kumbhsans max-w-[1500px] mx-auto overflow-x-hidden">
      <CartProvider>
        <div className="max-w-[640px] lg:max-w-[80%] mx-auto">
          <Header />
          <div className="h-px mb-16 bg-gray-200 hidden lg:block"></div>
          <div className="max-w-[400px] mx-auto lg:max-w-full lg:flex lg:px-[4%]">
            <div className="basis-1/2 lg:max-w-[440px]">
              <PreviewCarousel
                openModal={() => {
                  const body = document.body;
                  if (body.clientWidth <= 1024) {
                    return null;
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              />
            </div>
            <div className="lg:w-[15%]"></div>
            <div className="basis-1/2 lg:mt-[5%] lg:max-w-[450px]">
              <Main
                amount={amount}
                increaseAmount={() => {
                  if (amount >= 69) return;
                  setAmount((prev) => prev + 1);
                }}
                decreaseAmount={() => {
                  if (amount === 0) return;
                  setAmount((prev) => prev - 1);
                }}
              />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="hidden pointer-events-none lg:flex lg:pointer-events-auto fixed inset-0 z-50 items-center justify-center bg-[var(--black-75)]">
            <div className="lg:max-w-[520px] flex flex-col">
              <button
                className="ml-auto mb-4"
                onClick={() => setIsModalOpen(false)}
              >
                <img
                  className="w-5"
                  src="images/icon-close-white.svg"
                  alt="close fullscreen window"
                />
              </button>
              <div className="hidden lg:block">
                <PreviewCarousel isModalWindow />
              </div>
            </div>
          </div>
        )}
      </CartProvider>
    </div>
  );
}

export default App;
