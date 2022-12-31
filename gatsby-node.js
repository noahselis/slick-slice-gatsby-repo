import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get a template for this page
  // the path.resolve is a node api that comes with npm out of the box. it's how we get the file path in the argument onto this file
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the path for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // passing data from this function into our single pizza page can be done via context
      // you can see what context you pass by opening up the react dev tools and looking at the pageContext props
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get a template for this page
  // the path.resolve is a node api that comes with npm out of the box. it's how we get the file path in the argument onto this file
  // we don't need a brand new template like we did in turnPizzasIntoPages because we're just shortening the total amount of pizzas that are shown on the page to begin with
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 3. loop over each pizza and create a page for that pizza
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({ actions, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      parent: null,
      children: [],
      id: beer.name,
      internal: {
        type: 'Beer',
        mediaType: 'application/json', // this is here so that other plugins looking for that media can find it
        contentDigest: createContentDigest(beer), // just an internal thing in gatsby so that it knows whether the data has changed or not
      },
    };
    // 3. create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1. create template for dynamic slicemasters page
  // 2. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: 3. turn each sliceMaster into a page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve(`./src/templates/Slicemaster.js`),
      path: `/slicemasters/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 4. figure out how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE); // env variables are strings, which is odd, so we have to wrap this whole thing in a parseInt
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 5. loop from 1 to x and create the pages for them
  Array.from({ length: pageCount }).forEach((_, index) => {
    actions.createPage({
      path: `/slicemasters/${index + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // create pages dynamically
  // the functions turnPizzasIntoPages, turnToppingsIntoPages, and turnPeopleIntoPages are all completely separate actions
  // that is, we don't have to wait before one to be done before we can run the next one.
  // we can run these promise-based (asynchronous) functions CONCURRENTLY with a Promise.all and that will speed up our application overall

  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);
  // 1. pizzas
  // 2. toppings
  // 3. slice masters
}
