const Service = require('../models/Service');
const Product = require('../models/Product');
const User = require('../models/User');
const { getServiceStatus, calculateNextServiceDate } = require('../utils/dateUtils');

// Create service request (Customer)
const createServiceRequest = async (req, res, next) => {
  try {
    const { productId, issueDescription, requestedDate, requestedTime } = req.body;

    // Verify product belongs to user
    const product = await Product.findOne({
      _id: productId,
      userId: req.user.userId
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or does not belong to you'
      });
    }

    // Create service request
    const service = await Service.create({
      userId: req.user.userId,
      productId,
      issueDescription,
      requestedDate: new Date(requestedDate),
      requestedTime,
      status: 'Pending Approval'
    });

    const populatedService = await Service.findById(service._id)
      .populate('productId', 'productName modelNumber imageUrl');

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: { service: populatedService }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's services
const getUserServices = async (req, res, next) => {
  try {
    const services = await Service.find({ userId: req.user.userId })
      .populate('productId', 'productName modelNumber imageUrl')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    next(error);
  }
};

// Get services due soon
const getServicesDueSoon = async (req, res, next) => {
  try {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const services = await Service.find({
      userId: req.user.userId,
      nextServiceDate: { $lte: sevenDaysFromNow },
      status: { $in: ['Due Soon', 'Overdue'] }
    })
    .populate('productId', 'productName modelNumber imageUrl')
    .sort({ nextServiceDate: 1 });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    next(error);
  }
};

// Mark service as completed
const completeService = async (req, res, next) => {
  try {
    const { serviceNotes, nextServiceDays } = req.body;
    const serviceId = req.params.id;

    const service = await Service.findOne({
      _id: serviceId,
      userId: req.user.userId
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Update current service
    service.status = 'Completed';
    service.lastServiceDate = new Date();
    service.serviceNotes = serviceNotes;
    await service.save();

    // Create next service record
    const nextServiceDate = calculateNextServiceDate(
      new Date(), 
      nextServiceDays || 90
    );

    await Service.create({
      userId: req.user.userId,
      productId: service.productId,
      nextServiceDate
    });

    res.json({
      success: true,
      message: 'Service marked as completed and next service scheduled'
    });
  } catch (error) {
    next(error);
  }
};

// Get pending service requests (Admin only)
const getPendingServiceRequests = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'Pending Approval' })
      .populate('productId', 'productName modelNumber imageUrl')
      .populate({
        path: 'userId',
        select: 'name email address phoneNumber',
        model: 'User',
        localField: 'userId',
        foreignField: 'userId'
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    next(error);
  }
};

// Approve service request (Admin only)
const approveServiceRequest = async (req, res, next) => {
  try {
    const { technicianName, technicianContact, scheduledDate, scheduledTime } = req.body;
    const serviceId = req.params.id;

    const service = await Service.findByIdAndUpdate(
      serviceId,
      {
        technicianName,
        technicianContact,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        status: 'Approved & Scheduled'
      },
      { new: true, runValidators: true }
    ).populate('productId', 'productName modelNumber');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.json({
      success: true,
      message: 'Service request approved and scheduled successfully',
      data: { service }
    });
  } catch (error) {
    next(error);
  }
};

// Get all services (Admin only)
const getAllServices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find()
      .populate('productId', 'productName modelNumber')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments();

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update service (Admin only)
const updateService = async (req, res, next) => {
  try {
    const { nextServiceDate, status, serviceNotes } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { nextServiceDate, status, serviceNotes },
      { new: true, runValidators: true }
    ).populate('productId', 'productName modelNumber');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service }
    });
  } catch (error) {
    next(error);
  }
};

// Get services by user (Admin only)
const getServicesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const services = await Service.find({ userId })
      .populate('productId', 'productName modelNumber imageUrl')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    next(error);
  }
};

// Get overdue services (Admin only)
const getOverdueServices = async (req, res, next) => {
  try {
    const services = await Service.find({
      nextServiceDate: { $lt: new Date() },
      status: { $ne: 'Completed' }
    })
    .populate('productId', 'productName modelNumber')
    .sort({ nextServiceDate: 1 });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createServiceRequest,
  getUserServices,
  getServicesDueSoon,
  completeService,
  getPendingServiceRequests,
  approveServiceRequest,
  getAllServices,
  updateService,
  getServicesByUser,
  getOverdueServices
};