import { TOrder, TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $match: {},
    },
    {
      $project: { password: 0 },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $project: { password: 0 },
    },
  ]);
  return result;
};

const updateUserToDB = async (userId: number, user: TUser) => {
  const result = User.findOneAndUpdate({ userId }, user, { new: true });
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserFromDB,
  addOrderIntoUserInDB,
};
