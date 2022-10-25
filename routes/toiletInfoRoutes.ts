import express from "express";

import { getInfo, getAllInfo } from "../controller/InfoController";

const router = express.Router();

router.get("/info/all", getAllInfo);

router.get("/info/:toiletId", getInfo);

export default router;
