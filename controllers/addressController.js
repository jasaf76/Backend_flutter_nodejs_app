const Address = require("../models/address");

module.exports = {
  create(req, res) {
    const address = req.body;
    Address.create(address, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error während des Hinzufügens der Adresse",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Adresse erfolgreich hinzugefügt",
        data: `${id}`,
      });
    });
  },
};
