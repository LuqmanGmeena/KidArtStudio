import React, { useState } from 'react';
import { 
  Sun, 
  Cloud, 
  TreePine, 
  Flower, 
  Fish, 
  Bird, 
  Home, 
  Car,
  Recycle,
  Droplets,
  Wind,
  Leaf,
  Globe,
  Heart,
  Users,
  Camera,
  MapPin,
  Calendar,
  Clock,
  Thermometer,
  Palette,
  Brush,
  Download,
  TrendingUp,
  Eraser,
  Undo,
  Redo,
  Share2,
  Award,
  User,
  Lock,
  Mail,
  Phone,
  DollarSign,
  CreditCard,
  CheckCircle,
  Save
} from 'lucide-react';
import { Target } from 'lucide-react';

interface DrawingTemplate {
  id: number;
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  description: string;
  steps: string[];
}

const DailyEnvironment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'nature' | 'home' | 'community' | 'conservation'>('nature');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'payment'>('login');
  const [selectedTemplate, setSelectedTemplate] = useState<DrawingTemplate | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'child' | 'woman' | ''>('');
  const [activeSection, setActiveSection] = useState<'templates' | 'facts'>('templates');
  const [showDrawingArea, setShowDrawingArea] = useState(false);
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#2563eb');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Environment colors for drawing
  const environmentColors = [
    '#228B22', '#32CD32', '#90EE90', '#98FB98', // Greens
    '#87CEEB', '#4169E1', '#0000FF', '#1E90FF', // Blues
    '#8B4513', '#A0522D', '#D2691E', '#CD853F', // Browns
    '#FFD700', '#FFA500', '#FF6347', '#FF4500', // Warm colors
    '#800080', '#9370DB', '#BA55D3', '#DDA0DD', // Purples
    '#000000', '#696969', '#A9A9A9', '#FFFFFF'  // Neutrals
  ];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-environment-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    if (currentTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawingTemplates: DrawingTemplate[] = [
    {
      id: 1,
      name: "Baobab Tree",
      category: "Landscape",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Draw Kenya's famous Baobab tree with its thick trunk",
      steps: [
        "Draw a very thick trunk (wider at bottom)",
        "Add short, thick branches at the top",
        "Draw small leaves at branch ends",
        "Add texture lines on the trunk",
        "Color with brown trunk and green leaves"
      ]
    },
    {
      id: 2,
      name: "Shark in Ocean",
      category: "Watercolor",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Paint a shark swimming in blue ocean waters",
      steps: [
        "Draw shark body shape (triangle-like)",
        "Add fins and tail",
        "Draw sharp teeth and eyes",
        "Paint ocean waves around shark",
        "Use blue and gray watercolors"
      ]
    },
    {
      id: 3,
      name: "Octopus Garden",
      category: "Watercolor", 
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Paint a colorful octopus with 8 tentacles underwater",
      steps: [
        "Draw round octopus head",
        "Add 8 curvy tentacles with suction cups",
        "Draw big eyes and mouth",
        "Add seaweed and coral around",
        "Use purple, pink and blue watercolors"
      ]
    },
    {
      id: 4,
      name: "Mount Kenya",
      category: "Landscape",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Draw Kenya's highest mountain with snow cap",
      steps: [
        "Draw mountain peak with snow on top",
        "Add rocky slopes and valleys",
        "Draw trees at the mountain base",
        "Add clouds around the peak",
        "Use brown, green and white colors"
      ]
    },
    {
      id: 5,
      name: "Rift Valley",
      category: "Landscape",
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Draw the Great Rift Valley with its deep valleys",
      steps: [
        "Draw deep valley between two hills",
        "Add escarpments (steep cliffs)",
        "Draw a lake at the valley bottom",
        "Add acacia trees on the slopes",
        "Use earth tones and blue for water"
      ]
    },
    {
      id: 6,
      name: "Tropical Fish",
      category: "Watercolor",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Paint colorful tropical fish swimming together",
      steps: [
        "Draw different fish shapes (round, long)",
        "Add fins, tails and eyes",
        "Draw scales with curved lines",
        "Add bubbles and seaweed",
        "Use bright yellow, orange and blue"
      ]
    },
    {
      id: 7,
      name: "Savanna Sunset",
      category: "Landscape",
      difficulty: "Medium",
      image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      description: "Draw African savanna with acacia trees at sunset",
      steps: [
        "Draw flat horizon line",
        "Add acacia trees (umbrella shape)",
        "Draw big sun setting behind trees",
        "Add grass and small bushes",
        "Use orange, red and yellow for sunset"
      ]
    },
    {
      id: 8,
      name: "Jellyfish Dance",
      category: "Watercolor",
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=300&h=200&q=80",
      description: "Paint graceful jellyfish floating in deep blue sea",
      steps: [
        "Draw bell-shaped jellyfish body",
        "Add long flowing tentacles",
        "Draw smaller jellyfish around",
        "Add light rays from above",
        "Use transparent blues and purples"
      ]
    }
  ];

  const environmentFacts = {
    nature: [
      {
        title: "Trees Clean Our Air",
        description: "One tree can produce oxygen for 2 people every day!",
        icon: TreePine,
        color: "bg-green-100 text-green-600"
      },
      {
        title: "Water Cycle",
        description: "Water evaporates, forms clouds, and comes back as rain",
        icon: Droplets,
        color: "bg-blue-100 text-blue-600"
      },
      {
        title: "Animal Homes",
        description: "Every animal needs a safe place to live and find food",
        icon: Bird,
        color: "bg-orange-100 text-orange-600"
      }
    ],
    conservation: [
      {
        title: "Reduce, Reuse, Recycle",
        description: "Help save our planet by using less and recycling more",
        icon: Recycle,
        color: "bg-green-100 text-green-600"
      },
      {
        title: "Save Water",
        description: "Turn off taps and take shorter showers to save water",
        icon: Droplets,
        color: "bg-blue-100 text-blue-600"
      },
      {
        title: "Plant Trees",
        description: "Planting trees helps clean the air and provides homes for animals",
        icon: Leaf,
        color: "bg-green-100 text-green-600"
      }
    ]
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'woman') {
      setAuthMode('payment');
    } else {
      setIsLoggedIn(true);
      setShowAuth(false);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleStartDrawingTemplate = (template: DrawingTemplate) => {
    if (!isLoggedIn) {
      setShowAuth(true);
      return;
    }
    setSelectedTemplate(template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center px-4">
        <div className="flex items-center justify-center mb-4">
          <Globe className="w-8 h-8 md:w-12 md:h-12 text-green-500 mr-2 md:mr-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Our Daily Environment</h1>
        </div>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Learn about our environment through art! Draw trees, flowers, and nature scenes while discovering how to protect our planet.
        </p>
      </div>

      {/* Auth Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100 gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          <span className="text-sm sm:text-base text-gray-700">
            {isLoggedIn ? 'Welcome back! Ready to create art?' : 'Login to start drawing'}
          </span>
        </div>
        {!isLoggedIn && (
          <button
            onClick={() => setShowAuth(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 w-full sm:w-auto"
          >
            Login / Register
          </button>
        )}
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('nature')}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ${
              selectedCategory === 'nature'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🌿 Nature
          </button>
          <button
            onClick={() => setSelectedCategory('conservation')}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ${
              selectedCategory === 'conservation'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ♻️ Conservation
          </button>
        </div>
      </div>

      {/* Drawing Templates */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 mr-2" />
          Drawing Templates - Learn Through Art
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {drawingTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleStartDrawingTemplate(template)}
            >
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    template.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    template.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {template.difficulty}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Brush className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {template.steps.length} steps
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Facts */}
      {activeSection === 'facts' && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 mr-2" />
          {selectedCategory === 'nature' ? '🌿 Learn About Nature' : '♻️ Conservation Tips'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {environmentFacts[selectedCategory]?.map((fact, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${fact.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                <fact.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{fact.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{fact.description}</p>
            </div>
          ))}
        </div>
        
        {selectedCategory === 'nature' && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2" />
              Fun Nature Facts for Kids!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-600">🌳</span>
                <p>A single tree can produce enough oxygen for 2 people per day!</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">💧</span>
                <p>Water covers about 71% of Earth's surface.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-600">🐝</span>
                <p>Bees help pollinate 1/3 of all the food we eat!</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-600">🦋</span>
                <p>Butterflies taste with their feet!</p>
              </div>
            </div>
          </div>
        )}
        
        {selectedCategory === 'conservation' && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <Recycle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2" />
              How Kids Can Help Save Our Planet!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-600">♻️</span>
                <p>Always put recyclable items in the right bins.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">💧</span>
                <p>Turn off the tap while brushing your teeth.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-600">💡</span>
                <p>Switch off lights when leaving a room.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600">🌱</span>
                <p>Plant flowers or vegetables in your garden.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Economic Impact Section */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-0 sm:mr-3" />
            Building Kenya's Future Through Art & Environment
          </h2>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-4xl mx-auto px-2">
            Kwa kujifunza kuchora mazingira, watoto wanakuwa environmental champions na artists wa kesho. 
            Hii inasaidia kuongeza tourism, art industry, na environmental conservation - kujenga uchumi mkuu wa Kenya!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center bg-white/10 rounded-xl p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Target className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Critical Thinking</h3>
            <p className="text-xs sm:text-sm opacity-90">Watoto wanajifunza kufikiri kwa kina kuhusu mazingira na jinsi ya kuyalinda</p>
          </div>
          
          <div className="text-center bg-white/10 rounded-xl p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Future Careers</h3>
            <p className="text-xs sm:text-sm opacity-90">Kuanzisha njia za kazi za art, design, environmental science na tourism</p>
          </div>
          
          <div className="text-center bg-white/10 rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Economic Growth</h3>
            <p className="text-xs sm:text-sm opacity-90">Kuongeza creative economy, eco-tourism na environmental awareness nchini Tanzania</p>
          </div>
        </div>
      </div>

      {/* Daily Environment Drawing Area */}
      {showDrawingArea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Palette className="w-7 h-7 text-purple-600 mr-2" />
                  Draw Your Daily Environment 🌍
                </h2>
                <button
                  onClick={() => setShowDrawingArea(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Enhanced Tools Panel */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Drawing Tools */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Brush className="w-5 h-5 text-purple-600 mr-2" />
                      Tools
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => setCurrentTool('brush')}
                        className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-1 ${
                          currentTool === 'brush' 
                            ? 'bg-purple-100 text-purple-600 border-2 border-purple-300' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Brush className="w-5 h-5" />
                        <span className="text-xs">Brush</span>
                      </button>
                      
                      <button
                        onClick={() => setCurrentTool('eraser')}
                        className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-1 ${
                          currentTool === 'eraser' 
                            ? 'bg-purple-100 text-purple-600 border-2 border-purple-300' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Eraser className="w-5 h-5" />
                        <span className="text-xs">Eraser</span>
                      </button>
                    </div>

                    {/* Brush Size */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size: {brushSize}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={clearCanvas}
                        className="w-full p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors duration-200"
                      >
                        Clear Canvas
                      </button>
                      <button
                        onClick={downloadDrawing}
                        className="w-full p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Color Palette */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Environment Colors</h3>
                    
                    <div className="mb-4">
                      <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                        className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                    </div>
                    
                    <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
                      {environmentColors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setBrushColor(color)}
                          className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
                            brushColor === color 
                              ? 'border-gray-800 scale-110' 
                              : 'border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Drawing Prompts */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      Drawing Ideas
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>🌳 Draw trees in your neighborhood</p>
                      <p>🏠 Show your home environment</p>
                      <p>🌸 Add flowers and plants you see</p>
                      <p>🦋 Include animals and insects</p>
                      <p>☀️ Draw the weather today</p>
                      <p>🚗 Show how people move around</p>
                      <p>♻️ Add recycling symbols</p>
                    </div>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        🎨 Create Your Environment Story
                      </h3>
                      <p className="text-sm text-gray-600">
                        Chora mazingira yako ya kila siku. Onyesha miti, nyumba, wanyamapori, na vitu vingine unavyoona karibu nawe!
                      </p>
                    </div>
                    
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-full h-96 border border-gray-300 rounded-lg cursor-crosshair bg-white"
                    />
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                        <Save className="w-4 h-4" />
                        <span>Save to Gallery</span>
                      </button>
                      <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>Share with Friends</span>
                      </button>
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>Submit for Contest</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md my-4">
            {authMode === 'login' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-4">
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-green-600 hover:text-green-700 text-sm sm:text-base font-medium"
                  >
                    Don't have an account? Register
                  </button>
                </div>
              </div>
            )}

            {authMode === 'register' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="radio"
                          name="userType"
                          value="child"
                          onChange={(e) => setUserType(e.target.value as 'child' | 'woman')}
                          className="mr-2"
                        />
                        Child (Free Access)
                      </label>
                      <label className="flex items-center text-sm">
                        <input
                          type="radio"
                          name="userType"
                          value="woman"
                          onChange={(e) => setUserType(e.target.value as 'child' | 'woman')}
                          className="mr-2"
                        />
                        Woman seeking employment (30,000 KSH activation fee)
                        Woman seeking employment (70,000 Tshs activation fee)
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!userType}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200"
                  >
                    {userType === 'woman' ? 'Proceed to Payment' : 'Register'}
                  </button>
                </form>
                <div className="text-center mt-4">
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-green-600 hover:text-green-700 text-sm sm:text-base font-medium"
                  >
                    Already have an account? Login
                  </button>
                </div>
              </div>
            )}

            {authMode === 'payment' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">Activation Payment</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 text-yellow-600 mr-2" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-yellow-800">Activation Fee: 70,000 Tshs</h3>
                      <p className="text-xs sm:text-sm text-yellow-700">This fee helps us provide job training and support for women</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select className="w-full px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>M-Pesa</option>
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (M-Pesa)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    Complete Payment
                  </button>
                </form>
              </div>
            )}

            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Drawing Tutorial Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-2xl max-h-[90vh] overflow-y-auto my-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 pr-4">{selectedTemplate.name}</h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-gray-600 text-xl flex-shrink-0"
              >
                ✕
              </button>
            </div>
            
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.name}
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4"
            />
            
            <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedTemplate.description}</p>
            
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Step-by-step guide:</h3>
            <ol className="space-y-2 mb-6">
              {selectedTemplate.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center">
                <Brush className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Drawing
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyEnvironment;