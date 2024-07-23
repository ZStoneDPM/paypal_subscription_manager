import React, { useEffect, useState } from 'react';
import { getPlans } from '../api';
import SubscriptionCard from '../components/SubscriptionCard';
import EditSubscriptionModal from '../components/EditSubscriptionModal';

const SubscriptionList = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        if (Array.isArray(response.data.plans)) {
          setPlans(response.data.plans);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
  };

  const handleUpdate = (id, updatedPlan) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      )
    );
  };

  return (
    <div>
      <h1>Manage Subscriptions</h1>
      <div className="card-container">
        {plans.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} onEdit={handleEdit} />
        ))}
      </div>
      {selectedPlan && (
        <EditSubscriptionModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default SubscriptionList;
