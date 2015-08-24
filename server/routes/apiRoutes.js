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
    res.json({message : "Puppy ain't existing here"});
  }

});

router.post('/puppies', function(req, res, next) {
  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===parseInt(req.body.puppyID);
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

router.put('/puppy/:id', function(req, res, next) {
  //add validation for checking if the puppyAge is an integer

  if(isNaN(parseInt(req.body.puppyAge))) {
    res.json({message: "Please enter a number for the puppy's age."});
    return false;
  }

  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  });

  if (pup.length>0){

    for (var i = 0; i < tempPuppyArray.length; i++) {
       if (tempPuppyArray[i].puppyID === parseInt(req.params.id)) {
          for (key in req.body) {
            if (key === 'puppyName') {
              tempPuppyArray[i].puppyName = req.body.puppyName;
            } else if (key === 'puppyAge') {
              tempPuppyArray[i].puppyAge = req.body.puppyAge;
            }
        }

      }
    }
    res.send(tempPuppyArray);
    //grab object from array
    //update specific keys
    //push back into array
  } else {
    res.json("Puppy ain't existing here");
  }

});

router.delete('/puppy/:id', function(req, res, next) {
  var pup = tempPuppyArray.filter(function(puppy){
    return puppy.puppyID===+req.params.id;
  });

  if (pup.length > 0) {
    for (var i = 0; i < tempPuppyArray.length; i++) {
      if (tempPuppyArray[i].puppyID === parseInt(req.params.id)) {

        var tempPuppy = tempPuppyArray.splice(i,1);
        res.json({
          message: "That puppy is gone!",
          puppy: tempPuppy
        });
      }
    }
  } else {
    res.json("Puppy ain't existing here");
  }

});

module.exports = router;
