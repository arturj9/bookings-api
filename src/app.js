import fastify from "fastify";
import BookingRepository from "./bookings/BookingRepository.js";
import BookingService from "./bookings/BookingService.js";
import BookingController from "./bookings/BookingController.js";
import UserRepository from "./auth/UserPostgresRepository.js";
import AuthService from "./auth/AuthService.js";
import AuthController from "./auth/AuthController.js";

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingControler = new BookingController(bookingService);

const userRespository = new UserRepository();
const authService = new AuthService(userRespository);
const authController = new AuthController(authService);

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

app.get("/hello", (request, reply) => {
  reply.send({ message: "Hello World!" });
});

app.get("/api/bookings", authenticateRouteOptions, (request, reply) => {
  const { code, body } = bookingControler.index();
  reply.code(code).send(body);
});

app.post("/api/bookings", authenticateRouteOptions, (request, reply) => {
  const { code, body } = bookingControler.save(request);
  reply.code(code).send(body);
});

app.post("/api/auth/register", async (request, reply) => {
  const { code, body } = await authController.register(request);
  reply.code(code).send(body);
});

app.post("/api/auth/login", async (request, reply) => {
  const { code, body } = await authController.login(request);
  reply.code(code).send(body);
});

export default app;
