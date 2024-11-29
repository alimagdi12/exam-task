const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socket = require("socket.io");
const { connect } = require('./mongoDB_connection/mongoose.connect')
const cors = require('cors')
const app = express()
const server = http.createServer(app);

app.use(express.json())
app.use(cors())
dotenv.config({
    path: './.env',
    encoding: 'utf8'
})

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
// const PORT1 = process.env.PORT

// Exam controller and repo classes
const ExamRepository = require('./repositories/exam/exam.repository');
const ExamController = require('./controllers/exam/exam.controllers');
// announcements controller and repo classes
const AnnouncementRepository = require('./repositories/announcements/announcements.repository');
const AnnouncementController = require('./controllers/announcements/announcements.controllers');


// Exam instances of the controller and repo classes
const examRepository = new ExamRepository(io)
const examController = new ExamController(examRepository)
// Announcements instances of the controller and repo classes
const announcementsRepository = new AnnouncementRepository()
const announcementsController = new AnnouncementController(announcementsRepository)

// exam routes
const examRoutes = require('./routes/exam/exam.routes')
// announcements routes
const announcementsRoutes = require('./routes/announcements/announcements.routes')


app.use('/api', [examRoutes(examController), announcementsRoutes(announcementsController)])

connect()
    .then(() => {
        console.log('Connected to MongoDB')
        server.listen(5000, () => {
            console.log(`Server is running on port 5000`)
        })
    })
    .catch(err => {
        console.log(err)
    })

