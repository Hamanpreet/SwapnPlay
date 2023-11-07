
-- Seed data for the USERS table
INSERT INTO users (first_name, last_name, email, phone_number, city, sub_id, created_at)
VALUES
    ('John', 'Doe', 'john@gmail.com', '123-456-7890', 'Toronto', 'ONT001', NOW()),
    ('Jane', 'Smith', 'jane@gmail.com', '987-654-3210', 'Mississauga', 'ONT002', NOW()),
    ('Mike', 'Johnson', 'mike@gmail.com', '555-555-5555', 'Brampton', 'ONT003', NOW());

-- Seed data for the TOY table
INSERT INTO toy (title, description, age_group, value, address, longitude, latitude, condition, user_id, created_at)
VALUES
    ('Car', 'Description', 'Ages 3-5', 19.99, '123 Toy Street, Toronto', -79.3832, 43.6532, 'New', 1, NOW()),
    ('Teddy Bear', 'Description', 'Ages 6-8', 29.99, '456 Play Avenue, Mississauga', -79.6129, 43.5890, 'Used', 2, NOW()),
    ('Spiderman', 'Description', 'Ages 9-12', 39.99, '789 Fun Road, Brampton', -79.7529, 43.6830, 'Like New', 3, NOW()),
    ('Duckling', 'Description', 'Ages 6-8', 39.99, '789 Fun Road, Hamilton', -79.1234, 43.6789, 'New', 3, NOW()),
    ('Robot', 'Description', 'Ages 3-5', 39.99, '789 Fun Road, Calidon', -79.6666, 43.9877, 'Used', 3, NOW());

-- Seed data for the MATCH table
INSERT INTO match (status, toy_id, toy_in_exchange_id, requester_id, owner_id, created_at)
VALUES
    ('Pending', 1, 2, 1, 2, NOW()),
    ('Accepted', 2, 1, 2, 1, NOW()),
    ('Pending', 3, 2, 3, 2, NOW());
    

-- Seed data for the IMAGE table
INSERT INTO image (url, toy_id, created_at)
VALUES
    ('https://res.cloudinary.com/dhbnibaze/image/upload/v1699220173/t7nzt8vgqyc5xxztf0zy.jpg', 1, NOW()),
    ('https://res.cloudinary.com/dhbnibaze/image/upload/v1699235344/mmsae3xfpsayqokftdnn.jpg', 2, NOW()),
    ('https://res.cloudinary.com/dhbnibaze/image/upload/v1699235461/uuuvxfvyln7hhtw6h9qb.jpg', 3, NOW()),
    ('https://res.cloudinary.com/dhbnibaze/image/upload/v1699235536/us6austgvzdhmwburykh.jpg', 4, NOW()),
    ('https://res.cloudinary.com/dhbnibaze/image/upload/v1699135026/rlztesanvask45xls7to.jpg', 5, NOW());

-- Seed data for the MESSAGE table
INSERT INTO message (text, match_id, sender_id, receiver_id, created_at)
VALUES
    ('Hello, let''s trade!', 1, 1, 2, NOW()),
    ('Sure, I like your toy!', 1, 2, 1, NOW()),
    ('Hi, interested in a trade?', 2, 3, 2, NOW());
    

-- Seed data for the REVIEW table
INSERT INTO review (ratings, review, user_id, match_id, created_at)
VALUES
    (5, 'Great trade!', 1, 1, NOW()),
    (4, 'Smooth transaction', 2, 1, NOW()),
    (5, 'Excellent trader!', 3, 2, NOW());
