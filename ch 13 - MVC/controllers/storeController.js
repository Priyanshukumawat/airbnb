const Home = require('../Models/home')

exports.getIndex = (req, res, next) => {
  Home.fetchAll(registeredHomes => {
    res.render('store/index', { registeredHomes: registeredHomes, title: 'airbnb Home', currentPage: 'Index' });
  });
}

exports.getHomes = (req, res, next) => {
  Home.fetchAll(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('store/home-list', { registeredHomes: registeredHomes, title: 'Homes List', currentPage: 'Home' });
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', { title: 'Bookings', currentPage: 'Bookings' });
}

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll(registeredHomes => {
    res.render('store/favourite-list', { registeredHomes: registeredHomes, title: 'My Favourites', currentPage: 'Favourites' });
  });
}
