import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function PizzaList({ pizzas }) {
  return (
    <>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
}

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        {/* the prop 'fluid' is a Gatsby-specific prop that makes the image responsive */}
        {/* using 'fixed' images requires changing fluid to fixed */}
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      </Link>
    </div>
  );
}
