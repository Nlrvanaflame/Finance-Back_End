import UserModel from "../models/UserModel";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserData {
    id?: string;
    username: string;
    password: string;
    email: string;
    date_joined?: Date;
 
}

export const registerUser = async (userData: UserData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await UserModel.create({ ...userData, hashed_password: hashedPassword });
};

export const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    console.log('Password:', password);
    console.log('Hashed password:', user.hashed_password);
    const isPasswordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordMatch) return null;

    return user; 
};

export const getUserFromToken = async (token: string) => {
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'm06tenden0n06ten') as JwtPayload;

        // Check if ID or username is in the token
        const userId = decoded.id;
        const username = decoded.username;

        if (!userId && !username) {
            throw new Error('Invalid token');
        }

        // Fetch the user based on ID or username
        const user = await UserModel.findOne({ where: userId ? { id: userId } : { username } });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.log("Error from getUSerFromToken",error)
    }
};



export const updateUser = async (id: string, updatedData: UserData) => {
    const user = await UserModel.findByPk(id);
    if (user) {
        await user.update(updatedData);
        return user;
    }
    return null;
};
