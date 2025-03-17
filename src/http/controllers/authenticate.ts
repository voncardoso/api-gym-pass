import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUserCase = new AuthenticateUseCase(usersRepository);

    await authenticateUserCase.execute({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
