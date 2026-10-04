# 💡 Système de Monétisation et d'Énergie - EduQuest

## 1. Système d'énergie

### Version gratuite
- 30 énergies par jour
- 1 énergie = 1 question / exercice / leçon courte
- Le compteur se réinitialise chaque jour à minuit
- Une question validée ou non ne revient pas l'énergie ; elle est dépensée dès que l'exercice est lancé

### Version Premium - 8€/mois
- 100 énergies par jour
- Plus de flexibilité pour continuer l'apprentissage
- Bonus : 2 x plus de XP sur les leçons terminées

### Version Pro / Créateur - 15€/mois
- 100 énergies / jour
- Possibilité de créer ses propres exercices
- Accès aux outils de personnalisation : quiz, leçons, séances
- Accès aux supports pédagogiques avancés

---

## 2. Logique de progression

### Règle métier
- Une question = 1 énergie
- Une matière contient plusieurs niveaux
- Chaque niveau contient des chapitres
- Chaque chapitre contient des leçons / exercices
- Une leçon réussie donne XP
- Les XP montent le niveau
- Les niveaux débloquent des badges
- Les badges motivent et renforcent la progression

### Exemple
- 1 exercice lancée = -1 énergie
- 1 exercice réussi = +50 XP
- 10 exercices réussis = +500 XP
- Niveau 1 → Niveau 2
- Niveau 2 débloque des badges de matière

---

## 3. Modèle d'abonnement

### Plan Gratuit
- Coût : 0€
- Énergie : 30/jour
- Accès : contenu de base
- Limite : moins de répétitions et moins de défis

### Plan Premium
- Coût : 8€/mois
- Énergie : 100/jour
- Bonus : +2x XP
- Avantages : progression rapide, plus de matière, plus de défis

### Plan Pro / Créateur
- Coût : 15€/mois
- Énergie : 100/jour
- Avantages : création d'exercices, plus de modes de travail, personnalisation
- Idée : créer des exercices pour soi ou pour partager avec d'autres

---

## 4. Types de contenu

### Questions standard
- Quizz simple
- Complétion de phrase
- Règle à appliquer
- Choix multiples
- Correction d'erreur
- Mini-exercice de maths

### Création d'exercices (plan Pro)
- Ajouter une question personnalisée
- Choisir la matière
- Choisir le niveau
- Choisir le chapitre
- Définir le niveau de difficulté
- Définir le nombre de points XP

---

## 5. Système de récompenses

### Récompenses liées à l'énergie
- Tension de progression : plus tu gagnes d'énergie, plus tu avances vite
- Les utilisateurs paient pour accélérer leur apprentissage
- Les badges deviennent les “prestiges” du profil

### Badges possibles
- 1er cours terminé
- 7 jours d'affilée
- 30 jours d'affilée
- 100 XP en une journée
- 100 quizz réussis
- Expert Mathématiques
- Expert Français
- Master Sciences
- Niveau 10 atteint

---

## 6. Données liées à l'énergie

### User
```json
{
  "id": "u_123",
  "name": "Alice",
  "plan": "premium",
  "daily_energy": 100,
  "current_energy": 74,
  "energy_reset_at": "2026-10-05T00:00:00Z",
  "xp_total": 1450,
  "level": 8,
  "streak_days": 12
}
```

### Energy system
```json
{
  "user_id": "u_123",
  "date": "2026-10-04",
  "used_energy": 26,
  "max_energy": 100,
  "remaining_energy": 74
}
```

---

## 7. Exemples de logique métier

### Cas 1 : gratuit
- Plan gratuit
- 30 énergie / jour
- User lance 10 questions
- remaining = 20
- next day reset to 30

### Cas 2 : premium
- Plan premium
- 100 énergie / jour
- User lance 25 questions
- remaining = 75
- Continue à apprendre plus longtemps

### Cas 3 : abonnement pro
- Plan Pro
- Peut créer des exercices
- Le système doit enregistrer des “custom exercises”
- Ces questions ne nécessitent pas forcément l'énergie ?
- Option : oui, elles coûtent de l'énergie normalement

---

## 8. Modèle de données pour les exercices

```json
{
  "id": "ex_001",
  "subject": "mathématiques",
  "level": 2,
  "chapter": "Fractions",
  "difficulty": "easy",
  "content": "Calcule 1/2 + 1/4",
  "answer": "3/4",
  "xp_reward": 50,
  "energy_cost": 1,
  "created_by": "system"
}
```

---

## 9. Plan de développement

### Phase 1
- Système d'énergie
- Plans abonnement
- Calcul d'XP
- Reset quotidien

### Phase 2
- Matières, niveaux, chapitres
- Exercices dynamiques
- Badges
- Dashboard

### Phase 3
- Création d'exercices par utilisateurs Pro
- Leaderboard
- Missions bonus
- Communaute

---

## 10. Idée de monétisation finale

### Business model
- Gratuit : 30 énergies/jour, accès limité
- Premium 8€ : 100 énergie/jour, bonus XP, plus de défis
- Pro 15€ : créer des exercices, plus de personnalisation

### Stratégie
- 1. Attirer les élèves avec le mode gratuit
- 2. Pousser la progression via XP et badges
- 3. Convertir en abonnement premium
- 4. Puis vendre le plan Pro aux enseignants / créateurs

---

**Cette logique est grande et on peut la développer dans l'application de manière très propre.**
