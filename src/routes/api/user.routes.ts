import { Router } from 'express';
const router = Router();

// import controller
import { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;