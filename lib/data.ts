export interface Food {
  id: string
  name: string
  description: string
  recipe?: string // Recipe instructions
  image: string
  tags: string[]
  regions: string[]
  category: string
  rating: number // Rating out of 5
  reviews: number // Number of reviews
  releaseDate: string // ISO date string for sorting
  timeCost: "Low" | "Medium" | "High" // Time required to prepare
  ingredients?: string[] // List of ingredients
}

// Mock food data - replace with your own data or API calls
export const foods: Food[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    recipe:
      "Cook spaghetti according to package instructions. In a separate bowl, whisk eggs, grated Pecorino Romano, and black pepper. In a pan, cook diced pancetta until crispy. Drain pasta and immediately add to the pan with pancetta. Remove from heat and quickly stir in the egg mixture, creating a creamy sauce. Serve immediately with extra cheese and pepper.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Pasta", "Italian"],
    regions: ["Italy"],
    category: "Main Course",
    rating: 4.7,
    reviews: 128,
    releaseDate: "2023-11-15",
    timeCost: "Low",
    ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Pancetta", "Black Pepper"]
  },
  {
    id: "2",
    name: "Pad Thai",
    description: "Popular Thai stir-fried rice noodle dish with a perfect balance of sweet, sour and savory flavors",
    recipe:
      "Soak rice noodles in warm water until soft. In a wok, heat oil and add minced garlic. Add protein of choice (shrimp, chicken, or tofu) and cook until done. Push to the side and scramble eggs in the same wok. Add drained noodles, bean sprouts, and pour in sauce (fish sauce, tamarind paste, palm sugar). Toss everything together and cook until noodles are tender. Serve with crushed peanuts, lime wedges, and fresh cilantro.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Noodles", "Stir-fry"],
    regions: ["Thailand"],
    category: "Main Course",
    rating: 4.2,
    reviews: 86,
    releaseDate: "2023-08-22",
    timeCost: "Medium",
    ingredients: ["Rice Noodles", "Eggs", "Bean Sprouts", "Tofu/Chicken/Shrimp", "Fish Sauce", "Tamarind Paste", "Palm Sugar", "Peanuts", "Lime", "Cilantro"]
  },
  {
    id: "3",
    name: "Moroccan Tagine",
    description: "Slow-cooked savory stew with tender meat, aromatic spices, and dried fruits.",
    recipe:
      "In a tagine pot or heavy-bottomed Dutch oven, brown meat (lamb or chicken) in olive oil. Add diced onions and garlic, cooking until soft. Add spices (cumin, coriander, cinnamon, paprika, turmeric) and stir to coat meat. Add vegetables, dried fruits (apricots, prunes), and broth. Cover and simmer on low heat for 1-2 hours until meat is tender. Garnish with fresh herbs and toasted almonds. Serve with couscous.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Stew", "Slow-cooked", "Middle Eastern"],
    regions: ["Morocco", "North Africa"],
    category: "Main Course",
    rating: 4.9,
    reviews: 215,
    releaseDate: "2024-01-05",
    timeCost: "High",
    ingredients: ["Lamb/Chicken", "Onions", "Garlic", "Cumin", "Coriander", "Cinnamon", "Paprika", "Turmeric", "Dried Apricots", "Prunes", "Almonds", "Couscous"]
  },
  {
    id: "4",
    name: "Guacamole",
    description: "Fresh and creamy avocado dip with lime, cilantro, and just the right amount of spice.",
    recipe:
      "Mash ripe avocados in a bowl. Add finely chopped red onion, diced tomatoes, minced garlic, chopped cilantro, and jalapeño (seeds removed for less heat). Squeeze fresh lime juice and add salt to taste. Mix well but leave some chunks for texture. Cover the surface with plastic wrap to prevent browning and refrigerate for 30 minutes before serving with tortilla chips.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Dip", "Appetizer"],
    regions: ["Mexico", "Central America"],
    category: "Appetizer",
    rating: 4.5,
    reviews: 173,
    releaseDate: "2023-06-10",
    timeCost: "Low",
    ingredients: ["Avocados", "Red Onion", "Tomatoes", "Garlic", "Cilantro", "Jalapeño", "Lime", "Salt"]
  },
  {
    id: "5",
    name: "Beef Pho",
    description: "Aromatic Vietnamese beef noodle soup with rich broth, tender meat, and fresh herbs.",
    recipe:
      "Simmer beef bones, onion, ginger, star anise, cinnamon, cloves, and cardamom in water for 3-4 hours to create a flavorful broth. Strain and season with fish sauce and salt. Cook rice noodles according to package instructions. Arrange noodles in bowls, top with thinly sliced raw beef and pour hot broth over to cook the meat. Serve with bean sprouts, Thai basil, lime wedges, hoisin sauce, and sriracha on the side.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Soup", "Noodles"],
    regions: ["Vietnam", "Southeast Asia"],
    category: "Soup",
    rating: 4.8,
    reviews: 342,
    releaseDate: "2024-02-28",
    timeCost: "High",
    ingredients: ["Beef Bones", "Rice Noodles", "Beef Sirloin", "Onion", "Ginger", "Star Anise", "Cinnamon", "Fish Sauce", "Bean Sprouts", "Thai Basil", "Lime", "Hoisin Sauce", "Sriracha"]
  },
  {
    id: "6",
    name: "Shakshuka",
    description: "Flavorful Middle Eastern dish of eggs poached in a spiced tomato and pepper sauce.",
    recipe:
      "In a large skillet, heat olive oil and sauté diced onions and bell peppers until soft. Add minced garlic, cumin, paprika, and cayenne pepper, cooking until fragrant. Pour in canned tomatoes and simmer until slightly thickened. Create wells in the sauce and crack eggs into them. Cover and cook until egg whites are set but yolks are still runny. Garnish with crumbled feta cheese and chopped parsley. Serve with crusty bread for dipping.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Breakfast", "Eggs"],
    regions: ["Palestine", "North Africa", "Middle East"],
    category: "Breakfast",
    rating: 4.3,
    reviews: 97,
    releaseDate: "2023-09-14",
    timeCost: "Medium",
    ingredients: ["Eggs", "Tomatoes", "Bell Peppers", "Onions", "Garlic", "Cumin", "Paprika", "Cayenne Pepper", "Feta Cheese", "Parsley", "Bread"]
  },
  {
    id: "7",
    name: "Bibimbap",
    description: "Korean rice bowl topped with sautéed vegetables, protein, egg, and spicy gochujang sauce.",
    recipe:
      "Cook short-grain rice and set aside. Separately sauté spinach, carrots, zucchini, bean sprouts, and mushrooms with a bit of sesame oil and salt. Cook protein of choice (beef, tofu) with soy sauce and garlic. Fry an egg sunny-side up. Arrange rice in a bowl, place vegetables and protein in sections around the rice, and top with the fried egg. Serve with gochujang sauce on the side to mix in according to taste.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Rice Bowl", "Korean"],
    regions: ["Korea"],
    category: "Main Course",
    rating: 4.6,
    reviews: 205,
    releaseDate: "2023-10-18",
    timeCost: "Medium",
    ingredients: ["Short-grain Rice", "Spinach", "Carrots", "Zucchini", "Bean Sprouts", "Mushrooms", "Beef/Tofu", "Eggs", "Gochujang Sauce", "Sesame Oil", "Soy Sauce", "Garlic"]
  },
  {
    id: "8",
    name: "Potato Gnocchi",
    description: "Pillowy soft Italian potato dumplings perfect with various sauces.",
    recipe:
      "Boil potatoes with skin on until tender. Peel while hot and pass through a ricer. Let cool slightly, then add flour, egg, and salt to form a dough. Be careful not to overwork. Roll into ropes and cut into bite-sized pieces. Press each piece against a fork to create ridges. Boil in salted water until they float to the surface. Serve with your favorite sauce - classic options include brown butter and sage, tomato sauce, or pesto.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Pasta", "Dumplings"],
    regions: ["Italy"],
    category: "Main Course",
    rating: 4.7,
    reviews: 312,
    releaseDate: "2023-07-22",
    timeCost: "High",
    ingredients: ["Potatoes", "Flour", "Eggs", "Salt", "Butter", "Sage", "Parmesan Cheese"]
  },
  {
    id: "9",
    name: "Butter Chicken",
    description: "Creamy, tomato-based Indian curry with tender chicken pieces and aromatic spices.",
    recipe:
      "Marinate chicken in yogurt, lemon juice, turmeric, garam masala, and cumin for at least 1 hour. In a large pot, heat butter and sauté onions until golden. Add ginger-garlic paste and tomato puree, cooking until oil separates. Add spices (cumin, coriander, garam masala) and cook until fragrant. Add marinated chicken and simmer until cooked through. Stir in cream and a little sugar to balance flavors. Garnish with fresh cilantro and serve with naan bread or rice.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Curry", "Indian"],
    regions: ["India", "South Asia"],
    category: "Main Course",
    rating: 4.4,
    reviews: 178,
    releaseDate: "2023-09-05",
    timeCost: "Medium",
    ingredients: ["Chicken", "Yogurt", "Butter", "Cream", "Tomato Puree", "Onions", "Ginger", "Garlic", "Garam Masala", "Turmeric", "Cumin", "Coriander", "Cilantro", "Rice/Naan"]
  },
]

// Available categories for filtering
export const categories = [
  "All",
  "Main Course",
  "Appetizer",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Soup",
  "Salad",
  "Beverage",
  "Side Dish",
  "Bread",
]

// Available regions for filtering
export const regions = ["Italy", "Thailand", "Morocco", "Mexico", "Vietnam", "Palestine", "Korea", "India", "North Africa", "Middle East", "Southeast Asia", "Central America", "South Asia"]

// Available time cost options
export const timeCostOptions = ["Low", "Medium", "High"]