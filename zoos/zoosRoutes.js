const express = require('express');
const zoos = require('./zoosModel.js');
const router = express.Router();

// get a list of zoos
router.get('/', (req, res) => {
  zoos
    .find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get a zoo by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await zoos.findById(id);
    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Zoo not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create zoos
router.post('/', (req, res) => {
  const zoo = req.body;
  zoos
    .add(zoo)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update zoos
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  zoos
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete zoos
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  zoos
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
