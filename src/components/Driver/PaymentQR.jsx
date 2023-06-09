import React from "react";
import QRCode from "qrcode.react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SiPaytm } from 'react-icons/si';

const GooglePayQRCode = ({ upiId , name }) => {
  const googlePayUPIUrl = `upi://pay?pa=${upiId}&pn=${name}&tr=1234567890&tn=PaymentDescription&am=AmountInRupees&cu=INR`;

  const MySwal = withReactContent(Swal);

  const handlePaymentClick = () => {
    MySwal.fire({
      title: "Google Pay",
      html: <div style={{ display: 'flex', justifyContent: 'center' }}><QRCode value={googlePayUPIUrl}  size={256}  /></div>,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    });
  };
  

  return (
    <div>
      <button onClick={handlePaymentClick}>
      <SiPaytm className='text-white w-6 h-5 ' />
      </button>
    </div>
  );
};

export default GooglePayQRCode;
