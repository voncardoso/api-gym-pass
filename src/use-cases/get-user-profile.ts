import { UserRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface GetProfileUseCaseRequest {
  userId: string;
}

interface GetProfileUseCaseResponse {
  user: User;
}

export class GeUserProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      user,
    };
  }
}
