import express from "express";

import { getInfo, getAllInfo, getRating } from "../controller/InfoController";

const router = express.Router();

router.get("/info/all", getAllInfo);

router.get("/info/:toiletId", getInfo);

router.get("/rating/:toiletId", getRating);

export default router;
