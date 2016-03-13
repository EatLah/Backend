BEGIN TRANSACTION;
CREATE TABLE "UserAccount" (
	`userID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userName`	TEXT,
	`userPassword`	TEXT,
	`firstName`	TEXT,
	`lastName`	TEXT,
	`userType`	TEXT,
	`gender`	TEXT,
	`contactNumber`	NUMERIC,
	`emailAddress`	TEXT
);
INSERT INTO `UserAccount` (userID,userName,userPassword,firstName,lastName,userType,gender,contactNumber,emailAddress) VALUES (1,'SoupRes','soupres','','','restaurant_user',NULL,NULL,NULL),
 (2,'CafeOnRidge','cafeonridge','','','restaurant_user',NULL,NULL,NULL),
 (3,'ScholarChineseRestaurant ','scholarres',NULL,NULL,'restaurant_user',NULL,NULL,NULL),
 (4,'PizzaHut','pizzahut',NULL,NULL,'restaurant_user',NULL,NULL,NULL);
CREATE TABLE "StaffAccount" (
	`staffID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantID`	INTEGER NOT NULL,
	`staffUsername`	TEXT,
	`staffPassword`	TEXT,
	`staffFirstName`	TEXT,
	`staffLastName`	TEXT,
	FOREIGN KEY(`restaurantID`) REFERENCES `RestaurantAccount`(`ID`)
);
INSERT INTO `StaffAccount` (staffID,restaurantID,staffUsername,staffPassword,staffFirstName,staffLastName) VALUES (1,2,'staff00001','staff00001','Sally','Tan');
CREATE TABLE "RestaurantAccount" (
	`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userAccID`	INTEGER,
	`restaurantRegNo`	NUMERIC,
	`restaurantName`	TEXT,
	`restaurantType`	TEXT,
	`restaurantCusine`	TEXT,
	`restaurantLogo`	TEXT,
	`hasGst`	TEXT,
	`hasServiceCharge`	TEXT,
	FOREIGN KEY(`userAccID`) REFERENCES UserAccount(userID)
);
INSERT INTO `RestaurantAccount` (ID,userAccID,restaurantRegNo,restaurantName,restaurantType,restaurantCusine,restaurantLogo,hasGst,hasServiceCharge) VALUES (1,1,'199103597Z','Soup Restaurant','Family Style','Chinatown Heritage Cuisine','ab44951b1eb9d0e6e3eddb2fbc77a1de.gif',NULL,NULL),
 (2,2,'200604346E','Café on the Ridge','Causal Dining','Western and Asian Cuisines',NULL,NULL,NULL),
 (3,3,'200604346E','The Scholar Chinese Restaurant','Causal Dining',' Chinese Cuisine','',NULL,NULL),
 (4,4,'199302293D','Pizza Hut','Causal Dining','Pizza and Western Cuisine','',NULL,NULL);
CREATE TABLE "Reservation" (
	`reservationID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantID`	INTEGER,
	`customerID`	INTEGER,
	`numberOfPax`	INTEGER,
	`reservationStatus`	TEXT,
	`bookedTimeslot`	TEXT,
	`orderNumber`	INTEGER,
	`review`	BLOB,
	FOREIGN KEY(`restaurantID`) REFERENCES `RestaurantAccount`(`ID`)
);
CREATE TABLE `PromotionalMenu` (
	`promotionID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantID`	INTEGER,
	`promotionMenuList`	TEXT
);
INSERT INTO `PromotionalMenu` (promotionID,restaurantID,promotionMenuList) VALUES (2,2,'36,35,34,33'),
 (5,1,'60,,59,47');
CREATE TABLE "OrderItems" (
	`orderItemID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`orderNumber`	INTEGER,
	`restaurantID`	INTEGER,
	`reservationID`	INTEGER,
	`tableNumber`	TEXT,
	`foodItemID`	INTEGER,
	`orderQty`	INTEGER,
	`subTotal`	REAL,
	`pax`	INTEGER,
	`request`	TEXT,
	`prepStatus`	TEXT,
	FOREIGN KEY(`restaurantID`) REFERENCES `RestaurantAccount`(`ID`)
);
INSERT INTO `OrderItems` (orderItemID,orderNumber,restaurantID,reservationID,tableNumber,foodItemID,orderQty,subTotal,pax,request,prepStatus) VALUES (1,1,2,'','25',28,2,19.6,2,'None','Preparing'),
 (2,1,2,'','25',37,1,5.0,2,'None','Preparing'),
 (3,2,2,'','1',29,1,11.9,1,'Test 123','Preparing'),
 (4,2,2,'','1',30,1,15.9,1,'Test 321','Preparing');
CREATE TABLE "MenuCategory" (
	`categoryID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantID`	INTEGER,
	`categoryName`	TEXT,
	`categoryImage`	TEXT,
	FOREIGN KEY(`restaurantID`) REFERENCES `RestaurantAccount`(`ID`)
);
INSERT INTO `MenuCategory` (categoryID,restaurantID,categoryName,categoryImage) VALUES (1,2,'Ala Carte',NULL),
 (2,2,'Main Course','44e533c3e8ddfd8f67d2aaa749ee0af8.png'),
 (3,2,'February Weekday Set Lunches','75637f9b62fd085c935b5aa4e09b3964.jpg'),
 (4,2,'Vegetable','bd42f0b237a0dc34a05b369ba718fd5b.png'),
 (5,2,'Beverages','350bc0e0fa6be01c933aba6a55a0649b.png'),
 (15,1,'Chicken',NULL),
 (16,1,'Vegetable',NULL),
 (17,1,'Drinks',NULL),
 (18,1,'Soups',NULL),
 (19,1,'Dessert',NULL);
CREATE TABLE "Menu" (
	`ID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantAccID`	INTEGER,
	`foodItemName`	TEXT,
	`categoryID`	INTEGER,
	`foodItemDescription`	BLOB,
	`bySize`	TEXT,
	`foodItemSize`	INTEGER,
	`foodItemPrice`	REAL,
	`foodItemImage`	TEXT,
	`isVisible`	TEXT,
	`isPromotionItem`	TEXT,
	FOREIGN KEY(`restaurantAccID`) REFERENCES `RestaurantAccount`(`ID`),
	FOREIGN KEY(`categoryID`) REFERENCES `MenuCategory`(`categoryID`)
);
INSERT INTO `Menu` (ID,restaurantAccID,foodItemName,categoryID,foodItemDescription,bySize,foodItemSize,foodItemPrice,foodItemImage,isVisible,isPromotionItem) VALUES (28,2,'Penang Fried Kuay Teow',1,'Kuay Teow with Cockles','false','',9.8,'421de1bd0936b48b8444aa4851ff8c3b.jpg','true','false'),
 (29,2,'Sambal Kangkong',4,'Kang Kong vegetables fried with Sambal Chilies and prawn paste','true','Small',11.9,'66449433559f781de838e13c9e0e7843.jpg','true','false'),
 (30,2,'Sambal Kangkong',4,'Kang Kong vegetables fried with Sambal Chilies and prawn paste','true','Medium',15.9,'cce5b16dae360dc73d18e62966d4ba98.jpg','true','false'),
 (31,2,'Sambal Kangkong',4,'Kang Kong vegetables fried with Sambal Chilies and prawn paste','true','Large',19.9,'1903a80c5443ac33d4a2bef5b3cd9ab2.jpg','true','false'),
 (33,2,'Weekday Set Lunch (Tuesday)',3,'Roast Pork, Char Siew and Soya Chicken served with Plain Rice, Chye Sim, Clear Chicken Soup and Tropical Fruits','false','',10.9,'1f0dc1c1048278c9e3ede4a022d03aec.jpg','true','true'),
 (34,2,'Weekday Set Lunch (Wednesday)',3,'Assam Laksa served with Mackerel Fish, Deep-fried Chicken Wings and Tropical Fruits','false','',10.9,'8d24c367e99d27e31599f6d2f0c6e421.jpg','true','true'),
 (35,2,'Weekday Set Lunch (Thursday)',3,'Beef Bulgogi served with Shitake Mushrooms, Kimchi Ginseng Chicken Soup, Plain Rice and Tropical Fruits','false','',10.9,'8d14577f23eb3c70116a8409d0fa5d20.jpg','true','true'),
 (36,2,'Weekday Set Lunch (Friday)',3,'Nasi Lemak served with Otak-otak, Chicken Wing, Hard Boiled Egg, Ikan Selar, Roast Peanuts, Ikan Bilis, Coconut Rice and Tropical Fruits','false','',10.9,'60d7d736fc35dcbc3779c404c9a625fc.jpg','true','true'),
 (37,2,'Chicken Rice',2,'','false','',5.0,'3a3c22cf87cc8ce595470db268bda489.jpg','true','false'),
 (38,2,'Hot Coffee',5,'','true','Small',5.9,'df6c89af26f8fff56ad730cf4a8ff9cc.jpg','true','false'),
 (47,1,'Double-boiled Snow Frog with American Ginseng',19,'Double-boiled Snow Frog with American Ginseng','false','',6.9,'','true','true'),
 (59,1,'Samsui Ginger Chicken',15,'','true','Small',16.9,'368ce318ac6d07108073e113be395e0c.jpg','true','true'),
 (60,1,'Samsui Ginger Chicken',15,'','true','Medium',32.9,'9e9d0950aa6ecf98365222b77492b837.jpg','true','true');
CREATE TABLE "CustomerOrder" (
	`orderID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`restaurantID`	INTEGER NOT NULL,
	`reservationID`	INTEGER,
	`tableNumber`	INTEGER,
	`staffID`	INTEGER,
	`orderTimestamp`	TEXT,
	`totalBill`	REAL,
	`orderStatus`	TEXT,
	`orderType`	TEXT,
	FOREIGN KEY(`restaurantID`) REFERENCES `RestaurantAccount`(`ID`)
);
INSERT INTO `CustomerOrder` (orderID,restaurantID,reservationID,tableNumber,staffID,orderTimestamp,totalBill,orderStatus,orderType) VALUES (1,2,'',25,1,'2016-03-08 23:22:35','','Processing','Dine-In'),
 (2,2,'',1,1,'2016-03-11 19:27:30','','Processing','Dine-In');
CREATE TABLE "CreditCard" (
	`cardID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`customerID`	INTEGER,
	`nameOnCard`	TEXT,
	`cardNumber`	INTEGER,
	`cardType`	TEXT,
	`cardExpiry`	TEXT,
	`verificationCode`	INTEGER,
	FOREIGN KEY(`customerID`) REFERENCES UserAccount(userID)
);
COMMIT;
