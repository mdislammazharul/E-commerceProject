import { Product } from './product.interface';
import ProductModel from './product.model';

// Creating a new product in the database
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// Fetching all products from the database, with optional search functionality
const getAllProductsFromDB = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    result = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
  } else {
    result = await ProductModel.find();
  }
  return result;
};

// Fetching a single product from the database by its ID
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// Updating a single product by its ID with new data
const updateSingleProductById = async (id: string, updatedData: Product) => {
  const result = await ProductModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

// Deleting a product by its ID
const deleteProductById = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result.deletedCount !== 0;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductById,
  deleteProductById,
};
