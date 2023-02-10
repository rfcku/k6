"use strict";
exports.__esModule = true;
exports.options = void 0;
var http_1 = require("k6/http");
var k6_1 = require("k6");
exports.options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500']
    }
};
exports["default"] = (function () {
    var loginResponse = (0, http_1.post)("".concat(__ENV.API_URL, "/authentication/log-in"), {
        email: __ENV.USER_EMAIL,
        password: __ENV.USER_PASSWORD
    });
    (0, k6_1.check)(loginResponse, {
        'logged in successfully': function (response) {
            return response.status === 200;
        }
    });
    var userDataResponse = (0, http_1.get)("".concat(__ENV.API_URL, "/authentication"), {
        cookies: {
            Authentication: {
                value: loginResponse.cookies.Authentication[0].value
            }
        }
    });
    (0, k6_1.check)(userDataResponse, {
        'got user data': function (response) {
            return response.status === 200;
        }
    });
    (0, k6_1.sleep)(1);
});
