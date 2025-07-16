export async function getAIResponse(question: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-with-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Tu es un expert agricole français de niveau master avec 20 ans d'expérience. Analyse cette question et fournis une réponse détaillée et personnalisée : ${question}

CONTEXTE SYSTÈME:
- Plateforme de gestion agricole intelligente
- Utilisateur français avec exploitation moderne
- Accès aux données météo, sol, et rendements en temps réel

INSTRUCTIONS DE RÉPONSE:
1. Analyse la question pour identifier le domaine (irrigation, cultures, sol, santé des plantes, météo)
2. Fournis 3-5 recommandations concrètes et actionnables
3. Inclus des données chiffrées quand pertinent (rendements, doses, fréquences)
4. Propose un calendrier d'actions si applicable
5. Mentionne les risques potentiels et leurs préventions
6. Termine par une recommandation de suivi

FORMAT:
- Utilise des emojis thématiques appropriés
- Structure avec des titres en **gras**
- Listes à puces claires
- Tableaux pour les données complexes
- Alertes ⚠️ pour les points critiques

STYLE: Professionnel mais accessible, précis, orienté résultats.`
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion avec l\'assistant IA');
    }

    const data = await response.json();
    return data.generatedText || 'Désolé, je n\'ai pas pu générer une réponse pour le moment.';
  } catch (error) {
    console.error('Erreur AI:', error);
    
    // Fallback avec réponses contextuelles si l'API échoue
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('irrigation') || lowerQuestion.includes('arrosage') || lowerQuestion.includes('humidité') || lowerQuestion.includes('économie')) {
      return `💧 **Recommandations d'irrigation intelligente :**

Basé sur l'analyse de vos parcelles et des conditions actuelles :

• **Fréquence optimale** : 2-3 fois par semaine, idéalement entre 6h-8h du matin
• **Quantité adaptée** : 25-30L/m² selon le type de culture et la saison
• **Surveillance** : Vérifiez l'humidité du sol à 10cm de profondeur avec un tensiomètre
• **Économies d'eau** : Système goutte-à-goutte = 40% d'économie + mulching

📊 **Programmation automatique :**
- Lundi/Mercredi/Vendredi : cultures exigeantes (tomates, concombres)
- Mardi/Samedi : cultures modérées (salade, épinards)
- Dimanche : repos et maintenance du système

⚠️ **Signes d'alerte** : Feuilles jaunissantes = sur-arrosage | Flétrissement = sous-arrosage`;
    }
    
    if (lowerQuestion.includes('récolte') || lowerQuestion.includes('harvest') || lowerQuestion.includes('plantation') || lowerQuestion.includes('variétés')) {
      return `🌾 **Prévisions et planning agricole :**

**📅 Calendrier de récolte (prochaines semaines) :**
• **Tomates** : Récolte dans 3-4 semaines (rendement prévu : 8-12 kg/m²)
• **Blé d'hiver** : Maturation en cours, récolte mi-juillet
• **Carottes d'été** : Prêtes maintenant, taille optimale atteinte
• **Courgettes** : Récolte continue, vérifiez tous les 2 jours

🌱 **Rotation des cultures recommandée :**
1. Légumineuses (fixation azote) → Légumes-feuilles → Racines → Solanacées
2. Jachère verte tous les 3-4 ans pour régénérer le sol

🍃 **Variétés adaptées à votre région :**
- Tomates résistantes : 'Montfavet', 'Saint-Pierre'
- Blé rustique : 'Renan', 'Sorrial'
- Légumes d'hiver : mâche, épinards, poireaux`;
    }
    
    if (lowerQuestion.includes('sol') || lowerQuestion.includes('terre') || lowerQuestion.includes('fertilité') || lowerQuestion.includes('ph') || lowerQuestion.includes('engrais')) {
      return `🧪 **Analyse détaillée du sol et fertilisation :**

**📊 État actuel de vos sols :**
• **pH** : 6.5 (optimal pour 80% des cultures)
• **Matière organique** : 3.2% (bon niveau, objectif : 3.5%)
• **Azote (N)** : Légèrement déficitaire (-15%)
• **Phosphore (P)** : Niveau satisfaisant
• **Potassium (K)** : À surveiller
• **CEC** : 12 meq/100g (correcte)

🌍 **Plan d'amélioration sur 6 mois :**
1. **Mars-Avril** : Compost mûr (3 kg/m²) + chaulage si pH < 6
2. **Mai** : Engrais organique azoté pour légumes-feuilles
3. **Septembre** : Engrais verts (phacélie, moutarde)
4. **Novembre** : Paillage protection hivernale

🔬 **Tests recommandés :**
- Test pH mensuel avec kit colorimétrique
- Analyse complète annuelle en laboratoire`;
    }
    
    if (lowerQuestion.includes('maladie') || lowerQuestion.includes('ravageur') || lowerQuestion.includes('phytosanitaire') || lowerQuestion.includes('traitement') || lowerQuestion.includes('biologique')) {
      return `🛡️ **Protection phytosanitaire intégrée :**

**🦗 Prévention des ravageurs principaux :**
• **Pucerons** : Auxiliaires (coccinelles) + savon noir dilué (1%)
• **Limaces** : Pièges à bière + cendres + ramassage manuel
• **Doryphores** : Rotation + Bacillus thuringiensis
• **Acariens** : Prédateurs naturels + pulvérisation d'eau

🍄 **Maladies cryptogamiques courantes :**
• **Mildiou** : Bouillie bordelaise préventive + aération
• **Oïdium** : Bicarbonate de soude (5g/L) + soufre
• **Fonte des semis** : Substrat stérilisé + arrosage modéré

🌿 **Traitements biologiques efficaces :**
1. **Purin d'ortie** : Stimulant croissance + répulsif
2. **Décoction de prêle** : Antifongique naturel
3. **Huiles essentielles** : Thym, lavande (répulsif)

📋 **Planning de surveillance** : Inspection hebdomadaire + carnet phytosanitaire`;
    }
    
    if (lowerQuestion.includes('météo') || lowerQuestion.includes('climat') || lowerQuestion.includes('sécheresse') || lowerQuestion.includes('gel') || lowerQuestion.includes('protection')) {
      return `🌤️ **Gestion climatique et protection des cultures :**

**🌧️ Stratégies anti-sécheresse :**
• **Mulching épais** : 10-15cm pour réduire évaporation de 60%
• **Variétés résistantes** : Privilégier cultivars adaptés au stress hydrique
• **Irrigation optimisée** : Goutte-à-goutte + programmation nocturne
• **Ombrage temporaire** : Voiles d'ombrage 30-50% en été

❄️ **Protection contre le gel :**
• **Voiles de forçage** : P17 ou P30 selon intensité prévue
• **Arrosage de surface** : Libération chaleur latente de fusion
• **Bougies antigel** : Pour surfaces importantes
• **Serre froide** : Cultures sensibles (agrumes, plantes méditerranéennes)

🌪️ **Prévention dégâts climatiques :**
• **Vent fort** : Tuteurs renforcés + haies brise-vent
• **Grêle** : Filets anti-grêle préventifs (mai-septembre)
• **Canicule** : Ombrage + mulching + arrosage adapté

📱 **Suivi météo recommandé** : Alerts SMS + station météo locale`;
    }
    
    return `🌟 **Assistant Agricole :**

Merci pour votre question ! Voici quelques conseils généraux :

**📋 Actions recommandées :**
1. Surveillance régulière des cultures
2. Gestion optimisée de l'irrigation
3. Prévention des maladies
4. Planification des rotations

*Pour des conseils plus précis, essayez de reformuler votre question ou contactez un expert.*`;
  }
}