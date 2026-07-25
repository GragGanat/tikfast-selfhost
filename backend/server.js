const express = require("express");
const cors = require("cors");

const infoRoute = require("./routes/info"); // Import the route

const app = express();

app.use(cors());
app.use(express.json());

// Use the route
app.use("/api", infoRoute);

app.get("/", (req, res) => {
    res.json({
        app: "TikFast API",
        status: "running"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`TikFast API listening on port ${PORT}`);
});