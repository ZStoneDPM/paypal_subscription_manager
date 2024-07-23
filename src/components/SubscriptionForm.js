import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    discount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/create-subscription', formData);
      console.log('Subscription created:', response.data);
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Discount (%)</label>
        <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
      </div>
      <button type="submit">Create Subscription</button>
    </form>
  );
}

export default SubscriptionForm;
