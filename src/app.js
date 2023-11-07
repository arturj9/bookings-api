import fastify from "fastify";
import setupRoutes from "./routes/index.js";

const app = fastify({ logger: true });

setupRoutes(app)

export default app;
