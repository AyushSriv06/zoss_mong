
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "ayurvedic", name: "Ayurvedic Insights" },
    { id: "science", name: "Hydration Science" },
    { id: "sustainability", name: "Sustainability" },
    { id: "case-studies", name: "Case Studies" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Ayurvedic Hydration: The Science Behind Alkaline Water",
      excerpt: "Discover how alkaline water aligns with ancient Ayurvedic principles for optimal health and wellness.",
      category: "ayurvedic",
      readTime: "5 min read",
      image: "ayurvedic-placeholder"
    },
    {
      id: 2,
      title: "How to Calculate Your Office's Carbon Savings with Zoss Water",
      excerpt: "Learn the environmental impact of switching to ionized water in your workplace and reduce your carbon footprint.",
      category: "sustainability", 
      readTime: "3 min read",
      image: "carbon-placeholder"
    },
    {
      id: 3,
      title: "Dosha-Specific Hydration Tips for Mumbai Summers",
      excerpt: "Beat the heat with personalized hydration strategies based on your Ayurvedic constitution.",
      category: "ayurvedic",
      readTime: "4 min read", 
      image: "summer-placeholder"
    },
    {
      id: 4,
      title: "The Science of Electrolysis: How Ionized Water Works",
      excerpt: "Understanding the technology behind water ionization and its health benefits.",
      category: "science",
      readTime: "6 min read",
      image: "science-placeholder"
    },
    {
      id: 5,
      title: "Case Study: TechCorp's 80% Plastic Reduction Journey",
      excerpt: "How a 200-employee tech company eliminated plastic bottles and saved costs with Zoss Water.",
      category: "case-studies",
      readTime: "4 min read",
      image: "case-study-placeholder"
    },
    {
      id: 6,
      title: "pH Levels Explained: Finding the Right Balance for Your Health",
      excerpt: "A comprehensive guide to understanding alkaline water pH levels and their impact on wellness.",
      category: "science",
      readTime: "5 min read",
      image: "ph-placeholder"
    }
  ];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Knowledge Hub
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore insights on wellness, sustainability, and the science of alkaline water
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? "bg-zoss-green hover:bg-zoss-green/90" 
                      : "border-zoss-green text-zoss-green hover:bg-zoss-green hover:text-white"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">{post.image}</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-zoss-green border-zoss-green">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </Badge>
                      <span className="text-sm text-zoss-gray">{post.readTime}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-zoss-blue mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zoss-gray mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.id}`} className="text-zoss-green hover:text-zoss-green/80 text-sm font-medium">
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold text-zoss-blue mb-4">
                Subscribe to Newsletter
              </h3>
              <p className="text-sm text-zoss-gray mb-4">
                Get the latest insights on wellness and water technology delivered to your inbox.
              </p>
              <div className="space-y-3">
                <Input type="email" placeholder="Enter your email" />
                <Button className="w-full bg-zoss-green hover:bg-zoss-green/90">
                  Subscribe
                </Button>
              </div>
            </Card>

            {/* Popular Posts */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold text-zoss-blue mb-4">
                Popular Posts
              </h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
                    <Link to={`/blog/${post.id}`} className="block">
                      <h4 className="text-sm font-medium text-zoss-blue hover:text-zoss-green transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-zoss-gray mt-1">{post.readTime}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
