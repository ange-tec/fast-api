import { UserRepository } from "../repositories/user.js";
import {LoginDto, SignUpDto} from "../dtos/PostDtos.js";
import JWT from "jsonwebtoken";
import {createHash} from "crypto";

export function registerAuthRoutes(fastify) {

  fastify.post('/login', { schema: LoginDto }, async function login(request, _reply) {
    const body = request.body;
      body.password = createHash('sha1')
          .update(request.body.password+process.env.PASSWORD_SALT)
          .digest('hex');
    const user = await UserRepository.getUserByCredentials(body.email, body.password);
    if(!user) {
        throw new Error("Invalid credentials");
    }
    user.token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
    return user;
  });

  fastify.post('/signup', { schema: SignUpDto }, async function signup(request, _reply) {
    const body = request.body;
    body.password = createHash('sha1')
        .update(request.body.password+process.env.PASSWORD_SALT)
        .digest('hex');
    return await UserRepository.createUser(body.email, body.password);
  })
}
