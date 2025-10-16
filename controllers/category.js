import {CategoryRepositories} from "../repositories/category.js";
import {createdCategoryDto} from "../dtos/PostDtos.js";

// A poursuivre
export function registerCategoryRoutes(fastify) {
    fastify.post('/categories', { schema: createdCategoryDto }, async function createPost(request, _reply) {
        const body = request.body;
        return await CategoryRepositories.createCategory(body);
    });
}
