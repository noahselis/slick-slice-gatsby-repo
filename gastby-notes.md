what do multiple data sets look like in sanity?

NOTES ABOUT API TOKENS
- You don't want to put sensitive info like an api token in gatsby-config.
  - this file goes in your version control. the api token is called a 'secret' and you don't put secrets in public.

- you have to put API tokens in a .env file.'
  - give it a name like API_TOKEN=<pasted-api-token>
  - download a package called dotenv and import into the file where you want to access the API token
  - write dotenv.config({ path: '.env' }); at the top of the file
  - token: process.env.SANITY_TOKEN

NOTES ABOUT QUERIES
- Page queries
  - Can be dynamic with variable.
  - Can only be run on a top level page (like on a page in the pages folder)
- Static Queries
  - Can not be dynamic, no variables can be passed in
  - Can be run anywhere