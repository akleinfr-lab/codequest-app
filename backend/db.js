const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const DB_PATH = process.env.DATABASE || './interecole.db'

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erreur de connexion à la DB:', err.message)
  } else {
    console.log('✓ Connecté à SQLite')
  }
})

db.serialize(() => {
  // Table users avec support multilingue
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      plan TEXT DEFAULT 'free',
      level INTEGER DEFAULT 1,
      total_xp INTEGER DEFAULT 0,
      current_xp INTEGER DEFAULT 0,
      xp_needed INTEGER DEFAULT 500,
      streak_days INTEGER DEFAULT 0,
      energy_current INTEGER DEFAULT 30,
      energy_max INTEGER DEFAULT 30,
      avatar TEXT DEFAULT '👩‍🎓',
      language TEXT DEFAULT 'fr',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table languages
  db.run(`
    CREATE TABLE IF NOT EXISTS languages (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      flag TEXT NOT NULL
    )
  `)

  // Table subjects avec support multilingue
  db.run(`
    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      icon TEXT NOT NULL,
      language TEXT DEFAULT 'fr',
      name TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table levels (100+ par sujet)
  db.run(`
    CREATE TABLE IF NOT EXISTS levels (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      number INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      xp_required INTEGER DEFAULT 0,
      progress INTEGER DEFAULT 0,
      difficulty INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      UNIQUE(subject_id, number)
    )
  `)

  // Table chapters
  db.run(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      level_id TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (level_id) REFERENCES levels(id),
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
  `)

  // Table questions multilingues
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      level_id TEXT NOT NULL,
      chapter_id TEXT,
      language TEXT DEFAULT 'fr',
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT,
      xp_reward INTEGER DEFAULT 50,
      energy_cost INTEGER DEFAULT 1,
      difficulty INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      FOREIGN KEY (level_id) REFERENCES levels(id),
      FOREIGN KEY (chapter_id) REFERENCES chapters(id)
    )
  `)

  // Table badges
  db.run(`
    CREATE TABLE IF NOT EXISTS badges (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      rarity TEXT DEFAULT 'Bronze',
      description TEXT,
      xp_price INTEGER DEFAULT 0,
      is_free INTEGER DEFAULT 0,
      required_level INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table user_badges
  db.run(`
    CREATE TABLE IF NOT EXISTS user_badges (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      badge_id TEXT NOT NULL,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (badge_id) REFERENCES badges(id),
      UNIQUE(user_id, badge_id)
    )
  `)

  // Table user progress by level
  db.run(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      level_id TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      questions_answered INTEGER DEFAULT 0,
      questions_correct INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (level_id) REFERENCES levels(id),
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      UNIQUE(user_id, level_id)
    )
  `)

  // Table xp_logs
  db.run(`
    CREATE TABLE IF NOT EXISTS xp_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      source_type TEXT,
      source_id TEXT,
      xp_earned INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Table energy_logs
  db.run(`
    CREATE TABLE IF NOT EXISTS energy_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      energy_used INTEGER DEFAULT 0,
      energy_remaining INTEGER DEFAULT 0,
      max_energy INTEGER DEFAULT 30,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Table payment_logs
  db.run(`
    CREATE TABLE IF NOT EXISTS payment_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plan TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'EUR',
      status TEXT DEFAULT 'completed',
      stripe_payment_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Table stripe_sessions
  db.run(`
    CREATE TABLE IF NOT EXISTS stripe_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_id TEXT UNIQUE NOT NULL,
      plan TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Table subscriptions
  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      plan TEXT NOT NULL,
      price INTEGER DEFAULT 0,
      currency TEXT DEFAULT 'EUR',
      start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      end_date DATETIME,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Table admin_stats
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_stats (
      id TEXT PRIMARY KEY,
      total_users INTEGER DEFAULT 0,
      total_revenue REAL DEFAULT 0,
      total_questions_answered INTEGER DEFAULT 0,
      total_badges_bought INTEGER DEFAULT 0,
      premium_users INTEGER DEFAULT 0,
      pro_users INTEGER DEFAULT 0,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table daily_stats
  db.run(`
    CREATE TABLE IF NOT EXISTS daily_stats (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      new_users INTEGER DEFAULT 0,
      active_users INTEGER DEFAULT 0,
      revenue REAL DEFAULT 0,
      questions_answered INTEGER DEFAULT 0,
      badges_bought INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('✓ Tables créées')
})

module.exports = db
