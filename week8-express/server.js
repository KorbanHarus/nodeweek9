var mongoose = require('mongoose');
var express = require('express');
var app = express();

var kittySchema = require('./models/kitty');
var mongoURL = 'mongodb://harus:a1b9c2d8@ds021681.mlab.com:21681/migrating';
app.set('view engine', 'ejs');

app.get('/create', function (req, res) {

    mongoose.connect(mongoURL, {
        useNewUrlParser: true
    });

    var db = mongoose.connection;
    console.log('connected');

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log('db connect success');

        var Kitten = mongoose.model('Kitten', kittySchema, 'kit');

        try {
            var kitty = new Kitten({
                'name': req.query.name,
                'age': parseInt(req.query.age)
            });

            kitty.save(function (error) {
                if (error) {
                    throw error;
                }
                console.log('kitty created');
                res.status(200);
                res.render('result', {
                    'result': 'kitty is created'
                });
                db.close();
            });
        } catch (error) {
            res.status(500).end(error.toString());
        }
    });
});

app.get('/delete', function (req, res) {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true
    });

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var kitten = mongoose.model('Kitten', kittySchema, 'kit');
        kitten.deleteOne({
            naem: req.query.name
        }, function (error) {
            if (error) {
                throw error;
            }
            res.status(200).end('Kitty is removed');
            db.close();
        });

    });
});

app.listen(process.env.PORT || 8099);
// var http = require('http');
// var url = require('url');

// var kittySchema = require('./models/kitty');


// var server = http.createServer(function (req, res) {
//     var parsedURL = url.parse(req.url, true);
//     var queryAsObject = parsedURL.query;

//     switch (parsedURL.pathname) {
//         case "/create":
//             mongoose.connect('mongodb://harus:a1b9c2d8@ds021681.mlab.com:21681/migrating', {
//                 useNewUrlParser: true
//             });
//             var db = mongoose.connection;
//             console.log("connected");
//             db.on('error', console.error.bind(console, 'connection error:'));
//             db.once('open', function () {
//                 console.log("db connect success");
//                 var Kitten = mongoose.model('kits', kittySchema, 'kit');
//                 try {
//                     var kittys = new Kitten({
//                         name: queryAsObject.name,
//                         age: parseInt(queryAsObject.age)
//                     });
//                     kittys.save(function (err) {
//                         if (err) {
//                             throw err;
//                         }
//                         console.log('Kitten created');
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         });
//                         res.end('Kitten created');
//                         db.close();
//                     });
//                 } catch (error) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     });
//                     res.end(error.toString());
//                 }


//             });
//             break;
//         case '/delete':
//             mongoose.connect('mongodb://harus:a1b9c2d8@ds021681.mlab.com:21681/migrating', {
//                 useNewUrlParser: true
//             });
//             var db = mongoose.connection;
//             console.log('connected');
//             db.on('error', console.error.bind(console, 'connection error:'));
//             db.once('open', function () {
//                 var Kitten = mongoose.model('Kitten', kittySchema, 'kit');
//                 Kitten.remove({
//                     name: queryAsObject.name
//                 }, function (error) {
//                     if (error) {
//                         throw error;
//                     }
//                     console.log('Kitten removed');
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     });
//                     res.end('Kitten removed');
//                     db.close();
//                 });
//             });
//             break;
//         default:

//             break;
//     }
// });

// server.listen(process.env.PORT || 8099);