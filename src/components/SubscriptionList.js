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
    setDisplayPlans(plans.slice(startIndex, endIndex));
  }, [currentPage, plans]);

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

  return (
    <div>
      <h1>Manage Subscriptions</h1>
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
      <div className="pagination flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriptionList;
