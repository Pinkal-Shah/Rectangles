require("dotenv").config();
// Require the framework and instantiate it
const fastify = require("fastify")({
    logger: true,
});
const fp = require("fastify-plugin");
const app = require("./app");

// Run the server!
const start = async () => {
    fastify.register(fp(app), { ...process.env });
    try {
        await fastify.listen(process.env.PORT, "0.0.0.0");
        fastify.log.info(
            `server listening on ${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
