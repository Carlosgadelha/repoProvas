import { Request, Response } from "express";
import testsServices, { CreateTestData } from "../services/testsServices.js";


export async function createTest(req: Request, res: Response) {

    const test: CreateTestData = req.body;

    await testsServices.insert(test);
    return res.sendStatus(201);
    
}

export async function testPerCategories(req: Request, res: Response) {
    
    const tests = await testsServices.findByTestsDisciplines();
    return res.send(tests);
    
}

