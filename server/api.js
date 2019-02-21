const express = require('express');
const router = express.Router();


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

let index = (fackDb.length) - 1
let houseId = fackDb[index].id
console.log(houseId)
router.route('/houses')
  .get((req, res) => {
    res.send(fackDb)
  })


  .post((req, res) => {
    let { price } = req.body;
    price = parseInt(price, 10);

    if (typeof price == 'number' && price > 0) {
      houseId++
      const item = {
        id: houseId,
        price
      }
      fackDb.push(item)
      res.json(item)
    } else {
      res.status(400).end('please enter valid price');
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

