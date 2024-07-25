import React from 'react';

const SubscriptionCard = ({ plan, onEdit }) => {
  return (
    <div className="card" onClick={() => onEdit(plan)}>
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <p>Status: {plan.status}</p>
    </div>
  );
};

export default SubscriptionCard;
