import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsersData);
router.get('/:userId', UserControllers.getUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.post('/:userId/orders', UserControllers.addOrder);
router.get('/:userId/orders', UserControllers.getAllOrdersOfUser);
router.get(
  '/:userId/orders/total-price',
  UserControllers.getTotalPricceOfOrders,
);
export const UserRoutes = router;
