"use strict";
const {
    checkAdjacency,
    checkIntersection,
    checkContainment,
} = require("../../utils/rectangleChecks");

module.exports = async function (fastify) {
    fastify.route({
        method: "POST",
        url: "/rectangles",
        schema: {
            body: {
                type: "object",
                properties: {
                    rectangleOne: { type: "object" },
                    rectangleTwo: { type: "object" },
                },
                required: ["rectangleOne", "rectangleTwo"],
            },
        },
        preHandler: [fastify.auth([fastify.verifyRectangles()])],
        handler: async (req, reply) => {
            const { rectangleOne, rectangleTwo } = req.body;

            const checksPromise = [];

            checksPromise.push(
                checkIntersection({ rectangleOne, rectangleTwo }),
                checkContainment({ rectangleOne, rectangleTwo }),
                checkAdjacency({ rectangleOne, rectangleTwo })
            );

            const results = await Promise.all(checksPromise);

            return {
                intersection: results[0],
                containment: results[1],
                adjacency: results[2],
            };
        },
    });
};
