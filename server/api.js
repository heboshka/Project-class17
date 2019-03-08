const express = require('express');
const router = express.Router();
const db = require('./db');
const { validateInput, houseAsSqlParams } = require('./validation');



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
  .get(async (req, res) => {
    let { min_price = 0,
      max_price = Number.MAX_SAFE_INTEGER,
      location_country = "",
      room_num = 1,
      living_area = 1,
      location_city = "",
      page = 1,
      order = "price_value_asc" } = req.query;


    const HOUSES_PER_PAGE = 2;
    const offset = (page - 1) * HOUSES_PER_PAGE;


    min_price = parseInt(min_price);
    max_price = parseInt(max_price);
    page = parseInt(page);

    if (max_price < min_price) {
      return res.status(400).json({ error: " maximum price should be bigger than minimum price." });
    }


    let order_field, order_direction;
    switch (order) {
      case "price_value_asc":
        order_field = "price_value";
        order_direction = "asc";
        break;
      case "price_value_desc":
        order_field = "price_value";
        order_direction = "desc";
        break;
      case "location_country_asc":
        order_field = "location_country";
        order_direction = "asc";
        break;
      case "location_country_desc":
        order_field = "location_country";
        order_direction = "desc";
        break;
      default:
        order_field = "price_value";
        order_direction = "asc";
        break;
    }

    const conditions = [`price_value between ${min_price} and ${max_price} `];
    if (location_country.length) {
      conditions.push(` and location_country = '${location_country}' `)
    }

    if (location_city.length) {
      conditions.push(` and location_city = '${location_city}' `)
    }

    if (room_num) {
      conditions.push(` and size_rooms >= ${room_num} `)
    }

    if (living_area) {
      conditions.push(` and size_living_area >= ${living_area} `)
    }


    const selectQuery = `select * from houses
                          where ${conditions.toString().replace(/,/g, "")}
                          order by
                            ${ db.escapeId(order_field, true)} ${order_direction}
                          limit ${HOUSES_PER_PAGE}
                          offset ${offset} `;
    const totalHouses = `select count(*) as total from houses`;

    try {
      const totalHousesCount = await db.queryPromise(totalHouses);
      console.log(totalHousesCount[0].total)
      const housesList = await db.queryPromise(selectQuery);
      res.json({ housesList, total: totalHousesCount[0].total, per_page: HOUSES_PER_PAGE });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  })



  .post(async (req, res) => {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Input data should be an array.' });
    }
    const contributeInput = validateInput(req.body);

    const validHouses = contributeInput.validData;
    const invalidHouses = contributeInput.invalidData;
    const errorMes = contributeInput.error

    const report = {
      valid: validHouses.length,
      invalid: {
        count: invalidHouses.length,
        items: invalidHouses
      },
      error: errorMes
    };

    if (validHouses.length) {
      try {
        const housesData = validHouses.map(el => houseAsSqlParams(el));
        await db.queryPromise(insertHouses, [housesData]);
        return res.json(report);
      } catch (err) {
        return res.status(500).json({ error: 'Database error while recording new information.' + err.message })
      }
    }
    else {
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