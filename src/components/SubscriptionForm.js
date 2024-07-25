import React, { useState } from 'react';
import { updatePlan, deletePlan } from '../api';

const PRODUCTS = [
  { id: 'PROD-1', name: 'IOS Hybrid App' },
  { id: 'PROD-2', name: 'Android Hybrid App' },
  { id: 'PROD-3', name: 'Android and iOS Hybrid App' },
];

const EditSubscriptionModal = ({ plan, onClose, onUpdate }) => {
  const [productId, setProductId] = useState(plan.productId || PRODUCTS[0].id);
  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description);
  const [status, setStatus] = useState(plan.status);
  const [setupFee, setSetupFee] = useState(plan.setupFee || '');
  const [chargeSetupFee, setChargeSetupFee] = useState(plan.chargeSetupFee || false);
  const [billingCycles, setBillingCycles] = useState(plan.billingCycles || 'UNLIMITED');
  const [cycleInterval, setCycleInterval] = useState(plan.cycleInterval || 'MONTHS');
  const [intervalCount, setIntervalCount] = useState(plan.intervalCount || 1);
  const [price, setPrice] = useState(plan.price || '');
  const [cycles, setCycles] = useState(plan.cycles || 1);
  const [taxRate, setTaxRate] = useState(plan.taxRate || 5.5);
  const [taxCalculation, setTaxCalculation] = useState(plan.taxCalculation || 'INCLUDE_TAX');
  const [missedCycles, setMissedCycles] = useState(plan.missedCycles || 2);
  const [autoBilling, setAutoBilling] = useState(plan.autoBilling || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = {
        productId,
        name,
        description,
        status,
        setupFee,
        chargeSetupFee,
        billingCycles,
        cycleInterval,
        intervalCount,
        price,
        cycles,
        taxRate,
        taxCalculation,
        missedCycles,
        autoBilling,
      };
      await updatePlan(plan.id, updatedPlan);
      onUpdate(plan.id, updatedPlan);
      onClose();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlan(plan.id);
      onUpdate(plan.id, null);
      onClose();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Subscription Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Product</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {PRODUCTS.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  checked={chargeSetupFee}
                  onChange={(e) => setChargeSetupFee(e.target.checked)}
                  className="mr-2 leading-tight"
                />
                Charge a one-time setup fee
              </label>
              {chargeSetupFee && (
                <input
                  type="number"
                  value={setupFee}
                  onChange={(e) => setSetupFee(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Setup Fee"
                />
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Billing Cycles</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    value="UNLIMITED"
                    checked={billingCycles === 'UNLIMITED'}
                    onChange={(e) => setBillingCycles(e.target.value)}
                    className="mr-2"
                  />
                  Unlimited
                </label>
                <label>
                  <input
                    type="radio"
                    value="LIMITED"
                    checked={billingCycles === 'LIMITED'}
                    onChange={(e) => setBillingCycles(e.target.value)}
                    className="mr-2"
                  />
                  Limited
                </label>
              </div>
              {billingCycles === 'LIMITED' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Every</label>
                    <input
                      type="number"
                      value={intervalCount}
                      onChange={(e) => setIntervalCount(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Interval</label>
                    <select
                      value={cycleInterval}
                      onChange={(e) => setCycleInterval(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="DAYS">Days</option>
                      <option value="WEEKS">Weeks</option>
                      <option value="MONTHS">Months</option>
                      <option value="YEARS">Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Cycles</label>
                    <input
                      type="number"
                      value={cycles}
                      onChange={(e) => setCycles(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tax Calculation</label>
              <select
                value={taxCalculation}
                onChange={(e) => setTaxCalculation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="INCLUDE_TAX">Include tax in price</option>
                <option value="ADD_TAX">Add tax to price</option>
                <option value="NO_TAX">Don't calculate tax</option>
              </select>
              {taxCalculation !== 'NO_TAX' && (
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  placeholder="Tax rate (%)"
                />
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Missed Billing Cycles</label>
              <input
                type="number"
                value={missedCycles}
                onChange={(e) => setMissedCycles(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Number of missed cycles before pausing"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  checked={autoBilling}
                  onChange={(e) => setAutoBilling(e.target.checked)}
                  className="mr-2 leading-tight"
                />
                Turn on auto billing of outstanding payments
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-4">
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
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
