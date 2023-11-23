import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  const { user: userData } = req.body;
  try {
    const result = await UserServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
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

export const UserControllers = {
  createUser,
  getAllUsersData,
};
