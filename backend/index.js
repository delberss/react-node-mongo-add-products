require("dotenv").config();

const connect = require("./dataBase/connect");
connect();

require("./modules/express");