const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();


// const genres = [
//   { id: 1, name: 'Action' },  
//   { id: 2, name: 'Horror' },  
//   { id: 3, name: 'Romance' },  
// ];


const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));



router.get('/', (req, res) => {
  Genre.find().sort({ name: 1 })
    .then(genres => {
      res.send(genres);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genres."
      });
    });
  // res.send(genres);
});


router.post('/', (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre.save().then(() => {
    res.send(genre)
  }).catch(() => {
    res.status(400).send('Invalid genre');
  })
});


router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid ID');
  }
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    .then(genre => {
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);
    }).catch(() => {
      res.status(400).send('Invalid ID');
    })
})



router.delete('/:id', (req, res) => {
  
  Genre.findByIdAndRemove(req.params.id)
  .then(genre => {  res.send(genre); })
  .catch(() => {
    res.status(404).send('Invalid ID');
  })
});

router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid ID');
  }
  Genre.findById(req.params.id)
    .then(genre => {
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);
    })
    .catch(() => {
      res.status(400).send('Invalid ID');
    })
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;