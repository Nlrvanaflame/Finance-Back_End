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
interface updateUser{
    email?: string,
    password?:string
}

export const registerUser = async (userData: UserData) => {
    const  {username,email,date_joined} = userData
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await UserModel.create({ username,email, hashed_password: hashedPassword,date_joined });
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'm06tenden0n06ten') as JwtPayload;

        const userId = decoded.id;
        const username = decoded.username;

        if (!userId && !username) {
            throw new Error('Invalid token');
        }
        const user = await UserModel.findOne({ where: userId ? { id: userId } : { username } });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.log("Error from getUSerFromToken",error)
    }
};



export const updateUser = async (id: string, email: string, password: string) => {
    const user = await UserModel.findByPk(id);
    if (!user) {
        return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ email, hashed_password: hashedPassword });
    return user;
};