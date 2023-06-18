import React from "react";

export default function TripCopy({
  visible,
  onClose,
  getRouteId,
  getTripDate,
  getRouteName,
  getShiftTime,
  getTripType,
  getVehicleType,
  setRouteId,
  setTripDate,
  setRouteName,
  setShiftTime,
  setTripType,
  setVehicleType,
  handleSubmit,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-[#222831] bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white px-10 py-5 rounded">
        <div className="mb-4">
          <img
            className="w-5 cursor-pointer ml-auto"
            onClick={onClose}
            src={""}
            alt="close"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8 md:flex md:mb-5">
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="startDate"
                >
                  Route ID
                </label>
              </div>
              <div>
                <input
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full"
                  id="startDate"
                  type="text"
                  value={getRouteId}
                  onChange={(e) => setRouteId(e.target.value)}
                />
               
              </div>
            </div>
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="endDate"
                >
                  Trip Date
                </label>
              </div>
              <div>
                <input
                  onChange={(e) => setTripDate(e.target.value)}
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full md:w-48"
                  id="endDate"
                  type="date"
                  value={getTripDate}
                />
               
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:flex md:mb-5">
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="startDate"
                >
                  Route Name
                </label>
              </div>
              <div>
                <input
                  onChange={(e) => setRouteName(e.target.value)}
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full"
                  id="startDate"
                  type="text"
                  value={getRouteName}
                />
               
              </div>
            </div>
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="endDate"
                >
                  Shift Time
                </label>
              </div>
              <div>
                <input
                  onChange={(e) => setShiftTime(e.target.value)}
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full md:w-48"
                  id="endDate"
                  type="time"
                  value={getShiftTime}
                />
                
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:flex md:mb-5">
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="startDate"
                >
                  Trip Type
                </label>
              </div>
              <div>
                <select
                  onChange={(e) => setTripType(e.target.value)}
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full"
                  id="grid-state"
                  value={getTripType}
                >
                  <option value="">--- Select Trip Type ---</option>
                  <option value="Drop">Drop</option>
                  <option value="Pickup">Pickup</option>
                </select>
               
              </div>
            </div>
            <div>
              <div>
                <label
                  className="font-medium font-roboto text-md text-[#222831]"
                  htmlFor="endDate"
                >
                  Vehicle Type
                </label>
              </div>
              <div>
                <select
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="border-2 rounded-sm border-[#D6D6D6] p-1 w-full md:w-48"
                  value={getVehicleType}
                >
                  <option value="">--- Select Vehicle Type ---</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
                
              </div>
            </div>
          </div>
          <div className="text-center mt-5 mb-1">
            <button className="bg-[#00ADB5] px-6 py-1 rounded-md text-white">
              Copy Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
