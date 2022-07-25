import app from '../app.js';
import supertest from 'supertest';
import { prisma } from '../src/config/database.js';
import { user } from './app.test.js';

const test = {

    name: 'Prova 01',
    pdfUrl: 'https://www.google.com',
    categoryId: 1,
    teacherId: 1,
    disciplineId: 1


}
beforeAll( async () =>{
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    await supertest(app).post("/signup").send(user);
})

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM tests WHERE name = ${test.name}`;
    await supertest(app).post("/signin").send(user);
});

describe("POST /test", () => {
    it("given a valid test it should return 201", async () => {

        const result = await supertest(app).post("/test").send(test);
        const status = result.status;

        const testCriado = await prisma.tests.findMany({
            where: { name: test.name }
        });
        
        expect(status).toEqual(201);
        expect(testCriado).not.toBeNull();
    });

    it("given a invalid test it should return 400", async () => {

        const testinvalid = Array(test).map((item) => {
            return item === null
        })

        const result = await supertest(app).post("/signup").send(testinvalid);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given a categortId not exist it should return 404", async () => {
            test.categoryId = 100
            const testinvalid = {
                ...test
            }
    
            const result = await supertest(app).post("/test").send(testinvalid);
            const status = result.status;
    
            expect(status).toEqual(404);
        }
    );

    it("given a teachersDisciplineId not exist it should return 404", async () => {
            
        const testinvalid = {
            ...test,
            teachersDisciplineId: 100
        }

        const result = await supertest(app).post("/test").send(testinvalid);
        const status = result.status;

        expect(status).toEqual(404);
    }
);


});

describe("GET /testPerCategories", () => {
    it("when searching for proofs by category it should return 200", async () => {
        
        const result = await supertest(app).get("/testPerCategories").send(

        );
        const status = result.status;
        
        expect(status).toEqual(200);
        
    });

});

describe("GET /testPerTeachers", () => {
    it("when searching for evidence by an instructor, it should return 200", async () => {

        const result = await supertest(app).get("/testPerTeachers");
        const status = result.status;
        
        expect(status).toEqual(200);
        
    });

});


afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    await prisma.$disconnect();
});