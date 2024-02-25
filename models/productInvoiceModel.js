import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProductInvoice = sequelize.define('ProductInvoice', {
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  invoiceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoiceID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateIssue: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  utility: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default ProductInvoice;

// import mongoose from 'mongoose';

// const productInvoiceSchema = mongoose.Schema(
//   {
//     idUsuario: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Hace referencia al modelo de usuario
//       required: true,
//     },
//     invoiceType: {
//       type: String,
//       required: true,
//     },
//     invoiceID: {
//       type: Number,
//       required: true,
//     },
//     productId: {
//       type: Number,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     dateIssue: {
//       type: Date,
//       required: true,
//     },
//     utility: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Método para eliminar registros por ID
// productInvoiceSchema.statics.removeById = async function (productId) {
//   return this.findByIdAndRemove(productId);
// };

// const ProductInvoice = mongoose.model('ProductInvoice', productInvoiceSchema);

// export default ProductInvoice;
