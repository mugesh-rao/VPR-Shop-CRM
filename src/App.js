import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverManagement from "./pages/Suppliers";
import EmployeeManagement from "./pages/EmployeeManagement";
import Home from "./pages/Home";
import Passbook from "./pages/Passbook";
import Remittance from "./pages/Remittance";
import TripManagement from "./pages/CashBook";
import Report from "./pages/Report";
import Login from "./pages/SignIn";
import FetchTrip from "./components/Trip/FetchTrip";
import EditTrip from "./components/Trip/EditTrip";
import "./app.css";
import InvoiceList from "./components/Invoice/InvoiceList";
import ViewInvoice from "./components/Invoice/ViewInvoice";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <>
      <div className="font-sf_bold">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/CashBook" element={<TripManagement />} />
            <Route path="/Suppliers" element={<DriverManagement />} />
            <Route path="/Employee" element={<EmployeeManagement />} />
            <Route path="/Remittance" element={<Remittance />} />
            <Route path="/Passbook" element={<Passbook />} />
            <Route path="/test" element={<Invoice/>} />

            <Route path="/Report" element={<Report />} />
            <Route path="/EditTrip/:company/:date/All/:type/:routeId" element={<EditTrip />}/>
            <Route path="/FetchTrip/:routeId" element={<FetchTrip />} />
            <Route path="/invoice-list" element={<InvoiceList />} />
            <Route path="/view-invoice/:invoiceId" element={<ViewInvoice />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
