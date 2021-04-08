const checkIntersection = async ({ rectangleOne, rectangleTwo }) => {
    if (
        rectangleOne.x1 >= rectangleTwo.x2 ||
        rectangleTwo.x1 >= rectangleOne.x2
    )
        return false;

    if (
        rectangleOne.y1 >= rectangleTwo.y2 ||
        rectangleTwo.y1 >= rectangleOne.y2
    )
        return false;

    const x5 = Math.max(rectangleOne.x1, rectangleTwo.x1);
    const y5 = Math.max(rectangleOne.y1, rectangleTwo.y1);
    const x6 = Math.min(rectangleOne.x2, rectangleTwo.x2);
    const y6 = Math.min(rectangleOne.y2, rectangleTwo.y2);

    return `intersectingRectanglePoints: (${x5}, ${y5}), (${x6}, ${y6})`;
};

const checkContainment = async ({ rectangleOne, rectangleTwo }) => {
    return !(
        rectangleTwo.x1 < rectangleOne.x1 ||
        rectangleTwo.y1 < rectangleOne.y1 ||
        rectangleTwo.x2 > rectangleOne.x2 ||
        rectangleTwo.y2 > rectangleOne.y2
    );
};

const checkAdjacency = async ({ rectangleOne, rectangleTwo }) => {
    // horizontal gap
    if (rectangleOne.x1 > rectangleTwo.x2 || rectangleTwo.x1 > rectangleOne.x2)
        return false;

    // vertical gap
    if (rectangleOne.y1 > rectangleTwo.y2 || rectangleTwo.y1 > rectangleOne.y2)
        return false;

    return true;
};

module.exports = { checkIntersection, checkContainment, checkAdjacency };
