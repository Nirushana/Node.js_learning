const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');


//express app
const app = express();
//connect to mongoDB
const dbURI = 'mongodb+srv://ServX:ServXsa12@cluster0.8n934.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// //mongoose and mongo sandBox routes 
// app.get('/add-blog', (res, req) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save().then((result) => {
//         res.setEncoding(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (res, req) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// });

// app.get('/single-blog', (res, req) => {
//     Blog.findById('5fd7d6bac0cd723e4457af20')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });

//register view engine
app.set('view engine', 'ejs');

//middleware static files
app.use(express.static('public'))

app.use(morgan('dev'));

app.get('/', (req, res) => {
 res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'}); 
});

//these are the blog routes 
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'});
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});