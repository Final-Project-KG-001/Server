const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql``

const resolvers = {
    Query: {},
    Mutation: {}
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  