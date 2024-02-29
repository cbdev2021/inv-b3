import db from '../config/db.js';
import asyncHandler from 'express-async-handler';

// const Product = db.Product;
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility, idUsuario } = req.body;
  //const userId = req.user.id;

  try {
    // Crea un nuevo producto en la base de datos
    const newProduct = await Product.create({
      //userId: userId,
      name: name,
      description: description,
      price: price,
      amount: amount,
      utility: utility,
      idUsuario: idUsuario
    });

    res.status(201).json({ message: 'Producto agregado con éxito', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto', error: error.message });
  }
});

// Función para actualizar un producto por su ID
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility, idUsuario} = req.body;
  const productId = req.params.id;

  try {
    // Encuentra el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado');
    }

    // Actualiza el producto con los nuevos datos
    product.name = name;
    product.description = description;
    product.price = price;
    product.amount = amount;
    product.utility = utility;

    const updatedProduct = await product.save();

    res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

// Función para eliminar un producto por su ID
const deleteProduct = asyncHandler(async (req, res) => {
  // const productId = req.params.id;
  const id = req.params.id;

  try {
    // Elimina el producto por su ID
    // await Product.destroy({ where: { productId: productId } });
    await Product.destroy({ where: { id: id } });

    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

// Función para obtener un producto por su ID
const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    // Busca el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado');
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
});

// Función para obtener todos los productos de un usuario por su ID
const getProductByUserId = asyncHandler(async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    // Busca todos los productos del usuario por su ID
    const products = await Product.findAll({ where: { idUsuario: idUsuario } });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
});

// Función para actualizar la cantidad de un producto por su ID
const updateProductAmount = asyncHandler(async (req, res) => {
  const { typevalue, amount } = req.body;
  const productId = req.params.id;

  try {
    // Busca el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado');
    }

    // Actualiza la cantidad del producto según el tipo de valor
    if (typevalue === "Sales" || typevalue === "Purchase" || typevalue === "SaveAmount") {
      const numericAmount = parseFloat(amount);

      if (isNaN(numericAmount)) {
        res.status(400);
        throw new Error('La cantidad no es un número válido');
      }

      if (typevalue === "Sales" || typevalue === "Purchase") {
        product.amount += (typevalue === "Sales" ? -numericAmount : numericAmount);
      } else if (typevalue === "SaveAmount") {
        product.amount = numericAmount;
      }

      const updatedProduct = await product.save();
      res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
    } else {
      res.status(400);
      throw new Error('El tipo de valor no es válido');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  updateProductAmount
};