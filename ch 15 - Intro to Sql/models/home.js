// core modules
const db = require('../utils/databaseUtil');



module.exports = class Home {
  constructor(houseName, location, pricePerNight, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.location = location;
    this.pricePerNight = pricePerNight;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {

    if (this.id) {  // Update existing home
      return db.execute(
        'UPDATE homes SET houseName = ?, location = ?, pricePerNight = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?',
        [this.houseName, this.location, this.pricePerNight, this.rating, this.photoUrl, this.description, this.id]
      );
    } else { // Insert new home

      return db.execute(
        'INSERT INTO homes (houseName, location, pricePerNight, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)',
        [this.houseName, this.location, this.pricePerNight, this.rating, this.photoUrl, this.description]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id = ?', [homeId]);
  }

  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id = ?', [homeId]);
  }

}