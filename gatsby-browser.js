import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// if you want data to persist from page to page, you have to wrap the root element and set up some context
// context allows us to store data and functionality (like state and utility functions) at the highest level and access it at a much lower level without having to pass it down via props
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
