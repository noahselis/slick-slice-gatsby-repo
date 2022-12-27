import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // We got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // now we access both our state and our updater function via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things to order
  function removeFromOrder(index) {
    setOrder([
      // everything BEFORE the item we want to remove
      ...order.slice(0, index),
      // everything AFTER the item we want to remove
      ...order.slice(index + 1), // if you omit the second argument of slice, it will just go to the end
    ]);
  }
  // 4. send this data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
