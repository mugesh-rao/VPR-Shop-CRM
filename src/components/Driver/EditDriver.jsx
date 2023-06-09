import React, { useState, useEffect } from "react";
import { getDoc, doc,  deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Layout from "../../Layout/Layout";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";

const EditDriver = () => {
  const [DriverNo, setDriverNo] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [InsuranceExpDate, setInsuranceExpDate] = useState("");
  const [LicenseExpDate, setLicenseExpDate] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [UpiId, setUpiId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [progresspercent, setProgresspercent] = useState(0);
  const [AadharNum, setAadharNum] = useState("");
  const [AlternateNumber, setAlternateNumber] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [TempAddress, setTempAddress] = useState("");
  const [PermitExpDate, setPermitExpDate] = useState("");
  const [TaxExpDate, setTaxExpDate] = useState("");
  const [FCExpDate, setFCExpDate] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [imgUrl, setImgUrl] = useState("");



  const Dpsubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `driver/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

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
          setImgUrl(driverData.driverImg);
          setMobileNo(driverData.mobileNo);
          setUpiId(driverData.upiId);
          setAadharNum(driverData.aadharNum);
          setAlternateNumber(driverData.alternateNumber);
          setBloodGroup(driverData.bloodGroup);
          setFCExpDate(driverData.fCExpDate);
          setLicenseNumber(driverData.licenseNumber);
          setPermanentAddress(driverData.permanentAddress);
          setPermitExpDate(driverData.permitExpDate);
          setTaxExpDate(driverData.taxExpDate);
          setTempAddress(driverData.tempAddress);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error getting document:", e);
      }
    }
    fetchDriverData();
  }, [id]);


  const EditDriver = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "DriverList", id), {
        driverId: DriverNo,
        driverName: DriverName,
        vehicleName: VehicleName,
        vehicleType: VehicleType,
        vehicleNo: VehicleNo,
        insExpDate: InsuranceExpDate,
        licExpDate: LicenseExpDate,
        mobileNo: MobileNo,
        UpiId: UpiId,
        DriverImg: imgUrl,
        aadharNum: AadharNum,
        alternateNumber: AlternateNumber,
        licenseNumber: LicenseNumber,
        permanentAddress: PermanentAddress,
        tempAddress: TempAddress,
        permitExpDate: PermitExpDate,
        taxExpDate: TaxExpDate,
        fCExpDate: FCExpDate,
        bloodGroup: BloodGroup,
      });
      toast.success("Data updated successfully", e);
    } catch (e) {
      toast.error("error", "Failed to update driver data, try again!");
    }
  };


  async function onDelete() {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#222831",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Driver!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "DriverList", id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setTimeout(() => {
            navigate("/Driver"); 
          }, 3000); 
        
        } catch (e) {
          console.error("Error deleting document:", e);
          toast.error("Failed to delete document!");
        }
      }
    });
  }


  return (
    <>
      <Layout>
        <Toaster />
        <div className='"w-full max-w-lg"'>
          <div className=" drop-shadow-lg  bg-white  rounded-md">
            <div className="container">
              <div className="flex flex-wrap w-full  ">
                <div className="flex flex-wrap">
                  <div className="m-8 p-2 bg-[#222831] cursor-pointer drop-shadow-lg rounded-xl hover:bg-[#30404d] active:bg-[#1e1e1e]">
                    <IoMdArrowRoundBack
                      onClick={() => navigate(-1)}
                      className="text-white w-6 h-6"
                    />
                  </div>
                  <div className="m-8 p-2 bg-[#f20d1c] cursor-pointer drop-shadow-lg  rounded-xl">
                    <RiDeleteBin6Line
                      onClick={() => onDelete(id)}
                      className="text-white w-6 h-6 "
                    />
                  </div>
                </div>

                <div className="text-center content-center  m-8 ">
                  <h1 className="font-bold text-[25px] text-black justify-center text-center">
                    Edit Driver
                  </h1>
                </div>
              </div>
              <div className="  object-center flex items-center justify-center">
                <div className="w-[90px] rounded-md h-[100px] pt-2 pl-2 pb-2 pr-2 border-2 border-dashed border-[#00abb3] drop-shadow-lg bg-white float-right">
                  <div className="items-center m-3">
                    <form onSubmit={Dpsubmit} className="form">
                      <label for="upload" className="cursor-pointer">
                        <AiOutlineCloudUpload className="text-[#00abb3] h-12 w-12 " />
                      </label>
                      <input type="file" className="hidden" id="upload" />
                      <button type="submit" for="upload">
                        Upload
                      </button>

                    </form>
                  </div>
                  {!imgUrl && (
                    <div className="bg-[#393e46] rounded-md overflow-hidden">
                      <div
                        className="bg-[#00adb5] h-2"
                        style={{ width: `${progresspercent}%` }}
                      >
                       
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="container px-6  ">
                <form onSubmit={EditDriver} className="container p-12 h-auto">
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        Driver ID
                      </label>
                      <div class="relative">
                        <input
                          value={DriverNo}
                          placeholder="Driver ID"
                          class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Driver Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Driver Name"
                        onChange={(e) => setDriverName(e.target.value)}
                        value={DriverName}
                        classname="uppercase"
                        class="appearance-nonefont-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        Mobile Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Mobile Number"
                        value={MobileNo}
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => setMobileNo(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] mblock w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                        type="tel"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        Vehicle No <span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Vehicle No"
                        classname="uppercase"
                        value={VehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Vehicle Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Vehicle Name "
                        classname="uppercase"
                        value={VehicleName}
                        onChange={(e) => setVehicleName(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        Vehicle Type
                      </label>
                      <select
                        placeholder="Enter vehicle Type"
                        onChange={(e) => setVehicleType(e.target.value)}
                        value={VehicleType}
                        class="block appearance-none font-snas font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] w-full bg-white   py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                      >
                        <option selected value="Sedan">
                          Sedan
                        </option>
                        <option value="SUV">SUV</option>
                        <option value="Tempo">Tempo</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        UPI ID
                      </label>
                      <input
                        placeholder="Enter UPI ID"
                        value={UpiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-city"
                      >
                        Aadhar Number
                      </label>
                      <input
                        placeholder="Enter Aadhar Number"
                        onChange={(e) => setAadharNum(e.target.value)}
                        value={AadharNum}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        name="amount"
                        type="number"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        License Number
                      </label>
                      <input
                        placeholder="Enter License Number"
                        value={LicenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-state"
                      >
                        Permanent Address
                      </label>
                      <textarea
                        placeholder="Enter Permanent Address"
                        value={PermanentAddress}
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        class="block appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46]  b w-full bg-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                        cols="1"
                        rows="1"
                      ></textarea>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Temporary Address
                      </label>
                      <textarea
                        placeholder="Enter Temporary Address"
                        value={TempAddress}
                        onChange={(e) => setTempAddress(e.target.value)}
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white  py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                        cols="1"
                        rows="1"
                      ></textarea>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 focus:border-[#393E46] tracking-wide "
                        for="grid-zip"
                      >
                        License  Exp
                      </label>
                      <input
                        placeholder="Enter License Batch Exp"
                        value={LicenseExpDate}
                        onChange={(e) => setLicenseExpDate(e.target.value)}
                        id="start"
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white
                         rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-state"
                      >
                        Permit Exp date
                      </label>
                      <input
                        placeholder="Enter Permit Exp date"
                        value={PermitExpDate}
                        onChange={(e) => setPermitExpDate(e.target.value)}
                        type="date"
                        name=""
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Tax Exp Date
                      </label>
                      <input
                        placeholder="Enter Tax Exp Date "
                        value={TaxExpDate}
                        onChange={(e) => setTaxExpDate(e.target.value)}
                        class="appearance-none block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] w-full bg-white
                         rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        FC Exp date
                      </label>
                      <input
                        placeholder="Enter FC Exp Date "
                        value={FCExpDate}
                        onChange={(e) => setFCExpDate(e.target.value)}
                        id="start"
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        Alternate Mobile Number
                      </label>
                      <input
                        placeholder="Enter Alternate Mobile Number"
                        value={AlternateNumber}
                        onChange={(e) => setAlternateNumber(e.target.value)}
                        type="number"
                        class="block appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] w-full bg-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Blood Group
                      </label>
                      <input
                        placeholder="Enter Blood Group"
                        value={BloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        name="amount"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        Insurance Exp Date
                      </label>
                      <input
                        placeholder="Enter Insurance Exp Date "
                        id="start"
                        value={InsuranceExpDate}
                        onChange={(e) => setInsuranceExpDate(e.target.value)}
                        class="appearance-none font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] block w-full bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="w-full py-4  ">
                    <button
                      onClick={EditDriver}
                      className="bg-[#00adb5] hover:bg-[#059299] active:bg-[#047481] text-gray-100 text-xl font-bold w-full p-5 rounded-lg my-6"
                      type="submit"
                    >
                      Update 
                    </button>
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

export default EditDriver;
