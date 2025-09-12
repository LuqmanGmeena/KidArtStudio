import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

export interface Artwork {
  id?: string;
  title: string;
  artist: string;
  userId?: string;
  imageUrl: string;
  createdAt: any;
  likes: number;
  category: string;
  isPublic: boolean;
}

export class ArtworkService {
  private artworksCollection = 'artworks';

  // Upload canvas image to Firebase Storage
  async uploadCanvasImage(canvas: HTMLCanvasElement, filename: string, userId?: string): Promise<string> {
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png', 0.9);
      });

      // Create storage reference
      const storageRef = ref(storage, `artworks/${userId || 'anonymous'}/${filename}`);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload artwork image');
    }
  }

  // Save artwork metadata to Firestore
  async saveArtwork(artworkData: Omit<Artwork, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.artworksCollection), {
        ...artworkData,
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving artwork:', error);
      throw new Error('Failed to save artwork');
    }
  }

  // Get all artworks for a user
  async getUserArtworks(userId: string): Promise<Artwork[]> {
    try {
      const q = query(
        collection(db, this.artworksCollection),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const artworks: Artwork[] = [];
      
      querySnapshot.forEach((doc) => {
        artworks.push({
          id: doc.id,
          ...doc.data()
        } as Artwork);
      });
      
      return artworks;
    } catch (error) {
      console.error('Error getting user artworks:', error);
      throw new Error('Failed to load artworks');
    }
  }

  // Get all public artworks
  async getPublicArtworks(): Promise<Artwork[]> {
    try {
      const q = query(
        collection(db, this.artworksCollection),
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const artworks: Artwork[] = [];
      
      querySnapshot.forEach((doc) => {
        artworks.push({
          id: doc.id,
          ...doc.data()
        } as Artwork);
      });
      
      return artworks;
    } catch (error) {
      console.error('Error getting public artworks:', error);
      throw new Error('Failed to load public artworks');
    }
  }

  // Update artwork likes
  async updateArtworkLikes(artworkId: string, likes: number): Promise<void> {
    try {
      const artworkRef = doc(db, this.artworksCollection, artworkId);
      await updateDoc(artworkRef, {
        likes: likes
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      throw new Error('Failed to update likes');
    }
  }

  // Delete artwork
  async deleteArtwork(artworkId: string, imageUrl: string): Promise<void> {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, this.artworksCollection, artworkId));
      
      // Delete image from Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting artwork:', error);
      throw new Error('Failed to delete artwork');
    }
  }
}