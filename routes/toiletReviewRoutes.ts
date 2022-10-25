import express from "express";

import { postReview } from "../controller/ReviewController";

const router = express.Router();

router.post("/review/:toiletId", postReview);

export default router;
