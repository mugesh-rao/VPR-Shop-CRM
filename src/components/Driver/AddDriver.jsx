import React, { useEffect, useState } from "react";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Layout from "../../Layout/Layout";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const AddDriver = () => {
  const [DriverNo, setDriverNo] = useState("CCD0000");
  const [DriverName, setDriverName] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleType, setVehicleType] = useState("Sedan");
  const [VehicleNo, setVehicleNo] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [UpiId, setUpiId] = useState("");
  const [InsuranceExpDate, setInsuranceExpDate] = useState("");
  const [LicenseExpDate, setLicenseExpDate] = useState("");
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
  const [progresspercent, setProgresspercent] = useState(0);
  const navigate = useNavigate();

  const [vehicleNoError, setVehicleNoError] = useState("");


  const Dpsubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `driver/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );

  }

  async function generateDriverId() {
    const DriverDocID = await getDocs(collection(db, "DriverList"));
    let intial = 1;
    if (DriverDocID.size > 0) {
      const LastID = DriverDocID.docs[DriverDocID.size - 1].id;
      intial = parseInt(LastID.substring(3)) + 1;
    }
    const NextDriverID = `CCD${intial.toString().padStart(4, "0")}`;
    return NextDriverID;
  }

  useEffect(() => {
    async function setInitialDriverNo() {
      const NextDriverID = await generateDriverId();
      setDriverNo(NextDriverID);
    }
    setInitialDriverNo();
  }, []);

  
  const [mobileNoError, setMobileNoError] = useState("");
  const [vehicleNameError, setVehicleNameError] = useState("");
  const [DriverNameError, setDriverNameError] = useState("");


  const AddDrivers = async (e) => {

    e.preventDefault();

    if (!DriverName) {
      setDriverNameError("Driver name is required");
      return;
    } else {
      setDriverNameError("");
    }
 
    if (!MobileNo) {
      setMobileNoError("Mobile number is required");
      return;
    } else if (MobileNo.length !== 10) {
      setMobileNoError("Mobile number should be 10 digits");
      return;
    } else {
      setMobileNoError("");
    }

    if (!VehicleNo) {
      setVehicleNoError("Vehicle number is required");
      return;
    } else {
      setVehicleNoError("");
    }

    if (!VehicleName) {
      setVehicleNameError("Vehicle name is required");
      return;
    } else {
      setVehicleNameError("");
    }

 
    try {

      const docRefEmp = doc(db, "DriverList", DriverNo, "HistoryCompleted", "ZFlag");
      await setDoc(docRefEmp, { Flag: "" });
      const docRefEmpse = doc(db, "DriverList", DriverNo, "HistoryCancelled", "ZFlag");
      await setDoc(docRefEmpse, { Flag: "" });
      const docRefEmpses = doc(db, "DriverList", DriverNo, "TodayTrip", "ZFlag");
      await setDoc(docRefEmpses, { Flag: "" });

      await setDoc(doc(db, "DriverList", DriverNo), {
        driverID: DriverNo,
        driverName: DriverName,
        vehicleName: VehicleName,
        vehicleType: VehicleType,
        vehicleNo: VehicleNo,
        insExpDate: InsuranceExpDate,
        licExpDate: LicenseExpDate,
        mobileNo: MobileNo,
        upiId: UpiId,
        driverImg: imgUrl,
        aadharNum: AadharNum,
        alternateNumber: AlternateNumber,
        licenseNumber: LicenseNumber,
        permanentAddress: PermanentAddress,
        tempAddress: TempAddress,
        permitExpDate: PermitExpDate,
        taxExpDate: TaxExpDate,
        fCExpDate: FCExpDate,
        bloodGroup: BloodGroup,
        pickupCompleted: "false",
        dropCompleted: "false",
        historyCancelledCount: 0,
        historyCompletedCount: 0,
        token:"",
      });
      let messages = ` Dear ${DriverName},
\n Welcome to Chennai Cabs! We are thrilled to have you join our team of expert drivers. Your driver ID is *${DriverNo}*.
      \nThank you for choosing to work with Chennai Cabs. We look forward to a Great partnership with you!
      \n*Best regards*,
Chennai Cabs Team`;

      axios.post(`https://api.textmebot.com/send.php?recipient=+91${MobileNo}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(messages)}`)
      toast('New Driver Added Successfully!',
      {
        icon: '👏',
        style: {
          borderRadius: '7px',
          background: '#222831',
          color: '#fff',
        },
      }
      
    );

    setTimeout(() => {
      navigate("/Driver"); 
    }, 2000); 


    } catch (e) {
      console.error("Errors adding document: ", e);
    }
  }



  return (
    <>
      <Layout>
        <Toaster />
        <div className='"w-full max-w-lg"'>
          <div className=" drop-shadow-lg  bg-white  rounded-md">
            <div className="container">
              <div className="flex flex-wrap w-full ">
                <div className="flex flex-wrap">
                <div className="m-8 p-2 bg-[#222831] cursor-pointer drop-shadow-lg rounded-xl hover:bg-[#30404d] active:bg-[#1e1e1e]">
      <IoMdArrowRoundBack
        onClick={() => navigate(-1)}
        className="text-white w-6 h-6"
      />
    </div>
                </div>
              </div>
              <div className="text-center content-center  m-8 ">
                <h1 className="font-bold text-[25px] text-black justify-center text-center">
                  Driver Registration
                </h1>
              </div>
              <div className="  object-center flex items-center justify-center gap-5">
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
                        <div className="text-xs text-white font-bold text-center py-1">
                          {progresspercent}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="container px-6 py-0 h-auto ">
                <form className="container p-12 h-auto">
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-state"
                      >
                        Driver ID
                      </label>
                      <div class="relative">
                        <input
                         value={DriverNo}
                         onChange={(e) => setDriverNo(e.target.value)}
                          class="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                        class={`w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 ${
                          DriverNameError ? "border-red-600" : "border-[#D6D6D6]"
                        } focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                      />
                      {DriverNameError && (
                        <p class="text-red-600 text-sm mt-1">{DriverNameError}</p>
                      )}

                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-zip"
                      >
                        Mobile Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Mobile Number"

                        maxLength={10}
                        minLength={10}
                        onChange={(e) =>
                          setMobileNo(e.target.value)
                        }
                        type="tel"
                        required
                        class={`w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 ${
                          mobileNoError ? "border-red-600" : "border-[#D6D6D6]"
                        } focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                      />
                      {mobileNoError && (
                        <p class="text-red-600 text-sm mt-1">{mobileNoError}</p>
                      )}

                    </div>
                  </div>
                  <div class="flex flex-wrap mt-2 -mx-3 mb-4">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-state"
                      >
                        Vehicle Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        placeholder="Enter Vehicle Number"
                        classname="uppercase"
                        onChange={(e) => setVehicleNo(e.target.value)}
                        class={`w-full font-sans font-medium text-base text-[#393E46] border-2 ${
                          vehicleNoError ? "border-red-600" : "border-[#D6D6D6]"
                        } focus:border-[#393E46] bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                        type="text"
                      />
                      {vehicleNoError && (
                        <p class="text-red-600 text-sm mt-1">{vehicleNoError}</p>
                      )}

                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1  tracking-wide"
                        for="grid-city"
                      >
                        Vehicle Name<span className="text-red-600">*</span>
                      </label>
                    <input
  placeholder="Enter Vehicle Name"
  classname="uppercase"
  onChange={(e) => setVehicleName(e.target.value)}
  class={`w-full font-sans font-medium text-base text-[#393E46] border-2 ${
    vehicleNameError ? "border-red-600 animate-shake" : "border-[#D6D6D6]"
  } focus:border-[#393E46] bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
  type="text"
/>
{vehicleNameError && (
  <p class="text-red-600 text-sm mt-1">{vehicleNameError}</p>
)}

                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        Vehicle Type<span className="text-red-600">*</span>
                      </label>
                      <select
                        onChange={(e) => setVehicleType(e.target.value)}
                        class="font-sans font-medium text-base text-[#393E46] borde-2 border-[#D6D6D6] focus:border-[#393E46] block appearance-none w-full bg-white  border py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
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
                        onChange={(e) => setUpiId(e.target.value)}
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-city"
                      >
                        Aadhar Number
                      </label>
                      <input
                        placeholder="Enter Aadhar Number"
                        onChange={(e) => setAadharNum(e.target.value)}
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type=""
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
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white   py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
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
                        onChange={(e) => setTempAddress(e.target.value)}
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white  py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
                        cols="1"
                        rows="1"
                      ></textarea>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                        for="grid-zip"
                      >
                        License Batch Exp
                      </label>
                      <input
                        placeholder="Enter License Batch Exp"
                        onChange={(e) => setLicenseExpDate(e.target.value)}
                        id="start"
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                        Permit Exp date
                      </label>
                      <input
                        placeholder="Enter Permit Exp Date"
                        onChange={(e) => setPermitExpDate(e.target.value)}
                        type="date"
                        name=""
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white   py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white "
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
                        placeholder="Enter Tax Exp Date"
                        onChange={(e) => setTaxExpDate(e.target.value)}
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white  rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                        placeholder="Enter FC Exp Date"
                        onChange={(e) => setFCExpDate(e.target.value)}
                        id="start"
                        class="w-full font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] bg-white rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white "
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
                        onChange={(e) => setAlternateNumber(e.target.value)}
                        type="number"
                        class="block font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] appearance-none w-full bg-white  py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
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
                        onChange={(e) => setBloodGroup(e.target.value)}
                        class="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                        placeholder="Enter Insurance Exp Date"
                        onChange={(e) => setInsuranceExpDate(e.target.value)}
                        id="start"
                        class="w-full bg-white font-sans font-medium text-base text-[#393E46] border-2 border-[#D6D6D6] focus:border-[#393E46] rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="w-full  ">
                    <button
                      onClick={AddDrivers}
                      className="bg-[#00adb5] hover:bg-[#059299] active:bg-[#047481] text-gray-100 text-xl font-bold w-full p-5 rounded-lg my-6"
                    >
                      Add Driver
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

export default AddDriver;
