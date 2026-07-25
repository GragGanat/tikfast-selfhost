const express = require("express");
const cors = require("cors");

const infoRoute = require("./routes/info");

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`TikFast API listening on port ${PORT}`);
});