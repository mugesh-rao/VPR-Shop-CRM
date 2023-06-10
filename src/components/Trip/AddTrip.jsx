import React, { useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import AddEmployeeTable from "./AddEmployeeTable";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ProgressBar } from 'react-loader-spinner';

const AddTrip = () => {
  const [RouteName, setRouteName] = useState("");
  const [RouteID, setRouteID] = useState("");
  const [TripType, setTripType] = useState("Pickup");
  const [TripDate, setTripDate] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [ShiftTime, setShiftTime] = useState("");
  const [VehicleType, setVehicleType] = useState("Sedan");
  const [NoofPickups, setNoofPickups] = useState("");
  const [DropLocation, setDropLocation] = useState("");
  const [PickupLocation, setPickupLocation] = useState("");
  const [Company, setCompany] = useState("R1");
  const [TripAmount, setTripAmount] = useState("");

  const [EmpName, setEmpName] = useState("");
  const [EmpID, setEmpID] = useState("");
  const [EmpMobile, setEmpMobile] = useState("");
  const [EmpList, setEmpList] = useState([]);
  const [EmpPickupLocation, setEmpPickupLocation] = useState([]);
  const [EmpDropLocation, setEmpDropLocation] = useState([]);

  const [EmpPickupTime, setEmpPickupTime] = useState([]);
  const [EmpGender, setEmpGender] = useState("Female");

  const [tripDateError, setTripDateError] = useState("");
  const [RouteIDError, setRouteIDError] = useState("");
  const [DriverNameError, setDriverNameError] = useState("");


  const navigate = useNavigate();

  const AddEmployee = async (e) => {
    e.preventDefault();

    const employeeData = {
      EmpName,
      EmpID,
      EmpMobile,
      EmpPickupLocation,
      EmpDropLocation,
      EmpPickupTime,
      EmpGender,
      EmpImg: "",
      dropCompleted: "false",
      pickupCompleted: "false",
      historyCompletedCount: 0,
      historyCancelledCount: 0,
      token: "",


    };
    setEmpList([
      ...EmpList,
      {
        EmpName,
        EmpID,
        EmpMobile,
        EmpPickupLocation,
        EmpDropLocation,
        EmpPickupTime,
        EmpGender,
        EmpImg: "",

      },
    ]);
    setEmpName("");
    setEmpID("");
    setEmpMobile("");
    setEmpPickupLocation("");
    setEmpDropLocation("");
    setEmpPickupTime("");
    setEmpGender("");
    // Add employee data to Firestore document
    const docRef = doc(db, "RouteList", Company, TripDate, "All", TripType, RouteID, "Employees", EmpID);
    await setDoc(docRef, employeeData);

    const docRefs = doc(db, "EmployeeList", EmpID);
    await setDoc(docRefs, employeeData);

    const docRefse = doc(db, "EmployeeList", EmpID, "TodayTrip", "ZFlag");
    await setDoc(docRefse, { Test: "0" });

    const docRefsef = doc(db, "EmployeeList", EmpID, "TodayTrip", TripType);
    await setDoc(docRefsef, {
      dropLocation: DropLocation,
      tripDate: TripDate,
      pickupTime: PickupTime,
      company: Company,
      routeID: RouteID,
      DriverImg: "",
      driverID: "",
      driverName: "",
      vehicleType: "",
      vehicleNo: "",
      driverNo: "",
      pickupLocation: PickupLocation,
      picked: "false",
      dropped: "false",
      offDuty: "false",
      elseWhere: "false",
      reached: "false",
      tripType: TripType,
      latitude: "",
      longitude: "",
token:"",
    });


  };

  const [isLoading, setIsLoading] = useState(false);

  const CreateTrip = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    if (!TripDate) {
      setTripDateError("Please select a trip date.");
    } else if (RouteID.length > 10) {
      setRouteIDError("Route ID should not exceed 10 characters.");
    } else {
      // do something else
    }

    if (!RouteID) {
      setDriverNameError("Driver name is required");
      return;
    } else {
      setDriverNameError("");
    }
    try {
      await setDoc(doc(db, "Sales",RouteID),
        {
          RouteName,
          RouteID,
          TripType,
          TripDate,
          ShiftTime,
          VehicleType,
          NoofPickups,
          DropLocation,
          PickupLocation,
          TripStatus: "Not Alloted",
          Duplicated: false,
          PickupTime,
          TripAmount,
          Company,
        }
      );
      toast.success('New Trip Added', {
        style: {
          background: 'rgb(34, 40, 49)',
          color: '#fff',
          padding: '12px',
          borderRadius: '0.5rem',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#38a169',
        },
        icon: '🚗',
        duration: 2000,
        position: 'top-center',
      });
      navigate(-1)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };



  return (
    <>
      <Layout>
        <Toaster />
        <div className="w-full p-3 md:w-full border-2 shadow-2xl bg-white  mx-auto mt-8 rounded  my-8 md:p-8">

          <div className="flex flex-wrap justify-start">
            <div className="m-8 p-2 bg-[#222831] cursor-pointer drop-shadow-lg  rounded-lg">
              <IoMdArrowRoundBack
                onClick={() => navigate(-1)}
                className="text-white w-6 h-6 "
              />
            </div>
          </div>
          <div className="text-center flex justify-center ">
            <h1 className="font-bold text-[25px] text-gray-700 justify-center text-center">
              Create Trip
            </h1>
          </div>
          <form className="container px-12 g">
            <div class="flex flex-wrap -mx-3 mb-5">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-[#393E46]  mb-1"
                  for="RouteID"
                >
                  Route ID
                </label>
                <div class="relative">
                  <input
                    placeholder="Enter Route ID "
                    id="RouteID"
                    onChange={(e) => setRouteID(e.target.value)}
                    className={`appearance-none block w-full font-sans font-medium text-base text-[#393E46] bg-white border-2 ${RouteIDError ? 'border-red-500' : 'border-[#D6D6D6]'
                      } focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none`}
                  />
                  {RouteID.length > 5 && (
                    <p className="text-red-400 text-sm">
                      Route ID should not exceed 10 characters.
                    </p>
                  )}
                  {RouteIDError && (
                    <p className=" text-red-500 text-sm mt-1">
                      Enter the Route ID
                    </p>
                  )}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-last-name"
                >
                  Company
                </label>
                <select
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="on"
                  class="appearance-none block w-full bg-white font-sans font-medium text-[#393E46] border-2  border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                >
                  <option selected value="R1">
                    R1
                  </option>
                  <option value="L&T">L&T</option>
                  <option value="Lapiz">Lapiz</option>
                  <option value="Medico">Medico</option>

                </select>
                {Company === "" && (
                  <p class="text-red-500 text-sm mt-1">
                    Please select a company
                  </p>
                )}
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans font-semibold text-gray-700 mb-1"
                  for="grid-zip"
                >
                  Trip Amount
                </label>
                <input
                  onChange={(e) => setTripAmount(e.target.value)}
                  id="start"
                  placeholder="Enter Trip Amount"
                  class="appearance-none block w-full bg-white font-sans font-medium text-[#393E46] border-2 rounded-lg border-[#D6D6D6] focus:bg-white focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none"
                  type="number"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-5">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block  capitalize tracking-wide font-semibold text-gray-700 mb-1"
                  for="grid-state"
                >
                  Route Name
                </label>
                <div class="relative">
                  <input
                    placeholder="Enter Route Name"
                    autoComplete="on"
                    onChange={(e) => setRouteName(e.target.value)}
                    class="block appearance-none w-full bg-white text-[#393E46] font-medium font-sans border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 pr-8  leading-tight focus:outline-none"
                    id="grid-state"
                  />
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans capitalize font-semibold text-gray-700  mb-1"
                  for="grid-last-name"
                >
                  trip Date
                </label>
                <input
                  placeholder="Enter Trip Date"
                  min="2023-01-01"
                  max="2026-01-01"
                  onChange={(e) => setTripDate(e.target.value)}
                  class="appearance-none block w-full bg-white text-[#393E46] font-medium font-sans border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  name="project"
                  type="date"
                />
                {tripDateError && (
                  <p className=" text-red-500 text-sm mt-1">Enter The date</p>
                )}
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  Shift Time
                </label>
                <input
                  placeholder="Enter Shift Time "
                  onChange={(e) => setShiftTime(e.target.value)}
                  id="start"
                  class="appearance-none block w-full bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-5">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans font-semibold text-gray-700  mb-1"
                  for="grid-state"
                >
                  Pickup Location
                </label>
                <div class="relative">
                  <input
                    placeholder="Enter Pickup Location"
                    autoComplete="on"
                    onChange={(e) => setPickupLocation(e.target.value)}
                    class="block appearance-none w-full bg-white border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg text-[#393E46] font-sans font-medium py-3 px-4 pr-8 leading-tight focus:outline-none"
                    id="grid-state"
                  />
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans font-semibold text-gray-700  mb-1"
                  for="grid-last-name"
                >
                  Drop Location
                </label>
                <input
                  placeholder="Enter Drop Location"
                  autoComplete="on"
                  onChange={(e) => setDropLocation(e.target.value)}
                  class="appearance-none block w-full bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  name="project"
                  type="text"
                />
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  Pickup time
                </label>
                <input
                  placeholder="Enter Pickup time"
                  autoComplete="on"
                  onChange={(e) => setPickupTime(e.target.value)}
                  id="start"
                  class="appearance-none block w-full bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-5">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-state"
                >
                  Trip Type
                </label>
                <div class="relative">
                  <select
                    onChange={(e) => setTripType(e.target.value)}
                    class="block appearance-none w-full bg-white border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg text-[#393E46] font-sans font-medium py-3 px-4 pr-8 leading-tight focus:outline-none"
                    id="grid-state"
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="Drop">Drop</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center ">
                    <RiArrowDropDownLine className="text-2xl" />
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="text-base font-sans  font-semibold text-gray-700  mb-1">
                  Vehicle Type
                </label>
                <div class="relative">
                  <select
                    onChange={(e) => setVehicleType(e.target.value)}
                    class="block appearance-none w-full bg-white  border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg text-[#393E46] font-sans font-medium py-3 px-4 pr-8 leading-tight focus:outline-none"
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Tempo">Tempo</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center ">
                    <RiArrowDropDownLine className="text-2xl" />
                  </div>
                </div>
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  No Of Pickups
                </label>
                <input
                  placeholder="Enter No of Pickups"
                  onChange={(e) => setNoofPickups(e.target.value)}
                  id="start"
                  class="appearance-none block w-full bg-white text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="number"
                />
              </div>
            </div>
            <h3 className="my-4 font-bold text-center underline  capitalize  text-xl font-sans  m-4 ">
              Employee List
            </h3>

            <div class="w-full flex flex-col md:flex-row justify-between gap-2">
              <div class="w-full md:w-1/3 mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-state"
                >
                  Employee Name
                </label>
                <div class="relative">
                  <input
                    placeholder=" Employee Name"
                    type="text"
                    value={EmpName}
                    onChange={(e) => setEmpName(e.target.value)}
                    class="block appearance-none w-full bg-white  border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg text-[#393E46] font-sans font-medium py-3 px-4 pr-8 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-last-name"
                >
                  Employee ID
                </label>
                <input
                  placeholder=" Employee ID "
                  value={EmpID}
                  onChange={(e) => setEmpID(e.target.value)}
                  class="appearance-none block w-full bg-white text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  name="project"
                  type="text"
                />
              </div>

              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  Mobile Number
                </label>
                <input
                  placeholder="Mobile Number"
                  value={EmpMobile}
                  onChange={(e) => setEmpMobile(e.target.value)}
                  class="appearance-none block w-full bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="number"
                />
              </div>

              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-state"
                >
                  Gender
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-white  border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg text-[#393E46] font-sans font-medium py-3 px-4 pr-8 leading-tight focus:outline-none"
                    value={EmpGender}
                    onChange={(e) => setEmpGender(e.target.value)}
                  >
                    <option value="Select">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center ">
                    <RiArrowDropDownLine className="text-2xl" />
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-last-name"
                >
                  Pickup Location
                </label>
                <input
                  placeholder="Pickup Location"
                  type="text"
                  value={EmpPickupLocation}
                  onChange={(e) => setEmpPickupLocation(e.target.value)}
                  class="appearance-none block w-full bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                />
              </div>

              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  Pickup time
                </label>
                <input
                  placeholder="Pickup time "
                  value={EmpPickupTime}
                  onChange={(e) => setEmpPickupTime(e.target.value)}
                  class="appearance-none block w-full  bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="text"

                />
              </div>
              <div class="w-full md:w-1/3  mb-6 md:mb-0">
                <label
                  class="text-base font-sans  font-semibold text-gray-700  mb-1"
                  for="grid-zip"
                >
                  Drop Location
                </label>
                <input
                  placeholder="Drop Location "
                  value={EmpDropLocation}
                  onChange={(e) => setEmpDropLocation(e.target.value)}
                  class="appearance-none block w-full  bg-white  text-[#393E46] font-sans font-medium border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <button
              class="bg-[#222831] hover:bg-[#393e46] active:bg-[#1b222d] mt-3 text-gray-100 w-[150px] px-3 py-2 rounded my-2 focus:outline-none hover:shadow-md"
              onClick={AddEmployee}
            >
              Add Employee
            </button>
            {EmpList[0] && <AddEmployeeTable EmpList={EmpList} />}
          </form>
          <button
            className={`bg-[#00adb5] hover:bg-[#059299] active:bg-[#047481] text-gray-100 text-xl font-bold w-full p-5 rounded-lg my-6 relative ${isLoading ? 'cursor-not-allowed' : ''
              }`}
            type="submit"
            onClick={CreateTrip}
          >
            <div className="flex justify-center items-center h-full">
              {isLoading && <ProgressBar
                height="27"
                width="150"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#222831'
                barColor='#ffffff'
              />}
            </div>
            {isLoading ? null : <span>ADD TRIP</span>}
          </button>
        </div>
      </Layout>
    </>
  );
};

export default AddTrip;
