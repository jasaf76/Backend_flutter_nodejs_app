const User = require("../models/user");

module.exports = {
  register(req, res) {
    const user = req.body; // catch input of client
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Some error occurred while creating the User.",
          error: err,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data:data // id newUser has succesfully register
        });
      }
    });
  },
};
