const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kb9w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => app.listen(3000))
    .catch(err => console.log(err));

