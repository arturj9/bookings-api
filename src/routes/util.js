import { authService } from "../bootstrap.js";

export const authenticateRouteOptions = {
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
