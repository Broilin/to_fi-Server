import { Request, Response } from "express";

const postReview = async (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(201);
};

export { postReview };
