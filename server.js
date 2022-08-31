const express = require('express');
const quizRoutes = require('./prisma/routes/quiz.routes');
const authRoutes = require('./prisma/routes/auth.route');
const homeRoutes = require('./prisma/routes/home.route');

const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();

const app = express(); 
const port = process.env.PORT || 5000;

const path = require('path')
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.use(express.static('public', {
  setHeaders: function(res, path) {
      if(path.endsWith(".unityweb")){
          res.set("Content-Encoding", "gzip");
      }
  }
}));

//var publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static('public')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/*app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:3000'
}));*/

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
});*/

// Use to redirect http app on https
/*app.use(function(request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
})*/

// Routes used for the API
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// Catch all bad requests and send back a 404 error
/*app.use((req, res, next) => {
  next(createError.NotFound());
})*/

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})

/*app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, './frontend/build/')});
});*/

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/frontend/build/index.html'))
})

module.exports = app;