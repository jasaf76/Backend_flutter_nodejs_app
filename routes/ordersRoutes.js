const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), ordersController.create);
  app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', { session: false }), ordersController.findByStatus);
   app.get(
     "/api/orders/findClientAndStatus/:id_client/:status",
     passport.authenticate("jwt", { session: false }),
     ordersController.findClientAndStatus
   );
  app.get(
    "/api/orders/findDeliveryAndStatus/:id_delivery/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findDeliveryAndStatus
  );
   app.put(
     "/api/orders/updateToDispatched",
     passport.authenticate("jwt", { session: false }),
     ordersController.updateToDispatched
  );
   app.put(
     "/api/orders/updateToOnTheWay",
     passport.authenticate("jwt", { session: false }),
     ordersController.updateToOnTheWay
  );
    app.put(
      "/api/orders/updateToDelivered",
      passport.authenticate("jwt", { session: false }),
      ordersController.updateToDelivered
    );
 app.put(
   "/api/orders/updateLatLng",
   passport.authenticate("jwt", { session: false }),
   ordersController.updateLatLng
 );
}