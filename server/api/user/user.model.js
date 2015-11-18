'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
		Schema = mongoose.Schema,
		UserModel = new Schema({
			name: String,
      email: {
        type: String,
        lowercase: true
      },
      role: {
        type: String,
        default: 'user'
      },
			hashedPassword: String,
      provider: String,
      salt: String
		});

/* VIRTUALS */

// Sensitive Info
UserModel.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public User Info
UserModel.virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-Sensitive Info (Web Token)
UserModel.virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });


/* PATH VALIDATIONS */

// Validate empty email
UserModel.path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserModel.path('hashedPassword')
  .validate(function(hashPass) {
    return hashPass.length;
  }, 'Password cannot be blank');

// Validate email availability
UserModel.path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({
      email: value
    },
    function(err, user) {
      if(err) {
        throw err;
      }
      if(user) {
        if(self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'The email you provided is already registered');

var validatePresenceOf = function(value) {
  return value && value.length;
};


/* PRE-SAVE HOOK */

UserModel.pre('save', function(next) {
  if(!this.isNew) {
    return next();
  }
  if(!validatePresenceOf(this.hashedPassword)) {
    next(new Error('Invalid password'));
  }
  else {
    next();
  }
});


/* METHODS */

UserModel.methods = {

  /*
    Method: authenticate
    Check if passwords are the same

    params: String plainText
    returns: Boolean
  */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /*
    Method: makeSalt
    Generates a salt

    params: none
    returns: String
  */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /*
    Method: encryptPassword
    Encrypts a provided password

    params: String password
    returns: String
  */
  encryptPassword: function(password) {
    if(!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');

    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }

};

module.exports = mongoose.model('User', UserModel);
