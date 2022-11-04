import { Request, Response } from "express";

import pool from "../model/database/db";
import bcrypt from "bcrypt";

const saltRounds = 10;

const signInRequest = async (req: Request, res: Response) => {
  const result = pool
    .query('select * from public."user" where id = $1', [req.body.id])
    .then((queryResult) => {
      bcrypt.compare(
        req.body.password,
        queryResult.rows[0].password,
        function (err, compResult) {
          if (compResult === true) {
            console.log(queryResult.rows[0]);
            res.json(JSON.stringify(queryResult.rows[0]));
          }
        }
      );
    })
    .catch((err) => console.log(err));
};

export { signInRequest };
