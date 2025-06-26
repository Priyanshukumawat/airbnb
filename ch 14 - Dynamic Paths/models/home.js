// core modules
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { register } = require('module');
const { error } = require('console');
const Favourite = require("./favourites");

const homeDataPath = path.join(rootDir, 'data', 'homes.json');

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
      if (this.id) { //edit home case
        registeredHomes = registeredHomes.map(home =>
          home.id === this.id ? this : home); // update the existing home or keep the other homes unchanged
      } else { //add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
        console.log('Files writing Concluded', error)
      });
    });
  }
  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      console.log('Files reading Concluded', err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId);
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
        Favourite.deleteById(homeId, callback);
      });
    });
  }

}