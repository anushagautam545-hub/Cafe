import React from 'react';

interface IllustrationProps {
  type: 'hero' | 'pourover' | 'croissant' | 'fireplace' | 'matcha' | 'cortado' | 'cappuccino' | 'babka' | 'tartine' | 'roastery';
  className?: string;
}

export const CafeIllustration: React.FC<IllustrationProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'hero':
      return (
        <div className={`relative w-full h-full min-h-[360px] lg:min-h-[460px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2D1A12] via-[#3B2218] to-[#1F120C] flex items-center justify-center p-8 shadow-2xl border border-[#4A2D1F]/40 ${className}`}>
          {/* Ambient Warm Glow */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F4A261]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Architectural Window Grid Silhouette */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF0E6_1px,transparent_1px)] [background-size:24px_24px]" />

          <svg viewBox="0 0 500 360" className="w-full h-full max-w-lg drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wooden Counter Surface */}
            <path d="M40 280 L460 280 L440 330 L60 330 Z" fill="#4A2818" />
            <path d="M40 280 L460 280 L455 288 L45 288 Z" fill="#6B3A23" />
            <line x1="60" y1="305" x2="440" y2="305" stroke="#361C10" strokeWidth="2" strokeDasharray="8 6" />

            {/* Ceramic Coffee Mug */}
            <g transform="translate(180, 160)">
              {/* Saucer */}
              <ellipse cx="70" cy="115" rx="65" ry="14" fill="#3D2014" opacity="0.6" />
              <ellipse cx="70" cy="110" rx="60" ry="12" fill="#E8D8C8" />
              <ellipse cx="70" cy="109" rx="45" ry="8" fill="#D4C1B0" />

              {/* Mug Body */}
              <path d="M35 45 C35 95 45 105 70 105 C95 105 105 95 105 45 Z" fill="#F7F2EA" />
              <path d="M36 45 C36 90 46 100 68 102 C42 98 38 75 38 45 Z" fill="#E2D4C3" opacity="0.5" />
              {/* Mug rim */}
              <ellipse cx="70" cy="45" rx="35" ry="10" fill="#E8D8C8" />
              {/* Coffee Liquid */}
              <ellipse cx="70" cy="46" rx="32" ry="8" fill="#3F2212" />
              {/* Latte Art Heart */}
              <path d="M70 48 C66 43 57 44 60 50 C63 53 70 56 70 56 C70 56 77 53 80 50 C83 44 74 43 70 48 Z" fill="#FAF5EF" opacity="0.9" />

              {/* Mug Handle */}
              <path d="M103 52 C120 54 122 84 100 90" stroke="#F7F2EA" strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M103 52 C120 54 122 84 100 90" stroke="#E2D4C3" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Rising Steam Lines */}
              <path d="M60 30 C56 18 64 8 60 -5" stroke="#FAF5EF" strokeWidth="2" strokeLinecap="round" opacity="0.4" className="animate-pulse" />
              <path d="M72 26 C76 14 68 4 72 -10" stroke="#FAF5EF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <path d="M82 32 C86 20 80 12 84 0" stroke="#FAF5EF" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            </g>

            {/* Vintage Chemex Maker */}
            <g transform="translate(70, 110)">
              {/* Base shadow */}
              <ellipse cx="50" cy="170" rx="40" ry="8" fill="#2A140B" opacity="0.5" />
              {/* Chemex glass body */}
              <path d="M30 40 L45 85 C45 85 20 145 20 160 C20 172 32 172 50 172 C68 172 80 172 80 160 C80 145 55 85 55 85 L70 40 Z" fill="#FAF5EF" fillOpacity="0.08" stroke="#E8D8C8" strokeWidth="2" />
              {/* Brewed coffee level */}
              <path d="M22 155 C22 168 32 169 50 169 C68 169 78 168 78 155 C78 143 62 110 50 110 C38 110 22 143 22 155 Z" fill="#582C18" fillOpacity="0.8" />
              {/* Wooden Collar */}
              <rect x="41" y="80" width="18" height="22" rx="3" fill="#A86236" />
              <line x1="41" y1="91" x2="59" y2="91" stroke="#3F1D0B" strokeWidth="2" />
              {/* Leather tie */}
              <circle cx="50" cy="91" r="3.5" fill="#E8B878" />
            </g>

            {/* Freshly Baked Croissant Plate */}
            <g transform="translate(310, 190)">
              {/* Plate */}
              <ellipse cx="65" cy="85" rx="55" ry="12" fill="#2A140B" opacity="0.5" />
              <ellipse cx="65" cy="80" rx="52" ry="10" fill="#EFE8DE" />
              {/* Golden Croissant */}
              <path d="M30 76 C32 62 48 55 65 55 C82 55 98 62 100 76 C94 80 84 75 65 75 C46 75 36 80 30 76 Z" fill="#D97706" />
              <path d="M42 74 C44 64 54 58 65 58 C76 58 86 64 88 74 C82 72 73 70 65 70 C57 70 48 72 42 74 Z" fill="#B45309" />
              <path d="M52 70 C54 62 60 60 65 60 C70 60 76 62 78 70 Z" fill="#92400E" />
              {/* Powdered sugar sparkles */}
              <circle cx="58" cy="64" r="1.5" fill="#FFFBEB" />
              <circle cx="68" cy="62" r="1.5" fill="#FFFBEB" />
              <circle cx="74" cy="66" r="1.2" fill="#FFFBEB" />
            </g>

            {/* Roasted Coffee Beans on Table */}
            <g transform="translate(260, 282)">
              <ellipse cx="8" cy="8" rx="6" ry="4" fill="#3D1D0E" transform="rotate(-25 8 8)" />
              <path d="M4 6 Q8 9 12 7" stroke="#220F07" strokeWidth="1" fill="none" />
              <ellipse cx="22" cy="12" rx="5.5" ry="3.8" fill="#4A2613" transform="rotate(15 22 12)" />
              <path d="M18 11 Q22 13 26 12" stroke="#220F07" strokeWidth="1" fill="none" />
              <ellipse cx="14" cy="18" rx="5" ry="3.5" fill="#36170B" transform="rotate(40 14 18)" />
            </g>
          </svg>

          {/* Floating Aesthetic Badge */}
          <div className="absolute top-6 right-6 bg-[#24130C]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#5A3826]/40 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
            <span className="text-xs text-[#E8D8C8] font-medium tracking-wide">Roasting Daily · 07:00 AM – 07:00 PM</span>
          </div>
        </div>
      );

    case 'pourover':
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#F5EDE3] via-[#EFE5D7] to-[#E5D7C5] p-6 flex items-center justify-center relative overflow-hidden border border-[#DECDBB]/60 ${className}`}>
          <svg viewBox="0 0 160 140" className="w-full h-full max-h-48 drop-shadow-md" fill="none">
            <ellipse cx="80" cy="126" rx="44" ry="7" fill="#8C735E" opacity="0.25" />
            {/* Glass server */}
            <path d="M52 46 L60 80 C60 80 40 115 40 120 C40 128 52 128 80 128 C108 128 120 128 120 120 C120 115 100 80 100 80 L108 46 Z" fill="#FFFFFF" fillOpacity="0.4" stroke="#8C735E" strokeWidth="2.5" />
            {/* Amber Brew */}
            <path d="M43 118 C43 125 55 125 80 125 C105 125 117 125 117 118 C117 110 106 95 80 95 C54 95 43 110 43 118 Z" fill="#9A3412" fillOpacity="0.85" />
            {/* Wooden Handle & Collar */}
            <rect x="58" y="74" width="44" height="15" rx="3" fill="#B45309" />
            <line x1="58" y1="82" x2="102" y2="82" stroke="#451A03" strokeWidth="1.5" />
            <circle cx="80" cy="82" r="3" fill="#FDE68A" />
            {/* Dripper filter cone on top */}
            <path d="M48 20 L112 20 L80 46 Z" fill="#FEF3C7" stroke="#8C735E" strokeWidth="2" />
            {/* Coffee bloom in dripper */}
            <ellipse cx="80" cy="24" rx="26" ry="6" fill="#451A03" />
            {/* Steam */}
            <path d="M76 12 C72 4 82 -2 78 -8" stroke="#8C735E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M84 10 C88 2 80 -4 84 -10" stroke="#8C735E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
      );

    case 'cappuccino':
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#EFE4D6] p-6 flex items-center justify-center relative overflow-hidden border border-[#DECDBB]/60 ${className}`}>
          <svg viewBox="0 0 160 140" className="w-full h-full max-h-48 drop-shadow-md" fill="none">
            <ellipse cx="80" cy="116" rx="56" ry="10" fill="#9C826D" opacity="0.25" />
            <ellipse cx="80" cy="112" rx="52" ry="9" fill="#E8DDD1" />
            <ellipse cx="80" cy="111" rx="38" ry="6" fill="#D3C3B3" />

            <path d="M46 54 C46 95 56 106 80 106 C104 106 114 95 114 54 Z" fill="#FDFBF7" stroke="#DECDBB" strokeWidth="2" />
            <ellipse cx="80" cy="54" rx="34" ry="10" fill="#EADBCB" />
            <ellipse cx="80" cy="55" rx="31" ry="8" fill="#4A2511" />
            {/* Latte Heart / Tulip */}
            <path d="M80 57 C76 52 69 53 71 58 C74 61 80 63 80 63 C80 63 86 61 89 58 C91 53 84 52 80 57 Z" fill="#FAF5EE" />
            <ellipse cx="80" cy="53" rx="7" ry="2.5" fill="#FAF5EE" />
            {/* Handle */}
            <path d="M112 62 C126 64 128 88 110 93" stroke="#FDFBF7" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M112 62 C126 64 128 88 110 93" stroke="#DECDBB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Orange twist garnish */}
            <path d="M62 48 Q68 44 72 49" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'matcha':
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#F2F7F2] to-[#E3EFE3] p-6 flex items-center justify-center relative overflow-hidden border border-[#CFE1CF]/60 ${className}`}>
          <svg viewBox="0 0 160 140" className="w-full h-full max-h-48 drop-shadow-md" fill="none">
            <ellipse cx="80" cy="116" rx="50" ry="8" fill="#4A6B4A" opacity="0.2" />
            {/* Terracotta/clay matcha bowl (chawan) */}
            <path d="M42 50 C44 94 56 108 80 108 C104 108 116 94 118 50 Z" fill="#B45309" opacity="0.85" />
            <path d="M43 51 C45 92 57 105 80 105 C103 105 115 92 117 51 Z" fill="#D97706" opacity="0.4" />
            <ellipse cx="80" cy="50" rx="38" ry="10" fill="#92400E" />
            {/* Frothy Green Matcha */}
            <ellipse cx="80" cy="52" rx="35" ry="8" fill="#15803D" />
            <ellipse cx="80" cy="52" rx="28" ry="6" fill="#16A34A" />
            {/* Swirl foam */}
            <path d="M72 52 Q80 48 88 52 Q80 56 72 52" stroke="#BBF7D0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Lavender blossom */}
            <circle cx="88" cy="49" r="2.5" fill="#A855F7" />
            <circle cx="92" cy="51" r="2" fill="#C084FC" />
          </svg>
        </div>
      );

    case 'croissant':
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#EFE5D7] p-6 flex items-center justify-center relative overflow-hidden border border-[#DECDBB]/60 ${className}`}>
          <svg viewBox="0 0 160 140" className="w-full h-full max-h-48 drop-shadow-md" fill="none">
            <ellipse cx="80" cy="110" rx="60" ry="12" fill="#8C735E" opacity="0.25" />
            <ellipse cx="80" cy="105" rx="55" ry="10" fill="#F5EFE6" stroke="#DECDBB" strokeWidth="1.5" />
            {/* Croissant curves */}
            <path d="M38 98 C40 76 60 66 80 66 C100 66 120 76 122 98 C115 103 102 96 80 96 C58 96 45 103 38 98 Z" fill="#D97706" />
            <path d="M50 94 C54 78 66 72 80 72 C94 72 106 78 110 94 C104 90 92 88 80 88 C68 88 56 90 50 94 Z" fill="#B45309" />
            <path d="M64 90 C68 80 74 76 80 76 C86 76 92 80 96 90 Z" fill="#92400E" />
            {/* Flaked almonds */}
            <ellipse cx="72" cy="74" rx="4" ry="2" fill="#FEF3C7" transform="rotate(-15 72 74)" />
            <ellipse cx="88" cy="78" rx="4.5" ry="2.2" fill="#FEF3C7" transform="rotate(25 88 78)" />
            <ellipse cx="60" cy="85" rx="4" ry="2" fill="#FEF3C7" transform="rotate(10 60 85)" />
            <ellipse cx="100" cy="86" rx="4" ry="2" fill="#FEF3C7" transform="rotate(-20 100 86)" />
          </svg>
        </div>
      );

    case 'fireplace':
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#2D1B13] via-[#3B2419] to-[#1E110A] p-6 flex items-center justify-center relative overflow-hidden border border-[#523322] ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] opacity-10 [background-size:16px_16px]" />
          <div className="absolute bottom-6 w-32 h-32 bg-[#EA580C]/25 rounded-full blur-2xl" />
          <svg viewBox="0 0 160 140" className="w-full h-full max-h-48 drop-shadow-xl" fill="none">
            {/* Fireplace Hearth Arch */}
            <path d="M40 120 L40 50 C40 28 60 20 80 20 C100 20 120 28 120 50 L120 120 Z" fill="#1C100B" stroke="#6B3F27" strokeWidth="4" />
            {/* Brick Texture Lines */}
            <line x1="30" y1="120" x2="130" y2="120" stroke="#8C5335" strokeWidth="6" />
            {/* Logs */}
            <path d="M52 112 L108 112 L104 105 L56 105 Z" fill="#451A03" />
            <path d="M58 108 L102 96" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            {/* Fire Flames */}
            <path d="M68 110 C62 95 72 85 76 75 C78 88 88 82 86 65 C94 80 96 95 90 110 Z" fill="#EA580C" />
            <path d="M72 110 C70 100 76 94 78 86 C82 96 86 92 86 110 Z" fill="#FBBF24" />
            {/* Cozy Armchair silhouette on side */}
            <path d="M22 118 L22 80 C22 75 26 72 32 72 L34 118 Z" fill="#3D2014" opacity="0.7" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#EFE5D7] p-6 flex items-center justify-center relative overflow-hidden border border-[#DECDBB]/60 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#8C5335]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 35 H70 V65 C70 75 60 85 45 85 C30 85 20 75 20 65 Z" />
            <path d="M70 42 H82 C86 42 88 52 82 58 H70" />
            <path d="M35 25 Q40 18 35 12" />
            <path d="M45 25 Q50 18 45 12" />
            <path d="M55 25 Q60 18 55 12" />
          </svg>
        </div>
      );
  }
};
