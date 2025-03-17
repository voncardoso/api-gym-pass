import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUserCase = makeRegisterUseCase();

    await registerUserCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({ message: "User created" });
}
