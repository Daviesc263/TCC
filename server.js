const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
let reviews = [];


app.get("/", (req, res) => {

    let day = date();
    res.render('index', {
        kindOfDay: day, 
        posts: posts
    });
});

app.get("/cleaning", (req, res) => {
    res.render('cleaning');
});

app.get("/links", (req, res) => {
    res.render('links');
});

app.get("/picture-gallery", (req, res) => {
    res.render('picture-gallery');
});

app.get("/reviews", (req, res) => {
    res.render('reviews', {
      reviews: reviews
    });
});

app.get("/toptips", (req, res) => {
    res.render('toptips');
});

app.get("/videos", (req, res) => {
    res.render('videos');
});

app.get("/welcome-article", (req, res) => {
    res.render('welcome-article');
});



app.get("/newspost", function(req, res){
    res.render("newspost");
  });

  
  app.post("/newspost", function(req, res){
    const post = {
      title: req.body.postTitle,
      content: req.body.postBody
    };
  
    posts.push(post);
  
    res.redirect("/");
  
  });
  
  app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    reviews.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content,
        });
      }
    });
  
  });

  app.get("/submitreview", function(req, res){
    res.render("submitreview");
  });
  
  app.post("/submitreview", function(req, res){
    const post = {
      title: req.body.postTitle,
      content: req.body.postBody,
      link: req.body.postLink
    };
  
    reviews.push(post);
  
    res.redirect("/reviews");
  
  });
  
  app.get("/reviewposts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    reviews.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("reviewpost", {
          title: post.title,
          content: post.content,
          link: post.link
        });
      }
    });
  
  });


app.listen(3000, function(){
    console.log("Server started on port 3000");
});

