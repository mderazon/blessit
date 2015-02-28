var express = require('express');
var hbs = require('hbs');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "blessit.israel@gmail.com",
        pass: "Q1A2Z3X4C5"
    }
});

var content = require('./content');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(morgan());

app.get('/send', function(req, res, next) {
    res.redirect('http://blessit.wix.com/blessit');
});

app.post('/send', function(req, res, next) {
    var body = req.body;

    var mailOptions = {
        from: "contact@blessit.co.il",
        to: "contact@blessit.co.il",
        subject: "New subscriber!",
        text: "שם: " + body.name + "\n" +
              "אימייל: " + body.email + "\n" +
              "כתובת: " + body.address + "\n" +
              "הערה: " + body.comment,
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
    res.send('<div class="modal-body">' +
                'תודה רבה !' +
                '</div>');
});

app.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if (!content[id]) {
        return next();
    }

    res.render('index', {
        data: content[id],
    });
});

app.listen(process.env.PORT || 2000);
console.log('Listening in port ' + (process.env.PORT || 2000), 'NODE_ENV=' + process.env.NODE_ENV || 'development');
