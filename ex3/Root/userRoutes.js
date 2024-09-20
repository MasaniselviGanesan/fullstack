// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

router.post('/:id/follow', async (req, res) => {
    const user = await User.findById(req.params.id);
    user.followers.push(req.body.followerId);
    await user.save();
    res.send(user);
});

router.get('/:id/posts', async (req, res) => {
    const user = await User.findById(req.params.id).populate('followers');
    const posts = await Post.find({ author: { $in: user.followers } }).populate('author');
    res.send(posts);
});

module.exports = router;
