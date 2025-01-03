const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/about', async (req, res, next) => {
  res.send({ message: 'About Details 🚀' });
});

router.get('/contact', async (req, res, next) => {
  res.send({ message: 'Contact Details 🚀' });
});

module.exports = router;
