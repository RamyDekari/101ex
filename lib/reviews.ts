import { Extension } from "./data";

export interface Review {
  id: string;
  extensionId: string;
  userName: string;
  userImage: string;
  date: string;
  rating: number;
  text: string;
}

// Mock review data for each extension
export const reviews: Review[] = [
  // Reviews for SumBuddy (id: "1")
  {
    id: "101",
    extensionId: "1",
    userName: "Sarah Johnson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-15",
    rating: 5,
    text: "SumBuddy has completely changed how I consume online content. I can quickly get the gist of long articles without spending ages reading them. Perfect for research and staying informed!"
  },
  {
    id: "102",
    extensionId: "1",
    userName: "Alex Chen",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-20",
    rating: 4,
    text: "Really useful tool for skimming articles. The summaries are usually on point, though sometimes it misses nuance in more complex topics. Still, saves me tons of time daily."
  },
  {
    id: "103",
    extensionId: "1",
    userName: "Miguel Reyes",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-08",
    rating: 5,
    text: "As a student, this extension is invaluable. I can quickly scan through research papers and get the key points before deciding if I need to read the whole thing. Highly recommend!"
  },

  // Reviews for Twillot (id: "2")
  {
    id: "201",
    extensionId: "2",
    userName: "Jordan Smith",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-10",
    rating: 4,
    text: "Twillot makes it so easy to export my Twitter data. I use it to track my engagement metrics and it's been super reliable. The premium price is worth it for the convenience."
  },
  {
    id: "202",
    extensionId: "2",
    userName: "Priya Patel",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-11-05",
    rating: 3,
    text: "Good functionality but occasionally crashes when exporting large datasets. Customer support was helpful though and they're working on fixing it."
  },
  {
    id: "203",
    extensionId: "2",
    userName: "Thomas Wright",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-18",
    rating: 5,
    text: "As a social media manager handling multiple accounts, this tool is a lifesaver. The CSV export integrates perfectly with my analytics software. Worth every penny!"
  },

  // Reviews for DesignPicker Pro (id: "3")
  {
    id: "301",
    extensionId: "3",
    userName: "Emma Rodriguez",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-28",
    rating: 5,
    text: "DesignPicker Pro is the best tool I've found for identifying colors and fonts on websites. As a freelance designer, it helps me recreate elements that inspire me. The suggestions for complementary colors are spot on!"
  },
  {
    id: "302",
    extensionId: "3",
    userName: "David Kim",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-10",
    rating: 5,
    text: "This extension saves me so much time! No more guessing which font a site is using or trying to match colors by eye. The Edge version works perfectly too."
  },
  {
    id: "303",
    extensionId: "3",
    userName: "Olivia Thompson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-25",
    rating: 4,
    text: "Almost perfect. The color and font detection is amazing, but I wish it could detect more details about animations and transitions. Still a daily essential in my workflow."
  },

  // Reviews for Obsidian Web Clipper (id: "4")
  {
    id: "401",
    extensionId: "4",
    userName: "Lucas Bennett",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-22",
    rating: 5,
    text: "This web clipper integrates seamlessly with Obsidian. I use it daily for my research and knowledge management. The highlighting feature is particularly useful."
  },
  {
    id: "402",
    extensionId: "4",
    userName: "Sophia Garcia",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-15",
    rating: 4,
    text: "Great tool for building my personal knowledge base. Sometimes struggles with complex layouts, but works perfectly for most websites I visit."
  },
  {
    id: "403",
    extensionId: "4",
    userName: "Nathan Campbell",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-08-30",
    rating: 4,
    text: "As an academic, this tool helps me organize research materials effortlessly. Wish it had better table support, but otherwise it's fantastic and completely free!"
  },

  // Reviews for Monica (id: "5")
  {
    id: "501",
    extensionId: "5",
    userName: "Rachel Lee",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-03-10",
    rating: 5,
    text: "Monica has transformed my workflow. Having both GPT-4 and Claude 3.5 available in one tool is incredible. I use it for everything from drafting emails to summarizing meeting notes."
  },
  {
    id: "502",
    extensionId: "5",
    userName: "Michael Brown",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-03-01",
    rating: 5,
    text: "Worth every penny of the premium subscription. The contextual assistance is like having a personal assistant that understands exactly what I need at any moment."
  },
  {
    id: "503",
    extensionId: "5",
    userName: "Hannah Wilson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-14",
    rating: 4,
    text: "Monica is incredibly helpful and the AI responses are impressive. Only giving 4 stars because the interface could be more intuitive, but the functionality is excellent."
  },

  // Reviews for Redplus (id: "6")
  {
    id: "601",
    extensionId: "6",
    userName: "Daniel Martinez",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-18",
    rating: 4,
    text: "As a product manager, Redplus gives me invaluable insights about how users discuss our products on Reddit. The sentiment analysis is surprisingly accurate."
  },
  {
    id: "602",
    extensionId: "6",
    userName: "Jennifer Wong",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-05",
    rating: 5,
    text: "Redplus has completely transformed our marketing strategy. We're now able to target Reddit communities effectively with messaging that resonates based on actual discussions."
  },
  {
    id: "603",
    extensionId: "6",
    userName: "Ryan Taylor",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-22",
    rating: 4,
    text: "Good tool for market research. The free trial was enough to convince me of its value, though I wish the search filters were more granular."
  },

  // Reviews for VSCode Enhancer (id: "7")
  {
    id: "701",
    extensionId: "7",
    userName: "Aisha Johnson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-08",
    rating: 5,
    text: "Incredible extension that's significantly improved my coding speed. The AI suggestions are eerily accurate, and the custom snippets save me hours each week."
  },
  {
    id: "702",
    extensionId: "7",
    userName: "Marco Rossi",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-15",
    rating: 5,
    text: "Can't believe this is free! Works with all the languages I use regularly (Python, JavaScript, Go) and the documentation integration is top-notch."
  },
  {
    id: "703",
    extensionId: "7",
    userName: "Emily Parker",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-11-03",
    rating: 4,
    text: "Love the features, especially the enhanced syntax highlighting. Occasionally has performance issues with very large files, but overall it's an essential VSCode extension."
  },

  // Reviews for Firefox Privacy Shield (id: "8")
  {
    id: "801",
    extensionId: "8",
    userName: "Chris Anderson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-01-30",
    rating: 5,
    text: "Finally found a privacy extension that doesn't slow down my browsing. Blocks trackers effectively and the HTTPS enforcement gives me peace of mind."
  },
  {
    id: "802",
    extensionId: "8",
    userName: "Lily Zhang",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-11-20",
    rating: 5,
    text: "As someone concerned about online privacy, this extension checks all the boxes. The cookie management is intuitive and I love that it's completely free."
  },
  {
    id: "803",
    extensionId: "8",
    userName: "Omar Hassan",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-05",
    rating: 4,
    text: "Very solid privacy protection. I switched from another popular blocker and this one catches even more trackers. Occasionally breaks some site functionality, but worth it."
  },

  // Reviews for Figma Color Manager (id: "9")
  {
    id: "901",
    extensionId: "9",
    userName: "Grace Wilson",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2024-02-20",
    rating: 4,
    text: "Figma Color Manager streamlines my design process significantly. The palette generation and accessibility checking save me tons of time on each project."
  },
  {
    id: "902",
    extensionId: "9",
    userName: "Jamal Clark",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-12-12",
    rating: 5,
    text: "Worth the premium price for any serious Figma user. The ability to quickly apply color schemes across designs is game-changing for my agency work."
  },
  {
    id: "903",
    extensionId: "9",
    userName: "Nina Patel",
    userImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-30",
    rating: 4,
    text: "Great extension that integrates perfectly with Figma. The color scheme generation based on a single color is particularly useful for brand identity work."
  }
];

// Function to get reviews for a specific extension
export const getReviewsByExtensionId = (extensionId: string): Review[] => {
  return reviews.filter(review => review.extensionId === extensionId);
};