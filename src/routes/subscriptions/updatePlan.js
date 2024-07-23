const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = express.Router();
const baseURL = 'https://api-m.sandbox.paypal.com';
const getToken = require('../../utils/getToken');

router.patch('/:id', async (req, res) => {
  try {
    const token = await getToken();
    const { id } = req.params;
    const response = await fetch(`${baseURL}/v1/billing/plans/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
