import { useCartContext } from "../context/CartContext";
import "./colors.css";

type Props = {
  amount: number;
  increaseAmount: () => void;
  decreaseAmount: () => void;
};

const product = {
  name: "Fall Limited Edition Sneakers",
  price: 125,
  previewImage: "images/image-product-1-thumbnail.jpg",
};

function Main({ amount, increaseAmount, decreaseAmount }: Props) {
  const { setCartProduct } = useCartContext();

  function updateCart() {
    setCartProduct((prev) => {
      const images = prev.images;
      const thumbnails = prev.thumbnails;
      const newCartProduct = { ...product, amount, images, thumbnails };
      return newCartProduct;
    });
  }

  return (
    <main className="px-7 mt-4 mb-10 lg:m-0 lg:p-0">
      <span className="text-[var(--orange)] tracking-widest uppercase font-bold text-xs lg:text-sm">
        sneaker company
      </span>
      <h1 className="text-2xl font-bold text-[var(--black-75)] my-3 lg:text-5xl lg:mb-10 lg:mt-5">
        Fall Limited Edition Sneakers
      </h1>
      <p className="text-sm leading-relaxed text-[var(--dark-grayish-blue)] lg:text-base">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they’ll withstand everything the
        weather can offer.
      </p>
      <div className="flex justify-between items-center my-5 font-bold lg:flex-col lg:items-start lg:my-6">
        <div className="flex gap-3 items-center mb-2">
          <span className="text-2xl text-[var(--black-75)] lg:text-[28px]">
            $125.00
          </span>
          <span className="text-[var(--orange)] bg-[var(--pale-orange)] h-full px-2 overflow-hidden rounded-md">
            50%
          </span>
        </div>
        <span className="text-[var(--grayish-blue)] line-through">$250.00</span>
      </div>
      <div className="lg:flex lg:gap-3">
        <div className="lg:basis-[35%] lg:shrink-0 lg:mb-0 flex items-center justify-between px-4 py-4 mb-4 bg-[var(--light-grayish-blue)] overflow-hidden rounded-lg">
          <button
            className="h-[24px] hover:opacity-75"
            onClick={decreaseAmount}
          >
            <svg
              width="12"
              height="4"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                  id="a"
                />
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlinkHref="#a" />
            </svg>
            <span className="sr-only">
              decrease amount of things that will be added in the cart
            </span>
          </button>
          <span className="font-bold">{amount}</span>
          <button
            className="h-[24px] hover:opacity-75"
            onClick={increaseAmount}
          >
            <svg
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                  id="b"
                />
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlinkHref="#b" />
            </svg>
            <span className="sr-only">
              increase amount of things that will be added in the cart
            </span>
          </button>
        </div>
        <button
          onClick={updateCart}
          className="hover:opacity-75 w-full shadow-xl shadow-[var(--pale-orange)] flex gap-3 justify-center bg-[var(--orange)] py-4 overflow-hidden rounded-lg"
        >
          <svg
            className="transform scale-90"
            width="22"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#FFFFFF"
              fill-rule="nonzero"
            />
          </svg>
          <span className="text-white font-bold">Add to cart</span>
        </button>
      </div>
    </main>
  );
}

export default Main;
