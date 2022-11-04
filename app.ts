import express from "express";

import bodyParser from "body-parser";

import path from "path";

import toiletInfoRouter from "./routes/toiletInfoRoutes";
import toiletReviewRouter from "./routes/toiletReviewRoutes";
import signUpRouter from "./routes/signUpRoutes";
import signInRouter from "./routes/signInRoutes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mapBuildPath = path.join(process.cwd(), "web-map", "build");
app.use(express.static(mapBuildPath));

app.use(toiletInfoRouter);

app.use(toiletReviewRouter);

app.use(signUpRouter);

app.use(signInRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(mapBuildPath, "index.html"));
});

app.listen(3000);
