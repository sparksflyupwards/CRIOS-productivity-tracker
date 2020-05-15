const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );

    const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const authenticationRouter = require('./routes/auth');
app.use('/auth', authenticationRouter)

const sessionRouter = require('./routes/session');
app.use('/session', sessionRouter)

const statisticsRouter = require('./routes/statistics');
app.use('/statistics', statisticsRouter)

app.listen(port, ()=>{
    console.log(`listening at port: ${port}`)
});