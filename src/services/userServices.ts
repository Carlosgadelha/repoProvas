import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import userRepository from "../repositories/userRepository.js";

export type CreateUserData = Omit<Users, "id"|"createdAt"|"updatedAt"|"isLoggedIn">;

async function insert(user: CreateUserData) {
    user.password = bcrypt.hashSync(user.password, 10);
    await userRepository.insert(user);
}

async function findById(id: number){
    const user = await userRepository.findById(id);
    if(!user) throw { type: "not_found"};
    return user;
}

async function findByEmail(email: string){
    const user = await userRepository.findByEmail(email);
    if(!user) throw { type: "not_found"};
    return user;
}

async function findByEmailAndPassword(email: string, password: string){

    const user = await userRepository.findByEmail(email);
    const key = process.env.TOKEN_KEY;
    
    if(!user) throw { type: "not_found"};
    const token = jwt.sign(user.id, key);

    if(!bcrypt.compareSync(password, user.password)) throw { type: "unauthorized"};

    
    return { token};
}


export default {
    insert,
    findById,
    findByEmail,
    findByEmailAndPassword
}