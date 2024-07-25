const express = require('express');
const router = express.Router();
const getToken = require('../../utils/getToken');
const { createProduct, createPlan } = require('../../utils/createSubscriptionUtils');

router.post('/bulk-create', async (req, res) => {
  const { discounts, descriptionTemplate } = req.body;

  try {
    const token = await getToken();

    const products = [
      {
        name: 'IOS Hybrid App',
        description: 'Professional iOS Hybrid App Development for Apple App Store',
        basePrice: 4995,
        setupFee: 500
      },
      {
        name: 'Android Hybrid App',
        description: 'Professional Android Hybrid App Development for Google Play Store',
        basePrice: 4895,
        setupFee: 500
      },
      {
        name: 'Android and iOS Hybrid App',
        description: 'Development for Both Google Play and Apple App Stores - 2 Apps',
        basePrice: 8995,
        setupFee: 800
      }
    ];

    for (const product of products) {
      const productId = await createProduct(token, product.name, product.description);

      for (const discount of discounts) {
        const discountedPrice = (product.basePrice * (1 - discount / 100)).toFixed(2);
        const monthlyPrice = (discountedPrice / 12).toFixed(2);
        const planName = `${product.name} ${discount}% off - 12 Monthly Payments`;
        const planDescription = descriptionTemplate.replace('{percentage}', discount);

        await createPlan(token, productId, planName, planDescription, monthlyPrice, product.setupFee);
      }
    }

    res.status(200).send('Bulk subscriptions created successfully');
  } catch (error) {
    res.status(500).send(`Error creating bulk subscriptions: ${error.message}`);
  }
});

module.exports = router;
