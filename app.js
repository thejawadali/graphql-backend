import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./schema/schema.js";

const app = express()


app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.get("/", (req, res) => {
res.send("hello world")
})


app.listen(3000, () => {
  console.log("server started at http://localhost:3000")
})