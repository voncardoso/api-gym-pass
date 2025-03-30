import { User, Prisma } from "@prisma/client";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository";

export class InMemoryUsersRepository implements PrismaUsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name ?? null,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    };
    this.items.push(user);
    return user;
  }
}
