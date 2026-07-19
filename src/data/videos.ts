import { DevotionalVideo } from '../types';

export const VIDEO_CATEGORIES = ['Bhajans', 'Temple Visits', 'Special Poojas'] as const;

export const DEVOTIONAL_VIDEOS: DevotionalVideo[] = [
  // User Added Channels & Devotionals
  {
    id: 'u1',
    title: 'Daily Morning & Evening Murugan Devotional Songs (முக்கியமான பாடல்கள்)',
    category: 'Bhajans',
    youtubeId: 'ox9_fTl2tQY',
    description: 'A powerful collection of devotional songs to listen to every morning and evening. Invokes positive vibrations, peace of mind, and divine protection in your home.',
    duration: '45:12',
    views: '1.2M'
  },
  {
    id: 'u2',
    title: 'Divine Murugan Prayer to Remove Obstacles (கஷ்டத்தை நீக்கும் பாடல்)',
    category: 'Bhajans',
    youtubeId: 'hetgWtkhAZw',
    description: 'Listen to this powerful chant during challenging times to overcome difficulties, ease mental distress, and receive the grace of the Lord of Palani.',
    duration: '38:45',
    views: '920K'
  },
  {
    id: 'u3',
    title: 'Auspicious Days Murugan Devotional Collection (ராசிக்காரர்கள் கேட்க வேண்டியவை)',
    category: 'Special Poojas',
    youtubeId: '5s7ouH2jDrc',
    description: 'Special sacred compilations curated for astrological alignments and auspicious days to invoke planetary harmony and Lord Kartikeya’s supreme grace.',
    duration: '32:15',
    views: '740K'
  },
  {
    id: 'u4',
    title: 'Daily Tamil Murugan Devotional Songs (தினமும் கேட்க வேண்டிய பாடல்கள்)',
    category: 'Bhajans',
    youtubeId: 'RP2oPSx1tzQ',
    description: 'A timeless selection of classical Murugan devotional tracks that are ideal for daily worship, household morning meditation, and evening chants.',
    duration: '40:30',
    views: '2.5M'
  },
  {
    id: 'u5',
    title: 'Maruthamalai Sathiyama Murugan Song by Pushpavanam Kuppusamy (மருதமலை சத்தியமா)',
    category: 'Bhajans',
    youtubeId: 'lTSMUl5LJY8',
    description: 'The energetic and emotionally powerful traditional song sung in praise of Maruthamalai Murugan, masterfully rendered by Pushpavanam Kuppusamy.',
    duration: '6:54',
    views: '3.8M'
  }
];
