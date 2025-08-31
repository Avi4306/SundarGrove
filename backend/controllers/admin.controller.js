import User from '../models/user.models.js';
import Report from '../models/report.models.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete a user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // First, delete all reports associated with this user
    await Report.deleteMany({ createdBy : req.params.id });
    
    // Then, delete the user themselves
    await user.deleteOne();

    res.json({ msg: 'User and all associated reports removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateUserRoleById = async (req, res) => {
  const { role } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// @desc    Get all unverified reports
// @route   GET /api/admin/reports
// @access  Private (Admin only)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: 'pending' }).populate('createdBy', ['name', 'email']);
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Verify a report and update user points
// @route   PUT /api/admin/reports/:id/verify
// @access  Private (Admin only)
export const verifyReportById = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }
    report.status = 'verified';
    await report.save();

    const user = await User.findById(report.createdBy);
    if (user) {
      user.points += 10;
      user.verifiedReports += 1;
      await user.save();
    }
    res.json({ msg: 'Report verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Reject a report
// @route   PUT /api/admin/reports/:id/reject
// @access  Private (Admin only)
export const rejectReportById = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }
    report.status = 'rejected';
    await report.save();
    await User.findByIdAndUpdate(report.createdBy, { $inc: { points: -5 } });
    res.json({ msg: 'Report rejected successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('createdBy', ['name', 'email']);
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
