import Router from "express";
import { getAllUsers,
   userRegister,
   userLogin,
   userLogout  } from "../controllers/user.controller.js"

const router = Router()

router.get("/all-user",getAllUsers);
router.post("/register",userRegister);
router.post("/login",userLogin);
router.post("/logout",userLogout);

export default router