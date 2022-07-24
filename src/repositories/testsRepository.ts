import { prisma } from "../config/database.js";
import { CreateTestData } from "../services/testsServices.js";

async function insert(test: CreateTestData) {
    await prisma.tests.create({
        data: test
    });
}

async function findById(id: number) {

    return await prisma.users.findUnique({
        where: {
            id
        }
    });

}

async function findByEmail(email: string) {

    return await prisma.users.findUnique({
        where: {
            email
        }
    });

}

async function findByTestsDisciplines() {
    
    return await prisma.terms.findMany({

        include: {
                disciplines:{
                    select: {
                        name: true,
                        tests:{
                            select: {
                                name: true,
                                pdfUrl: true,
                                teachers: {
                                            select:{
                                                name: true
                                            }
                                }
                            }
                        }
                    }
                }
        }
    
    });
    
}

async function findByTestsTeachers() {
    
    return  await prisma.teachers.findMany({

        include:{
            tests:{
                select: {
                    name: true,
                    pdfUrl: true,
                    discipline: {
                        select: { name: true,
                                term: {
                                    select: { number: true }
                                } 
                        }
                    }
                }
            }
        }
    });
    
}
    

export default {
    insert,
    findById,
    findByEmail,
    findByTestsDisciplines,
    findByTestsTeachers
}