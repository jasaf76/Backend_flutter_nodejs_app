const Category = require("../models/category");

module.exports = {
  create(req, res) {
    const category = req.body;
    Category.create(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error waehrend der Kategorieerstellung",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Kategorie erfolgreich erstellt",
        data: `${id}`,
      });
    });
  },
  getAll(req, res) {
    Category.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener las categorias",
          error: err,
        });
      }
      return res.status(200).json(data);
    });
  },
  findById(req, res) {
    const id = req.params.id;

    Category.findById(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener la categoria",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Categoria obtenida",
        data: data,
      });
    });
  },
  update(req, res) {
    const category = req.body;

    Category.update(category, (err, data) => {

      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar la categoria",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Categoria actualizada",
        data: data,
      });
    });
  },
  delete(req, res) {
    const id = req.params.id;

    Category.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al eliminar la categoria",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Categoria eliminada",
        data: data,
      });
    });
  },
};
