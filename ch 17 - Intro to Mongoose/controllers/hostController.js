const Home = require('../Models/home')

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { title: 'Add Home', currentPage: 'Add Home', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; // Convert query parameter to boolean

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log('Home not found for editing with ID:', homeId);
      return res.redirect('/host/host-home-list');
    }
    console.log('Home found:', home, 'Editing Home ID:', homeId, 'Editing:', editing);
    res.render('host/edit-home', { title: 'Edit Home', home: home, currentPage: 'host-homes', editing: editing });
  });
}

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('host/host-home-list', { registeredHomes: registeredHomes, title: 'Host Homes List', currentPage: 'host-homes' });
  });
}

exports.postAddHome = (req, res, next) => {
  const { houseName, location, pricePerNight, rating, photoUrl, description } = req.body;
  const home = new Home({ houseName, location, pricePerNight, rating, photoUrl, description });
  home.save().then(() => {
    console.log('Home added successfully:', home);
  }).catch(error => {
    console.error('Error adding home:', error);
  });
  res.redirect('/host/host-home-list');

};

exports.postEditHome = (req, res, next) => {
  const { _id, houseName, pricePerNight, location, rating, photoUrl, description } = req.body;

  Home.findById(_id).then((home) => {
    home.houseName = houseName;
    home.location = location;
    home.pricePerNight = pricePerNight;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home.save().then((result) => {
      console.log('Home updated : ', result);
    }).catch(err => {
      console.log('Error while updating : ', err);
    })
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log('Error while finding Home : ', err);
  })
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Deleting home Id : ', homeId);
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting home:', error);
    // res.redirect("/host/host-home-list");  
  });
};
