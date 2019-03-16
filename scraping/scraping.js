const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');



const pages = [
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html",
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html?page=2",
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html?page=3",
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html?page=4",
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html?page=5",
  "https://www.point2homes.com/US/Single-Family-Homes-For-Rent/OH.html?page=6"
]

pages.forEach(url => {
  const housesList = []
  request(url, function (err, res, html) {
    if (!err) {
      const $ = cheerio.load(html);
      //  console.log(html)
      const houseAddress = $('.address-container').map((i, x) => $(x).attr('data-address')).toArray();
      const housesLink = $('.item-address').map((i, x) => $(x).attr('data-url')).toArray()
      for (let i = 0; i < housesLink.length; i++) {
        if (!housesLink[i].includes('http')) {
          housesLink[i] = 'https://www.point2homes.com/' + housesLink[i]
        }
      }
      let id = $('.ic-fav').map((i, x) => $(x).attr('id')).toArray()
      let Latitude = id.map(el => {
        let newId = 'Latitude_l_' + el
        return $(`#${newId}`).attr('value')
      })

      let Longitude = id.map(el => {
        let newId = 'Longitude_l_' + el
        return $(`#${newId}`).attr('value')
      })

      let rooms = $('li[data-label="Beds"]').children('strong').map((i, x) => $(x).text()).toArray()
      let price = $('.price').map((i, x) => $(x).attr('data-price').replace(/[,$USD]/g, '')).toArray()
      let title = $('.address-container').map((i, x) => $(x).attr('title')).toArray()
      let image = $('img').map((i, x) => $(x).attr('data-original')).toArray()

      // let marketDate = housesLink.map((el, index) => {
      //   request(el, function (err, res, body) {
      //     let date;
      //     const $details = cheerio.load(body);
      //     const dateItem = $details('.col-2').children('dt').filter(function () {
      //       return $(this).text().trim() === 'Date Added'
      //     }).next().text();
      //     console.log(dateItem)
      //     date = dateItem;
      //   })
      //   return date
      // })
      // console.log(marketDate)


      for (let x = 0; x < housesLink.length; x++) {
        const housesData = {
          'link': housesLink[x],
          'market_date': '15-03-2019',
          'location_country': 'USA',
          'location_city': 'OHIO',
          'location_address': houseAddress[x],
          'location_coordinates_lat': parseFloat(Latitude[x]),
          'location_coordinates_lng': parseFloat(Longitude[x]),
          'size_living_area': '150 m',
          'size_rooms': parseInt(rooms[x]),
          'price_value': parseFloat(price[x]),
          'price_currency': '$',
          'description': '',
          'title': title[x],
          'images': image[x],
          'sold': '0'
        }
        housesList.push(housesData)
      }
      fs.appendFileSync('ohio.json', JSON.stringify(housesList))
    }
    else {
      console.log(err)
    }
  });
})

