class AuthController {
  constructor(service) {
    this.service = service;
  }

  async register(request) {
    const { name, email, password } = request.body;

    if (!(name && email && password)) {
      return {
        code: 400,
        body: { message: "name, email and password are required." },
      };
    }

    try {
      await this.service.register(name, email, password);
      return { code: 201, body: { message: "User created sucessfully." } };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }

  async login(request) {
    const { email, password } = request.body;

    if (!(email && password)) {
      return {
        code: 400,
        body: { message: "email and password are required." },
      };
    }

    try {
      const body = await this.service.login(email, password);
      return { code: 200, body: body };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }

  async delete(request) {
    const { password } = request.body;
    const email = request.user.email;

    if (!password) {
      return {
        code: 400,
        body: { message: "password is required." },
      };
    }

    try {
      const body = await this.service.delete(email, password);
      return { code: 204, body: body };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }

  async patch(request) {
    const { password, new_password, new_name, new_email } = request.body;
    const email = request.user.email;

    if (!(new_password || new_name || new_email)) {
      return {
        code: 400,
        body: {
          message:
            "enter at least one field: new_name, new_email or new_password",
        },
      };
    }

    if (!password) {
      return {
        code: 400,
        body: { message: "password is required." },
      };
    }

    const user_updated = { new_password, new_name, new_email };

    try {
      await this.service.patch(email, password, user_updated);
      return { code: 201, body: { message: "User updated sucessfully." } };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }
}

export default AuthController;
