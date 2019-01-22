# Webprogramming exam

This project was done during an exam, so please excuse poor code quality due to time pressure. The whole project was done in 2h and 20m.

### If you want to use the same tables as me: 
```
create database exam;

// This is the main table
create table produse(
	id int NOT NULL AUTO_INCREMENT,
	Nume varchar(1000),
	ImageURL varchar(1000),
	Primary key (id)
);
// Inserting products. Just run this a few times to have more.
INSERT INTO `produse`( `Nume`, `ImageURL`) VALUES ("Produs","https://i.ytimg.com/vi/LrQHgABDdlI/hqdefault.jpg");
```
