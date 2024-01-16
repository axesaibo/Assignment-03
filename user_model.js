import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: "String",
        require: true,
        trim: true
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    passward: {
        type: "String",
        require: true,

    },
    phone: {
        type: "string",
        required: true,
    },
    address: {
        type: "string",
        required: true,
    },
    role: {
        type: "number",
        default: 0
    },

}, { timestamps: true }
)
export default mongoose.model("Users", userschema)