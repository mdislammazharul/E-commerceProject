import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.joi.validation';

// Create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { error } = productValidationSchema.validate(productData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details,
      });
    }

    const result = await ProductServices.createProductIntoDB(productData);

    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

// Retrieve all products
const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found.',
      });
    } else {
      return res.status(200).json({
        success: true,
        message: searchTerm
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : 'All products retrieved successfully',
        data: result,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

// Retrieve single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'No product found!',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

// Update a single product by ID
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const { error } = productValidationSchema.validate(updatedData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details,
      });
    }

    const result = await ProductServices.updateSingleProductById(
      productId,
      updatedData,
    );

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

// Delete product
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductById(productId);

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'No product found!',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProductById,
  deleteProductById,
};
