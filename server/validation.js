const validator = require("validator");
const moment = require("moment")





const houseAsSqlParams = (houseObj) => {
  return [
    'link',
    'market_date',
    'location_country',
    'location_city',
    'location_address',
    'location_coordinates_lat',
    'location_coordinates_lng',
    'size_living_area',
    'size_rooms',
    'price_value',
    'price_currency',
    'description',
    'title',
    'images',
    'sold'
  ].map(field => houseObj[field]);
}


function checkHouses(houseObj) {
  let valid = true;
  let error = [];
  if (typeof houseObj !== 'object') {
    valid = false;
    error.push(`House should be object.`);
  }
  if (!validator.isURL(houseObj['link'])) {
    const message = `"${houseObj['link']}" is not valid URL!`;
    valid = false
    error.push(message)
  }
  if (!moment(houseObj['market_date'], 'YYYY-MM-DD').isValid() || !moment(houseObj['market_date'], 'DD-MM-YYYY').isValid()) {
    const message = `"${houseObj['market_date']}" not valid should be in YYYY-MM-DD or DD-MM-YYYY format !`;
    error.push(message)
    valid = false
  }
  if (!validator.isAlpha(houseObj['location_country'], 'en-US')) {
    const message = `"${houseObj['location_country']}" is not valid location country!`;
    error.push(message)
    valid = false
  }
  if (!validator.isAlpha(houseObj['location_city'], 'en-US')) {
    const message = `"${houseObj['location_city']}" is not valid location city!`;
    error.push(message)
    valid = false
  }
  if (!validator.isAscii(houseObj['location_address'], 'en-US')) {
    const message = `"${houseObj['location_address']}" is not valid location address!`;
    error.push(message)
    valid = false
  }
  if (!validator.isFloat(houseObj['location_coordinates_lat']) || !validator.isFloat(houseObj['location_coordinates_lng'])) {
    const message = ` Not valid location coordinates!`;
    error.push(message)
    valid = false
  }
  if (!validator.isInt(houseObj['size_living_area'], { min: 1 })) {
    const message = `"${houseObj['size_living_area']}" not valid living size!`;
    error.push(message)
    valid = false
  }
  if (!validator.isInt(houseObj['size_rooms'], { min: 1 })) {
    const message = ` "${houseObj['size_rooms']}" not valid room size!`;
    error.push(message)
    valid = false
  }
  if (!validator.isFloat(houseObj['price_value'], { min: 1 })) {
    const message = `"${houseObj['price_value']}" not valid price!`;
    error.push(message)
    valid = false
  }
  // if (!validator.isCurrency(houseObj['price_currency'])) {
  //   const message = ` not valid cur!`;
  //   error.push(message)
  // valid = false
  // }
  if (!validator.isInt(houseObj['sold'], { min: 0, max: 1 })) {
    const message = `sold should be 0 or 1!`;
    error.push(message)
    valid = false
  }
  return {
    valid,
    error
  }
}

function validateInput(housesInfo) {
  const validData = [];
  const invalidData = [];

  const houseInfo = housesInfo.map(houseObj => {
    const item = checkHouses(houseObj);
    if (item.valid) {
      validData.push(houseObj)
    }
    else {
      invalidData.push(houseObj)
    }
    return item.error
  })
  return {
    validData,
    invalidData,
    error: houseInfo
  };
}

module.exports = { validateInput, houseAsSqlParams }







