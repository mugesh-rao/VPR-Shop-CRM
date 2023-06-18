import React from 'react';

const EditTranscation = ({ isOpen, onClose, date, remarks, type, party, time }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="date">
            Date:
          </label>
          <input
            type="text"
            id="date"
            value={date}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="remarks">
            Remarks:
          </label>
          <textarea
            id="remarks"
            value={remarks}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="type">
            Type:
          </label>
          <input
            type="text"
            id="type"
            value={type}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="party">
            Party:
          </label>
          <input
            type="text"
            id="party"
            value={party}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold" htmlFor="time">
            Time:
          </label>
          <input
            type="text"
            id="time"
            value={time}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTranscation;
