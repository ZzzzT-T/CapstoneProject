create database lms_db;

use lms_db;

create table tbl_books(
 book_id int NOT NULL AUTO_INCREMENT,
 isbn varchar(15), 
 title varchar(100) NOT NULL, 
 author varchar(100) NOT NULL, 
 category varchar(50) NOT NULL, 
 publication_year int NOT NULL , 
 copies_available int NOT NULL,
 CONSTRAINT books_pk PRIMARY KEY (book_id)
);

INSERT INTO tbl_books
(isbn,title,author,category,publication_year,copies_available) 
VALUES 
('1234567891234','The SMA directory / Singapore Manufacturers Association, 1984', 'Singapore Manufacturers Association','General', 1984, 2);  


;

create table tbl_roles(
 role_id int NOT NULL PRIMARY KEY,
 role_name varchar(100) NOT NULL ,
 role_desc varchar(255)
 );

insert into tbl_roles values 
(1, 'LIBRARIAN', 'Role is librarian'),
(2, 'MEMBER', 'Role is member');

create table tbl_users(
 user_id int NOT NULL PRIMARY KEY,
 user_email varchar(100), 
 user_fullname varchar(100), 
 user_address varchar(150), 
 user_contact_info  varchar(50),
 user_roles_id  int NOT NULL ,
 user_password  varchar(50),
 user_username  varchar(100)
);

select max(role_id)+1 from tbl_roles;


ALTER TABLE tbl_users ADD CONSTRAINT user_roles FOREIGN KEY user_roles (users_roles_id)
    REFERENCES tbl_roles (role_id);

INSERT INTO tbl_users
(users_id,users_email,users_name,users_address,users_contact_info,users_roles_id,users_password) 
VALUES 
(1,'johnDoe@email.com','john Doe','abc road Singapore', '12345678', 1 , '1234567');  


;