import { Router } from "express";
const router = Router();
import { authCallback, getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";


router.get("/me", protectRoute, getMe);
router.post("/callback", authCallback);


export default router;
