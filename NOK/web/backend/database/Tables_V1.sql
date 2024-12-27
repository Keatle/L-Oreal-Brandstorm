-- Creating a custom ENUM type for payment_method
CREATE TYPE payment_method_enum AS ENUM ('Credit Card', 'Debit Card', 'PayPal', 'Cash');

-- Creating the 'payment' table
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method payment_method_enum,
    amount DECIMAL NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES "order"(order_id)
);

------------------------------------------------------------------------------------------------------------------------------
-- Create the custom ENUM type
CREATE TYPE order_status AS ENUM ('Pending', 'Completed', 'Cancelled');

-- Creating the 'order' table with the ENUM type
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL,
    status order_status,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

---------------------------------------------------------------------------------------------------------------------------------
-- Creating the 'product' table
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name CHAR(50),
    product_description CHAR(200),
    price DECIMAL NOT NULL,
    category CHAR(50),
    stock_quantity INT,
    brand CHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_product_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for the 'product' table
CREATE TRIGGER set_product_updated_at
BEFORE UPDATE ON product
FOR EACH ROW
EXECUTE FUNCTION update_product_updated_at();

-------------------------------------------------------------------------------------------------------------------------
-- Creating the 'article' table
CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title CHAR(100),
    content CHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- Trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for the 'article' table
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON article
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-------------------------------------------------------------------------------------------------------------------------
-- Define the ENUM type for skin_type
CREATE TYPE skin_type_enum AS ENUM ('Oily', 'Dry', 'Combination', 'Normal');

-- Creating the 'ai_analysis' table
CREATE TABLE ai_analysis (
    analysis_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    skin_type skin_type_enum, -- Use the ENUM type here
    recommendations CHAR(500),
    image_url CHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-------------------------------------------------------------------------------------------------------------------------------
-- Creating the 'user' table
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    first_name CHAR(50),
    last_name CHAR(50),
    email CHAR(100) UNIQUE NOT NULL,
    password CHAR(150) NOT NULL,
    phone_number CHAR(15),
    date_of_birth DATE,
    gender CHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')), -- Using CHECK instead of ENUM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a function to update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for the 'user' table
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

------------------------------------------------------------------------------------------------------
-- Creating the 'cart' table
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

------------------------------------------------------------------------------------------------------
-- Creating the 'cart_item' table
CREATE TABLE cart_item (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


