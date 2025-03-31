import { generateToken } from "../config/generatTocken.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        

        const newUser = await User.create({
            name,
            email,
            password,
            
            
        })

       if (newUser) {
        generateToken(newUser._id, res)
        res.status(201).json({ data: newUser, message: "User registered successfully" });
       
       } else {
        res.status(400).json({ error: "Invalid user data" });
       }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        generateToken(user._id, res)
        res.status(200).json({ data: user, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ data: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message  });
    }
}