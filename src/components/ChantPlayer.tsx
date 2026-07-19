import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Bell } from 'lucide-react';

export default function ChantPlayer() {
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [bellActive, setBellActive] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDrone();
    };
  }, []);

  const playTempleBell = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      
      // Traditional temple bell harmonics (Fundamental, minor 3rd, 5th, Octaves)
      // A traditional Indian temple bell has rich, metallic high frequencies that decay.
      const frequencies = [220, 261.63, 329.63, 440, 554.37, 659.25, 880, 1100, 1320];
      const gains = [0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.08, 0.05];
      
      setBellActive(true);
      setTimeout(() => setBellActive(false), 300);

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Quick strike, long resonant decay (high frequencies decay faster)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(gains[index] * 0.25, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.5 - (index * 0.35));
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 4.5);
      });
    } catch (error) {
      console.error('Failed to play temple bell:', error);
    }
  };

  const startDrone = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      // Smooth fade-in over 2 seconds
      mainGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2.0);
      mainGain.connect(ctx.destination);
      droneGainRef.current = mainGain;

      // Meditative low fundamental and warm harmonic intervals (C2/G2/C3/E3/G3)
      const droneFreqs = [130.81, 196.00, 261.63, 329.63, 392.00];
      const oscs: OscillatorNode[] = [];

      droneFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Low frequency pitch wavering to simulate real-world chant/air movement
        lfo.frequency.value = 0.15 + (idx * 0.04);
        lfoGain.gain.value = 0.8; // fine pitch drift (Hz)

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        osc.connect(mainGain);

        lfo.start();
        osc.start();

        oscs.push(osc, lfo);
      });

      droneOscsRef.current = oscs;
      setIsDronePlaying(true);
    } catch (error) {
      console.error('Failed to start ambient drone:', error);
    }
  };

  const stopDrone = () => {
    const mainGain = droneGainRef.current;
    const ctx = audioCtxRef.current;
    
    if (mainGain && ctx) {
      const fadeTime = ctx.currentTime;
      // Fade out over 1.2 seconds
      mainGain.gain.setValueAtTime(mainGain.gain.value, fadeTime);
      mainGain.gain.linearRampToValueAtTime(0, fadeTime + 1.2);

      setTimeout(() => {
        droneOscsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });
        droneOscsRef.current = [];
        
        try {
          ctx.close();
        } catch (e) {}
        
        audioCtxRef.current = null;
        droneGainRef.current = null;
        setIsDronePlaying(false);
      }, 1300);
    }
  };

  const toggleDrone = () => {
    if (isDronePlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  return (
    <div id="divine-audio-controls" className="flex items-center gap-3 bg-amber-100/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-amber-200/50 shadow-sm transition-all duration-300">
      {/* Temple Bell */}
      <button
        id="btn-temple-bell"
        onClick={playTempleBell}
        className={`p-2 rounded-full transition-all duration-300 ${
          bellActive 
            ? 'bg-amber-400 text-amber-950 scale-110 shadow-md ring-4 ring-amber-300/30' 
            : 'bg-amber-200/50 hover:bg-amber-200 text-amber-800'
        }`}
        title="Ring Temple Bell"
      >
        <Bell className={`w-5 h-5 ${bellActive ? 'animate-bounce' : ''}`} />
      </button>

      <div className="h-4 w-px bg-amber-200/60" />

      {/* Meditative Soundscape */}
      <button
        id="btn-meditative-drone"
        onClick={toggleDrone}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
          isDronePlaying
            ? 'bg-amber-600 text-amber-50 shadow-sm ring-2 ring-amber-500/20'
            : 'bg-amber-200/30 hover:bg-amber-200/60 text-amber-800'
        }`}
        title={isDronePlaying ? 'Mute Meditative Soundscape' : 'Play Meditative Soundscape'}
      >
        {isDronePlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">Soundscape: On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline">Soundscape: Off</span>
          </>
        )}
      </button>
    </div>
  );
}
