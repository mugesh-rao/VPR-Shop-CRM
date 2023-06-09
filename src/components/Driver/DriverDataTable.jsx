import { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";

export default function DriverDataTable() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = rows.filter((row) => {
    const search = searchQuery.toLowerCase();
    const driverId = row.driverID.toLowerCase();
    const driverName = row.driverName.toLowerCase();
    const vehicleNo = row.vehicleNo.toLowerCase();
    const mobileNo = row.MobileNo;
    return (
      driverId.includes(search) ||
      driverName.includes(search) ||
      vehicleNo.includes(search) ||
      (mobileNo && mobileNo.includes(search))
    );
  });
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const LastItem = currentPage * itemsPerPage;
  const IndexItem = LastItem - itemsPerPage;
  const currentItems = filteredRows.slice(IndexItem, LastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rows.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getUsers = async () => {
    const data = await getDocs(collection(db, "DriverList"));
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {/* top card */}
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row justify-between border-2 bg-white py-3 px-4 border-1 rounded-xl mt-2 mx-0">
          <form className="mb-2 md:mb-0 w-full md:w-auto md:mr-4">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 text-sm rounded-lg block w-full pl-10 p-2 bg-[#F0F0F0] border-[#D6D6D6] placeholder-black focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </form>

          <div className="text-2xl font-bold py-1 text-[#393e46] ">
            Driver List
          </div>
          <div className="flex flex-row gap-2">
            <button className="appearance-none  w-full bg-white text-gray-700 border border-gray-600 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500 hidden sm:block">
              <FiFilter />
            </button>
          </div>
        </div>

        <div className=" m-2 mt-4 bg-white rounded-lg flex flex-col gap-6 shadow-lg overflow-x-scroll ">
          <table className="border-collapse ">
            <thead className="bg-[#222831]  justify-evenly items-center font-sans rounded-2xl table-row">
              <th className="p-4 rounded-l-xl text-center text-white">
                Driver ID
              </th>
              <th className="text-white text-left">Driver Name</th>
              <th className="text-white text-left">Vehicle Name</th>
              <th className="text-white text-center">Vehicle Number</th>
              <th className="text-white text-center">Vehicle Type</th>
              <th className="text-white text-center">Mobile Number</th>
              <th className="rounded-r-xl text-center text-white">
                Licence Exp Date
              </th>
            </thead>

            {currentItems.length > 0 && (
              <tbody className="table-row-group p-4 text-lg divide-x-0  uppercase rounded-md">
                {currentItems.map((row) => {
                  return (
                    <tr
                      className="  rounded-lg drop-shadow-2xl text-center justify-center  shadow-lg  table-row  align-middle  outline-none     "
                      tabIndex={-1}
                      key={row.code}
                    >
                      <td className=" py-3 text-[#393e46] text-center cursor-pointer font-medium text-sm font-sans hover:transform hover:scale-125 hover:font-base transition duration-300 ease-in-out">
                        <Link to={`/FetchDriver/${row.driverID}`}>
                          <span class="py-3  text-center text-sm font-sans text-[#323EDD]  cursor-pointer font-semibold">
                            {row.driverID}
                          </span>
                        </Link>
                      </td>
                      <td className="  text-[#393e46]  text-left  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">
                          {row.driverName}
                        </span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-left  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">
                          {row.vehicleName}
                        </span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">{row.vehicleNo}</span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">
                          {row.vehicleType}
                        </span>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <a
                          href={`https://wa.me/+91${row.mobileNo}?text=Hello,%20${encodeURIComponent( `${row.driverName}.` )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span class="text-[#393e46]">{row.mobileNo}</span>
                        </a>
                      </td>
                      <td className=" py-3 text-[#393e46]  text-center  font-medium text-sm font-sans">
                        <span className="text-[#393e46]">
                          {row.licExpDate}
                        </span>
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
    </>
  );
}
