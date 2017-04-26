var express = require('express');
var router = express.Router();
var url = require('url');
var cm = require('../plugins/cookie-manager.js');
var dao = require('../dao/dao.js');


router.get('/', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    if (params.id) {
        res.cookie('signin', params.id);
        res.redirect('/signin');
    } else {
        res.render('signin', { title : 'signin' });
    }
});

router.post('/', function(req, res) {
    if (!req.cookies || !req.cookies.signin) {
        res.redirect('/signinresult?error='+'无效的签到');
        return;
    }
    dao.studentsign(1, req.cookies.signin, req.body.form_number, req.body.form_username, function(err, result) {
        if (!err) {
            res.redirect('/signinresult?success=true');
        } else if (err == 1) {
            res.redirect('/signinresult?error='+'学号不在课程中');
        } else if (err == 2) {
            res.redirect('/signinresult?error='+'学号名字不符合');
        } else {
            res.render('error', { message: 'studentsign', error: err });
        }
    });
});

module.exports = router;