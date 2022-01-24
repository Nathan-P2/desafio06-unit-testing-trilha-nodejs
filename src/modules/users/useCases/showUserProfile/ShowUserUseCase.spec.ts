import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError"


let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    })

    it("should be able to show a user profile", async () => {
        const user: ICreateUserDTO = {
            email: "nathan@example.com",
            name: "nathan",
            password: "secret"
        }

        const userCreated = await createUserUseCase.execute(user);

        const userProfile = await showUserProfileUseCase.execute(userCreated.id)

        expect(userProfile.email).toEqual("nathan@example.com");
    })

    it("should be not able to show a user profile from undefined user", async () => {
        expect(async () => {
            await showUserProfileUseCase.execute("1234")
        }).rejects.toBeInstanceOf(ShowUserProfileError);
    })
})