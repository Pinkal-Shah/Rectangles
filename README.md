# Rectangles

###Prerequisites

The following prerequisites are required for building and running this application.

-   git client
-   NodeV12+

This is a REST application created using Fastify(an alternative to Express.js)

All the dependencies are available in package.json

###Build

Clone the repository to your local machine.

```
git clone https://github.com/Pinkal-Shah/Rectangles.git
```

Move to the cloned folder and run the following

```
npm install
```

The above command will install all the dependencies in package.json

##Assumptions for Input

The algorithm for determining intersection, containment, and adjacency
are the following assumptions have been made:

-   all values are given as postive integers (no floating point)
-   all rectangles are on located on the same cartesian plane
-   all rectangles are axis-aligned (line segment slopes are either 0 or undefined)

Rectangles will be input using a modified Well Known Text (WKT) format (polygon of two points). Rectangles are defined in terms of two non-collinear points,
`(x1 y1, x2 y2)` representing the bottom left and top right corners
of the rectangle

###Run the app
To run the tests/view sample data use the following command

```
npm test
```

To start the server run

```
npm run dev
```

###REST Route

The default port is defined in the env file and is 4000.

A sample request would look something like below. I'd recommend using Postman to run the request.

```
POST /rectangles HTTP/1.1
Host: http://localhost:4000
Body: {
    "rectangleOne": { "x1": 2, "y1": 2, "x2": 5, "y2": 5 },
    "rectangleTwo": { "x1": 2, "y1": 5, "x2": 5, "y2": 8 }
}
Accept: application/json
Content-Type: application/json
```

The API will check for all the 3 conditions as mentioned in the problem definiton and would return the
following JSON response depending upon the request params.

{
"intersection": false,
"containment": false,
"adjacency": true
}
