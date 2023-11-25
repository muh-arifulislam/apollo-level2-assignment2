import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';

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
