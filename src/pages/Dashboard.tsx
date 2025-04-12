
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { XpProgress } from "@/components/XpProgress";
import { AchievementBadge } from "@/components/AchievementBadge";
import { LessonCard } from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Activity,
  Target,
  Calendar,
  Clock,
  ArrowRight,
  Flame,
  Brain,
  Zap,
  BarChart2,
  Sparkles,
  BookOpen,
  Code,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={true} />

      <main className="container py-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-medium sm:text-2xl">Welcome back, Alex</h1>
            <p className="text-sm text-muted-foreground">
              Continue your DSA journey where you left off
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild className="h-8">
              <Link to="/roadmap">
                <span>Roadmap</span>
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button size="sm" asChild className="h-8">
              <Link to="/playground">
                <Code className="mr-1 h-3.5 w-3.5" />
                <span>Playground</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Progress Overview */}
            <div className="grid gap-4 sm:grid-cols-2">
              <XpProgress
                variant="dashboard"
                currentXp={650}
                levelXp={1000}
                level={4}
              />
              <div className="space-y-3 rounded-md border border-border/60 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Trophy size={16} className="text-muted-foreground" />
                    <span>Progress</span>
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs">Arrays & Strings</span>
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-1.5" />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs">Daily Streak</span>
                      <span className="text-xs text-muted-foreground">7 days</span>
                    </div>
                    <Progress value={70} className="h-1.5 bg-muted [&>*]:bg-red-500" />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs">Weekly Goals</span>
                      <span className="text-xs text-muted-foreground">3/5 completed</span>
                    </div>
                    <Progress value={60} className="h-1.5 bg-muted [&>*]:bg-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Learning */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-medium">Continue Learning</h2>
                <Link
                  to="/roadmap"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View all
                  <ChevronRight className="ml-0.5 inline-block h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <LessonCard
                  id="recursion-basics"
                  title="Recursion Basics"
                  description="Learn the fundamentals of recursion with visual examples and step-by-step execution."
                  status="in-progress"
                  difficulty="intermediate"
                  duration={25}
                  xpReward={150}
                />
                <LessonCard
                  id="binary-trees"
                  title="Binary Trees Introduction"
                  description="Explore the structure and operations of binary trees through interactive visualizations."
                  status="available"
                  difficulty="intermediate"
                  duration={30}
                  xpReward={200}
                />
              </div>
            </div>

            {/* Recent Activity Tabs */}
            <div className="border border-border/60 rounded-md">
              <div className="border-b border-border/60 p-4">
                <h2 className="text-base font-medium">Recent Activity</h2>
              </div>
              
              <Tabs defaultValue="challenges" className="p-4 pt-2">
                <TabsList className="grid w-full grid-cols-3 h-9 mb-3">
                  <TabsTrigger value="challenges" className="text-xs">Challenges</TabsTrigger>
                  <TabsTrigger value="lessons" className="text-xs">Lessons</TabsTrigger>
                  <TabsTrigger value="practice" className="text-xs">Practice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="challenges" className="space-y-2 pt-2">
                  <ActivityItem
                    icon={<BarChart2 size={14} />}
                    title="Two Sum Problem"
                    description="Completed in 12 minutes with optimal solution"
                    time="2 hours ago"
                    xp={75}
                  />
                  <ActivityItem
                    icon={<Code size={14} />}
                    title="Valid Parentheses"
                    description="Completed with stack-based approach"
                    time="Yesterday"
                    xp={50}
                  />
                  <ActivityItem
                    icon={<Brain size={14} />}
                    title="Maximum Subarray"
                    description="Used Kadane's algorithm successfully"
                    time="2 days ago"
                    xp={100}
                  />
                </TabsContent>
                
                <TabsContent value="lessons" className="space-y-2 pt-2">
                  <ActivityItem
                    icon={<BookOpen size={14} />}
                    title="Arrays and Time Complexity"
                    description="Completed the lesson and all exercises"
                    time="3 days ago"
                    xp={120}
                  />
                  <ActivityItem
                    icon={<BookOpen size={14} />}
                    title="Hash Tables Deep Dive"
                    description="Completed 75% of the lesson"
                    time="5 days ago"
                    xp={90}
                  />
                </TabsContent>
                
                <TabsContent value="practice" className="space-y-2 pt-2">
                  <ActivityItem
                    icon={<Zap size={14} />}
                    title="Daily Coding Challenge"
                    description="Completed in 8 minutes (top 15%)"
                    time="Today"
                    xp={25}
                  />
                  <ActivityItem
                    icon={<Zap size={14} />}
                    title="Weekly Contest"
                    description="Ranked 42nd out of 156 participants"
                    time="Last Sunday"
                    xp={150}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <div className="rounded-md border border-border/60 p-4">
              <h2 className="mb-3 text-sm font-medium">Your Stats</h2>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={<Trophy size={14} />}
                  label="Rank"
                  value="#512"
                />
                <StatCard
                  icon={<Activity size={14} />}
                  label="Problems"
                  value="38"
                />
                <StatCard
                  icon={<Calendar size={14} />}
                  label="Streak"
                  value="7 days"
                />
                <StatCard
                  icon={<Clock size={14} />}
                  label="Time"
                  value="24h 32m"
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-md border border-border/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium">Achievements</h2>
                <Link
                  to="/profile/achievements"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <AchievementBadge type="first-time" size="sm" />
                <AchievementBadge type="streak" level={3} size="sm" />
                <AchievementBadge type="problem-solver" level={2} size="sm" />
                <AchievementBadge type="accuracy" level={4} size="sm" />
                <AchievementBadge type="speed" size="sm" />
                <AchievementBadge type="completion" level={2} size="sm" />
                <AchievementBadge type="contest-winner" unlocked={false} size="sm" />
                <AchievementBadge type="genius" unlocked={false} size="sm" />
              </div>
            </div>

            {/* Upcoming Contests */}
            <div className="rounded-md border border-border/60 p-4">
              <h2 className="mb-3 text-sm font-medium">Upcoming Contests</h2>
              <div className="space-y-3">
                <div className="rounded border border-border/40 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Weekly Challenge</h4>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">In 2 days</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Array manipulation and string algorithms
                  </p>
                  <Button variant="link" className="mt-1 h-auto p-0 text-xs">
                    Set Reminder
                  </Button>
                </div>
                <div className="rounded border border-border/40 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Graph Theory Contest</h4>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">Next week</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    BFS, DFS, and shortest path algorithms
                  </p>
                  <Button variant="link" className="mt-1 h-auto p-0 text-xs">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  xp: number;
}

function ActivityItem({
  icon,
  title,
  description,
  time,
  xp,
}: ActivityItemProps) {
  return (
    <div className="group flex items-start space-x-3 rounded border border-border/40 p-3 transition-colors hover:border-border hover:bg-secondary/30">
      <div className="mt-0.5 rounded bg-secondary/50 p-1">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <Badge variant="outline" className="h-4 border-primary/20 bg-primary/5 px-1 text-[10px] font-normal text-primary">
            +{xp} XP
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center rounded border border-border/40 p-2 text-center">
      <div className="mb-1 rounded bg-secondary/50 p-1">
        {icon}
      </div>
      <span className="text-sm font-medium">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
