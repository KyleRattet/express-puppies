var express = require('express');
var router = express.Router();
var Puppy = require('../models/puppies');

var tempPuppyArray = [];
var newPuppy = new Puppy (1, 'Bart', 20);
var johnPuppy = new Puppy (2, 'John', 2);
var danPuppy = new Puppy (3, 'Dan', 15);


tempPuppyArray.push(newPuppy,johnPuppy,danPuppy);


router.get('/puppies', function(req, res, next) {
  res.json(tempPuppyArray);
});

router.get('/puppy/:id', function(req, res, next){
  var id = +req.params.id;

  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  });
  if (pup.length>0){
    res.json(pup[0]);
  } else {
    res.json("Puppy ain't existing here");
  }

});

router.post('/puppies', function(req, res, next) {
  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===parseInt(req.params.puppyID);
  });

   if (pup.length>0){
    res.json({message: "Puppy already exists"});
  } else {



  var newPostPuppy = new Puppy(parseInt(req.body.puppyID), req.body.puppyName, parseInt(req.body.puppyAge));
  tempPuppyArray.push(newPostPuppy);
  res.json(
    {message: "success", puppy: newPostPuppy}
    );
  }
});


module.exports = router;
