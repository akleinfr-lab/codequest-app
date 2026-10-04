import React, { useState } from 'react'
import { motion } from 'framer-motion'

const user = {
  name: 'Alice Dubois',
  avatar: '👩‍🎓',
  plan: 'Premium',
  level: 8,
  totalXP: 1450,
  currentXP: 350,
  xpNeeded: 500,
  streak: 12,
  energy: 74,
  maxEnergy: 100
}

const badges = [
  { id: 1, name: 'Première victoire', icon: '🏆', unlocked: true, level: 1, rarity: 'Bronze' },
  { id: 2, name: 'Série 7 jours', icon: '🔥', unlocked: true, level: 7, rarity: 'Silver' },
  { id: 3, name: 'Expert Maths', icon: '⭐', unlocked: false, level: 10, rarity: 'Gold' },
  { id: 4, name: 'Master Français', icon: '📚', unlocked: false, level: 10, rarity: 'Gold' },
  { id: 5, name: '100 questions', icon: '💯', unlocked: false, level: 15, rarity: 'Platine' },
  { id: 6, name: 'Génie Sciences', icon: '🧪', unlocked: false, level: 12, rarity: 'Ruby' },
  { id: 7, name: 'Héros Histoire', icon: '🏛️', unlocked: false, level: 14, rarity: 'Gold' },
  { id: 8, name: 'Mestre EMC', icon: '⚖️', unlocked: false, level: 11, rarity: 'Silver' },
  { id: 9, name: 'Codeur débutant', icon: '💻', unlocked: false, level: 8, rarity: 'Blue' },
  { id: 10, name: 'Niveau 10', icon: '🚀', unlocked: false, level: 10, rarity: 'Gold' }
]

function BadgeCard({ badge }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        background: badge.unlocked ? '#fff7d6' : '#f0f0f0',
        border: badge.unlocked ? '2px solid #FFB700' : '2px solid #dfe3e8',
        borderRadius: 18,
        padding: 18,
        textAlign: 'center',
        minHeight: 180
      }}
    >
      <div style={{ fontSize: 42 }}>{badge.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 16, marginTop: 10 }}>{badge.name}</div>
      <div style={{ color: '#666', fontSize: 12, marginTop: 6 }}>{badge.rarity}</div>

      {badge.unlocked ? (
        <div style={{ marginTop: 12, background: '#FFB700', color: '#fff', borderRadius: 999, padding: '6px 10px', fontSize: 12, display: 'inline-block' }}>
          ✓ Débloqué
        </div>
      ) : (
        <div style={{ marginTop: 12, color: '#666', fontSize: 12 }}>
          Niveau {badge.level}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const unlocked = badges.filter((b) => b.unlocked).length

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 20 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ background: 'linear-gradient(90deg, #0066FF, #1f6bff)', borderRadius: 24, padding: 22, color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 52 }}>{user.avatar}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{user.name}</div>
                <div style={{ opacity: 0.9 }}>Collection de badges</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 16px' }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Badges</div>
              <div style={{ fontWeight: 700 }}>{unlocked}/{badges.length}</div>
            </div>
          </div>
        </header>

        <section style={{ background: '#fff', borderRadius: 20, boxShadow: '0 5px 20px rgba(0,0,0,0.08)', padding: 24, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 26 }}>Vos récompenses</h2>
            <div style={{ color: '#666', fontWeight: 700 }}>
              {unlocked} débloqués
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 18 }}>
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
