import express from 'express';
import path from 'path';

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');

const app = express();

//parses the body of the request
//and sets it to request.body
app.use(express.json());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);

app.listen(8000, () => console.log('Listening on port 8000...'));
