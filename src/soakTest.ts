
import { batch } from 'k6/http';
import { sleep } from 'k6';
import { Options } from 'k6/options';
 
export const options: Options = {
  stages: [
    { duration: '2m', target: 400 },
    { duration: '3h56m', target: 400 },
    { duration: '2m', target: 0 },
  ],
};
 
export default function() {
  batch([
    ['GET', `${__ENV.API_URL}/posts`],
    ['GET', `${__ENV.API_URL}/categories`],
    ['GET', `${__ENV.API_URL}/comments`],
  ]);
 
  sleep(1);
}