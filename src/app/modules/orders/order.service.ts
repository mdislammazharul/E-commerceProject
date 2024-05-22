import ProductModel from '../products/product.model';
import { Order } from './order.interface';
import OrderModel from './order.model';

const createOrderInDB = async (order: Order) => {
  try {
    const productExists = await ProductModel.findById(order.productId);

    if (!productExists) {
      return false;
    }

    const productQuantity = productExists.inventory.quantity;

    if (productQuantity < order.quantity) {
      return false;
    }

    const result = await OrderModel.create(order);

    // Update the product inventory
    const updatedQuantity = productQuantity - order.quantity;

    await ProductModel.findByIdAndUpdate(order.productId, {
      $set: {
        'inventory.quantity': updatedQuantity,
        'inventory.inStock': updatedQuantity > 0,
      },
    });

    return result;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

const getAllOrdersFromDB = async (email?: string) => {
  try {
    let result;

    if (email) {
      const regex = new RegExp(email, 'i');
      result = await OrderModel.find({ email: regex });
    } else {
      result = await OrderModel.find();
    }

    return result;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const OrderService = {
  createOrderInDB,
  getAllOrdersFromDB,
};
