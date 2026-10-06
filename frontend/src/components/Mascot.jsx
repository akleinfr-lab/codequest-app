import React from 'react'
import { motion } from 'framer-motion'

export function Mascot() {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        display: 'inline-block',
        cursor: 'pointer'
      }}
    >
      <svg width="200" height="220" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
        {/* Ombre */}
        <ellipse cx="100" cy="205" rx="60" ry="12" fill="rgba(0,0,0,0.1)" />

        {/* Corps principal - bleu gradient */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0066FF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0047CC', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0088FF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0066FF', stopOpacity: 1 }} />
          </linearGradient>

          <radialGradient id="cheekGradient">
            <stop offset="0%" style={{ stopColor: '#FF69B4', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#FF69B4', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Corps */}
        <ellipse cx="100" cy="140" rx="45" ry="55" fill="url(#bodyGradient)" />

        {/* Bras gauche */}
        <g>
          <ellipse cx="60" cy="125" rx="18" ry="35" fill="url(#bodyGradient)" transform="rotate(-25 60 125)" />
          <circle cx="45" cy="155" r="14" fill="#0066FF" />
        </g>

        {/* Bras droit */}
        <g>
          <ellipse cx="140" cy="125" rx="18" ry="35" fill="url(#bodyGradient)" transform="rotate(25 140 125)" />
          <circle cx="155" cy="155" r="14" fill="#0066FF" />
        </g>

        {/* Jambes */}
        <g>
          {/* Jambe gauche */}
          <rect x="80" y="185" width="16" height="25" rx="8" fill="#0047CC" />
          <circle cx="88" cy="215" r="12" fill="#FFB700" />

          {/* Jambe droite */}
          <rect x="104" y="185" width="16" height="25" rx="8" fill="#0047CC" />
          <circle cx="112" cy="215" r="12" fill="#FFB700" />
        </g>

        {/* Tête */}
        <circle cx="100" cy="70" r="45" fill="url(#headGradient)" />

        {/* Joues rosées */}
        <circle cx="65" cy="75" r="18" fill="url(#cheekGradient)" />
        <circle cx="135" cy="75" r="18" fill="url(#cheekGradient)" />

        {/* Yeux blancs */}
        <circle cx="80" cy="55" r="12" fill="#fff" />
        <circle cx="120" cy="55" r="12" fill="#fff" />

        {/* Iris bleus animés */}
        <motion.circle
          cx="80"
          cy="55"
          r="8"
          fill="#0066FF"
          animate={{
            cx: [80, 82, 78, 80],
            cy: [55, 56, 54, 55]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        <motion.circle
          cx="120"
          cy="55"
          r="8"
          fill="#0066FF"
          animate={{
            cx: [120, 122, 118, 120],
            cy: [55, 56, 54, 55]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Pupils */}
        <circle cx="80" cy="55" r="4" fill="#000" />
        <circle cx="120" cy="55" r="4" fill="#000" />

        {/* Reflet dans les yeux */}
        <circle cx="82" cy="53" r="2" fill="#fff" opacity="0.8" />
        <circle cx="122" cy="53" r="2" fill="#fff" opacity="0.8" />

        {/* Nez */}
        <path d="M 100 70 L 98 80 L 102 80 Z" fill="#FF69B4" />

        {/* Bouche souriante */}
        <path
          d="M 90 88 Q 100 98 110 88"
          stroke="#FF69B4"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Langue */}
        <ellipse cx="100" cy="95" rx="6" ry="4" fill="#FF69B4" />

        {/* Antenne/cheveu magique avec étoile */}
        <g>
          <path
            d="M 90 25 Q 85 10 90 5"
            stroke="#FFB700"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <motion.g
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            style={{
              transformOrigin: '90px 5px'
            }}
          >
            <polygon points="90,0 92,6 98,7 93,11 95,17 90,13 85,17 87,11 82,7 88,6" fill="#FFB700" />
          </motion.g>
        </g>

        {/* Couronne/bandeau XP */}
        <g>
          <ellipse cx="100" cy="30" rx="48" ry="8" fill="none" stroke="#FFB700" strokeWidth="2" />
          <circle cx="75" cy="28" r="5" fill="#FFB700" />
          <circle cx="100" cy="24" r="6" fill="#FFB700" />
          <circle cx="125" cy="28" r="5" fill="#FFB700" />
        </g>

        {/* Accessoires - badge */}
        <g>
          <circle cx="135" cy="120" r="18" fill="#FFB700" opacity="0.9" />
          <circle cx="135" cy="120" r="15" fill="#FFC700" />
          <text x="135" y="125" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#000">
            XP
          </text>
        </g>
      </svg>
    </motion.div>
  )
}

// Variante avec expression différente
export function MascotSmile() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 1, -1, 0]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity
      }}
    >
      <svg width="150" height="160" viewBox="0 0 150 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0066FF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0047CC', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Ombre */}
        <ellipse cx="75" cy="150" rx="45" ry="8" fill="rgba(0,0,0,0.1)" />

        {/* Corps */}
        <ellipse cx="75" cy="100" rx="35" ry="45" fill="url(#bodyGrad)" />

        {/* Tête */}
        <circle cx="75" cy="50" r="35" fill="url(#bodyGrad)" />

        {/* Joues */}
        <circle cx="50" cy="55" r="14" fill="#FF69B4" opacity="0.5" />
        <circle cx="100" cy="55" r="14" fill="#FF69B4" opacity="0.5" />

        {/* Yeux */}
        <circle cx="62" cy="40" r="8" fill="#fff" />
        <circle cx="88" cy="40" r="8" fill="#fff" />
        <circle cx="62" cy="40" r="5" fill="#0066FF" />
        <circle cx="88" cy="40" r="5" fill="#0066FF" />
        <circle cx="62" cy="38" r="2" fill="#fff" />
        <circle cx="88" cy="38" r="2" fill="#fff" />

        {/* Sourire */}
        <path d="M 65 55 Q 75 62 85 55" stroke="#FF69B4" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Étoile sur la tête */}
        <polygon points="75,15 79,25 90,25 82,31 86,41 75,35 64,41 68,31 60,25 71,25" fill="#FFB700" />
      </svg>
    </motion.div>
  )
}

// Variante celebratory avec confetti
export function MascotCelebrate() {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    >
      <svg width="180" height="200" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGradFinal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0066FF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0047CC', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Confetti animé */}
        <motion.circle
          cx="50"
          cy="30"
          r="4"
          fill="#FFB700"
          animate={{
            y: [0, 100],
            x: [0, 20],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        <motion.rect
          x="140"
          y="20"
          width="6"
          height="6"
          fill="#FF69B4"
          animate={{
            y: [0, 100],
            x: [0, -15],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3
          }}
        />
        <motion.polygon
          points="90,10 95,18 90,22 85,18"
          fill="#00DD00"
          animate={{
            y: [0, 90],
            rotate: [0, 360],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.6
          }}
        />

        {/* Corps principal */}
        <ellipse cx="90" cy="120" rx="40" ry="50" fill="url(#bodyGradFinal)" />

        {/* Tête */}
        <circle cx="90" cy="60" r="40" fill="url(#bodyGradFinal)" />

        {/* Yeux joyeux */}
        <ellipse cx="75" cy="50" rx="10" ry="14" fill="#fff" />
        <ellipse cx="105" cy="50" rx="10" ry="14" fill="#fff" />
        <path d="M 70 45 Q 75 42 80 45" stroke="#0066FF" strokeWidth="2" fill="none" />
        <path d="M 100 45 Q 105 42 110 45" stroke="#0066FF" strokeWidth="2" fill="none" />

        {/* Grand sourire */}
        <path d="M 75 65 Q 90 75 105 65" stroke="#FF69B4" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Bras levés */}
        <ellipse cx="55" cy="100" rx="15" ry="30" fill="url(#bodyGradFinal)" transform="rotate(-45 55 100)" />
        <circle cx="35" cy="75" r="12" fill="#0066FF" />

        <ellipse cx="125" cy="100" rx="15" ry="30" fill="url(#bodyGradFinal)" transform="rotate(45 125 100)" />
        <circle cx="145" cy="75" r="12" fill="#0066FF" />

        {/* Couronne dorée */}
        <ellipse cx="90" cy="20" rx="45" ry="12" fill="none" stroke="#FFB700" strokeWidth="3" />
        <circle cx="65" cy="18" r="6" fill="#FFB700" />
        <circle cx="90" cy="12" r="8" fill="#FFB700" />
        <circle cx="115" cy="18" r="6" fill="#FFB700" />
      </svg>
    </motion.div>
  )
}

export default Mascot
