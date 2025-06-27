const Favourite = require('../models/favourites');
const Home = require('../Models/home')

exports.getIndex = (req, res, next) => {
  console.log("Session Value :", req.session);
  Home.find().then(registeredHomes => {
    res.render('store/index', {
      registeredHomes: registeredHomes,
      title: 'airbnb Home',
      currentPage: 'Index',
      isLoggedIn: req.isLoggedIn
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('store/home-list', {
      registeredHomes: registeredHomes, title: 'Homes List', currentPage: 'Home',
      isLoggedIn: req.isLoggedIn
    });
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    title: 'Bookings', currentPage: 'Bookings',
    isLoggedIn: req.isLoggedIn
  });
}



exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate('houseId')
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        title: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn
      })
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  Favourite.findOne({ houseId: homeId }).then((fav) => {
    if (fav) {
      console.log("Already marked as Favourite");
    } else {
      fav = new Favourite({ houseId: homeId });
      fav.save().then((result) => {
        console.log("Favourite Added :", result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log('Error while making Favourites:', err);
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId }).then(result => {
    console.log('Home ID Remove from Favourites:', result, homeId);
  }).catch(err => {
    console.log('Error while removing Favourites:', err);
  });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Home ID:', homeId);
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log('Home Not Found:');
      res.redirect("/home");
    } else {

      console.log('Home Details Found:', home);
      res.render("store/home-detail", {
        title: "Home Details",
        currentPage: 'Home', home: home,
        isLoggedIn: req.isLoggedIn
      });
    }
  });
}