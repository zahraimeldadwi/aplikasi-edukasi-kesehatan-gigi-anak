import React from 'react';
import { Gender } from '../types';

interface CharacterProps {
  type: 'hero' | 'gigi' | 'monster_karies' | 'monster_plak' | 'monster_kuman' | 'peri';
  gender?: Gender;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  action?: 'idle' | 'happy' | 'hurt' | 'attacking' | 'defeated';
  className?: string;
  onClick?: () => void;
}

export const CharacterAvatar: React.FC<CharacterProps> = ({
  type,
  gender = 'boy',
  size = 'md',
  action = 'idle',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  }[size];

  const getAnimationClass = () => {
    switch (action) {
      case 'happy':
        return 'animate-bounce';
      case 'hurt':
        return 'animate-pulse opacity-75';
      case 'attacking':
        return 'scale-105 transition-transform duration-200';
      case 'defeated':
        return 'rotate-12 opacity-60 grayscale-[30%]';
      default:
        return 'hover:scale-105 transition-transform duration-300';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${getAnimationClass()} ${className}`}
    >
      {type === 'hero' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Superhero Cape */}
          <path
            d="M 35,45 Q 15,85 25,108 Q 60,118 95,108 Q 105,85 85,45 Z"
            fill={gender === 'boy' ? '#3B82F6' : '#EC4899'}
            stroke="#1E3A8A"
            strokeWidth="2.5"
          />
          {/* Hero Body / Suit */}
          <circle cx="60" cy="80" r="28" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
          <path d="M 40,78 Q 60,95 80,78" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="3 3" />
          {/* Hero Emblem: Tooth Star */}
          <circle cx="60" cy="78" r="14" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
          <path d="M 56,72 Q 60,70 64,72 Q 65,78 63,83 Q 60,86 57,83 Q 55,78 56,72 Z" fill="#38BDF8" />
          {/* Head & Neck */}
          <circle cx="60" cy="42" r="22" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
          {/* Hair */}
          {gender === 'boy' ? (
            <path
              d="M 38,38 Q 42,20 60,18 Q 78,20 82,38 Q 74,28 60,26 Q 46,28 38,38 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="2"
            />
          ) : (
            <g>
              {/* Girl Hair with Pigtails */}
              <path
                d="M 38,40 Q 42,18 60,18 Q 78,18 82,40 Q 60,26 38,40 Z"
                fill="#92400E"
                stroke="#451A03"
                strokeWidth="2"
              />
              <circle cx="36" cy="38" r="8" fill="#92400E" />
              <circle cx="84" cy="38" r="8" fill="#92400E" />
              <circle cx="36" cy="38" r="3" fill="#EC4899" />
              <circle cx="84" cy="38" r="3" fill="#EC4899" />
            </g>
          )}
          {/* Eyes */}
          <circle cx="52" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="68" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="53" cy="39" r="1" fill="#FFFFFF" />
          <circle cx="69" cy="39" r="1" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="46" cy="46" r="3" fill="#FDA4AF" opacity="0.8" />
          <circle cx="74" cy="46" r="3" fill="#FDA4AF" opacity="0.8" />
          {/* Big Confident Smile */}
          <path d="M 52,48 Q 60,56 68,48" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Hero Headband / Crown */}
          <path d="M 40,30 Q 60,24 80,30" fill="none" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
          <polygon points="60,20 63,27 70,27 64,31 66,38 60,34 54,38 56,31 50,27 57,27" fill="#F59E0B" />
          {/* Toothbrush Wand in hand */}
          <g transform="translate(82, 55) rotate(25)">
            <rect x="0" y="0" width="6" height="36" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <rect x="-2" y="-10" width="10" height="12" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="0" stroke="#0284C7" strokeWidth="1" />
            <line x1="3" y1="-8" x2="3" y2="0" stroke="#0284C7" strokeWidth="1" />
            <line x1="6" y1="-8" x2="6" y2="0" stroke="#0284C7" strokeWidth="1" />
          </g>
        </svg>
      )}

      {type === 'gigi' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Sparkles */}
          <path d="M 22,24 L 25,16 L 28,24 L 36,27 L 28,30 L 25,38 L 22,30 L 14,27 Z" fill="#FDE047" />
          <path d="M 94,22 L 96,16 L 98,22 L 104,24 L 98,26 L 96,32 L 94,26 L 88,24 Z" fill="#FDE047" />
          {/* Main Tooth Body */}
          <path
            d="M 38,24 C 20,24 18,48 24,72 C 28,88 38,106 46,106 C 54,106 52,90 60,90 C 68,90 66,106 74,106 C 82,106 92,88 96,72 C 102,48 100,24 82,24 C 70,24 66,32 60,32 C 54,32 50,24 38,24 Z"
            fill="#FFFFFF"
            stroke="#38BDF8"
            strokeWidth="3.5"
          />
          {/* Cute Big Eyes */}
          <ellipse cx="46" cy="52" rx="6" ry="8" fill="#0F172A" />
          <ellipse cx="74" cy="52" rx="6" ry="8" fill="#0F172A" />
          <circle cx="48" cy="49" r="2.5" fill="#FFFFFF" />
          <circle cx="76" cy="49" r="2.5" fill="#FFFFFF" />
          {/* Cute Rosy Blushing Cheeks */}
          <circle cx="36" cy="62" r="5" fill="#FDA4AF" opacity="0.9" />
          <circle cx="84" cy="62" r="5" fill="#FDA4AF" opacity="0.9" />
          {/* Joyful Wide Open Smile */}
          <path d="M 46,62 Q 60,78 74,62" fill="#E11D48" stroke="#BE123C" strokeWidth="2" />
          <path d="M 52,66 Q 60,72 68,66" fill="#FDA4AF" />
          {/* Sparkle Tooth Gloss Highlight */}
          <path d="M 32,36 Q 30,50 34,64" fill="none" stroke="#E0F2FE" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}

      {type === 'monster_karies' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Cute Cartoon Cavity Monster Body */}
          <path
            d="M 30,42 C 22,20 46,14 60,20 C 74,14 98,20 90,42 C 104,60 102,88 88,100 C 72,112 48,112 32,100 C 18,88 16,60 30,42 Z"
            fill={action === 'defeated' ? '#A855F7' : '#9333EA'}
            stroke="#581C87"
            strokeWidth="3.5"
          />
          {/* Cute Monster Horns */}
          <path d="M 38,26 Q 30,10 24,14 Q 28,26 36,28" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M 82,26 Q 90,10 96,14 Q 92,26 84,28" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          {/* Cavity Spots / Spots */}
          <circle cx="40" cy="46" r="6" fill="#6B21A8" />
          <circle cx="82" cy="74" r="7" fill="#6B21A8" />
          <circle cx="34" cy="80" r="5" fill="#6B21A8" />
          {/* Goofy Monster Eyes (One big, one medium) */}
          <circle cx="48" cy="50" r="11" fill="#FEF08A" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="72" cy="48" r="8" fill="#FEF08A" stroke="#4C1D95" strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill="#1E1B4B" />
          <circle cx="74" cy="48" r="3.5" fill="#1E1B4B" />
          {/* Mischievous / Defeated Mouth with Cute Cavity Teeth */}
          {action === 'defeated' ? (
            <path d="M 44,82 Q 60,70 76,82" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
          ) : (
            <g>
              <path d="M 42,70 Q 60,94 78,70 Z" fill="#4C1D95" stroke="#3B0764" strokeWidth="2" />
              {/* Sharp Little Monster Teeth */}
              <polygon points="46,71 50,78 54,71" fill="#FFFFFF" />
              <polygon points="56,71 60,79 64,71" fill="#FFFFFF" />
              <polygon points="66,71 70,78 74,71" fill="#FFFFFF" />
              {/* Tongue holding lollipop candy */}
              <path d="M 54,82 Q 60,90 66,82" fill="#F43F5E" />
            </g>
          )}
          {/* Holding Candy / Lollipop */}
          <g transform="translate(18, 62) rotate(-20)">
            <line x1="10" y1="12" x2="10" y2="40" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="10" cy="12" r="11" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
            <path d="M 5,12 A 5,5 0 0,1 15,12" stroke="#FEF08A" strokeWidth="2" fill="none" />
          </g>
        </svg>
      )}

      {type === 'monster_plak' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Cute Gooey Plaque Monster Body */}
          <path
            d="M 32,46 C 24,28 54,20 64,22 C 78,16 94,30 92,50 C 104,64 100,90 84,102 C 68,110 46,110 32,98 C 16,84 18,60 32,46 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3.5"
          />
          {/* Gooey drips */}
          <circle cx="60" cy="106" r="4" fill="#EAB308" />
          <circle cx="42" cy="104" r="5" fill="#EAB308" />
          <circle cx="78" cy="102" r="3.5" fill="#EAB308" />
          {/* Sticky spots */}
          <ellipse cx="44" cy="40" rx="6" ry="4" fill="#EAB308" />
          <ellipse cx="80" cy="65" rx="5" ry="7" fill="#EAB308" />
          {/* Eyes */}
          <circle cx="46" cy="56" r="7" fill="#FFFFFF" stroke="#854D0E" strokeWidth="2" />
          <circle cx="72" cy="54" r="7" fill="#FFFFFF" stroke="#854D0E" strokeWidth="2" />
          <circle cx="48" cy="56" r="3" fill="#1C1917" />
          <circle cx="70" cy="54" r="3" fill="#1C1917" />
          {/* Smug / Gooey Grin */}
          <path d="M 46,74 Q 60,86 74,74" fill="none" stroke="#713F12" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      {type === 'monster_kuman' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Green Microbe Germ */}
          <path
            d="M 60,24 C 84,24 96,40 96,60 C 96,80 82,96 60,96 C 36,96 24,80 24,60 C 24,40 38,24 60,24 Z"
            fill="#10B981"
            stroke="#047857"
            strokeWidth="3.5"
          />
          {/* Microbe Tentacles */}
          <circle cx="60" cy="18" r="5" fill="#34D399" />
          <circle cx="98" cy="40" r="5" fill="#34D399" />
          <circle cx="102" cy="74" r="5" fill="#34D399" />
          <circle cx="78" cy="102" r="5" fill="#34D399" />
          <circle cx="42" cy="102" r="5" fill="#34D399" />
          <circle cx="18" cy="74" r="5" fill="#34D399" />
          <circle cx="20" cy="40" r="5" fill="#34D399" />
          {/* Eyes */}
          <circle cx="48" cy="54" r="8" fill="#FFFFFF" stroke="#064E3B" strokeWidth="2" />
          <circle cx="72" cy="54" r="8" fill="#FFFFFF" stroke="#064E3B" strokeWidth="2" />
          <circle cx="48" cy="54" r="4" fill="#022C22" />
          <circle cx="72" cy="54" r="4" fill="#022C22" />
          {/* Silly Tongue */}
          <path d="M 52,72 Q 60,82 68,72" fill="#047857" />
          <circle cx="60" cy="76" r="3" fill="#F43F5E" />
        </svg>
      )}

      {type === 'peri' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Fairy Wings */}
          <path
            d="M 60,50 C 40,16 8,30 24,60 C 14,75 32,85 54,64 Z"
            fill="#E0E7FF"
            stroke="#818CF8"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            d="M 60,50 C 80,16 112,30 96,60 C 106,75 88,85 66,64 Z"
            fill="#E0E7FF"
            stroke="#818CF8"
            strokeWidth="2"
            opacity="0.85"
          />
          {/* Fairy Body */}
          <path d="M 46,62 L 74,62 L 80,98 L 40,98 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          {/* Head & Hair */}
          <circle cx="60" cy="42" r="18" fill="#FED7AA" stroke="#FB923C" strokeWidth="2" />
          <path d="M 42,42 Q 60,20 78,42 Q 74,26 60,24 Q 46,26 42,42 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          {/* Tiara */}
          <polygon points="52,28 60,20 68,28 60,30" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* Eyes & Smile */}
          <circle cx="53" cy="42" r="2.5" fill="#4338CA" />
          <circle cx="67" cy="42" r="2.5" fill="#4338CA" />
          <circle cx="48" cy="48" r="2.5" fill="#FDA4AF" />
          <circle cx="72" cy="48" r="2.5" fill="#FDA4AF" />
          <path d="M 55,48 Q 60,54 65,48" fill="none" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
          {/* Star Wand */}
          <line x1="78" y1="50" x2="96" y2="82" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
          <polygon
            points="78,40 81,46 88,47 83,52 84,59 78,55 72,59 73,52 68,47 75,46"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </div>
  );
};
