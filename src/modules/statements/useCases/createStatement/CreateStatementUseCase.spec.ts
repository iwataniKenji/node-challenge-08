import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Create statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to create a new deposit statement", async () => {
    const { id } = await createUserUseCase.execute({
      name: "User test",
      email: "Email test",
      password: "Password test",
    });

    const statement = await createStatementUseCase.execute({
      user_id: id as string,
      type: "deposit" as any,
      amount: 100,
      description: "Description test",
    });

    expect(statement).toHaveProperty("id");
  });

  it("should be able to create a new withdraw statement", async () => {
    const { id } = await createUserUseCase.execute({
      name: "User test",
      email: "Email test",
      password: "Password test",
    });

    await createStatementUseCase.execute({
      user_id: id as string,
      type: "deposit" as any,
      amount: 150,
      description: "Description test",
    });

    const statement = await createStatementUseCase.execute({
      user_id: id as string,
      type: "withdraw" as any,
      amount: 100,
      description: "Description test",
    });

    expect(statement).toHaveProperty("id");
  });
});
