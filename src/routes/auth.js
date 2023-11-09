import { authController } from "../bootstrap.js";
import { authenticateRouteOptions } from "./util.js";


export function setupAuthRoutes(app) {
  app.post("/api/auth/register", async (request, reply) => {
    const { code, body } = await authController.register(request);
    reply.code(code).send(body);
  });

  app.post("/api/auth/login", async (request, reply) => {
    const { code, body } = await authController.login(request);
    reply.code(code).send(body);
  });

  //info
  app.get("/api/auth/info", authenticateRouteOptions, async (request, reply) => {
    reply.code(200).send(request.user)
  })

  //update
  app.patch("/api/auth/patch", authenticateRouteOptions, async (request, reply) => {
    const { code, body } = await authController.patch(request)
    reply.code(code).send(body);
  })

  //delete
  app.delete("/api/auth/delete", authenticateRouteOptions, async( request, reply) => {
    const { code, body } = await authController.delete(request)
    reply.code(code).send(body);
  })

  //recovery
}
