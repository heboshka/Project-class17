const express = require('express');
const router = express.Router();
const db = require('./db');
const { validateHouseInput, houseAsSqlParams } = require('./validation');


const fackDb = [
  {
    id: 1,
    price: 1000
  },
  {
    id: 2,
    price: 2000
  },
  {
    id: 3,
    price: 3000
  },

];

const insertHouses = `replace into houses (
    link,
    market_date,
    location_country,
    location_city,
    location_address,
    location_coordinates_lat,
    location_coordinates_lng,
    size_living_area,
    size_rooms,
    price_value,
    price_currency,
    description,
    title,
    images,
    sold
    ) values ?;`;

let index = (fackDb.length) - 1
let houseId = fackDb[index].id
console.log(houseId)
router.route('/houses')
  .get((req, res) => {
    res.send(fackDb)
  })

  .post(async (req, res) => {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Input data should be an array.' });
    }
    const processedData = req.body.map(houseObj => { return validateHouseInput(houseObj) });
    const validData = [];
    const invalidData = [];
    processedData.forEach(item => {
      if (item.valid) {
        validData.push(item);
      } else {
        invalidData.push(item);
      }
    });
    const report = {
      valid: validData.length,
      invalid: {
        count: invalidData.length,
        items: invalidData
      }
    };

    if (validData.length) {
      try {
        const housesData = validData.map(el => houseAsSqlParams(el.raw));
        await db.queryPromise(insertHouses, [housesData]);
        return res.json(report);
      } catch (err) {
        return res.status(500).json({ error: 'Database error while recording new information.' + err.message })
      }

    } else {
      res.json(report);
    }

  })

router
  .route('/houses/:id')
  .get((req, res) => {
    const { id } = req.params;
    const item = fackDb.find(house => {
      return house.id === parseInt(id, 10);
    })

    if (item) {
      res.json(item);
    }
    else {
      res.send('no house with this id')
    }
  })

  .delete((req, res) => {
    let { id } = req.params;
    const index = fackDb.findIndex(house => {
      return house.id === parseInt(id, 10)
    })

    if (index > -1) {
      fackDb.splice(index, 1)
      res.send('house was deleted')
    }
    else {
      res.send('there is no house with this id ')
    }
  })



router.use('*', (req, res) => {
  res.status(404).end();

});
module.exports = router;

