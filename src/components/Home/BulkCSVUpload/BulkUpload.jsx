import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";

import { FaCloudUploadAlt } from 'react-icons/fa';
import Layout from '../../../Layout/Layout';
import { GrFormNextLink } from 'react-icons/gr';
import { Toaster, toast } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyD0QT-wF6iOp9MK4MBC8rDGOJcrELgm-cw",
  authDomain: "vpr-admin-84ea7.firebaseapp.com",
  projectId: "vpr-admin-84ea7",
  storageBucket: "vpr-admin-84ea7.appspot.com",
  messagingSenderId: "625335494190",
  appId: "1:625335494190:web:6883e2e4681c0d0ba021bf"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function BulkData() {
  const today = new Date().toISOString().slice(0, 10);

  

  const [date, setDate] = useState(today);
  const [TripType, setTripType] = useState('Pickup');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const TripTypechange = (event) => {
    setTripType(event.target.value);
  };


  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  

  const handleUpload = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // assuming that the first row contains the column headers
      const headers = rows[0];
      const data = rows.slice(3).map((row) =>
        headers.reduce((obj, header, i) => {
          obj[header] = row[i];
          return obj;
        }, {})
      );

      // Loop through the data array and store each object as a document in the "rows" collection
      data.forEach((rowData) => {
        
        db.collection('RouteLists').doc(date).collection('R1').doc('notAllotted').collection(TripType).add(rowData)
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            toast.success('Data uploaded successfully');
          })
          .catch((error) => {
            toast.error('Error adding document: ', error);
          });
      });

    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
     <Toaster/>
      <Layout>
        <div className='flex flex-col gap-4'>
          <div className=" items-center align-middle justify-center flex ">
            <div className='bg-white shadow-xl drop-shadow-xl p-4 flex flex-row gap-2 rounded-lg'>
              <div
                class="flex flex-row justify-start items-center space-x-4">
                <input type="date" onChange={handleDateChange}
                  class="px-3 py-2 border border-[#00adb5] bg-[#00adb5] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <GrFormNextLink className='text-3xl mt-2' />
              <select onChange={TripTypechange} style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                className="bg-[#222831] hover:bg-[#393e46] text-white font-bold py-2 px-4 rounded-lg" >
                <option value="Pickup">Pickup</option>
                <option value="Drop" >Drop</option>
              </select>
              <GrFormNextLink className='text-3xl mt-2' />

              <label htmlFor="file-upload" className="mr-2 cursor-pointer p-2.5 bg-[#00adb5] hover:bg-[#24c7cf] rounded-lg shadow-xl flex items-center">
                <FaCloudUploadAlt className="w-6 h-6 mr-1 text-white" />
                <span className='text-white'>Select Excel</span>
              </label>

              <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
              <GrFormNextLink className='text-3xl mt-2' />

              <button className="bg-[#222831] hover:bg-[#393e46] text-white font-bold py-2 px-4 rounded-lg" onClick={handleUpload}>Upload </button>



            </div>

          </div>
          {/* dataTable */}
          <div className="item-center shadow-2xl border border-gray-400 rounded-xl p-2 overflow-x-auto">
            {data.length > 0 && (
              <table className="mt-4 w-full table-auto ">
                <thead className="px-4 py-2 bg-[#222831]  text-white">
                  <tr>
                    {data[0] &&
                      data[0].map((header) => (
                        <th key={header} className="px-6 py-2  text-white">
                          {header}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(1).map((row, index) => (
                    <tr key={index} className=" rounded-2xl  shadow-2xl drop-shadow-2xl ">
                      {row.map((cell, index) => (
                        <td
                          key={index}
                          className="px-6 py-2 text-sm "
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>


      </Layout>
    </>
  );
}

export default BulkData