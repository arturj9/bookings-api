import { bookingControler} from "../bootstrap.js";
import { authenticateRouteOptions } from "./util.js";

export function setupBookingsRoutes(app) {
    //list by user
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

  //update

  //delete

}
