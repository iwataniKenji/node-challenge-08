import "reflect-metadata";

import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { CreateStatementUseCase } from "./../createStatement/CreateStatementUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get balance", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to get a balance", async () => {
    const { id } = await createUserUseCase.execute({
      name: "User test",
      email: "Email test",
      password: "Password test",
    });

    await createStatementUseCase.execute({
      user_id: id as string,
      type: "deposit" as any,
      amount: 100,
      description: "Description test",
    });

    await createStatementUseCase.execute({
      user_id: id as string,
      type: "withdraw" as any,
      amount: 50,
      description: "Description test",
    });

    const balance = await getBalanceUseCase.execute({ user_id: id as string });

    expect(balance).toHaveProperty("balance");
    expect(balance.balance).toEqual(50);
  });
});
