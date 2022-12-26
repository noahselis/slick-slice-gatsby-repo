import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import defaultBeer from '../assets/images/default-beer.webp';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    font-size: 10px;
    color: black;

    border: 1px solid red;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;

  const placeholderImage = defaultBeer;

  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <>
      <SEO title={`BEERS! We have ${data.beers.nodes.length}`} />
      <h2 className="center">
        We have {beers.length} beers available. Dine in only
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img
                src={beer.image ? beer.image : placeholderImage}
                alt={beer.name}
                onError={(e) => onImageError(e)}
              />
              <p>{beer.name}</p>
              <p>{beer.price}</p>
              <p title={`${rating} out of five stars`}>
                {'⭐️'.repeat(rating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {'⭐️'.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const getAllBeers = graphql`
  query GetAllBeers {
    beers: allBeer {
      nodes {
        id
        image
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
