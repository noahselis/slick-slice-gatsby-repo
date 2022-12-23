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
  console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the path for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // passing data from this function into our single pizza page can be done via context
      // you can see what context you pass by opening up the react dev tools and looking at the pageContext props
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  // create pages dynamically
  // 1. pizzas
  await turnPizzasIntoPages(params);
  // 2. toppings
  // 3. slice masters
}
