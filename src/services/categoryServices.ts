import categoryRepository from "../repositories/categoryRepository.js";

async function  findById(id: number){
    
    const category = await categoryRepository.findById(id);
    if(!category) throw { type: "not_found", message: "Category not found"};
    return category;
}

export default {
    findById
}