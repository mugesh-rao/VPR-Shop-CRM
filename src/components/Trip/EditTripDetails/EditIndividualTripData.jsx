import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function EditIndividualTripData() {
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
    const [Company, setCompany] = useState("R1");
    const [TripAmount, setTripAmount] = useState("");



    useEffect(() => {
        async function fetchTripData() {
            try {
                const driverDoc = await getDoc(doc(db, "RouteList", company, date, "All", type, routeId));
                if (driverDoc.exists()) {
                    const TripData = driverDoc.data();
                    setRouteID(TripData.RouteID);
                    setRouteName(TripData.RouteName);
                    setVehicleType(TripData.VehicleType);
                    setDropLocation(TripData.DropLocation);
                    setNoofPickups(TripData.NoofPickups);
                    setCompany(TripData.Company);
                    setTripDate(TripData.TripDate);
                    setPickupTime(TripData.PickupTime);
                    setPickupLocation(TripData.PickupLocation);
                    setShiftTime(TripData.ShiftTime);
                    setTripType(TripData.TripType);
                    setTripAmount(TripData.TripAmount);


                } else {
                    console.log("No such document fetch!");
                }
            } catch (e) {
                console.error("Error getting document:", e);
            }
        }
        fetchTripData();
    }, [company, date, type, routeId]);

    const UpdateDriver = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "RouteList", company, date, "All", type, routeId), {
                RouteID: RouteID,
                RouteName: RouteName,
                VehicleType: VehicleType,
                DropLocation: DropLocation,
                NoofPickups: NoofPickups,
                Company: Company,
                TripDate: TripDate,
                PickupTime: PickupTime,
                PickupLocation: PickupLocation,
                ShiftTime: ShiftTime,
                TripType: TripType,
                TripAmount: TripAmount,
            });
            toast.success("Data updated successfully",);
        } catch (e) {
            toast.error("Not Updated");
        }




    };
    return (
        <div class="container mx-auto ">
            <Toaster />

            <div class="max-w-screen-md mx-auto border-2 bg-white shadow-lg rounded-lg px-8 py-6">
                <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
                    <div class="w-full md:w-1/2 md:px-3 mb-6 md:mb-0">
                        <label
                            class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                            for="grid-first-name"
                        >
                            Route ID
                        </label>
                        <input
                            placeholder="Enter Driver Name"
                            onChange={(e) => setRouteID(e.target.value)}
                            value={RouteID}
                            classname="uppercase"
                            class="appearance-nonefont-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                            onChange={(e) => setRouteName(e.target.value)}

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
                            onChange={(e) => setTripDate(e.target.value)}

                            class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                            type="date"
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
                            onChange={(e) => setPickupLocation(e.target.value)}

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
                            onChange={(e) => setPickupTime(e.target.value)}
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
                            onChange={(e) => setDropLocation(e.target.value)}
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
                            onChange={(e) => setShiftTime(e.target.value)}

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
                            onChange={(e) => setNoofPickups(e.target.value)}

                            class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                            type="number"
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
                        <select
                            value={TripType}
                            onChange={(e) => setTripType(e.target.value)}

                            class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        >
                            <option selected disabled>
                                Select
                            </option>
                            <option value="Drop">Drop</option>
                            <option value="Pickup">Pickup</option>
                        </select>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label
                            class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                            for="grid-last-name"
                        >
                            Vehicle Type
                        </label>
                        <select
                            value={VehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        >
                            <option selected disabled>
                                Select
                            </option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Tempo">Tempo</option>
                        </select>
                    </div>

                </div>
                <div class="flex flex-col md:flex-row md:-mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Comapany                       </label>
                        <select
                            value={Company}
                            onChange={(e) => setCompany(e.target.value)}
                            class="appearance-none block w-[229px] bg-white  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                            <option value="R1">
                                R1
                            </option>
                            <option value="L&T">L&T</option>
                            <option value="Lapiz">Lapiz</option>
                            <option value="Medico">Medico</option>

                        </select>

                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0  ">
                        <label class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        >
                            Trip Amount                   </label>
                        <input
                            placeholder="Trip Amount "
                            value={TripAmount}
                            onChange={(e) => setTripAmount(e.target.value)}

                            class="w-[229px] bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                            type="number"
                        />
                    </div>
                </div>
                <button onClick={UpdateDriver} className='bg-[#00adb5] rounded-lg py-3 px-2 text-white w-full hover:bg-[#00b5ad] active:bg-[#008080]' type='submit'>
                    Update Trip
                </button>

            </div>
        </div>
    );
}

export default EditIndividualTripData;
