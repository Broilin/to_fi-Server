import express from "express";

import bodyParser from "body-parser";

import path from "path";

const app = express();

const mapBuildPath = path.join(process.cwd(), "web-map", "build");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(mapBuildPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(mapBuildPath, "index.html"));
});

app.listen(3000);
