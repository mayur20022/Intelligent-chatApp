import userModel from "../models/userModel.js";


export const createUser = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and Password are required")

    const hashedPass = await userModel.hasPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPass
    });


    return user
}

export const loginUser = async ({ email, password }) => {
    
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.isValidPassword(password);
    console.log(isMatch);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    
    return user;
}

export const Allusers = async ({userId}) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    })    
    return users;
 }