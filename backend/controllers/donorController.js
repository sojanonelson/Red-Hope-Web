exports.getNotifications = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId).populate('notifications');
      res.status(200).json({ notifications: user.notifications });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
  };