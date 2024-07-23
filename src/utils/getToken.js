const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) }); // Adjust the path to go up two levels

const baseURL = 'https://api-m.sandbox.paypal.com';

const getToken = async () => {
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_PAYPAL_CLIENT_SECRET;

    // Log environment variables to verify they are loaded correctly
    // console.log('Client ID:', clientId);
    // console.log('Client Secret:', clientSecret);

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${baseURL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();

    if (response.ok) {
        return data.access_token;
    } else {
        throw new Error(`Error getting token: ${data.error_description}`);
    }
};

module.exports = getToken;
