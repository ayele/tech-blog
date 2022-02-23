import express from 'express';
const router = express.Router();
const db = require('monk')('127.0.0.1/react-blog');

router.get('/', async (request, response, next) => {
  console.log('Getting all posts...');

  try {
    const posts = db.get('posts');
    const allPosts = await posts.find({}, { sort: { date: -1 } });

    response.status(200).json(allPosts);
    db.close();
  } catch (error) {
    response.status(500).json({ message: 'Error connecting to db', error });
  }
});

//exports default router of ES6 throws an error for some reason
//so i'm using the old way
module.exports = router;
