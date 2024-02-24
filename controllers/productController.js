import db from '../config/db.js';
import asyncHandler from 'express-async-handler';

// const Product = db.Product;
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility } = req.body;
  //const userId = req.user.id;

  try {
    // Crea un nuevo producto en la base de datos
    const newProduct = await Product.create({
      //userId: userId,
      name: name,
      description: description,
      price: price,
      amount: amount,
      utility: utility
    });

    res.status(201).json({ message: 'Producto agregado con éxito', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto', error: error.message });
  }
});

// Función para actualizar un producto por su ID
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility } = req.body;
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
  const productId = req.params.id;

  try {
    // Elimina el producto por su ID
    await Product.destroy({ where: { id: productId } });

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
  const userId = req.params.idUsuario;

  try {
    // Busca todos los productos del usuario por su ID
    const products = await Product.findAll({ where: { userId: userId } });

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




// version mongodb
// import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';
// import Sequence from '../models/sequenceModel.js';

// const addProduct = asyncHandler(async (req, res) => {

//   const { name, description, price, amount, utility } = req.body;

//   const userId = req.user._id;

//   try {
//     // Encuentra y actualiza el documento de la secuencia, incrementando el valor en 1
//     const updatedSequence = await Sequence.findOneAndUpdate(
//       { _id: "sequenceProductId" },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     // El valor actualizado de la secuencia es el nuevo correlativo
//     const newCorrelative = updatedSequence.sequence_value;

//     // Crear el nuevo producto con el correlativo actualizado
//     const newProduct = await Product.create({
//       idUsuario: userId,
//       productId: newCorrelative,
//       name: name,
//       description: description,
//       price: price,
//       amount: amount,
//       utility: utility
//       //idUsuario: idUsuario
//     });

//     if (newProduct) {
//       res.status(201).json({ message: 'Product agregado con éxito', data: newProduct });
//     } else {
//       res.status(400);
//       throw new Error('No se pudo agregar Product');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al agregar Product', error: error.message });
//   }
// });

// // @desc    Actualizar un registro por ID
// // @route   PUT /api/users/update-type-values/:id
// // @access  Private
// const updateProduct = asyncHandler(async (req, res) => {
//   //const { typevalue, subtype, description } = req.body;
//   const { name, description, price, amount, utility } = req.body;

//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         product.name = name;
//         product.description = description;
//         product.price = price;
//         product.amount = amount;
//         product.utility = utility;

//         const updatedProduct = await product.save();
//         res.json({ message: 'Product actualizado con éxito', data: updatedProduct });
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para actualizar este Product');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Product no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar Product', error: error.message });
//   }
// });

// // @desc    Eliminar un registro por ID
// // @route   DELETE /api/users/delete-type-values/:id
// // @access  Private
// const deleteProduct = asyncHandler(async (req, res) => {
//   const productId = req.params.id;

//   const removedProduct = await Product.removeById(productId);

//   if (removedProduct) {
//     res.json({ message: 'Product eliminado con éxito' });
//   } else {
//     res.status(404);
//     throw new Error('Product no encontrado');
//   }
// });

// // @desc    Obtener un registro por ID
// // @route   GET /api/users/get-type-values/:id
// // @access  Private
// const getProduct = asyncHandler(async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         res.json(product);
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para acceder a este Product');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Product no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener el Product', error: error.message });
//   }
// });

// // @desc    Obtener registros por ID de usuario
// // @route   GET /api/users/get-type-values/:idUsuario
// // @access  Private
// const getProductByUserId = asyncHandler(async (req, res) => {
//   const userId = req.params.idUsuario;

//   try {
//     const product = await Product.find({ idUsuario: userId });

//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404);
//       throw new Error('No se encontraron Product para este usuario');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener los Product', error: error.message });
//   }
// });

// const updateProductAmount = asyncHandler(async (req, res) => {
//   // const { typevalue, amount, productId } = req.body; //1
//   const { typevalue, amount } = req.body;

//   try {
//     // const product = await Product.findOne({ productId: productId }); //1
//     const product = await Product.findOne({ productId: req.params.productId });

//     if (product) {
//       if (product.idUsuario.toString() === req.user._id.toString()) {
//         // Verificar si typevalue es "Sales", "Purchase" o "SaveAmount"
//         if (typevalue === "Sales" || typevalue === "Purchase" || typevalue === "SaveAmount") {
//           // Convertir amount a número
//           const numericAmount = parseFloat(amount);

//           // Verificar si es un número válido
//           if (!isNaN(numericAmount)) {
//             // Operación según el tipo de valor
//             if (typevalue === "Sales" || typevalue === "Purchase") {
//               product.amount += (typevalue === "Sales" ? -numericAmount : numericAmount);
//             } else if (typevalue === "SaveAmount") {
//               // Actualizar el valor de "amount" directamente
//               product.amount = numericAmount;
//             }
//           } else {
//             res.status(400);
//             throw new Error('amount no es un número válido');
//           }

//           const updatedProduct = await product.save();
//           res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
//         } else {
//           // Manejar otro caso si es necesario
//           res.status(400);
//           throw new Error('typevalue no es válido');
//         }
//       } else {
//         res.status(403);
//         throw new Error('No tienes permiso para actualizar este producto');
//       }
//     } else {
//       res.status(404);
//       throw new Error('Producto no encontrado');
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//   }

// });

// export {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getProduct,
//   getProductByUserId,
//   updateProductAmount
// };