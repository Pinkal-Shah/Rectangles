"use strict";

const fp = require("fastify-plugin");
const verifyInput = require("../utils/verifyInput");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    fastify.decorate("verifyRectangles", function () {
        return verifyInput();
    });
});
