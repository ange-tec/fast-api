export function registerErrorMiddleware(fastify)  {
    fastify.setErrorHandler((error, request, reply) => {

        if(error.name === "NotFoundError") {
            reply.status(404).send({ok: false, error: error.message});
        }
        else{
            console.error(error);
            reply.status(500).send({ok: false, error: error.message});
        }
    })
}
