'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'meanApp-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  keys:{
    access: process.env.access,
    secret: process.env.secret,
    bucket: process.env.bucket,
    region: process.env.region
  },

  facebook: {
    //clientID:     process.env.FACEBOOK_ID || 'id',
    clientID:     '1338166652921758',
    //clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    clientSecret: '3fb839d96174ab2ab1c71c6bf7cf45e9',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:    "0EfVanY8ZjWM1crfWaiZZjW6v",
    clientSecret: 	"Y13giFHltCi9ZbwickacwslSKhudLQ7hby81yjRo3PRC21hpdJ",
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    /*clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'*/
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});