import http  from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = {
    vus: 100, // Virtual Users
    duration: '2s', // Test duration
    thresholds: {
      http_req_duration: ['p(95)<500', 'p(99)<1000'],
    },
  };
  export default function () {
    // Define the API endpoint URL
    const apiUrl = BASE_URL+'/posts';
  
    // Define the HTTP headers (optional)
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Make a GET request to retrieve user posts
    const response = http.get(apiUrl, { headers });
  
    // Check if the response status code is 200 (OK)
    check(response, {
      'Response status code is 200': (r) => r.status === 200,
      'Response time is below 1000ms': (r) => r.timings.duration < 1000,

    });
  
    // Simulate a delay between requests (e.g., 1-3 seconds)
    sleep(Math.random() * 2 + 1);
  }
export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: false }),
    };
  }
