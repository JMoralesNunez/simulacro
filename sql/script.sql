CREATE TABLE clients(
	idclient INT PRIMARY KEY AUTO_INCREMENT,
	phone VARCHAR(45) NOT NULL UNIQUE,
	school VARCHAR(75) NOT NULL,
	client_name VARCHAR(45) NOT NULL 
);

CREATE TABLE products(
	idproduct INT PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(75) NOT NULL UNIQUE
);

CREATE TABLE sellers(
	idseller INT PRIMARY KEY AUTO_INCREMENT,
	seller_name VARCHAR(75) NOT NULL UNIQUE
);

CREATE TABLE receipts(
	idreceipt INT PRIMARY KEY AUTO_INCREMENT,
	date DATE NOT NULL,
	total DECIMAL(10,2),
	idseller INT NOT NULL,
	idclient INT NOT NULL,
	FOREIGN KEY (idseller) REFERENCES sellers(idseller),
	FOREIGN KEY (idclient) REFERENCES clients(idclient)	
);


CREATE TABLE purchases_details(
	id_purchase INT PRIMARY KEY AUTO_INCREMENT,
	quantity INT NOT NULL,
	idproduct INT NOT NULL,
	idreceipt INT NOT NULL,
	FOREIGN KEY (idproduct) REFERENCES products(idproduct),
	FOREIGN KEY (idreceipt) REFERENCES receipts(idreceipt)
);

CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name varchar(60) not null,
	email varchar(60) not null unique,
	password varchar(60) not null
);

-- Query de facturas
SELECT idreceipt, receipts.date, receipts.total, sellers.seller_name, clients.client_name from receipts 
JOIN sellers on sellers.idseller = receipts.idseller
JOIN clients on clients.idclient = receipts.idclient 


DELETE from clients;
DELETE from products;
DELETE from sellers;
DELETE from receipts;
DELETE from purchases_details;



