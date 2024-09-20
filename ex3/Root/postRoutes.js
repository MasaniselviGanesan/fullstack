// routes/postRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User'); // Ensure User model is imported for validation
const router = express.Router();

router.post('/', async (req, res) => {
    const { author, content } = req.body;

    // Check if the provided author ID is valid
    if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).send({ error: 'Invalid author ID format' });
    }

    // Check if the user exists
    const userExists = await User.findById(author);
    if (!userExists) {
        return res.status(404).send({ error: 'Author not found' });
    }

    // Create and save the post
    const post = new Post({ content, author });
    await post.save();
    res.send(post);
});

// New route to like a post
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        post.likes += 1;
        await post.save();
        res.send(post);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
module.exports = router;

