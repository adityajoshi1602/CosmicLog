const User = require('../model/auth.model')
const bcrypt = require('bcryptjs')

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password required" });
        }

        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            msg: "User registered",
            userId: user._id
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = { register }