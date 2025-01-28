const Course = require('../models/Course');

// Login controller
const userLogin = async (req, res) => {
    const { username, password, month } = req.body; // Include month in login payload

    // Validate credentials
    if (username !== '2025_Batch_Training' || password !== '2025_Batch_Training') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Simulate a userId for this example
    const userId = 'user12345'; // Replace with real user authentication logic

    // Send the month along with the userId in the response
    res.status(200).json({ message: 'Login successful', userId, month });
};

// Create course
const createCourse = async (req, res) => {
    try {
        const { courseName, courseLink, courseImage, userId, month } = req.body;

        // Validate required fields
        if (!userId || !month || !courseName || !courseLink || !courseImage) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new course
        const newCourse = new Course({
            courseName,
            courseLink,
            courseImage,
            userId,
            month
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error });
    }
};

// Get courses for a user by month
const getCoursesByUserAndMonth = async (req, res) => {
    try {
        const { userId, month } = req.query;

        // Validate required query parameters
        if (!userId || !month) {
            return res.status(400).json({ message: 'userId and month are required' });
        }

        // Fetch courses based on userId and month
        const courses = await Course.find({ userId, month });
        res.status(200).json({ message: 'Courses fetched successfully', courses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses', error });
    }
};

module.exports = {
    userLogin,
    createCourse,
    getCoursesByUserAndMonth
};
