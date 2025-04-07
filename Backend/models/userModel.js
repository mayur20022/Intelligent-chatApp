import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema({
    // name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [6, "Email must be at least 6 characters long"],
        maxLength: [50, "Email must not be longer then 50 characters"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})

userSchema.starics.hasPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

userSchema.methods.isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateJWT = () => {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET)
}


const User = mongoose.model("User", userSchema)

export default User