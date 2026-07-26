require("dotenv").config();

const express = require("express");
const cors = require("cors");

const config = require("./config");

const infoRoute = require("./routes/info");
const healthRoute = require("./routes/health");
const errorHandler = require("./middlewares/errorHandler"); // 1. Import errorHandler

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        app: "TikFast API",
        status: "running"
    });
});

app.use("/api", infoRoute);
app.use("/api", healthRoute);

app.use(errorHandler); // 2. Place it AFTER all routes


// 3. Keep only ONE app.listen using config.port
app.listen(config.port, () => {
    console.log(`TikFast API listening on port ${config.port}`);
});