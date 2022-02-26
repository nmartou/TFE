const express = require('express');
const quizRoutes = require('./prisma/routes/quiz.routes');
const createError = require('http-errors');
const morgan = require('morgan');
require("dotenv").config();

const app = express(); 
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
/*app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});*/

app.use("/api/quiz", quizRoutes);

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