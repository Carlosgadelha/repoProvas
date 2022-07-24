import { Tests } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import testRepository from "../repositories/testsRepository.js";
import categoryServices from "./categoryServices.js";
import termsServices from "./termsServices.js";
import userServices from "./userServices.js";

export type CreateTestData = Omit<Tests, "id"|"createdAt"|"updatedAt"|"isLoggedIn">;

async function insert(test: CreateTestData) {

    await categoryServices.findById(test.categoryId);
    
    await testRepository.insert(test);
}

async function findByEmailAndPassword(email: string, password: string){

    const user = await userServices.findByEmail(email);
    const key = process.env.TOKEN_KEY;
    
    const token = jwt.sign(user.id, key);

    if(!bcrypt.compareSync(password, user.password)) throw { type: "unauthorized"};

    
    return { token};
}

async function findByTestsDisciplines(){
        
    return await testRepository.findByTestsDisciplines();
        
}

async function findByTestsTeachers(){

    const tests = await testRepository.findByTestsTeachers();
    const terms = await termsServices.findAll();

    return tests.map(item => {
        return {
            name: item.name,
            term: 
                terms.map(term => {
                    return {
                        number: term,
                        tests: item.tests.filter(test => test.discipline.term.number === term).map(test => {
                            return {
                                name: test.name,
                                pdfUrl: test.pdfUrl,
                                discipline: test.discipline.name
                            }
                        }
                        )
                    }
                })
        }
    
    });
        
}


export default {
    insert,
    findByEmailAndPassword,
    findByTestsDisciplines,
    findByTestsTeachers
}