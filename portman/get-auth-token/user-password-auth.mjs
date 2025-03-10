import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
  const initiateAuthResponse = await axios({
    url: process.env.COGNITO_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
    },
    data: JSON.stringify({
      ClientId: process.env.CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD
      }
    })
  });


  const token = initiateAuthResponse.data.AuthenticationResult.IdToken;

  const portmanCliPath = resolve(__dirname, '../portman-cli.json');
  const portmanCliJsonFile = JSON.parse(fs.readFileSync(portmanCliPath, 'utf-8'));


  const portmanEnv = `PORTMAN_TOKEN=${token}\n`;

  fs.writeFileSync(portmanCliJsonFile.envFile, portmanEnv, 'utf-8');
}

run();