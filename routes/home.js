var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var dao = require('../dao/dao.js');
var helper = require('../plugins/route-helper.js');
var cm = require('../plugins/cookie-manager.js');

router.get('/user', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        res.render('home/user', { user : user });
    }).catch(helper.catchError(res, next));
});

router.get('/help', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        res.render('home/help');
    }).catch(helper.catchError(res, next));
});

router.get('/course', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.getcoursebyaccount(user);
    }).then((result) => {
        var courses = JSON.parse(JSON.stringify(result));
        res.render('home/course', { title: '课程列表', courses: courses });
    }).catch(helper.catchError(res, next));
});

router.get('/signin', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.getsignbyaccount(user);
    }).then((result) => {
        var signin = JSON.parse(JSON.stringify(result));
        signin.forEach(helper.dateConverter);
        res.render('home/signin', { title: '签到列表', signin: signin });
    }).catch(helper.catchError(res, next));
});

router.get('/exam', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        res.render('home/exam', { title: '测验列表' });
    }).catch(helper.catchError(res, next));
});

router.get('/addcourse', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        res.render('home/coursedetail', { title: '添加课程' });
    }).catch(helper.catchError(res, next));
});

router.post('/addcourse', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.addcourse(user, req.body.form_coursename, req.body.form_coursetime, req.body.form_courseinfo);
    }).then((cid) => {
        return helper.parseStu(cid, req.body.students);
    }).then((result) => {
        if (result.stuArray.length) {
            return dao.addstutocourse(result.cid, result.stuArray);
        }
    }).then(() => {
        res.status(302).send('#course');
    }).catch(helper.catchError(res, next));
});

router.get('/signindetail', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checksign(user, req.query.cid, req.query.sid)
    }).then(() => {
        return dao.getsignbyid(req.query.sid)
    }).then((result) => {
        result = JSON.parse(JSON.stringify(result));
        result.forEach(helper.dateConverter);
        res.render('home/signindetail', { course_id : req.query.cid, signin_id : req.query.sid, signindetail: result });
    }).catch(helper.catchError(res, next));
});


router.post('/editcourse', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        return dao.updatecourse(req.query.cid, req.body.form_coursename,
            req.body.form_coursetime, req.body.form_courseinfo);
    }).then(() => {
        return dao.delstuofcourse(req.query.cid);
    }).then(() => {
        return helper.parseStu(req.query.cid, req.body.students);
    }).then((result) => {
        if (result.stuArray.length) {
            return dao.addstutocourse(result.cid, result.stuArray);
        }
    }).then(() => {
        res.status(302).send('#course');
    }).catch(helper.catchError(res, next));
});

router.get('/deletecourse', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        return dao.delcourse(req.query.cid);
    }).then(() => {
        res.status(302).send('#course');
    }).catch(helper.catchError(res, next));
});

router.get('/coursedetail', (req, res, next) => {
    var coursedetail = {};
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        return dao.getcoursebyid(req.query.cid);
    }).then((result) => {
        coursedetail = JSON.parse(JSON.stringify(result))[0];
        coursedetail.course_id = req.query.cid;
        return dao.getstubycourse(req.query.cid);
    }).then((result) => {
        coursedetail.students = JSON.parse(JSON.stringify(result));
        res.render('home/coursedetail', coursedetail);
    }).catch(helper.catchError(res, next));
});

router.get('/deletesignin', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checksign(user, req.query.cid, req.query.sid)
    }).then(() => {
        return dao.delsign(req.query.sid);
    }).then(() => {
        res.status(302).send('#signin');
    }).catch(helper.catchError(res, next));
});

router.get('/createsignin', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        return dao.addsign(req.query.cid);
    }).then((result) => {
        crypto.randomBytes(4, (ex, buf) => {
            var token = buf.toString('hex');
            cm.add(token, { cid: req.query.cid, sid: result });
            res.redirect('/qrcode?id='+token);
        });
    }).catch(helper.catchError(res, next));
});

router.get('/showqrcode', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checksign(cm.getCookie(req.cookies.id), req.query.cid, req.query.sid);
    }).then(() => {
        crypto.randomBytes(4, (ex, buf) => {
            var token = buf.toString('hex');
            cm.add(token, { cid: req.query.cid, sid: req.query.sid });
            res.redirect('/qrcode?id='+token);
        });
    }).catch(helper.catchError(res, next));
});

router.get('/createexam', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        res.render('home/examdetail', { course_id : req.query.cid });
    }).catch(helper.catchError(res, next));
});

router.post('/createexam', (req, res, next) => {
    helper.checkCookie(req).then((user) => {
        return dao.checkcourse(user, req.query.cid);
    }).then(() => {
        // console.log('--------- exam body ----------');
        // console.log(req.body);
        // console.log('--------- exam body ----------');
        res.send(JSON.stringify(req.body));
    }).catch(helper.catchError(res, next));
});

module.exports = router;
