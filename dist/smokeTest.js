"use strict";
exports.__esModule = true;
exports.options = void 0;
var http_1 = require("k6/http");
exports.options = {
    vus: 1,
    duration: '10s'
};
exports["default"] = (function () {
    (0, http_1.get)("".concat(__ENV.API_URL, "/posts"));
});
