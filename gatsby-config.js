require = require('esm')(module);
module.exports = require('./gatsby-config.esm.js');

// import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

// export default {
//   siteMetadata: {
//     title: `Slick's Slices`,
//     siteUrl: 'https://gatsby.pizza',
//     description: 'The best pizza place in Hamilton',
//     twitter: '@slicksSlices',
//   },
//   plugins: [
//     // this plugin is a styled components plugin that surfaces the critical css to gastby so that it can load that first on render
//     'gatsby-plugin-styled-components',
//     {
//       // this is the name of the plug in you are adding
//       // when it comes to sourcing data from a wordpress backend, you'll want this plug in: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/why-use-this-plugin.md
//       resolve: 'gatsby-source-sanity',
//       options: {
//         // manage.sanity.io, click on project
//         projectId: '5m494i71',
//         dataset: 'production',
//         // when in development mode, and you make a change to your sanity cms, on save it will automatically be updated inside of gatsby. That way you don't have to rebuild the entire thing.
//         watchMode: true,
//         // settings... api... add new token...
//         token: process.env.SANITY_TOKEN,
//       },
//     },
//     'gatsby-plugin-react-helmet',
//   ],
// };
