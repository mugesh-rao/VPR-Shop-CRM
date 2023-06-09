import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

function FetchIndividualTripData() {
  const { company, date, type, routeId } = useParams();

  const [RouteID, setRouteID] = useState("");
  const [RouteName, setRouteName] = useState("");
  const [TripType, setTripType] = useState("");
  const [TripDate, setTripDate] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [ShiftTime, setShiftTime] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [NoofPickups, setNoofPickups] = useState("");
  const [DropLocation, setDropLocation] = useState("");
  const [PickupLocation, setPickupLocation] = useState("");

 

  useEffect(() => {
    async function fetchRoute() {
      const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { RouteID, RouteName, TripType, TripDate, PickupTime, ShiftTime, VehicleType, NoofPickups, DropLocation, PickupLocation } = docSnap.data();
        setRouteID(RouteID);
        setRouteName(RouteName);
        setTripType(TripType);
        setTripDate(TripDate);
        setPickupTime(PickupTime);
        setShiftTime(ShiftTime);
        setVehicleType(VehicleType);
        setNoofPickups(NoofPickups);
        setDropLocation(DropLocation);
        setPickupLocation(PickupLocation);
        
      }
    }
    fetchRoute();
  }, [company, date, type, routeId]);

  return (
    <div class="container mx-auto ">
      <div class="max-w-screen-md mx-auto border-2 bg-white shadow-lg rounded-lg px-8 py-6">
      <div>
</div>

        <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
          <div class="w-full md:w-1/2 md:px-3 mb-6 md:mb-0">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-first-name"
            >
              Route ID
            </label>
            <input
            placeholder="Route ID"
              value={RouteID}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 md:px-3 mb-6 md:mb-0">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-last-name"
            >
              Route Name
            </label>
            <input
            placeholder="Route Name"
              value={RouteName}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-first-name"
            >
              Date
            </label>
            <input
            placeholder="Date"
              value={TripDate}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-last-name"
            >
              From Location
            </label>
            <input
            placeholder="From Location"
              value={PickupLocation}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-first-name"
            >
              Pickup Time
            </label>
            <input
            placeholder="Pickup Time"
              value={PickupTime}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-last-name"
            >
              To Location
            </label>
            <input
            placeholder="To Location"
              value={DropLocation}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-first-name"
            >
              Shift Time
            </label>
            <input
            placeholder="Shift Time"
              value={ShiftTime}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-last-name"
            >
              No Of Pickups
            </label>
            <input
            placeholder="No of Pickups"
              value={NoofPickups}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-first-name"
            >
              Trip Type
            </label>
            <input
            placeholder="Trip Type"
              value={TripType}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
              for="grid-last-name"
            >
              Vehicle Type
            </label>
            <input
              placeholder="Vehicle Type"
              value={VehicleType}
              class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchIndividualTripData;
