import { Request, Response } from "express";

import pool from "../model/database/db";
import bcrypt from "bcrypt";

const saltRounds = 10;

const signUpRequest = async (req: Request, res: Response) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const result = pool
        .query('insert into public."user" (id, password) values($1, $2)', [
          req.body.id,
          hash,
        ])
        .then((result) => {
          res.json(JSON.stringify(result.rows));
        })
        .catch((err) => console.log(err));
      console.log(hash);
    });
  });
};

export { signUpRequest };
