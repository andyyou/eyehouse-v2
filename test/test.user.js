var should = require('should');
var mongoose = require('mongoose');
var Account = require('../models/account');
var db;

describe('Account', function () {
  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function (done) {
    var account = new Account({
      username: '12345',
      password: 'testy'
    });

    account.save(function (err) {
      if (err)
        console.log('ERROR: ', err.message);
      else
        console.log('Account save OK!');
      done();

    });
  });

  it('find a user by username', function (done) {
    Account.findOne({username: '12345'}, function (err, account) {
      account.username.should.eql('12345');
      console.log('  username: ', account.username);
      done();
    });
  });

  afterEach(function (done) {
    Account.remove({}, function () {
      done();
    });
  });
});
