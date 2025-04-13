import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../pages/Roadmap.css";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number;
  xp: number;
  children?: string[];
  isCompleted?: boolean;
}

interface RoadmapCategory {
  id: string;
  name: string;
  color: string;
}

interface RelatedNodes {
  parents: RoadmapNode[];
  siblings: RoadmapNode[];
  children: RoadmapNode[];
}

const Roadmap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const forceHideBadge = searchParams.get("forceHideBadge") === "true";
  const navigate = useNavigate();
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  
  const categories: RoadmapCategory[] = [
    { id: "algorithm", name: "Algorithms", color: "bg-purple-500" },
    { id: "logic", name: "Logic", color: "bg-blue-500" },
    { id: "math", name: "Mathematics", color: "bg-green-500" },
    { id: "problem", name: "Problem Solving", color: "bg-orange-500" },
  ];
  
  const roadmapData: RoadmapNode[] = [
    {
      id: "intro",
      title: "Introduction to Programming Logic",
      description: "Learn the fundamentals of programming logic and problem-solving",
      category: "logic",
      level: 1,
      xp: 50,
      children: ["variables", "conditionals"],
      isCompleted: true,
    },
    {
      id: "variables",
      title: "Variables & Data Types",
      description: "Understand how to store and manipulate data",
      category: "logic",
      level: 1,
      xp: 75,
      children: ["loops"],
      isCompleted: true,
    },
    {
      id: "conditionals",
      title: "Conditional Statements",
      description: "Master if-else statements and logical operators",
      category: "logic",
      level: 1,
      xp: 75,
      children: ["loops"],
      isCompleted: false,
    },
    {
      id: "loops",
      title: "Loops & Iterations",
      description: "Learn to repeat operations efficiently",
      category: "logic",
      level: 2,
      xp: 100,
      children: ["functions", "arrays"],
      isCompleted: false,
    },
    {
      id: "functions",
      title: "Functions & Methods",
      description: "Create reusable blocks of code",
      category: "logic",
      level: 2,
      xp: 125,
      children: ["recursion"],
      isCompleted: false,
    },
    {
      id: "arrays",
      title: "Arrays & Collections",
      description: "Store and manipulate collections of data",
      category: "algorithm",
      level: 2,
      xp: 125,
      children: ["sorting"],
      isCompleted: false,
    },
    {
      id: "recursion",
      title: "Recursion",
      description: "Understand and implement recursive solutions",
      category: "algorithm",
      level: 3,
      xp: 150,
      children: ["advanced_algorithms"],
      isCompleted: false,
    },
    {
      id: "sorting",
      title: "Sorting Algorithms",
      description: "Learn different ways to sort data efficiently",
      category: "algorithm",
      level: 3,
      xp: 150,
      children: ["searching"],
      isCompleted: false,
    },
    {
      id: "searching",
      title: "Searching Algorithms",
      description: "Implement algorithms to find data quickly",
      category: "algorithm",
      level: 3,
      xp: 150,
      children: ["advanced_algorithms"],
      isCompleted: false,
    },
    {
      id: "advanced_algorithms",
      title: "Advanced Algorithms",
      description: "Master complex algorithms and techniques",
      category: "algorithm",
      level: 4,
      xp: 200,
      children: [],
      isCompleted: false,
    },
    {
      id: "basic_math",
      title: "Basic Mathematics",
      description: "Review essential math concepts for programming",
      category: "math",
      level: 1,
      xp: 50,
      children: ["algebra"],
      isCompleted: true,
    },
    {
      id: "algebra",
      title: "Algebraic Concepts",
      description: "Apply algebraic thinking to code",
      category: "math",
      level: 2,
      xp: 100,
      children: ["statistics"],
      isCompleted: false,
    },
    {
      id: "statistics",
      title: "Statistical Analysis",
      description: "Learn to analyze and interpret data",
      category: "math",
      level: 3,
      xp: 150,
      children: ["advanced_math"],
      isCompleted: false,
    },
    {
      id: "advanced_math",
      title: "Advanced Mathematical Concepts",
      description: "Apply complex math in programming scenarios",
      category: "math",
      level: 4,
      xp: 200,
      children: [],
      isCompleted: false,
    },
    {
      id: "problems_basic",
      title: "Basic Problem Solving",
      description: "Develop a methodical approach to problems",
      category: "problem",
      level: 1,
      xp: 75,
      children: ["problems_intermediate"],
      isCompleted: false,
    },
    {
      id: "problems_intermediate",
      title: "Intermediate Challenges",
      description: "Tackle more complex logical challenges",
      category: "problem",
      level: 2,
      xp: 125,
      children: ["problems_advanced"],
      isCompleted: false,
    },
    {
      id: "problems_advanced",
      title: "Advanced Problem Solving",
      description: "Solve complex problems requiring multiple techniques",
      category: "problem",
      level: 3,
      xp: 175,
      children: [],
      isCompleted: false,
    },
  ];

  const filteredNodes = activeCategories.length
    ? roadmapData.filter(node => activeCategories.includes(node.category))
    : roadmapData;

  const findNodeById = (id: string) => roadmapData.find(node => node.id === id);

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prevCategories => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter(c => c !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const handleNodeClick = (nodeId: string) => {
    if (expandedNode !== null && nodeId !== expandedNode) {
      setSelectedNode(nodeId);
    } else {
      setSelectedNode(prevSelected => (prevSelected === nodeId ? null : nodeId));
      if (expandedNode === null) {
        setExpandedNode(null);
      }
    }
  };

  const expandNode = (nodeId: string) => {
    setExpandedNode(nodeId);
    setSelectedNode(nodeId);
  };

  const backToOverview = () => {
    setExpandedNode(null);
    setSelectedNode(null);
  };

  const getRelatedNodes = (nodeId: string): RelatedNodes => {
    const node = findNodeById(nodeId);
    if (!node) return { parents: [], siblings: [], children: [] };
    
    const parentNodes = roadmapData.filter(n => 
      n.children && n.children.includes(nodeId)
    );
    
    let siblingNodes: RoadmapNode[] = [];
    parentNodes.forEach(parent => {
      if (parent.children) {
        parent.children.forEach(childId => {
          if (childId !== nodeId) {
            const sibling = findNodeById(childId);
            if (sibling) siblingNodes.push(sibling);
          }
        });
      }
    });
    
    const childNodes = node.children 
      ? node.children.map(id => findNodeById(id)).filter(Boolean) as RoadmapNode[]
      : [];
    
    return {
      parents: parentNodes,
      siblings: siblingNodes,
      children: childNodes
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Programming Logic Learning Roadmap
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategories.includes(category.id) ? "default" : "outline"}
              onClick={() => toggleCategory(category.id)}
              className="mb-2"
            >
              <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
              {category.name}
            </Button>
          ))}
          
          {activeCategories.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => setActiveCategories([])}
              className="mb-2"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        {expandedNode && (
          <Button 
            onClick={backToOverview} 
            variant="outline" 
            className="mb-4"
          >
            ← Back to Overview
          </Button>
        )}
        
        <div className="relative">
          {expandedNode ? (
            (() => {
              const node = findNodeById(expandedNode);
              if (!node) return <div>Node not found</div>;
              
              const related = getRelatedNodes(expandedNode);
              
              return (
                <div className="space-y-6">
                  <Card className="p-4 border-2 border-purple-500 shadow-lg">
                    <h3 className="text-xl font-bold">{node.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{node.description}</p>
                    <div className="flex items-center mt-2">
                      <Badge className={`${categories.find(c => c.id === node.category)?.color} text-white`}>
                        {categories.find(c => c.id === node.category)?.name}
                      </Badge>
                      <Badge variant="outline" className="ml-2">Level {node.level}</Badge>
                      <Badge variant="outline" className="ml-2">{node.xp} XP</Badge>
                      {node.isCompleted && !forceHideBadge && (
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                      )}
                    </div>
                  </Card>
                  
                  {related.parents.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Prerequisites</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.parents.map(parent => (
                          <Card 
                            key={parent.id}
                            className={`p-4 cursor-pointer hover:shadow-md transition ${
                              selectedNode === parent.id ? "ring-2 ring-purple-500 selected-node" : ""
                            }`}
                            onClick={() => handleNodeClick(parent.id)}
                          >
                            <h3 className="font-bold">{parent.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{parent.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge className={`${categories.find(c => c.id === parent.category)?.color} text-white`}>
                                {categories.find(c => c.id === parent.category)?.name}
                              </Badge>
                              {parent.isCompleted && !forceHideBadge && (
                                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {related.siblings.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Related Topics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.siblings.map(sibling => (
                          <Card 
                            key={sibling.id}
                            className={`p-4 cursor-pointer hover:shadow-md transition ${
                              selectedNode === sibling.id ? "ring-2 ring-purple-500 selected-node" : ""
                            }`}
                            onClick={() => handleNodeClick(sibling.id)}
                          >
                            <h3 className="font-bold">{sibling.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{sibling.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge className={`${categories.find(c => c.id === sibling.category)?.color} text-white`}>
                                {categories.find(c => c.id === sibling.category)?.name}
                              </Badge>
                              {sibling.isCompleted && !forceHideBadge && (
                                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {related.children.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Next Steps</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.children.map(child => (
                          <Card 
                            key={child.id}
                            className={`p-4 cursor-pointer hover:shadow-md transition ${
                              selectedNode === child.id ? "ring-2 ring-purple-500 selected-node" : ""
                            }`}
                            onClick={() => handleNodeClick(child.id)}
                          >
                            <h3 className="font-bold">{child.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{child.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge className={`${categories.find(c => c.id === child.category)?.color} text-white`}>
                                {categories.find(c => c.id === child.category)?.name}
                              </Badge>
                              {child.isCompleted && !forceHideBadge && (
                                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNodes.map(node => (
                <Card 
                  key={node.id}
                  className={`p-4 cursor-pointer hover:shadow-md transition ${
                    selectedNode === node.id ? "ring-2 ring-purple-500 selected-node" : ""
                  }`}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <h3 className="font-bold">{node.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{node.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${categories.find(c => c.id === node.category)?.color} text-white`}>
                      {categories.find(c => c.id === node.category)?.name}
                    </Badge>
                    <Badge variant="outline">Level {node.level}</Badge>
                    <Badge variant="outline">{node.xp} XP</Badge>
                    {node.isCompleted && !forceHideBadge && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                    )}
                  </div>
                  {node.children && node.children.length > 0 && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 p-0 h-auto text-purple-600 hover:text-purple-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        expandNode(node.id);
                      }}
                    >
                      {node.children.length > 3 
                        ? `+${node.children.length} more` 
                        : "View related courses"}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {selectedNode && !expandedNode && (
          <Card className="mt-8 p-6 shadow-lg">
            {(() => {
              const node = findNodeById(selectedNode);
              if (!node) return <div>Node not found</div>;
              
              return (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{node.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className={`${categories.find(c => c.id === node.category)?.color} text-white`}>
                      {categories.find(c => c.id === node.category)?.name}
                    </Badge>
                    <Badge variant="outline">Level {node.level}</Badge>
                    <Badge variant="outline">{node.xp} XP</Badge>
                    {node.isCompleted && !forceHideBadge && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{node.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => expandNode(selectedNode)}>
                      Explore Related Courses
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedNode(null)}>
                      Close Details
                    </Button>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
