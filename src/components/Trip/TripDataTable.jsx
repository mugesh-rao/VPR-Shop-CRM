import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { BsTaxiFront } from "react-icons/bs";
import { MdBrightnessHigh, MdOutlineContentCopy } from "react-icons/md";
import { db } from "../../config/FirebaseConfig";
import { Toaster, toast } from "react-hot-toast";
import "../../app.css"
import Swal from "sweetalert2";

export default function TripDataTable() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-4);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [Trip, setTrip] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [date, setdate] = useState(formattedDate);
  const [company, setcompany] = useState("R1");
  const [TripType, setTripType] = useState("Pickup");
  const location = useLocation();
  const [totalDocs, setTotalDocs] = useState(0);

  const getTrips = async () => {
    const data = await getDocs(collection(db, "Sales")
    );
    setTrip(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setTotalDocs(data.size);
  };
  useEffect(() => {
    getTrips();
  });



  const AddTotalTrips = async () => {
    const TodayData = {
      date: "",
      TodayTrip: totalDocs,
      Date: date,
      CancelledTrip: "",
      CompletedTrip: ""
    };
    const docRefs = doc(db, "HomeData", date);
    await setDoc(docRefs, TodayData);
    console.log();
    console.log("notfound");
  };



  const LastItem = currentPage * itemsPerPage;
  const IndexItem = LastItem - itemsPerPage;
  const currentItems = Trip.slice(IndexItem, LastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Trip.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCopy = async (id) => {
    const { value: newData } = await Swal.fire({
      title: 'Duplicate Trip',
      html: `
     
              <input id="newDate" class="swal2-input  w-4/5"  type="date" placeholder="Select a date">
              <select id="tripType" class="swal2-input w-4/5">
                        <option selected disabled value="Drop">Select</option>
          <option value="Pickup" class="text-black">Pickup</option>
          <option value="Drop" class="text-black">Drop</option>
        </select>
       
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#e53e3e',
      confirmButtonColor: '#00adb5',
      customClass: {
        confirmButton: 'bg-green-500 w-32 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        title: 'text-white font-boldmb-2 h-20 bg-[#14181d]',
      },

      preConfirm: () => {
        const newDateInput = document.getElementById('newDate');
        const tripTypeInput = document.getElementById('tripType');
        return {
          newDate: newDateInput.value,
          tripTypes: tripTypeInput.value
        };
      },
      inputValidator: (value) => {
        if (!value.newDate) {
          return 'New date value is required';
        }
      }
    });

    const { newDate, tripTypes } = newData;


    const docRef = doc(db, "RouteList", company, date, "All", TripType, id);
    const docData = await getDoc(docRef);
    const employeesRef = collection(docRef, "Employees");
    const employeesSnapshot = await getDocs(employeesRef);
    const employeesData = employeesSnapshot.docs.map((doc) => doc.data());

    const newDocRef = doc(db, "RouteList", company, newDate, "All", tripTypes, id);

    await setDoc(newDocRef, { ...docData.data(), TripDate: newDate, TripType: tripTypes });
    const newEmployeesRef = collection(newDocRef, "Employees");
    employeesData.forEach(async (employeeData) => {
      await addDoc(newEmployeesRef, employeeData);
    });

    try {
      await setDoc(newDocRef, docData.data());
      await setDoc(newDocRef, { ...docData.data(), TripDate: newDate, TripType: tripTypes });

      toast.success("Trip Duplicated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error duplicating document.");
    }
  };
  const tripStatus = async (id) => {


    Swal.fire({
      title: 'Completed Trip Details',
      html: `
      
        <input min="1" max="18" id="pickup" type="number"  class="swal2-input w-4/5  placeholder-gray-600" placeholder="No of Employees Picked">
        <input id="trip"type="text" class="  swal2-input placeholder-gray-600 w-4/5" placeholder="End Trip Time">
      `,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#e53e3e',
      confirmButtonColor: '#00adb5',
      customClass: {
        confirmButton: 'bg-green-500 w-32 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        title: 'text-white font-boldmb-2 h-20 bg-[#14181d]',
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
        const docRef = doc(db, "RouteList", company, date, "All", TripType, id);
        updateDoc(docRef, { TripStatus: "Completed" });
        updateDoc(docRef, { TotalEmployeesPicked: pickup, EndTripTime: trip })
          .then(() => {
            toast.success("Trip Completed");
          })
          .catch((error) => {
            toast.error(`Error storing data: ${error.message}`);
          });
      }
    });
  };

  return (
    <>
      <div className=" flex  gap-4 flex-col ">
        <Toaster />
        {location.pathname !== "/Home" && (
          <div class="shadow-lg flex flex-row  justify-between rounded-xl bg-white border-1 p-4 ">
            <div className="flex flex-row gap-4 ">
              <div class="relative  items-center">
                <input
                  class="block  w-full font-medium font-sans text-sm bg-white text-[#393e46]  border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] right-0  hover:border-gray-500 px-2 py-2  rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  placeholder="Enter Date"
                  value={date}
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  onChange={(e) => setdate(e.target.value)}
                />
              </div>
              <div class="relative w-full sm:w-auto items-center">
                <div>
                  <select
                    value={company}
                    placeholder="Company"
                    onChange={(e) => setcompany(e.target.value)}
                    class="block  w-full font-medium font-sans text-sm text-[#393e46] bg-white   border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] right-0  hover:border-gray-500 px-6 py-2  rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled selected>
                      Select Company
                    </option>
                    <option value="R1">R1</option>
                    <option value="L&T">L&T</option>
                    <option value="Lapiz">Lapiz</option>
                    <option value="Medico">Medico</option>

                  </select>
                </div>
                <div class="pointer-events-none absolute inset-y-0 left-0  flex items-center px-2 text-gray-700">
                  <HiBuildingOffice2 className="text-lg" />
                </div>
              </div>
              <div class="relative w-full sm:w-auto items-center">
                <div class="pointer-events-none absolute inset-y-0 left-0  flex items-center px-2 text-gray-700">
                  <BsTaxiFront className="text-lg" />
                </div>
                <select
                  value={TripType}
                  onChange={(e) => setTripType(e.target.value)}
                  class="block  w-full font-medium font-sans text-sm bg-white text-[#393e46]  border-2 border-[#D6D6D6] focus:bg-white focus:border-[#393E46] right-0  hover:border-gray-500 px-6 py-2 pl-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>
                    Trip Type
                  </option>
                  <option value="Pickup">Pickup</option>
                  <option value="Drop">Drop</option>
                </select>
              </div>
            </div>

            <button onClick={AddTotalTrips} class="block bg-[#222831] w-full sm:w-auto border-2 px-4 py-2 rounded-lg shadow leading-tight hover:bg-[#393E46] active:bg-[#00adb5]">              <span className="text-white  font-semibold font-sans text-sm">
              {" "}
              <span className="font-bold font-sans text-xl">
                {totalDocs}
              </span>{" "}
              Trips{" "}
            </span>
            </button>
          </div>
        )}
        <div className="w-full m-2 rounded-lg flex flex-col gap-6 ">
  <div className="overflow-x-auto">
    <table className="border-collapse min-w-full">
            <thead className="bg-[#222831] w-full text-white font-sans rounded-2xl table-row align-middle outline-none ">
              <th className=" p-4  rounded-l-xl font-sans text-sm font-semibold  uppercase ">
                date
              </th>
              <th className=" p-4 font-sans uppercase  text-sm font-semibold">
                Sales id
              </th>
              <th className=" p-4 font-sans uppercase  text-sm font-semibold">
                Sales Deatils
              </th>
              <th className=" p-4 font-sans uppercase  text-sm font-semibold">
                Category
              </th>
              <th className=" p-4 font-sans uppercase  text-sm font-semibold">
                Mode
              </th>
              <th className=" p-4 font-sans uppercase  text-sm font-semibold">
                Amount
              </th>
              <th className="p-4 font-sans rounded-r-xl uppercase text-sm font-semibold">
                Action
              </th>
            </thead>
            {Trip.length > 0 && (
              <tbody className="table-row-group">
                {currentItems.map((row) => {
                  return (
                    <tr
                    className="p-4 bg-[#Ffffff] shadow-lg border drop-shadow-lg rounded-lg divide-x-0 my-2"
                    tabIndex={-1}
                    key={row.code}
                  >
                      <td className=" p-3 text-[#393e46] text-center cursor-pointer font-medium text-sm font-sans ">
                        <span className="text-[#393e46] ">
                          {row.TripDate}
                        </span>
                      </td>
                      <td className=" p-3 text-[#393e46] text-center   text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out">
                        <Link
                          to={`/FetchTrip/${row.RouteID}`}
                        >
                          <span className={`text-${row.Duplicated ? 'red-600' : 'blue-600'} cursor-pointer font-semibold`}>
                            {row.RouteID}
                          </span>


                        </Link>
                      </td>
                      <td className=" p-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.RouteName}</span>
                      </td>
                      <td className=" p-3  text-[#393e46] text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.ShiftTime}</span>
                      </td>
                    
                      <td className=" p-3 text-[#393e46] text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.TripType}</span>
                      </td>
                      <td className=" p-3  text-[#393e46] text-center  font-medium text-sm font-sans pl-6">
                        <span className=" flex flex-row gap-1 relative cursor-pointer">

                          <div
                            className={
                              row.TripStatus === "Alloted"
                                ? "text-[#ff8103] text-base font-sans  "
                                : row.TripStatus === "Not Alloted"
                                  ? "text-[#31007a] text-base font-sans  "
                                  : row.TripStatus === "Ongoing"
                                    ? "text-[#e8d100] text-base font-sans  "
                                    : "text-[#2daa00] text-base font-sans  "
                            }
                          > {row.TripStatus}</div>
                        </span>
                      </td>

                      <td className=" p-3 flex flex-row gap-2 text-[#393e46] text-center  font-medium text-sm font-sans  pl-7">
                      <MdBrightnessHigh onClick={() => tripStatus(row.id)} className="cursor-pointer text-xl hover:text-red-600" />

                        <MdOutlineContentCopy
                          className="cursor-pointer text-xl hover:text-red-600"
                          onClick={() => handleCopy(row.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <div className="flex justify-center items-center py-4 space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`${currentPage === number
                  ? "bg-[#222831] text-white"
                  : "bg-white text-gray-500"
                  } font-semibold py-0.3 px-2 rounded-full focus:outline-none focus:ring-2 `}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
