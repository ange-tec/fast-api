import { UserRepository} from "../repositories/user.js";
import JWT from 'jsonwebtoken';
import {fastify} from "fastify";

export function registerAuthMiddleware(fastify) {
    fastify.decorate('authUser', async (request, reply) => {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            reply.code(401).send({
                error: 'Token not found',
            });
            return;
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            const payload = JWT.verify(token, process.env.JWT_SECRET);
            const user = await UserRepository.getUserById(payload.id);

            if (!user) {
                reply.code(404).send({
                    error: 'User not found',
                });
                return;
            }
            request.user = user;

        } catch (err) {
            console.error(err);
            reply.code(401).send({
                error: 'Invalid token',
            })
        }
    })
}
