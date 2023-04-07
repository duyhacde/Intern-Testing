const mongoose = require("mongoose");

const dbUri =
    "mongodb+srv://admin:duy123456@cluster0.9cl6g.mongodb.net/task_db?retryWrites=true&w=majority";

module.exports = () => {
    return mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
