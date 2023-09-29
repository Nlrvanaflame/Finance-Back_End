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

export const getUser = async (req: Request, res: Response) => {
  try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
          return res.status(401).json({ message: 'Authorization header is required' });
      }

      const token = authHeader.split(' ')[1];  // Assuming Bearer token is used

      if (!token) {
          return res.status(401).json({ message: 'Token is required' });
      }

      // Fetch user from the token
      const user = await userService.getUserFromToken(token);

      // Send back the user data
      return res.status(200).json(user);
  } catch (error) {
      if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: 'An unexpected error occurred' });
  }
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
