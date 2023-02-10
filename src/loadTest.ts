import { get, post } from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';
 
export const options: Options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};
 
export default () => {
  const loginResponse = post(`${__ENV.API_URL}/authentication/log-in`, {
    email: __ENV.USER_EMAIL,
    password: __ENV.USER_PASSWORD,
  });
 
  check(loginResponse, {
    'logged in successfully': response => {
      return response.status === 200;
    },
  });
 
  const userDataResponse = get(`${__ENV.API_URL}/authentication`, {
    cookies: {
      Authentication: {
        value: loginResponse.cookies.Authentication[0].value,
      },
    },
  });
 
  check(userDataResponse, {
    'got user data': response => {
      return response.status === 200;
    },
  });
 
  sleep(1);
};