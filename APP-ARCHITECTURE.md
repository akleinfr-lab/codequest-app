# 🎓 Interécole - Architecture complète de l'application

## Nom du produit
**Interécole**

Une application éducative gamifiée qui permet d'apprendre les matières scolaires du primaire à la terminale, avec des défis, des XP, des niveaux, des badges, un système d'énergie, et des abonnements.

---

## 1. Concept global

Interécole est une plateforme d'apprentissage avec une logique de jeu :
- apprendre une matière = gagner des XP
- gagner des XP = monter de niveau
- monter de niveau = débloquer des badges
- débloquer des badges = motivation et progression
- poser des questions = consommer de l'énergie
- plus on a d'énergie, plus on peut apprendre plus longtemps

### Rôle principal
- éducatif
- ludique
- structure scolaire réelle
- monétisable avec abonnements

---

## 2. Système d'énergie

### Plan gratuit
- 30 énergie/jour
- 1 question = 1 énergie
- le compteur se réinitialise chaque nuit

### Plan Premium - 8€/mois
- 100 énergie/jour
- bonus XP : x2 sur les leçons complétées
- plus de liberté dans les répétitions

### Plan Pro / Créateur - 15€/mois
- 100 énergie/jour
- création de ses propres exercices / parcours
- accès aux outils avancés de personnalisation

### Règle métier
```text
question lancée -> consommation d'énergie
question réussie -> gain XP
question ratée -> perte d'énergie + possible rappel de concept
```

---

## 3. Domaine fonctionnel

### A. Utilisateur
- id
- nom
- email
- mot de passe hashé
- plan (gratuit, premium, pro)
- level
- xp_total
- current_xp
- streak_days
- avatar
- created_at
- updated_at

### B. Matière
- id
- name
- slug
- description
- icon
- color
- niveau_minimum

### C. Niveau
- id
- subject_id
- level_number
- title
- xp_required
- xp_to_next
- description

### D. Chapitre
- id
- subject_id
- level_id
- title
- description
- difficulty
- order_index

### E. Leçon
- id
- chapter_id
- title
- content
- lesson_type (video, quizz, exercice, texte)
- xp_reward

### F. Question / Exercice
- id
- lesson_id
- subject_id
- level_id
- chapter_id
- question_text
- answer_type (multiple_choice, free_text, true_false, drag_drop)
- choices[]
- correct_answer
- xp_reward
- energy_cost
- difficulty
- created_by (system/user)

### G. Badge
- id
- title
- description
- icon
- category (streak, mastery, challenge, collection)
- unlock_level
- xp_requirement
- subject_id (optionnel)
- price_points (si achat ou débloquage)

### H. UserBadge
- id
- user_id
- badge_id
- earned_at
- is_active

### I. XPLog
- id
- user_id
- source_type (exercise, lesson, daily_challenge)
- source_id
- xp_earned
- created_at

### J. EnergyLog
- id
- user_id
- date
- energy_used
- energy_remaining
- max_energy
- created_at

### K. Subscription
- id
- user_id
- plan
- start_date
- end_date
- status
- payment_provider

### L. DailyChallenge
- id
- date
- subject_id
- title
- bonus_xp
- reward_badge_id

---

## 4. Structure du projet

```text
interecole/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   ├── learning/
│   │   │   ├── profile/
│   │   │   ├── badges/
│   │   │   └── subscriptions/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── XPBar.jsx
│   │   │   ├── LevelCard.jsx
│   │   │   ├── BadgeCard.jsx
│   │   │   ├── SubjectCard.jsx
│   │   │   ├── DailyMission.jsx
│   │   │   └── EnergyWidget.jsx
│   │   ├── hooks/
│   │   │   ├── useEnergy.js
│   │   │   ├── useXP.js
│   │   │   └── useBadges.js
│   │   ├── store/
│   │   │   ├── userSlice.js
│   │   │   ├── progressSlice.js
│   │   │   └── subscriptionSlice.js
│   │   ├── utils/
│   │   │   ├── xpCalculator.js
│   │   │   ├── energyRules.js
│   │   │   └── badgeUnlock.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── lessonController.js
│   │   │   ├── badgeController.js
│   │   │   ├── energyController.js
│   │   │   └── subscriptionController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── subjects.js
│   │   │   ├── lessons.js
│   │   │   ├── badges.js
│   │   │   ├── energy.js
│   │   │   └── subscriptions.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Subject.js
│   │   │   ├── Level.js
│   │   │   ├── Chapter.js
│   │   │   ├── Lesson.js
│   │   │   ├── Exercise.js
│   │   │   ├── Badge.js
│   │   │   ├── UserBadge.js
│   │   │   └── Subscription.js
│   │   ├── services/
│   │   │   ├── xpService.js
│   │   │   ├── badgeService.js
│   │   │   ├── energyService.js
│   │   │   └── subscriptionService.js
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── database/
│   ├── migrations/
│   ├── seeds/
│   │   ├── subjects.sql
│   │   ├── badges.sql
│   │   └── levels.sql
│   └── schema.sql
├── docs/
│   ├── README.md
│   ├── CURRICULUM.md
│   ├── MONETISATION.md
│   └── API.md
├── .gitignore
├── docker-compose.yml
├── README.md
└── package.json
```

---

## 5. Types de matières

### Matières principales
- Mathématiques
- Français
- Histoire-Géographie
- EMC
- Sciences
- Informatique
- Anglais
- Espagnol
- Allemand
- etc.

### Niveau académique
- Primaire
- Collège
- Lycée
- Terminale

---

## 6. Système de progression et de récompense

### XP système
```text
question réussie = +50 XP
question en difficulté élevée = +80 XP
mission du jour = +100 XP
streak 7 jours = bonus
```

### Level system
```text
Niveau 1 = 0 XP
Niveau 2 = 100 XP
Niveau 3 = 250 XP
Niveau 4 = 450 XP
Niveau 5 = 700 XP
```

### Badge system
- Débutant
- 1er cours validé
- 7 jours d'affilée
- 30 jours d'affilée
- Étoile maths
- Master français
- Expert sciences
- Quiz parfait

---

## 7. Les écrans principaux de l'application

### 1. Écran d'accueil / dashboard
- avatar utilisateur
- niveau actuel
- XP total
- barre de progression
- énergie restante
- mission du jour
- matières
- boutons : continuer, défis, badges

### 2. Écran matières
- mathématiques
- français
- histoire-géo
- sciences
- EMC
- informatique
- chaque matière montre : niveau actuel, progression, badges

### 3. Écran cours / parcours
- chapitre actuel
- progression du chapitre
- leçon suivie
- bouton : lancer un exercice

### 4. Écran quiz / question
- question
- options / réponse
- validation
- retour immédiat
- affichage de XP gagné

### 5. Écran badges
- collection complète
- badges débloqués
- badges à venir
- badges rares

### 6. Écran abonnement
- plan gratuit
- plan premium 8€
- plan pro 15€
- bouton : commencer / acheter

### 7. Écran profil
- statistiques
- streak
- progression globale
- badges
- préférences

---

## 8. Règles de gamification

### Bonus de progression
- +10% XP si streak de 3 jours
- +20% XP si streak de 7 jours
- +50% XP sur la mission du jour
- +25% XP sur un quiz parfait

### Récompenses rarissimes
- badge de légende
- badge “série infinie”
- badge “expert de matière”
- badge “100 questions réussies”

---

## 9. Monétisation

### Modèle économique
- Gratuit : peut apprendre, mais limité par énergie
- Premium 8€ : plus d'énergie, plus d'XP
- Pro 15€ : créer ses propres exercices et parcours

### Priorité de conversion
1. convert initial via gratuit
2. convertir via premium
3. ensuite vendre le Pro aux élèves plus avancés / créateurs

---

## 10. État de progression du projet

### À faire maintenant
- [ ] réaliser l'écran principal dashboard
- [ ] concevoir les composants UI de base
- [ ] définir les matières et les niveaux
- [ ] créer la logique de XP / niveau / énergie
- [ ] créer un premier parcours de cours

### À venir
- [ ] système de quiz complet
- [ ] badges collection
- [ ] abonnements
- [ ] route API
- [ ] base de données
- [ ] admin content creator

---

**Interécole est prêt pour la prochaine étape : le dashboard principal et les composants UI.**
