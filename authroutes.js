import express from "express";
import {
    registercontroler,
    logincontroller,
    testController,
} from "../controler/authcontroller.js"

import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";


const router = express.Router();

router.post("/register", registercontroler)

router.post("/login", logincontroller)

router.get("/test", requireSignIn, isAdmin, testController)



export default router;