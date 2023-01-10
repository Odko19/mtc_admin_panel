use mtc_admin_panel;
-- select * from users, news => join хийж болно
select * from users, news;
select * from news where created_by = 1;
SELECT * FROM news limit 1, 6;
select * from shareholders;
select * from account;
select * from product limit 1;

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
