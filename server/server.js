require("./config/config");
import "zone.js/dist/zone-node";
import "reflect-metadata";

import { join } from "path";

import { enableProdMode } from "@angular/core";

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");

const { router } = require("./routes/routes");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require("../dist/server/main");

// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

const DIST_FOLDER = join(process.cwd(), "dist");
app.use(express.static(join(DIST_FOLDER, "browser")));

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));

app.use("/routes", router);
app.use("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "./../dist/index.html"));
  res.render("index", { req });
});

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
