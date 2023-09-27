import UserModel from "../models/UserModel";
import bcrypt from 'bcrypt';

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

export const getUserByUsername = async (username: string) => {
    return await UserModel.findOne({ where: { username } });
};

export const updateUser = async (id: string, updatedData: UserData) => {
    const user = await UserModel.findByPk(id);
    if (user) {
        await user.update(updatedData);
        return user;
    }
    return null;
};
