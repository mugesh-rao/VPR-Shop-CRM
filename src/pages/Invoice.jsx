import React from 'react'
import Layout from '../Layout/Layout'
import { useState } from 'react';




function Invoice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className='text-center bg-white border py-2 shadow-lg rounded-lg m-4 text-xl font-semibold'> Total Invoice </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Add Transaction
      </button>



      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="max-w-md mx-auto bg-white rounded shadow-lg z-20">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Transaction Form</h2>
              <form onSubmit={""}>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="type">
                    Type:
                  </label>
                  <select
                    id="type"

                    className="w-full p-2 border rounded"
                  >
                    <option value="cashOut">Cash Out</option>
                    <option value="cashIn">Cash In</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="date">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"

                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="amount">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amount"

                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="partyName">
                    Party Name:
                  </label>
                  <input
                    type="text"
                    id="partyName"

                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="remarks">
                    Remarks:
                  </label>
                  <textarea
                    id="remarks"

                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="paymentMode">
                    Payment Mode:
                  </label>
                  <input
                    type="text"
                    id="paymentMode"

                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Transaction
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </Layout>
  )
}

export default Invoice