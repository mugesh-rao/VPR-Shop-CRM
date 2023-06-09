import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import FetchIndividualDriverData from './FetchTripDetails/FetchIndividualDriverData';
import FetchVehicleStatus from './FetchTripDetails/FetchVehicleStatus';
import FetchTripStatus from './FetchTripDetails/FetchTripStatus';
import FetchEmployeeData from './FetchTripDetails/FetchEmployeeData';
import EditIndividualTripData from './EditTripDetails/EditIndividualTripData';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import Swal from 'sweetalert2';
import DriverDetailsAlloted from './EditTripDetails/DriverDetailsAlloted';


function EditTrip() {
  const navigate = useNavigate();
  const { company, date, type, routeId } = useParams();

  const [Listing, setListing] = useState({});

  useEffect(() => {
    async function fetchRoute() {
      const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      }

    }
    fetchRoute();
  }, [company, date, type, routeId]);

  async function deleteRoute() {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete this route. This action cannot be undone!',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const docRef = doc(db, 'RouteList', company, date, 'All', type, routeId);
      await deleteDoc(docRef);
      navigate(-2)
    }
  }

  return (
    <Layout>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-4'>
          <div className='p-2 bg-white cursor-pointer drop-shadow-lg rounded-lg shadow-lg'>
            <IoMdArrowRoundBack
              onClick={() => navigate(-1)}
              className='text-[#a61f69] w-6 h-6 ' />
          </div>

          <button className='p-2 bg-white cursor-pointer drop-shadow-lg rounded-lg shadow-lg' onClick={() => deleteRoute()}>
            <RiDeleteBin6Line className='text-[#ff0000] w-6 h-6 ' />
          </button>

        </div>
        <div className='flex flex-col gap-4 '>
          <div className='flex flex-col gap-1 md:flex-row md:gap-1'>
            <EditIndividualTripData />
            <div className='flex flex-col gap-2 m-2'>
              <FetchIndividualDriverData />
              <div className='flex flex-col gap-2 '>
                <div className='flex flex-row gap-2'>
                  <FetchVehicleStatus />
                  <FetchTripStatus />
                </div>
                <div className='flex'>

                <DriverDetailsAlloted />
                </div>

              </div>

            </div>
          </div>
          <div>
            <FetchEmployeeData />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditTrip;
