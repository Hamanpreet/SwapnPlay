-- Drop commands (in reverse order)
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS match;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS toy;
DROP TABLE IF EXISTS users;

-- Create the USERS table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    city VARCHAR(255) NOT NULL,
    sub_id VARCHAR(255) NOT NULL,
    profileImage VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

-- Create the TOY table
CREATE TABLE toy (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    age_group VARCHAR(255),
    value NUMERIC(10, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    longitude VARCHAR(255) NOT NULL,
    latitude VARCHAR(255) NOT NULL,
    condition VARCHAR(255),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

-- Create the MATCH table
CREATE TABLE match (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    toy_id INTEGER REFERENCES toy(id) ON DELETE CASCADE,
    toy_in_exchange_id INTEGER REFERENCES toy(id) ON DELETE CASCADE,
    requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
  );

-- Create the IMAGE table
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    toy_id INTEGER REFERENCES toy(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

-- Create the MESSAGE table
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    match_id INTEGER REFERENCES match(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

-- Create the REVIEW table
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    ratings INT NOT NULL,
    review VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    match_id INTEGER REFERENCES match(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
)