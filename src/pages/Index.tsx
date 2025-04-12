
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Code, 
  Brain, 
  Trophy, 
  Compass,
  CheckCircle,
  MessageSquare,
  PencilRuler,
  Rocket,
  BarChart,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">New: Interactive Algorithm Visualizations</Badge>
            <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-5xl">
              Learn Data Structures & Algorithms, <span className="italic">intuitively</span>
            </h1>
            <p className="mb-6 text-base text-muted-foreground md:text-lg">
              A modern approach to mastering DSA — visual, interactive, and effective. Learn at your own pace with step-by-step guidance.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/roadmap">Explore the roadmap</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge className="mb-3" variant="outline">Our approach</Badge>
            <h2 className="mb-4 text-2xl font-medium md:text-3xl">
              Learn effectively with a modern approach
            </h2>
            <p className="text-muted-foreground">
              Our platform combines visual learning, interactive challenges, and practical applications to make DSA accessible to everyone.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<PencilRuler />}
              title="Visual Learning" 
              description="See algorithms in action with animated visualizations that bring abstract concepts to life."
            />
            <FeatureCard 
              icon={<Code />}
              title="Interactive Practice" 
              description="Write, test, and visualize code with our interactive editor and algorithm sandbox."
            />
            <FeatureCard 
              icon={<Trophy />}
              title="Progress Tracking" 
              description="Track your learning journey with achievements, statistics and personalized insights."
            />
            <FeatureCard 
              icon={<Brain />}
              title="AI-Powered Help" 
              description="Get unstuck with intelligent assistance that offers custom explanations and hints."
            />
            <FeatureCard 
              icon={<Compass />}
              title="Structured Path" 
              description="Follow a clear learning path from fundamentals to advanced topics with guided progression."
            />
            <FeatureCard 
              icon={<MessageSquare />}
              title="Community Support" 
              description="Learn together with discussions, peer code reviews, and collaborative challenges."
            />
          </div>
        </div>
      </section>
      
      {/* Learning Path Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge className="mb-3" variant="outline">Learning path</Badge>
            <h2 className="mb-4 text-2xl font-medium md:text-3xl">
              A clear path to DSA mastery
            </h2>
            <p className="text-muted-foreground">
              From core basics to advanced algorithms, our structured curriculum guides your learning journey step by step.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-3">
            <PathItem 
              number="01" 
              title="Fundamentals" 
              description="Arrays, strings, complexity analysis, and basic problem-solving patterns."
              isActive
            />
            <PathItem 
              number="02" 
              title="Data Structures" 
              description="Linked lists, stacks, queues, trees, graphs, and hash tables."
            />
            <PathItem 
              number="03" 
              title="Algorithms" 
              description="Searching, sorting, recursion, and essential algorithm techniques."
            />
            <PathItem 
              number="04" 
              title="Advanced Topics" 
              description="Dynamic programming, graph algorithms, and complex problem-solving."
            />
            <PathItem 
              number="05" 
              title="Real-world Applications" 
              description="System design, optimization, and practical implementation challenges."
            />
            
            <div className="pt-8 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/roadmap">
                  <span>View detailed roadmap</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-lg border border-border/60 bg-background p-8 text-center">
            <h2 className="mb-3 text-xl font-medium md:text-2xl">
              Ready to master algorithms?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Join thousands who've transformed their DSA skills through our interactive platform.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link to="/signup">Get started free</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/demo">See demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-secondary/50">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

// Path Item Component
function PathItem({ 
  number, 
  title, 
  description, 
  isActive = false
}: { 
  number: string, 
  title: string, 
  description: string,
  isActive?: boolean
}) {
  return (
    <div className={cn(
      "flex gap-4 rounded-lg border p-4 transition-colors",
      isActive ? "border-primary/20 bg-primary/5" : "border-border/60"
    )}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border/60 bg-secondary/50 text-sm font-medium">
        {number}
      </div>
      <div>
        <h3 className={cn(
          "text-base font-medium",
          isActive && "text-primary"
        )}>{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
