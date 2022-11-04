import { Request, Response } from "express";
import pool from "../model/database/db";

const postReview = async (req: Request, res: Response) => {
  const curr = new Date();
  const krTimeDiff = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const krDate = new Date(utc + krTimeDiff);
  console.log(krDate);
  pool
    .query("select count(id) from review")
    .then(result =>
      pool.query(
        'insert into public."review" (id, user_id, toiletinfo_id, content, date, rating) values($1, $2, $3, $4, $5, $6)',
        [
          `${+result.rows[0].count + 1}`,
          "asdf",
          req.params.toiletId,
          req.body.content,
          `${krDate.getFullYear()}-${
            krDate.getMonth() + 1
          }-${krDate.getDate()}`,
          req.body.rating,
        ]
      )
    );

  res.sendStatus(201);
};

export { postReview };
