const express = require('express');
const router = express.Router();
const getToken = require('../../utils/getToken');

const baseURL = 'https://api-m.sandbox.paypal.com';

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const token = await getToken();

    const response = await fetch(`${baseURL}/v1/billing/plans/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      res.status(204).send();
    } else {
      const errorData = await response.json();
      res.status(response.status).json(errorData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
