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

import FetchTrip from "./components/Trip/FetchTrip";
import EditTrip from "./components/Trip/EditTrip";
import BulkUpload from "./components/Home/BulkCSVUpload/BulkUpload";
import "./app.css"
import EmployeeList from "./components/Suppliers/EmployeeList";
import InvoiceList from "./components/Invoice/InvoiceList";
import ViewInvoice from "./components/Invoice/ViewInvoice";
import AddEditViewEmployee from "./components/Suppliers/AddEditViewEmployee.jsx";

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
          <Route path="/invoice-list"  element={<InvoiceList />}  />
            <Route path="/view-invoice/:invoiceId"  element={<ViewInvoice/>}  />
          
            <Route path="/employee-list" element={<EmployeeList />}  />
            <Route path="/add-employee"  element={<AddEditViewEmployee />}  />
            <Route path="/view-employee/:id" element={<AddEditViewEmployee />}  />
        </Routes>
    </BrowserRouter>
    </div>
    </>

    
  );
}

export default App;
