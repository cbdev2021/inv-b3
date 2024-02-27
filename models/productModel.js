import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Importa la instancia de Sequelize

const Product = sequelize.define('Product', { // Utiliza sequelize.define para definir el modelo
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,  //ya que la base lo creará
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,

    //allowNull: false,
    // primaryKey: true,
    // autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  utility: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Product;



// import { DataTypes } from 'sequelize';
// import db from '../config/db.js'; // Asegúrate de que la ruta sea correcta

// const Product = db.define('Product', {
//   idUsuario: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   productId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   amount: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   utility: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
// }, {
//   timestamps: true,
// });

// export default Product;











// import { Sequelize, DataTypes } from 'sequelize';
// import db from '../config/database.js';

// const Product = db.define('Product', {
//   idUsuario: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   productId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   amount: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   utility: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
// }, {
//   timestamps: true,
// });

// export default Product;


// import mongoose from 'mongoose';

// const productSchema = mongoose.Schema(
//   {
//     idUsuario: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Hace referencia al modelo de usuario
//       required: true,
//     },
//     productId: {
//       type: Number,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: false,
//     },
//     description: {
//       type: String,
//       required: false,
//     },
//     price: {
//       type: Number,
//       required: false,
//     },
//     amount: {
//       type: Number,
//       required: false,
//     },
//     utility: {
//       type: Number,
//       required: false,
//     },
//     // subtype: {
//     //   type: String,
//     //   required: true,
//     // },
//     // description: {
//     //   type: String,
//     //   required: true,
//     // },

//   },
//   {
//     timestamps: true,
//   }
// );

// // Método para eliminar registros por ID
// productSchema.statics.removeById = async function (productId) {
//   return this.findByIdAndRemove(productId);
// };

// const Product = mongoose.model('Product', productSchema);

// export default Product;
