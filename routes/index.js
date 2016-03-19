var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var House = require('../models/house');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/house/:id', function(req, res, next) {
  res.render('show', { title: 'Express', user: req.user });
});

router.get('/register', function (req, res) {
  res.render('register', {});
});

router.post('/register', function (req, res) {
  Account.register(
    new Account({username: req.body.username}),
    req.body.password,
    function (err, account) {
      if (err) {
        return res.render('register', {info: 'Sorry. That username already exists. Try again.'});
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  );
});

router.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send('pong!');
});

router.get('/explore', function (req, res) {
  var houses = House.find(function (err, houses) {
    if (err) return console.error(err);

    res.render('explore', { title: 'Express', user: req.user, houses: houses})
  });

});

router.get('/house', function (req, res) {
  res.render('house', { title: 'Express', user: req.user });
});

router.post('/house', function (req, res) {
  console.log(req.body);
  var house = new House({
    name: req.body.name,
    description: req.body.description,
    cover: req.body.cover
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
})

router.post('/r', function (req, res) {
  console.log('r');
  socket.write('e');
  res.json({direction: "r"});
});

router.post('/l', function (req, res) {
  console.log('l');
  socket.write('q');
  res.json({direction: "l"});
});

router.post('/stop', function (req, res) {
  console.log('s');
  socket.write('s');
  res.json({direction: "s"});
});

router.post('/save', function (req, res) {
  console.log('save');
  socket.write('save');
  res.json({message: "save"});
});

module.exports = router;
