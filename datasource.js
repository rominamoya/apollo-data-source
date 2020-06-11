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

  async getTodo(id) {
    console.log("aca", await this.get(`todo/${id}`));
    return this.get(`todo/${id}`);
  }
}

module.exports = MvrpAPI;
