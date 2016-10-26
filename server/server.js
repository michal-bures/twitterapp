
const url = require("url");
const OAuth2 = require("OAuth").OAuth2; 
const Twitter = require("Twitter");
const express = require("express");

const AUTH = {
    KEY : "OYKM1yVJUdVf1RTSCyVkbIDBl",
    SECRET : "GOdwA5fUK1JL7bgjvhabHKBIQaneygOrcuxfyFHNx2Hbr8Daus",
    TOKEN : "AAAAAAAAAAAAAAAAAAAAANV6xgAAAAAAt0mlXSXMIXTg7wS%2F5qgyXPFDykU%3DGKjbaEJlC6qiImrFD63gOTulbLEpwysku6n0QgrnvJGvxMvCxF"
}

const HTTP_PORT = 3001;

function requestAuthToken(callback) {
    var oauth2 = new OAuth2(AUTH.KEY, AUTH.SECRET, "https://api.twitter.com/", null, "oauth2/token", null);
    oauth2.getOAuthAccessToken("", {
        "grant_type": "client_credentials"
    }, callback);
}

// --- Entry point ---

// Request OAuth2 auth token if not yet hardcoded
if (!AUTH.TOKEN) {
    requestAuthToken((e, token) => {
        if (e) throw e;
        console.log("No OAuth2 access token is configured. You can use this one I just requested (put it in AUTH.TOKEN): ", token);
        process.exit(1);
    })
} else {
    var twitter = new Twitter({
        consumer_key: AUTH.KEY,
        consumer_secret: AUTH.SECRET,
        bearer_token: AUTH.TOKEN,
    });
    var httpServer = express();

    httpServer.use(express.static(__dirname + "/../build"));

    httpServer.get("/tweets", function(request, resp) {
        var user = url.parse(request.url, true).query.u;
        if (!user) return resp.status(400).send("No user specified");

        twitter.get("statuses/user_timeline", {
            screen_name: user, 
            count: 50, 
            include_entities: true
        }, function(error, tweets, response) {
            if (error) return resp.status(400).send(error);
            resp.status(200).send(tweets);
        });
      });

    console.log("Listening on localhost:"+HTTP_PORT);
    httpServer.listen(HTTP_PORT);
}

