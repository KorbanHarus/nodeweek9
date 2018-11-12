var assert = require('assert');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});
app.set('view engine', 'ejs');

var mongourl = "mongodb://harus:a1b9c2d8@ds021681.mlab.com:21681/migrating";
var photoSchema = mongoose.Schema({
  title: {
    type: String
  },
  describe: {
    type: String
  },
  mimetype: {
    type: String
  },
  image: {
    type: String
  }
});
app.get('/photo', function (req, res) {
  mongoose.connect(mongourl, {
    useNewUrlParser: true
  });
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    let photo = mongoose.model('photo', photoSchema, 'photo');

    photo.find({
      _id: req.query.id
    }, function (err, results) {
      if (err) {
        throw err;
      }

      res.status(200);
      res.render('photo', {
        'result': results
      });
      db.close();
    });
  });
});

app.post('/upload', upload.single('photo'), function (req, res) {
  if (req.body) {
    let photo = mongoose.model('photo', photoSchema, 'photo');
    let data = Buffer.from(req.file.buffer).toString('base64');
    console.log(data);
    let upPhoto = new photo({
      title: req.body.title,
      mimetype: req.file.mimetype,
      describe: req.body.describe,
      image: data
    });
    mongoose.connect(mongourl, {
      useNewUrlParser: true
    });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      upPhoto.save(function (error) {
        if (error) {
          throw error;
        }
        console.log('upload successed');
        db.close();
        res.redirect('/list');
      });
    });
  }
});

app.get('/upload', function (req, res) {
  res.status(200);
  res.render('upload');
});

app.get('/list', function (req, res) {
  let photo = mongoose.model('photo', photoSchema, 'photo');
  mongoose.connect(mongourl, {
    useNewUrlParser: true
  });
  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    photo.find(function (error, results) {
      if (error) {
        throw error;
      }
      res.status(200);
      res.render('list', {
        result: results
      });
      db.close();
      console.log(JSON.stringify(results));
    }).select({
      _id: 1,
      title: 1
    });
  });

});


app.listen(process.env.PORT || 8099);