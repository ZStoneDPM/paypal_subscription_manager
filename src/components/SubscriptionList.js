import React, { useEffect, useState } from 'react';
import { getPlans } from '../api';
import SubscriptionCard from '../components/SubscriptionCard';
import EditSubscriptionModal from '../components/EditSubscriptionModal';

const SubscriptionList = () => {
  const [plans, setPlans] = useState([]);
  const [displayPlans, setDisplayPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('ACTIVE');
  const pageSize = 10; // Set page size

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        console.log('Fetched plans:', response.data);
        if (Array.isArray(response.data.plans)) {
          setPlans(response.data.plans);
          setTotalPages(Math.ceil(response.data.plans.length / pageSize));
          setDisplayPlans(response.data.plans.slice(0, pageSize));
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredPlans = plans.filter(plan => filter === 'ALL' || plan.status === filter);
    setDisplayPlans(filteredPlans.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredPlans.length / pageSize));
  }, [currentPage, plans, filter]);

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

  const handleDelete = (id) => {
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const logActivePlans = () => {
    const activePlans = plans.filter(plan => plan.status === 'ACTIVE');
    console.log('Active plans:', JSON.stringify(activePlans, null, 2));
  };

  return (
    <div className="m-12">
      <h1>Manage Subscriptions</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => handleFilterChange('ACTIVE')}
            className={`mr-2 ${filter === 'ACTIVE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-bold py-2 px-4 rounded`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange('INACTIVE')}
            className={`mr-2 ${filter === 'INACTIVE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-bold py-2 px-4 rounded`}
          >
            Inactive
          </button>
          <button
            onClick={() => handleFilterChange('ALL')}
            className={`${filter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-bold py-2 px-4 rounded`}
          >
            All
          </button>
          <button
            onClick={logActivePlans}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Log Active Plans
          </button>
        </div>
        <div className="flex justify-end items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="card-container">
        {displayPlans.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} onEdit={handleEdit} />
        ))}
      </div>
      {selectedPlan && (
        <EditSubscriptionModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SubscriptionList;
