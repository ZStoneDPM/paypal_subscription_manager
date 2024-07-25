import React from 'react';
import SubscriptionForm from '../components/SubscriptionForm';

function CreateSubscription() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Subscription</h1>
      <SubscriptionForm onUpdate={(data) => console.log('Create data:', data)} />
    </div>
  );
}

export default CreateSubscription;
