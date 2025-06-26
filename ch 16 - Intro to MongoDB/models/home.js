const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtil');

module.exports = class Home {
  constructor(houseName, location, pricePerNight, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.location = location;
    this.pricePerNight = pricePerNight;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) { // update
      const updateFields = {
        houseName: this.houseName,
        pricePerNight: this.pricePerNight,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description // Ensure all fields are included in the update
      };

      return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields });
    } else { // insert
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) });
  }

}