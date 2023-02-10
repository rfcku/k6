"use strict";
exports.__esModule = true;
exports.options = void 0;
var http_1 = require("k6/http");
var k6_1 = require("k6");
exports.options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 3000 },
        { duration: '3m', target: 3000 },
        { duration: '10s', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
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
