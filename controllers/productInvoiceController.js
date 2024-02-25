import asyncHandler from 'express-async-handler';
import ProductInvoice from '../models/productInvoiceModel.js';

const addProductInvoice = asyncHandler(async (req, res) => {
  const {
    idUsuario,
    invoiceType,
    invoiceID,
    productId,
    name,
    description,
    price,
    amount,
    dateIssue,
    utility
  } = req.body;

  try {
    const newProductInvoice = await ProductInvoice.create({
      idUsuario,
      invoiceType,
      invoiceID,
      productId,
      name,
      description,
      price,
      amount,
      dateIssue,
      utility
    });

    res.status(201).json({ message: 'Factura de producto agregada con éxito', data: newProductInvoice });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la factura de producto', error: error.message });
  }
});

const updateProductInvoice = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility } = req.body;
  const productId = req.params.id;

  try {
    const productInvoice = await ProductInvoice.findByPk(productId);

    if (!productInvoice) {
      res.status(404);
      throw new Error('Factura de producto no encontrada');
    }

    productInvoice.name = name;
    productInvoice.description = description;
    productInvoice.price = price;
    productInvoice.amount = amount;
    productInvoice.utility = utility;

    const updatedProductInvoice = await productInvoice.save();

    res.json({ message: 'Factura de producto actualizada con éxito', data: updatedProductInvoice });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la factura de producto', error: error.message });
  }
});

const deleteProductInvoice = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    await ProductInvoice.destroy({ where: { id: productId } });

    res.json({ message: 'Factura de producto eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la factura de producto', error: error.message });
  }
});

const getProductInvoice = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const productInvoice = await ProductInvoice.findByPk(productId);

    if (!productInvoice) {
      res.status(404);
      throw new Error('Factura de producto no encontrada');
    }

    res.json(productInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura de producto', error: error.message });
  }
});

const getProductInvoiceByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;

  try {
    const productInvoices = await ProductInvoice.findAll({ where: { idUsuario: userId } });

    res.json(productInvoices);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las facturas de producto', error: error.message });
  }
});

export {
  addProductInvoice,
  updateProductInvoice,
  deleteProductInvoice,
  getProductInvoice,
  getProductInvoiceByUserId,
};

 