import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("User Authentication", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            email: "user@example.com",
            name: "user",
            password: "secret"
        }

        const userCreated = await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: userCreated.email,
            password: user.password 
        });

        expect(result).toHaveProperty('token')
    })

    it("should not be able to authenticate a undefined user", async () => {
        const user: ICreateUserDTO = {
            email: "userNotExistis@example.com",
            name: "userNotExistis",
            password: "secretNotExistis"
        }

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: user.email,
                password: user.password 
            });
        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
    })
})