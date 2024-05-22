import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getAllProducts);
router.get('/products/:productId', ProductControllers.getSingleProduct);
router.put('/products/:productId', ProductControllers.updateProductById);
router.delete('/products/:productId', ProductControllers.deleteProductById);

export const ProductRouters = router;
