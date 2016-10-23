'use strict';

const url = require("url");
const OAuth2 = require('OAuth').OAuth2; 
const Twitter = require('Twitter');
const express = require('express');

const AUTH = {
    KEY : 'OYKM1yVJUdVf1RTSCyVkbIDBl',
    SECRET : 'GOdwA5fUK1JL7bgjvhabHKBIQaneygOrcuxfyFHNx2Hbr8Daus',
    TOKEN : 'AAAAAAAAAAAAAAAAAAAAANV6xgAAAAAAt0mlXSXMIXTg7wS%2F5qgyXPFDykU%3DGKjbaEJlC6qiImrFD63gOTulbLEpwysku6n0QgrnvJGvxMvCxF'
}

function requestAuthToken(callback) {
    let oauth2 = new OAuth2(AUTH.KEY, AUTH.SECRET, 'https://api.twitter.com/', null, 'oauth2/token', null);
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, callback);
}

/** Entry point */

var cache = {};

// Request OAuth2 auth token if not yet hardcoded
if (!AUTH.TOKEN) {
    requestAuthToken((e, token) => {
        if (e) throw e;
        console.log("No OAuth2 access token is configured. You can use this one I just requested (put it in AUTH.TOKEN): ", token);
        process.exit(1)
    })
} else {
    let twitter = new Twitter({
        consumer_key: AUTH.KEY,
        consumer_secret: AUTH.SECRET,
        bearer_token: AUTH.TOKEN,
    });
    let httpServer = express();

    httpServer.use("/", express.static('../public'));

    httpServer.get('/tweets', function(request, resp) {
        let user = url.parse(request.url, true).query.u;
        if (!user) return resp.status(400).send("No user specified");

        if (cache[user]) {
            return resp.status(200).send(cache[user]);
        }

        twitter.get('statuses/user_timeline', {screen_name: user, count: 50, include_entities: true}, function(error, tweets, response) {
            if (error) return resp.status(500).send(error);
            cache[user] = tweets;
            resp.status(200).send(tweets);
        });
      });

    httpServer.listen(3001);
}

