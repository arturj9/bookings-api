import fastify from "fastify";
import BookingRepository from "./bookings/BookingRepository.js";
import BookingService from "./bookings/BookingService.js";
import BookingController from "./bookings/BookingController.js";
import UserRepository from "./auth/UserRepository.js";
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
  preHandler: (request, reply, done) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token)
      reply.code(401).send({ message: "Unauthorized: token missing" });

    const user = authService.verifyToken(token);

    if (!user) {
      reply.code(404).send({ message: "Unauthorized: invalid token" });
    }

    request.user = user;

    done();
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

app.post("/api/auth/register", (request, reply) => {
  const { code, body } = authController.register(request);
  reply.code(code).send(body);
});

app.post("/api/auth/login", (request, reply) => {
  const { code, body } = authController.login(request);
  reply.code(code).send(body);
});

export default app;
