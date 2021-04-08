const verifyInput = () =>
    async function (req, res, done) {
        try {
            const { rectangleOne, rectangleTwo } = req.body;

            if (
                rectangleOne.x1 == rectangleOne.x2 ||
                rectangleOne.y1 == rectangleOne.y2 ||
                rectangleTwo.x1 == rectangleTwo.x2 ||
                rectangleTwo.y1 == rectangleTwo.y2
            ) {
                throw new Error("Invalid Rectangle Input");
            }

            // done();
        } catch (error) {
            done(error);
        }
    };

module.exports = verifyInput;
