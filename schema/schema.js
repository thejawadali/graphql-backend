import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql"


const books = [
  {id: "1", name: "The Great Gatsby", genre: "Fiction"},
  {id: "2", name: "To Kill a Mockingbird", genre: "Fiction"},
  {id: "3", name: "The Catcher in the Rye", genre: "Fiction"},
  {id: "4", name: "The Lord of the Rings", genre: "Fantasy"},
  {id: "5", name: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy"},
  {id: "6", name: "The Hobbit", genre: "Fantasy"},
  {id: "7", name: "The Dream of the Red Chamber", genre: "Classical literature"},
  {id: "8", name: "A Tale of Two Cities", genre: "Historical fiction"},
  {id: "9", name: "The Adventures of Sherlock Holmes", genre: "Mystery"},
  {id: "10", name: "The Da Vinci Code", genre: "Thriller"}
];


const BookType = new GraphQLObjectType( {
  name: "Book",
  fields: () => ( {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  } )
} )

const RootQuery = new GraphQLObjectType( {
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        return books.find(book => book.id == args.id)
      }
    }
  }
} )

export default new GraphQLSchema({
  query: RootQuery
})