import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", Authenticate);
}
