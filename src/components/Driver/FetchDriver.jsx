import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import GooglePayQRCode from "./PaymentQR";

const FetchDriver = () => {
  const [DriverNo, setDriverNo] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [InsuranceExpDate, setInsuranceExpDate] = useState("");
  const [LicenseExpDate, setLicenseExpDate] = useState("");
  const [DriverImg, setDriverImg] = useState("");
  const [UPI, setUPI] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchDriverData() {
      try {
        const driverDoc = await getDoc(doc(db, "DriverList", id));
        if (driverDoc.exists()) {
          const driverData = driverDoc.data();
          setDriverNo(driverData.driverID);
          setDriverName(driverData.driverName);
          setVehicleName(driverData.vehicleName);
          setVehicleType(driverData.vehicleType);
          setVehicleNo(driverData.vehicleNo);
          setInsuranceExpDate(driverData.insExpDate);
          setLicenseExpDate(driverData.licExpDate);
          setUPI(driverData.upiId);
          setDriverImg(driverData.driveImg);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error getting document:", e);
      }
    }
    fetchDriverData();
  }, [id]);

  return (
    <>
      <Layout>
        <div className='"w-full max-w-lg"'>
          <div className=" drop-shadow-lg  bg-white h-[650px] rounded-md">
            <div className="container">
              <div className="flex flex-wrap w-full ">
                <div className="flex flex-wrap">
                <div className="m-8 p-2 bg-[#222831] cursor-pointer drop-shadow-lg rounded-xl hover:bg-[#30404d] active:bg-[#1e1e1e]">
      <IoMdArrowRoundBack
        onClick={() => navigate(-1)}
        className="text-white w-6 h-6"
      />
    </div>

                  <Link to={`/EditDriver/${DriverNo}`}>
                    <div className="m-8 p-2 bg-[#370df2] cursor-pointer drop-shadow-lg  rounded-xl">
                      <TbEdit className="text-white w-6 h-6 " />
                    </div>
                  </Link>
                  <div className="m-8 p-2 bg-[#203368] cursor-pointer drop-shadow-lg  rounded-xl">
                    <GooglePayQRCode upiId={UPI} name={DriverName} />
                  </div>
                </div>

                <div className="text-center content-center px-[150px] m-8 ">
                  <h1 className="font-bold text-[25px] text-black justify-center text-center">
                    Driver Details
                  </h1>
                </div>
              </div>
              <div className="  object-center overflow-hidden flex items-center justify-center">
                <img
                  className="w-[80px] h-24 rounded-lg"
                  src={DriverImg}
                  alt="Driver DP"
                />
              </div>
              <div className="container px-6 py-0 h-full">
                <form className="container p-12 g">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-first-name"
                      >
                        Driver ID
                      </label>
                      <input
                        value={DriverNo}
                        class="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-last-name"
                      >
                        Driver Name
                      </label>


                      <input
                        placeholder="Driver Name"
                        type="text"
                        value={DriverName}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />

                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-last-name"
                      >
                        Vehicle Number
                      </label>
                      <input
                        placeholder="Vehicle Number"
                        type="text"
                        value={VehicleNo}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-first-name"
                      >
                        Vehicle Name
                      </label>
                      <input
                        placeholder="Vehicle Name"
                        type="text"
                        value={VehicleName}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        Vehicle Type
                      </label>
                      <input
                        placeholder="Vehicle Type"
                        type="text"
                        value={VehicleType}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        License Expiry Date
                      </label>
                      <input
                        placeholder="License Expiry Date"
                        type="text"
                        value={LicenseExpDate}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        Insurance Expiry Date
                      </label>
                      <input
                        placeholder="Insurance Expiry Date"
                        type="text"
                        value={InsuranceExpDate}
                        className="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] rounded-lg focus:border-[#393E46] py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FetchDriver;
