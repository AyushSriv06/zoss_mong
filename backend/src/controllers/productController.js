const Product = require('../models/Product');
const Service = require('../models/Service');
const AdminUpdate = require('../models/AdminUpdate');
const { calculateWarrantyEnd, calculateAmcEnd, calculateNextServiceDate } = require('../utils/dateUtils');

// Get all products for a user
const getUserProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ 
      userId: req.user.userId,
      isApprovedByAdmin: true 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isApprovedByAdmin: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// Add new product (Admin only)
const addProduct = async (req, res, next) => {
  try {
    const {
      userId,
      productName,
      modelNumber,
      purchaseDate,
      imageUrl,
      customWarrantyMonths,
      customAmcMonths,
      customServiceFrequency
    } = req.body;

    // Get default values from AdminUpdate if not provided
    let warrantyMonths = customWarrantyMonths;
    let amcMonths = customAmcMonths;
    let serviceFrequency = customServiceFrequency;

    if (!warrantyMonths || !amcMonths || !serviceFrequency) {
      const adminUpdate = await AdminUpdate.findOne({ modelNumber });
      if (adminUpdate) {
        warrantyMonths = warrantyMonths || adminUpdate.defaultWarrantyMonths;
        amcMonths = amcMonths || adminUpdate.defaultAmcMonths;
        serviceFrequency = serviceFrequency || adminUpdate.serviceFrequencyDays;
      }
    }

    // Calculate warranty and AMC dates
    const warrantyStart = new Date(purchaseDate);
    const warrantyEnd = calculateWarrantyEnd(purchaseDate, warrantyMonths || 12);
    const amcStart = new Date(purchaseDate);
    const amcEnd = calculateAmcEnd(purchaseDate, amcMonths || 12);

    // Create product
    const product = await Product.create({
      userId,
      productName,
      modelNumber,
      purchaseDate,
      imageUrl,
      warranty: {
        start: warrantyStart,
        end: warrantyEnd
      },
      amcValidity: {
        start: amcStart,
        end: amcEnd
      },
      isApprovedByAdmin: true
    });

    // Create initial service record
    const nextServiceDate = calculateNextServiceDate(purchaseDate, serviceFrequency || 90);
    await Service.create({
      userId,
      productId: product._id,
      nextServiceDate
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin only)
const updateProduct = async (req, res, next) => {
  try {
    const {
      productName,
      modelNumber,
      purchaseDate,
      imageUrl,
      warrantyStart,
      warrantyEnd,
      amcStart,
      amcEnd
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        modelNumber,
        purchaseDate,
        imageUrl,
        warranty: {
          start: warrantyStart,
          end: warrantyEnd
        },
        amcValidity: {
          start: amcStart,
          end: amcEnd
        }
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin only)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated services
    await Service.deleteMany({ productId: req.params.id });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all products (Admin only)
const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        products,
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

// Get products by user (Admin only)
const getProductsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const products = await Product.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByUser
};