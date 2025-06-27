const Home = require('../Models/home');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
  console.log("Session Value :", req.session);
  Home.find().then(registeredHomes => {
    res.render('store/index', {
      registeredHomes: registeredHomes,
      title: 'airbnb Home',
      currentPage: 'Index',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('store/home-list', {
      registeredHomes: registeredHomes, title: 'Homes List', currentPage: 'Home',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    title: 'Bookings', currentPage: 'Bookings',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
}



exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites')
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    title: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  })
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
}

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
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
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
}