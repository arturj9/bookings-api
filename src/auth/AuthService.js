import User from "./User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  async register(name, email, password) {
    const userExists = await this.repository.findByEmail(email);

    if (userExists)
      throw new Error("This email was already used by another user.");

    const newUser = new User({ name, email, password });

    newUser.password = bcrypt.hashSync(password, 10);

    await this.repository.save(newUser);
  }

  async login(email, password) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password.");

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("Invalid email or password.");

    const token = Jwt.sign({ id: user.id, email: user.email }, "secret-jwt", {
      expiresIn: "1d",
    });
    return {token};
  }

  async delete(email, password){
    const user = await this.repository.findByEmail(email);

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("Invalid password.");

    await this.repository.delete(user)

    return {message: ''}
  }

  async patch(email, password, user_updated){
    const user = await this.repository.findByEmail(email);

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("Invalid password.");

    await this.repository.patch(user, user_updated)
  }

  async verifyToken(token) {
    const decodedToken = Jwt.verify(token, "secret-jwt");
    const user = await this.repository.findByEmail(decodedToken.email);
    user.password = undefined
    return user;
  }
}

export default AuthService;
