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
                include: {
                    tests:{
                        include: {
                            teachers: true 
                        }
                    }
                }
            }
    }
    

    

    //     Category: { select : { name: true} },
    //     teachersDisciplines: { 

    //         include: { 
    //             discipline: { 
    //                             select:{ name: true} 
    //                         },
    //             teacher: {
    //                     select: { name: true }
    //             }
    //         }
            
    //     }
    // }
            

    });
    
}

export default {
    insert,
    findById,
    findByEmail,
    findByTestsDisciplines
}