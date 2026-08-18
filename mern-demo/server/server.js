const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./Student");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// API kiểm tra Backend
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend MERN is running"
    });
});


// GET - lấy danh sách sinh viên
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// POST - thêm sinh viên
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// PUT - cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// DELETE - xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        res.json(student);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// Chạy Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});