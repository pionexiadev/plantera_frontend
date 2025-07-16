import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  PlayCircle, 
  Clock, 
  Users, 
  Award,
  BookOpen,
  Video,
  FileText,
  Trophy,
  Download
} from 'lucide-react';

const Training = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: '1',
      title: 'Agriculture Biologique et Permaculture',
      description: 'Maîtrisez les techniques de l\'agriculture biologique : compostage, rotations des cultures, lutte biologique contre les ravageurs.',
      duration: '6 semaines',
      level: 'Intermédiaire',
      students: 2847,
      progress: 75,
      instructor: 'Dr. Marie Dubois, Ingénieure Agronome',
      image: '/api/placeholder/300/200',
      modules: 15,
      completed: 11,
      category: 'sustainability',
      rating: 4.8,
      price: 'Gratuit',
      certificate: true,
      skills: ['Compostage', 'Rotation des cultures', 'Lutte biologique', 'Sol vivant']
    },
    {
      id: '2', 
      title: 'Agriculture de Précision et IoT',
      description: 'Découvrez les capteurs connectés, drones agricoles, GPS et logiciels de gestion pour optimiser vos rendements.',
      duration: '8 semaines',
      level: 'Avancé',
      students: 1456,
      progress: 40,
      instructor: 'Jean-Pierre Martin, Expert en AgTech',
      image: '/api/placeholder/300/200',
      modules: 22,
      completed: 9,
      category: 'technology',
      rating: 4.9,
      price: '299€',
      certificate: true,
      skills: ['Capteurs IoT', 'Drones agricoles', 'GPS agricole', 'Analyse de données']
    },
    {
      id: '3',
      title: 'Élevage Moderne et Bien-être Animal',
      description: 'Nutrition animale, reproduction, prévention sanitaire et nouvelles réglementations pour un élevage durable.',
      duration: '5 semaines',
      level: 'Débutant',
      students: 3214,
      progress: 90,
      instructor: 'Sophie Leclerc, Vétérinaire',
      image: '/api/placeholder/300/200',
      modules: 18,
      completed: 16,
      category: 'livestock',
      rating: 4.7,
      price: '149€',
      certificate: true,
      skills: ['Nutrition animale', 'Reproduction', 'Prévention sanitaire', 'Bien-être animal']
    },
    {
      id: '4',
      title: 'Gestion Financière et Subventions Agricoles',
      description: 'Comptabilité agricole, calcul de rentabilité, demandes de subventions PAC et optimisation fiscale.',
      duration: '7 semaines',
      level: 'Intermédiaire',
      students: 1876,
      progress: 0,
      instructor: 'Robert Fernandez, Expert-comptable agricole',
      image: '/api/placeholder/300/200',
      modules: 20,
      completed: 0,
      category: 'finance',
      rating: 4.6,
      price: '199€',
      certificate: true,
      skills: ['Comptabilité agricole', 'Subventions PAC', 'Optimisation fiscale', 'Business plan']
    },
    {
      id: '5',
      title: 'Cultures Spécialisées : Maraîchage Bio',
      description: 'Techniques spécifiques au maraîchage biologique : semis, planification, conservation et commercialisation.',
      duration: '4 semaines',
      level: 'Débutant',
      students: 2156,
      progress: 100,
      instructor: 'Claire Moreau, Maraîchère Bio',
      image: '/api/placeholder/300/200',
      modules: 12,
      completed: 12,
      category: 'sustainability',
      rating: 4.9,
      price: 'Gratuit',
      certificate: true,
      skills: ['Planification cultures', 'Semis et plantation', 'Conservation', 'Vente directe']
    },
    {
      id: '6',
      title: 'Changement Climatique et Adaptation',
      description: 'Stratégies d\'adaptation face au changement climatique : variétés résistantes, gestion de l\'eau, nouveaux calendriers.',
      duration: '6 semaines',
      level: 'Avancé',
      students: 987,
      progress: 25,
      instructor: 'Dr. Thomas Leroy, Climatologue',
      image: '/api/placeholder/300/200',
      modules: 16,
      completed: 4,
      category: 'sustainability',
      rating: 4.8,
      price: '249€',
      certificate: true,
      skills: ['Adaptation climatique', 'Variétés résistantes', 'Gestion eau', 'Prévision météo']
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Expert en Agriculture Bio',
      description: 'Complété 5 cours sur l\'agriculture biologique',
      icon: '🌱',
      earned: true,
      date: '15 Mars 2024',
      xp: 500
    },
    {
      id: '2',
      title: 'Maître Éleveur',
      description: 'Excellent résultats en gestion d\'élevage',
      icon: '🐄',
      earned: true,
      date: '22 Février 2024',
      xp: 350
    },
    {
      id: '3',
      title: 'Innovateur Technologique',
      description: 'Adoption de 3 nouvelles technologies IoT',
      icon: '💡',
      earned: false,
      date: null,
      xp: 400,
      progress: 66
    },
    {
      id: '4',
      title: 'Mentor Communautaire',
      description: 'Aidé 10 autres agriculteurs',
      icon: '🤝',
      earned: false,
      date: null,
      xp: 300,
      progress: 30
    },
    {
      id: '5',
      title: 'Gestionnaire Financier',
      description: 'Maîtrise des outils de gestion financière',
      icon: '📊',
      earned: true,
      date: '10 Janvier 2024',
      xp: 250
    },
    {
      id: '6',
      title: 'Champion du Climat',
      description: 'Formation complète sur l\'adaptation climatique',
      icon: '🌍',
      earned: false,
      date: null,
      xp: 450,
      progress: 15
    }
  ];

  const webinars = [
    {
      id: '1',
      title: 'Les Nouvelles Aides PAC 2024',
      date: '2024-06-20',
      time: '14h00 - 15h30',
      speaker: 'Marie Durand, Experte Subventions',
      participants: 156,
      status: 'À venir',
      description: 'Découvrez les nouveautés de la PAC 2024 et comment optimiser vos demandes de subventions.'
    },
    {
      id: '2',
      title: 'Irrigation Intelligente : ROI et Efficacité',
      date: '2024-06-25',
      time: '10h00 - 11h30',
      speaker: 'Jean-Marc Fontaine, Ingénieur AgTech',
      participants: 203,
      status: 'À venir',
      description: 'Calcul de rentabilité des systèmes d\'irrigation connectés avec retours d\'expérience.'
    },
    {
      id: '3',
      title: 'Tendances du Marché Bio 2024',
      date: '2024-06-15',
      time: '16h00 - 17h00',
      speaker: 'Sophie Martin, Analyste Marchés',
      participants: 289,
      status: 'Terminé',
      description: 'Analyse des tendances de consommation et opportunités pour les producteurs bio.'
    }
  ];

  const learningPaths = [
    {
      id: '1',
      title: 'Parcours Jeune Agriculteur',
      courses: ['Agriculture Biologique', 'Gestion Financière', 'Marketing Direct'],
      duration: '3 mois',
      difficulty: 'Débutant',
      completion: 45,
      enrolled: true
    },
    {
      id: '2',
      title: 'Spécialisation Élevage',
      courses: ['Élevage Moderne', 'Nutrition Animale', 'Reproduction'],
      duration: '2 mois',
      difficulty: 'Intermédiaire',
      completion: 0,
      enrolled: false
    },
    {
      id: '3',
      title: 'Transformation Numérique',
      courses: ['IoT Agricole', 'Agriculture de Précision', 'Analyse de Données'],
      duration: '4 mois',
      difficulty: 'Avancé',
      completion: 20,
      enrolled: true
    }
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'Débutant': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermédiaire': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Avancé': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'sustainability': return 'bg-green-50 border-green-200';
      case 'technology': return 'bg-blue-50 border-blue-200';
      case 'livestock': return 'bg-amber-50 border-amber-200';
      case 'finance': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Formation Agricole</h1>
            <p className="text-slate-600">Développez vos compétences avec nos formations spécialisées</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Catalogue
            </Button>
            <Button className="bg-plantera-green hover:bg-plantera-green/90 gap-2">
              <GraduationCap className="h-4 w-4" />
              Mes Formations
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Cours Suivis</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Certifications</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Heures d'étude</p>
                  <p className="text-2xl font-bold">127h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Points XP</p>
                  <p className="text-2xl font-bold">3,250</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">Mes Cours</TabsTrigger>
            <TabsTrigger value="catalog">Catalogue</TabsTrigger>
            <TabsTrigger value="paths">Parcours</TabsTrigger>
            <TabsTrigger value="webinars">Webinaires</TabsTrigger>
            <TabsTrigger value="achievements">Réussites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className={`border rounded-xl overflow-hidden hover:shadow-lg transition-all ${getCategoryColor(course.category)}`}>
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Video className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                      <Badge className={`ml-2 ${getLevelColor(course.level)}`}>
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students} étudiants
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-slate-500">
                        {course.completed}/{course.modules} modules complétés
                      </p>
                      
                      {course.skills && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-600">Compétences acquises :</p>
                          <div className="flex flex-wrap gap-1">
                            {course.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="text-xs bg-plantera-green/10 text-plantera-green px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                            {course.skills.length > 3 && (
                              <span className="text-xs text-slate-400">+{course.skills.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-sm text-slate-600">Par {course.instructor}</p>
                      <Button size="sm" className="bg-plantera-green hover:bg-plantera-green/90">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continuer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="catalog" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 'doc1',
                  title: 'Guide Complet du Compostage',
                  description: 'Apprenez les techniques de compostage pour améliorer la fertilité de vos sols naturellement.',
                  category: 'Durabilité',
                  readTime: '25 min',
                  difficulty: 'Débutant',
                  chapters: 8,
                  downloads: 1245,
                  rating: 4.8,
                  content: {
                    intro: 'Le compostage est une technique fondamentale de l\'agriculture durable...',
                    topics: ['Types de compost', 'Matières premières', 'Processus de décomposition', 'Application au champ']
                  }
                },
                {
                  id: 'doc2',
                  title: 'Rotation des Cultures - Stratégies Modernes',
                  description: 'Optimisez vos rendements et préservez vos sols avec les meilleures pratiques de rotation.',
                  category: 'Techniques Culturales',
                  readTime: '35 min',
                  difficulty: 'Intermédiaire',
                  chapters: 12,
                  downloads: 956,
                  rating: 4.9,
                  content: {
                    intro: 'La rotation des cultures est essentielle pour maintenir la santé des sols...',
                    topics: ['Familles de plantes', 'Cycles de rotation', 'Gestion des nutriments', 'Lutte contre les ravageurs']
                  }
                },
                {
                  id: 'doc3',
                  title: 'Agriculture de Précision: Introduction aux Capteurs',
                  description: 'Découvrez comment utiliser les capteurs IoT pour monitorer vos cultures en temps réel.',
                  category: 'Technologie',
                  readTime: '45 min',
                  difficulty: 'Avancé',
                  chapters: 15,
                  downloads: 743,
                  rating: 4.7,
                  content: {
                    intro: 'Les capteurs révolutionnent l\'agriculture moderne en fournissant des données précises...',
                    topics: ['Types de capteurs', 'Installation et calibrage', 'Analyse des données', 'Prise de décision']
                  }
                },
                {
                  id: 'doc4',
                  title: 'Gestion Intégrée des Ravageurs',
                  description: 'Méthodes biologiques et raisonnées pour protéger vos cultures sans nuire à l\'environnement.',
                  category: 'Protection des Cultures',
                  readTime: '30 min',
                  difficulty: 'Intermédiaire',
                  chapters: 10,
                  downloads: 1456,
                  rating: 4.6,
                  content: {
                    intro: 'La lutte intégrée combine prévention, observation et intervention ciblée...',
                    topics: ['Identification des ravageurs', 'Auxiliaires naturels', 'Seuils d\'intervention', 'Traitements biologiques']
                  }
                },
                {
                  id: 'doc5',
                  title: 'Optimisation de l\'Irrigation',
                  description: 'Techniques modernes pour économiser l\'eau tout en maximisant les rendements.',
                  category: 'Gestion de l\'Eau',
                  readTime: '40 min',
                  difficulty: 'Intermédiaire',
                  chapters: 14,
                  downloads: 887,
                  rating: 4.8,
                  content: {
                    intro: 'L\'irrigation efficace est cruciale dans un contexte de changement climatique...',
                    topics: ['Besoins en eau des cultures', 'Systèmes d\'irrigation', 'Programmation', 'Monitoring hydrique']
                  }
                },
                {
                  id: 'doc6',
                  title: 'Bien-être Animal en Élevage Moderne',
                  description: 'Pratiques pour assurer le bien-être animal tout en maintenant la productivité.',
                  category: 'Élevage',
                  readTime: '50 min',
                  difficulty: 'Débutant',
                  chapters: 16,
                  downloads: 1123,
                  rating: 4.7,
                  content: {
                    intro: 'Le bien-être animal est devenu un enjeu majeur de l\'élevage moderne...',
                    topics: ['Besoins fondamentaux', 'Aménagement des espaces', 'Alimentation équilibrée', 'Prévention sanitaire']
                  }
                }
              ].map((doc) => (
                <Card key={doc.id} className="border-slate-200 hover:shadow-lg transition-all">
                  <div className="h-32 bg-gradient-to-br from-plantera-softGreen to-plantera-mintGreen flex items-center justify-center">
                    <FileText className="h-12 w-12 text-plantera-green" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-base line-clamp-2">{doc.title}</CardTitle>
                      <Badge className={`ml-2 ${getLevelColor(doc.difficulty)}`}>
                        {doc.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-sm">
                      {doc.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {doc.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {doc.chapters} chapitres
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">{doc.downloads} téléchargements</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{doc.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-700">Contenu:</p>
                      <div className="space-y-1">
                        {doc.content.topics.slice(0, 3).map((topic, idx) => (
                          <p key={idx} className="text-xs text-slate-600">• {topic}</p>
                        ))}
                        {doc.content.topics.length > 3 && (
                          <p className="text-xs text-slate-400">+{doc.content.topics.length - 3} autres sujets</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Télécharger
                      </Button>
                      <Button size="sm" className="flex-1 bg-plantera-green hover:bg-plantera-green/90">
                        Lire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-slate-200 hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <Badge className={getLevelColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-slate-600">
                      <p>Durée: {path.duration}</p>
                      <p>{path.courses.length} cours inclus</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span className="font-semibold">{path.completion}%</span>
                      </div>
                      <Progress value={path.completion} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      {path.courses.map((course, idx) => (
                        <p key={idx} className="text-xs text-slate-500">• {course}</p>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      variant={path.enrolled ? "default" : "outline"}
                      size="sm"
                    >
                      {path.enrolled ? 'Continuer' : 'S\'inscrire'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="space-y-6">
            <div className="space-y-4">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="border-slate-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{webinar.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{webinar.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                          <span>📅 {webinar.date}</span>
                          <span>🕐 {webinar.time}</span>
                          <span>👥 {webinar.participants} participants</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">Par {webinar.speaker}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={webinar.status === 'À venir' ? 'default' : 'secondary'}>
                          {webinar.status}
                        </Badge>
                        <Button size="sm" variant={webinar.status === 'À venir' ? 'default' : 'outline'}>
                          {webinar.status === 'À venir' ? 'S\'inscrire' : 'Revoir'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`border transition-all ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50 hover:shadow-lg' 
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full text-2xl ${
                        achievement.earned ? 'bg-green-100' : 'bg-slate-100'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {achievement.description}
                        </CardDescription>
                        {achievement.earned && achievement.date && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-green-600 font-medium">
                              Obtenu le {achievement.date}
                            </p>
                            <p className="text-xs text-green-500">
                              +{achievement.xp} points XP
                            </p>
                          </div>
                        )}
                        {!achievement.earned && achievement.progress && (
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progression</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-slate-500">
                              +{achievement.xp} points XP à débloquer
                            </p>
                          </div>
                        )}
                      </div>
                      {achievement.earned && (
                        <Award className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Training;