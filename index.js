const MvrpAPI = require('./datasource');

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Todo {
    id: Int!
    userId: Int!
    title: String!
    completed: String!
  }
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    userTodos: [Todo]
  }

  type Query {
    hello: String
    todo(id: String!): Todo
    todos: [Todo]
    users: [User]
  }
`;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const resolvers = {
  Query: {
    hello: (root, args, context) => 'Hello world!',
    todo: (root, { id }, { dataSources }) => dataSources.mvrpAPI.getTodo(id),
    todos: (root, args, { dataSources }) => dataSources.mvrpAPI.getTodos(),
    users: (root, args, { dataSources }) => dataSources.mvrpAPI.getUsers(), // need a getusersendpoint
  },
  User: {
    userTodos: ({ id }, args, { dataSources }) => {
      return dataSources.mvrpAPI.getTodosByUser(id);
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
