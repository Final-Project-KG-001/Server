const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
    type Doctor {
        _id: ID
        name: String
        polyclinic: String
    }

    type Query {
        doctors: [Doctor]
        dentals: [Appointment]
        generals: [Appointment]
    }

    type Mutation {
        addDental(): Appointment
        deleteDental(_id: ID): Appointment
        addGeneral(): Appointment
        deleteGeneral(_id: ID): Appointment
    }
`;

const resolvers = {
    Query: {
        doctors: async () => {
            const { data } = await axios.get('http://localhost:3000/doctors');

            return data;
        },
        dentals: async () => {
            const { data } = await axios.get('http://localhost:3000/dentals');

            return data;
        },
        generals: async () => {
            const { data } = await axios.get('http://localhost:3000/generals');

            return data;
        }
    },
    Mutation: {
        addDental: async (parent, args) => {
            const { data } = await axios.post('http://localhost:3000/dentals', {dental: args});

            return data;
        },
        deleteDental: async (parent, args) => {
            const { data } = await axios.delete(`http://localhost:3000/dentals/${args_id}`);

            return data;
        },
        addGeneral: async (parent, args) => {
            const { data } = await axios.post('http://localhost:3000/generals', {general: args});

            return data;
        },
        deleteGeneral: async (parent, args) => {
            const { data } = await axios.delete(`http://localhost:3000/generals/${args_id}`);

            return data;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });