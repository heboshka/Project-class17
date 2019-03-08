export default class housesServices {
  static getHouseList() {
    return fetch(`http://localhost:4000/api/houses`)
      .then(response => response.json()
      );
  }
  static filterHouseList(queryString) {
    return fetch(`http://localhost:4000/api/houses?${queryString}`)
      .then(response => response.json()
      );
  }

  static getHouseById(id) {
    return fetch(`http://localhost:4000/api/houses/${id}`)
      .then(response => response.json()
      );
  }

  static addHouse(data) {
    return fetch('http://localhost:4000/api/houses', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(data => data.json())
  }


}