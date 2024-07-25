const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();
const baseURL = 'https://api-m.sandbox.paypal.com';
const getToken = require('../../utils/getToken');

router.post('/:id/deactivate', async (req, res) => {
  try {
    const token = await getToken();
    const { id } = req.params;

    const response = await fetch(`${baseURL}/v1/billing/plans/${id}/deactivate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.statusText}, Details: ${errorText}`);
    }

    // Check if response body is empty
    const responseBody = await response.text();
    const data = responseBody ? JSON.parse(responseBody) : {};
    
    res.json(data);
  } catch (error) {
    console.error('Error deactivating plan:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
