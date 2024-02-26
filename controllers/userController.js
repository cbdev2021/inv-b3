import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user.id);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // const user = await User.findByPk(req.user.id);

  // const user = await User.findByPk(req.id); //no funciona

  // await ProductInvoice.destroy({ where: { id: productId } });

  const user = await User.findOne({ where: { id: req.body.id  } });
                                              //id: req.id //mal request!!

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getHola = asyncHandler(async (req, res) => {
  res.json({ field: 'data inside the field' });
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getHola };



// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import generateToken from '../utils/generateToken.js';

// import jwt from 'jsonwebtoken';

// //const cookieParser = require('cookie-parser');
// import cookieParser from 'cookie-parser';

// // @desc    Auth user & get token
// // @route   POST /api/users/auth
// // @access  Public
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     const token = generateToken(user._id);

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: token, // Agrega el token JWT en la respuesta
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });




// // @desc    Register a new user
// // @route   POST /api/users
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {

//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   if (user) {
//     //generateToken(res, user._id);

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });


// // @desc    Logout user / clear cookie
// // @route   POST /api/users/logout
// // @access  Public

// // const logoutUser = (req, res) => {
// //   res.cookie('jwt', '', {
// //     httpOnly: true,
// //     expires: new Date(0),
// //   });
// //   res.status(200).json({ message: 'Logged out successfully' });
// // };


// // @desc    Logout user / clear JWT token
// // @route   POST /api/users/logout
// // @access  Public
// const logoutUser = (req, res) => {
//   // Clear the JWT token by setting it to null
//   req.user = null;

//   // You can also clear any other user-related data in the request if needed
//   // For example: req.userId = null;

//   res.status(200).json({ message: 'Logged out successfully' });
// };





// // @desc    Get user profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
  
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });


// const getHola = asyncHandler(async (req, res) => {
//   res.json({"field":"data inside the field"})
// });



// export {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   getHola
// };
