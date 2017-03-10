const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
//serve up public folder on endpoint '/'
app.use(express.static(path.join(__dirname, '../public')));
//serve up bundles folder on endpoint '/bundles'
app.use('/bundles', express.static(path.join(__dirname, '/../bundles')));

app.get('/api/test', function (req, res, next){
  res.send('what the fuck is up');
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

