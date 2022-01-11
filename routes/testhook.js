const express = require('express');
const getFunkyData = require('../modules/createFunkyData');

module.exports = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const data = getFunkyData();
    res.send(data);
  });
  return router;
};