var dao = require('./dao.js');
var data = require('./data.js');
var XLSX = require('xlsx');

// dao.checkemail('stsluy@mail.sysu.edu.cn')
dao.adduser(111, 111, 111, 111, 111)
.then(function(doc) {
    console.log(doc);
}).catch(function(err) {
    console.log(err);
});

// var mysql = require('promise-mysql');
// var pool  = mysql.createPool({
//     host: 'classhelper.ml',
//     user: 'root',
//     password: 'sysusdcs',
//     // database: 'test',
//     charset: 'utf8mb4_unicode_ci'
// });

// pool.query("show tables")
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

// function num2char(n) {
//     var c = '';
//     do {
//         c = String.fromCharCode(--n % 26 + 65) + c;
//     } while(n = Math.floor(n / 26) > 0);
//     return c;
// }



// function (course_id) {
//     var signsheet = {};
//     var examsheet = {};
//     var student = {}; // id, name
//     var sign = {};
//     var exam = {};

//     var p1 = dao.getstubycourse(6).then(result => {
//         for (var i = 0; i < result.length; i++) {
//             student[result[i].id] =  i + 2;
//             signsheet['A' + (i+2)] = {v: result[i].id};
//             signsheet['B' + (i+2)] = {v: result[i].name};
//             examsheet['A' + (i+2)] = {v: result[i].id};
//             examsheet['B' + (i+2)] = {v: result[i].name};
//         }
//         student['length'] = result.length;
//         return Promise.resolve();
//     });

//     var p2 = dao.getsignbycourse(6).then(result => {
//         for (var i = 0; i < result.length; ++i) {
//             sign[result[i].sign_id] = num2char(result.length - i + 2);
//             signsheet[num2char(result.length - i + 2) + 1] = {v: result[i].time};
//         }
//         sign['length'] = result.length;
//         return Promise.resolve();
//     });

//     var p3 = dao.getexambycourse(6).then(result => {
//         for (var i = 0; i < result.length; ++i) {
//             exam[result[i].exam_id] = num2char(i + 3);
//             examsheet[num2char(i + 3) + 1] = {v: result[i].exam_name}
//         }
//         exam['length'] = result.length;
//         return Promise.resolve();
//     });

//     Promise.all([p1, p2, p3]).then(result => {
//         var p4 = dao.getallsignbycourse(6).then(result => {
//             for (i in result) {
//                 var t = result[i];
//                 if (t.sign == null) {
//                     signsheet[sign[t.sign_id] + student[t.stu_id]] = {v: 'X'};
//                 }
//             }
//             return Promise.resolve();
//         });
//         var p5 = dao.getallexambycourse(6).then(result => {
//             for (i in result) {
//                 var t = result[i];
//                 if (t.score == null) {
//                     t.score = 0;
//                 }
//                 examsheet[exam[t.exam_id] + student[t.stu_id]] = {v: t.score};
//             }
//             return Promise.resolve();
//         });
//         return Promise.all([p4, p5]);
//     }).then(result => {
//         signsheet['!ref'] = "A1:" + num2char(sign.length + 2) + (student.length+2);
//         signsheet['A1'] = {v: '学号'};
//         signsheet['B1'] = {v: '姓名'};
//         examsheet['!ref'] = "A1:" + num2char(exam.length + 2) + (student.length+2);
//         examsheet['A1'] = {v: '学号'};
//         examsheet['B1'] = {v: '姓名'};
//         var workbook = {
//             SheetNames: ['签到情况', '测验情况'],
//             Sheets: {
//                 '签到情况' : signsheet,
//                 '测验情况' : examsheet
//             }
//         }
//     });
// }




// var workbook = {
//     SheetNames: ['签到情况'],
//     Sheets : {
//         '签到情况' : signsheet
//         // '测验情况' : examsheet
//     }
// };

// dao.getexam


//     var table = {};

//     var trs = $('#stutable')[0].getElementsByTagName("tr");

//     table['!ref'] = "A1:B" + trs.length;
//     table['A1'] = {v: "学号"};
//     table['B1'] = {v: "姓名"};
//     for (var i = 1; i < trs.length; i++) {
//         var td = trs[i].getElementsByTagName("td");
//         table['A' + (i + 1)] = {v: td[0].innerText};
//         table['B' + (i + 1)] = {v: td[1].innerText};
//     }

//     var workbook = {
//         SheetNames: ['sheet1'],
//         Sheets: {
//             'sheet1': table
//         }
//     }

//     var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
//     var wbout = XLSX.write(workbook,wopts);

// dao.getsign
// .then()

// dao.statsexamdetail(6, 14331024)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// // dao.statsexambycourse(6)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.statssigndetail(6, 14331024)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.statssignbycourse(6)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.delstusign(34, 14331024)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.updatestatistics("1", null)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.copyexam(13, 6)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.getanswerbystudent(13, 14331040)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

// dao.getanswerbyexam(13)
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });

// dao.checkstudent(15332020, 29, '张增辉')
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.addanswer(1, 1, 1, 0, 'ans')
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.checkexam('test', '7', '11')
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.getexambyaccount('stsluy')
// .then(function(doc) {
//     console.log(doc);
// }).catch(function(err) {
//     console.log(err);
// });
// dao.addcourse('test2', '综合实训-(全国大学生计算机设计大赛)', 
//     '周六、日 1-15', null)
//     .then(function(doc) {
//         console.log(doc);
//     }).catch(function(err) {
//         console.log(err);
//     });

    // dao.addstutocourse(29, data.student_2)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
// dao.addcourse('test', '程序设计II', '1-18	周一1-2',
//     null, function(err, doc) {
//     dao.addstutocourse(doc, data.student_2, function(err, doc) {
//     });
// });

// dao.login("root", "4F3CC6E16818F2E5F728D5E75D93D157")
//     .then(function(doc) {
//         console.log(doc); 
//     }, function(err) {
//         console.log(err);
//     });
// dao.adduser('root', 'test2', '4F3CC6E16818F2E5F728D5E75D93D157', 't', 
//         null, null).then(function(doc) {
//             console.log(doc);
//         }).catch(function(err) {
//             console.log(err);
//         })

    // dao.updateexam(1, 'update', 'que')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.delexam(4)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getexambyid(1)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getexambycourse(6)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.addexam(1, 'exam', "{'num': 0}")
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });

    // dao.updatecourse(34, '你们够了', '1-20周 周一-周六 1-15节', 
    //         '就是这么任性，哼')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getcoursebyid(100)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getstubycourse(1)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    //
    // dao.checkcourse('stsluy', 300)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.addsign(1)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    //     console.log(signid);
    // dao.studentsign(1, 1, '14331024', '陈俊贤')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
        // dao.studentsign(1, 45, '14331024', '陈俊贤', function(err, doc){
        //     console.log(err);
        // });
        // dao.studentsign(1, signid, '14331279', '温晓锐', function(err, doc) {
        // });
        // dao.studentsign(1, signid, '14331139', '李文盛', function(err, doc) {
        // });
        // dao.studentsign(1, signid, '14331040', '陈鑫', function(err, doc) {
        // });
    // });
    // dao.checksign('stsluy', 1, 8)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getsignbyaccount('stsluy')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getsignbycourse(6)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getsignbyid(5)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });

    // var info = ['test', '2333', null];
    // dao.updateuserinfo('test2', info).then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.updateuserpwd('test1', '4F3CC6E16818F2E5F728D5E75D93D157', 'FDB6C662D36651211F14977097250CCA')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.getcoursebyaccount('stsluy')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.delcourse('test2', 30)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // dao.addstudent(student)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });

    // testadd();
    // dao.getuser('wenxr11', function(err, doc) {
    //     console.log(err)
    //     console.log(doc[0].password);
    // })
    // dao.deluser('test10')
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });

    // dao.delsign(22)
    // .then(function(doc) {
    //     console.log(doc);
    // }).catch(function(err) {
    //     console.log(err);
    // });
