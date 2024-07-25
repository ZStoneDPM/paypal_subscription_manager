const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const baseURL = 'https://api-m.sandbox.paypal.com';

const createProduct = async (token, productName, productDescription) => {
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
            interval_unit: 'MONTH',
            interval_count: 1
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 12,
          pricing_scheme: {
            fixed_price: {
              value: price,
              currency_code: 'USD'
            }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: setupFee,
          currency_code: 'USD'
        },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 2
      },
      taxes: {
        percentage: '5.5',
        inclusive: true
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

module.exports = { createProduct, createPlan };
