create table paintings (
    id integer primary key, 
    title varchar(100),
    width decimal, 
    height decimal,
    available boolean, 
    price decimal,
    url varchar(100),
    genre varchar(100)
    );

create table carts (
    session_id integer, 
    item_id integer
    );

insert into paintings (id, title, width, height, available, price, url, genre) values(1, 'Fall Window',12, 16, true, 280, '/photos/fallWindow.jpg', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(2, 'A Couple', 24, 18, true, 380, '/photos/couple.jpg', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(3, 'Fruit Path',12, 12, true, 260, '/photos/fruitPath.jpg', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(4, 'Cambridge Spring',12, 16, true, 280, '/photos/cambridgeSpring.jpg', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(5, 'Pink and Yellow',18, 24, true, 380, '/photos/pinkYellow.jpg', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(6, 'The Gaze',18, 24, true, 380, '/photos/pinkYellow.jpg', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(7, 'The Net',16, 12, true, 280, '/photos/net.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(8, 'Homage to David Park',12, 12, true, 260, '/photos/davidPark.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(9, 'Abstract Sunset',40, 30, true, 700, '/photos/abstractSunset.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(10, 'Back from the Brink',36, 24, true, 560, '/photos/backFromBrink.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(11, 'Cambridge Fall',12, 16, true, 280, '/photos/cambridgeFall.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(12, 'The Fishermen',24, 18, true, 380, '/photos/fishermen.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(13, 'Flower in her Hair',18, 24, true, 380, '/photos/flowerHair.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(14, 'The Gaze',18,24, true, 380, '/photos/gaze.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(15, 'A Glimpse',10, 30, true, 330, '/photos/glimpse.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(16, 'Green Light',16, 12, true, 280, '/photos/greenLight.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(17, 'One Thing May Hide Another',24, 12, true, 320, '/photos/hide.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(18, 'Lotus Pond',16, 12, true, 280, '/photos/lotusPond.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(19, 'Willow Pond',12, 16, true, 280, '/photos/pond.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(20, 'Winter Car',16, 20, true, 330, '/photos/winterCar.png', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(21, 'Winter Lemon',16, 20, true, 330, '/photos/winterLemon.png', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(22,'Seashells',16, 20, true, 330, '/photos/seashells.png', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(23,'Patterns',24, 20, true, 400, '/photos/patterns.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(24,'Powerful',30, 30, true, 580, '/photos/powerful.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(25,'Tulips',16, 12, true, 280, '/photos/tulips.png', 'still life');
insert into paintings (id, title, width, height, available, price, url, genre) values(26,'Walking By',16, 12, true, 280, '/photos/walkingBy.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(27,'Unloading',18, 18, true, 340, '/photos/unloading.png', 'people');
insert into paintings (id, title, width, height, available, price, url, genre) values(28, 'Fall Reflection', 16, 12, true, 280, '/photos/fallReflection.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(29, 'High Summer, Rock Meadow',16, 12, true, 280, '/photos/highSummer.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(30, 'Lavender Hill',16, 12, true, 280, '/photos/lavenderHill.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(31, 'Rock Meadow 1',16, 12, true, 280, '/photos/rockMeadow1.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(32, 'Rock Meadow 2',16, 12, true, 280, '/photos/rockMeadow2.png', 'landscape');
insert into paintings (id, title, width, height, available, price, url, genre) values(33, 'Weeks Footbridge 1',16, 12, true, 280, '/photos/weeks1.png', 'landscape');