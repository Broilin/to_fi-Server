import express from "express";

import { signUpRequest } from "../controller/SignUpController";

const router = express.Router();

router.post("/signUp", signUpRequest);

export default router;
