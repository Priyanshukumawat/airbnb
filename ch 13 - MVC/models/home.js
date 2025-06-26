// core modules
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { register } = require('module');

module.exports = class Home {
  constructor(houseName, location, pricePerNight, rating, photoUrl) {
    this.houseName = houseName;
    this.location = location;
    this.pricePerNight = pricePerNight;
    this.rating = rating;
    this.photo = photoUrl;
  }

  save() {
    Home.fetchAll(registeredHomes => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'homes.json');
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
        console.log('Files writing Concluded', error)
      });
    });
  }
  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      console.log('Files reading Concluded', err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }
}