import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  rainVolume: number;
  setRainVolume: (val: number) => void;
  fireVolume: number;
  setFireVolume: (val: number) => void;
  chordsVolume: number;
  setChordsVolume: (val: number) => void;
  activePreset: string;
  applyPreset: (preset: 'rain' | 'hearth' | 'lofi' | 'off') => void;
}

const CozyAudioContext = createContext<AudioContextType | undefined>(undefined);

export const CozyAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rainVolume, setRainVolumeState] = useState(0.4);
  const [fireVolume, setFireVolumeState] = useState(0.3);
  const [chordsVolume, setChordsVolumeState] = useState(0.25);
  const [activePreset, setActivePreset] = useState<string>('rain');

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const fireGainRef = useRef<GainNode | null>(null);
  const chordsGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<{ cleanup?: () => void }>({});

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return audioCtxRef.current;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 1.0;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // --- 1. RAIN SYNTHESIZER ---
    const rainGain = ctx.createGain();
    rainGain.gain.value = rainVolume;
    rainGain.connect(master);
    rainGainRef.current = rainGain;

    // Buffer pink noise for smooth soothing rainfall
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    // Filter to make it sound like rain outside a cozy windowpane
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 950;
    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainSource.start();

    // --- 2. FIREPLACE CRACKLE ---
    const fireGain = ctx.createGain();
    fireGain.gain.value = fireVolume;
    fireGain.connect(master);
    fireGainRef.current = fireGain;

    const fireFilter = ctx.createBiquadFilter();
    fireFilter.type = 'bandpass';
    fireFilter.frequency.value = 1400;
    fireFilter.Q.value = 3.5;
    fireFilter.connect(fireGain);

    // Crackle impulse timer
    const crackleInterval = setInterval(() => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      if (Math.random() > 0.4) {
        const osc = ctx.createOscillator();
        const popGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(60 + Math.random() * 240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);
        popGain.gain.setValueAtTime(0.35 + Math.random() * 0.4, ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(popGain);
        popGain.connect(fireGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    }, 90);

    // --- 3. WARM JAZZ LO-FI CHORD PROGRESSION ---
    const chordsGain = ctx.createGain();
    chordsGain.gain.value = chordsVolume;
    chordsGain.connect(master);
    chordsGainRef.current = chordsGain;

    // Mellow Fmaj9 -> Dm9 -> Gm9 -> C7b9
    const chordFrequencies = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [146.83, 220.00, 261.63, 311.13, 349.23], // Dm9
      [196.00, 233.08, 293.66, 349.23, 440.00], // Gm9
      [130.81, 196.00, 246.94, 311.13, 370.00]  // C7b9
    ];

    let chordIdx = 0;
    let chordOscs: { osc: OscillatorNode; gain: GainNode }[] = [];

    const playNextChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const now = ctx.currentTime;

      // Fade out old notes
      chordOscs.forEach(({ gain, osc }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
          osc.stop(now + 1.3);
        } catch {
          // ignore
        }
      });
      chordOscs = [];

      const currentNotes = chordFrequencies[chordIdx % chordFrequencies.length];
      chordIdx++;

      currentNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft mellow swell
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(0.045, now + 1.5);
        noteGain.gain.exponentialRampToValueAtTime(0.015, now + 5.5);

        osc.connect(noteGain);
        noteGain.connect(chordsGain);
        osc.start(now);
        chordOscs.push({ osc, gain: noteGain });
      });
    };

    const chordInterval = setInterval(playNextChord, 6000);

    nodesRef.current.cleanup = () => {
      clearInterval(crackleInterval);
      clearInterval(chordInterval);
      rainSource.stop();
      ctx.close();
    };

    return ctx;
  }, [rainVolume, fireVolume, chordsVolume]);

  const togglePlay = async () => {
    const ctx = initAudio();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
      setIsPlaying(true);
    } else if (isPlaying) {
      await ctx.suspend();
      setIsPlaying(false);
    } else {
      await ctx.resume();
      setIsPlaying(true);
    }
  };

  const setRainVolume = (val: number) => {
    setRainVolumeState(val);
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const setFireVolume = (val: number) => {
    setFireVolumeState(val);
    if (fireGainRef.current && audioCtxRef.current) {
      fireGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const setChordsVolume = (val: number) => {
    setChordsVolumeState(val);
    if (chordsGainRef.current && audioCtxRef.current) {
      chordsGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const applyPreset = async (preset: 'rain' | 'hearth' | 'lofi' | 'off') => {
    setActivePreset(preset);
    if (preset === 'off') {
      if (isPlaying) togglePlay();
      return;
    }

    if (!isPlaying) {
      await togglePlay();
    }

    if (preset === 'rain') {
      setRainVolume(0.55);
      setFireVolume(0.15);
      setChordsVolume(0.20);
    } else if (preset === 'hearth') {
      setRainVolume(0.10);
      setFireVolume(0.55);
      setChordsVolume(0.20);
    } else if (preset === 'lofi') {
      setRainVolume(0.20);
      setFireVolume(0.15);
      setChordsVolume(0.45);
    }
  };

  useEffect(() => {
    return () => {
      if (nodesRef.current.cleanup) {
        nodesRef.current.cleanup();
      }
    };
  }, []);

  return (
    <CozyAudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        rainVolume,
        setRainVolume,
        fireVolume,
        setFireVolume,
        chordsVolume,
        setChordsVolume,
        activePreset,
        applyPreset
      }}
    >
      {children}
    </CozyAudioContext.Provider>
  );
};

export const useCozyAudio = () => {
  const context = useContext(CozyAudioContext);
  if (!context) {
    throw new Error('useCozyAudio must be used within a CozyAudioProvider');
  }
  return context;
};
