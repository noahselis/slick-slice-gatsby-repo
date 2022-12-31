import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

// TODO: BUG: when the path in the url is /slicemasters/2/${slicemaster}, a 404 is returned
// the pagination is not playing nice with our path

export default function SlicemasterPage({ data: { person } }) {
  return (
    <>
      <SEO title={person.name} image={person.image.asset.src} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
