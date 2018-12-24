const express = require('express');
const mongoose = require('mongoose');

const {
  InternalServerError,
} = require('../../../../error');

const router = express.Router();

const Universe = mongoose.model('Universe');

const universeMapper = (datum) => {
  const {
    name,
  } = datum;

  return {
    name,
  };
};

router.get('/', (req, res, next) => {
  const fields = {
    _id: false,
    name: true,
  };

  Universe
    .find()
    .select(fields)
    .exec((err, data) => {
      if (err) {
        return next(new InternalServerError());
      }

      const universes = [];

      data.forEach((datum) => {
        const universe = universeMapper(datum);

        universes.push(universe);
      });

      res.locals.data = universes;

      return next();
    });
});

module.exports = router;
