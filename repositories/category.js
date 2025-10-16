import {prisma} from "../services/db.js";

export const CategoryRepositories = {
    createCategory: async (category) => {
        const createdCategory = await prisma.categories.create({
            data: {
                name: category.name,
            }
        })
        return createdCategory;
    }
}
