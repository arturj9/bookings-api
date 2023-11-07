import db from "../database/index.js";
import User from "./User.js";

class UserPostgresRepository {
  constructor() {
    this.db = db
  }

  async findByEmail(email) {
    const storeUser = await this.db.oneOrNone('SELECT * FROM Users WHERE email = $1', email)
    return storeUser ? new User(storeUser) : null
  }

  async save(user) {
    await this.db.none('INSERT INTO Users (Id, name, email, password) VALUES ($1, $2, $3, $4)', [
      user.id,
      user.name,
      user.email,
      user.password
    ])
  }
}

export default UserPostgresRepository;
