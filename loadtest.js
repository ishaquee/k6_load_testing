import http  from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
    vus: 1, // Virtual Users
    duration: '30s', // Test duration
    thresholds: {
        http_req_duration: ["p(95)<150"],
      },
  };

export default function () {
  // Send an HTTP GET request to a specific API endpoint
  const response = http.get(`${BASE_URL}/posts/1`);
  
  console.log(`Request to /api/resource returned status code: ${response.status}`);


  // Add assertions to validate the response
  check(response, {
    'Response status code is 200': (r) => r.status === 200,
    'Response time is below 500ms': (r) => r.timings.duration < 500,
  });
  
  // Introduce a delay between iterations (e.g., 1 second)
  sleep(1);
}
export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
