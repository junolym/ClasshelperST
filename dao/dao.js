var mysql = require('mysql');
var pool  = mysql.createPool({
    host: 'classhelper.ml',
    user: 'root',
    password: 'sysusdcs',
    database: 'test',
    charset: 'utf8mb4_unicode_ci'
});

/**
 * login
 *
 * @param {string} account
 * @param {string} password 32位大写的MD5值
 * @param {function} callback
 * result account数据
 * */
exports.login = function(account, password, callback) {
    this.getuser(account, function(err, result) {
        if (!err && result[0].password != password) {
            err = {stack: '密码错误', status: 500};
        }
        callback(err, result);
    });
};

/**
 * getuser
 *
 * @param {string} account
 * @param {function} callback
 * result account数据
 */
exports.getuser = function getuser(account, callback) {
    var sql = "select * from users where account=?"
    pool.query(sql, account, function(err, result, fields) {
        if (!err && result.length == 0) {
            err = {stack: '用户不存在', status: 500};
        }
        callback(err, result);
    });
};

/**
 * adduser
 *
 * @param {string} admin 管理员账号
 * @param {string} n_account
 * @param {string} n_password
 * @param {string} n_username
 * @param {string} n_email
 * @param {string} n_phone
 * @param {function} callback
 * admin   管理账户
 * result  新用户id
 */
exports.adduser = function(admin, n_account, n_password, n_username,
                            n_email, n_phone, callback) {
    // 权限
    var sql = "select admin from users where account=?";
    pool.query(sql, admin, function(err, result, fields) {
        if (err) {
            callback(err, result)
        } else if (result.length == 0) {
            callback({stack: '此用户不存在', status: 500});
        } else if (result[0].admin == 0) {
            callback({stack: '没有添加用户的权限', status: 500,});
        } else {
            sql = "insert into users(account, password, username, "
                + "email, phone) values (?, ?, ?, ?, ?)";
            pool.query(sql, [n_account, n_password, n_username, n_email,
                            n_phone],  function(err, result, fields) {
                if (err)
                    callback(err, result)
                else
                    callback(err, result.insertId);
            });
        }
    });
};

/**
 * updateuserinfo
 *
 * @param {string} account
 * @param {array} userinfo [username, email, phone]
 * @param {function} callback
 * result  修改行数
 */
exports.updateuserinfo = function(account, userinfo, callback) {
    var sql = "update users set username=?, email=?, phone=? "
            + "where account=?";
    var parameter = userinfo;
    parameter.push(account);
    pool.query(sql, parameter, function(err, result, fields) {
        if (err) {
            callback(err)
        } else if (result.length == 0) {
            callback({stack:'账号不存在', status:500}, result);
        } else {
            callback(err, result.affectedRows);
        }
    });
};

/**
 * updateuserpwd
 *
 * @param {string} account
 * @param {string} oldpwd
 * @param {string} newpwd
 * @param {function} callback
 * result  修改行数
 */
exports.updateuserpwd = function(account, oldpwd, newpwd, callback) {
    var sql = "update users set password=? "
            + "where account=? and password=?";
    pool.query(sql, [newpwd, account, oldpwd],
        function(err, result, fields) {
        if (err) {
            callback(err);
        } else {
            callback(err, result.affectedRows);
        }
    });
};

/**
 * deluser
 *
 * @param {string} account
 * @param {function} callback
 * result  删除行数
 */
exports.deluser = function(account, callback) {
    var sql = "delete from users where account=?";
    pool.query(sql, account, function(err, result, fields) {
        if (err)
            callback(err, result);
        else
            callback(err, result.affectedRows);
    });
};

/**
 * getcoursebyaccount
 *
 * @param {string} account
 * @param {function} callback
 * result  [course_id, course_name]
 * 不判断account是否存在，result可以为[]
 */
exports.getcoursebyaccount = function(account, callback) {
    var sql = "select course_id, course_name, course_time from courses "
            + "where coz_account=?";
    pool.query(sql, account, function(err, result, fields) {
        callback(err, result);
    });
};

/**
 * addcourse
 *
 * @param {string} account
 * @param {string} course_name
 * @param {string} course_time
 * @param {string} course_info
 * @param {function} callback
 * result  course_id
 */
exports.addcourse = function(account, course_name, course_time,
                                course_info, callback) {
    var sql = "insert into courses(coz_account, course_name, "
            + "course_time, course_info) values (?, ?, ?, ?)";
    var parameter = [account, course_name, course_time, course_info];
    pool.query(sql, parameter, function(err, result, fields) {
        if (err)
            callback(err, result);
        else
            callback(err, result.insertId);
    });
};

/**
 * delcourse
 *
 * @param {string} account
 * @param {number} course_id
 * @param {function} callback
 * result  删除行数
 */
exports.delcourse = function(account, course_id, callback) {
    var sql = "delete from courses where course_id=? and coz_account=?";
    pool.query(sql, [course_id, account], function(err, result, fields) {
        if (err)
            callback(err, result)
        else if (result.affectedRows == 0)
            callback({stack: "此课程不存在！", status: 500}, null);
        callback(err, result.affectedRows);
    });
};

/**
 * getexambycourse
 *
 * @param {number} course_id
 * @param {function} callback
 * result course数据
 */
exports.getexambycourse = function(course_id, callback) {
    var sql = "select * from exams where ex_course_id= ?";
    pool.query(sql, course_id, function(err, result, fields) {
        callback(err, result);
    });
};

/**
 * addexam
 *
 * @param {number} course_id
 * @param {string} exam_name
 * @param {object} exam_question json格式,详见文档
 * @param {function} callback
 * result exam_id
 */
exports.addexam = function(course_id, exam_name, exam_question, callback) {
    var sql = "insert into exams(exam_name, ex_course_id, exam_question) "
            + "values (?, ?, ?)";
    var parameter = [exam_name, course_id, exam_question];
    pool.query(sql, exams, function(err, result, fields) {
        if (err)
            callback(err, result)
        else
            callback(err, result.insertId);
    });
};

/**
 * delexam
 *
 * @param {number} exam_id
 * @param {function} callback
 * result 删除行数
 */
exports.delexam = function(exam_id, callback) {
    var sql = "delete from exams where exam_id=?";
    pool.query(sql, exam_id, function(err, result, fields) {
        if (err)
            callback(err, result);
        else
            callback(err, result.affectedRows);
    });
};


/**
 * addsign
 *
 * @param {number} course_id
 * @param {function} callback
 * signid
 */
exports.addsign = function(course_id, callback) {
    var sql = "insert into signup set sg_coz_id=?";
    pool.query(sql, course_id, function(err, result, fields) {
        if (err)
            callback(err, result)
        else
            callback(err, result.insertId);
    });
};

/**
 * studentsign
 *
 * @param {number} course_id
 * @param {number} sign_id
 * @param {number} stu_id
 * @param {string} stu_name
 * @param {function} callback
 * err=1 stu_id不在此课程内;
 * err=2 学号名字不符;
 * result 插入行数}
 */
exports.studentsign = function(course_id, sign_id, stu_id,
                                stu_name, callback) {
    // 检查学号、姓名、课程相符
    var sql = "select cs_stu_name from coz_stu "
            + "where cs_coz_id=? and cs_stu_id=?";
    var parameter = [course_id, stu_id];
    pool.query(sql, parameter, function(err, result, fields) {
        if (err) {
            callback(err);
        } else if (result.length == 0) {
            callback({stack:'学号不在此课程内!', status:500}, result);
        } else if (result[0].cs_stu_name != stu_name) {
            callback({stack:'学号姓名不符!', status:500}, result);
        } else {
            var sql = "insert into stu_sign set ss_sign_id=?, "
                    + "ss_stu_id=? ss_stu_name=?"
            var parameter = [sign_id, stu_id, stu_name];
            pool.query(sql, parameter, function(err, result, fields) {
                if (err) {
                    var reg = /PRIMARY/;
                    if (reg.test(err)) {
                        callback({stack:'请勿重复签到', status:500});
                    } else {
                        callback(err, result);
                    }
                } else {
                    callback(err, result.affectedRows);
                }
            });
        }
    });
};

/**
 * addstutocourse
 *
 * @param {number} course_id
 * @param {array} coz_stu
 * [ [stu_id1, stu_name1],
 * [stu_id2, stu_name2] ]
 * @param {function} callback
 * result 插入行数
 */
exports.addstutocourse = function(course_id, coz_stu, callback) {
    var parameter = [];
    for (var i in coz_stu) {
        parameter.push([course_id, coz_stu[i][0], coz_stu[i][1]]);
    }
    var sql = "insert into coz_stu(cs_coz_id, cs_stu_id, "
            + "cs_stu_name) values ?";
    pool.query(sql, [parameter], function(err, result, fields) {
        if (err)
            callback(err, result);
        else
            callback(err, result.affectedRows);
    });
};

/**
 * addstudent
 *
 * @param {array} student
 *
 * [ [id1, name1],
 * [id2, name2] ]
 * @param {function} callback
 * result 插入行数
 */
exports.addstudent = function(student, callback) {
    var sql = "insert into students(student_id, student_name) values ?";
    pool.query(sql, [student], function(err, result, fields) {
        if (err)
            callback(err, result);
        else
            callback(err, result.affectedRows);
    });
};

/**
 * getsigncourse
 *
 * @param {number} course_id
 * @param {function} callback
 * [{sign_id, time, sign_num, stu_num}]
 */
exports.getsignbycourse = function(course_id, callback) {
    var sql = "select sign_id, course_id, sign_time as time, "
            + "count(ss_sign_id) as sign_num, "
            + "student_num as stu_num "
            + "from signup, stu_sign, courses "
            + "where course_id = ? and sg_coz_id = course_id "
            + "and ss_sign_id = sign_id group by sign_id";
    pool.query(sql, course_id, function(err, result, fields) {
        callback(err, result);
    });
}

/**
 * getsignbyid
 *
 * @param {number} sign_id
 * @param {function} callback
 * [{course_id, id, name, time}]
 */
exports.getsignbyid = function(sign_id, callback) {
    var sql = "select cs_coz_id as course_id, ss_stu_id as stu_id, "
            + "ss_stu_name as name, stu_sign_time as time "
            + "from stu_sign, signup "
            + "where sign_id=? and sign_id=ss_sign_id";
    pool.query(sql, sign_id, function(err, result, fields) {
        callback(err, result);
    });
}

/**
 * getsignbyaccount
 *
 * @param {number} account
 * @param {function} callback
 * [{sign_id, course_id, name, time, sign_num, stu_num}]
 */
exports.getsignbyaccount = function(account, callback) {
    var sql = "select sign_id, course_id, course_name as name, "
            + "sign_time as time, "
            + "count(ss_sign_id) as sign_num, student_num as stu_num "
            + "from signup "
            + "inner join courses on sg_coz_id=course_id "
            + "left join stu_sign on sign_id=ss_sign_id "
            + "where coz_account=? "
            + "group by sign_id "
            + "order by time desc";
    pool.query(sql, account, function(err, result, fields) {
        callback(err, result);
    });
}

/**
 * checksign
 *
 * @param {string} account
 * @param {number} course_id
 * @param {number} sign_id
 * @param {function} callback
 */
exports.checksign = function(account, course_id, sign_id, callback) {
    var sql = "select sign_id "
            + "from courses, signup "
            + "where coz_account=? and course_id=? "
            + "and sg_coz_id=course_id and sign_id=?";
    pool.query(sql, [account, course_id, sign_id],
                    function(err, result, fields) {
        if (!err && result.length == 0)
            err = {stack: "sign_id校验失败", status: 500};
        callback(err);
    });
}

/**
 * getstubycourse
 *
 * @param {number} course_id
 * @param {function} callback
 * [id, name]
 */
exports.getstubycourse = function(course_id, callback) {
    var sql = "select cs_stu_id as id, cs_stu_name as name "
            + "from courses, coz_stu "
            + "where course_id=? "
            + "and cs_coz_id=course_id";
    pool.query(sql, course_id, function(err, result, fields) {
        callback(err, result);
    });
}

/**
 * checkcourse
 *
 * @param {string} account
 * @param {number} course_id
 * @param {function} callback err
 */
exports.checkcourse = function(account, course_id, callback) {
    var sql = "select coz_account from courses "
            + "where course_id=? ";
    pool.query(sql, course_id, function(err, result, fields) {
        if (err) {
            callback(err);
        } else if (result.length == 0) {
            callback({stack:'此课程不存在', status:500});
        } else if (result[0].coz_account != account) {
            callback({stack:'非法访问!该教师无此课程!', status:500});
        } else {
            callback(err);
        }
    });
}

/**
 * getcoursebyid
 *
 * @param {number} course_id
 * @param {function} callback
 * [course_name, course_time, course_info, student_num]
 */
exports.getcoursebyid = function(course_id, callback) {
    var sql = "select course_name, course_time, course_info, student_num "
            + "from courses where course_id=?"
    pool.query(sql, course_id, function(err, result, fields) {
        if (!err && result.length == 0) {
            err = {stack: '此课程不存在', status: 500};
        }
        callback(err, result);
    });
}

/**
 * updatecourse
 *
 * @param {number} course_id
 * @param {string} n_course_name
 * @param {string} n_course_time
 * @param {string} n_course_info
 * @param {function} callback
 */
exports.updatecourse = function(course_id, n_course_name, n_course_time, n_course_info, callback) {
    var sql = "update courses set course_name=?, course_time=?, "
            + "course_info=? where course_id=?"
    var parameter=[n_course_name, n_course_time, n_course_info, course_id];
    pool.query(sql, parameter, function(err, result, fields) {
        if (err) 
            callback(err);
        else if (result.affectedRows == 0) 
            callback({stack: '此课程不存在', status:500});
        else
            callback(err, result.affectedRows);
    });
}

/**
 * delsign
 *
 * @param {number} sign_id
 * @param {function} callback
 */
exports.delsign = function(sign_id, callback) {
    var sql = 'delete from signup where sign_id=?';
    pool.query(sql, sign_id, function(err, result) {
        if (err) 
            callback(err);
        else if (result.affectedRows == 0) 
            callback({stack:'此签到不存在', status:500});
        else 
            callback(err, result.affectedRows);
    });
}

/**
 * delstuofcoz
 *
 * @param {number} course_id
 * @param {function} callback
 * 返回删除学生行数。可能存在删除0行或者课程非法
 */
exports.delstuofcourse = function(course_id, callback) {
    var sql = 'delete from coz_stu where cs_coz_id=?';
    pool.query(sql, course_id, function(err, result) {
        if (err) 
            callback(err);
        else 
            callback(err, result.affectedRows);
    });
}

