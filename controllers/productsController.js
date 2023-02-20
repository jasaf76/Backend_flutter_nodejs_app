const Product = require("../models/product");
const storage = require("../utils/cloud_storage");
const asyncForEach = require("../utils/async_foreach");

module.exports = {
  findByCategory(req, res) {
    const id_category = req.params.id_category;
    Product.findByCategory(id_category, (err, data) => {
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
  findByNameAndCategory(req, res) {
    const id_category = req.params.id_category;
    const name = req.params.name;

    Product.findByNameAndCategory( id_category,name, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las categorias",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  create(req, res) {
    const product = JSON.parse(req.body.product); // catch input of client

    const files = req.files;

    let inserts = 0;

    if (files.length === 0) {
      return res.status(501).json({
        success: false,
        message: "Es muss mindestens ein Bild hochgeladen werden",
      });
    } else {
      Product.create(product, (err, id_product) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message:
              "Bei der Erstellung des Produkts ist ein Fehler aufgetreten.",
            error: err,
          });
        }
        product.id = id_product;
        const start = async () => {
          await asyncForEach(files, async (file) => {
            const path = `image_${Date.now()}`;
            const url = await storage(file, path);
            if (url != null || url != undefined) {
              // image was uploaded in cloud storage Firebase

              if (inserts == 0) {
                // first image
                product.image1 = url;
              } else if (inserts == 1) {
                // second image
                product.image2 = url;
              } else if (inserts == 2) {
                // third image
                product.image3 = url;
              }
            }
            await Product.update(product, (err, data) => {
              if (err) {
                return res.status(501).json({
                  success: false,
                  message:
                    "Bei der Erstellung des Produkts ist ein Fehler aufgetreten.",
                  error: err,
                });
              }
              inserts++;
              if (inserts == files.length) {
                return res.status(201).json({
                  success: true,
                  message: "Klient wurde Erfolgreich registriert",
                  data: data, // id newUser has successfully register
                });
              }
            });
          });
        };
        start();
      });
    }
  },
  findAll(req, res) {
    Product.findAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener los productos",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Productos obtenidos",
        data: data,
      });
    });
  },
  findById(req, res) {
    const id = req.params.id;

    Product.findById(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener el producto",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Producto obtenido",
        data: data,
      });
    });
  },
  update(req, res) {
    const product = req.body;

    Product.update(product, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar el producto",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Producto actualizado",
        data: data,
      });
    });
  },
  delete(req, res) {
    const id = req.params.id;

    Product.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al eliminar el producto",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Producto eliminado",
        data: data,
      });
    });
  },
};
