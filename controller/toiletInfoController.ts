import { Request, Response } from "express";

import toiletInfo from "../model/toiletInfoModel";

const getToiletInfo = async (req: Request, res: Response) => {
  const id = Number(req.params.toiletId);
  const data = JSON.stringify(await toiletInfo.getInfoById(id));
  res.json(data);
};

export { getToiletInfo };
