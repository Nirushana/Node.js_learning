const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(3000);

app.get('/', (req, res) => {
    const blogs =[
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consecttur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consecttur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consecttur'},
    ];
    res.render('index', {title: 'Home', blogs : blogs}); 
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'}); 
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'});
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});