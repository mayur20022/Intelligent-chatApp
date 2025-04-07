import User from "../models/userModel.js";


export const createUser = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and Password are required")

    const hashedPass = await User.hasPassword(password);

    const user = await User.create({
        email,
        password: hashedPass
    });
    return user
}