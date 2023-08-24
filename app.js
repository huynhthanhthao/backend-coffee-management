const HttpStatus = require("http-status-codes");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./src/routes/index");

const database = require("./database");
const { ExceptionResponse, CatchException } = require("./utils/ApiError");

const app = express();

// connect database

database.connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);

app.use((err, req, res, next) => {
    if (err instanceof CatchException) {
        return res
            .status(HttpStatus.default.BAD_REQUEST)
            .json({ message: err.message, data: err.data, status: err.status });
    }
    return res.status(HttpStatus.default.BAD_REQUEST).json({ message: err.message, data: null, status: err.status });
});

module.exports = app;
