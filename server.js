const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport"); // Passport for authentication
const multer = require("multer");
const io = require("socket.io")(server);

/*
 * ROUTES
 *Importing sockets
 */
const ordersSocket = require("./sockets/ordersSocket");
/*
 * ROUTES
 *Importing routes
 */

const port = process.env.PORT || 3000;

const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const addressRoutes = require("./routes/addressRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

/*
 * ROUTES
 *Get sockets
 */

 ordersSocket(io);


const upload = multer({
  storage: multer.memoryStorage(),
});
/*
 * ROUTES
 *Get routes
 */
usersRoutes(app, upload);
categoriesRoutes(app);
productRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app);

server.listen(port, "192.168.178.25" || "localhost", function () {
  console.log(
    "NodeJS server " +
      process.pid +
      " listening on port " +
      port +
      "...Ready to accept requests!"
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.stack, "Something broke!");
  next();
});
