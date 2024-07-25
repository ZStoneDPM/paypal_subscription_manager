// src/routes/subscriptions/createSubscription.js
const express = require('express');
const getToken = require('../../utils/getToken');

const baseURL = 'https://api-m.sandbox.paypal.com';

const createSubscription = async (req, res) => {
  const { productId, planName, planDescription, chargeSetupFee, setupFee, billingCycles, intervalCount, cycleInterval, price, cycles, taxRate, taxCalculation, missedCycles, autoBilling } = req.body;

  const createProduct = async (token, productName, productDescription) => {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${baseURL}/v1/catalogs/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': `PRODUCT-${new Date().toISOString()}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: productName,
        description: productDescription,
        type: 'SERVICE',
        category: 'SOFTWARE',
        image_url: 'https://example.com/product-image.jpg',
        home_url: 'https://example.com/home'
      })
    });

    const data = await response.json();

    if (response.ok) {
      return data.id;
    } else {
      throw new Error(`Error creating product: ${data.error}`);
    }
  };

  const createPlan = async (token, productId, planName, planDescription, price, setupFee) => {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${baseURL}/v1/billing/plans`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        product_id: productId,
        name: planName,
        description: planDescription,
        status: 'ACTIVE',
        billing_cycles: [
          {
            frequency: {
              interval_unit: cycleInterval,
              interval_count: intervalCount
            },
            tenure_type: 'REGULAR',
            sequence: 1,
            total_cycles: billingCycles === 'UNLIMITED' ? 0 : cycles,
            pricing_scheme: {
              fixed_price: {
                value: price,
                currency_code: 'USD'
              }
            }
          }
        ],
        payment_preferences: {
          auto_bill_outstanding: autoBilling,
          setup_fee: chargeSetupFee ? {
            value: setupFee,
            currency_code: 'USD'
          } : undefined,
          setup_fee_failure_action: 'CONTINUE',
          payment_failure_threshold: missedCycles
        },
        taxes: {
          percentage: taxRate,
          inclusive: taxCalculation === 'INCLUDE_TAX'
        }
      })
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(`Error creating plan: ${data.error}`);
    }
  };

  try {
    const token = await getToken();

    // Simulate product creation since it's pre-existing in PayPal UI
    const productIdToUse = productId ? productId : await createProduct(token, planName, planDescription);

    const planData = await createPlan(token, productIdToUse, planName, planDescription, price, setupFee);

    res.status(201).json(planData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createSubscription;
