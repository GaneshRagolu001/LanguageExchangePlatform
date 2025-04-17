import { useState } from "react";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Practicing a New Language Every Day",
      excerpt:
        "Consistent practice is key to language learning. Here are some simple ways to incorporate your target language into your daily routine.",
      category: "learning-tips",
      author: "Sarah Chen",
      date: "April 12, 2025",
      readTime: "5 min read",
      image:
        "https://englishgrammarzone.com/wp-content/uploads/2024/06/10-Tips-to-Speak-English-Fluently-1.jpg",
      postlink:
        "https://www.languagetrainers.com/blog/10-ways-practice-target-language-daily/",
    },
    {
      id: 2,
      title: "The Science Behind Language Immersion",
      excerpt:
        "Research shows that immersion is one of the most effective ways to learn a language. Learn why your brain responds so well to this approach.",
      category: "research",
      author: "Dr. Miguel Rodriguez",
      date: "April 5, 2025",
      readTime: "8 min read",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXKlB7OkbyKfMZE6BZWDWBpvEcDfpGWsTpg&s",
      postlink:
        "https://jumpimmersion.com/language-immersion-and-cognitive-development/",
    },
    {
      id: 3,
      title: "How to Overcome Language Learning Plateaus",
      excerpt:
        "Feeling stuck in your language journey? Discover strategies to break through learning plateaus and continue making progress.",
      category: "learning-tips",
      author: "Amina Diallo",
      date: "March 28, 2025",
      readTime: "6 min read",
      image: "https://i.ytimg.com/vi/6F2o7rdic5c/maxresdefault.jpg",
      postlink:
        "https://mylanguageclassesblog.wordpress.com/2025/03/14/language-learning-plateaus-why-they-happen-how-to-overcome-them/",
    },
    {
      id: 4,
      title: "Cultural Awareness: The Hidden Aspect of Language Learning",
      excerpt:
        "Language and culture are inseparable. Learn how understanding cultural context improves your language comprehension.",
      category: "culture",
      author: "Hiroshi Tanaka",
      date: "March 21, 2025",
      readTime: "7 min read",
      image:
        "https://oswaalbooks.com/cdn/shop/articles/Mastering-Bilingualism--Explore-the-Hidden-Advantages-of-Learning-a-Second-Language-Oswaal-Books-and-Learning-Pvt-Ltd-1683092681_1000x600.jpg?v=1685773737",
      postlink:
        "https://www.rhythmlanguages.com/post/language-learning-and-cultural-awareness",
    },
    {
      id: 5,
      title: "LinguaLink Community Spotlight: Maria's Journey to Fluency",
      excerpt:
        "How one user went from beginner to conversationally fluent in Mandarin in just 8 months using language exchange.",
      category: "success-stories",
      author: "Community Team",
      date: "March 14, 2025",
      readTime: "4 min read",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_e3bzF2iu08bO0p2xl7u5pCXsvKl3xGapQ&s",
      postlink:
        "https://englishwithjanet.com/a-journey-from-zero-to-fluent-the-story-of-marias-english-transformation/",
    },
    {
      id: 6,
      title: "The Best Resources to Complement Your Language Exchange",
      excerpt:
        "Enhance your language exchange sessions with these apps, books, and other resources recommended by our community.",
      category: "resources",
      author: "Sarah Chen",
      date: "March 7, 2025",
      readTime: "9 min read",
      image:
        "https://lingopie.com/blog/content/images/size/w1200/2024/07/Apprendre-Des-Gros-Mots-Faciles-En-Allemand-31.png",
      postlink:
        "https://duoplanet.com/the-best-resources-to-use-alongside-duolingo/",
    },
  ];

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "learning-tips", name: "Learning Tips" },
    { id: "research", name: "Research" },
    { id: "culture", name: "Culture" },
    { id: "success-stories", name: "Success Stories" },
    { id: "resources", name: "Resources" },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm rounded-full border ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              className="h-48 w-full object-cover"
              src={post.image}
              alt={post.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x300.png?text=Image+Unavailable";
              }}
            />
            <div className="p-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">
                {categories.find((cat) => cat.id === post.category)?.name}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mt-3 text-gray-600 text-sm">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <div className="flex space-x-1">
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <a
                  href={post.postlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
