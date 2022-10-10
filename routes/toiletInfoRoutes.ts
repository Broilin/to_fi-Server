import express from "express";

import { getToiletInfo } from "../controller/toiletInfoController";

const router = express.Router();

router.get("/info/:toiletId", getToiletInfo);

export default router;
