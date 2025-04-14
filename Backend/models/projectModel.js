import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: [true, "Project name should be in lowercase and unique"],
    },
    users: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user"
    }]
});


const User = mongoose.model("project", projectSchema);

export default User;