import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye, 
  Filter, 
  Grid, 
  List, 
  Search,
  Star,
  TrendingUp
} from 'lucide-react';

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

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    // Mock artworks data
    const mockArtworks: Artwork[] = [
      {
        id: 1,
        title: "Sunset Dreams",
        artist: "Emma Johnson",
        artistAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        image: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        likes: 234,
        views: 1250,
        comments: 45,
        category: "Animals",
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
        category: "Nature",
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
        category: "Fantasy",
        timestamp: "1 day ago",
        featured: true
      },
      {
        id: 4,
        title: "City Lights",
        artist: "David Kim",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868319_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
        likes: 156,
        views: 720,
        comments: 28,
        category: "Abstract",
        timestamp: "2 days ago",
        featured: false
      },
      {
        id: 5,
        title: "Mountain Vista",
        artist: "Sarah Wilson",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
        likes: 278,
        views: 1340,
        comments: 52,
        category: "Nature",
        timestamp: "3 days ago",
        featured: false
      },
      {
        id: 6,
        title: "Abstract Flow",
        artist: "Lisa Park",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/01/31/13/05/aerosol-2023773_960_720.jpg",
        likes: 195,
        views: 980,
        comments: 38,
        category: "Abstract",
        timestamp: "4 days ago",
        featured: true
      },
      {
        id: 7,
        title: "Mount Kilimanjaro",
        artist: "Amina Hassan",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
        likes: 445,
        views: 2100,
        comments: 89,
        category: "Nature",
        timestamp: "1 day ago",
        featured: true
      },
      {
        id: 8,
        title: "Nile River Valley",
        artist: "Omar Juma",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868319_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png",
        likes: 267,
        views: 1450,
        comments: 56,
        category: "Nature",
        timestamp: "2 days ago",
        featured: false
      },
      {
        id: 9,
        title: "Baobab Forest",
        artist: "Grace Mwangi",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2912492_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
        likes: 389,
        views: 1890,
        comments: 73,
        category: "Nature",
        timestamp: "3 days ago",
        featured: true
      },
      {
        id: 10,
        title: "Serengeti Plains",
        artist: "John Mfalme",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
        likes: 523,
        views: 2340,
        comments: 98,
        category: "Nature",
        timestamp: "4 days ago",
        featured: false
      },
      {
        id: 11,
        title: "Indian Ocean Coral",
        artist: "Fatuma Ali",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/06/24/02/56/art-2436545_960_720.jpg",
        likes: 334,
        views: 1670,
        comments: 67,
        category: "Animals",
        timestamp: "5 days ago",
        featured: true
      },
      {
        id: 12,
        title: "African Elephants",
        artist: "Peter Kimani",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
        likes: 612,
        views: 2890,
        comments: 134,
        category: "Animals",
        timestamp: "6 days ago",
        featured: false
      },
      // Educational/Fun Categories Artworks
      {
        id: 13,
        title: "My Family Drawing",
        artist: "Amina Juma",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/09/23/21/21/kids-2779705_960_720.jpg",
        likes: 145,
        views: 680,
        comments: 23,
        category: "Abstract",
        timestamp: "1 day ago",
        featured: false
      },
      {
        id: 14,
        title: "Rainbow Painting",
        artist: "Hassan Ali",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868319_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png",
        likes: 234,
        views: 1120,
        comments: 45,
        category: "Fantasy",
        timestamp: "2 days ago",
        featured: true
      },
      {
        id: 15,
        title: "Paper Flower Craft",
        artist: "Fatma Said",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2912492_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
        likes: 189,
        views: 890,
        comments: 34,
        category: "Nature",
        timestamp: "3 days ago",
        featured: false
      },
      {
        id: 16,
        title: "Solar System Model",
        artist: "Omar Hassan",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
        likes: 312,
        views: 1450,
        comments: 67,
        category: "Fantasy",
        timestamp: "4 days ago",
        featured: true
      },
      {
        id: 17,
        title: "Lion and Cubs",
        artist: "Mwalimu John",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
        likes: 445,
        views: 2100,
        comments: 89,
        category: "Animals",
        timestamp: "5 days ago",
        featured: false
      },
      {
        id: 18,
        title: "Rocket to Mars",
        artist: "Zuberi Mwangi",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
        likes: 278,
        views: 1340,
        comments: 52,
        category: "Fantasy",
        timestamp: "6 days ago",
        featured: true
      },
      {
        id: 19,
        title: "Simba the Lion King",
        artist: "Neema Juma",
        artistAvatar: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/09/23/21/21/kids-2779705_960_720.jpg",
        likes: 356,
        views: 1680,
        comments: 78,
        category: "Fantasy",
        timestamp: "1 week ago",
        featured: false
      },
      {
        id: 20,
        title: "Maasai Traditional Dance",
        artist: "Sankale Ole Kina",
        artistAvatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868319_960_720.jpg",
        image: "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png",
        likes: 523,
        views: 2340,
        comments: 98,
        category: "Abstract",
        timestamp: "1 week ago",
        featured: true
      }
    ];

    setArtworks(mockArtworks);
  }, []);

  const handleLike = (artworkId: number) => {
    setArtworks(artworks.map(artwork => 
      artwork.id === artworkId 
        ? { ...artwork, likes: artwork.likes + 1 }
        : artwork
    ));
  };

  const categories = [
    { 
      id: 'all', 
      name: 'Vyote', 
      emoji: '🎨',
      image: 'https://cdn.pixabay.com/photo/2017/09/23/21/21/kids-2779705_960_720.jpg'
    },
    { 
      id: 'Animals', 
      name: 'Wanyamapori', 
      emoji: '🐶',
      image: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg'
    },
    { 
      id: 'Nature', 
      name: 'Mazingira', 
      emoji: '🌳',
      image: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg'
    },
    { 
      id: 'Fantasy', 
      name: 'Hadithi', 
      emoji: '🌈',
      image: 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png'
    },
    { 
      id: 'Abstract', 
      name: 'Sanaa', 
      emoji: '🎨',
      image: 'https://cdn.pixabay.com/photo/2017/01/31/13/05/aerosol-2023773_960_720.jpg'
    }
  ];
  
  const filteredArtworks = artworks.filter(artwork => 
    filterCategory === 'all' || artwork.category === filterCategory
  );

  // Always sort by most recent for kids
  const sortedArtworks = [...filteredArtworks].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
            🎨 Ukumbi wa Sanaa
          </h1>
          <p className="text-purple-600 text-lg font-medium">
            Chora, hifadhi, na uonyeshe kazi zako hapa! ✨
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'grid' 
                ? 'bg-pink-100 text-pink-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'list' 
                ? 'bg-pink-100 text-pink-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-pink-200">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center justify-center">
            <Filter className="w-5 h-5 mr-2" />
            Chagua aina ya sanaa:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-1 sm:space-x-3 ${
                  filterCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-purple-700 hover:bg-pink-100 border-2 border-pink-200 hover:border-pink-300 hover:scale-105'
                }`}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover border-2 border-white/50"
                />
                <span className="text-base sm:text-lg">{category.emoji}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Stats for Kids */}
      <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl p-4 sm:p-6 border-2 border-pink-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center justify-center">
            ⭐ Takwimu za Kufurahisha!
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white/70 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl mb-1">🎨</div>
              <div className="text-base sm:text-lg font-bold text-purple-700">{sortedArtworks.length}</div>
              <div className="text-xs text-purple-600">Picha</div>
            </div>
            <div className="bg-white/70 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl mb-1">❤️</div>
              <div className="text-base sm:text-lg font-bold text-pink-700">
                {sortedArtworks.reduce((sum, art) => sum + art.likes, 0)}
              </div>
              <div className="text-xs text-pink-600">Likes</div>
            </div>
            <div className="bg-white/70 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl mb-1">👀</div>
              <div className="text-base sm:text-lg font-bold text-blue-700">
                {sortedArtworks.reduce((sum, art) => sum + art.views, 0).toLocaleString()}
              </div>
              <div className="text-xs text-blue-600">Views</div>
            </div>
            <div className="bg-white/70 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl mb-1">⭐</div>
              <div className="text-base sm:text-lg font-bold text-yellow-700">
                {sortedArtworks.filter(art => art.featured).length}
              </div>
              <div className="text-xs text-yellow-600">Top</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {sortedArtworks.map((artwork) => (
          <div
            key={artwork.id}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
              <img
                src={artwork.image}
                alt={artwork.title}
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                }`}
              />
              {artwork.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <Star className="w-3 h-3" />
                    <span>Maarufu</span>
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={artwork.artistAvatar}
                  alt={artwork.artist}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{artwork.title}</h3>
                  <p className="text-sm text-gray-600">na {artwork.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-pink-200">
                  {categories.find(cat => cat.id === artwork.category)?.emoji} {categories.find(cat => cat.id === artwork.category)?.name || artwork.category}
                </span>
                <span>{artwork.timestamp}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(artwork.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors duration-200 hover:scale-110"
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
                <button className="text-gray-600 hover:text-purple-500 transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center px-2">
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all duration-200 hover:scale-105">
          <span>🎨 Ona Zaidi! 🌟</span>
        </button>
      </div>
    </div>
  );
};

export default Gallery;