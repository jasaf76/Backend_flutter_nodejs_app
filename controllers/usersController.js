const User = require("../models/user");
const Rol = require("../models/rol");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const storage = require("../utils/cloud_storage");

module.exports = {
  findDeliveryMen(req, res) {
    User.findDeliveryMen((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con al listar los repartidores",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email, async (err, myUser) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Beim Einloggen ist ein Fehler aufgetreten.",
          error: err,
        });
      }
      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "Benutzer nicht autorisiert.",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, myUser.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {}
        );
        const data = {
          id: `${myUser.id}`,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles: myUser.roles,
        };
        return res.status(201).json({
          success: true,
          message: "Benutzer wurde authentifiziert",
          data: data, // id newUser has successfully register
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Der Password wurde nicht gefunden.",
        });
      }
    });
  },
  register(req, res) {
    const user = req.body; // catch input of client
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message:
            "Bei der Erstellung des Benutzers ist ein Fehler aufgetreten.",
          error: err,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: data, // id newUser has successfully register
        });
      }
    });
  },
  async registerWithImage(req, res) {
    const user = JSON.parse(req.body.user); // catch input of client
    const files = req.files;
    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != null || url != undefined) {
        user.image = url;
      }
    }
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message:
            "Bei der Erstellung des Benutzers ist ein Fehler aufgetreten.",
          error: err,
        });
      } else {
        user.id = `${data}`;
        const token = jwt.sign(
          { id: user.id, email: user.email },
          keys.secretOrKey,
          {}
        );
        user.session_token = `JWT ${token}`;

        Rol.create(user.id, 3, (err, data) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message:
                "Bei der Erstellung des Benutzers ist ein Fehler aufgetreten.",
              error: err,
            });
          } else {
            return res.status(201).json({
              success: true,
              message: "Klient wurde Erfolgreich registriert",
              data: user, // id newUser has successfully register
            });
          }
        });
      }
    });
  },

  async updateWithImage(req, res) {
    const user = JSON.parse(req.body.user); // catch input of client
    const files = req.files;
    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != null || url != undefined) {
        user.image = url;
      }
    }
    User.update(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message:
            "Bei der Aktualisierung des Benutzers ist ein Fehler aufgetreten.",
          error: err,
        });
      }
      User.findById(user.id, (err, myData) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message:
              "Bei der Aktualisierung des Benutzers ist ein Fehler aufgetreten.",
            error: err,
          });
        }
        myData.session_token = user.session_token;
        // myData.roles = JSON.parse(myData.roles);
        return res.status(201).json({
          success: true,
          message: "Klient wurde Erfolgreich aktualisiert",
          data: myData, // id newUser has successfully register
        });
      });
    });
  },
  async updateWithoutImage(req, res) {
    const user = req.body; // catch input of client

    User.updateWithoutImage(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message:
            "Bei der Aktualisierung  des Benutzers ist ein Fehler aufgetreten.",
          error: err,
        });
      }
      User.findById(data, (err, myData) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message:
              "Bei der Aktualisierung des Benutzers ist ein Fehler aufgetreten.",
            error: err,
          });
        }
        myData.session_token = user.session_token;
        // myData.roles = JSON.parse(myData.roles);

        return res.status(201).json({
          success: true,
          message: "Klient wurde Erfolgreich aktualisiert",
          data: myData, // id newUser has successfully register
        });
      });
    });
  },

  async updateNotificationToken(req, res) {
    const id = req.body.id;
    const token = req.body.token;

    User.updateNotificationToken(id, token, (err, id_user) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message:
            "Hubo un error actualizando el token de notificaciones del usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El token se actualizo correctamente",
        data: id_user,
      });
    });
  },
};
