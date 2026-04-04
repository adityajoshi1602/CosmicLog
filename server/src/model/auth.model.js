const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username must be at most 20 characters"],
        match: [/^[a-z0-9_]+$/, "Username can only contain letters, numbers, underscore"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true });

const usermodel = mongoose.model('user', userSchema)

module.exports = usermodel