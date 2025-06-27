
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    { name: "Arjun Mehta", title: "Founder & CEO", image: "founder-placeholder" },
    { name: "Dr. Priya Singh", title: "Chief Technology Officer", image: "cto-placeholder" },
    { name: "Rahul Kumar", title: "Head of Sales", image: "sales-placeholder" },
    { name: "Ananya Sharma", title: "Head of Operations", image: "operations-placeholder" }
  ];

  const timeline = [
    { year: "2022", event: "Company founded with vision to revolutionize water wellness" },
    { year: "2023", event: "Launched first Zoss ionizer with Ayurvedic principles" },
    { year: "2024", event: "Entered B2B partnerships with 100+ corporate clients" },
    { year: "2025", event: "ISO certification achieved & new website launch" }
  ];

  return (
    <div className="min-h-screen bg-zoss-cream">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-zoss-blue to-zoss-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-full h-40 bg-white/10 rounded-lg flex items-center justify-center mb-8">
              <span className="text-white/70 text-lg">Hero Banner Placeholder</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Our Mission & Vision
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transforming lives through the perfect blend of ancient Ayurvedic wisdom and modern water technology
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Our Story */}
            <div>
              <h2 className="font-heading text-3xl font-semibold text-zoss-blue mb-6">Our Story</h2>
              <div className="space-y-4 text-zoss-gray leading-relaxed">
                <p>
                  Zoss Water was born from a simple yet powerful vision: to bridge the gap between ancient Ayurvedic wisdom and modern water purification technology. Founded in 2022 by a team of health enthusiasts and technology experts, we recognized the profound impact that properly structured water could have on human wellness.
                </p>
                <p>
                  Our journey began when our founder, struggling with digestive issues, discovered the healing properties of alkaline ionized water through Ayurvedic principles. This personal transformation sparked a mission to make this life-changing technology accessible to every home and office across India.
                </p>
                <p>
                  Today, Zoss Water stands as a testament to innovation rooted in tradition, serving over 500 offices and thousands of families with our commitment to purity, sustainability, and holistic wellness.
                </p>
              </div>
            </div>

            {/* Meet the Team */}
            <div>
              <h2 className="font-heading text-3xl font-semibold text-zoss-blue mb-6">Meet the Team</h2>
              <div className="grid grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-zoss-gray" />
                      </div>
                      <h3 className="font-semibold text-zoss-blue">{member.name}</h3>
                      <p className="text-sm text-zoss-gray">{member.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <Target className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-4">Quality & Purity</h3>
                <p className="text-zoss-gray">
                  We maintain the highest standards in water purification technology, ensuring every drop meets our stringent quality parameters for optimal health benefits.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8">
              <CardContent>
                <Users className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-4">Sustainability</h3>
                <p className="text-zoss-gray">
                  Environmental responsibility drives our innovation. We're committed to reducing plastic waste and carbon footprint while promoting eco-friendly hydration solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8">
              <CardContent>
                <Lightbulb className="h-12 w-12 text-zoss-green mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-zoss-blue mb-4">Innovation</h3>
                <p className="text-zoss-gray">
                  We continuously evolve our technology, integrating cutting-edge science with time-tested Ayurvedic principles to create revolutionary water solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-zoss-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-zoss-blue text-center mb-12">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-zoss-green"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="p-6">
                      <CardContent>
                        <div className="text-2xl font-bold text-zoss-green mb-2">{item.year}</div>
                        <p className="text-zoss-gray">{item.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-zoss-green rounded-full border-4 border-white z-10"></div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
