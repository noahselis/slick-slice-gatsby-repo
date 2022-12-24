import { graphql } from 'gatsby';
import React from 'react';

import ToppingsFilter from '../components/ToppingsFilter';
import PizzaList from '../components/PizzaList';

export default function PizzaPage({ data, pageContext }) {
  const pizzas = data.pizzas?.nodes;
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// page query. what you call the constant doesn't matter. some folks like to call that variable pageQuery
// what goes in the back ticks is what you define in the GraphiQL gui. so, what shape do you want your data to come back to you and be saved in that query variable?
export const getAllPizzas = graphql`
  query GetAllPizzas($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              # this is a 'fragment' in GraphQL. it's a collection of fields that we want. another way of saying 'give me everything'
              # the name of this fragment specifically comes from the package that we just downloaded
              ...GatsbySanityImageFluid
            }
            # alternate 'fixed width' syntax
            # fixed(width: 200, height: 200) {
            #   ...GatsbySanityImageFixed
            # }
          }
        }
      }
    }
  }
`;
