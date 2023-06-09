import React, { useEffect, useState } from "react";
import { db } from "../../../config/FirebaseConfig";

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function FetchIndividualDriverData() {
    const [docIds, setDocIds] = useState([]);
    const [selectedDocId, setSelectedDocId] = useState("");
    const { company, date, type, routeId } = useParams();
    const [driverName, setDriverName] = useState("");
    const [driverID, setDriverID] = useState("");
    const [DriverImg, setDriverImg] = useState("");
    const [WaNum, setWaNum] = useState("");
    const [VehicleType, setVehicleType] = useState("");
    const [VehicleNo, setVehicleNo] = useState("");
    const [Listing, setListing] = useState({});

    const [empList, setEmpList] = useState([]);

    useEffect(() => {
        async function fetchEmpList() {
            const empRef = collection(db, "RouteList", company, date, "All", type, routeId, "Employees");
            const querySnapshot = await getDocs(empRef);
            const empData = querySnapshot.docs.map((doc) => doc.data());
            setEmpList(empData);
        }
        fetchEmpList();
    }, [company, date, type, routeId]);




    // Fetch Route data 

    useEffect(() => {
        async function fetchRoute() {
            const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
            }
        }
        fetchRoute();
    }, [company, date, type, routeId]);

    // fetch driver data
    useEffect(() => {
        async function fetchDriverData() {
            const { docs } = await getDocs(collection(db, "DriverList"));
            const docIds = docs.map(({ id }) => id);
            setDocIds(docIds);
        };
        fetchDriverData();
    }, []);

    // get Selected Driver data 
    useEffect(() => {
        const getDriverName = async () => {
            if (selectedDocId) {
                const docRef = doc(db, "DriverList", selectedDocId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDriverName(data.driverName);
                    setDriverID(data.driverID);
                    setWaNum(data.mobileNo);
                    setVehicleType(data.vehicleType);
                    setVehicleNo(data.vehicleNo);
                    setDriverImg(data.driverImg);
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("No such document!");
            }
        };
        getDriverName();
    }, [selectedDocId]);


    const [R1, setR1] = useState({});
    const [Lapiz, setLapiz] = useState({});
    const [LT, setLT] = useState({});
    const [Medico, setMedico] = useState({});

    useEffect(() => {
        async function fetchRoute() {
            const docRef = doc(db, "ContantData", "Whatsapp", "L&T", "Incharge");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) { setLT(docSnap.data()); }
        }
        fetchRoute();
    }, []);
    useEffect(() => {
        async function fetchRoute() {
            const docRef = doc(db, "ContantData", "Whatsapp", "Medico", "Incharge");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) { setMedico(docSnap.data()); }
        }
        fetchRoute();
    }, []);
    useEffect(() => {
        async function fetchRoute() {
            const docRef = doc(db, "ContantData", "Whatsapp", "Lapiz", "Incharge");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) { setLapiz(docSnap.data()); }
        }
        fetchRoute();
    }, []);
    useEffect(() => {
        async function fetchRoute() {
            const docRef = doc(db, "ContantData", "Whatsapp", "R1", "Incharge");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) { setR1(docSnap.data()); }
        }
        fetchRoute();
    }, []);

    const Allocate = async () => {

        let messages = " *Chennai Cabs - Employee Details:* \n";
        empList.forEach((emp) => {
            messages += ` \n EmployeeID - ${emp.EmpID} \n EmployeeName - ${emp.EmpName} \n Mobile No -  ${emp.EmpMobile} \n *Pickup Location- ${emp.EmpPickupLocation}* \nPickup Time-${emp.EmpPickupTime}\n`;
        });
 window.open(`https://api.textmebot.com/send.php?recipient=+91${WaNum}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(messages)}`,"_blank")

        // setTimeout(() => {
        //     axios.post(`https://api.textmebot.com/send.php?recipient=+91${WaNum}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(messages)}`)
        // });

        let helpLine = "";

        const driverDetails = `*Chennai Cabs- Driver Details* \n \n *${routeId} - ${Listing.RouteName.toUpperCase()} - ${Listing.TripType.toUpperCase()}* \n \n Driver ID - ${driverID}\n Driver Name - ${driverName}\n Driver No - ${WaNum} \n Vehcile No - ${VehicleNo.toUpperCase()} \n \n `;
        
        if (company === "R1") {
            helpLine = ` *CHENNAI CABS HELP LINE* \n 1) ${R1.Supervisor}  - Supervisor- ${R1.SupervisorNo} \n 2) ${R1.InchargeName} - Site Incharge - ${R1.InchargeNo}`;
        
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${R1.SupervisorNo}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${R1.InchargeNo}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
            axios.post(`https://api.textmebot.com/send.php?recipient=+919962504088&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
        } else if (company === "Lapiz") {
            helpLine = `*CHENNAI CABS HELP LINE* \n 1) ${Lapiz.SiteIncharge1}- Site Incharge- ${Lapiz.SiteInchargeNo1} \n \n 2) ${Lapiz.SiteIncharge2} - Site Incharge - ${Lapiz.SiteInchargeNo2}`;
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${Lapiz.SiteInchargeNo1}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${Lapiz.SiteInchargeNo2}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
        } else if (company === "Medico") {
            helpLine = `*CHENNAI CABS HELP LINE* \n 1) ${Medico.SiteIncharge} - Site Incharge- ${Medico.SiteInchargeNo} `;
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${Medico.SiteInchargeNo}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
        } else if (company === "L&T") {
            helpLine = `*CHENNAI CABS HELP LINE* \n 1)${LT.SiteIncharge} - Site Incharge - ${LT.SiteInchargeNo} `;
            axios.post(`https://api.textmebot.com/send.php?recipient=+91${LT.SiteInchargeNo}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
        }
        
        axios.post(`https://api.textmebot.com/send.php?recipient=+919600114755&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        axios.post(`https://api.textmebot.com/send.php?recipient=+919500166654&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetails)}`);
        
        empList.forEach((emp) => {
            const driverDetailss = `*Chennai Cabs- Driver Details* \n \n *${routeId} - ${Listing.RouteName.toUpperCase()} - ${Listing.TripType.toUpperCase()}* \n \n Driver ID - ${driverID}\n Driver Name - ${driverName}\n Driver No - ${WaNum} \n Vehcile No - ${VehicleNo.toUpperCase()} \n \n ${helpLine}`;
setTimeout(() => {
                    window.open(`https://api.textmebot.com/send.php?recipient=+91${emp.EmpMobile}&apikey=Hwd2BzkcxSY4&text=${encodeURIComponent(driverDetailss)}`,"_blank")
                });
        });

       
        empList.forEach((emp) => {
            const docRefEmplLists = doc(db, "EmployeeList", emp.EmpID, "TodayTrip", type);
            updateDoc(docRefEmplLists, {
                DriverImg: DriverImg,
                driverID: driverID,
                driverName: driverName,
                vehicleNo: VehicleNo,
                driverNo: WaNum,
                vehicleType:VehicleType,
            });
        });


        empList.forEach((emp) => {
            const Driverdata = doc(db, "DriverList", driverID, "TodayTrip", type, "Employees", emp.EmpID);
            const driverData = {
                EmpID: emp.EmpID,
                EmpName: emp.EmpName,
                EmpMobile: emp.EmpMobile,
                EmpGender: emp.EmpGender,
                EmpPickupLocation: emp.EmpPickupLocation,
                EmpDropLocation: emp.EmpDropLocation,
                tripDate: date,
                company: company,
                EmpPickupTime: emp.EmpPickupTime,
                offDuty: "false",
                dropped: "false",
                elseWhere: "false",
                latitude: "",
                longitude: "",
                picked: "false",
                reached: "false",
            };
            setDoc(Driverdata, driverData);
        });


        const Driverdata = doc(db, "DriverList", driverID, "TodayTrip", type);
        setDoc(Driverdata, {
            routeID: routeId,
            tripType: type,
            company: company,
            tripDate: date,
            startLocation: Listing.PickupLocation,
            startTime: Listing.PickupTime,
            tripStatus: Listing.TripStatus,
            endLocation: Listing.DropLocation,
            employeeCount: Listing.NoofPickups,
            totalCount: Listing.NoofPickups,
            completed: "false",
            cancelled: "false",
            latitude: "",
            longitude: "",
        });

        const TripDriverdatas = doc(db, "RouteList", company, date, "All", type, routeId);
        updateDoc(TripDriverdatas, {
            AllotedDriverName: driverName,
            AllotedDriverID: driverID,
            AllotedDriverNo: WaNum,
            AllotedVehicleType: VehicleType,
            AllotedVehicleNo: VehicleNo,
        });


        const docRef = doc(db, "RouteList", company, date, "All", type, routeId);
        await updateDoc(docRef, { TripStatus: "Alloted" });


        // completed Employee data base

        empList.forEach(async (emp) => {
            const docRefse = doc(db, "EmployeeList", emp.EmpID, "TodayTrip", "ZFlag");
            await setDoc(docRefse, { Test: "0" });
        })

        // On Driver database

        toast.success('Trip Allocated', {
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
            position: 'bottom-center',
        });
    };


    return (
        <div class="w-full md:w-[550px] h-auto  bg-white shadow-lg rounded-lg mx-auto">

            <Toaster />
            <div class="container p-8 h-auto">


                <div class="flex flex-col md:flex-row -mx-2 mb-6">
                    <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                        <label class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide" for="grid-first-name">
                            Driver ID
                        </label>
                        <select placeholder="Driver ID"
                            class="appearance-none block w-full md:w-[229px] focus:outline-none focus:bg-white focus:border-gray-500 bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                            value={selectedDocId}
                            onChange={(e) => setSelectedDocId(e.target.value)}>
                            {docIds.map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="w-full md:w-1/2 px-2 flex items-end justify-evenly">
                        <button type="submit" onClick={Allocate}
                            class="bg-[#00adb5] text-white rounded py-3 px-8 text-sm font-bold md:text-base focus:border-[#4dd9e0] hover:bg-[#008c8f] active:bg-[#006d6f]">
                            Allocate
                        </button>

                    </div>
                </div>

                <div class="flex flex-col md:flex-row -mx-2 mb-6  ">
                    <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0 ">
                        <label
                            class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                            for="grid-first-name"
                        >
                            Driver Name
                        </label>
                        <input
                            placeholder="Driver Name"
                            type="text"
                            value={driverName}
                            className="appearance-none block w-full md:w-[229px] focus:outline-none focus:bg-white focus:border-gray-500 bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        />
                    </div>
                    <div class="w-full md:w-1/2 px-2">
                        <label
                            class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                            for="grid-last-name"
                        >
                            Mobile Number
                        </label>
                        <input
                            placeholder="Mobile Number"
                            type="text"
                            value={WaNum}
                            className="appearance-none block w-full md:w-[229px] focus:outline-none focus:bg-white focus:border-gray-500 bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row -mx-2 mb-6  ">
                    <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0 ">
                        <label
                            class="block text-base font-sans font-semibold text-[#393E46] mb-1 tracking-wide"
                            for="grid-first-name"
                        >
                            Vehicle Type
                        </label>
                        <input
                            placeholder="Vehicle Type"
                            type="text"
                            value={VehicleType}
                            className="appearance-none block w-full md:w-[229px] focus:outline-none focus:bg-white focus:border-gray-500 bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        />
                    </div>
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
                            className="appearance-none block w-full md:w-[229px] focus:outline-none focus:bg-white focus:border-gray-500 bg-white font-sans font-medium text-base text-[#393E46] border-2 border-gray-200 rounded-md hover:border-[#393E46] py-3 px-4 leading-tight hover:outline-none hover:bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FetchIndividualDriverData;
