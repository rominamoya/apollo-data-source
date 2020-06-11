const MvrpAPI = require("./datasource");

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: Int!
    userId: Int!
    title: String!
    completed: String!
  }
  type Query {
    hello: String
    todo(id: String!): Todo
    todos: [Todo]
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    todo: (root, { id }, { dataSources }) => dataSources.mvrpAPI.getTodo(id),
    todos: (root, args, { dataSources }) => dataSources.mvrpAPI.getTodos()
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
