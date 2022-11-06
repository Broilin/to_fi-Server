import { Request, Response } from "express";
import pool from "../model/database/db";

const getPreview = async (req: Request, res: Response) => {
  pool
    .query(
      'SELECT * FROM public."review" WHERE toiletinfo_id = $1 ORDER BY id DESC limit 3',
      [req.params.toiletId]
    )
    .then(result => {
      const reviews = JSON.stringify(result.rows);
      res.json(reviews ? reviews : []);
    })
    .catch(err => console.log(err));
};

const getReviewAll = async (req: Request, res: Response) => {
  pool
    .query(`SELECT * FROM public."review" WHERE id = '${req.params.toiletId}'`)
    .then(result => {
      res.json(JSON.stringify(result.rows));
    })
    .catch(err => console.log(err));
};

const postReview = async (req: Request, res: Response) => {
  const curr = new Date();
  const krTimeDiff = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const krDate = new Date(utc + krTimeDiff);
  console.log(req.params.toiletId);
  pool.query("select count(id) from review").then(result => {
    const newId = (+result.rows[0].count + 1).toString();
    newId.padStart(10, "0");
    pool.query(
      'insert into public."review" (id, user_id, toiletinfo_id, content, date, rating) values($1, $2, $3, $4, $5, $6)',
      [
        newId,
        "asdf",
        req.params.toiletId,
        req.body.content,
        `${krDate.getFullYear()}-${krDate.getMonth() + 1}-${krDate.getDate()}`,
        req.body.rating,
      ]
    );
  });

  res.sendStatus(201);
};

export { postReview, getPreview, getReviewAll };
