import Fastify from "fastify";
import { registerPostRoutes } from "./controllers/post.js";
import { registerAuthRoutes } from "./controllers/auth.js";
import { registerAuthMiddleware} from "./middlewares/auth.js";
import fastifyAuth from "@fastify/auth";
import FastifySwagger from '@fastify/swagger'
import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV == 'production' ? process.env.DOTENV_CONFIG_PATH : '.env' });
import FastifySwaggerUI from '@fastify/swagger-ui'
import {registerCategoryRoutes} from "./controllers/category.js";
import {registerErrorMiddleware} from "./middlewares/error.js";


const logger = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:mm:ss',
      ignore: 'pid, hostname',
      singleLine: true,
      colorize: true
    },
  },
};

const fastify = Fastify({
    logger,
    ajv: {
        customOptions: {
            removeAdditional: "all"
        }
    }
});

await fastify.register(fastifyAuth);
await fastify.register(FastifySwagger, {
    openapi: {
        components:{
            securitySchemes: {
                token: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    }
});

await fastify.register(FastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list'
    }
});

//Utilisation de la route
registerAuthMiddleware(fastify);
registerPostRoutes(fastify);
registerAuthRoutes(fastify);
registerCategoryRoutes(fastify);
registerErrorMiddleware(fastify);

fastify.get('/', async function handler(request, reply) {
  return { hello: 'world'}
})

try {
await fastify.listen({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    },
)
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
await fastify.ready();
