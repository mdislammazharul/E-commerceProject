import { Schema, model } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;
