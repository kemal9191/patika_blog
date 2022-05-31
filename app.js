const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const { redirect } = require('express/lib/response');
const methodOverride = require('method-override');
const postController = require('./controllers/postController')
const pageControllers = require('./controllers/pageController')

const app = express();

mongoose.connect('mongodb://localhost/patika-blog');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.get('/', postController.getAllPosts);

app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPage);


app.post('/posts', postController.createPost);
app.get('/posts/:id', postController.getPost);

app.delete('/posts/delete/:id', postController.deletePost);

app.put('/posts/:id', postController.updatePost);

app.get('/posts/edit/:id', pageControllers.getEditPage)

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
