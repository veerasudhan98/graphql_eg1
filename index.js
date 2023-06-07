const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = 4000;

// Define the schema
const schema = buildSchema(`type Book{
    id: ID!
    title: String!
    author: String!
}
type Query {
    book(id: ID!): Book
    books: [Book]
}
`);

// Define the resolvers
const booksData = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
  },
  {
    id: "3",
    title: "Book 3",
    author: "Author 3",
  },
];

const root = {
  book: ({ id }) => booksData.find((book) => book.id === id),
  books: () => booksData,
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
