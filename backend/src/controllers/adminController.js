const AdminUpdate = require('../models/AdminUpdate');
const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');

// Get all admin updates (product templates)
const getAdminUpdates = async (req, res, next) => {
  try {
    const adminUpdates = await AdminUpdate.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { adminUpdates }
    });
  } catch (error) {
    next(error);
  }
};

// Create admin update (product template)
const createAdminUpdate = async (req, res, next) => {
  try {
    const {
      modelNumber,
      productName,
      description,
      defaultWarrantyMonths,
      defaultAmcMonths,
      serviceFrequencyDays
    } = req.body;

    const adminUpdate = await AdminUpdate.create({
      modelNumber,
      productName,
      description,
      defaultWarrantyMonths,
      defaultAmcMonths,
      serviceFrequencyDays
    });

    res.status(201).json({
      success: true,
      message: 'Product template created successfully',
      data: { adminUpdate }
    });
  } catch (error) {
    next(error);
  }
};

// Update admin update
const updateAdminUpdate = async (req, res, next) => {
  try {
    const {
      productName,
      description,
      defaultWarrantyMonths,
      defaultAmcMonths,
      serviceFrequencyDays
    } = req.body;

    const adminUpdate = await AdminUpdate.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        description,
        defaultWarrantyMonths,
        defaultAmcMonths,
        serviceFrequencyDays
      },
      { new: true, runValidators: true }
    );

    if (!adminUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Product template not found'
      });
    }

    res.json({
      success: true,
      message: 'Product template updated successfully',
      data: { adminUpdate }
    });
  } catch (error) {
    next(error);
  }
};

// Delete admin update
const deleteAdminUpdate = async (req, res, next) => {
  try {
    const adminUpdate = await AdminUpdate.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!adminUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Product template not found'
      });
    }

    res.json({
      success: true,
      message: 'Product template deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const pendingApprovals = await Product.countDocuments({ isApprovedByAdmin: false });
    const overdueServices = await Service.countDocuments({
      nextServiceDate: { $lt: new Date() },
      status: { $ne: 'Completed' }
    });

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        pendingApprovals,
        overdueServices,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get pending product approvals
const getPendingApprovals = async (req, res, next) => {
  try {
    const pendingProducts = await Product.find({ isApprovedByAdmin: false })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { pendingProducts }
    });
  } catch (error) {
    next(error);
  }
};

// Approve product
const approveProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isApprovedByAdmin: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product approved successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminUpdates,
  createAdminUpdate,
  updateAdminUpdate,
  deleteAdminUpdate,
  getDashboardStats,
  getPendingApprovals,
  approveProduct
};