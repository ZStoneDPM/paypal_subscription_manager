import React, { useState, useEffect } from 'react';
import { updatePlan, deactivatePlan, activatePlan, getPlanDetails } from '../api';

const EditSubscriptionModal = ({ planId, onClose, onUpdate }) => {
  const [plan, setPlan] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [autoBillOutstanding, setAutoBillOutstanding] = useState(false);
  const [paymentFailureThreshold, setPaymentFailureThreshold] = useState(0);
  const [setupFee, setSetupFee] = useState(0);
  const [setupFeeFailureAction, setSetupFeeFailureAction] = useState('');
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [setupFeeEnabled, setSetupFeeEnabled] = useState(false);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await getPlanDetails(planId);
        const data = response.data;
        console.log('Fetched plan details:', data);
        setPlan(data);
        setName(data.name || '');
        setDescription(data.description || '');
        setStatus(data.status || '');
        setAutoBillOutstanding(data.payment_preferences?.auto_bill_outstanding || false);
        setPaymentFailureThreshold(data.payment_preferences?.payment_failure_threshold || 0);
        setSetupFee(data.payment_preferences?.setup_fee?.value || 0);
        setSetupFeeEnabled(data.payment_preferences?.setup_fee?.value > 0 || false);
        setTaxPercentage(data.taxes?.percentage || 0);
      } catch (error) {
        console.error('Error fetching plan details:', error);
      }
    };
  
    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = [
        { "op": "replace", "path": "/name", "value": name },
        { "op": "replace", "path": "/description", "value": description },
        { "op": "replace", "path": "/payment_preferences/auto_bill_outstanding", "value": autoBillOutstanding },
        { "op": "replace", "path": "/payment_preferences/payment_failure_threshold", "value": paymentFailureThreshold },
        { "op": "replace", "path": "/payment_preferences/setup_fee", "value": { "value": setupFee, "currency_code": "USD" } },
        { "op": "replace", "path": "/taxes/percentage", "value": taxPercentage }
      ];
  
      console.log('Sending payload:', updatedPlan);
  
      await updatePlan(planId, updatedPlan);
      onUpdate(planId, {
        ...plan,
        name,
        description,
        payment_preferences: {
          auto_bill_outstanding: autoBillOutstanding,
          payment_failure_threshold: paymentFailureThreshold,
          setup_fee: { value: setupFee, currency_code: 'USD' }
        },
        taxes: { percentage: taxPercentage }
      });
      onClose();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };
  

  const handleDeactivate = async () => {
    try {
      await deactivatePlan(planId);
      onUpdate(planId, { ...plan, status: 'INACTIVE' });
      onClose();
    } catch (error) {
      console.error('Error deactivating plan:', error.response ? error.response.data : error.message);
    }
  };

  const handleActivate = async () => {
    try {
      await activatePlan(planId);
      onUpdate(planId, { ...plan, status: 'ACTIVE' });
      onClose();
    } catch (error) {
      console.error('Error activating plan:', error.response ? error.response.data : error.message);
    }
  };

  if (!plan) {
    return <div>Loading...</div>;
  }

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
              disabled={status === 'INACTIVE'}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={status === 'INACTIVE'}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Auto Bill Outstanding</label>
            <input
              type="checkbox"
              checked={autoBillOutstanding}
              onChange={(e) => setAutoBillOutstanding(e.target.checked)}
              disabled={status === 'INACTIVE'}
              className="shadow border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Setup Fee</label>
            <input
              type="checkbox"
              checked={setupFeeEnabled}
              onChange={(e) => setSetupFeeEnabled(e.target.checked)}
              className="shadow border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {setupFeeEnabled && (
              <input
                type="number"
                value={setupFee}
                onChange={(e) => setSetupFee(e.target.value)}
                disabled={status === 'INACTIVE'}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Payment Failure Threshold</label>
            <input
              type="number"
              value={paymentFailureThreshold}
              onChange={(e) => setPaymentFailureThreshold(e.target.value)}
              disabled={status === 'INACTIVE'}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tax Percentage</label>
            <input
              type="number"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
              disabled={status === 'INACTIVE'}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between">
            {status === 'ACTIVE' && (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Deactivate
                </button>
              </>
            )}
            {status === 'INACTIVE' && (
              <button
                type="button"
                onClick={handleActivate}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Activate
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default EditSubscriptionModal;
