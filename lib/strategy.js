/**
 * Module dependencies.
 */
var passport = require('passport');
var util = require('util');
var fs = require('fs');

function Strategy(options) {
    if(!options.keytab)
        throw new Error('missing keytab specification for Kerberos strategy');
    if(!options.service_owner)
        throw new Error('missing service_owner specification for Kerberos strategy');
    if(!fs.lstatSync(options.keytab).isFile())
        throw new Error('keytab file ' + keytab + ' not found');
    passport.Strategy.call(this);
    this.name = 'kerberos';
}

util.inherits(Strategy, passport.Strategy);


Strategy.prototype.authenticate = function(req) {

    var authHeader = req.headers.authorization;
    if (!authHeader) { return this.fail('Negotiate'); }
    return this.success("nambar");

};

module.exports = Strategy;
