use mtc_admin_panel;
-- select * from users, news => join хийж болно
select * from users, news;
select * from news where created_by = 1;
SELECT * FROM news limit 1, 6;
select * from shareholders;
select * from workplace;
select * from workplace_cv;
select * from workplace, workplace_cv;
select * from entity;
select * from account;
select * from product limit 1;
select * from test_user;
select * from msg;


truncate msg;
truncate workplace;
truncate test_user;
truncate workplace_cv;


select cv_name from workplace_cv;

select * from news where type="news" limit 1, 6;
select  DATE_ADD(news.created_at, INTERVAL 2 DAY) as created_at from news;
CREATE TABLE news(
 id INT not null primary key auto_increment,
 title varchar(255),
 cover_img varchar(255),
 body longtext,
 created_by INT,
 type varchar(255),
 created_at timestamp,
 updated_at timestamp,
 expires_at timestamp,
 customer_type varchar(255),
 foreign key (created_by) references users(id)
);

CREATE TABLE shareholders(
 id INT not null primary key auto_increment,
 title varchar(255),
 cover_img varchar(255),
 body longtext,
 created_by INT,
 created_at timestamp,
 updated_at timestamp,
 foreign key (created_by) references users(id)
);

CREATE TABLE account(
 id INT not null primary key auto_increment,
 title varchar(255),
 cover_img varchar(255),
 body longtext,
 created_by INT,
 created_at timestamp,
 updated_at timestamp,
 foreign key (created_by) references users(id)
);

CREATE TABLE product(
 product_id INT not null primary key auto_increment,
 product_name varchar(255),
 product_img varchar(255),
 product_price int,
 product_performance varchar(255),
 product_type varchar(255),
 created_by INT,
 created_at timestamp,
 updated_at timestamp,
 foreign key (created_by) references users(id)
);

CREATE TABLE workplace(
 workplace_id INT not null primary key auto_increment,
 workplace_name varchar(255),
 workplace_role longtext,
 workplace_requirements json,
 workplace_type INT,
 created_by INT,
 expires_at timestamp,
 created_at timestamp,
 updated_at timestamp,
 foreign key (created_by) references users(id),
 foreign key (workplace_type) references entity(entity_id)
);
ALTER TABLE workplace
DROP COLUMN workplace_cv;

ALTER TABLE workplace
ADD cv int;

ALTER TABLE workplace
MODIFY COLUMN workplace_other json;

CREATE TABLE entity(
 entity_id INT not null primary key auto_increment,
 entity_name varchar(255)
);

INSERT INTO  entity(entity_name) VALUES("Инновац бизнес хөгжлийн газар");
INSERT INTO  entity(entity_name) VALUES("Маркетинг борлуулалтын газар");
INSERT INTO  entity(entity_name) VALUES("Техник технологийн ашиглалтын газар");
INSERT INTO  entity(entity_name) VALUES("Санхүү бүртгэл, аж ахуйн газар");
INSERT INTO  entity(entity_name) VALUES("Удирлага, хүний нөөцийн газар");



CREATE TABLE users(
 id INT not null primary key auto_increment,
 firstName varchar(255),
 password INT,
 permission json
);

ALTER TABLE users
MODIFY COLUMN password varchar(255);


SELECT GREATEST(1, 4, 5, 6) AS NUM;
SELECT least(1, 4, 5, 6) AS NUM;
select IF (1<1, 3, 2);

CREATE TABLE workplace_cv(
 cv_id INT not null primary key auto_increment,
 cv_name json ,
 cv_workplace_id int,
 foreign key (cv_workplace_id) references workplace(workplace_id)
);


CREATE TABLE msg(
 id INT not null primary key auto_increment,
 to_msg INT,
 from_msg INT,
 message varchar(255)
);

CREATE TABLE test_user(
 id INT not null primary key auto_increment,
 username varchar(255),
 email varchar(255),
 password int
);





      




