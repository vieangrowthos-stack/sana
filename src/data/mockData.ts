import { MediaItem } from "@/components/gallery/MediaCard";
import { BilingualText } from "@/contexts/LanguageContext";

// Mock data for development - will be replaced with Firestore data

export const mockMediaItems: MediaItem[] = [
  // Landscape
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    type: "photo",
    category: "landscape",
    caption: { en: "Mountain sunrise in the Alps", ja: "アルプスの山の日の出" },
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    type: "photo",
    category: "landscape",
    caption: { en: "Serene lake at dawn", ja: "夜明けの静かな湖" },
  },
  // Wildlife
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800",
    type: "photo",
    category: "wildlife",
    caption: { en: "Eagle in flight", ja: "飛翔する鷲" },
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
    type: "photo",
    category: "wildlife",
    caption: { en: "Deer in morning mist", ja: "朝霧の中の鹿" },
  },
  // Night Scene
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800",
    type: "photo",
    category: "nightscene",
    caption: { en: "City lights at midnight", ja: "真夜中の街の灯り" },
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
    type: "photo",
    category: "nightscene",
    caption: { en: "Starry sky over mountains", ja: "山の上の星空" },
  },
  // Food
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    type: "photo",
    category: "food",
    caption: { en: "Artisan pastries", ja: "職人のペストリー" },
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    type: "photo",
    category: "food",
    caption: { en: "Fresh seasonal salad", ja: "新鮮な季節のサラダ" },
  },
  // Travel
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    type: "photo",
    category: "travel",
    caption: { en: "Pacific coast highway", ja: "太平洋岸ハイウェイ" },
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
    type: "photo",
    category: "travel",
    caption: { en: "Temple in Southeast Asia", ja: "東南アジアの寺院" },
  },
  // Portrait
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    type: "photo",
    category: "portrait",
    caption: { en: "Portrait in natural light", ja: "自然光でのポートレート" },
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    type: "photo",
    category: "portrait",
    caption: { en: "Studio portrait session", ja: "スタジオポートレートセッション" },
  },
  // Tuffy
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
    type: "photo",
    category: "tuffy",
    caption: { en: "Tuffy being adorable", ja: "愛らしいタフィー" },
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    type: "photo",
    category: "tuffy",
    caption: { en: "Tuffy at the park", ja: "公園のタフィー" },
  },
];

export interface JourneyEntry {
  id: string;
  date: string;
  title: BilingualText;
  content: BilingualText;
  mediaUrl?: string;
}

export const mockJourneyEntries: JourneyEntry[] = [
  {
    id: "j1",
    date: "2024",
    title: { en: "Started freelance photography", ja: "フリーランス写真を開始" },
    content: { 
      en: "After years of working in corporate, I finally took the leap to pursue photography full-time.", 
      ja: "企業で何年も働いた後、ついに写真を本格的に追求する決断をしました。" 
    },
    mediaUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
  },
  {
    id: "j2",
    date: "2023",
    title: { en: "First international exhibition", ja: "初の国際展示会" },
    content: { 
      en: "My work was featured in a gallery in Tokyo. Meeting other artists was surreal.", 
      ja: "東京のギャラリーで作品が展示されました。" 
    },
    mediaUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: "j3",
    date: "2022",
    title: { en: "Traveled across Southeast Asia", ja: "東南アジアを旅した" },
    content: { 
      en: "Three months of exploring, photographing, and finding inspiration everywhere.", 
      ja: "3ヶ月間、探検し、写真を撮り、あらゆる場所でインスピレーションを見つけました。" 
    },
    mediaUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
  },
  {
    id: "j4",
    date: "2020",
    title: { en: "First camera", ja: "最初のカメラ" },
    content: { 
      en: "It all started with a second-hand DSLR. The excitement of taking my first intentional photos.", 
      ja: "すべては中古のDSLRから始まりました。" 
    },
    mediaUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
  },
];
