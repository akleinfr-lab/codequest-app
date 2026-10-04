# 🏗️ Architecture EduQuest

## Structure Globale

```
eduquest-app/
├── frontend/                    # Application mobile/web
│   ├── public/
│   ├── src/
│   │   ├── components/          # Composants réutilisables
│   │   │   ├── Badge.jsx
│   │   │   ├── XPBar.jsx
│   │   │   ├── LevelCard.jsx
│   │   │   ├── MissionCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/               # Pages principales
│   │   │   ├── Dashboard.jsx    # Écran principal
│   │   │   ├── Learning.jsx
│   │   │   ├── Badges.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── context/             # État global (Redux/Context API)
│   │   │   ├── UserContext.js
│   │   │   ├── GameContext.js
│   │   │   └── BadgeContext.js
│   │   ├── styles/              # CSS/Tailwind
│   │   │   ├── dashboard.css
│   │   │   ├── badges.css
│   │   │   └── global.css
│   │   ├── utils/               # Utilitaires
│   │   │   ├── api.js
│   │   │   ├── calculateXP.js
│   │   │   └── badgeUtils.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── backend/                     # API Node.js/Express
│   ├── src/
│   │   ├── routes/              # Endpoints API
│   │   │   ├── auth.js
│   │   │   ├── user.js
│   │   │   ├── xp.js
│   │   │   ├── badges.js
│   │   │   ├── lessons.js
│   │   │   └── leaderboard.js
│   │   ├── controllers/         # Logique métier
│   │   │   ├── userController.js
│   │   │   ├── xpController.js
│   │   │   ├── badgeController.js
│   │   │   └── lessonController.js
│   │   ├── models/              # Schémas DB
│   │   │   ├── User.js
│   │   │   ├── XPLog.js
│   │   │   ├── Badge.js
│   │   │   ├── UserBadge.js
│   │   │   ├── Lesson.js
│   │   │   └── Streak.js
│   │   ├── middleware/          # Middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/            # Services (logique réutilisable)
│   │   │   ├── xpService.js
│   │   │   ├── badgeService.js
│   │   │   ├── levelService.js
│   │   │   └── notificationService.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── database/                    # Schémas et migrations
│   ├── migrations/
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_badges.sql
│   │   ├── 003_create_xp_logs.sql
│   │   └── 004_create_lessons.sql
│   └── seeds/
│       ├── badges.sql
│       └── lessons.sql
│
├── docs/
│   ├── API.md                   # Documentation API
│   ├── DATABASE.md              # Schéma DB
│   └── GAMIFICATION.md          # Logique gamification
│
├── .gitignore
├── docker-compose.yml           # Conteneurs (optional)
└── README.md
```

---

## 📦 Stack Technique

### Frontend
- **Framework** : React 18 / React Native (pour mobile)
- **State Management** : Redux Toolkit ou Context API
- **UI Library** : Tailwind CSS + shadcn/ui
- **HTTP Client** : Axios
- **Animation** : Framer Motion
- **Charts** : Chart.js ou Recharts (pour les statistiques)
- **Build** : Vite ou Create React App

### Backend
- **Runtime** : Node.js
- **Framework** : Express.js
- **Database** : PostgreSQL (relationnelle)
- **ORM** : Sequelize ou TypeORM
- **Authentication** : JWT + bcrypt
- **Validation** : Joi ou Yup
- **Logging** : Winston
- **Testing** : Jest

### DevOps
- **Containerization** : Docker + Docker Compose
- **CI/CD** : GitHub Actions
- **Hosting** : AWS / Vercel (frontend) + Heroku/Railway (backend)
- **Database Hosting** : AWS RDS / Render

---

## 🗄️ Modèle de Données

### User
```
id (PK)
username
email
password_hash
level
total_xp
current_xp
streak_count
last_activity_date
avatar_url
created_at
updated_at
```

### Badge
```
id (PK)
name
description
icon_url
category (mastery, streak, challenge, collection)
xp_reward
unlock_level (niveau requis pour débloquer)
unlock_cost (coût en "niveau-points")
created_at
```

### UserBadge (relation M:M)
```
id (PK)
user_id (FK)
badge_id (FK)
acquired_at
is_active
```

### XPLog
```
id (PK)
user_id (FK)
lesson_id (FK)
xp_earned
bonus_multiplier
activity_type (exercise, quiz, challenge)
created_at
```

### Lesson
```
id (PK)
subject (math, french, english, science, code)
title
description
difficulty_level (1-10)
xp_base_reward
content_url
video_url
created_at
```

### Streak
```
id (PK)
user_id (FK)
current_streak
best_streak
last_completed_at
```

### DailyChallenge
```
id (PK)
date
lesson_id (FK)
bonus_xp
```

---

## 🔄 Flux de Données

```
User complète exercice
    ↓
Frontend envoie requête POST /api/xp/complete
    ↓
Backend valide et calcule XP
    ↓
Backend met à jour User XP + check niveau
    ↓
Backend check badges débloqués
    ↓
Backend répond avec :
  - XP gagné
  - Nouveau niveau (si changement)
  - Badges débloqués
  - Streak bonus
    ↓
Frontend affiche animations et rewards
```

---

## 📊 Système de Gamification

### Calcul de XP
```
xp_earned = (base_xp * difficulty_level) * streak_bonus * level_multiplier

Exemple :
- Exercice base 50 XP
- Difficulté 1.5x
- Streak bonus 1.1x (jours d'affilée)
- Level 5 multiplier 1.2x
= 50 * 1.5 * 1.1 * 1.2 = 99 XP
```

### Progression de Niveaux
```
Niveau 1 : 0 XP
Niveau 2 : 100 XP
Niveau 3 : 250 XP
Niveau 4 : 450 XP
Niveau 5 : 700 XP
...
(formule : level * 100 + (level-1) * 50)
```

### Déblocage de Badges
```
Chaque badge nécessite :
1. Un niveau minimum (ex: niveau 5)
2. Optionnel : une action spécifique (7 jours de streak)
3. Coût en "points niveau" pour l'acheter
```

---

## 🔌 API Endpoints (Exemple)

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/user/:id
PUT    /api/user/:id
GET    /api/user/:id/stats

POST   /api/lessons/complete
GET    /api/lessons?subject=math
GET    /api/lessons/:id

POST   /api/xp/log
GET    /api/xp/user/:id
GET    /api/xp/leaderboard

GET    /api/badges
GET    /api/badges/available/:userId
POST   /api/badges/unlock/:userId/:badgeId
GET    /api/badges/user/:userId

GET    /api/daily-challenge
POST   /api/daily-challenge/complete

GET    /api/leaderboard
GET    /api/leaderboard/friends
```

---

## 🛡️ Sécurité

- JWT pour authentification
- Validation des inputs côté backend
- CORS configuré
- Rate limiting sur les endpoints sensibles
- Hachage des mots de passe (bcrypt)
- Variabilisation des secrets (.env)
- HTTPS en production

---

## 📈 Scalabilité Future

- Cache Redis pour leaderboard
- WebSockets pour notifications en temps réel
- Microservices par domaine (user, badges, lessons)
- CDN pour assets statiques
- Base de données secondaire pour analytics

---

**Prêt à coder l'écran principal ? 🚀**
