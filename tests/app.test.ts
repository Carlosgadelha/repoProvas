import app from '../app.js';
import supertest from 'supertest';
import { prisma } from '../src/config/database.js';

export const user = {

    email: 'mateus@gmail.com.br',
    password: '123456789ghhgh',
    passwordConfirmation: '123456789ghhgh'

}

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
});

describe("POST /signup", () => {
    it("given a valid user it should return 201", async () => {

        const result = await supertest(app).post("/signup").send(user);
        const status = result.status;

        const userCriado = await prisma.users.findUnique({
            where: { email: user.email }
        });
        
        expect(status).toEqual(201);
        expect(userCriado).not.toBeNull();
    });

    it("given a invalid user it should return 400", async () => {

        const result = await supertest(app).post("/signup").send({
            email: '',
            password: '',
            passwordConfirmation: ''
        });
        const status = result.status;

        expect(status).toEqual(400);
    });

});

describe("POST /signup", () => {

    it("given a valid user it should return 200", async () => {

            const login = {email: user.email, password: user.password }
            await supertest(app).post("/signup").send(user);
            const result = await supertest(app).post("/signin").send(login)
            
            expect(result.status).toEqual(200);
            expect(result.body.token).not.toBeNull();   
            
    });

    it("given a valid user it should return 401", async () => {

        const login = {email: user.email, password: "jjvjjbjvjcjj" }
        await supertest(app).post("/signup").send(user);
        const result = await supertest(app).post("/signin").send(login)
        
        expect(result.status).toEqual(401);  
        
});
});

afterAll(async () => {
    await prisma.$disconnect();
});