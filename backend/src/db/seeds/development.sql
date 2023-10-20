-- Seed data for the USER table
INSERT INTO USERS (First_Name, Last_Name, Email, Password, PhoneNumber, City, Sub_Id) VALUES
    ('Alice', 'Smith', 'alice@gmail.com', 'Final@123', '123-456-7890', 'Toronto', 1),
    ('Bob', 'Johnson', 'bob@gmail.com', 'Final@123','987-654-3210', 'Ottawa', 2),
    ('Charlie', 'Brown', 'charlie@gmail.com', 'Final@123','555-123-4567', 'Hamilton', 3),
    ('David', 'Wilson', 'david@gmail.com', 'Final@123', '111-222-3333', 'Stoney Creek', 4),
    ('Eve', 'Miller', 'eve@gmail.com', 'Final@123', '444-555-6666', 'Toronto', 5),
    ('Frank', 'Davis', 'frank@gmail.com', 'Final@123', '777-888-9999', 'Missisauga', 6),
    ('Grace', 'Anderson', 'grace@gmail.com', 'Final@123', '888-999-0000', 'London', 7),
    ('Harry', 'Martinez', 'harry@gmail.com', 'Final@123', '111-222-3333', 'Ottawa', 8),
    ('Isabel', 'Harris', 'isabel@gmail.com', 'Final@123', '222-333-4444', 'Ajax', 9),
    ('Jack', 'Lee', 'jack@gmail.com', 'Final@123', '333-444-5555', 'Ottawa', 10);

-- Seed data for the TOY table
INSERT INTO TOY (User_Id, Title, Description, Age_Group, Value, Pickup_Location, Condition) VALUES
    (1,'A fun toy for kids', 'Description', '5-8 years', 19.99, 'Toronto', 'New'),
    (1,'Another great toy', 'Description','3-6 years', 14.99, 'Toronto', 'Used'),
    (2,'Toy for exchange', 'Description','7-10 years', 9.99, 'Ottawa', 'Good'),
    (2,'Educational toy', 'Description', '5-8 years', 29.99, 'Ottawa', 'Like New'),
    (3,'Creative building toy', 'Description','3-6 years', 24.99, 'Toronto', 'Used'),
    (3,'Outdoor play toy', 'Description','7-10 years', 12.99, 'Toronto', 'Good'),
    (4,'Art and craft kit', 'Description','5-8 years', 19.99, 'Ottawa', 'New'),
    (4,'Puzzle game', 'Description','3-6 years', 14.99, 'Ottawa', 'Used'),
    (5,'Remote control car','Description', '7-10 years', 39.99, 'Toronto', 'Like New'),
    (5,'Plush teddy bear', 'Description','0-3 years', 9.99, 'Toronto', 'Good');

-- Sample data for the MATCH table
INSERT INTO MATCH (Toy1_Id, Toy2_Id, User1_Id, User2_Id, Is_Swaped) VALUES
    (1, 3, 1, 2, true),
    (2, 4, 3, 4, true),
    (3, 5, 5, 6, true),
    (4, 6, 7, 8, true),
    (5, 7, 9, 10, true),
    (6, 8, 2, 1, true),
    (7, 9, 4, 3, true),
    (8, 10, 6, 5, true),
    (9, 2, 8, 7, true),
    (10, 4, 10, 9, true);

-- Sample data for the IMAGE table
INSERT INTO IMAGE (Toy_Id, Url) VALUES
    (1, 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'),
    (2, 'https://commons.wikimedia.org/wiki/Main_Page#/media/File:Himalayas,_Nepal.jpg'),
    (3, 'https://commons.wikimedia.org/wiki/Commons:Photo_challenge#/media/File:Wilting_Sunflower_Silhouette.png'),
    (4, 'https://commons.wikimedia.org/wiki/Commons:Photo_challenge#/media/File:Boulder_Eclipse_traverse.jpg'),
    (5, 'https://commons.wikimedia.org/wiki/Commons:Photo_challenge#/media/File:Bouquetin_en_Vanoise,_%C3%A9t%C3%A9_2023_03.jpg'),
    (6, 'https://commons.wikimedia.org/wiki/Commons:Photo_challenge#/media/File:V%C3%B6gel_und_Libellen_Miro_nachempfunden_2000_zuschnitt.jpg'),
    (7, 'https://commons.wikimedia.org/wiki/Commons:Photo_challenge#/media/File:Silhouette_von_Schiff_und_Windkraftanlage_im_Sonnenuntergang.jpg'),
    (8, 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Pasture_and_pillbox_at_Pauperhaugh%2C_Brinkburn_-_geograph.org.uk_-_1888958.jpg'),
    (9, 'https://commons.wikimedia.org/wiki/Category:Indigenous_art#/media/File:Aboriginal_hollow_log_tomb.jpg'),
    (10, 'https://commons.wikimedia.org/wiki/Category:Indigenous_art#/media/File:Mungart_Boodja_Art_Centre.jpg');

-- Sample data for the CHAT table
INSERT INTO CHAT (Match_Id, Message) VALUES
    (1, 'Hi there'),
    (1, 'Hi there'),
    (2, 'Hi there'),
    (2, 'Hi there');

-- Sample data for the REVIEW table
INSERT INTO REVIEW (User_Id, Match_Id, Ratings, Swap_Status) VALUES
    (1, 1, 5, 'Successful'),
    (2, 1, 5, 'Successful'),
    (3, 2, 4, 'Successful'),
    (4, 2, 4, 'Successful'),
    (5, 3, 5, 'Successful'),
    (6, 3, 5, 'Successful'),
    (7, 4, 4, 'Successful'),
    (8, 4, 4, 'Successful'),
    (9, 5, 5, 'Successful'),
    (10, 5, 5,'Successful');