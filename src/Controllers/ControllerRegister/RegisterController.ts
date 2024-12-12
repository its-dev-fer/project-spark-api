import { Request, Response } from "express";
import User from '../../db/Models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from "../../Types/models";

interface RegisterUser {
  email: string;
  password: string;
  name: string;
}

interface UserPayload {
  id: number;
  email: string;
  name: string;
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name }: RegisterUser = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      plan_id: 1,
    });

    const userPayload: UserPayload = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    const token = jwt.sign(
      userPayload,
      process.env.SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    return res.json({ token, user: userPayload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export { registerUser };