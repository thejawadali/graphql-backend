import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import schema from "./schema/schema.js"
import cors from "cors";

const app = express()
app.use(cors())
mongoose.set('strictQuery', true)
mongoose.connect( "mongodb://localhost:27017/graphqlDb" ).then( () => {
  console.log( "db connected" )


  app.use( "/graphql", graphqlHTTP( {
    schema,
    graphiql: true
  } ) )

  app.get( "/", ( req, res ) => {
    res.send( "hello world" )
  } )


  app.listen( 3000, () => {
    console.log( "server started at http://localhost:3000" )
  } )
} )