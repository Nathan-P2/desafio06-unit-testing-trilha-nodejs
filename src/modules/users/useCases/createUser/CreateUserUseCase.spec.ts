import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";


let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create user", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            email: "user@example.com",
            name: "user",
            password: "secret"
        }

        await createUserUseCase.execute(user)
    })

    it("should be not able to create duplicate users", async () => {
        expect(async () => {
            await createUserUseCase.execute({
                email: "user1@example.com",
                name: "user1",
                password: "secret1"
            })
    
            await createUserUseCase.execute({
                email: "user2@example.com",
                name: "user2",
                password: "secret2"
            })
        }).rejects.toBeInstanceOf(CreateUserError);
    })
});