import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { db } from '../../config/FirebaseConfig';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NewSupplier() {
  const { id } = useParams();
  const [EmpList, setEmpList] = useState([]);

  const addEmployeeForm = async () => {
    Swal.fire({
      title: 'Add Employee',
      html:
        `<form id='add-employee-form' class='flex w-full flex-wrap   justify-center items-center '>
        <div class='w-full md:w-11/12 px-4 mb-4'>
            <label for='employeeId' class='block text-gray-700 font-bold mb-2'>Employee ID</label>
            <input type='text' name='employeeId' id='employeeId' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' required>
          </div>
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='name' class='block text-gray-700 font-bold mb-2'>Employee Name</label>
              <input type='text' name='name' id='name' class='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required>
            </div>
            
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='mobileNumber' class='block text-gray-700 font-bold mb-2'>Mobile Number</label>
              <input type='tel' name='mobileNumber' id='mobileNumber' class='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required>
            </div>
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='gender' class='block text-gray-700 font-bold mb-2'>Gender</label>
              <select name='gender' id='gender' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 focus:outline-none focus:shadow-outline' required>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='pickupLocation' class='block text-gray-700 font-bold mb-2'>Pickup Location</label>
              <input type='text' name='pickupLocation' id='pickupLocation' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' required>
            </div>
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='dropLocation' class='block text-gray-700 font-bold mb-2'>Drop Location</label>
              <input type='text' name='dropLocation' id='dropLocation' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' required>
            </div>
            <div class='w-full md:w-1/2 px-4 mb-4'>
              <label for='pickupTime' class='block text-gray-700 font-bold mb-2'>Pickup Time</label>
              <input type="text" name='pickupTime' id='pickupTime' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 focus:outline-none focus:shadow-outline' required>
            </div>
          </form>
          `,
      confirmButtonText: 'Submit',
      allowOutsideClick: true,
      confirmButtonColor: '#00adb5',
      customClass: {
        confirmButton: 'bg-green-500 w-32 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        title: 'text-white font-boldmb-2 h-20 bg-[#14181d]',
      },
      preConfirm: () => {
        const EmpName = Swal.getPopup().querySelector('#name').value;
        const EmpMobile = Swal.getPopup().querySelector('#mobileNumber').value;
        const EmpGender = Swal.getPopup().querySelector('#gender').value;
        const EmpID = Swal.getPopup().querySelector('#employeeId').value;
        const EmpPickupLocation = Swal.getPopup().querySelector('#pickupLocation').value;
        const EmpDropLocation = Swal.getPopup().querySelector('#dropLocation').value;
        const EmpPickupTime = Swal.getPopup().querySelector('#pickupTime').value;

        const employeeData = {
          EmpName,
          EmpID,
          EmpMobile,
          EmpPickupLocation,
          EmpDropLocation,
          EmpPickupTime,
          EmpGender,
          EmpList,
          EmpImg: '',
          dropCompleted: 'false',
          pickupCompleted: 'false',
          historyCompletedCount: 0,
          historyCancelledCount: 0,
          token:"",
        };
        
        // Add employee data to Firestore document
        const docRef = doc(db, 'CashBook', EmpID);
        setDoc(docRef, employeeData);

       

        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully',
          icon: 'success',
        });
      },
    });
  };


  return (
    <>
      <div className='p-1 w-7 bg-[#00adb5] rounded-lg shadow-xl transform hover:scale-110 cursor-pointer hover:bg-[#222831] active:scale-95'>
        <CgAddR onClick={addEmployeeForm} className='text-xl text-white transition-all duration-200' />
      </div>



    </>
  );
}
