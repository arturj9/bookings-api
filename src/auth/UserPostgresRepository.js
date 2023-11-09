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
    await this.db.none('INSERT INTO Users (id, name, email, password) VALUES ($1, $2, $3, $4)', [
      user.id,
      user.name,
      user.email,
      user.password
    ])
  }

  async delete(user){
    await this.db.none("DELETE FROM Users WHERE id = $1", user.id)
  }

  async patch(user, user_updated){
    if(user_updated.new_name){
      await this.db.none("UPDATE Users SET name = $1 WHERE id = $2", [user_updated.new_name, user.id])
    }
    if(user_updated.new_email){
      await this.db.none("UPDATE Users SET email = $1 WHERE id = $2", [user_updated.new_email, user.id])
    }
    if(user_updated.new_password){
      await this.db.none("UPDATE Users SET password = $1 WHERE id = $2", [user_updated.new_password, user.id])
    }
  }
}

export default UserPostgresRepository;
