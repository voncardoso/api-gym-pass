/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, test } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it("should to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("shoulld hash user password upon register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "  ",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "johndoe@example.com";
    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
