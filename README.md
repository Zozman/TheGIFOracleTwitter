## The GIF Oracle For Twitter ##

The GIF Oracle for Twitter is a Node application that can be linked to a Twitter account to deliver random animated GIFs based on a @message to the account.  It is an experiment in building a Twitter bot using Node.

How To Use
-------
 - Send a Tweet to [@TheGIFOracle](https://twitter.com/TheGIFOracle)
  - EX: "@TheGIFOracle NOPE"
 - [@TheGIFOracle](https://twitter.com/TheGIFOracle) will return a link to an animated GIF (possibly) dealing with the subject (the result is random and changes every time).  If it cannot find a GIF for it, it will let you know.
 
 ![NOPE GIF](http://media.giphy.com/media/xTiTneMy3TmvuNtOW4/giphy.gif)

Dependencies
-------

 - [Node](https://nodejs.org/)
 - [Twit](https://github.com/ttezel/twit)
 - [Request](https://github.com/request/request)
 - [Express](http://expressjs.com/)
 - [Giphy API Access](https://api.giphy.com/)

About
-------
This application was built as an exercise in learning the Twitter Streaming API and how it works.  It was also built for fun.  

![Powered By Giphy](https://raw.githubusercontent.com/Zozman/TheGifOracleChrome/master/screenshots/giphyLogo.gif)
