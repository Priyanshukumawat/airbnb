const Home = require('../Models/home')
const fs = require('fs');

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    title: 'Add Home',
    currentPage: 'Add Home',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
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
    res.render('host/edit-home', {
      title: 'Edit Home',
      home: home,
      currentPage: 'host-homes',
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
}

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      title: 'Host Homes List',
      currentPage: 'host-homes',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
}

exports.postAddHome = (req, res, next) => {
  const { houseName, location, pricePerNight, rating, description } = req.body;
  console.log(houseName, location, pricePerNight, rating, description)

  console.log("req body:", req.body)
  console.log("req file :", req.file)

  if (!req.files || !req.files['photo'] || !req.files['document']) {
    return res.status(422).send("Image or document missing");
  }

  const photo = req.files['photo'][0].path;
  const document = req.files['document'][0].path;


  const home = new Home({
    houseName,
    location,
    pricePerNight,
    rating,
    photo,
    document,
    description
  });
  home.save().then(() => {
    console.log('Home added successfully:', home);
  }).catch(error => {
    console.error('Error adding home:', error);
  });
  res.redirect('/host/host-home-list');

};

exports.postEditHome = (req, res, next) => {
  const { _id, houseName, pricePerNight, location, rating, description } = req.body;

  Home.findById(_id).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home-list");
    }

    // Update text fields
    home.houseName = houseName;
    home.location = location;
    home.pricePerNight = pricePerNight;
    home.rating = rating;
    home.description = description;

    // Handle photo update
    if (req.files && req.files['photo'] && req.files['photo'][0]) {
      const newPhoto = req.files['photo'][0].path;

      if (home.photo && fs.existsSync(home.photo)) {
        fs.unlink(home.photo, (err) => {
          if (err) console.log("Error deleting old photo:", err);
        });
      }

      home.photo = newPhoto;
    }

    // Handle document update
    if (req.files && req.files['document'] && req.files['document'][0]) {
      const newDoc = req.files['document'][0].path;

      if (home.document && fs.existsSync(home.document)) {
        fs.unlink(home.document, (err) => {
          if (err) console.log("Error deleting old document:", err);
        });
      }

      home.document = newDoc;
    }

    return home.save();
  }).then((updatedHome) => {
    console.log("Home updated:", updatedHome);
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while updating home:", err);
    res.redirect("/host/host-home-list");
  });
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
