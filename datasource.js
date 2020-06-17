const { RESTDataSource } = require("apollo-datasource-rest");

class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://jsonplaceholder.typicode.com/";
  }

  async getTodos() {
    const data = await this.get("todos");
    return data;
  }

  async getTodosByUser(userId) {
    return this.get("todos", { userId });
  }

  async getUsers() {
    return await this.get("users");
  }
  async getTodo(id) {
    return this.get(`todos/${id}`);
  }
}

module.exports = MvrpAPI;
