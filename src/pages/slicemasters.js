import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  /* if you want to target a gatsby image, this is the className that gatsby image gives them */
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 { 
    transform: rotate(-2deg)
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
    text-align: center;
  }
  .description {
    background: var(--yellow);
    text-align: center;
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
  }
`;

export default function SliceMasters({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SliceMasterGrid>
        {slicemasters.map((person) => (
          <SliceMasterStyles key={person.id}>
            <Link to={`${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SliceMasterGrid>
    </>
  );
}

// 1. query the data
// hott tipp: any data that is passed via context in ur gatsby-node file is available in ur graphql query as long as you specify it in the query with arguments.
// for example in this query, we've set it up to accept variables passed via context and given them default values.
// we then pass them down to the specific query that we want to use those values, in this case the slicemasters query.
// limit and skip are two 'functions' of sorts that have access to in graphql and you can find those in graphiql
export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
