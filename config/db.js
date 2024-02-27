import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Importa mysql2 utilizando la sintaxis de importación

const sequelize = new Sequelize('bf4i4aiupjmeu75cexyd', 'utjhsbejjehli2uf', 'jvc9UkL8YeyokqxKMPLW', {
  host: 'bf4i4aiupjmeu75cexyd-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  dialectModule: mysql2 // Utiliza la variable mysql2 directamente en lugar de require
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default sequelize;




// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('bf4i4aiupjmeu75cexyd', 'utjhsbejjehli2uf', 'jvc9UkL8YeyokqxKMPLW', {
//   host: 'bf4i4aiupjmeu75cexyd-mysql.services.clever-cloud.com',
//   dialect: 'mysql',
//   dialectModule: require('mysql2') //prueba
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Sincronizar los modelos con la base de datos
// //db.sequelize.sync({ force: true }); // Esta opción fuerza la creación de las tablas


// export default sequelize; 



// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('bf4i4aiupjmeu75cexyd', 'utjhsbejjehli2uf', 'jvc9UkL8YeyokqxKMPLW', {
//   host: 'bf4i4aiupjmeu75cexyd-mysql.services.clever-cloud.com',
//   dialect: 'mysql',
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// export default db;



// import mysql from 'mysql';

// const connectDB = async () => {
//   try {
//     const conn = mysql.createConnection({
//       host: 'bf4i4aiupjmeu75cexyd-mysql.services.clever-cloud.com',
//       user: 'utjhsbejjehli2uf',
//       password: 'jvc9UkL8YeyokqxKMPLW',
//       database: 'bf4i4aiupjmeu75cexyd',
//     });

//     conn.connect((err) => {
//       if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return;
//       }
//       console.log('Connected to MySQL database');
//     });
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;













// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
