
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LogiqoLogo } from "@/components/LogiqoLogo";
import { AchievementBadge } from "@/components/AchievementBadge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code, 
  Brain, 
  Trophy, 
  Sparkles,
  Compass,
  CheckCircle,
  MessageSquare,
  PencilRuler,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 md:pt-24">
        <div className="container relative z-10 mx-auto grid gap-8 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="animate-appear space-y-2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Master DSA, <span className="text-primary glow-text">Fearlessly</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Visual, gamified, interactive learning that makes algorithms fun and unforgettable.
              </p>
            </div>
            
            <div className="animate-appear delay-100 flex flex-col items-start space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/roadmap">Explore Learning Paths</Link>
              </Button>
            </div>
            
            <div className="animate-appear delay-200 flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span>Interactive Learning</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span>Visual Algorithms</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span>AI Assistant</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="animate-float relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-logiqo-indigo via-logiqo-blue to-logiqo-indigo p-1">
              <div className="glass-card h-full w-full">
                <div className="relative flex h-full w-full flex-col items-center justify-center p-8">
                  <LogiqoLogo size="xl" variant="glow" />
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <AchievementBadge type="first-time" />
                    <AchievementBadge type="streak" level={3} />
                    <AchievementBadge type="problem-solver" level={2} />
                    <AchievementBadge type="speed" />
                    <AchievementBadge type="accuracy" level={4} />
                    <AchievementBadge type="completion" level={2} />
                  </div>
                  <div className="mt-8 w-full rounded-lg bg-card/30 p-3">
                    <div className="mb-2 h-2 w-3/4 rounded bg-primary/20"></div>
                    <div className="mb-2 h-2 w-full rounded bg-primary/20"></div>
                    <div className="h-2 w-2/3 rounded bg-primary/20"></div>
                  </div>
                  <Sparkles 
                    className="absolute -right-4 bottom-10 h-24 w-24 rotate-12 text-logiqo-mint opacity-20" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute -bottom-48 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -right-20 top-60 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learning DSA Shouldn't Be Painful
            </h2>
            <p className="text-lg text-muted-foreground">
              Our unique approach combines visual learning, interactive challenges, 
              and gamification to make algorithm mastery genuinely enjoyable.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<PencilRuler className="h-10 w-10 text-logiqo-blue" />}
              title="Visual Learning" 
              description="See algorithms in action with step-by-step animations that bring abstract concepts to life."
            />
            <FeatureCard 
              icon={<Code className="h-10 w-10 text-logiqo-indigo" />}
              title="Interactive Playground" 
              description="Write, test, and visualize your code with our interactive editor and algorithm visualizer."
            />
            <FeatureCard 
              icon={<Trophy className="h-10 w-10 text-amber-500" />}
              title="Gamified Experience" 
              description="Earn XP, badges, and level up as you conquer increasingly complex algorithms."
            />
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-logiqo-mint" />}
              title="AI-Powered Help" 
              description="Get unstuck with our intelligent assistant that helps debug and explain concepts."
            />
            <FeatureCard 
              icon={<Rocket className="h-10 w-10 text-pink-500" />}
              title="Structured Roadmap" 
              description="Follow a clear learning path from the basics to advanced mastery with unlockable content."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-10 w-10 text-emerald-500" />}
              title="Community Support" 
              description="Learn together with discussions, challenges, and peer support in our community."
            />
          </div>
        </div>
      </section>
      
      {/* Learning Path Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your DSA Journey Made Clear
            </h2>
            <p className="text-lg text-muted-foreground">
              From zero to hero with our structured learning paths tailored to your goals.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-muted"></div>
              <RoadmapItem 
                number={1} 
                title="Foundations" 
                description="Master the core concepts: arrays, strings, basic recursion, and time complexity."
                isCompleted={true}
              />
              <RoadmapItem 
                number={2} 
                title="Data Structures" 
                description="Learn linked lists, stacks, queues, trees, and graphs through visualizations."
                isActive={true}
              />
              <RoadmapItem 
                number={3} 
                title="Algorithmic Techniques" 
                description="Dive into searching, sorting, divide & conquer, and greedy algorithms."
              />
              <RoadmapItem 
                number={4} 
                title="Advanced Topics" 
                description="Tackle dynamic programming, advanced graphs, and hard algorithmic problems."
                isLocked={true}
              />
              <RoadmapItem 
                number={5} 
                title="Mastery & Challenges" 
                description="Apply your skills to complex real-world problems and competitive programming."
                isLocked={true}
              />
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/roadmap">
                  <Compass className="mr-2 h-4 w-4" />
                  Explore Full Learning Path
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-logiqo-blue to-logiqo-indigo p-1">
            <div className="flex flex-col items-center justify-between rounded-xl bg-card/95 p-8 backdrop-blur-sm md:flex-row md:p-12">
              <div className="mb-6 md:mb-0 md:max-w-md">
                <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                  Ready to Master Algorithms?
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of learners who've transformed their DSA skills through our interactive platform.
                </p>
              </div>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">See Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="hover-scale rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted/50">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface RoadmapItemProps {
  number: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isLocked?: boolean;
}

function RoadmapItem({ 
  number, 
  title, 
  description, 
  isCompleted = false,
  isActive = false,
  isLocked = false 
}: RoadmapItemProps) {
  return (
    <div className="relative mb-12">
      <div className={cn(
        "absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background",
        isCompleted ? "bg-green-500" : 
        isActive ? "bg-primary" : 
        isLocked ? "bg-muted" : "bg-secondary"
      )}>
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-white" />
        ) : (
          <span className={cn(
            "text-sm font-bold",
            isLocked ? "text-muted-foreground" : "text-white"
          )}>{number}</span>
        )}
      </div>
      
      <div className={cn(
        "ml-16 md:ml-24",
        isLocked && "opacity-60"
      )}>
        <h3 className={cn(
          "mb-2 text-xl font-semibold",
          isActive && "text-primary"
        )}>
          {title}
          {isLocked && <Lock className="ml-2 inline h-4 w-4" />}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// This is needed to prevent errors from the Lock component used in RoadmapItem
function Lock({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
