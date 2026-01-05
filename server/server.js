const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


// 1. Load environment variables
dotenv.config();

// 2. Connect to Database
connectDB();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chat');
const moodRoutes = require('./routes/moods');

const app = express();

// 3. Middleware (Allows us to accept JSON data)
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/moods', moodRoutes);

// 4. Basic Test Route
app.get('/', (req, res) => {
  res.send('MindCare API is running...');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});