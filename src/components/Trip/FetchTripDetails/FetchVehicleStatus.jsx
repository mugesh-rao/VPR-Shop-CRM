import React, { useState } from 'react'

export default function FetchVehicleStatus() {
  const [progress, setProgress] = useState(70);
  

  return (
    <div className='w-full h-[167px] border bg-white shadow-xl rounded-lg '>
    <h1 className='text-center text-lg p-2 font-sf_heavy_italic'>Vehcile Status</h1>
<div className="relative h-6 md:p-2 w-4/5  mt-8 p-2 mx-8  rounded-full">
<div className="absolute left-0 top-0 h-full bg-[#00adb5] border border-[#222831] rounded-full" style={{ width: `${progress}%` }}></div>
<div className="absolute left-0 top-0 h-full  rounded-full flex justify-center items-center md:w-12 w-10">
<span className="text-white text-xs md:text-base">{`${progress}%`}</span>
</div>
<div className="absolute right-0 top-0 h-full rounded-full flex justify-center items-center md:w-24 w-20">
{/* <span className="text-gray-700 font-medium text-xs md:text-base">OG</span> */}
</div>
<div className="absolute left-0 bottom-0 h-full  rounded-full flex justify-center items-center md:w-24 w-20">
{/* <span className="text-gray-700 font-medium text-xs md:text-base">NA</span> */}
</div>
<div className="absolute right-0 bottom-0 h-full  rounded-full flex justify-center items-center md:w-24 w-20">
{/* <span className="text-gray-700 font-medium text-xs md:text-base">CO</span> */}
</div>
<div className="absolute left-12 top-0 h-full  rounded-full flex justify-center items-center md:w-24 w-20">
{/* <span className="text-gray-700 font-medium text-xs md:text-base">AL</span> */}
</div>
</div>
</div>
    )
}
