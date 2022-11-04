import express from "express";

import {
  getPreview,
  getReviewAll,
  postReview,
} from "../controller/ReviewController";

const router = express.Router();

router.get("/review/:toiletId", getPreview);

router.get("/review/all/:toiletId", getReviewAll);

router.post("/review/:toiletId", postReview);

export default router;
