import React, { useState } from 'react';
import { updatePlan, deactivatePlan, activatePlan } from '../api';

const EditSubscriptionModal = ({ plan, onClose, onUpdate }) => {
  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description);
  const [status, setStatus] = useState(plan.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = [
        { "op": "replace", "path": "/name", "value": name },
        { "op": "replace", "path": "/description", "value": description }
      ];

      console.log('Sending payload:', updatedPlan); // Log the payload being sent

      await updatePlan(plan.id, updatedPlan);
      onUpdate(plan.id, { ...plan, name, description });
      onClose();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivatePlan(plan.id);
      onUpdate(plan.id, { ...plan, status: 'INACTIVE' });
      onClose();
    } catch (error) {
      console.error('Error deactivating plan:', error.response ? error.response.data : error.message);
    }
  };

  const handleActivate = async () => {
    try {
      await activatePlan(plan.id);
      onUpdate(plan.id, { ...plan, status: 'ACTIVE' });
      onClose();
    } catch (error) {
      console.error('Error activating plan:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Subscription Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeactivate}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Deactivate
            </button>
            <button
              type="button"
              onClick={handleActivate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Activate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
