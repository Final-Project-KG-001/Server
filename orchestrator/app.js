const { ApolloServer, gql, PubSub } = require("apollo-server");
const axios = require("axios");
const pubsub = new PubSub();

const DENTAL_ADDED = "DENTAL_ADDED";
const NEW_APPOINTMENT = "NEW_APPOINTMENT";

const typeDefs = gql`
  type Doctor {
    _id: ID
    name: String
    polyclinic: String
  }

  type Dental {
    _id: ID
    appointmentId: ID
    appointment: [Appointment]
  }

  type ResponseDental {
    _id: ID
    appointmentId: ID
    status: String
    message: String
  }

  type General {
    _id: ID
    appointmentId: ID
    appointment: [Appointment]
  }

  type ResponseGeneral {
    _id: ID
    appointmentId: ID
    status: String
    message: String
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
    createdAt: String
    user: [User]
    doctor: [Doctor]
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
    status: String
  }

  type Query {
    doctors: [Doctor]
    dentals: [Dental]
    generals: [General]
    users: [User]
    appointments: [Appointment]
  }

  type Mutation {
    addDental(appointmentId: ID): ResponseDental
    deleteDental(_id: ID): ResponseDental
    addGeneral(appointmentId: ID): ResponseGeneral
    deleteGeneral(_id: ID): ResponseGeneral
    registerUser(
      name: String
      dob: String
      email: String
      password: String
      phoneNumber: String
    ): ResponseUser
    loginUser(email: String, password: String): ResponseUser
    loginAdmin(email: String, password: String): ResponseUser
    updateUser(
      _id: ID
      name: String
      dob: String
      phoneNumber: String
    ): ResponseUser
    addAppointment(doctorId: ID, queueNumber: Int): ResponseAppointment
    changeAppointmentStatus(_id: ID, status: String): ResponseAppointment
  }

  type Subscription {
    newDental: Dental
    newAppointment: Appointment
  }
`;

//access_token buat test
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QyYzU3ZmRiNWVkOTJiNGZlNWVlMCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTc4NDQ1ODd9.E9EmrijRAx0Sb6eDM6CUKUEUYOYd9uR3GkmvktChtSs";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDNiN2RjNWZjMTIyY2FlZWMzM2I5MyIsImVtYWlsIjoiZmlhaEBtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTk4Mjc0NDk1fQ.sGiBPSLShnEh1mkWw3pKAx-IgsFFZEfxewYGR9Tlk-Q";

const resolvers = {
  Subscription: {
    newDental: {
      subscribe: () => {
        return pubsub.asyncIterator([ DENTAL_ADDED ]);
      },
    },
    newAppointment: {
      subscribe: () => {
        return pubsub.asyncIterator([ NEW_APPOINTMENT ]);
      },
    },
  },
  Query: {
    doctors: async () => {
      const { data } = await axios.get("http://localhost:3000/doctor", {
        headers: {
          access_token: userToken,
        },
      });

      return data;
    },
    dentals: async () => {
      const { data } = await axios.get("http://localhost:3000/dental", {
        headers: {
          access_token: userToken,
        },
      });

      return data;
    },
    generals: async () => {
      const { data } = await axios.get("http://localhost:3000/general", {
        headers: {
          access_token: userToken,
        },
      });

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
      // console.log(data)
      return data.appointments;
    },
  },
  Mutation: {
    addDental: async (parent, args) => {
      const { data } = await axios.post("http://localhost:3000/dental", args, {
        headers: {
          access_token: userToken,
        },
      });
      pubsub.publish(DENTAL_ADDED, { newDental: args });
      return data;
    },
    deleteDental: async (parent, args) => {
      const { data } = await axios.delete(
        `http://localhost:3000/dental/${ args._id }`,
        {
          headers: {
            access_token: adminToken,
          },
        }
      );

      return data;
    },
    addGeneral: async (parent, args) => {
      const { data } = await axios.post("http://localhost:3000/general", args, {
        headers: {
          access_token: userToken,
        },
      });

      return data;
    },
    deleteGeneral: async (parent, args) => {
      const { data } = await axios.delete(
        `http://localhost:3000/general/${ args._id }`,
        {
          headers: {
            access_token: adminToken,
          },
        }
      );

      return data;
    },
    registerUser: async (parent, args) => {
      const { name, dob, email, password, phoneNumber } = args;
      // console.log(args)
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
    loginAdmin: async (parent, args) => {

      const { email, password } = args;
      try {
        const { data } = await axios.post(
          "http://localhost:3000/user/loginadmin",
          {
            email,
            password,
          }
        );
        if (data) {
          return data;
        }
      } catch (err) {
        return {
          message: err.response.data.error,
        };
      }
    },
    updateUser: async (parent, args) => {
      const { _id, name, dob, phoneNumber } = args;
      const { data } = await axios.put(
        `http://localhost:3000/user/${ _id }`,
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
      // console.log(args)
      const { doctorId, queueNumber } = args;
      const { data } = await axios.post(
        "http://localhost:3000/appointment",
        {
          doctorId,
          queueNumber,
        },
        {
          headers: {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDEyNWExY2FiNGQ5MjBlZTRiOTkwZCIsImVtYWlsIjoiYW1lbEBtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTk4MTA1MTA5fQ.3SWw3kVeajrmz5XUlQdnfqt2tgiBHLVH2mseLz8zOiw",
          },
        }
      );
      // console.log(data)
      return data;
    },
    changeAppointmentStatus: async (parent, args) => {
      const { status, _id } = args;
      const { data } = await axios.put(
        `http://localhost:3000/appointment/${ _id }`,
        {
          status,
        },
        {
          headers: {
            access_token: adminToken,
          },
        }
      );

      pubsub.publish(NEW_APPOINTMENT, { newAppointment: data.appointment });

      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${ url }`);
  console.log(`Subscriptions ready at ${ subscriptionsUrl }`);
});
