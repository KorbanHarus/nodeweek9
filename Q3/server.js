var express = require("express");
var app = express();

app.set('view engine', 'ejs');

app.get("/perimeter", function (req, res) {
    if (req.query.length) {
        res.status(200);
        res.render('result', {
            "answer": (req.query.length * 4)
        });
    } else {
        res.status(500).end('bad url');
    }
});

app.get("/area", function (req, res) {
    if (req.query.length) {
        res.status(200);
        res.render('result', {
            'answer': (req.query.length * req.query.length)
        });
    } else {
        res.status(500).end('bad url');
    }
});

app.listen(app.listen(process.env.PORT || 8099));