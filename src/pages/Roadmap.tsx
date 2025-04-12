
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Check, 
  Code, 
  Cpu, 
  Database, 
  FileText, 
  LucideIcon,
  Lock,
  Network, 
  Puzzle,
  Server,
  Settings,
  Sparkles,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AchievementBadge } from "@/components/AchievementBadge";
import { Progress } from "@/components/ui/progress";

// Animation variants for the roadmap nodes
const nodeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Animation variants for the roadmap lines
const lineVariants = {
  hidden: { pathLength: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    transition: {
      delay: i * 0.1 + 0.2,
      duration: 0.8,
      ease: "easeInOut"
    }
  })
};

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "locked" | "available" | "in-progress" | "completed";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedHours: number;
  xpReward: number;
  requiredIds: string[];
  topics: string[];
}

const roadmapData: RoadmapNode[] = [
  {
    id: "foundations",
    title: "Programming Foundations",
    description: "Master the basics of programming and computational thinking",
    icon: Code,
    status: "completed",
    difficulty: "beginner",
    estimatedHours: 10,
    xpReward: 500,
    requiredIds: [],
    topics: ["Variables", "Control Flow", "Functions", "OOP Basics"]
  },
  {
    id: "arrays-basics",
    title: "Arrays & Strings",
    description: "Learn to manipulate arrays and strings efficiently",
    icon: FileText,
    status: "completed",
    difficulty: "beginner",
    estimatedHours: 8,
    xpReward: 600,
    requiredIds: ["foundations"],
    topics: ["Array Manipulation", "String Operations", "Two Pointers", "Sliding Window"]
  },
  {
    id: "complexity",
    title: "Time & Space Complexity",
    description: "Understand Big O notation and algorithm efficiency",
    icon: Zap,
    status: "in-progress",
    difficulty: "beginner",
    estimatedHours: 6,
    xpReward: 400,
    requiredIds: ["foundations"],
    topics: ["Big O Notation", "Time Complexity", "Space Complexity", "Algorithm Analysis"]
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Master fundamental searching algorithms and their applications",
    icon: Puzzle,
    status: "available",
    difficulty: "beginner",
    estimatedHours: 8,
    xpReward: 700,
    requiredIds: ["arrays-basics"],
    topics: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"]
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Learn various sorting techniques and their efficiency",
    icon: Settings,
    status: "available",
    difficulty: "intermediate",
    estimatedHours: 12,
    xpReward: 800,
    requiredIds: ["arrays-basics", "complexity"],
    topics: ["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"]
  },
  {
    id: "data-structures",
    title: "Basic Data Structures",
    description: "Explore fundamental data structures used in programming",
    icon: Database,
    status: "locked",
    difficulty: "intermediate",
    estimatedHours: 15,
    xpReward: 900,
    requiredIds: ["searching", "sorting"],
    topics: ["Linked Lists", "Stacks", "Queues", "Hash Tables"]
  },
  {
    id: "trees",
    title: "Trees & Graphs",
    description: "Understand hierarchical and network data structures",
    icon: Network,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 18,
    xpReward: 1200,
    requiredIds: ["data-structures"],
    topics: ["Binary Trees", "Binary Search Trees", "Heaps", "Graph Representations"]
  },
  {
    id: "advanced-algorithms",
    title: "Advanced Algorithms",
    description: "Master complex algorithmic techniques and paradigms",
    icon: Cpu,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 25,
    xpReward: 1500,
    requiredIds: ["trees"],
    topics: ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Divide and Conquer"]
  },
  {
    id: "system-design",
    title: "System Design & Optimization",
    description: "Apply DSA concepts to real-world system design challenges",
    icon: Server,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 30,
    xpReward: 2000,
    requiredIds: ["advanced-algorithms"],
    topics: ["Caching Strategies", "Distributed Systems", "Database Design", "Performance Optimization"]
  }
];

// This represents the dependencies between nodes in the roadmap
const roadmapConnections = [
  { from: "foundations", to: "arrays-basics" },
  { from: "foundations", to: "complexity" },
  { from: "arrays-basics", to: "searching" },
  { from: "complexity", to: "sorting" },
  { from: "arrays-basics", to: "sorting" },
  { from: "searching", to: "data-structures" },
  { from: "sorting", to: "data-structures" },
  { from: "data-structures", to: "trees" },
  { from: "trees", to: "advanced-algorithms" },
  { from: "advanced-algorithms", to: "system-design" }
];

const Roadmap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);

  // Calculate overall progress
  const totalNodes = roadmapData.length;
  const completedNodes = roadmapData.filter(node => node.status === "completed").length;
  const inProgressNodes = roadmapData.filter(node => node.status === "in-progress").length;
  const progressPercentage = Math.round((completedNodes / totalNodes) * 100);

  // Handle node click
  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
    
    // Calculate path to this node
    const path = calculatePath(node.id);
    setHighlightedPath(path);
  };

  // Calculate path to a node
  const calculatePath = (nodeId: string): string[] => {
    const path: string[] = [nodeId];
    let currentId = nodeId;
    
    // Find prerequisites recursively
    const findPrerequisites = (id: string) => {
      const node = roadmapData.find(n => n.id === id);
      if (!node || node.requiredIds.length === 0) return;
      
      node.requiredIds.forEach(reqId => {
        path.push(reqId);
        findPrerequisites(reqId);
      });
    };
    
    findPrerequisites(currentId);
    return path;
  };

  // Get status color
  const getStatusColor = (status: RoadmapNode["status"]): string => {
    switch(status) {
      case "completed": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "in-progress": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "available": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "locked": return "bg-muted/20 text-muted-foreground border-muted/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: RoadmapNode["difficulty"]): string => {
    switch(difficulty) {
      case "beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "intermediate": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "advanced": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "expert": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  // Get status label
  const getStatusLabel = (status: RoadmapNode["status"]): string => {
    switch(status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "available": return "Available";
      case "locked": return "Locked";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <header className="mb-8 md:mb-12">
            <h1 className="text-2xl font-medium md:text-3xl">Learning Roadmap</h1>
            <p className="mt-2 text-muted-foreground">Follow this structured path to master Data Structures and Algorithms</p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Your Progress
                </Badge>
                <div className="text-sm font-medium">
                  {completedNodes} of {totalNodes} completed
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-2 sm:w-48">
                  <Progress value={progressPercentage} className="h-2" />
                  <span className="w-8 text-xs font-medium">{progressPercentage}%</span>
                </div>
                
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <Separator className="mt-6" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Roadmap Visualization - For desktop */}
            <div className="order-2 md:order-1 md:col-span-2 lg:col-span-3 rounded-lg border border-border/60 bg-card/30 p-6 relative min-h-[600px] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines between nodes */}
                {roadmapConnections.map((connection, i) => {
                  const fromNode = document.getElementById(`node-${connection.from}`);
                  const toNode = document.getElementById(`node-${connection.to}`);
                  
                  // Add connection lines (these will be positioned using JavaScript in a real implementation)
                  return (
                    <motion.path
                      key={`line-${connection.from}-${connection.to}`}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={lineVariants}
                      d={`M100,${100 + i * 70} L300,${150 + i * 50}`}
                      stroke={highlightedPath.includes(connection.from) && highlightedPath.includes(connection.to) 
                        ? "rgba(147, 51, 234, 0.7)" 
                        : "rgba(100, 100, 100, 0.2)"}
                      strokeWidth={highlightedPath.includes(connection.from) && highlightedPath.includes(connection.to) ? "3" : "2"}
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  );
                })}
              </svg>
              
              <div className="relative z-10">
                <div className="grid grid-cols-3 gap-4">
                  {roadmapData.map((node, i) => (
                    <motion.div
                      id={`node-${node.id}`}
                      key={node.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={nodeVariants}
                      onClick={() => handleNodeClick(node)}
                      className={`cursor-pointer p-4 rounded-md border transition-all duration-300 ${
                        selectedNode?.id === node.id 
                          ? "ring-2 ring-primary ring-offset-2 shadow-lg transform scale-105" 
                          : "hover:shadow-md hover:translate-y-[-2px]"
                      } ${
                        node.status === "locked" ? "opacity-50" : ""
                      } ${
                        highlightedPath.includes(node.id) 
                          ? "border-purple-500/50 bg-purple-500/5" 
                          : "border-border/60 bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${getStatusColor(node.status)}`}>
                          {node.status === "locked" ? (
                            <Lock size={16} />
                          ) : node.status === "completed" ? (
                            <Check size={16} />
                          ) : (
                            <node.icon size={16} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium line-clamp-1">{node.title}</h3>
                          <div className="mt-1 flex items-center gap-1.5">
                            <Badge variant="outline" className={`px-1.5 py-0 h-4 text-[10px] ${getDifficultyColor(node.difficulty)}`}>
                              {node.difficulty}
                            </Badge>
                            {node.status !== "locked" && (
                              <Badge variant="secondary" className="px-1.5 py-0 h-4 text-[10px]">
                                <Sparkles size={10} className="mr-0.5" />
                                {node.xpReward} XP
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Node Details */}
            <div className="order-1 md:order-2">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>
                    {selectedNode ? selectedNode.title : "Select a Topic"}
                  </CardTitle>
                  <CardDescription>
                    {selectedNode 
                      ? selectedNode.description 
                      : "Click on any roadmap node to see details"}
                  </CardDescription>
                </CardHeader>
                
                {selectedNode && (
                  <>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1.5">STATUS</h4>
                        <Badge 
                          className={`${getStatusColor(selectedNode.status)}`}
                        >
                          {getStatusLabel(selectedNode.status)}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1.5">ESTIMATED TIME</h4>
                        <p className="text-sm">{selectedNode.estimatedHours} hours</p>
                      </div>
                      
                      {selectedNode.status !== "locked" && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-1.5">XP REWARD</h4>
                          <div className="flex items-center gap-1.5">
                            <Sparkles size={14} className="text-purple-500" />
                            <p className="text-sm font-medium">{selectedNode.xpReward} XP</p>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground mb-1.5">TOPICS COVERED</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.topics.map(topic => (
                            <Badge key={topic} variant="secondary" className="px-2 py-0.5 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {selectedNode.requiredIds.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-1.5">PREREQUISITES</h4>
                          <div className="flex flex-col gap-2">
                            {selectedNode.requiredIds.map(reqId => {
                              const reqNode = roadmapData.find(n => n.id === reqId);
                              if (!reqNode) return null;
                              
                              return (
                                <div 
                                  key={reqId} 
                                  className="flex items-center gap-2 text-sm rounded-md p-1.5 bg-secondary/30 cursor-pointer hover:bg-secondary/50"
                                  onClick={() => handleNodeClick(reqNode)}
                                >
                                  <div className={`h-5 w-5 rounded-md flex items-center justify-center ${getStatusColor(reqNode.status)}`}>
                                    {reqNode.status === "completed" ? (
                                      <Check size={12} />
                                    ) : (
                                      <reqNode.icon size={12} />
                                    )}
                                  </div>
                                  <span>{reqNode.title}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter>
                      {selectedNode.status === "locked" ? (
                        <Button disabled className="w-full">
                          <Lock size={14} className="mr-2" />
                          Locked
                        </Button>
                      ) : selectedNode.status === "completed" ? (
                        <Button className="w-full" variant="secondary">
                          <ArrowRight size={14} className="mr-2" />
                          Review Again
                        </Button>
                      ) : (
                        <Button className="w-full">
                          {selectedNode.status === "in-progress" ? (
                            <>
                              <ArrowRight size={14} className="mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <ArrowRight size={14} className="mr-2" />
                              Start Learning
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </>
                )}
              </Card>
            </div>
          </div>
          
          {/* Learning Path Legend */}
          <div className="mt-8 rounded-lg border border-border/60 bg-card/30 p-4">
            <h3 className="text-sm font-medium mb-3">Legend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground"></div>
                <span className="text-xs">Locked</span>
              </div>
            </div>
          </div>
          
          {/* Recognition Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Your Learning Achievements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <AchievementCard
                type="streak"
                level={3}
                description="7-day learning streak"
              />
              <AchievementCard
                type="completion"
                level={2}
                description="Completed 2 modules"
              />
              <AchievementCard
                type="first-time"
                level={1}
                description="First challenge completed"
              />
              <AchievementCard
                type="problem-solver"
                level={1}
                description="Solved 5 problems"
              />
              <AchievementCard
                type="explorer"
                level={1}
                description="Explored all features"
              />
              <AchievementCard
                type="genius"
                unlocked={false}
                description="Master complex algorithms"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface AchievementCardProps {
  type: React.ComponentProps<typeof AchievementBadge>["type"];
  level?: React.ComponentProps<typeof AchievementBadge>["level"];
  unlocked?: boolean;
  description: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  type,
  level = 1,
  unlocked = true,
  description
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center gap-2 rounded-md border p-4 text-center ${
        unlocked ? "border-border/60 bg-card/30" : "border-border/30 bg-card/10 opacity-50"
      }`}
    >
      <AchievementBadge 
        type={type} 
        level={level} 
        size="lg" 
        unlocked={unlocked} 
        showTooltip={false}
      />
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Roadmap;
