import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function FetchTripStatus() {
  const [tripStatus, setTripStatus] = useState('');
  const { company, date, type, routeId } = useParams();

  useEffect(() => {
    async function fetchRoute() {
      try {
        const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { TripStatus } = docSnap.data();
          setTripStatus(TripStatus);
        }
      } catch (error) {
        console.error("Error fetching trip status:", error);
      }
    }
    fetchRoute();
  }, [company, date, type, routeId]);

  const handleSelect = async (event) => {
    const selectedStatus = event.target.value;
    setTripStatus(selectedStatus);
    const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
    await updateDoc(docRef, { TripStatus: selectedStatus });

    if (selectedStatus === "Completed") {
      Swal.fire({
        title: 'Completed Trip Details',
        html: `<div class="<div class="flex flex-row justify-between items-center">
        
          <input id="pickup" class="p-4 w-1/2 swal2-input border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   bg-gray-100 border-gray-600 placeholder-gray-400 text-black focus:ring-[#00adb5] focus:border-[#00adb5] " placeholder="No of Employees Picked">
          <input id="trip" class=" p-4 w-1/2 swal2-input border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  bg-gray-100 border-gray-600 placeholder-gray-400 text-black focus:ring-[#00adb5] focus:border-[#00adb5] " placeholder="End Trip Time">
          </div>
        `,
        confirmButtonText: 'Submit',
        background:"#1f2937",
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#e53e3e',
        confirmButtonColor: '#00adb5',
        customClass:{
          title:"text-white",
          
        },

        preConfirm: () => {
          const pickupInput = Swal.getPopup().querySelector('#pickup');
          const tripInput = Swal.getPopup().querySelector('#trip');
          const pickup = pickupInput.value;
          const trip = tripInput.value;
          if (!pickup || !trip) {
            Swal.showValidationMessage('Please enter both values');
          }
          return { pickup: parseInt(pickup), trip: parseInt(trip) };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { pickup, trip } = result.value;
          const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
          updateDoc(docRef, { TotalEmployeesPicked: pickup, TripValue: trip })
            .then(() => {
              toast.success("Data stored successfully");
            })
            .catch((error) => {
              toast.error(`Error storing data: ${error.message}`);
            });
        }
      });
    }
  };
  return (
    <>
      <div className="w-full md:w-[154px] h-auto md:h-[167px] border bg-white items-center flex flex-col shadow-lg rounded-lg p-4 gap-5">
        <span className="text-lg font-sf_bold">Trip Status</span>
        <div
          className={
            tripStatus === "Alloted"
              ? "bg-[#ff8103] w-12 h-12 rounded "
              : tripStatus === "Not Alloted"
                ? "bg-[#31007a] w-12 h-12 rounded "
                : tripStatus === "Ongoing"
                  ? "bg-[#e8d100] w-12 h-12 rounded "
                  : "bg-[#2daa00] w-12 h-12 rounded "
          }
        />
        <select
          value={tripStatus}
          className="bg-gray-300 text-black p-2  rounded-lg border-2 border-[#222831] appearance-none hover:bg-[#222831] hover:text-white cursor-pointer text-center"
          onChange={handleSelect}
        >
          <option value="Alloted">Alloted</option>
          <option value="Not Alloted">Not Alloted</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </>
  );
}




