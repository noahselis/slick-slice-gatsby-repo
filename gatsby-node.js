import path from 'path';

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
  console.log(`TURN TOPPINGS INTO PAGES!!!`);
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
    console.log('creating page for topping', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
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
  ]);
  // 1. pizzas
  // 2. toppings
  // 3. slice masters
}
