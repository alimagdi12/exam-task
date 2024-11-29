const mongoose = require("mongoose");

exports.connect = () => {
    return mongoose.connect(
        `mongodb+srv://admin:XHHU9hPLA5Sw7K6J@cluster0.jynhvzr.mongodb.net/quiz-task?retryWrites=true&w=majority`,
    );
};
