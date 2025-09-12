import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Settings, 
  Bell, 
  Search,
  Star,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Palette,
  Brush,
  Image,
  Award,
  Users,
  BookOpen,
  Play,
  Download,
  Eye,
  Coins
} from 'lucide-react';
import { userService } from './services/userService';
import Header from './components/Header';
import Gallery from './components/Gallery';
import DrawingCanvas from './components/DrawingCanvas';
import Profile from './components/Profile';
import EarningsPage from './components/EarningsPage';
import Subscription from './components/Subscription';
import DailyEnvironment from './components/DailyEnvironment';
import AuthSystem from './components/AuthSystem';
import PaymentActivation from './components/PaymentActivation';
import PoolSystem from './components/PoolSystem';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  artistAvatar: string;
  image: string;
  likes: number;
  views: number;
  comments: number;
  category: string;
  timestamp: string;
  featured: boolean;
}

interface Tutorial {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: number;
  rating: number;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsPayment, setNeedsPayment] = useState(false);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = userService.onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const userProfile = await userService.getUserProfile(firebaseUser.uid);
        if (userProfile) {
          setUser(userProfile);
          setIsAuthenticated(true);
          setNeedsPayment(!userProfile.isActive);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setNeedsPayment(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Mock artworks data
    const mockArtworks: Artwork[] = [
      {
        id: 1,
        title: "Sunset Dreams",
        artist: "Emma Joh",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/09/23/21/21/kids-2779705_960_720.jpg",
        likes: 234,
        views: 1250,
        comments: 45,
        category: "Digital Painting",
        timestamp: "2 hours ago",
        featured: true
      },
      {
        id: 2,
        title: "Ocean Waves",
        artist: "Alex Chen",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/06/24/02/56/art-2436545_960_720.jpg",
        likes: 189,
        views: 890,
        comments: 32,
        category: "Watercolor",
        timestamp: "5 hours ago",
        featured: false
      },
      {
        id: 3,
        title: "Forest Magic",
        artist: "Maria Rodriguez",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2912492_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_960_720.jpg",
        likes: 312,
        views: 1580,
        comments: 67,
        category: "Fantasy Art",
        timestamp: "1 day ago",
        featured: true
      }
    ];

    const mockTutorials: Tutorial[] = [
      {
        id: 1,
        title: "Digital Painting Basics",
        instructor: "Sarah Wilson",
        thumbnail: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        duration: "45 min",
        difficulty: "Beginner",
        views: 2340,
        rating: 4.8
      },
      {
        id: 2,
        title: "Advanced Color Theory",
        instructor: "David Kim",
        thumbnail: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        duration: "1h 20min",
        difficulty: "Advanced",
        views: 1890,
        rating: 4.9
      },
      {
        id: 3,
        title: "Character Design Workshop",
        instructor: "Lisa Park",
        thumbnail: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        duration: "2h 15min",
        difficulty: "Intermediate",
        views: 3120,
        rating: 4.7
      }
    ];

    setArtworks(mockArtworks);
    setTutorials(mockTutorials);
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setNeedsPayment(!userData.isActive);
  };

  const handleActivationSuccess = () => {
    const updatedUser = { ...user, isActive: true };
    setUser(updatedUser);
    setNeedsPayment(false);
  };

  const handleLike = (artworkId: number) => {
    setArtworks(artworks.map(artwork => 
      artwork.id === artworkId 
        ? { ...artwork, likes: artwork.likes + 1 }
        : artwork
    ));
  };

  const filteredArtworks = artworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthSystem onAuthSuccess={handleAuthSuccess} />;
  }

  // Show payment screen if user needs to pay
  if (needsPayment) {
    return <PaymentActivation user={user} onActivationSuccess={handleActivationSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to KidArt Studio! 🎨
                </h1>
                <p className="text-purple-100 text-lg mb-6 max-w-2xl">
                  Unleash your creativity with our digital art platform. Create, learn, and share amazing artwork with artists from around the world.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('create')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <Brush className="w-5 h-5" />
                    <span>Start Creating</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <Image className="w-5 h-5" />
                    <span>Explore Gallery</span>
                  </button>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full"></div>
            </div>

            {/* Featured Artworks */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <span>Featured Artworks</span>
                </h2>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1"
                >
                  <span>View All</span>
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.filter(artwork => artwork.featured).map((artwork) => (
                  <div
                    key={artwork.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={artwork.artistAvatar}
                          alt={artwork.artist}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{artwork.title}</h3>
                          <p className="text-sm text-gray-600">by {artwork.artist}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                          {artwork.category}
                        </span>
                        <span>{artwork.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(artwork.id)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{artwork.likes}</span>
                          </button>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{artwork.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{artwork.comments}</span>
                          </div>
                        </div>
                        <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tutorials Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                  <BookOpen className="w-8 h-8 text-blue-500" />
                  <span>Art Tutorials</span>
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                  <span>View All</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Play className="w-6 h-6 text-blue-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {tutorial.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">by {tutorial.instructor}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{tutorial.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-gray-600">{tutorial.rating}</span>
                          </div>
                        </div>
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
                          Watch
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Community Stats */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Users className="w-7 h-7 text-green-500" />
                <span>Community Stats</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">12.5K</div>
                  <div className="text-gray-600">Artists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">45.2K</div>
                  <div className="text-gray-600">Artworks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">128</div>
                  <div className="text-gray-600">Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">89K</div>
                  <div className="text-gray-600">Likes</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'create' && <DrawingCanvas />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'earnings' && <EarningsPage />}
        {activeTab === 'subscription' && <Subscription />}
        {activeTab === 'environment' && <DailyEnvironment />}
        {activeTab === 'pool' && <PoolSystem userContribution={user?.contribution} isActive={user?.isActive} />}
      </main>
    </div>
  );
}

export default App;