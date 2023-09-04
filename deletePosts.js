import http  from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL,VUS,DURATION } from './config.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
    vus: VUS, // Virtual Users
    duration: DURATION, // Test duration
    thresholds: {
      http_req_duration: ['p(95)<500', 'p(99)<1000'],
    },
  };

// Define the second scenario: Create a New Post
export default function () {
    const response = http.del(`${BASE_URL}/posts/${'1'}`);

    check(response, {
      'Response status code is 200': (r) => r.status === 200,
      'Response time is below 1000ms': (r) => r.timings.duration < 1000,
    });

    sleep(Math.random() * 2 + 1);
  };

  export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
