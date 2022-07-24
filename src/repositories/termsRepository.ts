import { prisma } from "../config/database.js";

async function findAll() {

    return await prisma.terms.findMany({
        select: { number: true }
    });

}

export default {
    findAll
}