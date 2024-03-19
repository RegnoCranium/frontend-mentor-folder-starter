import { createContext, ReactNode, useContext, useState } from "react";

type cartProduct = {
  name: string;
  price: number;
  previewImage: string;
  amount: number;
  images: string[];
  thumbnails: string[];
};

type CartContextProps = {
  cartProduct: cartProduct;
  setCartProduct: React.Dispatch<React.SetStateAction<cartProduct>>;
};

const initialValue: CartContextProps = {
  cartProduct: {
    name: "",
    price: 0,
    previewImage: "",
    amount: 0,
    images: [
      "src/images/image-product-1.jpg",
      "src/images/image-product-2.jpg",
      "src/images/image-product-3.jpg",
      "src/images/image-product-4.jpg",
    ],
    thumbnails: [
      "src/images/image-product-1-thumbnail.jpg",
      "src/images/image-product-2-thumbnail.jpg",
      "src/images/image-product-3-thumbnail.jpg",
      "src/images/image-product-4-thumbnail.jpg",
    ],
  },
  setCartProduct: () => {},
};

export const CartContext = createContext(initialValue);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProduct, setCartProduct] = useState<cartProduct>(
    initialValue.cartProduct
  );

  return (
    <CartContext.Provider value={{ cartProduct, setCartProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};
