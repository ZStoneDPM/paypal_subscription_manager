const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = express.Router();
const baseURL = 'https://api-m.sandbox.paypal.com';
const getToken = require('../../utils/getToken');

router.get('/', async (req, res) => {
  try {
    const token = await getToken();
    const response = await fetch(`${baseURL}/v1/billing/plans`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
