import { prisma } from "../config/database.js";

async function findById(id: number) {

    return await prisma.categories.findUnique({
        where: {
            id
        }
    });

}

export default {
    findById
}