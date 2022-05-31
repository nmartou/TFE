const express = require('express');
const quizRoutes = require('./prisma/routes/quiz.routes');
const authRoutes = require('./prisma/routes/auth.route');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();

const app = express(); 
const port = process.env.PORT || 5000;

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

// create a GET route
/*app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});*/

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next()
});*/

app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})



module.exports = app;