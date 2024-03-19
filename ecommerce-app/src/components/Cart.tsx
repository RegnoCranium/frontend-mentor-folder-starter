import { useCartContext } from "../context/CartContext";
import "./cartAnimation.css";

type Props = {
  isCartOpen: boolean;
};

function Cart({ isCartOpen }: Props) {
  const { cartProduct, setCartProduct } = useCartContext();
  const { name, price, previewImage, amount } = cartProduct;

  return (
    <div
      className={`overflow-hidden rounded-lg shadow-2xl absolute z-30 py-5 right-[2.5%] w-[95vw] min-h-52 max-w-[375px] bg-white cart ${
        isCartOpen ? "open" : "pointer-events-none"
      }`}
    >
      <span className="font-bold px-5">Cart</span>
      <div className="h-px mt-7 mb-6 bg-gray-200"></div>
      {amount ? (
        <>
          <div className="flex px-5">
            <img
              className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md mr-3"
              src={previewImage}
              alt="image of product"
            />
            <div className="flex flex-col text-[var(--dark-grayish-blue)]">
              <span>{name}</span>
              <div>
                ${price} x {amount}{" "}
                <span className="font-bold text-[var(--black-75)]">
                  ${(price * amount).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCartProduct({ ...cartProduct, amount: 0 })}
              className="ml-7"
              aria-label={`Delete the product - ${name}`}
            >
              <img src="images/icon-delete.svg" alt="" />
            </button>
          </div>
          <div className="px-5 mt-5">
            <button
              aria-label="Checkout"
              className="text-white hover:opacity-75 font-bold w-full shadow-lg shadow-[var(--pale-orange)] flex gap-3 justify-center bg-[var(--orange)] py-4 overflow-hidden rounded-lg"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[60px] font-bold text-[var(--dark-grayish-blue)]">
          Your cart is empty
        </div>
      )}
    </div>
  );
}

export default Cart;
