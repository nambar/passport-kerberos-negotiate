'use strict';

var pkg = require('../package.json');
var exec = require('child_process').exec;
var express = require('express');
var session = require('express-session');
var url = require('url');
var passport = require('passport');
var KerberosStrategy = require( '../lib' ).Strategy;
var app = express();

/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));*/

app.use(passport.initialize());
app.use(passport.session());

passport.use(new KerberosStrategy(
        {
            keytab: '/path/to/keytab',
            service_owner: 'sys_nbflow'
        },
        function(principal, done) {
            return done(null, principal);
        })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

function doExec(cmd, res) {
    exec(cmd, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
            res.json( { error : error} );
        } else {
            res.json(stdout.split('\n'));
        }
    });

}

app.get('/',
    passport.authenticate('kerberos'),
    function(req, res) {
        res.json({ user : req.user });
    }
);

var server = app.listen(3000, function () {
    console.log('server is running on http://localhost:' + server.address().port);
});
