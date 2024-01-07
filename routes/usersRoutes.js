import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUser } from '../controllers/userController.js';
// import { handleWithdraw } from '../controllers/userController.js';
// import { depositCashController } from '../controllers/userController.js';
const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUser);

//route for depositing cash
// router.put('/deposit/:userId', depositCashController);

// router.post('/:id/withdraw', async (req, res) => {
//     const { id } = req.params;
//     const { amount } = req.body;
  
//     try {
//       const updatedUser = await handleWithdraw(id, amount);
//       res.status(200).json({ message: 'Withdrawal successful', user: updatedUser });
//     } catch (error) {
//       res.status(400).json({ message: 'Withdrawal failed', error: error.message });
//     }
//   });
  

export default router;
