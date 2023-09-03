import http from 'k6/http';
import { jiraUrl, projectId, issueTypeId } from '../config.js';
import { username, apiKey } from '../secrets.js';

export function createJiraTicket(summary, description) {
  const base64Credentials = encodeBase64(`${username}:${apiKey}`);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${base64Credentials}`,
  };

  const data = JSON.stringify({
    "fields": {
      "project": {
        "id": projectId
      },
      "issuetype": {
        "id": issueTypeId
      },
      "summary": summary,
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "description"
              }
            ]
          }
        ]
      },
    }
  });

  const response = http.post(jiraUrl, data, { headers });

  return response;
}

function encodeBase64(input) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
  
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
  
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
  
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
  
      output = output +
        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
        keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
  
    return output;
  }