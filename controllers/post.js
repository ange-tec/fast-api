import {GetPostsDto, createPostDto, UpdatePostDto, DeletePostDto, GetPostByIdDto} from "../dtos/PostDtos.js";
import { PostRepository } from "../repositories/post.js";
import { createHash } from "crypto";

export function registerPostRoutes(fastify) {

  fastify.get('/posts', { schema: GetPostsDto}, async function getPosts(request, _reply) {

    //variable intermédiaire : utiliser plus tard
    /*const page = request.query.page || 1;
    const limit = request.query.limit || 10;*/

    return await PostRepository.getPosts(/*page, limit*/);
  });

  fastify.get('/posts/:id', { schema: GetPostByIdDto }, async function getPost(request, _reply) {
    const id = request.params.id;
    return await PostRepository.getPost(id);
  });

  fastify.post('/posts', { preHandler: fastify.auth([fastify.authUser]),schema: createPostDto}, async function createPost(request, _reply) {
    const body = request.body;
      body.password = createHash('sha1')
          .update(request.body.password+process.env.PASSWORD_SALT)
          .digest('hex');
    const user = request.user;
    body.authorId  = user.id;
    return await PostRepository.createPost(body); //de même ici !
  });

  fastify.put('/posts/:id', { preHandler: fastify.auth([fastify.authUser]),schema: UpdatePostDto}, async function updatePost(request, _reply) {
    const id = request.params.id;
    const body = request.body;
    return await PostRepository.updatePost(id, body); // et ici !
  });

  fastify.delete('/posts/:id', { preHandler: fastify.auth([fastify.authUser]), schema: DeletePostDto }, async function deletePost(request, _reply) {
    const id = request.params.id;
    return await PostRepository.deletePost(id); // et ici !
  });
}
