const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

//local imports
const connectDb = require("./db.js");
const taskRoutes = require("./controllers/task.controller");
const { errorHandler } = require("./middlewares")

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

connectDb()
    .then(() => {
        console.log("db connection succeeded");

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
