import React from "react";
import Layout from "../Layout/Layout";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Sale Report</h2>
            {/* Sale Report content */}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Purchase Report</h2>
            {/* Purchase Report content */}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Net Report</h2>
            {/* Net Report content */}
          </div>
        </div>
        <div className="flex flex-row items- py-5">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-4 bg-[#01865f] text-white py-2 px-16 rounded-lg">Sales</button>
          <button className="ml-4 bg-[#c93b3b] text-white py-2 px-16 rounded-lg"> Purchase</button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
