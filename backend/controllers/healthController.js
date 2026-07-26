const config = require("../config");

function health(req, res) {

    res.json({

        success: true,

        status: "ok",

        app: "TikFast API",

        version: "0.1.0",

        environment: config.nodeEnv,

        uptime: Math.floor(process.uptime()),

        timestamp: new Date().toISOString()

    });

}

module.exports = {
    health
};