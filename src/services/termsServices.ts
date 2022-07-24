import termsRepository from "../repositories/termsRepository.js";

async function findAll(){

    const terms = await termsRepository.findAll();

    return terms.map(term => term.number);;
}

export default {
    findAll,
}