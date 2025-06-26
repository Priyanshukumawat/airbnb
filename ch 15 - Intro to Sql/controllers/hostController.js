const Home = require('../Models/home')

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { title: 'Add Home', currentPage: 'Add Home', editing: false });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; // Convert query parameter to boolean

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0]; // Extract the first element from the array
    if (!home) {
      console.log('Home not found for editing with ID:', homeId);
      return res.redirect('/host/host-home-list');
    }
    console.log('Home found:', home, 'Editing Home ID:', homeId, 'Editing:', editing);
    res.render('host/edit-home', { title: 'Edit Home', home: home, currentPage: 'host-homes', editing: editing });
  });
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    // console.log('Registered Homes:', registeredHomes);
    res.render('host/host-home-list', { registeredHomes: registeredHomes, title: 'Host Homes List', currentPage: 'host-homes' });
  });
}

exports.postAddHome = (req, res, next) => {
  const { houseName, location, pricePerNight, rating, photoUrl, description } = req.body;
  const home = new Home(
    houseName, location, pricePerNight, rating, photoUrl, description);
  home.save();

  res.redirect('/host/host-home-list');

};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, location, pricePerNight, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, location, pricePerNight, rating, photoUrl, description);
  home.id = id; // Ensure the ID is set for the existing home
  home.save();
  res.redirect('/host/host-home-list');
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Deleting home Id : ', homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting home:', error);
    // res.redirect("/host/host-home-list");  
  });
};
