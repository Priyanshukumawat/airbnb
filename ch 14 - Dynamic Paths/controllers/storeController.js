const Favourite = require('../models/favourites');
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
  Favourite.getFavourites(favourites => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        title: "My Favourites",
        currentPage: "favourites",
      })
    });
  })

};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  console.log('Home ID to Add to Favourites:', req.body, homeId);
  Favourite.addToFavourite(req.body.homeId, error => {
    if (error) {
      console.error('Error adding to favourites:', error);
    }
    res.redirect("/favourites");
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Home ID:', homeId);
  Home.findById(homeId, home => {
    if (!home) {
      console.log('Home Not Found:');
      res.redirect("/home");
    } else {

      console.log('Home Details Found:', home);
      res.render("store/home-detail", { title: "Home Details", currentPage: 'Home', home: home });
    }
  });
}