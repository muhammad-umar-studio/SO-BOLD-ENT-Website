import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/store';
import { Artist, MediaItem, Dispatch } from '@/types';
import { MOCK_PRODUCTS } from '@/lib/data/mockProducts';
import { MOCK_ARTISTS, MOCK_MEDIA_ITEMS, MOCK_DISPATCHES } from '@/lib/data/mockData';

interface CmsState {
  products: Product[];
  artists: Artist[];
  mediaItems: MediaItem[];
  dispatches: Dispatch[];

  // Product Actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Artist Actions
  addArtist: (artist: Artist) => void;
  updateArtist: (id: string, updated: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;

  // Channel Media Actions
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (id: string, updated: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;

  // Dispatch Press Actions
  addDispatch: (dispatch: Dispatch) => void;
  updateDispatch: (id: string, updated: Partial<Dispatch>) => void;
  deleteDispatch: (id: string) => void;

  // Reset to Factory Defaults
  resetToDefaults: () => void;
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      products: MOCK_PRODUCTS,
      artists: MOCK_ARTISTS,
      mediaItems: MOCK_MEDIA_ITEMS,
      dispatches: MOCK_DISPATCHES,

      // Products
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Artists
      addArtist: (artist) =>
        set((state) => ({ artists: [artist, ...state.artists] })),
      updateArtist: (id, updated) =>
        set((state) => ({
          artists: state.artists.map((a) => (a.id === id ? { ...a, ...updated } : a)),
        })),
      deleteArtist: (id) =>
        set((state) => ({
          artists: state.artists.filter((a) => a.id !== id),
        })),

      // Channel Media
      addMediaItem: (item) =>
        set((state) => ({ mediaItems: [item, ...state.mediaItems] })),
      updateMediaItem: (id, updated) =>
        set((state) => ({
          mediaItems: state.mediaItems.map((m) => (m.id === id ? { ...m, ...updated } : m)),
        })),
      deleteMediaItem: (id) =>
        set((state) => ({
          mediaItems: state.mediaItems.filter((m) => m.id !== id),
        })),

      // Dispatches
      addDispatch: (dispatch) =>
        set((state) => ({ dispatches: [dispatch, ...state.dispatches] })),
      updateDispatch: (id, updated) =>
        set((state) => ({
          dispatches: state.dispatches.map((d) => (d.id === id ? { ...d, ...updated } : d)),
        })),
      deleteDispatch: (id) =>
        set((state) => ({
          dispatches: state.dispatches.filter((d) => d.id !== id),
        })),

      // Reset
      resetToDefaults: () =>
        set({
          products: MOCK_PRODUCTS,
          artists: MOCK_ARTISTS,
          mediaItems: MOCK_MEDIA_ITEMS,
          dispatches: MOCK_DISPATCHES,
        }),
    }),
    {
      name: 'soboldents_cms_store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
