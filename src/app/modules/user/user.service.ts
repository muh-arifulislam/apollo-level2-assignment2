import { TOrder, TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  const sanitizedUserData = User.findOne({ userId: result.userId }).select(
    '-password',
  );
  return sanitizedUserData;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    'username fullName age email address -_id',
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select('-password');
  return result;
};

const updateUserToDB = async (userId: number, user: Partial<TUser>) => {
  const result = User.findOneAndUpdate({ userId }, user, { new: true }).select(
    '-password',
  );
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = User.findOneAndDelete({ userId });
  return result;
};

const addOrderIntoUserInDB = async (userId: number, order: TOrder) => {
  const result = User.updateOne({ userId }, { $addToSet: { orders: order } });
  return result;
};

const getAllOrdersOfUserFromDB = async (userId: number) => {
  const result = User.findOne({ userId }).select('orders -_id');
  return result;
};

const getTotalPriceOfUserOrdersFromDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
      },
    },
    {
      $project: {
        totalAmount: '$total',
      },
    },
  ]);
  if (result.length > 0) {
    const totalAmount = result[0].totalAmount;
    return totalAmount;
  } else {
    return 0;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserFromDB,
  addOrderIntoUserInDB,
  getAllOrdersOfUserFromDB,
  getTotalPriceOfUserOrdersFromDB,
};
