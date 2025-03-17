import { Food } from "./data";

export interface Review {
  id: string;
  foodId: string;
  userName: string;
  userImage: string;
  date: string;
  rating: number;
  text: string;
}

// Mock review data for each food
export const reviews: Review[] = [
  // Reviews for Spaghetti Carbonara (id: "1")
  {
    id: "101",
    foodId: "1",
    userName: "Sarah Johnson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-15",
    rating: 5,
    text: "This carbonara recipe is absolutely perfect! The balance of creamy eggs and salty pancetta creates such a decadent dish. I've tried many versions but this one is my go-to now."
  },
  {
    id: "102",
    foodId: "1",
    userName: "Alex Chen",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-20",
    rating: 4,
    text: "Really good authentic carbonara. The technique for creating the sauce without curdling the eggs took some practice, but it's worth it. I'd recommend adding a bit more black pepper."
  },
  {
    id: "103",
    foodId: "1",
    userName: "Miguel Reyes",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-08",
    rating: 5,
    text: "As someone who lived in Rome for years, this is the closest to authentic carbonara I've found. No cream needed - just quality ingredients and proper technique. Bellissimo!"
  },

  // Reviews for Pad Thai (id: "2")
  {
    id: "201",
    foodId: "2",
    userName: "Jordan Smith",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-10",
    rating: 4,
    text: "This Pad Thai recipe has become a staple in our weekly rotation. The balance of sweet, sour, and savory is spot on. Finding tamarind paste was worth the effort!"
  },
  {
    id: "202",
    foodId: "2",
    userName: "Priya Patel",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-11-05",
    rating: 3,
    text: "Good flavor but the noodles came out a bit too soft. I think next time I'll soak them for less time. The sauce proportions were perfect though."
  },
  {
    id: "203",
    foodId: "2",
    userName: "Thomas Wright",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-18",
    rating: 5,
    text: "Making restaurant-quality Pad Thai at home seemed impossible until I tried this recipe. The tip about not overcrowding the wok made all the difference. My family keeps requesting it!"
  },

// Reviews for Moroccan Tagine (id: "3")
{
  id: "301",
  foodId: "3",
  userName: "Emma Rodriguez",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-02-28",
  rating: 5,
  text: "This tagine is incredible! The combination of spices with the sweetness from the dried fruits creates such a complex flavor. Worth every minute of cooking time. The meat was fall-apart tender."
},
{
  id: "302",
  foodId: "3",
  userName: "David Kim",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-02-10",
  rating: 5,
  text: "I've been trying to recreate the tagine I had in Marrakech for years, and this recipe finally nailed it! The slow cooking is key to developing those rich flavors. My dinner guests were impressed."
},
{
  id: "303",
  foodId: "3",
  userName: "Olivia Thompson",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-01-25",
  rating: 4,
  text: "Almost perfect. The flavor profile is amazing, but I found it needed a bit more liquid during cooking. I added some extra broth halfway through and it turned out wonderfully."
},

// Reviews for Guacamole (id: "4")
{
  id: "401",
  foodId: "4",
  userName: "Lucas Bennett",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-12-22",
  rating: 5,
  text: "This guacamole recipe has the perfect balance of flavors! The tip about leaving some chunks gives it great texture. It disappeared in minutes at our last gathering."
},
{
  id: "402",
  foodId: "4",
  userName: "Sophia Garcia",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-10-15",
  rating: 4,
  text: "Great classic guacamole. I added a bit more lime and some cumin for extra flavor. The plastic wrap tip really does prevent browning!"
},
{
  id: "403",
  foodId: "4",
  userName: "Nathan Campbell",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-08-30",
  rating: 4,
  text: "Simple but delicious! I love that this recipe focuses on fresh ingredients without unnecessary additions. Perfect for taco night or just with chips."
},

// Reviews for Beef Pho (id: "5")
{
  id: "501",
  foodId: "5",
  userName: "Rachel Lee",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-03-10",
  rating: 5,
  text: "This pho recipe is transformative! The broth is so rich and aromatic - worth every minute of simmering. I've made it three times now and it's better than my local Vietnamese restaurant."
},
{
  id: "502",
  foodId: "5",
  userName: "Michael Brown",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-03-01",
  rating: 5,
  text: "I never thought I could make restaurant-quality pho at home until trying this recipe. The depth of flavor in the broth is incredible. Don't skip toasting the spices!"
},
{
  id: "503",
  foodId: "5",
  userName: "Hannah Wilson",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-02-14",
  rating: 4,
  text: "This pho is absolutely delicious. The only reason for 4 stars is the time commitment. It's definitely a weekend project, but the results are worth it. I freeze extra broth for quick meals later."
},

// Reviews for Shakshuka (id: "6")
{
  id: "601",
  foodId: "6",
  userName: "Daniel Martinez",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-01-18",
  rating: 4,
  text: "Such a flavorful breakfast! The spice level was perfect, and I love how versatile it is. I added some crumbled goat cheese on top which worked beautifully with the tomato sauce."
},
{
  id: "602",
  foodId: "6",
  userName: "Jennifer Wong",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-12-05",
  rating: 5,
  text: "Shakshuka has become our favorite weekend brunch. This recipe balances the spices perfectly, and the sauce develops such rich flavor. Don't forget good bread for dipping!"
},
{
  id: "603",
  foodId: "6",
  userName: "Ryan Taylor",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-10-22",
  rating: 4,
  text: "Great one-pan meal that works for any time of day. I like to add harissa paste for extra heat. The only challenge is getting the eggs cooked to the perfect consistency."
},

// Reviews for Bibimbap (id: "7")
{
  id: "701",
  foodId: "7",
  userName: "Aisha Johnson",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-02-08",
  rating: 5,
  text: "This bibimbap recipe is fantastic! The combination of different vegetables creates such a beautiful and nutritious meal. The crispy rice at the bottom of the bowl is my favorite part."
},
{
  id: "702",
  foodId: "7",
  userName: "Marco Rossi",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-12-15",
  rating: 5,
  text: "Can't believe how authentic this tastes! The gochujang sauce brings everything together perfectly. I love that each component is prepared separately - it's labor-intensive but worth it."
},
{
  id: "703",
  foodId: "7",
  userName: "Emily Parker",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-11-03",
  rating: 4,
  text: "Love this recipe! The flavors and textures are amazing. I simplified by making fewer vegetables and it was still delicious. Make sure to mix everything well before eating!"
},

// Reviews for Potato Gnocchi (id: "8")
{
  id: "801",
  foodId: "8",
  userName: "Chris Anderson",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-01-30",
  rating: 5,
  text: "These gnocchi are cloud-like pillows of potato perfection! The recipe is spot on about not overworking the dough - that's the key to keeping them light."
},
{
  id: "802",
  foodId: "8",
  userName: "Lily Zhang",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-11-20",
  rating: 5,
  text: "I've tried several gnocchi recipes and this one is by far the best. Using a potato ricer really does make a difference. The brown butter and sage sauce is heavenly!"
},
{
  id: "803",
  foodId: "8",
  userName: "Omar Hassan",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-09-05",
  rating: 4,
  text: "Very good gnocchi recipe. It takes practice to get the right consistency, but these turned out light and flavorful. I froze half the batch for later and they cooked perfectly from frozen."
},

// Reviews for Butter Chicken (id: "9")
{
  id: "901",
  foodId: "9",
  userName: "Grace Wilson",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2024-02-20",
  rating: 4,
  text: "This butter chicken is incredibly rich and flavorful. The marinade makes the chicken so tender. I reduced the cream slightly and it was still delicious."
},
{
  id: "902",
  foodId: "9",
  userName: "Jamal Clark",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-12-12",
  rating: 5,
  text: "Restaurant-quality butter chicken at home! The balance of spices is perfect - flavorful but not overwhelming. My whole family loved it, even the kids who usually avoid spicy food."
},
{
  id: "903",
  foodId: "9",
  userName: "Nina Patel",
  userImage: "/placeholder.svg?height=100&width=100",
  date: "2023-10-30",
  rating: 4,
  text: "Great authentic flavor! The recipe is straightforward but does require plenty of spices. Don't skip the marinating time - it makes a big difference in the tenderness of the chicken."
}
];

// Function to get reviews for a specific food
export const getReviewsByFoodId = (foodId: string): Review[] => {
return reviews.filter(review => review.foodId === foodId);
};