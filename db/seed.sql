-- Disable foreign key checks for setup
PRAGMA foreign_keys = OFF;

-- Drop existing tables in reverse order
DROP TABLE IF EXISTS review_stats;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS food_details;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Enable foreign key checks
PRAGMA foreign_keys = ON;

-- Base users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  profile_image TEXT,
  logto_id TEXT UNIQUE,
  created_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  role TEXT DEFAULT 'user',
  settings TEXT
);

-- Categories table with slug and description
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Foods table - core food items with simplified fields
CREATE TABLE foods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER,
  icon TEXT,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  link TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  updated_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Food details table - extended information about foods
CREATE TABLE food_details (
  food_id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  ingredients TEXT, -- JSON array of ingredients
  recipe TEXT,
  time_cost TEXT CHECK(time_cost IN ('Low', 'Medium', 'High')),
  image TEXT,
  regions TEXT, -- JSON array of regions
  tags TEXT, -- JSON array of tags
  publish_date TEXT,
  publisher_name TEXT,
  publisher_email TEXT,
  similar_foods TEXT, -- JSON array of similar food IDs
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  food_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  user_image TEXT,
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  text TEXT,
  rating_date TEXT NOT NULL,
  created_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  updated_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Review statistics table
CREATE TABLE review_stats (
  food_id TEXT PRIMARY KEY,
  avg_rating REAL DEFAULT 0,
  total_rating_sum INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  rating_distribution TEXT, -- JSON object with rating distribution (e.g., {"1": 5, "2": 10, ...})
  last_review_date TEXT,
  updated_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_foods_category ON foods(category_id);
CREATE INDEX idx_foods_rating ON foods(rating);
CREATE INDEX idx_foods_slug ON foods(slug);
CREATE INDEX idx_food_details_time_cost ON food_details(time_cost);
CREATE INDEX idx_reviews_food_id ON reviews(food_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Triggers to update foods table rating and review_count when reviews are added, updated or deleted
CREATE TRIGGER update_food_stats_after_review_insert
AFTER INSERT ON reviews
BEGIN
  UPDATE foods
  SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE food_id = NEW.food_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.food_id;
  
  -- Also update the review_stats table
  INSERT OR REPLACE INTO review_stats (
    food_id, 
    avg_rating, 
    total_rating_sum, 
    total_reviews, 
    rating_distribution,
    last_review_date,
    updated_at
  ) 
  VALUES (
    NEW.food_id,
    (SELECT AVG(rating) FROM reviews WHERE food_id = NEW.food_id),
    (SELECT SUM(rating) FROM reviews WHERE food_id = NEW.food_id),
    (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id),
    (SELECT json_object(
      '1', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 1),
      '2', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 2),
      '3', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 3),
      '4', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 4),
      '5', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 5)
    )),
    (SELECT MAX(rating_date) FROM reviews WHERE food_id = NEW.food_id),
    CURRENT_TIMESTAMP
  );
END;

CREATE TRIGGER update_food_stats_after_review_update
AFTER UPDATE ON reviews
BEGIN
  UPDATE foods
  SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE food_id = NEW.food_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.food_id;
  
  -- Also update the review_stats table
  UPDATE review_stats
  SET 
    avg_rating = (SELECT AVG(rating) FROM reviews WHERE food_id = NEW.food_id),
    total_rating_sum = (SELECT SUM(rating) FROM reviews WHERE food_id = NEW.food_id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id),
    rating_distribution = (SELECT json_object(
      '1', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 1),
      '2', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 2),
      '3', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 3),
      '4', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 4),
      '5', (SELECT COUNT(*) FROM reviews WHERE food_id = NEW.food_id AND rating = 5)
    )),
    last_review_date = (SELECT MAX(rating_date) FROM reviews WHERE food_id = NEW.food_id),
    updated_at = CURRENT_TIMESTAMP
  WHERE food_id = NEW.food_id;
END;

CREATE TRIGGER update_food_stats_after_review_delete
AFTER DELETE ON reviews
BEGIN
  UPDATE foods
  SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE food_id = OLD.food_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = OLD.food_id;
  
  -- Also update the review_stats table
  UPDATE review_stats
  SET 
    avg_rating = (SELECT AVG(rating) FROM reviews WHERE food_id = OLD.food_id),
    total_rating_sum = (SELECT SUM(rating) FROM reviews WHERE food_id = OLD.food_id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id),
    rating_distribution = (SELECT json_object(
      '1', (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id AND rating = 1),
      '2', (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id AND rating = 2),
      '3', (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id AND rating = 3),
      '4', (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id AND rating = 4),
      '5', (SELECT COUNT(*) FROM reviews WHERE food_id = OLD.food_id AND rating = 5)
    )),
    last_review_date = (SELECT MAX(rating_date) FROM reviews WHERE food_id = OLD.food_id),
    updated_at = CURRENT_TIMESTAMP
  WHERE food_id = OLD.food_id;
END;

-- Create sample user for testing
INSERT INTO users (id, email, first_name, last_name, role, profile_image)
VALUES ('e6h0n4lc', 'myaicour@gmail.com', 'Test', 'User', 'admin', '/placeholder.svg?height=100&width=100');

-- Populate categories with slug and description
INSERT INTO categories (name, slug, description) VALUES 
('Main Course', 'main-course', 'Primary dishes that form the centerpiece of a meal'),
('Appetizer', 'appetizer', 'Small dishes served before the main course'),
('Breakfast', 'breakfast', 'Morning meals to start the day'),
('Soup', 'soup', 'Liquid food typically made by cooking ingredients in stock or water'),
('Salad', 'salad', 'Dishes consisting of mixed, often raw vegetables'),
('Dessert', 'dessert', 'Sweet dishes typically served at the end of a meal'),
('Beverage', 'beverage', 'Drinks of various kinds'),
('Side Dish', 'side-dish', 'Smaller dishes served alongside the main course');

-- Populate foods table with core info
INSERT INTO foods (id, name, category_id, icon, rating, review_count, link, slug) VALUES
('1', 'Spaghetti Carbonara', (SELECT id FROM categories WHERE slug = 'main-course'), '🍝', 4.7, 3, '/foods/spaghetti-carbonara', 'spaghetti-carbonara'),
('2', 'Pad Thai', (SELECT id FROM categories WHERE slug = 'main-course'), '🍜', 4.2, 3, '/foods/pad-thai', 'pad-thai'),
('3', 'Moroccan Tagine', (SELECT id FROM categories WHERE slug = 'main-course'), '🍲', 4.9, 3, '/foods/moroccan-tagine', 'moroccan-tagine'),
('4', 'Guacamole', (SELECT id FROM categories WHERE slug = 'appetizer'), '🥑', 4.5, 3, '/foods/guacamole', 'guacamole'),
('5', 'Beef Pho', (SELECT id FROM categories WHERE slug = 'soup'), '🍲', 4.8, 3, '/foods/beef-pho', 'beef-pho'),
('6', 'Shakshuka', (SELECT id FROM categories WHERE slug = 'breakfast'), '🍳', 4.3, 3, '/foods/shakshuka', 'shakshuka'),
('7', 'Bibimbap', (SELECT id FROM categories WHERE slug = 'main-course'), '🍚', 4.6, 3, '/foods/bibimbap', 'bibimbap'),
('8', 'Potato Gnocchi', (SELECT id FROM categories WHERE slug = 'main-course'), '🥔', 4.7, 3, '/foods/potato-gnocchi', 'potato-gnocchi'),
('9', 'Butter Chicken', (SELECT id FROM categories WHERE slug = 'main-course'), '🍗', 4.4, 3, '/foods/butter-chicken', 'butter-chicken');

-- Populate food_details with extended info
INSERT INTO food_details (food_id, description, ingredients, recipe, time_cost, image, regions, tags, publish_date, publisher_name, publisher_email, similar_foods) VALUES
('1', 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.', 
 '["Spaghetti", "Eggs", "Pecorino Romano", "Pancetta", "Black Pepper"]',
 'Cook spaghetti according to package instructions. In a separate bowl, whisk eggs, grated Pecorino Romano, and black pepper. In a pan, cook diced pancetta until crispy. Drain pasta and immediately add to the pan with pancetta. Remove from heat and quickly stir in the egg mixture, creating a creamy sauce. Serve immediately with extra cheese and pepper.',
 'Low', 
 '/placeholder.svg?height=400&width=600',
 '["Italy"]',
 '["Pasta", "Italian"]',
 '2023-11-15',
 'Italian Food Expert',
 'italian@example.com',
 '["8", "9"]'),
 
('2', 'Popular Thai stir-fried rice noodle dish with a perfect balance of sweet, sour and savory flavors',
 '["Rice Noodles", "Eggs", "Bean Sprouts", "Tofu/Chicken/Shrimp", "Fish Sauce", "Tamarind Paste", "Palm Sugar", "Peanuts", "Lime", "Cilantro"]',
 'Soak rice noodles in warm water until soft. In a wok, heat oil and add minced garlic. Add protein of choice (shrimp, chicken, or tofu) and cook until done. Push to the side and scramble eggs in the same wok. Add drained noodles, bean sprouts, and pour in sauce (fish sauce, tamarind paste, palm sugar). Toss everything together and cook until noodles are tender. Serve with crushed peanuts, lime wedges, and fresh cilantro.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["Thailand", "Southeast Asia"]',
 '["Noodles", "Stir-fry"]',
 '2023-08-22',
 'Thai Cuisine Master',
 'thai@example.com',
 '["5", "7"]'),
 
('3', 'Slow-cooked savory stew with tender meat, aromatic spices, and dried fruits.',
 '["Lamb/Chicken", "Onions", "Garlic", "Cumin", "Coriander", "Cinnamon", "Paprika", "Turmeric", "Dried Apricots", "Prunes", "Almonds", "Couscous"]',
 'In a tagine pot or heavy-bottomed Dutch oven, brown meat (lamb or chicken) in olive oil. Add diced onions and garlic, cooking until soft. Add spices (cumin, coriander, cinnamon, paprika, turmeric) and stir to coat meat. Add vegetables, dried fruits (apricots, prunes), and broth. Cover and simmer on low heat for 1-2 hours until meat is tender. Garnish with fresh herbs and toasted almonds. Serve with couscous.',
 'High',
 '/placeholder.svg?height=400&width=600',
 '["Morocco", "North Africa"]',
 '["Stew", "Slow-cooked", "Middle Eastern"]',
 '2024-01-05',
 'Moroccan Chef',
 'morocco@example.com',
 '["9", "5"]'),
 
('4', 'Fresh and creamy avocado dip with lime, cilantro, and just the right amount of spice.',
 '["Avocados", "Red Onion", "Tomatoes", "Garlic", "Cilantro", "Jalapeño", "Lime", "Salt"]',
 'Mash ripe avocados in a bowl. Add finely chopped red onion, diced tomatoes, minced garlic, chopped cilantro, and jalapeño (seeds removed for less heat). Squeeze fresh lime juice and add salt to taste. Mix well but leave some chunks for texture. Cover the surface with plastic wrap to prevent browning and refrigerate for 30 minutes before serving with tortilla chips.',
 'Low',
 '/placeholder.svg?height=400&width=600',
 '["Mexico", "Central America"]',
 '["Dip", "Appetizer"]',
 '2023-06-10',
 'Mexican Food Enthusiast',
 'mexico@example.com',
 '["6"]'),
 
('5', 'Aromatic Vietnamese beef noodle soup with rich broth, tender meat, and fresh herbs.',
 '["Beef Bones", "Rice Noodles", "Beef Sirloin", "Onion", "Ginger", "Star Anise", "Cinnamon", "Fish Sauce", "Bean Sprouts", "Thai Basil", "Lime", "Hoisin Sauce", "Sriracha"]',
 'Simmer beef bones, onion, ginger, star anise, cinnamon, cloves, and cardamom in water for 3-4 hours to create a flavorful broth. Strain and season with fish sauce and salt. Cook rice noodles according to package instructions. Arrange noodles in bowls, top with thinly sliced raw beef and pour hot broth over to cook the meat. Serve with bean sprouts, Thai basil, lime wedges, hoisin sauce, and sriracha on the side.',
 'High',
 '/placeholder.svg?height=400&width=600',
 '["Vietnam", "Southeast Asia"]',
 '["Soup", "Noodles"]',
 '2024-02-28',
 'Vietnamese Cuisine Expert',
 'vietnam@example.com',
 '["2", "7"]'),
 
('6', 'Flavorful Middle Eastern dish of eggs poached in a spiced tomato and pepper sauce.',
 '["Eggs", "Tomatoes", "Bell Peppers", "Onions", "Garlic", "Cumin", "Paprika", "Cayenne Pepper", "Feta Cheese", "Parsley", "Bread"]',
 'In a large skillet, heat olive oil and sauté diced onions and bell peppers until soft. Add minced garlic, cumin, paprika, and cayenne pepper, cooking until fragrant. Pour in canned tomatoes and simmer until slightly thickened. Create wells in the sauce and crack eggs into them. Cover and cook until egg whites are set but yolks are still runny. Garnish with crumbled feta cheese and chopped parsley. Serve with crusty bread for dipping.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["Palestine", "North Africa", "Middle East"]',
 '["Breakfast", "Eggs"]',
 '2023-09-14',
 'Middle Eastern Food Specialist',
 'middleeast@example.com',
 '["4"]'),
 
('7', 'Korean rice bowl topped with sautéed vegetables, protein, egg, and spicy gochujang sauce.',
 '["Short-grain Rice", "Spinach", "Carrots", "Zucchini", "Bean Sprouts", "Mushrooms", "Beef/Tofu", "Eggs", "Gochujang Sauce", "Sesame Oil", "Soy Sauce", "Garlic"]',
 'Cook short-grain rice and set aside. Separately sauté spinach, carrots, zucchini, bean sprouts, and mushrooms with a bit of sesame oil and salt. Cook protein of choice (beef, tofu) with soy sauce and garlic. Fry an egg sunny-side up. Arrange rice in a bowl, place vegetables and protein in sections around the rice, and top with the fried egg. Serve with gochujang sauce on the side to mix in according to taste.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["Korea"]',
 '["Rice Bowl", "Korean"]',
 '2023-10-18',
 'Korean Cooking Expert',
 'korean@example.com',
 '["5", "9"]'),
 
('8', 'Pillowy soft Italian potato dumplings perfect with various sauces.',
 '["Potatoes", "Flour", "Eggs", "Salt", "Butter", "Sage", "Parmesan Cheese"]',
 'Boil potatoes with skin on until tender. Peel while hot and pass through a ricer. Let cool slightly, then add flour, egg, and salt to form a dough. Be careful not to overwork. Roll into ropes and cut into bite-sized pieces. Press each piece against a fork to create ridges. Boil in salted water until they float to the surface. Serve with your favorite sauce - classic options include brown butter and sage, tomato sauce, or pesto.',
 'High',
 '/placeholder.svg?height=400&width=600',
 '["Italy"]',
 '["Pasta", "Dumplings"]',
 '2023-07-22',
 'Italian Pasta Expert',
 'pasta@example.com',
 '["1", "9"]'),
 
('9', 'Creamy, tomato-based Indian curry with tender chicken pieces and aromatic spices.',
 '["Chicken", "Yogurt", "Butter", "Cream", "Tomato Puree", "Onions", "Ginger", "Garlic", "Garam Masala", "Turmeric", "Cumin", "Coriander", "Cilantro", "Rice/Naan"]',
 'Marinate chicken in yogurt, lemon juice, turmeric, garam masala, and cumin for at least 1 hour. In a large pot, heat butter and sauté onions until golden. Add ginger-garlic paste and tomato puree, cooking until oil separates. Add spices (cumin, coriander, garam masala) and cook until fragrant. Add marinated chicken and simmer until cooked through. Stir in cream and a little sugar to balance flavors. Garnish with fresh cilantro and serve with naan bread or rice.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["India", "South Asia"]',
 '["Curry", "Indian"]',
 '2023-09-05',
 'Indian Cuisine Master',
 'india@example.com',
 '["3", "7"]');

-- Create review entries from the mock data
INSERT INTO reviews (id, food_id, user_id, username, user_image, rating, text, rating_date) VALUES
-- Reviews for Spaghetti Carbonara
('101', '1', 'user1', 'Sarah Johnson', '/placeholder.svg?height=100&width=100', 5, 'This carbonara recipe is absolutely perfect! The balance of creamy eggs and salty pancetta creates such a decadent dish. I''ve tried many versions but this one is my go-to now.', '2024-02-15'),
('102', '1', 'user2', 'Alex Chen', '/placeholder.svg?height=100&width=100', 4, 'Really good authentic carbonara. The technique for creating the sauce without curdling the eggs took some practice, but it''s worth it. I''d recommend adding a bit more black pepper.', '2024-01-20'),
('103', '1', 'user3', 'Miguel Reyes', '/placeholder.svg?height=100&width=100', 5, 'As someone who lived in Rome for years, this is the closest to authentic carbonara I''ve found. No cream needed - just quality ingredients and proper technique. Bellissimo!', '2023-12-08'),

-- Reviews for Pad Thai
('201', '2', 'user4', 'Jordan Smith', '/placeholder.svg?height=100&width=100', 4, 'This Pad Thai recipe has become a staple in our weekly rotation. The balance of sweet, sour, and savory is spot on. Finding tamarind paste was worth the effort!', '2024-01-10'),
('202', '2', 'user5', 'Priya Patel', '/placeholder.svg?height=100&width=100', 3, 'Good flavor but the noodles came out a bit too soft. I think next time I''ll soak them for less time. The sauce proportions were perfect though.', '2023-11-05'),
('203', '2', 'user6', 'Thomas Wright', '/placeholder.svg?height=100&width=100', 5, 'Making restaurant-quality Pad Thai at home seemed impossible until I tried this recipe. The tip about not overcrowding the wok made all the difference. My family keeps requesting it!', '2023-09-18'),

-- Reviews for Moroccan Tagine
('301', '3', 'user7', 'Emma Rodriguez', '/placeholder.svg?height=100&width=100', 5, 'This tagine is incredible! The combination of spices with the sweetness from the dried fruits creates such a complex flavor. Worth every minute of cooking time. The meat was fall-apart tender.', '2024-02-28'),
('302', '3', 'user8', 'David Kim', '/placeholder.svg?height=100&width=100', 5, 'I''ve been trying to recreate the tagine I had in Marrakech for years, and this recipe finally nailed it! The slow cooking is key to developing those rich flavors. My dinner guests were impressed.', '2024-02-10'),
('303', '3', 'user9', 'Olivia Thompson', '/placeholder.svg?height=100&width=100', 4, 'Almost perfect. The flavor profile is amazing, but I found it needed a bit more liquid during cooking. I added some extra broth halfway through and it turned out wonderfully.', '2024-01-25'),

-- Reviews for Guacamole
('401', '4', 'user10', 'Lucas Bennett', '/placeholder.svg?height=100&width=100', 5, 'This guacamole recipe has the perfect balance of flavors! The tip about leaving some chunks gives it great texture. It disappeared in minutes at our last gathering.', '2023-12-22'),
('402', '4', 'user11', 'Sophia Garcia', '/placeholder.svg?height=100&width=100', 4, 'Great classic guacamole. I added a bit more lime and some cumin for extra flavor. The plastic wrap tip really does prevent browning!', '2023-10-15'),
('403', '4', 'user12', 'Nathan Campbell', '/placeholder.svg?height=100&width=100', 4, 'Simple but delicious! I love that this recipe focuses on fresh ingredients without unnecessary additions. Perfect for taco night or just with chips.', '2023-08-30'),

-- Reviews for Beef Pho
('501', '5', 'user13', 'Rachel Lee', '/placeholder.svg?height=100&width=100', 5, 'This pho recipe is transformative! The broth is so rich and aromatic - worth every minute of simmering. I''ve made it three times now and it''s better than my local Vietnamese restaurant.', '2024-03-10'),
('502', '5', 'user14', 'Michael Brown', '/placeholder.svg?height=100&width=100', 5, 'I never thought I could make restaurant-quality pho at home until trying this recipe. The depth of flavor in the broth is incredible. Don''t skip toasting the spices!', '2024-03-01'),
('503', '5', 'user15', 'Hannah Wilson', '/placeholder.svg?height=100&width=100', 4, 'This pho is absolutely delicious. The only reason for 4 stars is the time commitment. It''s definitely a weekend project, but the results are worth it. I freeze extra broth for quick meals later.', '2024-02-14'),

-- Reviews for Shakshuka
('601', '6', 'user16', 'Daniel Martinez', '/placeholder.svg?height=100&width=100', 4, 'Such a flavorful breakfast! The spice level was perfect, and I love how versatile it is. I added some crumbled goat cheese on top which worked beautifully with the tomato sauce.', '2024-01-18'),
('602', '6', 'user17', 'Jennifer Wong', '/placeholder.svg?height=100&width=100', 5, 'Shakshuka has become our favorite weekend brunch. This recipe balances the spices perfectly, and the sauce develops such rich flavor. Don''t forget good bread for dipping!', '2023-12-05'),
('603', '6', 'user18', 'Ryan Taylor', '/placeholder.svg?height=100&width=100', 4, 'Great one-pan meal that works for any time of day. I like to add harissa paste for extra heat. The only challenge is getting the eggs cooked to the perfect consistency.', '2023-10-22'),

-- Reviews for Bibimbap
('701', '7', 'user19', 'Aisha Johnson', '/placeholder.svg?height=100&width=100', 5, 'This bibimbap recipe is fantastic! The combination of different vegetables creates such a beautiful and nutritious meal. The crispy rice at the bottom of the bowl is my favorite part.', '2024-02-08'),
('702', '7', 'user20', 'Marco Rossi', '/placeholder.svg?height=100&width=100', 5, 'Can''t believe how authentic this tastes! The gochujang sauce brings everything together perfectly. I love that each component is prepared separately - it''s labor-intensive but worth it.', '2023-12-15'),
('703', '7', 'user21', 'Emily Parker', '/placeholder.svg?height=100&width=100', 4, 'Love this recipe! The flavors and textures are amazing. I simplified by making fewer vegetables and it was still delicious. Make sure to mix everything well before eating!', '2023-11-03'),

-- Reviews for Potato Gnocchi
('801', '8', 'user22', 'Chris Anderson', '/placeholder.svg?height=100&width=100', 5, 'These gnocchi are cloud-like pillows of potato perfection! The recipe is spot on about not overworking the dough - that''s the key to keeping them light.', '2024-01-30'),
('802', '8', 'user23', 'Lily Zhang', '/placeholder.svg?height=100&width=100', 5, 'I''ve tried several gnocchi recipes and this one is by far the best. Using a potato ricer really does make a difference. The brown butter and sage sauce is heavenly!', '2023-11-20'),
('803', '8', 'user24', 'Omar Hassan', '/placeholder.svg?height=100&width=100', 4, 'Very good gnocchi recipe. It takes practice to get the right consistency, but these turned out light and flavorful. I froze half the batch for later and they cooked perfectly from frozen.', '2023-09-05'),

-- Reviews for Butter Chicken
('901', '9', 'user25', 'Grace Wilson', '/placeholder.svg?height=100&width=100', 4, 'This butter chicken is incredibly rich and flavorful. The marinade makes the chicken so tender. I reduced the cream slightly and it was still delicious.', '2024-02-20'),
('902', '9', 'user26', 'Jamal Clark', '/placeholder.svg?height=100&width=100', 5, 'Restaurant-quality butter chicken at home! The balance of spices is perfect - flavorful but not overwhelming. My whole family loved it, even the kids who usually avoid spicy food.', '2023-12-12'),
('903', '9', 'user27', 'Nina Patel', '/placeholder.svg?height=100&width=100', 4, 'Great authentic flavor! The recipe is straightforward but does require plenty of spices. Don''t skip the marinating time - it makes a big difference in the tenderness of the chicken.', '2023-10-30');

-- Populate review_stats table with calculated statistics
INSERT INTO review_stats (food_id, avg_rating, total_rating_sum, total_reviews, rating_distribution, last_review_date)
SELECT 
  food_id,
  AVG(rating) as avg_rating,
  SUM(rating) as total_rating_sum,
  COUNT(*) as total_reviews,
  json_object(
    '1', SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END),
    '2', SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END),
    '3', SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END),
    '4', SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END),
    '5', SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END)
  ) as rating_distribution,
  MAX(rating_date) as last_review_date
FROM reviews
GROUP BY food_id;

-- Create some additional user entries to ensure comprehensive data coverage
INSERT INTO users (id, email, first_name, last_name, profile_image, role)
VALUES 
('user1', 'sarah.johnson@example.com', 'Sarah', 'Johnson', '/placeholder.svg?height=100&width=100', 'user'),
('user2', 'alex.chen@example.com', 'Alex', 'Chen', '/placeholder.svg?height=100&width=100', 'user'),
('user3', 'miguel.reyes@example.com', 'Miguel', 'Reyes', '/placeholder.svg?height=100&width=100', 'user'),
('user4', 'jordan.smith@example.com', 'Jordan', 'Smith', '/placeholder.svg?height=100&width=100', 'user'),
('user5', 'priya.patel@example.com', 'Priya', 'Patel', '/placeholder.svg?height=100&width=100', 'user'),
('user6', 'thomas.wright@example.com', 'Thomas', 'Wright', '/placeholder.svg?height=100&width=100', 'user'),
('user7', 'emma.rodriguez@example.com', 'Emma', 'Rodriguez', '/placeholder.svg?height=100&width=100', 'user'),
('user8', 'david.kim@example.com', 'David', 'Kim', '/placeholder.svg?height=100&width=100', 'user'),
('user9', 'olivia.thompson@example.com', 'Olivia', 'Thompson', '/placeholder.svg?height=100&width=100', 'user'),
('user10', 'lucas.bennett@example.com', 'Lucas', 'Bennett', '/placeholder.svg?height=100&width=100', 'user');

-- Add more categories
INSERT INTO categories (name, slug, description) VALUES 
('Street Food', 'street-food', 'Quick and flavorful dishes commonly sold by vendors on streets'),
('Vegetarian', 'vegetarian', 'Dishes that do not contain meat or fish but may include animal products'),
('Vegan', 'vegan', 'Plant-based dishes with no animal products'),
('Seafood', 'seafood', 'Dishes primarily featuring fish and shellfish'),
('Snack', 'snack', 'Small portions of food eaten between meals');

-- Add more foods with comprehensive information
INSERT INTO foods (id, name, category_id, icon, rating, review_count, link, slug) VALUES
('10', 'Sushi Rolls', (SELECT id FROM categories WHERE slug = 'seafood'), '🍣', 4.6, 3, '/foods/sushi-rolls', 'sushi-rolls'),
('11', 'Vegetable Curry', (SELECT id FROM categories WHERE slug = 'vegetarian'), '🍛', 4.5, 3, '/foods/vegetable-curry', 'vegetable-curry'),
('12', 'Falafel Wrap', (SELECT id FROM categories WHERE slug = 'street-food'), '🥙', 4.3, 3, '/foods/falafel-wrap', 'falafel-wrap');

-- Add corresponding food details
INSERT INTO food_details (food_id, description, ingredients, recipe, time_cost, image, regions, tags, publish_date, publisher_name, publisher_email, similar_foods) VALUES
('10', 'Fresh and delicious Japanese sushi rolls with a variety of fillings.',
 '["Sushi Rice", "Nori Sheets", "Avocado", "Cucumber", "Carrots", "Salmon/Tuna", "Soy Sauce", "Wasabi", "Pickled Ginger"]',
 'Cook sushi rice according to package instructions and mix with rice vinegar, sugar, and salt. Let cool. Place a nori sheet on a bamboo rolling mat, cover with a thin layer of rice, leaving a margin at the top. Place fillings in a line across the middle. Roll firmly using the bamboo mat, moistening the top edge to seal. Cut into 6-8 pieces with a sharp, wet knife. Serve with soy sauce, wasabi, and pickled ginger.',
 'High',
 '/placeholder.svg?height=400&width=600',
 '["Japan", "East Asia"]',
 '["Seafood", "Japanese", "Raw"]',
 '2023-08-10',
 'Japanese Cuisine Expert',
 'japan@example.com',
 '["5", "7"]'),

('11', 'Rich and aromatic vegetable curry with a blend of Indian spices.',
 '["Potatoes", "Carrots", "Peas", "Cauliflower", "Onions", "Garlic", "Ginger", "Tomatoes", "Curry Powder", "Garam Masala", "Turmeric", "Cumin", "Coconut Milk", "Cilantro", "Rice"]',
 'Heat oil in a large pot and sauté diced onions until translucent. Add minced garlic and ginger, cooking until fragrant. Add spices (curry powder, garam masala, turmeric, cumin) and stir for 30 seconds. Add diced tomatoes and cook until soft. Add diced vegetables (potatoes, carrots, cauliflower) and enough water to cover. Simmer until vegetables are tender. Stir in coconut milk and peas, cooking for another 5 minutes. Garnish with fresh cilantro and serve with rice or naan bread.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["India", "South Asia", "Global"]',
 '["Vegetarian", "Curry", "Spicy"]',
 '2023-07-14',
 'Vegetarian Recipe Developer',
 'veg@example.com',
 '["9", "2"]'),

('12', 'Crispy chickpea fritters wrapped in flatbread with fresh vegetables and tahini sauce.',
 '["Chickpeas", "Onions", "Garlic", "Parsley", "Cilantro", "Cumin", "Coriander", "Pita Bread", "Lettuce", "Tomatoes", "Tahini", "Lemon", "Cucumber", "Yogurt"]',
 'Soak dried chickpeas overnight (do not use canned). Drain and blend with onions, garlic, herbs (parsley, cilantro), and spices (cumin, coriander, salt) until coarsely ground. Form into small balls and let rest for 30 minutes. Deep fry until golden and crispy. For the tahini sauce, mix tahini with lemon juice, garlic, and water until smooth. Warm pita bread, add lettuce, tomatoes, cucumber, falafel balls, and drizzle with tahini sauce and optional yogurt.',
 'Medium',
 '/placeholder.svg?height=400&width=600',
 '["Middle East", "Mediterranean"]',
 '["Street Food", "Vegetarian", "Middle Eastern"]',
 '2023-11-30',
 'Middle Eastern Street Food Expert',
 'streetfood@example.com',
 '["4", "6"]');

-- Add reviews for the new food items
INSERT INTO reviews (id, food_id, user_id, username, user_image, rating, text, rating_date) VALUES
-- Reviews for Sushi Rolls
('1001', '10', 'user11', 'Sophia Garcia', '/placeholder.svg?height=100&width=100', 5, 'Making sushi at home was intimidating at first but this recipe breaks it down perfectly. The rice seasoning is spot on and the rolling technique works great. My rolls looked almost professional!', '2024-03-05'),
('1002', '10', 'user12', 'Nathan Campbell', '/placeholder.svg?height=100&width=100', 5, 'Amazing homemade sushi recipe! The tips for handling the rice made all the difference. I made a variety with both raw and cooked fillings and they were all delicious.', '2024-02-12'),
('1003', '10', 'user13', 'Rachel Lee', '/placeholder.svg?height=100&width=100', 4, 'Great recipe for beginners! Takes practice to get the rolling right but the taste was excellent. I appreciate the detailed instructions on rice preparation - that\'s the foundation of good sushi.', '2024-01-18'),

-- Reviews for Vegetable Curry
('1101', '11', 'user14', 'Michael Brown', '/placeholder.svg?height=100&width=100', 5, 'This vegetable curry is now in our regular dinner rotation! So flavorful and actually quite easy to make. I love that you can adjust the spice level to your preference.', '2024-02-28'),
('1102', '11', 'user15', 'Hannah Wilson', '/placeholder.svg?height=100&width=100', 4, 'Delicious curry with wonderful depth of flavor. I added chickpeas for extra protein and it worked perfectly. The coconut milk adds such a nice richness to balance the spices.', '2024-01-25'), 
('1103', '11', 'user16', 'Daniel Martinez', '/placeholder.svg?height=100&width=100', 4, 'Really nice vegetarian option that doesn\'t feel like you\'re missing out on anything. The mix of vegetables creates great texture and the spice blend is perfect. Will definitely make again!', '2023-12-10'),

-- Reviews for Falafel Wrap
('1201', '12', 'user17', 'Jennifer Wong', '/placeholder.svg?height=100&width=100', 5, 'These falafels are incredible! So much better than store-bought. The texture is perfect - crispy outside and fluffy inside. The tahini sauce complements it perfectly.', '2024-03-10'),
('1202', '12', 'user18', 'Ryan Taylor', '/placeholder.svg?height=100&width=100', 4, 'Great authentic falafel recipe. Using dried chickpeas instead of canned makes a huge difference in texture. I added a bit of baking soda to make them even fluffier inside.', '2024-02-05'),
('1203', '12', 'user19', 'Aisha Johnson', '/placeholder.svg?height=100&width=100', 4, 'Loved this recipe! The spice balance in the falafel is perfect and the wrap assembly instructions made for a perfect lunch. The sauce is addictive - I\'ve been putting it on everything!', '2024-01-15');

-- Update the review_stats for the new food items
INSERT INTO review_stats (food_id, avg_rating, total_rating_sum, total_reviews, rating_distribution, last_review_date)
SELECT 
  food_id,
  AVG(rating) as avg_rating,
  SUM(rating) as total_rating_sum,
  COUNT(*) as total_reviews,
  json_object(
    '1', SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END),
    '2', SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END),
    '3', SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END),
    '4', SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END),
    '5', SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END)
  ) as rating_distribution,
  MAX(rating_date) as last_review_date
FROM reviews
WHERE food_id IN ('10', '11', '12')
GROUP BY food_id;

-- Create indexes for optimized performance
CREATE INDEX idx_reviews_rating_date ON reviews(rating_date);
CREATE INDEX idx_foods_name ON foods(name);
CREATE INDEX idx_food_details_regions ON food_details(regions);
CREATE INDEX idx_food_details_tags ON food_details(tags);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_categories_name ON categories(name);

-- Add some settings for users
UPDATE users SET settings = '{"theme":"dark","notifications":true,"language":"en"}' WHERE id = 'e6h0n4lc';
UPDATE users SET settings = '{"theme":"light","notifications":false,"language":"en"}' WHERE id = 'user1';
UPDATE users SET settings = '{"theme":"auto","notifications":true,"language":"es"}' WHERE id = 'user3';

-- Create a view for simplified food listing with category name
CREATE VIEW food_list_view AS
SELECT 
  f.id,
  f.name,
  f.slug,
  f.icon,
  f.rating,
  f.review_count,
  c.name as category_name,
  c.slug as category_slug,
  fd.time_cost,
  fd.regions,
  fd.tags
FROM foods f
JOIN categories c ON f.category_id = c.id
JOIN food_details fd ON f.id = fd.food_id;

-- Create a view for detailed review information
CREATE VIEW detailed_reviews_view AS
SELECT 
  r.id,
  r.food_id,
  f.name as food_name,
  f.slug as food_slug,
  r.user_id,
  r.username,
  r.rating,
  r.text,
  r.rating_date,
  r.created_at
FROM reviews r
JOIN foods f ON r.food_id = f.id
ORDER BY r.rating_date DESC;