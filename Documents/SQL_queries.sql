create database lms_db;

use lms_db;

create table tbl_books(
 book_id int NOT NULL,
 isbn varchar(15), 
 title varchar(100) NOT NULL, 
 author varchar(100) NOT NULL, 
 category varchar(50) NOT NULL, 
 publication_year int NOT NULL , 
 copies_available int,
 CONSTRAINT books_pk PRIMARY KEY (book_id)
);

create table tbl_categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
)
;

ALTER TABLE tbl_books ADD CONSTRAINT books_categories FOREIGN KEY books_categories (books_book_id)
    REFERENCES tbl_books (book_id);


INSERT INTO tbl_books
(isbn,title,author,category,publication_year,copies_available) 
VALUES 
('1234567891234','The SMA directory / Singapore Manufacturers Association, 1984', 'Singapore Manufacturers Association','General', 1984, 2);  
;


INSERT INTO tbl_categories
(category_id,category_name) 
VALUES 
(1,'General'),
(2,'Fiction'),
(3,'Non-Fiction');  

;
create table tbl_book_details
(book_detail_id int NOT NULL PRIMARY KEY,
books_book_id int NOT NULL ,
book_detail_status varchar(100)
)
;

ALTER TABLE tbl_book_details ADD CONSTRAINT books_book_details FOREIGN KEY books_book_details (books_book_id)
    REFERENCES tbl_books (book_id);

insert into tbl_book_details(book_detail_id, books_book_id, book_detail_status)
VALUES
(1,1,"Available");


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

ALTER TABLE tbl_users ADD CONSTRAINT user_roles FOREIGN KEY user_roles (users_roles_id)
    REFERENCES tbl_roles (role_id);

INSERT INTO tbl_users
(users_id,users_email,users_name,users_address,users_contact_info,users_roles_id,users_password) 
VALUES 
(1,'johnDoe@email.com','john Doe','abc road Singapore', '12345678', 1 , '1234567');  


;

create table tbl_book_transaction
(
transaction_id int NOT NULL PRIMARY KEY,
users_user_id int NOT NULL ,
detail_book_detail_id int NOT NULL ,
borrow_date DATE ,
due_date DATE ,
return_date DATE ,
transaction_date DATE ,
transaction_status varchar(100)
)
;

ALTER TABLE tbl_book_transaction ADD CONSTRAINT transcation_users FOREIGN KEY transcation_users (users_user_id)
    REFERENCES tbl_users (user_id);

ALTER TABLE tbl_book_transaction ADD CONSTRAINT transcation_book_details FOREIGN KEY transcation_book_details (detail_book_detail_id)
    REFERENCES tbl_book_details (book_detail_id);
