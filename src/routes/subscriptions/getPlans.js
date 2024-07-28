const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();
const baseURL = 'https://api-m.sandbox.paypal.com';
const getToken = require('../../utils/getToken');

router.get('/:id', async (req, res) => {
  try {
    const token = await getToken();
    const { id } = req.params;

    const response = await fetch(`${baseURL}/v1/billing/plans/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}, Details: ${JSON.stringify(data)}`);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching plan details:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const token = await getToken();
    let plans = [];
    let page = 1;
    const pageSize = 20;

    while (true) {
      const response = await fetch(`${baseURL}/v1/billing/plans?page_size=${pageSize}&page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      plans = plans.concat(data.plans);
      if (!data.links.some(link => link.rel === 'next')) {
        break;
      }
      page++;
    }

    console.log('Fetched all plans from PayPal:', plans.length);
    res.json({
      plans,
      total_items: plans.length,
      page_size: pageSize
    });
  } catch (error) {
    console.error('Error fetching plans:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
