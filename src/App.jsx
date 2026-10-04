import React from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    energy: '30 énergie / jour',
    description: 'Pour commencer et tester la plateforme',
    features: [
      'Accès aux matières de base',
      '30 questions max par jour',
      'Badges standards',
      'Progression limitée'
    ],
    featured: false,
    accent: '#dfe3e8'
  },
  {
    name: 'Premium',
    price: '8€/mois',
    energy: '100 énergie / jour',
    description: 'Pour aller plus loin et progresser rapidement',
    features: [
      '100 énergie par jour',
      'Bonus XP x2',
      'Accès à tous les niveaux',
      'Défis quotidiens avancés'
    ],
    featured: true,
    accent: '#0066FF'
  },
  {
    name: 'Pro / Créateur',
    price: '15€/mois',
    energy: '100 énergie / jour',
    description: 'Créer ses propres parcours et exercices',
    features: [
      'Tout le plan Premium',
      'Création d’exercices',
      'Création de parcours',
      'Accès aux outils de création'
    ],
    featured: false,
    accent: '#FFB700'
  }
]

function PlanCard({ plan }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        background: '#fff',
        borderRadius: 22,
        padding: 24,
        border: plan.featured ? '2px solid #0066FF' : '1px solid #dfe3e8',
        boxShadow: plan.featured ? '0 10px 30px rgba(0,108,255,0.15)' : '0 5px 18px rgba(0,0,0,0.06)',
        minHeight: 420,
        position: 'relative'
      }}
    >
      {plan.featured && (
        <div style={{ position: 'absolute', top: 18, right: 18, background: '#0066FF', color: '#fff', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 700 }}>
          Recommandé
        </div>
      )}

      <div style={{ fontSize: 20, fontWeight: 700 }}>{plan.name}</div>
      <div style={{ fontSize: 36, fontWeight: 800, marginTop: 16 }}>{plan.price}</div>
      <div style={{ marginTop: 8, fontWeight: 700, color: '#0066FF' }}>{plan.energy}</div>
      <p style={{ color: '#666', marginTop: 10 }}>{plan.description}</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 12 }}>
        {plan.features.map((feature) => (
          <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#333' }}>
            <span style={{ color: plan.featured ? '#0066FF' : '#00DD00', fontSize: 20 }}>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        style={{
          marginTop: 24,
          width: '100%',
          border: 'none',
          background: plan.featured ? '#0066FF' : '#111827',
          color: '#fff',
          borderRadius: 12,
          padding: '14px 18px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer'
        }}
      >
        Choisir {plan.name}
      </button>
    </motion.div>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ background: 'linear-gradient(90deg, #0066FF, #1f6bff)', borderRadius: 24, padding: 22, color: '#fff', marginBottom: 28 }}>
          <div style={{ fontSize: 32, fontWeight: 800 }}>Interécole</div>
          <div style={{ opacity: 0.9, marginTop: 8 }}>Choisir votre plan d'apprentissage</div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 22 }}>
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </section>
      </div>
    </div>
  )
}
