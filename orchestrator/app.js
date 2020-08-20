const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Doctor {
    _id: ID
    name: String
    polyclinic: String
  }

  type User {
    _id: ID
    name: String
    dob: String
    email: String
    password: String
    phoneNumber: String
    role: String
  }

  type Appointment {
    _id: ID
    userId: ID
    doctorId: ID
    queueNumber: Int
    status: String
  }

  type ResponseUser {
    message: String
    name: String
    email: String
    access_token: String
  }

  type ResponseAppointment {
    message: String
    userId: ID
    doctorId: ID
    queueNumber: Int
  }

  type Query {
    doctors: [Doctor]
    dentals: [Appointment]
    generals: [Appointment]
    users: [User]
    appointments: [Appointment]
  }

  type Mutation {
    addDental(doctorId: Int): Appointment
    deleteDental(_id: ID): Appointment
    addGeneral(doctorId: Int): Appointment
    deleteGeneral(_id: ID): Appointment
    registerUser(
      name: String
      dob: String
      email: String
      password: String
      phoneNumber: String
    ): ResponseUser
    loginUser(email: String, password: String): ResponseUser
    updateUser(
      _id: ID
      name: String
      dob: String
      phoneNumber: String
    ): ResponseUser
    addAppointment(doctorId: ID, queueNumber: String): ResponseAppointment
  }
`;

//access_token buat test
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyYzU3ZmRiNWVkOTJiNGZlNWVlMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTc4NDQ1ODd9.E9EmrijRAx0Sb6eDM6CUKUEUYOYd9uR3GkmvktChtSs";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QwMjY2NzQ4ZTIyM2E5NGRhMzdlYSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1OTc4NDI4MDd9.e-GGocKlVpJkG601frFpuO0AVLcUnwD8pCEZwDDGFPU";

const resolvers = {
  Query: {
    doctors: async () => {
      const { data } = await axios.get("http://localhost:3000/doctors");

      return data;
    },
    dentals: async () => {
      const { data } = await axios.get("http://localhost:3000/dentals");

      return data;
    },
    generals: async () => {
      const { data } = await axios.get("http://localhost:3000/generals");

      return data;
    },
    users: async () => {
      const { data } = await axios.get("http://localhost:3000/user", {
        headers: {
          access_token: adminToken,
        },
      });
      return data.users;
    },
    appointments: async () => {
      const { data } = await axios.get("http://localhost:3000/appointment", {
        headers: {
          access_token: userToken,
        },
      });
      return data.appointments;
    },
  },
  Mutation: {
    addDental: async (parent, args) => {
      const { data } = await axios.post("http://localhost:3000/dentals", {
        dental: args,
      });

      return data;
    },
    deleteDental: async (parent, args) => {
      const { data } = await axios.delete(
        `http://localhost:3000/dentals/${args._id}`
      );

      return data;
    },
    addGeneral: async (parent, args) => {
      const { data } = await axios.post("http://localhost:3000/generals", {
        general: args,
      });

      return data;
    },
    deleteGeneral: async (parent, args) => {
      const { data } = await axios.delete(
        `http://localhost:3000/generals/${args._id}`
      );

      return data;
    },
    registerUser: async (parent, args) => {
      const { name, dob, email, password, phoneNumber } = args;
      const { data } = await axios.post("http://localhost:3000/user/register", {
        name,
        dob,
        email,
        password,
        phoneNumber,
      });

      return data;
    },
    loginUser: async (parent, args) => {
      const { email, password } = args;
      const { data } = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      return data;
    },
    updateUser: async (parent, args) => {
      const { _id, name, dob, phoneNumber } = args;
      const { data } = await axios.put(
        `http://localhost:3000/user/${_id}`,
        {
          name,
          dob,
          phoneNumber,
        },
        {
          headers: {
            access_token: userToken,
          },
        }
      );

      return data;
    },
    addAppointment: async (parent, args) => {
      const { doctorId, queueNumber } = args;
      const { data } = await axios.post("http://localhost:3000/appointment", {
        doctorId,
        queueNumber
      },
      {
        headers: {
          access_token: userToken,
        },
      });

      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
