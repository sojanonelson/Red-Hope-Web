import React from "react";

const bloodTypes = [
  {
    type: "A+",
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
  },
  {
    type: "A-",
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
  },
  {
    type: "B+",
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
  },
  {
    type: "B-",
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
  },
  {
    type: "AB+",
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  {
    type: "AB-",
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"],
  },
  {
    type: "O+",
    canDonateTo: ["A+", "B+", "AB+", "O+"],
    canReceiveFrom: ["O+", "O-"],
  },
  {
    type: "O-",
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"],
  },
];

const Aboutdonation = () => {
  return (
    <div className="bg px-4 py-6 max-w-full overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold font-mono text-center my-4 md:my-8 text-red-600">
        Learn About Donation
      </h1>
      
      {/* Responsive container that stacks on mobile */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Image section - full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/people-donate-blood-to-charity-7820863-6207469.png"
            alt="Blood Donor"
            className="w-full max-w-sm md:max-w-full object-contain"
          />
        </div>
        
        {/* Table section - full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full table-auto text-xs sm:text-sm mb-2 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-1 sm:p-2 border border-gray-300 text-center text-white bg-red-600">
                    Blood Type
                  </th>
                  <th className="p-1 sm:p-2 border border-gray-300 text-center text-white bg-red-600">
                    Can Donate To
                  </th>
                  <th className="p-1 sm:p-2 border border-gray-300 text-center text-white bg-red-600">
                    Can Receive From
                  </th>
                </tr>
              </thead>
              <tbody>
                {bloodTypes.map((donor, index) => (
                  <tr key={index}>
                    <td className="p-1 sm:p-2 border border-gray-900 text-gray-900 text-center font-bold font-serif">
                      {donor.type}
                    </td>
                    <td className="p-1 sm:p-2 border border-gray-950 text-gray-900 text-center font-serif">
                      {donor.canDonateTo.join(", ")}
                    </td>
                    <td className="p-1 sm:p-2 border border-gray-900 text-gray-900 text-center font-serif">
                      {donor.canReceiveFrom.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Additional information section */}
      <div className="mt-8 bg-red-50 p-4 rounded-lg shadow-sm mx-auto max-w-4xl">
        <h2 className="text-lg md:text-xl font-bold text-red-600 mb-3">Why Donate Blood?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>A single donation can save up to three lives</li>
          <li>Blood cannot be manufactured – it can only come from generous donors</li>
          <li>Every two seconds someone needs blood</li>
          <li>Most donated red blood cells must be used within 42 days</li>
        </ul>
      </div>
    </div>
  );
};

export default Aboutdonation;