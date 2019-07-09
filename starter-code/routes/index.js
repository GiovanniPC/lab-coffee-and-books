const express = require('express');

const router = express.Router();

const Marker = require('../model/marker');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  const {
    name, type, lat, long,
  } = req.body;

  const location = {
    type: 'Point',
    coordinates: [parseFloat(long), parseFloat(lat)],
  };

  const newMarker = new Marker({ name, type, location });
  newMarker.save((error) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/');
    }
  });

  res.redirect('/markers');
});

router.get('/googlemaps', (req, res) => {
  res.render('googlemaps', { GMAPS: process.env.GOOGLE_API_KEY });
});

router.get('/api', (req, res) => {
  Marker.find()
    .then((something) => {
      res.status(200).json({ something });
    })
    .catch(error => console.log(error));
});

router.get('/markers', (req, res) => {
  Marker.find()
    .then((allmarkers) => {
      res.render('markers', { allmarkers });
    })
    .catch(err => console.log(err));
});

router.get('/del/:id', (req, res) => {
  Marker.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/markers');
    })
    .catch(err => console.log(err));
});


module.exports = router;
