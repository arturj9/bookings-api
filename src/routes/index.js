import { authController, bookingControler, authService } from "../bootstrap.js";

const authenticateRouteOptions = {
  preHandler: async (request, reply) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token)
      reply.code(401).send({ message: "Unauthorized: token missing" });

    const user = await authService.verifyToken(token);

    if (!user) {
      reply.code(404).send({ message: "Unauthorized: invalid token" });
    }

    request.user = user;
  },
};

function setupRoutes(app) {
  app.get("/hello", (request, reply) => {
    reply.send({ message: "Hello World!" });
  });

  app.get("/api/bookings", authenticateRouteOptions, async (request, reply) => {
    const { code, body } = await bookingControler.index();
    reply.code(code).send(body);
  });

  app.post(
    "/api/bookings",
    authenticateRouteOptions,
    async (request, reply) => {
      const { code, body } = await bookingControler.save(request);
      reply.code(code).send(body);
    }
  );

  app.post("/api/auth/register", async (request, reply) => {
    const { code, body } = await authController.register(request);
    reply.code(code).send(body);
  });

  app.post("/api/auth/login", async (request, reply) => {
    const { code, body } = await authController.login(request);
    reply.code(code).send(body);
  });
}

export default setupRoutes;
