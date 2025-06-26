const Home = require('../Models/home')

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', { title: 'Add Home', currentPage: 'Add Home' });
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('host/host-home-list', { registeredHomes: registeredHomes, title: 'Host Homes List', currentPage: 'host-homes' });
  });
}

exports.postAddHome = (req, res, next) => {
  const { houseName, location, pricePerNight, rating, photoUrl } = req.body;
  const home = new Home(
    houseName, location, pricePerNight, rating, photoUrl
  );
  home.save();

  res.render('host/homeAdded', { title: 'Home Added Successfully', currentPage: 'HomeAdded' });
};
