export type MessageCategory = 'devotee' | 'partner';

export interface DevoteeMessage {
  id: string;
  name: string;
  email: string;
  category: MessageCategory;
  subcategory?: string; // 'bhajans', 'temple_content', 'general_feedback', 'proposal', 'advertising'
  message: string;
  videoUrl?: string;
  timestamp: string;
  read: boolean;
}

export interface DevotionalVideo {
  id: string;
  title: string;
  category: 'Bhajans' | 'Temple Visits' | 'Special Poojas';
  youtubeId: string; // The YouTube ID to embed
  description: string;
  duration: string;
  views?: string;
}
