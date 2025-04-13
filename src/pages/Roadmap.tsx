
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Roadmap.css";
import { 
  ArrowRight, 
  BrainCircuit,
  Check, 
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Code, 
  CodeSquare,
  Combine,
  Cpu, 
  Database, 
  FileCode,
  FileText, 
  FunctionSquare,
  GitBranch,
  Infinity,
  Languages,
  Layers,
  LayoutGrid,
  Library,
  Link as LinkIcon,
  LucideIcon,
  Lock,
  Map,
  MoveHorizontal,
  Network, 
  PanelLeftClose,
  PanelRightClose,
  Puzzle,
  Repeat,
  RotateCcw,
  Scale,
  ScanSearch,
  Search,
  Server,
  Settings,
  Share2,
  SlidersHorizontal,
  SortAsc,
  Sparkles,
  Split,
  Table,
  Timer,
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
  subtopics?: SubTopic[];
  category?: string;
}

interface SubTopic {
  id: string;
  title: string;
  description: string;
  concepts: string[];
  problems?: string[];
  resources?: Resource[];
}

interface Resource {
  title: string;
  type: "article" | "video" | "interactive" | "book" | "documentation";
  url?: string;
}

// Define roadmap categories for better organization
const CATEGORIES = {
  FUNDAMENTALS: "Fundamentals",
  DATA_STRUCTURES: "Data Structures",
  ALGORITHMS: "Algorithms",
  ADVANCED: "Advanced Concepts",
  APPLICATION: "Real-world Applications"
};

const roadmapData: RoadmapNode[] = [
  // FUNDAMENTALS
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
    topics: ["Variables", "Control Flow", "Functions", "OOP Basics"],
    category: CATEGORIES.FUNDAMENTALS,
    subtopics: [
      {
        id: "foundations-basic-syntax",
        title: "Basic Syntax & Data Types",
        description: "Learn fundamental programming syntax and data types",
        concepts: ["Variables", "Constants", "Data Types", "Type Conversion", "Operators", "Expressions"],
        resources: [
          { title: "Programming Foundations", type: "interactive" },
          { title: "Syntax Essentials", type: "article" }
        ]
      },
      {
        id: "foundations-control-flow",
        title: "Control Flow",
        description: "Master program flow control mechanisms",
        concepts: ["Conditionals (if/else)", "Loops (for, while)", "Switch Statements", "Break & Continue", "Error Handling"],
        problems: ["FizzBuzz", "Pattern Printing", "Number Classification"]
      },
      {
        id: "foundations-functions",
        title: "Functions & Methods",
        description: "Learn to create and use functions effectively",
        concepts: ["Function Declaration", "Parameters & Arguments", "Return Values", "Scope", "Recursion Basics", "Method Syntax"],
        problems: ["Factorial Calculation", "Sum of Digits", "Simple Calculator"]
      },
      {
        id: "foundations-oop",
        title: "OOP Fundamentals",
        description: "Understand object-oriented programming concepts",
        concepts: ["Classes & Objects", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Interface Basics"],
        resources: [
          { title: "OOP Fundamentals", type: "video" },
          { title: "Object Thinking", type: "book" }
        ]
      }
    ]
  },
  {
    id: "complexity",
    title: "Time & Space Complexity",
    description: "Understand Big O notation and algorithm efficiency",
    icon: Timer,
    status: "in-progress",
    difficulty: "beginner",
    estimatedHours: 10,
    xpReward: 600,
    requiredIds: ["foundations"],
    topics: ["Big O Notation", "Time Complexity", "Space Complexity", "Algorithm Analysis", "Optimization Basics"],
    category: CATEGORIES.FUNDAMENTALS,
    subtopics: [
      {
        id: "complexity-big-o",
        title: "Big O Notation",
        description: "Learn the mathematical notation for algorithm complexity",
        concepts: ["Asymptotic Analysis", "Worst-case Analysis", "O(1), O(n), O(log n), O(n²)", "Growth Rates", "Notation Rules"],
        resources: [
          { title: "Understanding Big O", type: "article" },
          { title: "Time Complexity Visualization", type: "interactive" }
        ]
      },
      {
        id: "complexity-time",
        title: "Time Complexity Analysis",
        description: "Evaluate algorithm runtime efficiency",
        concepts: ["Constant Time O(1)", "Linear Time O(n)", "Logarithmic Time O(log n)", "Quadratic Time O(n²)", "Polynomial Time", "Exponential Time"],
        problems: ["Algorithm Runtime Calculation", "Comparison of Sorting Algorithms", "Nested Loop Analysis"]
      },
      {
        id: "complexity-space",
        title: "Space Complexity",
        description: "Analyze memory usage of algorithms",
        concepts: ["Memory Allocation", "Auxiliary Space", "Input Space", "Stack Space in Recursion", "Space-Time Tradeoffs"],
        problems: ["Recursive vs Iterative Space Usage", "In-place Algorithm Analysis"]
      },
      {
        id: "complexity-optimization",
        title: "Basic Optimization Techniques",
        description: "Learn to improve algorithm efficiency",
        concepts: ["Loop Optimization", "Variable Optimization", "Memoization Basics", "Early Termination", "Amortized Analysis"],
        problems: ["Optimize Brute Force Solutions", "Memory Usage Reduction", "Performance Bottleneck Identification"]
      }
    ]
  },
  {
    id: "problem-solving",
    title: "Problem Solving Techniques",
    description: "Learn structured approaches to solve algorithmic problems",
    icon: BrainCircuit,
    status: "available",
    difficulty: "beginner",
    estimatedHours: 12,
    xpReward: 700,
    requiredIds: ["foundations"],
    topics: ["Problem Analysis", "Algorithm Design", "Pattern Recognition", "Breaking Down Problems", "Solution Verification"],
    category: CATEGORIES.FUNDAMENTALS,
    subtopics: [
      {
        id: "problem-solving-approach",
        title: "Structured Problem Solving",
        description: "Learn a systematic approach to problem solving",
        concepts: ["Problem Statement Analysis", "Input/Output Definition", "Edge Case Identification", "Algorithm Design", "Solution Verification", "Iterative Improvement"],
        resources: [
          { title: "How to Solve It", type: "book" },
          { title: "Problem Solving Frameworks", type: "article" }
        ]
      },
      {
        id: "problem-solving-patterns",
        title: "Common Problem Patterns",
        description: "Identify recurring patterns in algorithmic problems",
        concepts: ["Frequency Counter", "Two Pointers", "Sliding Window", "Divide & Conquer", "Multiple Pointers", "Dynamic Programming Patterns"],
        problems: ["Anagram Detection", "Pair Sum", "Maximum Subarray"]
      },
      {
        id: "problem-solving-visualization",
        title: "Problem Visualization",
        description: "Use visualization techniques to understand problems",
        concepts: ["Diagramming", "State Transitions", "Tree Visualization", "Graph Modeling", "Algorithm Animation"],
        resources: [
          { title: "Algorithm Visualizer", type: "interactive" },
          { title: "Visual Problem Solving", type: "video" }
        ]
      }
    ]
  },
  
  // DATA STRUCTURES - BASIC
  {
    id: "arrays-basics",
    title: "Arrays & Strings",
    description: "Learn to manipulate arrays and strings efficiently",
    icon: LayoutGrid,
    status: "completed",
    difficulty: "beginner",
    estimatedHours: 14,
    xpReward: 800,
    requiredIds: ["foundations"],
    topics: ["Array Manipulation", "String Operations", "Two Pointers", "Sliding Window", "Matrix Operations", "Subarrays & Subsequences"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "arrays-fundamentals",
        title: "Array Fundamentals",
        description: "Master basic array operations and implementations",
        concepts: ["Array Declaration & Initialization", "Indexing & Traversal", "Multi-dimensional Arrays", "Dynamic Arrays", "Array Slicing", "Array Methods"],
        problems: ["Array Reversal", "Rotation", "Finding Max/Min", "Second Largest Element"]
      },
      {
        id: "arrays-techniques",
        title: "Array Manipulation Techniques",
        description: "Learn advanced techniques for array manipulation",
        concepts: ["In-place Operations", "Two Pointers Technique", "Sliding Window", "Prefix Sum", "Kadane's Algorithm", "Dutch National Flag Algorithm"],
        problems: ["Two Sum", "Maximum Subarray", "Container With Most Water", "Trapping Rain Water"]
      },
      {
        id: "strings",
        title: "String Processing",
        description: "Manipulate and process string data",
        concepts: ["String Properties", "String Methods", "String Traversal", "Character Encoding", "String Immutability", "String Builder Pattern"],
        problems: ["Palindrome Check", "Anagram Verification", "String Reversal", "Word Count", "String Rotation"]
      },
      {
        id: "matrix",
        title: "2D Arrays & Matrices",
        description: "Work with multi-dimensional array data",
        concepts: ["Matrix Traversal", "Row/Column Operations", "Diagonal Traversal", "Matrix Rotation", "Spiral Traversal", "Matrix Multiplication"],
        problems: ["Rotate Image", "Spiral Matrix", "Search in 2D Matrix", "Matrix Transformation"]
      }
    ]
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Master singly, doubly, and circular linked lists",
    icon: LinkIcon,
    status: "available",
    difficulty: "intermediate",
    estimatedHours: 12,
    xpReward: 800,
    requiredIds: ["arrays-basics", "complexity"],
    topics: ["Singly Linked Lists", "Doubly Linked Lists", "Circular Linked Lists", "List Operations", "Two Pointer Technique"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "linkedlist-basics",
        title: "Linked List Fundamentals",
        description: "Understand the basic structure and operations",
        concepts: ["Node Structure", "Head/Tail Pointers", "Traversal", "Insertion", "Deletion", "Search", "Length Calculation"],
        problems: ["Implement Linked List", "Delete Node", "Find Middle", "Detect Cycle"]
      },
      {
        id: "linkedlist-types",
        title: "Types of Linked Lists",
        description: "Explore variations of linked list structures",
        concepts: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Dummy Head Technique", "Sentinel Nodes"],
        problems: ["Implement Doubly Linked List", "Convert Singly to Doubly", "Circular List Detection"]
      },
      {
        id: "linkedlist-operations",
        title: "Advanced Linked List Operations",
        description: "Master complex linked list manipulations",
        concepts: ["Reversing a List", "Merging Lists", "Partitioning", "Cycle Detection (Floyd's Algorithm)", "Deep Copy", "Intersection Finding"],
        problems: ["Reverse in K-Groups", "Remove Duplicates", "Merge Sorted Lists", "Copy List with Random Pointer"]
      }
    ]
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    description: "Learn LIFO and FIFO data structures and their applications",
    icon: Layers,
    status: "available",
    difficulty: "intermediate",
    estimatedHours: 10,
    xpReward: 700,
    requiredIds: ["arrays-basics", "linked-lists"],
    topics: ["Stack Operations", "Queue Operations", "Implementation Strategies", "Deques", "Priority Queues", "Monotonic Stacks"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "stack-basics",
        title: "Stack Fundamentals",
        description: "Master Last-In-First-Out (LIFO) structures",
        concepts: ["Push and Pop Operations", "Stack Top", "Array Implementation", "Linked List Implementation", "Stack Overflow/Underflow", "Stack Applications"],
        problems: ["Valid Parentheses", "Infix to Postfix", "Evaluate Expression", "Min Stack"]
      },
      {
        id: "queue-basics",
        title: "Queue Fundamentals",
        description: "Master First-In-First-Out (FIFO) structures",
        concepts: ["Enqueue and Dequeue Operations", "Front/Rear Pointers", "Array Implementation", "Linked List Implementation", "Circular Queue", "Queue Applications"],
        problems: ["Implement Queue using Stacks", "Circular Queue", "Generate Binary Numbers", "Sliding Window Maximum"]
      },
      {
        id: "advanced-variations",
        title: "Advanced Variations",
        description: "Explore specialized stack and queue structures",
        concepts: ["Double-ended Queue (Deque)", "Priority Queue", "Monotonic Stack", "Monotonic Queue", "Stack with Get Min/Max Operation"],
        problems: ["Implement Deque", "Sliding Window Maximum", "Next Greater Element", "Largest Rectangle in Histogram"]
      }
    ]
  },
  {
    id: "hash-structures",
    title: "Hash-Based Structures",
    description: "Understand hash tables, maps, sets and their implementations",
    icon: Database,
    status: "locked",
    difficulty: "intermediate",
    estimatedHours: 12,
    xpReward: 800,
    requiredIds: ["arrays-basics", "linked-lists"],
    topics: ["Hash Functions", "Collision Resolution", "Hash Maps", "Hash Sets", "Hash Tables", "Bloom Filters"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "hash-fundamentals",
        title: "Hashing Fundamentals",
        description: "Learn core concepts of hashing techniques",
        concepts: ["Hash Functions", "Collision Resolution", "Load Factor", "Rehashing", "Universal Hashing", "Perfect Hashing"],
        resources: [
          { title: "Hashing in Data Structures", type: "article" },
          { title: "Hash Function Visualization", type: "interactive" }
        ]
      },
      {
        id: "hash-implementations",
        title: "Hash Table Implementations",
        description: "Implement and use various hash structures",
        concepts: ["Direct Addressing", "Separate Chaining", "Open Addressing", "Linear Probing", "Quadratic Probing", "Double Hashing"],
        problems: ["Implement Hash Map", "LRU Cache", "First Unique Character", "Group Anagrams"]
      },
      {
        id: "hash-applications",
        title: "Practical Applications",
        description: "Apply hash structures to solve problems efficiently",
        concepts: ["Fast Lookups", "De-duplication", "Counting Elements", "Two-Sum Pattern", "Set Operations", "Caching Strategies"],
        problems: ["Two Sum", "Longest Consecutive Sequence", "Subarray Sum", "Design Twitter", "Implement LRU Cache"]
      }
    ]
  },
  
  // ALGORITHMS - CORE SEARCHING AND SORTING
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Master fundamental searching algorithms and their applications",
    icon: Search,
    status: "available", 
    difficulty: "intermediate",
    estimatedHours: 12,
    xpReward: 800,
    requiredIds: ["arrays-basics", "complexity"],
    topics: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search", "A* Search", "Jump Search"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "search-sequential",
        title: "Sequential Search Algorithms",
        description: "Learn algorithms that search elements sequentially",
        concepts: ["Linear Search", "Sentinel Linear Search", "Jump Search", "Block Search", "Interpolation Search"],
        problems: ["Find Element in Array", "Find First Occurrence", "Find Minimum/Maximum", "Find Range"]
      },
      {
        id: "search-binary",
        title: "Binary Search",
        description: "Master the divide and conquer searching technique",
        concepts: ["Basic Binary Search", "Recursive vs Iterative Implementation", "Finding Boundaries", "Rotated Array Search", "Search in 2D Sorted Array", "Binary Search on Answer"],
        problems: ["First Bad Version", "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", "Search Range", "Peak Element"]
      },
      {
        id: "search-graph",
        title: "Graph Traversal Search",
        description: "Apply search algorithms to graph structures",
        concepts: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Bi-directional Search", "A* Search", "Iterative Deepening", "Uniform Cost Search"],
        problems: ["Island Count", "Word Ladder", "Network Delay Time", "Path Finding", "Topological Sorting"]
      },
      {
        id: "search-applications",
        title: "Advanced Search Applications",
        description: "Apply searching techniques to complex problems",
        concepts: ["Search Space Reduction", "Meet in the Middle", "Two Pointers as Search", "Binary Search on Monotonic Functions", "Pruning Techniques"],
        problems: ["Median of Two Sorted Arrays", "Minimum Size Subarray Sum", "Split Array Largest Sum", "Capacity To Ship Packages"]
      }
    ]
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Learn various sorting techniques and their efficiency",
    icon: SortAsc,
    status: "available",
    difficulty: "intermediate",
    estimatedHours: 16,
    xpReward: 900,
    requiredIds: ["arrays-basics", "complexity"],
    topics: ["Comparison Sorts", "Distribution Sorts", "Hybrid Sorts", "External Sorting", "Stable vs Unstable Sorting"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "sorting-elementary",
        title: "Elementary Sorting Algorithms",
        description: "Understand basic sorting techniques",
        concepts: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Shell Sort", "Stability in Sorting", "In-place Sorting"],
        problems: ["Implement Bubble Sort", "Implement Insertion Sort", "Sort Small Arrays", "Nearly Sorted Arrays"]
      },
      {
        id: "sorting-efficient",
        title: "Efficient Sorting Algorithms",
        description: "Master algorithms with better time complexity",
        concepts: ["Merge Sort", "Quick Sort", "Heap Sort", "Tim Sort", "Intro Sort", "Divide and Conquer Sorting", "Partitioning Strategies"],
        problems: ["Implement Merge Sort", "Implement Quick Sort", "External Sort", "Sorting with Constraints"]
      },
      {
        id: "sorting-specialized",
        title: "Specialized Sorting Techniques",
        description: "Learn sorting algorithms for specific scenarios",
        concepts: ["Counting Sort", "Radix Sort", "Bucket Sort", "Topological Sort", "External Sorting", "Multi-key Sorting"],
        problems: ["Implement Counting Sort", "Sort Colors", "Top K Frequent Elements", "Course Schedule"]
      },
      {
        id: "sorting-applications",
        title: "Advanced Sorting Applications",
        description: "Apply sorting in complex problem solving",
        concepts: ["Custom Comparators", "Partial Sorting", "Sorting in Linear Time", "Multiple Criteria Sorting", "Stable vs Unstable Implications"],
        problems: ["Merge Intervals", "Meeting Rooms", "Largest Number", "Sort Characters By Frequency"]
      }
    ]
  },
  
  // ADVANCED DATA STRUCTURES
  {
    id: "trees",
    title: "Trees & Hierarchies",
    description: "Understand hierarchical data structures and their operations",
    icon: GitBranch,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 20,
    xpReward: 1200,
    requiredIds: ["linked-lists", "stacks-queues", "searching", "sorting"],
    topics: ["Binary Trees", "Binary Search Trees", "AVL Trees", "Red-Black Trees", "B-Trees", "Tries", "Heaps"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "trees-binary",
        title: "Binary Trees",
        description: "Master the fundamentals of binary tree structures",
        concepts: ["Tree Terminology", "Tree Traversals (Inorder, Preorder, Postorder, Level-order)", "Recursive vs Iterative Traversal", "Height & Depth", "Balanced vs Unbalanced Trees", "Complete vs Full Trees"],
        problems: ["Maximum Depth", "Symmetric Tree", "Path Sum", "Lowest Common Ancestor", "Serialize/Deserialize Binary Tree"]
      },
      {
        id: "trees-bst",
        title: "Binary Search Trees",
        description: "Learn ordered binary trees and their properties",
        concepts: ["BST Properties", "Search, Insert, Delete", "Validation", "Balancing Concept", "Inorder Traversal Properties", "Successor & Predecessor"],
        problems: ["Validate BST", "Convert Sorted Array to BST", "Kth Smallest Element", "BST Iterator", "Delete Node in BST"]
      },
      {
        id: "trees-balanced",
        title: "Balanced Trees",
        description: "Explore self-balancing tree structures",
        concepts: ["AVL Trees", "Red-Black Trees", "Splay Trees", "2-3 Trees", "B-Trees", "Rotation Operations", "Rebalancing Strategies"],
        problems: ["Implement AVL Tree", "Range Sum Query", "Count of Range Sum", "Implement Red-Black Tree"]
      },
      {
        id: "trees-heaps",
        title: "Heap Data Structures",
        description: "Master priority queue implementations",
        concepts: ["Binary Heap", "Min/Max Heap", "Heap Operations", "Heapify", "Build Heap", "Heap Sort", "Priority Queue Applications"],
        problems: ["Implement Heap", "Kth Largest Element", "Merge K Sorted Lists", "Find Median from Data Stream", "Top K Frequent Elements"]
      },
      {
        id: "trees-tries",
        title: "Trie Data Structures",
        description: "Learn prefix trees for efficient string operations",
        concepts: ["Trie Structure", "Insert, Search, Delete", "Prefix Matching", "Word Dictionary", "Compressed Tries", "Suffix Trees & Arrays"],
        problems: ["Implement Trie", "Word Search II", "Add and Search Word", "Replace Words", "Design Search Autocomplete System"]
      }
    ]
  },
  {
    id: "graphs",
    title: "Graph Theory & Structures",
    description: "Master graph representations and algorithms",
    icon: Network,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 25,
    xpReward: 1400,
    requiredIds: ["trees", "hash-structures"],
    topics: ["Graph Representations", "Graph Traversal", "Shortest Paths", "Minimum Spanning Tree", "Network Flow", "Strongly Connected Components"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "graphs-representation",
        title: "Graph Representations",
        description: "Learn various ways to represent graph data",
        concepts: ["Adjacency Matrix", "Adjacency List", "Edge List", "Implicit Graphs", "Directed vs Undirected", "Weighted vs Unweighted", "Sparse vs Dense Graphs"],
        problems: ["Implement Graph", "Clone Graph", "Convert Representations", "Find the Town Judge"]
      },
      {
        id: "graphs-traversal",
        title: "Graph Traversal Algorithms",
        description: "Master techniques for exploring graphs",
        concepts: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Topological Sorting", "Strongly Connected Components", "Biconnected Components", "Articulation Points & Bridges"],
        problems: ["Course Schedule", "Number of Islands", "Is Graph Bipartite?", "Critical Connections in a Network", "Evaluate Division"]
      },
      {
        id: "graphs-shortest-paths",
        title: "Shortest Path Algorithms",
        description: "Compute optimal paths in graphs",
        concepts: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm", "Johnson's Algorithm", "A* Search Algorithm", "Bidirectional Search"],
        problems: ["Network Delay Time", "Cheapest Flights Within K Stops", "Path With Minimum Effort", "Find the City With the Smallest Number of Neighbors"]
      },
      {
        id: "graphs-minimum-spanning",
        title: "Minimum Spanning Trees",
        description: "Connect all vertices with minimum total edge weight",
        concepts: ["Kruskal's Algorithm", "Prim's Algorithm", "Borůvka's Algorithm", "Disjoint-Set Data Structure", "Union-Find", "Path Compression", "Union by Rank"],
        problems: ["Min Cost to Connect All Points", "Connecting Cities With Minimum Cost", "Optimize Water Distribution"]
      },
      {
        id: "graphs-advanced",
        title: "Advanced Graph Algorithms",
        description: "Solve complex graph problems efficiently",
        concepts: ["Network Flow (Ford-Fulkerson, Edmonds-Karp)", "Bipartite Matching", "Tarjan's Algorithm", "2-SAT Problem", "Eulerian Path & Circuit", "Hamiltonian Path"],
        problems: ["Reconstruct Itinerary", "Redundant Connection", "Alien Dictionary", "Bus Routes", "Word Ladder"]
      }
    ]
  },
  {
    id: "disjoint-sets",
    title: "Disjoint-Set & Union-Find",
    description: "Efficiently track elements in disjoint sets",
    icon: Share2,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 8,
    xpReward: 700,
    requiredIds: ["trees"],
    topics: ["Disjoint-Set Operations", "Union by Rank", "Path Compression", "Applications in Graphs", "Cycle Detection", "Connected Components"],
    category: CATEGORIES.DATA_STRUCTURES,
    subtopics: [
      {
        id: "disjoint-set-fundamentals",
        title: "Union-Find Fundamentals",
        description: "Master the basics of disjoint-set data structure",
        concepts: ["Quick Find", "Quick Union", "Weighted Union", "Path Compression", "Amortized Analysis", "Forest Representation"],
        problems: ["Implement Union-Find", "Friend Circles", "Number of Connected Components"]
      },
      {
        id: "disjoint-set-applications",
        title: "Applications & Extensions",
        description: "Apply union-find to solve various problems",
        concepts: ["Kruskal's Algorithm", "Cycle Detection", "Connected Components", "Dynamic Connectivity", "Percolation", "Union-Find with Size Tracking"],
        problems: ["Redundant Connection", "Accounts Merge", "Satisfiability of Equality Equations", "Regions Cut By Slashes"]
      }
    ]
  },
  
  // ADVANCED ALGORITHMS
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    description: "Master recursive problem-solving techniques",
    icon: RotateCcw,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 18,
    xpReward: 1000,
    requiredIds: ["arrays-basics", "complexity", "trees"],
    topics: ["Recursion Fundamentals", "Recursive Trees", "Memoization", "Backtracking", "Branch & Bound", "State Space Trees"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "recursion-basics",
        title: "Recursion Fundamentals",
        description: "Understand recursive thinking and implementation",
        concepts: ["Recursive Functions", "Base Cases", "Recursive Case", "Call Stack", "Recursion Trees", "Head & Tail Recursion", "Multiple Recursion"],
        problems: ["Factorial", "Fibonacci", "Tower of Hanoi", "Pow(x, n)", "Merge Sort Implementation"]
      },
      {
        id: "recursion-advanced",
        title: "Advanced Recursive Patterns",
        description: "Apply recursion to complex problem structures",
        concepts: ["Divide & Conquer", "Master Theorem", "Recursive Substructure", "Tree-based Recursion", "Graph-based Recursion", "Mutual Recursion"],
        problems: ["Binary Tree Traversal", "Quick Sort Implementation", "N-Queens", "Sudoku Solver"]
      },
      {
        id: "backtracking-fundamentals",
        title: "Backtracking Strategy",
        description: "Master algorithmic technique for constraint satisfaction",
        concepts: ["State Space Tree", "Decision Tree", "Candidate Solutions", "Pruning", "Constraint Satisfaction", "Depth-First Exploration"],
        problems: ["Letter Combinations of Phone Number", "Generate Parentheses", "Combination Sum", "Subsets", "Permutations"]
      },
      {
        id: "backtracking-applications",
        title: "Practical Backtracking",
        description: "Apply backtracking to classic problems",
        concepts: ["Puzzle Solving", "Pathfinding", "Constraint Propagation", "Branch & Bound", "Optimization via Backtracking", "Game Trees & Minimax"],
        problems: ["N-Queens", "Sudoku Solver", "Word Search", "Palindrome Partitioning", "Word Break II"]
      }
    ]
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    description: "Solve optimization problems by making locally optimal choices",
    icon: SlidersHorizontal,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 12,
    xpReward: 900,
    requiredIds: ["sorting", "trees"],
    topics: ["Greedy Strategy", "Activity Selection", "Fractional Knapsack", "Huffman Coding", "Interval Scheduling", "Minimum Spanning Trees"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "greedy-fundamentals",
        title: "Greedy Principles",
        description: "Understand the principles behind greedy algorithms",
        concepts: ["Local Optimization", "Global Optimality", "Greedy Choice Property", "Optimal Substructure", "Exchange Arguments", "Matroid Theory"],
        resources: [
          { title: "Introduction to Greedy Algorithms", type: "article" },
          { title: "Proving Greedy Algorithms Correct", type: "video" }
        ]
      },
      {
        id: "greedy-scheduling",
        title: "Scheduling Problems",
        description: "Apply greedy techniques to time scheduling",
        concepts: ["Activity Selection", "Job Sequencing", "Interval Scheduling", "Deadline Scheduling", "Minimizing Lateness", "Interval Partitioning"],
        problems: ["Minimum Number of Arrows to Burst Balloons", "Non-overlapping Intervals", "Meeting Rooms II", "Task Scheduler"]
      },
      {
        id: "greedy-graph",
        title: "Greedy in Graph Algorithms",
        description: "Apply greedy approach to graph problems",
        concepts: ["Minimum Spanning Tree (Kruskal's, Prim's)", "Shortest Path (Dijkstra's)", "Huffman Coding", "Fractional Knapsack", "Optimal Merge Pattern"],
        problems: ["Min Cost to Connect All Points", "Connecting Cities With Minimum Cost", "Network Delay Time"]
      }
    ]
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Master optimal substructure and overlapping subproblems",
    icon: Infinity,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 30,
    xpReward: 1600,
    requiredIds: ["recursion-backtracking", "greedy-algorithms"],
    topics: ["Memoization", "Tabulation", "State Design", "Subproblems", "Optimization Problems", "String/Sequence Alignment", "Decision Problems"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "dp-fundamentals",
        title: "Dynamic Programming Principles",
        description: "Learn the core concepts of dynamic programming",
        concepts: ["Optimal Substructure", "Overlapping Subproblems", "Memoization", "Tabulation", "Bottom-up vs Top-down", "State Design", "DP vs Greedy"],
        problems: ["Fibonacci", "Coin Change", "Climbing Stairs", "House Robber", "Maximum Subarray"]
      },
      {
        id: "dp-patterns-1d",
        title: "1D Dynamic Programming",
        description: "Solve problems with linear state representation",
        concepts: ["Linear State DP", "Decision Making", "Kadane's Algorithm", "Prefix/Suffix Optimization", "State Transition", "Recurrence Relations"],
        problems: ["Maximum Subarray", "House Robber", "Decode Ways", "Word Break", "Perfect Squares", "Coin Change"]
      },
      {
        id: "dp-patterns-2d",
        title: "2D Dynamic Programming",
        description: "Master problems requiring grid or matrix state",
        concepts: ["Grid Problems", "Path Problems", "Matrix Chain Multiplication", "Interval Problems", "Game Theory Problems", "String DP Problems"],
        problems: ["Unique Paths", "Minimum Path Sum", "Edit Distance", "Longest Common Subsequence", "Regular Expression Matching"]
      },
      {
        id: "dp-optimization",
        title: "DP Optimization Techniques",
        description: "Improve space and time complexity of DP solutions",
        concepts: ["Space Optimization", "State Compression", "Divide & Conquer Optimization", "Knuth's Optimization", "Convex Hull Trick", "Monotonicity Optimization"],
        problems: ["Longest Increasing Subsequence (O(n log n))", "Knapsack with Space Optimization", "Burst Balloons", "Stone Game II"]
      },
      {
        id: "dp-advanced",
        title: "Advanced DP Applications",
        description: "Apply DP to complex problem domains",
        concepts: ["DP on Trees", "DP with Bitmasks", "DP with Probability", "Digit DP", "Interval DP", "DP with Data Structures"],
        problems: ["Count Different Palindromic Subsequences", "Number of Ways to Stay in the Same Place After Some Steps", "Partition to K Equal Sum Subsets"]
      }
    ]
  },
  {
    id: "divide-conquer",
    title: "Divide and Conquer",
    description: "Break problems into subproblems, solve and combine results",
    icon: Split,
    status: "locked",
    difficulty: "advanced",
    estimatedHours: 15,
    xpReward: 1000,
    requiredIds: ["complexity", "recursion-backtracking"],
    topics: ["Recursion Tree", "Master Theorem", "Binary Search", "Merge Sort", "Quick Sort", "Karatsuba Multiplication", "Closest Pair of Points"],
    category: CATEGORIES.ALGORITHMS,
    subtopics: [
      {
        id: "divide-conquer-principles",
        title: "Divide & Conquer Fundamentals",
        description: "Master the divide and conquer paradigm",
        concepts: ["Problem Decomposition", "Recursive Solutions", "Combining Solutions", "Recurrence Relations", "Master Theorem", "Complexity Analysis"],
        problems: ["Merge Sort", "Quick Sort", "Closest Pair of Points", "Karatsuba's Algorithm"]
      },
      {
        id: "divide-conquer-applications",
        title: "Practical Applications",
        description: "Apply the paradigm to various problem domains",
        concepts: ["Binary Search", "The Skyline Problem", "Maximum Subarray", "Strassen's Matrix Multiplication", "Convex Hull", "Quickselect"],
        problems: ["Median of Two Sorted Arrays", "Count of Range Sum", "The Skyline Problem", "Expression Evaluation"]
      }
    ]
  },
  {
    id: "advanced-algorithms",
    title: "Advanced Algorithm Techniques",
    description: "Master complex algorithmic techniques and paradigms",
    icon: Cpu,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 30,
    xpReward: 1800,
    requiredIds: ["dynamic-programming", "graphs", "divide-conquer"],
    topics: ["Amortized Analysis", "String Matching", "Computational Geometry", "Randomized Algorithms", "Approximation Algorithms", "Bit Manipulation"],
    category: CATEGORIES.ADVANCED,
    subtopics: [
      {
        id: "string-algorithms",
        title: "Advanced String Algorithms",
        description: "Master complex string processing techniques",
        concepts: ["KMP Algorithm", "Rabin-Karp Algorithm", "Suffix Trees", "Suffix Arrays", "Z Algorithm", "Aho-Corasick Algorithm", "Manacher's Algorithm"],
        problems: ["Implement strStr()", "Longest Palindromic Substring", "Shortest Palindrome", "Longest Duplicate Substring", "String Matching in an Array"]
      },
      {
        id: "bit-manipulation",
        title: "Bit Manipulation",
        description: "Leverage binary operations for efficient algorithms",
        concepts: ["Bitwise Operators", "Bit Tricks", "Bitmasks", "Power of Two", "Counting Bits", "Single Number", "Bitwise DP"],
        problems: ["Single Number", "Counting Bits", "Number of 1 Bits", "Bitwise AND of Numbers Range", "Sum of Two Integers"]
      },
      {
        id: "computational-geometry",
        title: "Computational Geometry",
        description: "Solve geometric problems algorithmically",
        concepts: ["Convex Hull", "Line Intersection", "Point Location", "Voronoi Diagrams", "Delaunay Triangulation", "Sweep Line Algorithms"],
        problems: ["Erect the Fence", "Skyline Problem", "Max Points on a Line", "Rectangle Area", "Robot Bounded in Circle"]
      },
      {
        id: "randomized-algorithms",
        title: "Randomized Algorithms",
        description: "Use randomization to design efficient algorithms",
        concepts: ["Monte Carlo Algorithms", "Las Vegas Algorithms", "Randomized Quicksort", "Reservoir Sampling", "Random Pivot Selection", "Karger's Algorithm"],
        problems: ["Shuffle an Array", "Random Pick with Weight", "Linked List Random Node", "Random Point in Non-overlapping Rectangles"]
      }
    ]
  },
  
  // REAL-WORLD APPLICATIONS
  {
    id: "system-design",
    title: "System Design & Optimization",
    description: "Apply DSA concepts to real-world system design challenges",
    icon: Server,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 35,
    xpReward: 2000,
    requiredIds: ["advanced-algorithms", "graphs"],
    topics: ["Caching Strategies", "Distributed Systems", "Database Design", "Load Balancing", "Horizontal vs Vertical Scaling", "Performance Optimization"],
    category: CATEGORIES.APPLICATION,
    subtopics: [
      {
        id: "system-design-principles",
        title: "System Design Fundamentals",
        description: "Learn core principles of large-scale system design",
        concepts: ["Scalability", "Reliability", "Availability", "Maintainability", "Load Balancing", "Caching", "Partitioning", "Concurrency"],
        resources: [
          { title: "System Design Primer", type: "article" },
          { title: "Designing Data-Intensive Applications", type: "book" }
        ]
      },
      {
        id: "distributed-systems",
        title: "Distributed Algorithms & Systems",
        description: "Design algorithms for distributed environments",
        concepts: ["Consensus Algorithms", "Distributed Hash Tables", "CAP Theorem", "Eventual Consistency", "Distributed Caching", "Distributed Search", "MapReduce"],
        problems: ["Design a Distributed Key-Value Store", "Implement Consistent Hashing", "Design a URL Shortener", "Design a Rate Limiter"]
      },
      {
        id: "database-optimization",
        title: "Database Systems & Optimization",
        description: "Apply DSA concepts to database design",
        concepts: ["Indexing Strategies", "Query Optimization", "Normalization", "Denormalization", "ACID Properties", "Transaction Isolation Levels", "B-Tree & LSM-Tree"],
        problems: ["Design a SQL Query Optimizer", "Implement a Simple Database", "Design Twitter's Timeline", "Design Facebook's News Feed"]
      },
      {
        id: "performance-optimization",
        title: "Performance Engineering",
        description: "Optimize systems for maximum efficiency",
        concepts: ["Profiling", "Bottleneck Analysis", "Memory Management", "CPU Optimizations", "I/O Optimizations", "Network Optimizations", "Algorithmic Improvements"],
        problems: ["Optimize Latency for Web Application", "Reduce Memory Usage", "Design High-Throughput System", "Scale to Millions of Users"]
      }
    ]
  },
  {
    id: "competitive-programming",
    title: "Competitive Programming",
    description: "Master techniques used in algorithmic competitions",
    icon: CodeSquare,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 40,
    xpReward: 2200,
    requiredIds: ["advanced-algorithms", "dynamic-programming"],
    topics: ["Contest Strategies", "Problem Solving Patterns", "Time Management", "Mathematical Foundations", "Advanced Data Structures", "String Processing"],
    category: CATEGORIES.APPLICATION,
    subtopics: [
      {
        id: "competitive-basics",
        title: "Competitive Programming Fundamentals",
        description: "Learn essential skills for algorithmic contests",
        concepts: ["Fast I/O", "Time/Space Complexity Management", "Problem Classification", "Template Code", "Problem Decomposition", "Contest Strategies", "Standard Library Usage"],
        resources: [
          { title: "Competitive Programmer's Handbook", type: "book" },
          { title: "USACO Guide", type: "documentation" }
        ]
      },
      {
        id: "competitive-techniques",
        title: "Advanced Competitive Techniques",
        description: "Master specialized algorithms for competitions",
        concepts: ["Square Root Decomposition", "Segment Trees", "Binary Indexed Trees", "Heavy-Light Decomposition", "Persistent Data Structures", "Treaps", "Sprague-Grundy Theorem"],
        problems: ["Range Sum Queries", "Lowest Common Ancestor", "Maximum Flow", "Bipartite Matching", "Game Theory Problems"]
      },
      {
        id: "mathematical-algorithms",
        title: "Mathematical Algorithms",
        description: "Apply mathematics to solve algorithmic problems",
        concepts: ["Number Theory", "Combinatorics", "Linear Algebra", "Probability", "Game Theory", "Modular Arithmetic", "Fast Fourier Transform"],
        problems: ["Prime Factorization", "Modular Exponentiation", "Matrix Exponentiation", "Counting Problems", "Expected Value Problems"]
      }
    ]
  },
  {
    id: "machine-learning-algorithms",
    title: "Machine Learning Algorithms",
    description: "Understand computational aspects of ML algorithms",
    icon: BrainCircuit,
    status: "locked",
    difficulty: "expert",
    estimatedHours: 45,
    xpReward: 2500,
    requiredIds: ["advanced-algorithms", "system-design"],
    topics: ["Gradient Descent", "Decision Trees", "Clustering", "Neural Networks", "Recommendation Systems", "Dimensionality Reduction"],
    category: CATEGORIES.APPLICATION,
    subtopics: [
      {
        id: "ml-algorithmic-foundations",
        title: "ML Algorithm Foundations",
        description: "Learn the computational principles behind ML",
        concepts: ["Gradient Descent", "Stochastic Gradient Descent", "Backpropagation", "K-means", "K-nearest Neighbors", "Decision Trees", "Random Forests"],
        resources: [
          { title: "Machine Learning for Algorithms Experts", type: "article" },
          { title: "Algorithms for ML", type: "video" }
        ]
      },
      {
        id: "ml-implementation",
        title: "ML Algorithm Implementation",
        description: "Implement core ML algorithms from scratch",
        concepts: ["Linear/Logistic Regression", "Neural Network Implementation", "SVMs", "PCA Implementation", "Decision Tree Implementation", "K-means Implementation"],
        problems: ["Implement Gradient Descent", "Build a Simple Neural Network", "Create K-means Clustering", "Code a Decision Tree"]
      },
      {
        id: "ml-optimization",
        title: "ML Algorithm Optimization",
        description: "Optimize ML algorithms for performance",
        concepts: ["Feature Hashing", "Approximate Nearest Neighbors", "Dimensionality Reduction", "Matrix Factorization", "Locality-Sensitive Hashing", "Pruning Techniques"],
        problems: ["Optimize Large-scale K-means", "Fast Nearest Neighbor Search", "Efficient Recommendation Systems", "Scalable Decision Trees"]
      }
    ]
  },
  {
    id: "interview-preparation",
    title: "Technical Interview Mastery",
    description: "Prepare for DSA-focused technical interviews",
    icon: ClipboardCheck,
    status: "locked",
    difficulty: "intermediate",
    estimatedHours: 30,
    xpReward: 1500,
    requiredIds: ["arrays-basics", "linked-lists", "stacks-queues", "hash-structures", "trees", "sorting", "searching"],
    topics: ["Problem Solving Strategies", "Communication Skills", "Code Quality", "Testing", "Edge Cases", "Time Management", "Common Interview Patterns"],
    category: CATEGORIES.APPLICATION,
    subtopics: [
      {
        id: "interview-strategies",
        title: "Interview Problem Solving",
        description: "Develop a systematic approach to interview problems",
        concepts: ["Problem Understanding", "Clarification Questions", "Algorithm Design", "Complexity Analysis", "Code Implementation", "Testing Strategy", "Optimization Approach"],
        resources: [
          { title: "Cracking the Coding Interview", type: "book" },
          { title: "Tech Interview Handbook", type: "documentation" }
        ]
      },
      {
        id: "interview-patterns",
        title: "Common Interview Patterns",
        description: "Master frequently appearing interview problem types",
        concepts: ["Two Pointers", "Sliding Window", "Fast & Slow Pointers", "Merge Intervals", "Cyclic Sort", "In-place Reversal of Linked List", "Tree BFS/DFS Patterns", "Subsets Pattern"],
        problems: ["Merge Intervals", "Cyclic Sort", "Tree Level Order Traversal", "Sliding Window Maximum", "Subsets", "Topological Sort"]
      },
      {
        id: "interview-company-specific",
        title: "Company-Specific Preparation",
        description: "Prepare for different company interview styles",
        concepts: ["Google Interview Format", "Amazon Leadership Principles", "Meta Coding Standards", "Microsoft Problem Types", "Startup vs Big Tech Interviews", "System Design Focus"],
        resources: [
          { title: "Company-Specific Interview Guides", type: "article" },
          { title: "Mock Interviews", type: "interactive" }
        ]
      },
      {
        id: "interview-practice",
        title: "Interview Practice Strategy",
        description: "Systematically practice for technical interviews",
        concepts: ["Spaced Repetition", "Mock Interviews", "Time-boxed Problem Solving", "Verbalization Techniques", "Code Review Practice", "Feedback Incorporation"],
        problems: ["LeetCode Top 100", "Company-Specific Questions", "System Design Case Studies", "Behavioral Question Preparation"]
      }
    ]
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic | null>(null);
  const [showSubtopics, setShowSubtopics] = useState<boolean>(false);
  // Track active filter
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Calculate overall progress
  const totalNodes = roadmapData.length;
  const completedNodes = roadmapData.filter(node => node.status === "completed").length;
  const inProgressNodes = roadmapData.filter(node => node.status === "in-progress").length;
  const progressPercentage = Math.round((completedNodes / totalNodes) * 100);

  // Get nodes by category helper function
  const getNodesByCategory = (category: string) => {
    return roadmapData.filter(node => node.category === category);
  };

  // Filter nodes by category
  const getFilteredNodes = () => {
    if (selectedFilter) {
      return roadmapData.filter(node => node.category === selectedFilter);
    }
    return roadmapData;
  };

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    // Set the filter instead of expanding
    setSelectedFilter(selectedFilter === category ? null : category);
    // Reset other states
    setExpandedCategory(null);
    setSelectedNode(null);
    setHighlightedPath([]);
    setSelectedSubtopic(null);
    setShowSubtopics(false);
  };

  // Show detailed category
  const showDetailedCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setSelectedNode(null);
    setHighlightedPath([]);
    setSelectedSubtopic(null);
    setShowSubtopics(false);
  };

  // Handle node click
  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
    setSelectedSubtopic(null);
    setShowSubtopics(true);
    
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
            <div className="order-2 md:order-1 md:col-span-2 lg:col-span-3 rounded-lg border border-border/60 bg-card/30 p-6 relative min-h-[600px] overflow-auto">
              {/* Category tabs for filtering */}
              <div className="mb-6 flex flex-wrap gap-2">
                {Object.values(CATEGORIES).map(category => (
                  <Badge 
                    key={category}
                    variant={selectedFilter === category ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 text-xs font-medium"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines between nodes */}
                {roadmapConnections.map((connection, i) => {
                  // Only show connections related to expanded category
                  const fromNode = roadmapData.find(n => n.id === connection.from);
                  const toNode = roadmapData.find(n => n.id === connection.to);
                  
                  if (!fromNode || !toNode) return null;
                  
                  // Skip if not in the current category or connected to the current category
                  if (selectedFilter && 
                      fromNode.category !== selectedFilter && 
                      toNode.category !== selectedFilter) {
                    return null;
                  }
                  
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
                      className="path-line"
                    />
                  );
                })}
              </svg>
              
              <div className="relative z-10">
                {expandedCategory ? (
                  // Show nodes from selected category
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getNodesByCategory(expandedCategory).map((node, i) => (
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
                            ? "ring-2 ring-primary ring-offset-2 shadow-lg transform scale-105 selected-node" 
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
                          <div className={`flex h-10 w-10 items-center justify-center rounded-md ${getStatusColor(node.status)}`}>
                            {node.status === "locked" ? (
                              <Lock size={18} />
                            ) : node.status === "completed" ? (
                              <Check size={18} />
                            ) : (
                              <node.icon size={18} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">{node.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{node.description}</p>
                            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                              <Badge variant="outline" className={`px-1.5 py-0 h-4 text-[10px] ${getDifficultyColor(node.difficulty)}`}>
                                {node.difficulty}
                              </Badge>
                              {node.status !== "locked" && (
                                <Badge variant="secondary" className="px-1.5 py-0 h-4 text-[10px]">
                                  <Sparkles size={10} className="mr-0.5" />
                                  {node.xpReward} XP
                                </Badge>
                              )}
                              {node.subtopics && (
                                <Badge variant="outline" className="px-1.5 py-0 h-4 text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">
                                  {node.subtopics.length} subtopics
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : selectedFilter ? (
                  // Show filtered nodes
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getNodesByCategory(selectedFilter).map((node, i) => (
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
                            ? "ring-2 ring-primary ring-offset-2 shadow-lg transform scale-105 selected-node" 
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
                          <div className={`flex h-10 w-10 items-center justify-center rounded-md ${getStatusColor(node.status)}`}>
                            {node.status === "locked" ? (
                              <Lock size={18} />
                            ) : node.status === "completed" ? (
                              <Check size={18} />
                            ) : (
                              <node.icon size={18} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">{node.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{node.description}</p>
                            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                              <Badge variant="outline" className={`px-1.5 py-0 h-4 text-[10px] ${getDifficultyColor(node.difficulty)}`}>
                                {node.difficulty}
                              </Badge>
                              {node.status !== "locked" && (
                                <Badge variant="secondary" className="px-1.5 py-0 h-4 text-[10px]">
                                  <Sparkles size={10} className="mr-0.5" />
                                  {node.xpReward} XP
                                </Badge>
                              )}
                              {node.subtopics && (
                                <Badge variant="outline" className="px-1.5 py-0 h-4 text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">
                                  {node.subtopics.length} subtopics
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Show all categories in a roadmap overview
                  <div className="space-y-6">
                    {Object.values(CATEGORIES).map((category, categoryIndex) => (
                      <motion.div 
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="space-y-3"
                      >
                        <h3 
                          className="text-sm font-medium flex items-center gap-2 cursor-pointer" 
                          onClick={() => showDetailedCategory(category)}
                        >
                          <ChevronRight size={16} className="text-muted-foreground" />
                          {category}
                          <Badge className="ml-2 px-1.5 py-0 text-[10px]">
                            {getNodesByCategory(category).length}
                          </Badge>
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {getNodesByCategory(category).slice(0, 3).map((node, i) => (
                            <motion.div
                              key={node.id}
                              custom={i}
                              initial="hidden"
                              animate="visible"
                              variants={nodeVariants}
                              onClick={() => handleNodeClick(node)}
                              className={`cursor-pointer p-3 rounded-md border transition-all duration-300 ${
                                node.status === "locked" ? "opacity-50" : ""
                              } border-border/60 bg-card hover:shadow-sm hover:border-border`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`flex h-6 w-6 items-center justify-center rounded-md ${getStatusColor(node.status)}`}>
                                  {node.status === "locked" ? (
                                    <Lock size={12} />
                                  ) : node.status === "completed" ? (
                                    <Check size={12} />
                                  ) : (
                                    <node.icon size={12} />
                                  )}
                                </div>
                                <h4 className="text-xs font-medium line-clamp-1">{node.title}</h4>
                              </div>
                            </motion.div>
                          ))}
                          
                          {getNodesByCategory(category).length > 3 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-center p-3 rounded-md border border-dashed border-border/60 cursor-pointer hover:border-border"
                              onClick={() => showDetailedCategory(category)}
                            >
                              <span className="text-xs text-muted-foreground">+{getNodesByCategory(category).length - 3} more</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
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
