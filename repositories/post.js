import { prisma } from "../services/db.js";
import {NotFoundError} from "../utils/errors.js";

export const PostRepository = {
  getPosts: async () => {
    const gettingPost = await prisma.posts.findMany({});
    return gettingPost;
  },
    getPost: async (id) => {
        const gettingPostById = await prisma.posts.findUnique({
            where: {
                id: id
            }
        });
        if (!gettingPostById) {
            throw new NotFoundError('Not Found');
        }
        return gettingPostById;
    },
    // Il faut que je crée *** modifie *** supprime un poste avec Prisma
    createPost: async (post) => {
    const createdPost = await prisma.posts.create({
        data: {
            title: post.title,
            content: post.content,
            authorId: post.authorId,
        },
        include: {
            author: true
        }
    })
    return createdPost;
  },
    updatePost: async (id, post) => {
      const updatedPost = await prisma.posts.update({
          where: {
              id: id,
          },
          data: {
              title: post.title,
              content: post.content,
          },
      })
    return updatedPost;
  },
    deletePost: async (id) => {
        await prisma.posts.delete({
            where: { id: id}
        })
    }
};
