import { Request, Response } from "express";

import pool from "../model/database/db";

const getInfo = async (req: Request, res: Response) => {
  const result = pool
    .query(
      `SELECT * FROM public."toiletInfo" WHERE id = '${req.params.toiletId}'`
    )
    .then(result => {
      res.json(JSON.stringify(result.rows));
    })
    .catch(err => console.log(err));
};

const getAllInfo = async (req: Request, res: Response) => {
  const result = pool
    .query('SELECT id, x, y, name FROM public."toiletInfo"')
    .then(result => res.json(JSON.stringify(result)))
    .catch(err => console.log(err));
};

export { getInfo, getAllInfo };
