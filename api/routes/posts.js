import express from 'express';
const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: './public/images' });
import { check, validationResult } from 'express-validator';
const db = require('monk')('127.0.0.1/react-blog');

router.get('/add', async (request, response) => {
  try {
    const categories = db.get('categories');
    const allCategories = await categories.find({}, { sort: { name: 1 } });

    response.status(200).json(allCategories);
    db.close();
  } catch (error) {
    response.status(500).json({ message: 'Error connecting to db', error });
  }
});

router.post(
  '/add',
  upload.single('mainimage'),
  check('title').not().isEmpty().withMessage('Title field is required'),
  check('body').not().isEmpty().withMessage('Body field is required'),
  async (request, response) => {
    console.log('starting add post operation with body: ', request.body);

    const mainimage = request.file ? request.file.filename : 'noimage.jpg';

    const body = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(400).json(errors.array());
    } else {
      try {
        const post = db.get('posts');
        const insertedPost = await post.insert({
          title: body.title,
          category: body.category,
          body: body.body,
          author: body.author,
          mainimage: mainimage,
          date: new Date(),
        });

        console.log('New post inserted in db: ', insertedPost);

        response.status(200).json({ redirectUrl: '/api' });
        db.close();
      } catch (error) {
        response.status(500).json({ message: 'Error connecting to db', error });
      }
    }
  }
);

router.get('/show/:id', async (request, response) => {
  const { id } = request.params;
  console.log('Getting post with id: ', id);

  try {
    const posts = db.get('posts');
    const post = await posts.findOne({ _id: id });
    console.log('Post retrieved from db: ', post);
    response.status(200).json(post);
    db.close();
  } catch (error) {
    response.status(500).json({ message: 'Error connecting to db', error });
  }
});

router.post(
  '/addcomment',
  check('name').not().isEmpty().withMessage('Name field is required'),
  check('email').isEmail().withMessage('Email is not formatted properly'),
  check('email').not().isEmpty().withMessage('Email field is required'),
  check('comment').not().isEmpty().withMessage('Body field is required'),
  async (request, response) => {
    const { id } = request.body;
    console.log('starting to add comment with id: ' + id);

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      //there's errors
      response.status(400).json(errors.array());
      console.log('add comment operation failed with error: ', errors);
    } else {
      const comment = {
        name: request.body.name,
        email: request.body.email,
        comment: request.body.comment,
        commentDate: new Date(),
      };

      try {
        const posts = db.get('posts');
        const updatedPost = await posts.findOneAndUpdate(
          { _id: id },
          { $push: { comments: comment } }
        );

        console.log('post updated with comment in db: ', updatedPost);

        response.status(200).json(updatedPost);
        db.close();
      } catch (error) {
        response.status(500).json({ message: 'Error connecting to db', error });
      }
    }
  }
);

//exports default router of ES6 throws an error for some reason
//so i'm using the old way
module.exports = router;
