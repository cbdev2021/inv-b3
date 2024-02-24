import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  updateProductAmount,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para productos
// router.post('/products/add', protect, addProduct);
router.post('/products/add-product',  addProduct);

router.put('/products/update/:id', protect, updateProduct);
router.delete('/products/delete/:id', protect, deleteProduct);
router.get('/products/get/:id', protect, getProduct);
router.get('/products/get-by-user/:idUsuario', protect, getProductByUserId);
router.put('/products/update-amount/:productId', protect, updateProductAmount);

export default router;


// import express from 'express';
// import {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getProduct,
//   getProductByUserId,
//   updateProductAmount,
// } from '../controllers/productController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Rutas para tipos de valor
// router.post('/add-product', protect, addProduct);
// router.put('/update-product/:id', protect, updateProduct);
// router.delete('/delete-product/:id', protect, deleteProduct);
// router.get('/get-product/:id', protect, getProduct);
// router.get('/get-products/:idUsuario', protect, getProductByUserId);
// // router.put('/update-product-amount/:productId', protect, updateProductAmount);
// router.put('/update-product-amount/:productId', protect, updateProductAmount);


// export default router;
