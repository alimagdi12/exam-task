const mongoose = require("mongoose");

exports.connect = () => {
    return mongoose.connect(
        `${process.env.MONGODBURL}/quiz-task?retryWrites=true&w=majority`,
    );
};
