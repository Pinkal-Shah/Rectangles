"use strict";

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("../../../app");

describe("POST /rectangles", () => {
    const fastify = Fastify();

    beforeAll(() => {
        fastify.register(fp(App));
    });

    it("return body should have required property", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleTwo: { x1: 2, y1: 5, x2: 5, y2: 8 },
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it("returns invalid rectangle input", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 2, y1: 2, x2: 2, y2: 5 },
                rectangleTwo: { x1: 2, y1: 5, x2: 5, y2: 8 },
            },
        });

        expect(response.statusCode).toBe(401);
    });

    it("returns intersection TRUE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 2, y1: 3, x2: 5, y2: 5 },
                rectangleTwo: { x1: 3, y1: 3, x2: 6, y2: 6 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("intersection");
        expect(data.intersection).toBe(
            `intersectingRectanglePoints: (3, 3), (5, 5)`
        );
    });

    it("returns intersection FALSE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 0, y1: 0, x2: 3, y2: 3 },
                rectangleTwo: { x1: 4, y1: 4, x2: 5, y2: 8 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("intersection");
        expect(data.intersection).toBe(false);
    });

    it("returns containment TRUE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 0, y1: 0, x2: 5, y2: 5 },
                rectangleTwo: { x1: 1, y1: 1, x2: 2, y2: 3 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("containment");
        expect(data.containment).toBe(true);
    });

    it("returns containment FALSE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 0, y1: 0, x2: 2, y2: 3 },
                rectangleTwo: { x1: 4, y1: 4, x2: 6, y2: 6 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("containment");
        expect(data.containment).toBe(false);
    });

    it("returns adjacent TRUE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 2, y1: 2, x2: 5, y2: 5 },
                rectangleTwo: { x1: 2, y1: 5, x2: 5, y2: 8 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("adjacency");
        expect(data.adjacency).toBe(true);
    });

    it("returns adjacent FALSE", async () => {
        const response = await fastify.inject({
            method: "POST",
            url: "/rectangles",
            payload: {
                rectangleOne: { x1: 0, y1: 0, x2: 5, y2: 5 },
                rectangleTwo: { x1: 6, y1: 0, x2: 10, y2: 5 },
            },
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("adjacency");
        expect(data.adjacency).toBe(false);
    });
});
