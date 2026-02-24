require("rootpath")();
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const errorHandler = require("_middleware/error-handler");
const allowlist = require("./_config/allow_domain.json");
const routes = require("./routes");

dotenv.config();
process.env.TZ = process.env.TZ || "Europe/London";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("public/uploads"));

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let isDomainAllowed = allowlist.indexOf(req.header("Origin")) !== -1;
    if (isDomainAllowed) {
        corsOptions = {
            origin: true,
            methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization", "Accept"],
            credentials: true,
            optionsSuccessStatus: 200
        };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
