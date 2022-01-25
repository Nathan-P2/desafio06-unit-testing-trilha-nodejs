import request from "supertest"

import { app } from "../../../../app"

describe("Authenticate User Controller", () => {
    it("should be able to create user", async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({
                name: "user",
                email: 'user@example.com',
                password: 'secret'
            });

        expect(response.status).toBe(200);
    })

    it("should be able to user authenticate", async () => {
        const response = await request(app)
            .post('/api/v1/sessions')
            .send({
                email: 'user@example.com',
                password: 'secret'
            });

        expect(response.status).toBe(200);
    })
})