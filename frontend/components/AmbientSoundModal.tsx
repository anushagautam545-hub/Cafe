import React from 'react';
import { CloudRain, Flame, Music, Volume2, X, Sparkles, Check } from 'lucide-react';
import { useCozyAudio } from '../context/AudioContext.js';

interface AmbientSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmbientSoundModal: React.FC<AmbientSoundModalProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useCozyAudio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F120C]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#DECDBB] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-[#2C1810]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6150] hover:text-[#2C1810] hover:bg-[#EFE5D7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#B45309] uppercase mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Atmospheric Soundscape</span>
        </div>

        <h3 className="text-2xl font-display font-bold text-[#2C1810] mb-2">
          Cozy Cafe Ambience
        </h3>
        <p className="text-sm text-[#6B5143] mb-6">
          Handcrafted audio generated live in your browser using pure harmonic audio synthesis. Zero downloads, pure calm.
        </p>

        {/* Master Play/Pause Toggle */}
        <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#E4D4C4] flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isPlaying ? 'bg-[#78350F] text-white' : 'bg-[#E3D1BE] text-[#78350F]'}`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#2C1810]">
                {isPlaying ? 'Ambience Playing' : 'Ambience Paused'}
              </div>
              <div className="text-xs text-[#7A6150]">
                {isPlaying ? 'Listening to soothing warmth' : 'Click play to start relaxation'}
              </div>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all shadow-sm ${
              isPlaying
                ? 'bg-[#2C1810] text-[#FAF7F2] hover:bg-[#432519]'
                : 'bg-[#B45309] text-white hover:bg-[#92400E]'
            }`}
          >
            {isPlaying ? 'Pause' : 'Play Sound'}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#7A6150] uppercase tracking-wider mb-2">
            Atmosphere Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => applyPreset('rain')}
              className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all ${
                activePreset === 'rain' && isPlaying
                  ? 'bg-[#2C1810] text-white border-[#2C1810]'
                  : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CloudRain className="w-3.5 h-3.5" />
                <span>Rainy Bay</span>
              </div>
              <div className="text-[10px] opacity-80">Window drops</div>
            </button>

            <button
              onClick={() => applyPreset('hearth')}
              className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all ${
                activePreset === 'hearth' && isPlaying
                  ? 'bg-[#2C1810] text-white border-[#2C1810]'
                  : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Fireplace</span>
              </div>
              <div className="text-[10px] opacity-80">Wood crackle</div>
            </button>

            <button
              onClick={() => applyPreset('lofi')}
              className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all ${
                activePreset === 'lofi' && isPlaying
                  ? 'bg-[#2C1810] text-white border-[#2C1810]'
                  : 'bg-white text-[#5C4537] border-[#DECDBB] hover:border-[#B89F89]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Music className="w-3.5 h-3.5" />
                <span>Cafe Lo-Fi</span>
              </div>
              <div className="text-[10px] opacity-80">Soft chords</div>
            </button>
          </div>
        </div>

        {/* Sound Channel Mixers */}
        <div className="space-y-4 pt-2 border-t border-[#E8DEC8]">
          {/* Rain Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-[#4A3528] mb-1">
              <span className="flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-[#0369A1]" />
                Soft Rain on Glass
              </span>
              <span className="tabular-nums text-[#8C6D58]">{Math.round(rainVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={rainVolume}
              onChange={(e) => setRainVolume(parseFloat(e.target.value))}
              className="w-full accent-[#78350F] cursor-pointer"
            />
          </div>

          {/* Fireplace Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-[#4A3528] mb-1">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#EA580C]" />
                Crackling Hearth Logs
              </span>
              <span className="tabular-nums text-[#8C6D58]">{Math.round(fireVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={fireVolume}
              onChange={(e) => setFireVolume(parseFloat(e.target.value))}
              className="w-full accent-[#78350F] cursor-pointer"
            />
          </div>

          {/* Lo-Fi Chords Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-[#4A3528] mb-1">
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#B45309]" />
                Warm Rhodes & Jazz Harmonies
              </span>
              <span className="tabular-nums text-[#8C6D58]">{Math.round(chordsVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={chordsVolume}
              onChange={(e) => setChordsVolume(parseFloat(e.target.value))}
              className="w-full accent-[#78350F] cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8DEC8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#2C1810] text-[#FAF7F2] text-xs font-medium rounded-xl hover:bg-[#432519] transition-all"
          >
            Keep Playing & Close
          </button>
        </div>
      </div>
    </div>
  );
};
