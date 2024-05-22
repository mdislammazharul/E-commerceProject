import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderValidationSchema from './order.joi.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const { error } = orderValidationSchema.validate(orderData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details,
      });
    }

    const result = await OrderService.createOrderInDB(orderData);
    if (result) {
      return res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Insufficient quantity available in inventory',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

const getAllOrdersFromDB = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const result = await OrderService.getAllOrdersFromDB(email as string);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found for '${email}'`,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: email
          ? `Orders for '${email}' fetched successfully!`
          : 'All orders retrieved successfully',
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

export const OrderController = {
  createOrder,
  getAllOrdersFromDB,
};
