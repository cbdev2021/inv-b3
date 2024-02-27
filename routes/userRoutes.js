import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getHola
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', authUser);
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  // .put(protect, updateUserProfile);
  .put(updateUserProfile);

router.get('/hola', getHola);

export default router;



// import express from 'express';
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   getHola
// } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';


// const router = express.Router();

// router.post('/', registerUser);
// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
  
// router.get('/hola', getHola);

// export default router;
