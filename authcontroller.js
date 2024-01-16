import { comparepassward, hashpassward } from "../helpers/authhelpers.js";
import usermodel from "../models/user_model.js";
import Jwt from "jsonwebtoken";

export const registercontroler = async (req, res) => {
    try {
        const { name, email, passward, phone, address } = req.body

        if (!name) {
            return res.send({ error: "name is required" })
        }
        if (!email) {
            return res.send({ error: "email is required" })
        }
        if (!passward) {
            return res.send({ error: "passward is required" })
        }
        if (!phone) {
            return res.send({ error: "phone no is required" })
        }
        if (!address) {
            return res.send({ error: "address is required" })
        }

        const existinguser = await usermodel.findOne({ email })

        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'already register please login'
            })
        }
        const hashedpassward = await hashpassward(passward)

        const user = await new usermodel({
            name, email, phone, address, passward: hashedpassward
        }).save()
        res.status(201).send({
            success: true,
            message: 'user register succesfully',
            user
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        })
    }

}

export default registercontroler;

export const logincontroller = async (req, res) => {
    try {
        const { email, passward } = req.body;
        if (!email || !passward) {
            return res.status(404).send({
                success: false,
                message: "invalid username or passward"
            })
        }
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not registered"
            })

        }

        const match = await comparepassward(passward, user.passward)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid passward"
            })
        }
        const token = await Jwt.sign({ _id: user._id }, process.env.jwt_secret, { expiresIn: "10d" })
        res.status(200).send({
            success: true,
            message: "login succefully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        })
    }
}

export const testController = (req, res) => {
    res.send("protected route")
}