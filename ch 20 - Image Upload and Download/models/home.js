const mongoose = require('mongoose');
const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photo: String,
  document: String,
  description: String,
})

// homeSchema.pre('findOneAndDelete', async function (next) {
//   console.log("Came to pre bool while deleting a home")
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({ houseId: homeId });
//   next();
// })

module.exports = mongoose.model('Home', homeSchema);