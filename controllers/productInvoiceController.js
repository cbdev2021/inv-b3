import asyncHandler from 'express-async-handler';
import ProductInvoice from '../models/productInvoiceModel.js';
import Sequence from '../models/sequenceModel.js';

// @desc    Agregar un registro
// @route   POST /api/users/add-product-invoice
// @access  Private
const addProductInvoice = asyncHandler(async (req, res) => {
  // const { name, description, price, amount } = req.body;
  const { invoiceType, invoiceID, name, description, price, amount, dateIssue, utility } = req.body;
  const userId = req.user._id;

  try {
    const updatedSequence = await Sequence.findOneAndUpdate(
      { _id: 'sequenceProductId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newCorrelative = updatedSequence.sequence_value;

    const newProductInvoice = await ProductInvoice.create({
      idUsuario: userId,
      invoiceType: invoiceType,
      invoiceID: invoiceID,
      productId: newCorrelative,
      name: name,
      description: description,
      price: price,
      amount: amount,
      dateIssue: dateIssue,
      utility: utility
    });

    if (newProductInvoice) {
      res.status(201).json({ message: 'ProductInvoice agregado con éxito', data: newProductInvoice });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar ProductInvoice');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar ProductInvoice', error: error.message });
  }
});

// @desc    Actualizar un registro por ID
// @route   PUT /api/users/update-product-invoice/:id
// @access  Private
const updateProductInvoice = asyncHandler(async (req, res) => {
  const { description } = req.body;

  try {
    const productInvoice = await ProductInvoice.findById(req.params.id);

    if (productInvoice) {
      if (productInvoice.idUsuario.toString() === req.user._id.toString()) {
        productInvoice.description = description;

        const updatedProductInvoice = await productInvoice.save();
        res.json({ message: 'ProductInvoice actualizado con éxito', data: updatedProductInvoice });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este ProductInvoice');
      }
    } else {
      res.status(404);
      throw new Error('ProductInvoice no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ProductInvoice', error: error.message });
  }
});

// @desc    Eliminar un registro por ID
// @route   DELETE /api/users/delete-product-invoice/:id
// @access  Private
const deleteProductInvoice = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const removedProductInvoice = await ProductInvoice.removeById(productId);

  if (removedProductInvoice) {
    res.json({ message: 'ProductInvoice eliminado con éxito' });
  } else {
    res.status(404);
    throw new Error('ProductInvoice no encontrado');
  }
});

// @desc    Obtener un registro por ID
// @route   GET /api/users/get-product-invoice/:id
// @access  Private
const getProductInvoice = asyncHandler(async (req, res) => {
  try {
    const productInvoice = await ProductInvoice.findById(req.params.id);

    if (productInvoice) {
      if (productInvoice.idUsuario.toString() === req.user._id.toString()) {
        res.json(productInvoice);
      } else {
        res.status(403);
        throw new Error('No tienes permiso para acceder a este ProductInvoice');
      }
    } else {
      res.status(404);
      throw new Error('ProductInvoice no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ProductInvoice', error: error.message });
  }
});

// @desc    Obtener registros por ID de usuario
// @route   GET /api/users/get-products-invoice/:idUsuario
// @access  Private
const getProductByUserIdInvoice = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;

  try {
    const productInvoice = await ProductInvoice.find({ idUsuario: userId });

    if (productInvoice) {
      res.json(productInvoice);
    } else {
      res.status(404);
      throw new Error('No se encontraron ProductInvoice para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ProductInvoice', error: error.message });
  }
});

// @desc    Eliminar todos los registros por invoiceID
// @route   DELETE /api/users/delete-products-by-invoice/:invoiceID
// @access  Private
const deleteProductsByInvoiceID = asyncHandler(async (req, res) => {
  const invoiceID = req.params.invoiceID;
  const userId = req.user._id;

  try {
    const deletedProducts = await ProductInvoice.deleteMany({ idUsuario: userId, invoiceID: invoiceID });

    if (deletedProducts.deletedCount > 0) {
      res.json({ message: `Se eliminaron ${deletedProducts.deletedCount} ProductInvoice con invoiceID ${invoiceID}` });
    } else {
      res.status(404);
      throw new Error(`No se encontraron ProductInvoice con invoiceID ${invoiceID}`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ProductInvoice', error: error.message });
  }
});

export {
  addProductInvoice,
  updateProductInvoice,
  deleteProductInvoice,
  getProductInvoice,
  getProductByUserIdInvoice,
  deleteProductsByInvoiceID, // Agrega esta función al export para que esté disponible en las rutas
};