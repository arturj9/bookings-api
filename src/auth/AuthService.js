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

    return newUser;
  }

  async login(email, password) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("Email or password invalid.");

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("Email or password invalid.");

    const token = Jwt.sign({ id: user.id, email: user.email }, "secret-jwt", {
      expiresIn: "1d",
    });
    return { token, user };
  }

  async verifyToken(token) {
    const decodedToken = Jwt.verify(token, "secret-jwt");
    const user = await this.repository.findByEmail(decodedToken.email);
    return user;
  }
}

export default AuthService;
