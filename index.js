const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = 4000;

// Define the schema
const schema = buildSchema(`type Query{
    hello : String
}`);

// Define the resolvers
const root = {
  hello: () => "Hello World!",
};

// Create a express server and graphql endpoints
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
app.listen(PORT, () => {
  console.log("The server is up in port" + PORT);
});
