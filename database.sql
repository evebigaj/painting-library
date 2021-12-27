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