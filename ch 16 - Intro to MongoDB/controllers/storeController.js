const Favourite = require('../models/favourites');
const Home = require('../Models/home')

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render('store/index', {
      registeredHomes: registeredHomes,
      title: 'airbnb Home',
      currentPage: 'Index'
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('store/home-list', { registeredHomes: registeredHomes, title: 'Homes List', currentPage: 'Home' });
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', { title: 'Bookings', currentPage: 'Bookings' });
}

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites, registeredHomes);
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()));
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
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log('Home ID Add to Favourites:', result, homeId);
  }).catch(err => {
    console.log('Error while making Favourites:', err);
  }).finally(() => {
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log('Home ID Remove from Favourites:', result, homeId);
  }).catch(err => {
    console.log('Error while removing Favourites:', err);
  }).finally(() => {
    res.redirect("/favourites");
  })
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
      res.render("store/home-detail", { title: "Home Details", currentPage: 'Home', home: home });
    }
  });
}