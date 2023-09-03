import http from 'k6/http';
import { BASE_URL } from './config.js';
import { createJiraTicket } from './jira/createJiraTicket.js';

export let options = {
  vus: 1, // Virtual Users
  duration: '30s', // Test duration
};

export default function () {
  // Define your API endpoint
  const response = http.get(BASE_URL+'/posts/1');

  // Check if the API request failed
  if (response.status !== 200) {
    // If it failed, create a Jira ticket
    const summary = "Issue created due to API failure";
    const description = "The API request failed with status code " + response.status;
    const jiraResponse = createJiraTicket(summary, description);
    console.log('Jira Ticket Created:', jiraResponse.body);
  }
}
