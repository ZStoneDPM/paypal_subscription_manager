import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPlans } from '../api'; // Ensure this function fetches plans, not subscriptions

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    planId: '',
    subscriberName: '',
    subscriberEmail: '',
    startTime: '',
    shippingAmount: '',
    currencyCode: 'USD',
  });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        setPlans(response.data.plans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await axios.post('/api/subscriptions/create', {
        plan_id: formData.planId,
        start_time: formData.startTime,
        quantity: '1',
        shipping_amount: {
          currency_code: formData.currencyCode,
          value: formData.shippingAmount,
        },
        subscriber: {
          name: {
            full_name: formData.subscriberName,
          },
          email_address: formData.subscriberEmail,
        },
      });
      console.log('Subscription created:', response.data);
      setSuccess(true);
      setFormData({
        planId: '',
        subscriberName: '',
        subscriberEmail: '',
        startTime: '',
        shippingAmount: '',
        currencyCode: 'USD',
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Subscription</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Plan</label>
        <select
          name="planId"
          value={formData.planId}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a plan</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subscriber Name</label>
        <input
          type="text"
          name="subscriberName"
          value={formData.subscriberName}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subscriber Email</label>
        <input
          type="email"
          name="subscriberEmail"
          value={formData.subscriberEmail}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Shipping Amount</label>
        <input
          type="number"
          name="shippingAmount"
          value={formData.shippingAmount}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      {success && <p className="text-green-500 text-xs italic mb-4">Subscription created successfully!</p>}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Subscription'}
        </button>
      </div>
    </form>
  );
}

export default SubscriptionForm;
