const User = require('../models/User'); // Ensure the correct path to the User model

// Controller function to get a user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!role || !['donor', 'recipient'].includes(role.toLowerCase())) {
      return res.status(400).json({ error: "Invalid role. Use 'donor' or 'recipient'." });
    }

    const users = await User.find({ role: role.toLowerCase() }).select('-password');

    if (!users.length) {
      return res.status(404).json({ message: `No ${role}s found.` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = { ...req.body };
    console.log("Updateddd:", updateFields)

    // Prevent sensitive fields from being updated this way
    delete updateFields.password;
    delete updateFields.email;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
      select: '-password',
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserById,
  getUsersByRole,
  updateUserData, // Export the new controller
};

