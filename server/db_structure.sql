DROP TABLE IF EXISTS `houses`;

CREATE TABLE `houses`(
`id` int auto_increment not null, 
`link` VARCHAR (255) not null unique,
`market_date` date not null,//
`location_country` VARCHAR (50) not null, 
`location_city` VARCHAR (50) not null,
`location_address` VARCHAR (100) DEFAULT null,
`location_coordinates_lat` float DEFAULT NULL,
`location_coordinates_lng` float DEFAULT NULL,
`size_living_area` int not NULL,
`size_rooms` int not NULL,
`price_value` float not NULL,
`price_currency` VARCHAR (3) not NULL,
`description` text DEFAULT NULL,
`title` VARCHAR (255) DEFAULT NULL,
`images` text DEFAULT NULL,
`sold` tinyint (4),
 primary key(`id`)
);