import { setupAuthRoutes } from "./auth.js";
import { setupBookingsRoutes } from "./bookings.js";

function setupRoutes(app) {
  app.get("/hello", (request, reply) => {
    reply.send({ message: "Hello World!" });
  });
  setupAuthRoutes(app);
  setupBookingsRoutes(app);
}

export default setupRoutes;
