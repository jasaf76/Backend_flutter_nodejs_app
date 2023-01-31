const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

app.set('port', port);

 server.listen(port, "192.168.178.25" || "localhost", function () {
   console.log(
     "NodeJS server " +
       process.pid +
       " listening on port " +
       port +
       "...Ready to accept requests!"
   );
 });

 app.get('/', (req, res) => {
   res.send('Hello World!')
 })

 // error handler
app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(err.status || 500).send(err.stack,'Something broke!');
  next();
});