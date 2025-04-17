const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const GalleryRoutes = require('./routes/Gallery.routes');
const BlogRoutes = require('./routes/Blog.routes');
const CallbackRoutes = require('./routes/Callback.routes');
const InternshipRoutes = require('./routes/Internship.routes');
const ResumeRoutes = require('./routes/Resume.Routes');
const ProductRoutes = require('./routes/Products.routes');
const authenticationRoutes = require('./routes/User.routes');
const JobRoutes = require('./routes/Job.routes');
const TestimonialRoutes = require('./routes/Testimonial.routes');
const TeamRoutes = require('./routes/Team.routes');
const AboutRoutes = require('./routes/About.routes');
const ContactRoutes = require('./routes/Contact.routes');
const BrandRoutes = require('./routes/Partnership.routes');
const ServiceRoutes = require('./routes/Service.routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send({ message: 'Awesome it works 🐻' });
});

// API Routes
app.use('/auth', authenticationRoutes);
app.use('/job', JobRoutes);
app.use('/about', AboutRoutes);
app.use('/contact', ContactRoutes);
app.use('/product', ProductRoutes);
app.use('/services', ServiceRoutes);
app.use('/Brand', BrandRoutes);
app.use('/testimonial', TestimonialRoutes);
app.use('/teams', TeamRoutes);
app.use('/resume', ResumeRoutes);
app.use('/gallery', GalleryRoutes);
app.use('/blog', BlogRoutes);
app.use('/callback', CallbackRoutes);
app.use('/internship', InternshipRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
});

// Connect to DB
connectDB();

// Route Logger
const listRoutes = (app, baseUrl) => {
  console.log('📂 Available Routes:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const method = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`${method} ${baseUrl}${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const method = Object.keys(handler.route.methods).join(', ').toUpperCase();
          console.log(`${method} ${baseUrl}${handler.route.path}`);
        }
      });
    }
  });
};

// Start Server
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`);
  listRoutes(app, BASE_URL);
});
