// src/components/EditSubscriptionModal.js
import React, { useState } from 'react';
import { updatePlan } from '../api';

const EditSubscriptionModal = ({ plan, onClose, onUpdate }) => {
  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description);
  const [status, setStatus] = useState(plan.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = { name, description, status };
      await updatePlan(plan.id, updatedPlan);
      onUpdate(plan.id, updatedPlan);
      onClose(); // Close the modal after submitting
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Subscription Plan</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
