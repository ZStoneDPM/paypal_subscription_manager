import React from 'react';

const ListItem = ({ plan, onEdit }) => {
  return (
    <button 
      onClick={() => onEdit(plan)} 
      className="w-full text-left p-2 border-b border-gray-200 hover:bg-gray-100"
    >
      <div className="flex justify-between items-center">
        <span>{plan.name}</span>
        <span className={`px-2 py-1 rounded ${plan.status === 'ACTIVE' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {plan.status}
        </span>
      </div>
    </button>
  );
};

export default ListItem;
