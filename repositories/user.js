import { prisma } from "../services/db.js";

// Je dois utiliser prisma pour les utilisateurs comme pour les posts
export const UserRepository = {
  getUserByCredentials: async (email, password) => {
    const user = await prisma.users.findFirst({
        where: {
            email: email,
            password: password
        }
    })
      return user;
  },
    getUserById: async (id) => {
      const user = await prisma.users.findFirst({
          where: {
              id: id
          }
      });
      return user;
    },
    createUser: async (email, password) => {
        const createdUser = await prisma.users.create({
            data: {
                email,
                password
            }
        })
        return createdUser;

  },
}
