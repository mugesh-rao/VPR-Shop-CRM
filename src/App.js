import { BrowserRouter, Routes, Route  } from "react-router-dom";
import DriverManagement from "./pages/DriverManagement";
import EmployeeManagement from "./pages/EmployeeManagement";
import Home from "./pages/Home";
import Passbook from "./pages/Passbook";
import Remittance from "./pages/Remittance";
import TripManagement from "./pages/TripManagement";
import Report from './pages/Report';
import AddTrip from "./components/Trip/AddTrip";
import Login from "./pages/SignIn";
import AddDriver from "./components/Driver/AddDriver";
import EditDriver from "./components/Driver/EditDriver";
import FetchTrip from "./components/Trip/FetchTrip";
import EditTrip from "./components/Trip/EditTrip";
import BulkUpload from "./components/Home/BulkCSVUpload/BulkUpload";
import FetchDriver from "./components/Driver/FetchDriver";
import "./app.css"

function App() {
  return (
    <>
    <div className="font-sf_bold">
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home />} />
          <Route path="/Trip" element={<TripManagement/>} />
          <Route path="/Driver" element={<DriverManagement/>} />
          <Route path="/Employee" element={<EmployeeManagement/>} />
          <Route path="/Remittance" element={<Remittance/>} />
          <Route path="/Passbook" element={<Passbook/>} />
          <Route path="/Report" element={<Report/>} />
         

          <Route path="/addTrip" element={<AddTrip/>} />
          <Route path="/EditTrip/:company/:date/All/:type/:routeId" element={<EditTrip/>} />
          
          <Route path="/FetchTrip/:company/:date/All/:type/:routeId" element={<FetchTrip/>}/>
          <Route path="/bulkcsv" element={<BulkUpload/>} />

          <Route path="/NewDriver" element={<AddDriver/>} />
          <Route path="/EditDriver/:id" element={<EditDriver/>} />
          <Route path="/FetchDriver/:id" element={<FetchDriver/>} />
        </Routes>
    </BrowserRouter>
    </div>
    </>

    
  );
}

export default App;
