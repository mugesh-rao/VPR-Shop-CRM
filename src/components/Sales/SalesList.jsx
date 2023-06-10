import { useState } from "react";
import { db } from "../../config/FirebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import { Toaster } from "react-hot-toast";

export default function TripList({ rows }) {
  const [RouteId, setRouteId] = useState("");
  const [TripDate, setTripDate] = useState("");
  const [RouteName, setRouteName] = useState("");
  const [ShiftTime, setShiftTime] = useState("");
  const [TripType, setTripType] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [FromLocation, setFromLocation] = useState("");
  const [ToLocation, setToLocation] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [NoOfPickup, setNoOfPickup] = useState("");
  const [CompanyId, setCompanyId] = useState("");
  const [TripAmount, setTripAmount] = useState("");
  const [NoOfEmployeePicked, setNoOfEmployeePicked] = useState("");
  const [TripEndTime, setTripEndTime] = useState("");
  const [SelectedId, setSelectedId] = useState("");
  const [SelectedEmployees, setSelectedEmployees] = useState([]);
  const [TripCompleted, setTripCompleted] = useState(false);



  const handleClick = async (id) => {

    try {
      const tripDocRef = doc(db, "corporateTrips", id);
      const tripSnapshot = await getDoc(tripDocRef);

      if (tripSnapshot.exists()) {
        const tripData = tripSnapshot.data();
        const selectedEmployeesSnapshot = await getDocs(
          collection(db, "corporateTrips", id, "selectedEmployees")
        );
        const selectedEmployeesData = selectedEmployeesSnapshot.docs.map(
          (doc) => doc.data()
        );

        const tripWithSelectedEmployees = {
          id: tripSnapshot.id,
          ...tripData,
          selectedEmployees: selectedEmployeesData,
        };

        setRouteId(tripWithSelectedEmployees.routeId);
        setRouteName(tripWithSelectedEmployees.routeName);
        setTripType(tripWithSelectedEmployees.tripType);
        setTripDate(tripWithSelectedEmployees.tripDate);
        setShiftTime(tripWithSelectedEmployees.shiftTime);
        setVehicleType(tripWithSelectedEmployees.vehicleType);
        setFromLocation(tripWithSelectedEmployees.fromLocation);
        setToLocation(tripWithSelectedEmployees.toLocation);
        setPickupTime(tripWithSelectedEmployees.pickupTime);
        setNoOfPickup(tripWithSelectedEmployees.noOfPickup);
        setCompanyId(tripWithSelectedEmployees.companyId);
        setTripAmount(tripWithSelectedEmployees.tripAmount);
        setSelectedEmployees(tripWithSelectedEmployees.selectedEmployees);
      } else {
        console.log("Trip not found");
      }
    } catch (error) {
      console.error("Error getting trip:", error);
    }
  };

  const handleClickStatus = async (id) => {
    setSelectedId(id);

    try {
      const tripDocRef = doc(db, "corporateTrips", id);
      const tripSnapshot = await getDoc(tripDocRef);

      if (tripSnapshot.exists()) {
        const tripData = tripSnapshot.data();
        const selectedEmployeesSnapshot = await getDocs(
          collection(db, "corporateTrips", id, "selectedEmployees")
        );
        const selectedEmployeesData = selectedEmployeesSnapshot.docs.map(
          (doc) => doc.data()
        );

        const tripWithSelectedEmployees = {
          id: tripSnapshot.id,
          ...tripData,
          selectedEmployees: selectedEmployeesData,
        };

        setNoOfEmployeePicked(tripWithSelectedEmployees.noOfEmployeePicked);
        setTripEndTime(tripWithSelectedEmployees.tripEndTime);
        setRouteId(tripWithSelectedEmployees.routeId);
        setRouteName(tripWithSelectedEmployees.routeName);
        setTripType(tripWithSelectedEmployees.tripType);
        setTripCompleted(
          tripWithSelectedEmployees.tripStatus === "Completed" ? true : false
        );
      } else {
        console.log("Trip not found");
      }
    } catch (error) {
      console.error("Error getting trip:", error);
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-6 m-2 mt-4 bg-white rounded-lg shadow-lg ">
          <table className="border-collapse">
            <thead className="bg-[#222831] justify-evenly items-center font-sans rounded-2xl table-row">
              <th className="text-center p-4  text-white rounded-l-xl">
                Route ID
              </th>
              <th className="text-center text-white ">Date</th>
              <th className="text-center text-white">Route Name</th>
              <th className="text-center text-white">Shift Time</th>
              <th className="text-center text-white">Trip Type</th>
              <th className="text-center text-white">Vehicle Type</th>
              <th className="text-center text-white ">No. of Emp</th>
              <th className="text-center text-white ">Status</th>
              <th className="text-center text-white rounded-r-xl">Copy</th>
            </thead>
            {rows && rows.length > 0 ? (
              <tbody className="table-row-group p-4 text-lg uppercase divide-x-0 rounded-md">
                {rows.map((row) => {
                  return (
                    <tr
                      className="justify-center table-row text-center align-middle rounded-lg shadow-lg outline-none drop-shadow-2xl"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <td>
                        <Link to={`/view-trip/${row.id}`}>
                          <div className="  text-[#393e46] text-center m-2 cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out">
                            <span class="  text-center text-sm font-sans text-[#323EDD]  cursor-pointer font-semibold  ">
                              {row.routeId}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3  text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.tripDate}</span>
                      </td>
                      <td className="  text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.routeName}</span>
                      </td>
                      <td className="  text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.shiftTime}</span>
                      </td>
                      <td className="  text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.tripType}</span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">
                          {row.vehicleType}
                        </span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.noOfPickup}</span>
                      </td>
                      <td className=" p-3  text-[#393e46] text-center  font-medium text-sm font-sans pl-6">
                        <span className=" flex flex-row gap-1 relative cursor-pointer">
                          {/* <MdBrightnessHigh
                            onClick={() => tripStatus(row.id)}
                            className="cursor-pointer text-xl hover:text-red-600"
                          /> */}

                          <div
                            className={
                              row.tripStatus === "Alloted"
                                ? "text-[#ff8103] text-base font-sans  "
                                : row.tripStatus === "Not Alloted"
                                ? "text-[#31007a] text-base font-sans  "
                                : row.tripStatus === "Ongoing"
                                ? "text-[#e8d100] text-base font-sans  "
                                : "text-[#2daa00] text-base font-sans  "
                            }
                            onClick={() => handleClickStatus(row.id)}
                          >
                            {" "}
                            {row.tripStatus}
                          </div>
                        </span>
                      </td>

                      <td className="py-3 text-[#393e46] text-center font-medium text-sm font-sans">
                        <div
                          className="text-[#393e46] text-center m-2 cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out"
                          onClick={() => handleClick(row.id)}
                        >
                          <MdOutlineContentCopy className="cursor-pointer text-xl hover:text-red-600" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="table-row-group p-4 text-lg uppercase divide-x-0 rounded-md">
                <tr
                  className="justify-center table-row text-center align-middle rounded-lg shadow-lg outline-none drop-shadow-2xl"
                  tabIndex={-1}
                >
                  <td
                    colSpan="9"
                    className="text-[#393e46] text-center font-medium text-sm font-sans"
                  >
                    No record found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      
     
    </>
  );
}
