import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Invoice = sequelize.define('Invoice', {
    invoiceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invoiceType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateIssue: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    taxes: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentSell: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentBuy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default Invoice;

// import mongoose from 'mongoose';

// const invoiceSchema = mongoose.Schema(
//   {
//     invoiceID: {
//       type: Number,
//       required: true,
//     },
//     // purchaseId: {
//     //   type: Number,
//     //   required: false,
//     // },
//     // saleId: {
//     //   type: Number,
//     //   required: false,
//     // },
//     invoiceType: {
//       type: String,
//       required: true,
//     },
//     idUsuario: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Hace referencia al modelo de usuario
//       required: true,
//     },
//     dateIssue: {
//       type: Date,
//       required: true,
//     },
//     subTotal: {
//       type: Number,
//       required: false,
//     },
//     taxes: {
//       type: Number,
//       required: false,
//     },

//     //Venta
//     customer: {
//       type: String,
//       required: false,
//     },
//     paymentSell: {
//       type: String,
//       required: false,
//     },

//     //Compra
//     provider: {
//       type: String,
//       required: false,
//     },
//     paymentBuy: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Invoice = mongoose.model('Invoice', invoiceSchema);

// export default Invoice;
