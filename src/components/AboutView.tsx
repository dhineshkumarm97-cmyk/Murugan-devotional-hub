import React from 'react';
import { Sparkles, Heart, Compass, Star, Users } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="space-y-12">
      {/* Intro Personal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 border border-amber-100 shadow-md">
        <div className="lg:col-span-4 flex justify-center">
          {/* Spiritual avatar card */}
          <div className="relative group p-2 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 max-w-xs shadow-lg">
            <div className="bg-amber-50 rounded-xl overflow-hidden p-6 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 flex items-center justify-center mx-auto border-2 border-amber-300">
                <span className="text-3xl">🙏</span>
              </div>
              <div>
                <h3 className="font-bold font-display text-lg text-amber-950">Murugan South India Devotional</h3>
                <p className="text-xs text-amber-600 font-medium tracking-wide">Spiritual Channel & Devoted Space</p>
              </div>
              <div className="text-[11px] text-slate-500 font-mono bg-amber-100/40 py-1.5 px-3 rounded-full inline-block">
                Om Saravana Bhava 🕉️
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold tracking-wide border border-amber-200/50">
            <Heart className="w-3.5 h-3.5 text-amber-600" /> A Personal Message
          </span>
          
          <h2 className="text-2xl md:text-3xl font-bold font-display text-amber-950">
            Connecting Devotees Through Divine Grace
          </h2>
          
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Greetings and Vanakkam to all fellow devotees! We are the team at <strong>Murugan South India Devotional</strong>, and we created this devotional space to celebrate and share the infinite grace of our Lord Murugan (Kartikeya). 
          </p>

          <p className="text-slate-600 leading-relaxed text-sm">
            Growing up listening to sacred bhajans and witnessing beautiful temple rituals (Poojas), I felt a strong spiritual calling to document and share these rich South Indian traditions with the world. This channel was born out of a desire to create a digital sanctuary where devotees, no matter where they are in the world, can connect with the divine vibrational energies of Lord Murugan.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm">
            Whether you are here to listen to protective chants like the <em>Kanda Sashti Kavasam</em>, enjoy melodious bhajans, or witness sacred temple darshans, my prayer is that this space brings deep peace, strength, and joy to your spiritual heart.
          </p>
        </div>
      </div>

      {/* Spiritual Mission / Values Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display text-amber-950">Our Spiritual Mission</h2>
          <p className="text-xs text-slate-500">How we serve the global devotee community day in and day out.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission Card 1 */}
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 space-y-4 shadow-sm hover:border-amber-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-base text-amber-950">Preserving Traditions</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We record and share authentic, high-quality audio and video of ancient South Indian bhajans, traditional chants, and sacred slokas to preserve them for future generations.
            </p>
          </div>

          {/* Mission Card 2 */}
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 space-y-4 shadow-sm hover:border-amber-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-base text-amber-950">Virtual Pilgrimage</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We travel to sacred shrines (such as the Arupadai Veedu temples) to provide devotees who cannot travel with beautiful virtual Darshans and detailed cultural walkthroughs.
            </p>
          </div>

          {/* Mission Card 3 */}
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 space-y-4 shadow-sm hover:border-amber-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-base text-amber-950">Global Satsang</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We foster a positive, supportive spiritual family of devotees and work hand-in-hand with temple organizers, bhajan groups, and sponsors to spread devotional joy.
            </p>
          </div>
        </div>
      </div>

      {/* Milestones / Channel Journey */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold font-display text-amber-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> Channel Milestones & Journey
        </h3>

        <div className="relative border-l-2 border-amber-200 ml-3 md:ml-6 space-y-8 py-2">
          {/* Milestone 1 */}
          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-amber-50" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 font-mono">NOVEMBER 2022</span>
              <h4 className="font-bold font-display text-amber-950 text-sm">Sacred Channel Foundation</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                The YouTube channel <strong>Murugan South India Devotional</strong> was officially launched. The channel was born from a deep spiritual calling to share authentic, high-quality, and spiritually elevating Tamil prayers, traditional slokas, and melodious Murugan bhajans with devotees worldwide.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-amber-50" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 font-mono">JUNE 2023</span>
              <h4 className="font-bold font-display text-amber-950 text-sm">Special Poojas & Astrological Compilations</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Introduced curated, powerful prayer tracks designed for special auspicious days (such as Shashti, Kiruthigai, and Karthigai Deepam) to remove obstacles and invoke the divine protection of Lord Kartikeya. The response from global Tamil communities in Malaysia, Singapore, and the UK was profoundly welcoming.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-amber-50" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 font-mono">2024 - 2025</span>
              <h4 className="font-bold font-display text-amber-950 text-sm">100,000+ Devotees & Millions of Views</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Crossed major subscriber milestones! The upload <em>"Daily Morning & Evening Murugan Devotional Songs"</em> became a daily prayer companion in millions of households, helping devotees find peace, strength, and positive vibrations in their homes.
              </p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-amber-50" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 font-mono">PRESENT</span>
              <h4 className="font-bold font-display text-amber-950 text-sm">Expanding Virtual Darshans & Community Interaction</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Continuously producing divine content, including temple walkthroughs, traditional bhajans, and special astrological prayer assemblies, to keep our growing global community connected directly to Lord Murugan's spiritual grace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
