import React, { useState, useRef } from 'react';
import { DEVOTIONAL_VIDEOS, VIDEO_CATEGORIES } from '../data/videos';
import { Play, Eye, Clock, ListFilter, Sparkles } from 'lucide-react';

export default function VideosView() {
  const [activeVideo, setActiveVideo] = useState(DEVOTIONAL_VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Bhajans' | 'Temple Visits' | 'Special Poojas'>('All');
  const playerRef = useRef<HTMLDivElement>(null);

  const filteredVideos = selectedCategory === 'All'
    ? DEVOTIONAL_VIDEOS
    : DEVOTIONAL_VIDEOS.filter(video => video.category === selectedCategory);

  const handleSelectVideo = (video: typeof DEVOTIONAL_VIDEOS[0]) => {
    setActiveVideo(video);
    // Smoothly scroll to the main video player
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10">
      {/* active player section */}
      <div ref={playerRef} className="scroll-mt-6 space-y-4">
        <h2 className="text-xl font-bold font-display text-amber-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> Devotional Player
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-2xl p-5 border border-amber-100 shadow-md">
          {/* Responsive Iframe */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
              <iframe
                id="active-devotional-iframe"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Active Video Info */}
          <div className="flex flex-col justify-between p-2">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wide">
                {activeVideo.category}
              </span>
              <h3 className="text-lg font-bold font-display text-amber-950 leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeVideo.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeVideo.views} Devotional Views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists Filter & Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-amber-200/40 pb-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-amber-950">Divine Video Playlists</h2>
            <p className="text-xs text-slate-600 mt-0.5">Explore our rich collection of virtual darshans, poojas, and traditional bhajans.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-amber-100/50 p-1 rounded-xl border border-amber-200/30">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-800 hover:bg-amber-200/50'
              }`}
            >
              All Content
            </button>
            {VIDEO_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-800 hover:bg-amber-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-amber-200">
            <span className="text-3xl">🕉️</span>
            <h3 className="mt-3 text-sm font-semibold text-amber-950 font-display">No videos in this category</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-xs">All custom devotional uploads are currently curated under Bhajans and Special Poojas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const isPlaying = video.id === activeVideo.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:border-amber-300/60 ${
                    isPlaying ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/10' : 'border-slate-100'
                  }`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 rounded-full bg-amber-600/90 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-white" />
                        </div>
                      </div>

                      {/* Badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-amber-200 text-[10px] uppercase font-bold tracking-wider font-mono">
                        {video.category}
                      </span>

                      {/* Duration badge */}
                      <span className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded bg-black/75 text-white text-[10px] font-mono">
                        {video.duration}
                      </span>
                    </div>

                    {/* Body Info */}
                    <div className="p-4 space-y-2">
                      <h4 className={`font-semibold font-display text-sm leading-snug group-hover:text-amber-700 transition-colors duration-200 ${
                        isPlaying ? 'text-amber-800 font-bold' : 'text-slate-900'
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-4 pt-0 border-t border-slate-50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="bg-amber-100/50 text-amber-800 px-1.5 py-0.5 rounded font-sans font-medium text-[9px] uppercase tracking-wide">
                      {isPlaying ? 'Currently playing' : 'Play video'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-300" />
                      <span>{video.views} Views</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
