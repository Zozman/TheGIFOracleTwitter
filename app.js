var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twit = require('twit');
var request = require('request');

var gifKey = process.env.GIPHYKEY;

var T = new twit({
    consumer_key:         process.env.TWITTERCONSUMERKEY,
    consumer_secret:      process.env.TWITTERCONSUMERSECRET,
    access_token:         process.env.TWITTERACCESSTOKEN,
    access_token_secret:  process.env.TWITTERACCESSSECRET
});

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Helper function to handle Regular Expressions escape
RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Helper function to handle a replace all for a string
String.prototype.replaceAll = function(search, replace) {
    return this.replace(new RegExp(RegExp.escape(search),'g'), replace);
};

var stream = T.stream('statuses/filter', { track: '@thegiforacle' });

stream.on('tweet', function (tweet) {
  //console.log("TEXT: " + tweet.text);
  //console.log("USER: " + tweet.user.screen_name);
  
  var tweetText = tweet.text;
  var fromUser = "@" + tweet.user.screen_name;
  
  var searchTerm = tweetText.toLowerCase().replaceAll('@thegiforacle ','');
  var formattedSearchTerm = searchTerm.replaceAll(' ','+');
  
  var URL = "http://api.giphy.com/v1/gifs/random?api_key=" + gifKey + "&tag=" + formattedSearchTerm;
  
  var result = "";
  
  console.log("Starting request with URL " + URL);
  
  request(URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsonResponse = JSON.parse(body);
      // Attempt to get a result URL
	    try {
	       result = jsonResponse.data.url;
	    // If a URLis ot returned, set null
	    } catch (Exception) {
	       		result = null;
	    }
      if (result !== null) {
        var status = fromUser + " " + result;
        console.log("RESULT: " + status);
        T.post('statuses/update', { status: status }, function(err, data, response) {
          console.log(data);
        })
      }
    }
  });
})

module.exports = app;
