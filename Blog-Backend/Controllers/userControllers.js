import { userModel } from "../Model/userModel.js";

export const register = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;

        const User = await userModel.create({
            name, email, password, role
        });

        return res.status(200).json({
            success: true,
            message: User
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

export const login = (req, res) => {
    res.send("This is Login Routes")
}