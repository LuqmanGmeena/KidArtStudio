import React, { useRef, useEffect, useState } from 'react';
import { ArtworkService, Artwork } from '../services/artworkService';
import { 
  Palette, 
  Brush, 
  Eraser, 
  Download, 
  Trash2, 
  Undo, 
  Redo,
  Circle,
  Square,
  Minus,
  Save,
  Image,
  Layers,
  Upload,
  Star,
  Heart,
  Smile,
  Sun,
  TreePine,
  Home,
  Car,
  Fish,
  Bird,
  Flower,
  Cloud,
  Wifi,
  WifiOff
} from 'lucide-react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [savedArtworks, setSavedArtworks] = useState<any[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const stickers = ['😊', '🌟', '❤️', '🌈'];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#FFA500', '#800080', '#FFC0CB', '#90EE90', '#87CEEB', '#FFFFFF'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial canvas background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);


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

  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

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

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const stopDrawingTouch = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveArtwork = async () => {
    if (!artworkTitle.trim()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSaving(true);

    try {
      const imageData = canvas.toDataURL();

      // Save to local storage
      const artwork = {
        id: Date.now().toString(),
        title: artworkTitle,
        artist: 'Young Artist',
        imageData,
        createdAt: new Date().toISOString(),
        likes: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 200)
      };

      const existingArtworks = JSON.parse(localStorage.getItem('kidArtworks') || '[]');
      existingArtworks.unshift(artwork);
      localStorage.setItem('kidArtworks', JSON.stringify(existingArtworks));

      loadSavedArtworks();
      
      alert('🎉 Your amazing artwork has been saved! Great job! 🎨');
      setShowSaveModal(false);
      setArtworkTitle('');
      
    } catch (error) {
      console.error('Error saving artwork:', error);
      alert('Sorry, there was an error saving your artwork. Please try again. 😔');
    } finally {
      setIsSaving(false);
    }
  };

  const loadSavedArtworks = () => {
    const saved = JSON.parse(localStorage.getItem('kidArtworks') || '[]');
    setSavedArtworks(saved);
  };

  useEffect(() => {
    loadSavedArtworks();
  }, []);

  const addSticker = (sticker: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '48px Arial';
    ctx.fillText(sticker, Math.random() * (canvas.width - 100), Math.random() * (canvas.height - 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">🎨 Chora Hapa!</h1>
          <p className="text-sm sm:text-base text-gray-600">Chora picha nzuri na rangi nyingi!</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={downloadCanvas}
            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button
            onClick={() => setShowSaveModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Art</span>
            <span className="sm:hidden">Hifadhi</span>
          </button>
          <button
            onClick={() => setShowGallery(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
          >
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">My Gallery</span>
            <span className="sm:hidden">Gallery</span>
          </button>
          <button
            onClick={clearCanvas}
            className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
            <span className="sm:hidden">Futa</span>
          </button>
        </div>
      </div>

      {/* Full Width Canvas with Floating Toolbar */}
      <div className="relative">
        {/* Floating Toolbar */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentTool('brush')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  currentTool === 'brush' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Brush"
              >
                <Brush className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentTool('eraser')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  currentTool === 'eraser' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Eraser"
              >
                <Eraser className="w-5 h-5" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">{brushSize}px</span>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
              title="Choose Color"
            />

            <div className="w-px h-6 bg-gray-300"></div>

            <button
              onClick={clearCanvas}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200 max-w-48">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Colors</h3>
          <div className="grid grid-cols-6 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
                  brushColor === color 
                    ? 'border-gray-800 scale-110' 
                    : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            Stickers
          </h3>
          <div className="grid grid-cols-4 gap-1">
            {stickers.map((sticker, index) => (
              <button
                key={index}
                onClick={() => addSticker(sticker)}
                className="p-1 text-lg hover:bg-gray-100 rounded transition-colors duration-200"
                title={`Add ${sticker}`}
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
              title="Save Artwork"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGallery(true)}
              className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200"
              title="My Gallery"
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              onClick={downloadCanvas}
              className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawingTouch}
              onTouchMove={drawTouch}
              onTouchEnd={stopDrawingTouch}
              onTouchCancel={stopDrawingTouch}
              className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] border-4 border-purple-200 rounded-lg cursor-crosshair touch-none bg-white shadow-inner"
              style={{ touchAction: 'none', userSelect: 'none' }}
            />
            
            <div className="absolute top-2 left-2 bg-purple-600/90 text-white px-3 py-1 rounded-full text-xs">
              🎨 Tool: {currentTool} | Size: {brushSize}px
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tools Menu - Hidden by default, shows on mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-3 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium"
            >
              💾 Save
            </button>
            <button
              onClick={() => setShowGallery(true)}
              className="p-3 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium"
            >
              🖼️ Gallery
            </button>
            <button
              onClick={downloadCanvas}
              className="p-3 bg-green-100 text-green-700 rounded-xl text-sm font-medium"
            >
              📥 Download
            </button>
            <button
              onClick={clearCanvas}
              className="p-3 bg-red-100 text-red-700 rounded-xl text-sm font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Simple Color Palette for Mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">Choose Color</h3>
          <div className="grid grid-cols-6 gap-2 justify-items-center">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  brushColor === color ? 'border-gray-800 scale-110' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Simple Stickers for Mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">Fun Stickers</h3>
          <div className="grid grid-cols-4 gap-2 justify-items-center">
            {stickers.map((sticker, index) => (
              <button
                key={index}
                onClick={() => addSticker(sticker)}
                className="p-2 text-2xl hover:bg-gray-100 rounded-lg"
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brush Size Control for Mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Brush Size: {brushSize}px</h3>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-600">Small</span>
              <input
                type="range"
                min="1"
                max="30"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg"
              />
              <span className="text-xs text-gray-600">Big</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Selection for Mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentTool('brush')}
              className={`flex-1 p-3 rounded-xl text-sm font-medium ${
                currentTool === 'brush' 
                  ? 'bg-purple-100 text-purple-600 border-2 border-purple-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              🖌️ Brush
            </button>
            <button
              onClick={() => setCurrentTool('eraser')}
              className={`flex-1 p-3 rounded-xl text-sm font-medium ${
                currentTool === 'eraser' 
                  ? 'bg-purple-100 text-purple-600 border-2 border-purple-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              🧹 Eraser
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Simplified */}
      <div className="hidden md:block">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tools</h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentTool('brush')}
                    className={`flex-1 p-3 rounded-lg ${
                      currentTool === 'brush' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
                    }`}
                  >
                    🖌️ Brush
                  </button>
                  <button
                    onClick={() => setCurrentTool('eraser')}
                    className={`flex-1 p-3 rounded-lg ${
                      currentTool === 'eraser' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
                    }`}
                  >
                    🧹 Eraser
                  </button>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Size: {brushSize}px</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Colors</h3>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    className={`w-8 h-8 rounded border-2 ${
                      brushColor === color ? 'border-gray-800' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Stickers</h3>
              <div className="grid grid-cols-4 gap-2">
                {stickers.map((sticker, index) => (
                  <button
                    key={index}
                    onClick={() => addSticker(sticker)}
                    className="p-2 text-2xl hover:bg-gray-100 rounded-lg"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="w-full p-3 bg-blue-100 text-blue-700 rounded-lg font-medium"
                >
                  💾 Save Art
                </button>
                <button
                  onClick={() => setShowGallery(true)}
                  className="w-full p-3 bg-purple-100 text-purple-700 rounded-lg font-medium"
                >
                  🖼️ Gallery
                </button>
                <button
                  onClick={downloadCanvas}
                  className="w-full p-3 bg-green-100 text-green-700 rounded-lg font-medium"
                >
                  📥 Download
                </button>
                <button
                  onClick={clearCanvas}
                  className="w-full p-3 bg-red-100 text-red-700 rounded-lg font-medium"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
              <Save className="w-6 h-6 mr-2 text-blue-600" />
              Save Your Amazing Art! 🎨
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Give your artwork a name:
              </label>
              <input
                type="text"
                value={artworkTitle}
                onChange={(e) => setArtworkTitle(e.target.value)}
                placeholder="My Beautiful Drawing"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveArtwork}
                disabled={!artworkTitle.trim() || isSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Art
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kids Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Image className="w-6 h-6 mr-2 text-purple-600" />
                My Amazing Art Gallery 🎨
              </h2>
              <button
                onClick={() => setShowGallery(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {savedArtworks.length === 0 ? (
              <div className="text-center py-12">
                <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks yet!</h3>
                <p className="text-gray-500">Start creating and save your first masterpiece!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Firebase Artworks */}
                {firebaseArtworks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Save className="w-5 h-5 text-gray-600 mr-2" />
                      My Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedArtworks.map((artwork) => (
                        <div key={artwork.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                          <img
                            src={artwork.imageData}
                            alt={artwork.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">{artwork.title}</h3>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>by {artwork.artist}</span>
                              <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-3">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span className="text-sm">{artwork.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;