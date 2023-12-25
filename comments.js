// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/comments', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'comments.json'));
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'comments.json')));
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment,
    date: new Date()
  };
  comments.push(newComment);
  fs.writeFileSync(path.join(__dirname, 'data', 'comments.json'), JSON.stringify(comments));
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



