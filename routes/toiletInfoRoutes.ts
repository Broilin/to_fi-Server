import express from "express";

import { getToiletInfo, getPositionAll } from "../controller/toiletController";

const router = express.Router();

router.get("/info/:toiletId", getToiletInfo);

router.get("/position/all", getPositionAll);

export default router;
