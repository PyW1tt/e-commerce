import React, { useState } from "react";

const AddProductContext = React.createContext();

function AddProductProvide(props) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const totalCount = cartItems.length;
  const [orderSummaries, setOrderSummaries] = useState([]);

  const totalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const summariesPrice = orderSummaries.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <AddProductContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalCount,
        open,
        setOpen,
        orderSummaries,
        setOrderSummaries,
        totalPrice,
        summariesPrice,
      }}
    >
      {props.children}
    </AddProductContext.Provider>
  );
}

const useAddProduct = () => React.useContext(AddProductContext);

export { AddProductProvide, useAddProduct };
