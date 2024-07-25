import React, { useState } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import { createSubscription } from '../api';

function BulkCreateSubscription() {
  const [subscriptions, setSubscriptions] = useState([{}]);

  const handleAddMore = () => {
    const firstSubscription = subscriptions[0];
    const newSubscription = {
      productId: firstSubscription.productId,
      planName: firstSubscription.planName,
      planDescription: firstSubscription.planDescription,
      chargeSetupFee: firstSubscription.chargeSetupFee,
      setupFee: firstSubscription.setupFee,
      billingCycles: firstSubscription.billingCycles,
      intervalCount: firstSubscription.intervalCount,
      cycleInterval: firstSubscription.cycleInterval,
      price: firstSubscription.price,
      cycles: firstSubscription.cycles,
      taxRate: firstSubscription.taxRate,
      taxCalculation: firstSubscription.taxCalculation,
      missedCycles: firstSubscription.missedCycles,
      autoBilling: firstSubscription.autoBilling,
    };

    setSubscriptions([...subscriptions, newSubscription]);
  };

  const handleSaveAll = async () => {
    console.log('Saving subscriptions:', subscriptions);
    try {
      for (const subscription of subscriptions) {
        console.log('Creating subscription:', subscription);
        await createSubscription(subscription);
      }
      alert('Subscriptions created successfully!');
    } catch (error) {
      console.error('Error creating subscriptions:', error);
      alert('Failed to create subscriptions. Please try again.');
    }
  };

  const handleUpdate = (index, updatedSubscription) => {
    console.log('Updating subscription at index:', index, 'with data:', updatedSubscription);
    const updatedSubscriptions = subscriptions.map((sub, i) =>
      i === index ? updatedSubscription : sub
    );
    setSubscriptions(updatedSubscriptions);
  };

  const handleDelete = (index) => {
    console.log('Deleting subscription at index:', index);
    const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bulk Create Subscription</h1>
      {subscriptions.map((subscription, index) => (
        <div key={index} className="mb-4 bg-white shadow-md rounded p-4">
          <SubscriptionForm
            subscription={subscription}
            onUpdate={(updatedSubscription) => handleUpdate(index, updatedSubscription)}
          />
          {index > 0 && (
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleAddMore}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4"
      >
        + Add more
      </button>
      <button
        onClick={handleSaveAll}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save All
      </button>
    </div>
  );
}

export default BulkCreateSubscription;
