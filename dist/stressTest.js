"use strict";
exports.__esModule = true;
exports.options = void 0;
var http_1 = require("k6/http");
var k6_1 = require("k6");
exports.options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '5m', target: 500 },
        { duration: '2m', target: 700 },
        { duration: '5m', target: 700 },
        { duration: '10m', target: 0 },
    ]
};
function default_1() {
    (0, http_1.batch)([
        ['GET', "".concat(__ENV.API_URL, "/posts")],
        ['GET', "".concat(__ENV.API_URL, "/categories")],
        ['GET', "".concat(__ENV.API_URL, "/comments")],
    ]);
    (0, k6_1.sleep)(1);
}
exports["default"] = default_1;
