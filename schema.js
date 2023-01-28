import { buildSchema } from "graphql"

export default buildSchema(
  `
  type Book {
    _id: ID!
    name: String!
    genre: String!
  }

  input BookInterface {
    name: String!
    genre: String!
  }

  type RootMutation {
    createBook(bookInput: BookInterface): Book!
  }

  type Query{
    books: [Book]
    book(id: ID!): Book
  }

  schema {
    query: Query
    mutation: RootMutation
  }

  `
)