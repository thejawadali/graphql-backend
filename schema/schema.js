import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLInt, GraphQLList } from "graphql"
import authorModel from "../models/author.js";
import bookModel from "../models/book.js";

const BookType = new GraphQLObjectType( {
  name: "Book",
  fields: () => ( {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, _args){
        return authorModel.findById(parent.authorId)
      }
    }
  } )
} )
const AuthorType = new GraphQLObjectType( {
  name: "Author",
  fields: () => ( {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, _args){
        return bookModel.find({
          authorId: parent.id
        })
      }
    }
  } )
} )

const RootQuery = new GraphQLObjectType( {
  name: "RootQueryType",
  fields: {
    // to query single book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args){
        return bookModel.findById(args.id)
      }
    },
    // to query list of books
    books: {
      type: new GraphQLList(BookType),
      resolve(){
        return bookModel.find({})
      }
    },
    // to query single author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args){
        return authorModel.findById(args.id)
      }
    },
    // to query list of authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(){
        return authorModel.find({})
      }
    }
  }
} )

const Mutation = new GraphQLObjectType( {
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve(_, args){
        const author = new authorModel({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    }, 
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args){
        const book = new bookModel({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }, 
  }
} )



export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})