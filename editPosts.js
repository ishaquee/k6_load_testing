import http  from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
    vus: 10, // Virtual Users
    duration: '20s', // Test duration
    thresholds: {
      http_req_duration: ['p(95)<500', 'p(99)<1000'],
    },
  };

// Define the second scenario: Create a New Post
export default function () {
    const updatedPostData = {
        title: 'Updated Post Title',
        body: 'This is the updated body of the post.',
      };
  
      const headers = {
        'Content-Type': 'application/json',
      };
  
      // Send a PUT request to update the post
      const response = http.put(
        `${BASE_URL}/posts/1`,
        JSON.stringify(updatedPostData),
        { headers }
      );
  
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
