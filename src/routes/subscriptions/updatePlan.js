const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();
const baseURL = 'https://api-m.sandbox.paypal.com';
const getToken = require('../../utils/getToken');

router.patch('/:id', async (req, res) => {
  try {
    const token = await getToken();
    const { id } = req.params;

    // Log the request payload
    console.log('Request payload:', req.body);

    const response = await fetch(`${baseURL}/v1/billing/plans/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    console.log('Response status:', response.status);

    if (response.status === 204) {
      // No content to return, so just send a success message
      res.status(204).send();
    } else if (!response.ok) {
      const responseBody = await response.text();
      console.log('Response text:', responseBody);
      throw new Error(`Error: ${response.statusText}, Details: ${responseBody}`);
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
