const Home = require('../Models/home')

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { title: 'Add Home', currentPage: 'Add Home', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; // Convert query parameter to boolean

  Home.findById(homeId, home => {
    if (!home) {
      console.log('Home not found for editing with ID:', homeId);
      return res.redirect('/host/host-home-list');
    }
    console.log('Home found:', home, 'Editing Home ID:', homeId, 'Editing:', editing);
    res.render('host/edit-home', { title: 'Edit Home', home: home, currentPage: 'host-homes', editing: editing });
  });
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

  res.redirect('/host/host-home-list');

};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, location, pricePerNight, rating, photoUrl } = req.body;
  const home = new Home(
    houseName, location, pricePerNight, rating, photoUrl
  );
  home.id = id;
  home.save();

  res.redirect('/host/host-home-list');
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Deleting home Id : ', homeId);
  Home.deleteById(homeId, error => {
    if (error) {
      console.log('Error while deleting ', error);
    }
    res.redirect("/host/host-home-list");
  })
};
