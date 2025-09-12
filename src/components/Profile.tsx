import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Camera, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  Star, 
  Heart, 
  Eye, 
  MessageCircle,
  Settings,
  Share2,
  Plus,
  Grid,
  List
} from 'lucide-react';

const Profile: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'artworks'>('artworks');

  // Mock user data
  const user = {
    name: "Emma Johnson",
    username: "@emmajart",
    bio: "Digital artist passionate about creating colorful and imaginative artwork. Love painting landscapes and fantasy characters.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    coverImage: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
    location: "New York, USA",
    joinDate: "March 2023",
    website: "emmajohnson.art",
    email: "emma@example.com",
    stats: {
      artworks: 45,
      likes: 234
    },
    skills: ["Digital Painting", "Watercolor", "Character Design"]
  };

  // Mock artworks
  const artworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      likes: 234,
      views: 1250,
      comments: 45
    },
    {
      id: 2,
      title: "Ocean Waves",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      likes: 189,
      views: 890,
      comments: 32
    },
    {
      id: 3,
      title: "Forest Magic",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      likes: 312,
      views: 1580,
      comments: 67
    },
    {
      id: 4,
      title: "City Lights",
      image: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      likes: 156,
      views: 720,
      comments: 28
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cover Image & Profile Header */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl overflow-hidden">
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors duration-200">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
            <p className="text-purple-600 font-medium mb-3">{user.username}</p>
            <p className="text-gray-600 mb-4 max-w-2xl">{user.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>{user.website}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.stats.artworks}</div>
                <div className="text-sm text-gray-600">Artworks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('artworks')}
                className={`pb-2 border-b-2 font-medium transition-colors duration-200 ${
                  activeTab === 'artworks'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                My Artworks
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className={`bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group ${
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
                </div>
                
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{artwork.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{artwork.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {artworks.length === 0 && (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks yet</h3>
              <p className="text-gray-500">Start creating your first masterpiece!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;