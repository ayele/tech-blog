import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
const db = require('monk')('127.0.0.1/react-blog');

router.post(
  '/add',
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name field is required')
    .custom(exists),
  async (request, response) => {
    console.log('request body: ', request.body);
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(400).json(errors.array());
    } else {
      try {
        console.log('Adding category with no validation errors...');

        const categories = db.get('categories');
        let { name } = request.body;
        name = formattedName(name);
        const insertedCategory = await categories.insert({ name: name });

        console.log('new category inserted in db: ', insertedCategory);

        response.status(200).json(insertedCategory);
        db.close();
      } catch (error) {
        console.log('Error connecting to db: ', error);
        response.status(500).json({ message: 'Error connecting to db', error });
      }
    }
  }
);

//Checks if a category already exists
function exists(categoryName) {
  return new Promise(async (resolve, reject) => {
    console.log('Validating if category already exists...');
    try {
      const categories = db.get('categories');
      categoryName = formattedName(categoryName);
      const category = await categories.findOne({ name: categoryName });

      if (category) {
        console.log('category exists: ', category);
        reject(new Error('Category already exists'));
      } else {
        console.log('category doesnt exist: ', category);
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
}

//trim and capitalize first letter
const formattedName = name => {
  name = name.trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

router.get('/show/:category', async (request, response) => {
  console.log('Getting all categorized posts...');

  try {
    const posts = db.get('posts');
    const { category } = request.params;
    const categorizedPosts = await posts.find(
      { category: category },
      { sort: { date: -1 } }
    );

    response.status(200).json(categorizedPosts);
    db.close();
  } catch (error) {
    response.status(500).json({ message: 'Error connecting to db', error });
  }
});

//exports default router of ES6 throws an error for some reason
//so i'm using the old way
module.exports = router;
