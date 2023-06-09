import React from 'react';


const AddEmployeeTable = ({ EmpList }) => {
  return (
    <>
      <div class="overflow-x-auto">
        <table class="table-auto border-collapse w-full border border-[#222831] rounded-3xl">
          <thead className=' rounded-md '>
            <tr class="bg-[#393e46] rounded-2xl text-white text-center ">
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Name</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">ID</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Mobile</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Gender</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Pickup Location</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Pickup Time</th>
              <th class="px-4 py-3 text-sm font-medium uppercase tracking-wider">Drop Location</th>
            </tr>
          </thead>
          <tbody>
            {EmpList.reverse().map((Emp, index) => (
              <tr key={Emp.EmpName} class={`${index % 2 === 0 ? 'bg-white ' : 'bg-white'} border-t text-center border-gray-600`}>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpName}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpID}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpMobile}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpGender}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpPickupLocation}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpPickupTime}</td>
                <td class="px-4 py-3 text-sm text-gray-800">{Emp.EmpDropLocation}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </>
  );
};

export default AddEmployeeTable;
