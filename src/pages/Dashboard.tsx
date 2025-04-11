
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { XpProgress } from "@/components/XpProgress";
import { AchievementBadge } from "@/components/AchievementBadge";
import { LessonCard } from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Activity,
  Target,
  Calendar,
  Clock,
  ArrowRight,
  Fire,
  Brain,
  Zap,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={true} />

      <main className="container mx-auto flex-1 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hey, Alex! 👋</h1>
            <p className="text-muted-foreground">
              Continue your DSA journey from where you left off.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/roadmap">
              <Button variant="outline">
                View Roadmap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button>
                Code Playground
                <Code className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Your Progress</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <XpProgress
                    variant="dashboard"
                    currentXp={650}
                    levelXp={1000}
                    level={4}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-amber-500" />
                        <span className="text-sm font-medium">
                          Arrays & Strings Mastery
                        </span>
                      </div>
                      <span className="text-xs font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fire size={16} className="text-red-500" />
                        <span className="text-sm font-medium">
                          Daily Streak
                        </span>
                      </div>
                      <span className="text-xs font-medium">7 days</span>
                    </div>
                    <Progress
                      value={70}
                      className="h-2 bg-muted [&>*]:bg-red-500"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-green-500" />
                        <span className="text-sm font-medium">
                          Weekly Goals
                        </span>
                      </div>
                      <span className="text-xs font-medium">3/5 completed</span>
                    </div>
                    <Progress
                      value={60}
                      className="h-2 bg-muted [&>*]:bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Continue Learning */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Continue Learning</h2>
                <Link
                  to="/roadmap"
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
              <Tabs defaultValue="challenges">
                <TabsList className="mb-4">
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                <TabsContent value="challenges" className="space-y-4">
                  <ActivityItem
                    icon={<BarChart2 size={16} className="text-primary" />}
                    title="Two Sum Problem"
                    description="Completed in 12 minutes with optimal solution"
                    time="2 hours ago"
                    xp={75}
                  />
                  <ActivityItem
                    icon={<Code size={16} className="text-indigo-500" />}
                    title="Valid Parentheses"
                    description="Completed with stack-based approach"
                    time="Yesterday"
                    xp={50}
                  />
                  <ActivityItem
                    icon={<Brain size={16} className="text-purple-500" />}
                    title="Maximum Subarray"
                    description="Used Kadane's algorithm successfully"
                    time="2 days ago"
                    xp={100}
                  />
                </TabsContent>
                <TabsContent value="lessons" className="space-y-4">
                  <ActivityItem
                    icon={<Code size={16} className="text-primary" />}
                    title="Arrays and Time Complexity"
                    description="Completed the lesson and all exercises"
                    time="3 days ago"
                    xp={120}
                  />
                  <ActivityItem
                    icon={<Code size={16} className="text-indigo-500" />}
                    title="Hash Tables Deep Dive"
                    description="Completed 75% of the lesson"
                    time="5 days ago"
                    xp={90}
                  />
                </TabsContent>
                <TabsContent value="practice" className="space-y-4">
                  <ActivityItem
                    icon={<Zap size={16} className="text-yellow-500" />}
                    title="Daily Coding Challenge"
                    description="Completed in 8 minutes (top 15%)"
                    time="Today"
                    xp={25}
                  />
                  <ActivityItem
                    icon={<Zap size={16} className="text-yellow-500" />}
                    title="Weekly Contest"
                    description="Ranked 42nd out of 156 participants"
                    time="Last Sunday"
                    xp={150}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={<Trophy className="h-5 w-5 text-amber-500" />}
                  label="Rank"
                  value="#512"
                />
                <StatCard
                  icon={<Activity className="h-5 w-5 text-green-500" />}
                  label="Problems"
                  value="38"
                />
                <StatCard
                  icon={<Calendar className="h-5 w-5 text-blue-500" />}
                  label="Streak"
                  value="7 days"
                />
                <StatCard
                  icon={<Clock className="h-5 w-5 text-indigo-500" />}
                  label="Time"
                  value="24h 32m"
                />
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Achievements</h2>
                <Link
                  to="/profile/achievements"
                  className="text-xs text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <AchievementBadge type="first-time" />
                <AchievementBadge type="streak" level={3} />
                <AchievementBadge type="problem-solver" level={2} />
                <AchievementBadge type="accuracy" level={4} />
                <AchievementBadge type="speed" />
                <AchievementBadge type="completion" level={2} />
                <AchievementBadge type="contest-winner" unlocked={false} />
                <AchievementBadge type="genius" unlocked={false} />
                <AchievementBadge type="debug-master" unlocked={false} />
              </div>
            </Card>

            {/* Upcoming Contests */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Upcoming Contests</h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Weekly Challenge</h4>
                    <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600">
                      In 2 days
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Array manipulation and string algorithms
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    Set Reminder
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Graph Theory Contest</h4>
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600">
                      Next week
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    BFS, DFS, and shortest path algorithms
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    Register Now
                  </Button>
                </div>
              </div>
            </Card>
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
    <div className="flex items-start space-x-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
      <div className="mt-0.5 rounded-full bg-muted p-1.5">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            +{xp} XP
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-1 text-xs text-muted-foreground">{time}</p>
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
    <div className="flex flex-col items-center rounded-lg border p-3 text-center">
      <div className="mb-2 rounded-full bg-muted/50 p-2">{icon}</div>
      <span className="text-lg font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

// For brevity, adding a Code icon component to avoid imports issues
function Code({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
