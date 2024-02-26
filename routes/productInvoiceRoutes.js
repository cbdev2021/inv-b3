import express from 'express';
import {
  addProductInvoice,
  updateProductInvoice,
  deleteProductInvoice,
  getProductInvoice,
  getProductInvoiceByUserId,
  getProductByUserIdInvoice,
  deleteProductsByInvoiceID,
} from '../controllers/productInvoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/product-invoices/add', protect, addProductInvoice);
// router.put('/product-invoices/update/:id', protect, updateProductInvoice);
// router.delete('/product-invoices/delete/:id', protect, deleteProductInvoice);
// router.get('/product-invoices/get/:id', protect, getProductInvoice);
// router.get('/product-invoices/get-by-user/:idUsuario', protect, getProductInvoiceByUserId);

router.post('/add-product-invoice',  addProductInvoice);
router.put('/update-product-invoice/:id', updateProductInvoice);
// router.delete('/delete-product-invoice/:id', deleteProductInvoice); invoiceID
router.delete('/delete-product-invoice/:invoiceID', deleteProductInvoice); 
router.get('/get-product-invoice/:id', getProductInvoice);
router.get('/get-products-invoice/:idUsuario', getProductByUserIdInvoice);
router.delete('/delete-products-invoice-id/:invoiceID', deleteProductsByInvoiceID);


export default router;

// import express from 'express';
// import {
//   addProductInvoice,
//   updateProductInvoice,
//   deleteProductInvoice,
//   getProductInvoice,
//   getProductByUserIdInvoice,
//   deleteProductsByInvoiceID,
// } from '../controllers/productInvoiceController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Rutas para tipos de valor
// router.post('/add-product-invoice', protect, addProductInvoice);
// router.put('/update-product-invoice/:id', protect, updateProductInvoice);
// // router.delete('/delete-product-invoice/:id', protect, deleteProductInvoice); invoiceID
// router.delete('/delete-product-invoice/:invoiceID', protect, deleteProductInvoice); 
// router.get('/get-product-invoice/:id', protect, getProductInvoice);
// router.get('/get-products-invoice/:idUsuario', protect, getProductByUserIdInvoice);
// router.delete('/delete-products-invoice-id/:invoiceID', protect, deleteProductsByInvoiceID);

// export default router;
