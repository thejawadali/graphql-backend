import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import schema from "./schema.js";
import rootValue from "./resolvers.js";
import cors from "cors";

const app = express()

app.use(cors())

mongoose.set('strictQuery', true)
mongoose.connect( "mongodb://localhost:27017/graphqlDb" ).then( () => {
  console.log( "db connected" )


  app.use( "/graphql", graphqlHTTP( {
    schema,
    rootValue,
    graphiql: true
  } ) )


  app.listen( 3001, () => {
    console.log( "server started at http://localhost:3001" )
  } )
} )