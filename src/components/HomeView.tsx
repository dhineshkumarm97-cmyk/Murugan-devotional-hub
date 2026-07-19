import React from 'react';
import { Play, Sparkles, BookOpen, Youtube, ExternalLink, Award } from 'lucide-react';

export default function HomeView() {
  return (
    <div className="space-y-12">
      {/* Official YouTube Channel Showcase Banner */}
      <div id="youtube-channel-showcase" className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200/60 shadow-lg relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-red-50/50 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Channel Logo with gold glow ring and badge */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-gold-400 to-amber-600 p-1 shadow-md shadow-amber-900/15">
                <div className="w-full h-full rounded-full overflow-hidden bg-amber-900 relative border-2 border-white flex items-center justify-center">
                  <img
                    src="/api/proxy-logo"
                    alt="Murugan South India Devotional Channel Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="absolute -bottom-2 -right-1 bg-red-600 text-white p-1 rounded-full border-2 border-white shadow shadow-red-900/30" title="YouTube Channel">
                <Youtube className="w-4 h-4 fill-current" />
              </span>
            </div>

            {/* Channel Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider border border-amber-200/50">
                  <Award className="w-3 h-3 text-amber-600" /> Official Channel
                </span>
                <span className="text-[10px] bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Devotional Space
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-amber-950 tracking-tight leading-tight">
                Murugan South India Devotional
              </h2>
              
              <p className="text-sm font-mono text-amber-800 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <span>@murugansouthindiadevotional</span>
              </p>
              
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                South India's prominent digital sanctuary for traditional Tamil bhajans, sacred rituals, Slokas, and Sea-shore Virtual Darshans dedicated to Lord Kartikeya.
              </p>
            </div>
          </div>

          {/* Subscribe Action Button */}
          <div className="shrink-0 w-full lg:w-auto text-center">
            <a
              href="https://youtube.com/@murugansouthindiadevotional?si=NsUKTEReJtfOdhfW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-102 hover:shadow-red-600/30 cursor-pointer"
            >
              <Youtube className="w-5 h-5 fill-current" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-4 h-4 text-red-200" />
            </a>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">Join our global spiritual community 🙏</p>
          </div>
        </div>
      </div>

      {/* Hero Welcome Section */}
      <div id="welcome-hero-card" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-50 p-6 md:p-10 border border-amber-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Welcome Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-gold-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Vetrivel Muruganukku Arohara
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-gold-100 leading-tight">
              Vanakkam & Welcome! <br/>
              <span className="text-gold-400">Om Muruga 🙏</span>
            </h1>
            
            <p className="text-base md:text-lg text-amber-200/90 leading-relaxed font-light">
              We welcome you to this sacred digital sanctuary dedicated to connecting with our wonderful community of devotees, spiritual seekers, and potential partners.
            </p>
            
            <p className="text-sm md:text-base text-amber-300/80 leading-relaxed">
              May the divine blessings, unconditional love, and infinite grace of Lord Murugan be with you and your family today and always.
            </p>
            
            {/* Quick Stats/Community highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-amber-800/60">
              <div>
                <p className="text-2xl md:text-3xl font-bold font-display text-gold-400">100k+</p>
                <p className="text-xs text-amber-300/70">YouTube Devotees</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-display text-gold-400">50+</p>
                <p className="text-xs text-amber-300/70">Bhajans & Poojas</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-display text-gold-400">Daily</p>
                <p className="text-xs text-amber-300/70">Divine Darshan</p>
              </div>
            </div>
          </div>

          {/* Welcoming Image of Lord Murugan */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group p-2.5 rounded-2xl bg-amber-950 border border-amber-800/80 shadow-2xl overflow-hidden max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src="/api/proxy-lord-image"
                alt="Lord Bala Murugan with Vel and Peacock"
                className="w-full h-80 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 text-center">
                <p className="text-gold-400 font-display font-bold text-lg tracking-wide text-glow">
                  SRI BALASUBRAMANIAR
                </p>
                <p className="text-amber-200/80 text-xs">
                  Divine Bala Murugan with Vel & Peacock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Video Section */}
      <div id="featured-video-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-200/60 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-amber-950 flex items-center gap-2">
              <Play className="w-6 h-6 text-amber-600 fill-amber-600/20" /> Latest Featured Video
            </h2>
            <p className="text-slate-600 text-sm mt-1">Our most popular and spiritually powerful upload for your daily prayer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 md:p-8 border border-amber-100 shadow-md">
          {/* Embed Container */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black group">
              <iframe
                id="featured-youtube-iframe"
                src="https://www.youtube.com/embed/ox9_fTl2tQY?autoplay=0"
                title="Daily Morning & Evening Murugan Devotional Songs"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Video Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
                Featured Prayer
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-amber-950 font-display">
                Daily Morning & Evening Murugan Devotional Songs (முக்கியமான பாடல்கள்)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A powerful collection of devotional songs to listen to every morning and evening. Invokes positive vibrations, peace of mind, and divine protection in your home.
              </p>
              <div className="flex items-center gap-6 text-xs text-slate-500 font-mono">
                <div>
                  <span className="font-semibold text-slate-700">Duration:</span> 45:12
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Views:</span> 1.2 Million+
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Spiritual Tip</h4>
                <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                  Listen to this hymn early in the morning or during sunset hours while lighting a traditional ghee lamp to invite positive cosmic vibrations into your household.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
