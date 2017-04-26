/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/04/26 0:45:29                           */
/*==============================================================*/


drop trigger Trigger_delete;

drop table if exists courses;

drop table if exists coz_stu;

drop table if exists exams;

drop table if exists signup;

drop index Index_sign_id on stu_sign;

drop table if exists stu_sign;

drop table if exists students;

drop table if exists users;

/*==============================================================*/
/* Table: courses                                               */
/*==============================================================*/
create table courses
(
   coz_account          char(20),
   course_id            int not null auto_increment,
   course_name          char(20),
   course_time          text,
   course_info          text,
   primary key (course_id)
);

/*==============================================================*/
/* Table: coz_stu                                               */
/*==============================================================*/
create table coz_stu
(
   cs_course_id         int,
   cs_student_id        int,
   cs_student_name      char(20) not null
);

/*==============================================================*/
/* Table: exams                                                 */
/*==============================================================*/
create table exams
(
   exam_id              int not null auto_increment,
   exam_name            char(20),
   exam_state           tinyint,
   exam_time            datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   ex_course_id         int,
   exam_question        json,
   primary key (exam_id)
);

/*==============================================================*/
/* Table: signup                                                */
/*==============================================================*/
create table signup
(
   sign_id              int not null auto_increment,
   sign_time            datetime default CURRENT_TIMESTAMP,
   sg_course_id         int,
   primary key (sign_id)
);

/*==============================================================*/
/* Table: stu_sign                                              */
/*==============================================================*/
create table stu_sign
(
   student_sign_time    datetime default CURRENT_TIMESTAMP,
   ss_student_id        int,
   ss_sign_id           int
);

/*==============================================================*/
/* Index: Index_sign_id                                         */
/*==============================================================*/
create index Index_sign_id on stu_sign
(
   ss_sign_id
);

/*==============================================================*/
/* Table: students                                              */
/*==============================================================*/
create table students
(
   student_id           int not null,
   student_name         char(20) not null,
   primary key (student_id)
);

/*==============================================================*/
/* Table: users                                                 */
/*==============================================================*/
create table users
(
   account              char(20) not null,
   password             char(32) not null,
   username             char(40) not null,
   email                char(40),
   phone                char(20),
   admin                tinyint default 0,
   primary key (account)
);

alter table courses add constraint FK_user_course foreign key (coz_account)
      references users (account) on delete cascade on update restrict;

alter table coz_stu add constraint FK_Reference_6 foreign key (cs_course_id)
      references courses (course_id) on delete cascade on update restrict;

alter table coz_stu add constraint FK_Reference_7 foreign key (cs_student_id)
      references students (student_id) on delete cascade on update restrict;

alter table exams add constraint FK_course_exam foreign key (ex_course_id)
      references courses (course_id) on delete cascade on update restrict;

alter table signup add constraint FK_couser_sign foreign key (sg_course_id)
      references courses (course_id) on delete cascade on update restrict;


create trigger Trigger_delete after delete
on signup for each row
delete from student_sign where ss_sign_id=old.sign_id;
insert into users set account='root', password='4F3CC6E16818F2E5F728D5E75D93D157', username='admin', admin=1;
insert into users set account='test', password='FDB6C662D36651211F14977097250CCA', username='test', admin=0;

