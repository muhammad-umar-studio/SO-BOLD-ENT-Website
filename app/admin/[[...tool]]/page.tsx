'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Video,
  FileText,
  ShoppingBag,
  Plus,
  Trash2,
  Lock,
  RotateCcw,
  Pencil,
  Youtube,
} from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import { ProductCategory, Product } from '@/types/store';
import { Artist, MediaItem, Dispatch } from '@/types';
import Button from '@/components/ui/Button';

export default function AdminPortalPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'artists' | 'channel' | 'dispatches'>('products');

  const {
    products,
    artists,
    mediaItems,
    dispatches,
    addProduct,
    updateProduct,
    deleteProduct,
    addArtist,
    updateArtist,
    deleteArtist,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    addDispatch,
    updateDispatch,
    deleteDispatch,
    resetToDefaults,
  } = useCmsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form & Editing State: Product
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Microphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodComparePrice, setProdComparePrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodSku, setProdSku] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Form & Editing State: Artist
  const [showAddArtist, setShowAddArtist] = useState(false);
  const [editingArtistId, setEditingArtistId] = useState<string | null>(null);
  const [artName, setArtName] = useState('');
  const [artRole, setArtRole] = useState('');
  const [artCategory, setArtCategory] = useState('Electronic');
  const [artImage, setArtImage] = useState('');
  const [artBio, setArtBio] = useState('');
  const [artVideoUrl, setArtVideoUrl] = useState('');

  // Form & Editing State: Channel Media (YouTube)
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaCategory, setMediaCategory] = useState('Music Video');
  const [mediaDirector, setMediaDirector] = useState('SOBOLDENTS Visuals');
  const [mediaYoutubeUrl, setMediaYoutubeUrl] = useState('');
  const [mediaThumbnail, setMediaThumbnail] = useState('');
  const [mediaDuration, setMediaDuration] = useState('03:45');

  // Form & Editing State: Dispatch Press
  const [showAddDispatch, setShowAddDispatch] = useState(false);
  const [editingDispatchId, setEditingDispatchId] = useState<string | null>(null);
  const [dispTitle, setDispTitle] = useState('');
  const [dispCategory, setDispCategory] = useState('Press Release');
  const [dispAuthor, setDispAuthor] = useState('SOBOLDENTS EDITORIAL');
  const [dispSummary, setDispSummary] = useState('');

  // --- Handlers: Product ---
  const handleStartEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProdTitle(product.title);
    setProdCategory(product.category);
    setProdPrice(String(product.price));
    setProdComparePrice(product.compareAtPrice ? String(product.compareAtPrice) : '');
    setProdStock(String(product.stock));
    setProdSku(product.sku);
    setProdImage(product.images[0] || '');
    setProdDesc(product.description || '');
    setShowAddProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: prodTitle.toUpperCase(),
        category: prodCategory,
        price: parseFloat(prodPrice) || 0,
        compareAtPrice: prodComparePrice ? parseFloat(prodComparePrice) : undefined,
        stock: parseInt(prodStock) || 1,
        sku: prodSku,
        images: [prodImage || '/images/products/c12_tube_mic.png'],
        description: prodDesc,
      });
      setEditingProductId(null);
    } else {
      const newProd = {
        id: `prod_custom_${Date.now()}`,
        slug: prodTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: prodSku || `SBE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        title: prodTitle.toUpperCase(),
        category: prodCategory,
        price: parseFloat(prodPrice) || 0,
        compareAtPrice: prodComparePrice ? parseFloat(prodComparePrice) : undefined,
        stock: parseInt(prodStock) || 1,
        images: [prodImage || '/images/products/c12_tube_mic.png'],
        description: prodDesc || 'Professional studio hardware engineered for artists and audio engineers.',
        features: ['Studio precision engineering', 'Full manufacturer warranty', 'Server authenticated delivery'],
        isFeatured: true,
      };
      addProduct(newProd);
    }

    setProdTitle('');
    setProdPrice('');
    setProdComparePrice('');
    setProdSku('');
    setProdImage('');
    setProdDesc('');
    setShowAddProduct(false);
  };

  // --- Handlers: Artist ---
  const handleStartEditArtist = (artist: Artist) => {
    setEditingArtistId(artist.id);
    setArtName(artist.name);
    setArtRole(artist.role);
    setArtCategory(artist.category);
    setArtImage(artist.imageUrl);
    setArtBio(artist.bio || '');
    setArtVideoUrl(artist.featuredVideoUrl || '');
    setShowAddArtist(true);
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artName) return;

    if (editingArtistId) {
      updateArtist(editingArtistId, {
        name: artName.toUpperCase(),
        role: artRole,
        category: artCategory as any,
        imageUrl: artImage,
        coverUrl: artImage,
        bio: artBio,
        featuredVideoUrl: artVideoUrl,
      });
      setEditingArtistId(null);
    } else {
      const newArt = {
        id: `art_custom_${Date.now()}`,
        slug: artName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: artName.toUpperCase(),
        category: artCategory as any,
        role: artRole || `${artCategory} Artist`,
        imageUrl: artImage || '/images/products/c12_tube_mic.png',
        coverUrl: artImage || '/images/products/c12_tube_mic.png',
        bio: artBio || 'Roster artist managed and represented under SOBOLDENTS.',
        featuredVideoUrl: artVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [{ label: 'Status', value: 'Active Roster' }],
      };
      addArtist(newArt);
    }

    setArtName('');
    setArtRole('');
    setArtImage('');
    setArtBio('');
    setArtVideoUrl('');
    setShowAddArtist(false);
  };

  // --- Handlers: Media ---
  const handleStartEditMedia = (item: MediaItem) => {
    setEditingMediaId(item.id);
    setMediaTitle(item.title);
    setMediaCategory(item.category);
    setMediaDirector(item.director || 'SOBOLDENTS Visuals');
    setMediaYoutubeUrl(item.videoUrl || '');
    setMediaThumbnail(item.thumbnailUrl || '');
    setMediaDuration(item.duration || '03:45');
    setShowAddMedia(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle) return;

    let embedUrl = mediaYoutubeUrl;
    if (embedUrl.includes('watch?v=')) {
      const videoId = embedUrl.split('watch?v=')[1]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (embedUrl.includes('youtu.be/')) {
      const videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    if (editingMediaId) {
      updateMediaItem(editingMediaId, {
        title: mediaTitle.toUpperCase(),
        category: mediaCategory as any,
        director: mediaDirector,
        videoUrl: embedUrl,
        thumbnailUrl: mediaThumbnail,
        duration: mediaDuration,
      });
      setEditingMediaId(null);
    } else {
      const newMedia = {
        id: `media_custom_${Date.now()}`,
        slug: mediaTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: mediaTitle.toUpperCase(),
        category: mediaCategory as any,
        director: mediaDirector,
        thumbnailUrl: mediaThumbnail || '/images/products/c12_tube_mic.png',
        videoUrl: embedUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: mediaDuration,
        releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase(),
        featured: true,
      };
      addMediaItem(newMedia);
    }

    setMediaTitle('');
    setMediaYoutubeUrl('');
    setMediaThumbnail('');
    setShowAddMedia(false);
  };

  // --- Handlers: Dispatch ---
  const handleStartEditDispatch = (dispatch: Dispatch) => {
    setEditingDispatchId(dispatch.id);
    setDispTitle(dispatch.title);
    setDispCategory(dispatch.category);
    setDispAuthor(dispatch.author || 'SOBOLDENTS EDITORIAL');
    setDispSummary(dispatch.summary || '');
    setShowAddDispatch(true);
  };

  const handleSaveDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispTitle) return;

    if (editingDispatchId) {
      updateDispatch(editingDispatchId, {
        title: dispTitle.toUpperCase(),
        category: dispCategory as any,
        author: dispAuthor,
        summary: dispSummary,
        content: dispSummary,
      });
      setEditingDispatchId(null);
    } else {
      const newDisp = {
        id: `disp_custom_${Date.now()}`,
        number: String(dispatches.length).padStart(2, '0'),
        title: dispTitle.toUpperCase(),
        category: dispCategory as any,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
        author: dispAuthor,
        summary: dispSummary || 'Official announcement from SOBOLDENTS media desk.',
        content: dispSummary,
      };
      addDispatch(newDisp);
    }

    setDispTitle('');
    setDispSummary('');
    setShowAddDispatch(false);
  };

  if (!mounted) return null;

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Portal Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-surface-variant pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em]">
              Executive CMS &amp; Store Portal
            </span>
          </div>
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-none">
            SOBOLDENTS ADMIN
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 border border-surface-variant">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-body text-xs text-silver-leaf uppercase tracking-wider font-semibold">
              Live Production Nodes
            </span>
          </div>
          <button
            onClick={() => {
              if (confirm('Reset CMS catalog back to initial defaults?')) resetToDefaults();
            }}
            className="flex items-center gap-2 font-body text-xs text-silver-leaf/70 hover:text-red-400 border border-surface-variant px-3 py-2 uppercase hover:border-red-500/50 transition-colors"
            title="Reset Catalog to Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap gap-4 border-b border-surface-variant pb-6 mb-12">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-3 font-body text-label-caps uppercase tracking-[0.15em] px-6 py-3 border transition-colors ${
            activeTab === 'products'
              ? 'bg-primary text-onyx-black border-primary font-bold'
              : 'bg-transparent text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Store Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`flex items-center gap-3 font-body text-label-caps uppercase tracking-[0.15em] px-6 py-3 border transition-colors ${
            activeTab === 'artists'
              ? 'bg-primary text-onyx-black border-primary font-bold'
              : 'bg-transparent text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Roster &amp; Clients ({artists.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('channel')}
          className={`flex items-center gap-3 font-body text-label-caps uppercase tracking-[0.15em] px-6 py-3 border transition-colors ${
            activeTab === 'channel'
              ? 'bg-primary text-onyx-black border-primary font-bold'
              : 'bg-transparent text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Channel &amp; YouTube ({mediaItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('dispatches')}
          className={`flex items-center gap-3 font-body text-label-caps uppercase tracking-[0.15em] px-6 py-3 border transition-colors ${
            activeTab === 'dispatches'
              ? 'bg-primary text-onyx-black border-primary font-bold'
              : 'bg-transparent text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Press Dispatches ({dispatches.length})</span>
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-headline-md text-primary uppercase">
              Store Hardware Catalog ({products.length} Items)
            </h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingProductId(null);
                setProdTitle('');
                setProdPrice('');
                setProdComparePrice('');
                setProdSku('');
                setProdImage('');
                setProdDesc('');
                setShowAddProduct(!showAddProduct);
              }}
            >
              {showAddProduct ? 'Cancel' : 'Upload New Product'}
            </Button>
          </div>

          {/* Add / Edit Product Form */}
          {showAddProduct && (
            <form
              onSubmit={handleSaveProduct}
              className="bg-surface-container-low border border-surface-variant p-8 mb-12 space-y-6"
            >
              <h3 className="font-display text-headline-md text-primary uppercase border-b border-surface-variant pb-3">
                {editingProductId ? 'Edit Existing Product' : 'Upload New Studio Product'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="e.g. SOBOLDENTS MASTER TUBE CONDENSER"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Category
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as ProductCategory)}
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  >
                    <option value="Microphones">Microphones</option>
                    <option value="Studio Monitors">Studio Monitors</option>
                    <option value="Audio Interfaces">Audio Interfaces</option>
                    <option value="Synthesizers & Controllers">Synthesizers &amp; Controllers</option>
                    <option value="Studio Accessories">Studio Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Price (USD $)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="1250.00"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Compare-At Original Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={prodComparePrice}
                    onChange={(e) => setProdComparePrice(e.target.value)}
                    placeholder="1500.00"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Inventory Stock Count
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="10"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Product Image URL
                  </label>
                  <input
                    type="text"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="/images/products/c12_tube_mic.png or external https://"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    placeholder="SBE-MIC-01"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Enter detailed hardware specifications..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary">
                {editingProductId ? 'Update Product Details' : 'Publish Product To Store'}
              </Button>
            </form>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-surface-variant bg-surface-container-low p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full mb-4 bg-black overflow-hidden border border-surface-variant">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="font-body text-[10px] text-silver-leaf/60 uppercase block mb-1">
                    {product.category} — SKU: {product.sku}
                  </span>
                  <h3 className="font-display text-body-lg text-primary uppercase line-clamp-1 mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display text-headline-md text-primary font-bold">
                      ${product.price.toFixed(2)} USD
                    </span>
                    {product.compareAtPrice && (
                      <span className="font-body text-body-md text-silver-leaf/40 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-variant flex items-center justify-between">
                  <span className="font-body text-xs text-silver-leaf/80">
                    Stock: <strong className="text-primary">{product.stock} units</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEditProduct(product)}
                      className="p-2 text-primary hover:text-white transition-colors border border-transparent hover:border-primary/40"
                      title="Edit Product"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/30"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Artists & Clients Management */}
      {activeTab === 'artists' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-headline-md text-primary uppercase">
              Roster &amp; Client Roster ({artists.length} Members)
            </h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingArtistId(null);
                setArtName('');
                setArtRole('');
                setArtImage('');
                setArtBio('');
                setArtVideoUrl('');
                setShowAddArtist(!showAddArtist);
              }}
            >
              {showAddArtist ? 'Cancel' : 'Add New Client / Artist'}
            </Button>
          </div>

          {/* Add / Edit Artist Form */}
          {showAddArtist && (
            <form
              onSubmit={handleSaveArtist}
              className="bg-surface-container-low border border-surface-variant p-8 mb-12 space-y-6"
            >
              <h3 className="font-display text-headline-md text-primary uppercase border-b border-surface-variant pb-3">
                {editingArtistId ? 'Edit Client / Artist Profile' : 'Register New Client / Artist Roster'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Artist / Client Moniker Name
                  </label>
                  <input
                    type="text"
                    required
                    value={artName}
                    onChange={(e) => setArtName(e.target.value)}
                    placeholder="e.g. TRE' SAX"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={artRole}
                    onChange={(e) => setArtRole(e.target.value)}
                    placeholder="e.g. Saxophonist & Composer"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Genre / Category
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  >
                    <option value="Electronic">Electronic</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Contemporary Classical">Contemporary Classical</option>
                    <option value="Alternative Rock">Alternative Rock</option>
                    <option value="Producer">Producer</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Photo / Image URL
                  </label>
                  <input
                    type="text"
                    value={artImage}
                    onChange={(e) => setArtImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Featured YouTube Embed URL
                  </label>
                  <input
                    type="text"
                    value={artVideoUrl}
                    onChange={(e) => setArtVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Artist Bio / Description
                  </label>
                  <textarea
                    rows={3}
                    value={artBio}
                    onChange={(e) => setArtBio(e.target.value)}
                    placeholder="Enter artist history, accomplishments, and management details..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary">
                {editingArtistId ? 'Update Client Profile' : 'Add To SOBOLDENTS Roster'}
              </Button>
            </form>
          )}

          {/* Roster List */}
          <div className="border border-surface-variant divide-y divide-surface-variant">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 border border-surface-variant shrink-0 bg-onyx-black overflow-hidden">
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-headline-md text-primary uppercase">
                      {artist.name}
                    </h3>
                    <p className="font-body text-xs text-silver-leaf/60 uppercase">
                      {artist.role} — Category: {artist.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleStartEditArtist(artist)}
                    className="p-2 text-primary hover:text-white transition-colors border border-transparent hover:border-primary/40"
                    title="Edit Client"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteArtist(artist.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/30"
                    title="Delete Client"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Channel Media & YouTube Posts */}
      {activeTab === 'channel' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-headline-md text-primary uppercase">
              Channel Media &amp; YouTube Video Posts ({mediaItems.length} Videos)
            </h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingMediaId(null);
                setMediaTitle('');
                setMediaYoutubeUrl('');
                setMediaThumbnail('');
                setShowAddMedia(!showAddMedia);
              }}
            >
              {showAddMedia ? 'Cancel' : 'Post New YouTube Video'}
            </Button>
          </div>

          {/* Add / Edit Media Form */}
          {showAddMedia && (
            <form
              onSubmit={handleSaveMedia}
              className="bg-surface-container-low border border-surface-variant p-8 mb-12 space-y-6"
            >
              <h3 className="font-display text-headline-md text-primary uppercase border-b border-surface-variant pb-3">
                {editingMediaId ? 'Edit YouTube Video Post' : 'Publish YouTube Channel Post'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Video Post Title
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    placeholder="e.g. AINGEE — UNHURT ME (OFFICIAL MUSIC VIDEO)"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Category
                  </label>
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  >
                    <option value="World Premiere">World Premiere</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Live Session">Live Session</option>
                    <option value="Short Film">Short Film</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    YouTube URL or Embed Link
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaYoutubeUrl}
                    onChange={(e) => setMediaYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or embed URL"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    value={mediaDuration}
                    onChange={(e) => setMediaDuration(e.target.value)}
                    placeholder="04:15"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Director / Producer
                  </label>
                  <input
                    type="text"
                    value={mediaDirector}
                    onChange={(e) => setMediaDirector(e.target.value)}
                    placeholder="SOBOLDENTS Visuals"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    value={mediaThumbnail}
                    onChange={(e) => setMediaThumbnail(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary">
                {editingMediaId ? 'Update Video Post' : 'Publish Video To Channel'}
              </Button>
            </form>
          )}

          {/* Channel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="border border-surface-variant bg-surface-container-low p-6 flex flex-col justify-between"
              >
                <div>
                  {/* YouTube Embed Player Preview */}
                  <div className="relative aspect-video w-full mb-4 bg-black overflow-hidden border border-surface-variant">
                    {item.videoUrl ? (
                      <iframe
                        src={item.videoUrl}
                        title={item.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="font-body text-label-caps text-silver-leaf block mb-2">
                    {item.category} — Released: {item.releaseDate}
                  </span>
                  <h3 className="font-display text-headline-md text-primary uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-silver-leaf/70">
                    Directed by {item.director} • Duration: {item.duration}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
                  <span className="font-body text-xs text-emerald-400 uppercase font-semibold flex items-center gap-1">
                    <Youtube className="w-4 h-4 text-red-500" /> Active Video Post
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEditMedia(item)}
                      className="p-2 text-primary hover:text-white transition-colors border border-transparent hover:border-primary/40"
                      title="Edit Video"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMediaItem(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/30"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Press Dispatches */}
      {activeTab === 'dispatches' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-headline-md text-primary uppercase">
              Press Dispatches &amp; News Articles ({dispatches.length})
            </h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingDispatchId(null);
                setDispTitle('');
                setDispSummary('');
                setShowAddDispatch(!showAddDispatch);
              }}
            >
              {showAddDispatch ? 'Cancel' : 'Publish Press Article'}
            </Button>
          </div>

          {/* Add / Edit Dispatch Form */}
          {showAddDispatch && (
            <form
              onSubmit={handleSaveDispatch}
              className="bg-surface-container-low border border-surface-variant p-8 mb-12 space-y-6"
            >
              <h3 className="font-display text-headline-md text-primary uppercase border-b border-surface-variant pb-3">
                {editingDispatchId ? 'Edit Press Article' : 'Publish Press Article / Announcement'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={dispTitle}
                    onChange={(e) => setDispTitle(e.target.value)}
                    placeholder="e.g. SOBOLDENTS EXPANDS GLOBAL DISTRIBUTION"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={dispCategory}
                    onChange={(e) => setDispCategory(e.target.value)}
                    placeholder="Industry Feature / Press Release"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Author / Source Desk
                  </label>
                  <input
                    type="text"
                    value={dispAuthor}
                    onChange={(e) => setDispAuthor(e.target.value)}
                    placeholder="SOBOLDENTS EDITORIAL"
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block font-body text-label-caps text-silver-leaf mb-2">
                    Article Summary / Content
                  </label>
                  <textarea
                    rows={4}
                    value={dispSummary}
                    onChange={(e) => setDispSummary(e.target.value)}
                    placeholder="Write press article text..."
                    className="w-full bg-onyx-black border border-surface-variant p-3 text-primary font-body outline-none focus:border-primary"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary">
                {editingDispatchId ? 'Update Press Article' : 'Publish Press Dispatch'}
              </Button>
            </form>
          )}

          {/* Dispatches List */}
          <div className="border border-surface-variant divide-y divide-surface-variant">
            {dispatches.map((dispatch) => (
              <div key={dispatch.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-surface-container-low transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-silver-leaf font-body text-xs mb-2">
                    <span className="font-display text-primary font-bold">#{dispatch.number}</span>
                    <span>•</span>
                    <span>{dispatch.category}</span>
                    <span>•</span>
                    <span>{dispatch.date}</span>
                    <span>•</span>
                    <span>{dispatch.author}</span>
                  </div>
                  <h3 className="font-display text-headline-md text-primary uppercase mb-2">
                    {dispatch.title}
                  </h3>
                  <p className="font-body text-sm text-silver-leaf/80">
                    {dispatch.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartEditDispatch(dispatch)}
                    className="p-2 text-primary hover:text-white transition-colors border border-transparent hover:border-primary/40"
                    title="Edit Article"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteDispatch(dispatch.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/30"
                    title="Delete Press Article"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
