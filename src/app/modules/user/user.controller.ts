import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import User from './user.model';

const createUser = async (req: Request, res: Response) => {
  const { user: userData } = req.body;
  try {
    //validate user data
    const validatedData = userValidationSchema.parse(userData);

    // generate hashed password & replace it with user provided passowrd
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    //store data in database
    const result = await UserServices.createUserIntoDB(validatedData as TUser);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};

const getAllUsersData = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All user data retrive successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getSingleUserFromDB(userId);
      return res.status(200).json({
        sucess: true,
        message: 'User fetched successfully',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something going wrong',
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { user: userData } = req.body;
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    //validate user data
    const validatedData = userValidationSchema.parse(userData);

    // generate hashed password & replace it with user provided passowrd
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    if (await User.isUserExists(userId)) {
      const result = await UserServices.updateUserToDB(userId, validatedData);
      res.status(200).json({
        success: true,
        message: 'User Updated successfully',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    if (await User.isUserExists(userId)) {
      await UserServices.deleteUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  const { order: orderData } = req.body;
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    if (await User.isUserExists(userId)) {
      await UserServices.addOrderIntoUserInDB(userId, orderData);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};
const getAllOrdersOfUser = async (req: Request, res: Response) => {
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getAllOrdersOfUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};
const getTotalPricceOfOrders = async (req: Request, res: Response) => {
  const { userId: userIdInput } = req.params;
  const userId = parseInt(userIdInput);
  try {
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getTotalPriceOfUserOrdersFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: result,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'something is going wrong',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsersData,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrdersOfUser,
  getTotalPricceOfOrders,
};
