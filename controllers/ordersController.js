const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");

module.exports = {
  findByStatus(req, res) {
    const status = req.params.status;

    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  updateToDispatched(req, res) {
    const order = req.body;

    Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Es gabt einen Fehler beim Aktualisieren der Bestellung",
          error: err,
        });
      }

      // User.findById(order.id_delivery, (err, user) => {
      //   if (user !== undefined && user !== null) {
      //     console.log("NOTIFICATION TOKEN", user.notification_token);
      //     PushNotificationsController.sendNotification(
      //       user.notification_token,
      //       {
      //         title: "Bestellung zugewiesen",
      //         body: "Die Bestellung wurde zugewiesen",
      //         id_notification: "1",
      //       }
      //     );
      //   }
      // });

      return res.status(201).json({
        success: true,
        message: "Die Bestellung wurde erfolgreich aktualisiert",
        data: `${id_order}`, // EL ID
      });
    });
  },
  updateToOnTheWay(req, res) {
    const order = req.body;

    Order.updateToOnTheWay(order.id, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se ha actualizado correctamente",
        data: `${id_order}`, // EL ID
      });
    });
  },
  findDeliveryAndStatus(req, res) {
    const id_delivery = req.params.id_delivery;
    const status = req.params.status;

    Order.findDeliveryAndStatus(id_delivery, status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }

      // for (const d of data) {
      //   d.address = JSON.parse(d.address);
      //   d.client = JSON.parse(d.client);
      //   d.delivery = JSON.parse(d.delivery);
      //   d.products = JSON.parse(d.products);
      // }

      return res.status(201).json(data);
    });
  },
  findClientAndStatus(req, res) {
    const id_client = req.params.id_client;
    const status = req.params.status;

    Order.findClientAndStatus(id_client, status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err,
        });
      }
      // for (const d of data) {
      //   d.address = JSON.parse(d.address);
      //   d.client = JSON.parse(d.client);
      //   d.delivery = JSON.parse(d.delivery);
      //   d.products = JSON.parse(d.products);
      // }

      return res.status(201).json(data);
    });
  },
  updateToDelivered(req, res) {
    const order = req.body;

    Order.updateToDelivered(order.id, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se ha actualizado correctamente",
        data: `${id_order}`, // EL ID
      });
    });
  },

  create(req, res) {
    const order = req.body;
    Order.create(order, async (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error waehren der Bestellungserstellung",
          error: err,
        });
      }
      for (const product of order.products) {
        await OrderHasProducts.create(
          id,
          product.id,
          product.quantity,
          (err, id_data) => {
            if (err) {
              return res.status(501).json({
                success: false,
                message: "Error waehrend der Bestellungserstellung",
                error: err,
              });
            }
          }
        );
      }
      return res.status(201).json({
        success: true,
        message: "Bestellung erfolgreich erstellt",
        data: `${id}`,
      });
    });
  },

  updateLatLng(req, res) {
    const order = req.body;

    Order.updateLatLng(order, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de actualizar la orden",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "La orden se ha actualizado correctamente",
        data: `${id_order}`, // EL ID
      });
    });
  },
};
