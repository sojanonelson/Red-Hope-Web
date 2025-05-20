const User = require("../models/User");

const ServiceHistory = require("../models/ServiceHistory");

exports.getNotifications = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId).populate('notifications');
      res.status(200).json({ notifications: user.notifications });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
  };


    exports.DonationStatus = async (req, res) => {
        
    const { id ,status} = req.body;
    console.log("Req:",id)
    console.log("Status:",status)
   
    try {
        // Find the service history entry by ID
        const serviceHistory = await ServiceHistory.findOne({ _id: id });

        if (!serviceHistory) {
            return res.status(404).json({ message: "Blood request not found" });
        }

        

        // Validate and update donorStatus
        if (status) {
            if (!["Done", "Cancelled", "Pending"].includes(status)) {
                return res.status(400).json({ message: "Invalid donor status" });
            }
            serviceHistory.donation = status;

        }


        await serviceHistory.save();
        res.status(200).json({ message: "Donation status updated successfully", serviceHistory });

    } catch (error) {
        res.status(500).json({ message: "Error updating blood request", error: error.message });
    }
};

  exports.updateBloodRequest = async (req, res) => {
    const { requestId } = req.params;
    const { donorStatus, donation, donorId } = req.body;

    try {
        // Find the service history entry by ID
        const serviceHistory = await ServiceHistory.findOne({ _id: requestId });

        if (!serviceHistory) {
            return res.status(404).json({ message: "Blood request not found" });
        }

        // Ensure only the assigned donor can update the request
        if (serviceHistory.donorId.toString() !== donorId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own requests" });
        }

        // Validate and update donorStatus
        if (donorStatus) {
            if (!["Accepted", "Declined", "Pending"].includes(donorStatus)) {
                return res.status(400).json({ message: "Invalid donor status" });
            }
            serviceHistory.donorStatus = donorStatus;

            // If donor status is Declined, update donation to Cancelled
            if (donorStatus === "Declined") {
                serviceHistory.donation = "Cancelled";
            }
        }

        // Validate and update donation status (only if donorStatus is not Declined)
        if (donation && donorStatus !== "Declined") {
            if (!["Done", "Cancelled", "Pending"].includes(donation)) {
                return res.status(400).json({ message: "Invalid donation status" });
            }
            serviceHistory.donation = donation;
        }

        await serviceHistory.save();
        res.status(200).json({ message: "Blood request updated successfully", serviceHistory });

    } catch (error) {
        res.status(500).json({ message: "Error updating blood request", error: error.message });
    }
};
