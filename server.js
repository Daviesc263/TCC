require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://TheCotswoldsCamper:wepwAk-zuxjet-2fuvvi@cluster0.7tbce.mongodb.net/DB1", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const reviewSchema = {
  title: String,
  content: String,
  link: String
};

//schemas//

const Review = mongoose.model("Review", reviewSchema);
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {

    let day = date();
    Post.find({}, function(err, posts){
      res.render("index", {
        kindOfDay: day,
        posts: posts
        });
    });
});

app.get("/sitereviews", (req, res) => {
  Review.find({}, function(err, reviews){
    res.render("sitereviews",{
      reviews: reviews
    });
  });
});

app.get("/newspost", function(req, res){
    res.render("newspost");
  });
 
app.post("/newspost", function(req, res){
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  
});
  
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  });

  

  app.get("/submitreview", function(req, res){
    res.render("submitreview");
  });

  
app.post("/submitreview", function(req, res){
    const review = new Review ({
      title: req.body.reviewTitle,
      content: req.body.reviewBody,
      link: req.body.reviewLink
    });
  
    review.save(function(err){
      if (!err){
          res.redirect("/sitereviews");
      }
    });
});
  
app.get("/reviews/:reviewId", function(req, res){

  const requestedReviewId = req.params.reviewId;
  
    Review.findOne({_id: requestedReviewId}, function(err, review){
      res.render("reviewpost", {
        title: review.title,
        content: review.content,
        link: review.link
      });
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

app.get("/toptips", (req, res) => {
    res.render('toptips');
});

app.get("/videos", (req, res) => {
    res.render('videos');
});

app.get("/welcome-article", (req, res) => {
    res.render('welcome-article');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});

