import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { db } from "../../../config/FirebaseConfig";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import AddNewEmployee from "../AddNewEmployee";


const FetchEmployeeData = () => {


  const { company, date, type, routeId } = useParams();
  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    async function fetchEmpList() {
      const collectionRef = collection(db, "RouteList", company, date, "All", type, routeId, "Employees");
      const querySnapshot = await getDocs(collectionRef);
      const empListData = querySnapshot.docs.map((doc) => doc.data());
      setEmpList(empListData);
    }
    fetchEmpList();
  }, [company, date, type, routeId]);


  const handleEditEmp = (emp) => {
    Swal.fire({
      title: 'Edit Employee',
      html:
        `<form id='edit-employee-form'  class='flex w-full flex-wrap  -mx-4'>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='name' class='block text-gray-700 font-bold mb-2'>Employee Name</label>
                <input type='text' name='name' id='name' class='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpName}' required>
              </div>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='mobileNumber' class='block text-gray-700 font-bold mb-2'>Mobile Number</label>
                <input type='tel' name='mobileNumber' id='mobileNumber' class='shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpMobile}' required>
              </div>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='gender' class='block text-gray-700 font-bold mb-2'>Gender</label>
                <select name='gender' id='gender' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 focus:outline-none focus:shadow-outline' required>
                  <option value='Male' ${emp.EmpGender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value='Female' ${emp.EmpGender === 'Female' ? 'selected' : ''}>Female</option>
                </select>
              </div>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='employeeId' class='block text-gray-700 font-bold mb-2'>Employee ID</label>
                <input type='text' name='employeeId' id='employeeId' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpID}' required>
              </div>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='pickupLocation' class='block text-gray-700 font-bold mb-2'>Pickup Location</label>
                <input type='text' name='pickupLocation' id='pickupLocation' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpPickupLocation}' required>
              </div>
              <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='dropLocation' class='block text-gray-700 font-bold mb-2'>Drop Location</label>
                <input type='text' name='dropLocation' id='dropLocation' class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpDropLocation}' required>
                </div>
                <div class='w-full md:w-1/2 px-4 mb-4'>
                <label for='pickupTime' class='block text-gray-700 font-bold mb-2'>Pickup Time</label>
                <input type="text" name='dropLocation' id='pickupTime' 
                required  class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline' value='${emp.EmpPickupTime}' required>
                </div>
                </form>
</button>`,
      focusConfirm: false,
      showCancelButton: false,
      allowEnterKey: false,
      customClass: {
        title: 'text-white font-boldmb-2 h-20 bg-[#14181d]',
        confirmButton: 'bg-[#00686d] w-32 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded',
      },

      preConfirm: () => {
        const EmpName = document.getElementById('name').value;
        const EmpMobile = document.getElementById('mobileNumber').value;
        const EmpGender = document.getElementById('gender').value;
        const EmpID = document.getElementById('employeeId').value;
        const EmpPickupLocation = document.getElementById('pickupLocation').value;
        const EmpDropLocation = document.getElementById('dropLocation').value;
        const EmpPickupTime = document.getElementById('pickupTime').value;


        const employeeData = {
          EmpName,
          EmpID,
          EmpMobile,
          EmpPickupLocation,
          EmpDropLocation,
          EmpGender,
          EmpPickupTime,

        };

        // Add employee data to Firestore document
        const docRef = doc(db, 'RouteList', company, date, 'All', type, routeId, 'Employees', emp.EmpID);
        updateDoc(docRef, employeeData);

        const docRefs = doc(db, 'EmployeeList', emp.EmpID);
        updateDoc(docRefs, employeeData);


      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: 'Employee has been updated!',
          icon: 'success',
        }).then(() => {

        });
      }
    });
  };

  const handleDeleteEmp = async (empID) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const reference = doc(db, "RouteList", company, date, "All", type, routeId, "Employees", empID);
      await deleteDoc(reference);

      // Update state to remove the deleted employee record
      setEmpList(prevEmpList => prevEmpList.filter(emp => emp.EmpID !== empID));

      Swal.fire("Deleted!", "Employee record has been deleted successfully.", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your employee record is safe :)", "error");
    }
  }


  return (
    <>
      <AddNewEmployee />
      <div className="   flex-1  m-2 bg-white border-1 rounded-xl p-4 flex flex-col gap-6 shadow-2xl overflow-auto">
        <table className=" w-full m-auto border-collapse">
          <thead className="bg-[#3C4048] text-white font-sf_bold rounded-2xl table-row align-middle outline-none">
            <th className=" p-4  rounded-l-xl font-sf_bold capitalize">S.No</th>
            <th className=" p-4 font-sf_bold capitalize ">Employee ID</th>
            <th className=" p-4 font-sf_bold capitalize ">Employee Name </th>
            <th className=" p-4 font-sf_bold capitalize " >Gender</th>
            <th className=" p-4 font-sf_bold capitalize ">Contact Number</th>
            <th className=" p-4 font-sf_bold capitalize ">Pickup Time</th>
            <th className="p-4 font-sf_bold rounded-r-xl capitalize">Action</th>
          </thead>
          <tbody>
            {empList.map((emp, index) => (
              <tr key={emp.EmpID}>
                <td className="border px-4 py-2">{index}</td>
                <td className="border px-4 py-2">{emp.EmpID}</td>
                <td className="border px-4 py-2">{emp.EmpName}</td>
                <td className="border px-4 py-2">{emp.EmpGender}</td>
                <td className="border px-4 py-2">{emp.EmpMobile}</td>
                <td className="border px-4 py-2">{emp.EmpPickupTime}</td>
                <td className="border px-4 flex-row flex py-2 gap-2" >
                  <RiEdit2Fill
                    className="text-2xl text-blue-600 cursor-pointer hover:text-blue-900 active:text-blue-300"
                    onClick={() => handleEditEmp(emp)}
                  />
                  <MdDelete
                    className="text-2xl text-red-600 cursor-pointer hover:text-red-900 active:text-red-300"
                    onClick={() => handleDeleteEmp(emp.EmpID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FetchEmployeeData