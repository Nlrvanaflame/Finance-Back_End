import { Request, Response } from 'express';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';


const SECRET = 'm06tenden0n06ten';

export const register = async (req: Request, res: Response) => {
  try {
    const userData = {
      ...req.body,
      date_joined: new Date()
    }

    const user = await userService.registerUser(userData);
    res.status(201).json(user);
  } catch(error) {
    res.status(500).json({message: 'An error has occurred', error: (error as Error).message});
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
  
        const user = await userService.loginUser(email, password);
  
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
  
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
            expiresIn: '1h'
        });
  
        res.send({ token });
    } catch(error) {
        res.status(500).json({message: 'An error has occurred', error: (error as Error).message});
    }
};


export const logout = async (req: Request, res: Response) => {
    res.send({ message: "User logged out successfully" });
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateUser(req.body.id, req.body);
    if (updated) res.json(updated);
    else res.status(404).send('User not found');
  } catch(error) {
    res.status(500).json({message: 'An error has occurred', error: (error as Error).message});
  }
};
