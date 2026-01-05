// server/routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Middleware: Check if user is logged in
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// @route   GET /api/posts
// @desc    Get all posts (Anonymous feed)
router.get('/', async (req, res) => {
  try {
    // Fetch posts, sort by newest first (-1)
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/posts
// @desc    Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      message: req.body.message,
      user: req.user // Attach user ID from token
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/my-posts
// @desc    Get only the logged-in user's posts
router.get('/my-posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/hug/:id
// @desc    Hug (or un-hug) a post
router.put('/hug/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been hugged by this user
    if (post.hugs.includes(req.user)) {
      // Take back the hug (remove user ID from array)
      post.hugs = post.hugs.filter(userId => userId.toString() !== req.user);
    } else {
      // Give a hug (add user ID to array)
      post.hugs.push(req.user);
    }

    await post.save();
    res.json(post.hugs); // Return the new list of hugs
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;