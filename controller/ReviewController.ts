import { json } from "body-parser";
import { query, Request, Response } from "express";
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
    .query('SELECT * FROM public."review" WHERE toiletinfo_id = $1', [
      req.params.toiletId,
    ])
    .then(result => {
      console.log(result);
      res.json(JSON.stringify(result.rows));
      console.log(1);
    })
    .catch(err => console.log(err));
};

const postReview = async (req: Request, res: Response) => {
  const curr = new Date();
  const krTimeDiff = 9 * 60 * 60 * 1000;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const krDate = new Date(utc + krTimeDiff);

  await pool.query("select count(id) from review").then(result => {
    const newId = (+result.rows[0].count + 1).toString();
    newId.padStart(10, "0");
    pool.query(
      'insert into public."review" (id, user_id, toiletinfo_id, content, date, rating) values($1, $2, $3, $4, $5, $6)',
      [
        newId,
        "asdf",
        req.params.toiletId,
        req.body.content ? req.body.content : "",
        `${krDate.getFullYear()}-${krDate.getMonth() + 1}-${krDate.getDate()}`,
        req.body.rating,
      ]
    );
  });

  await pool
    .query('SELECT AVG(rating) FROM public."review" WHERE toiletinfo_id=$1', [
      req.params.toiletId,
    ])
    .then(result => {
      const newRating = (+result.rows[0].avg).toFixed(1);
      pool
        .query('UPDATE public."toiletInfo" SET rating=$1 WHERE id=$2', [
          newRating,
          req.params.toiletId,
        ])
        .then(() => console.log("success"));
    })
    .catch(() => res.sendStatus(202));
  res.sendStatus(201);
};

export { postReview, getPreview, getReviewAll };
