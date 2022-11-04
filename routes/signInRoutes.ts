import express from "express";

import { signInRequest } from "../controller/SignInController";

const router = express.Router();

router.post("/signIn", signInRequest);

export default router;
