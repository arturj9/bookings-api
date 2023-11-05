import { v4 } from "uuid";

class User {
  constructor({ id, name, email, password }) {
    this.id = id ?? v4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
