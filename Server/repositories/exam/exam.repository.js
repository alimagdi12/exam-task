const Exam = require('../../models/exam/exam.models'); // Exam model

class ExamRepository {
    constructor(io) {
        this.io = io
    }
    async addExam(data) {
        const exam = new Exam(data);
        this.io.emit('exam added', exam.name);  
        return exam.save();
    }

    async getExamById(id) {
        return Exam.findById(id);
    }


    async getAllExams() {
        return Exam.find();
    }

    async updateExam(id, data) {
        return Exam.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteExam(id) {
        return Exam.findByIdAndDelete(id);
    }
}

module.exports = ExamRepository;
