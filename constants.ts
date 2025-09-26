import type { Scenario } from './types.ts';

export const SCENARIOS: Scenario[] = [
  {
    id: 'text',
    title: 'Écrire un texte (exemple : taper un devoir sur Word).',
    cycle: {
      input: { title: "Entrée", description: "L'utilisateur tape des lettres sur le clavier. Chaque touche envoie un signal à l'ordinateur.", icon: "keyboard" },
      processing: { title: "Traitement", description: "Le processeur (CPU) interprète les signaux, les reconnaît comme des caractères et les affiche à l'écran.", icon: "cpu" },
      storage: { title: "Stockage", description: "Le texte est gardé en mémoire vive (RAM) puis peut être enregistré sur le disque dur dans un fichier.", icon: "storage" },
      output: { title: "Sortie", description: "Le texte apparaît sur l'écran. Il peut ensuite être envoyé à une imprimante pour être mis sur papier.", icon: "monitor" }
    }
  },
  {
    id: 'game',
    title: 'Jouer à un jeu vidéo (avec clavier, souris ou manette).',
    cycle: {
        input: { title: "Entrée", description: "Le joueur utilise le clavier, la souris ou une manette pour donner des commandes (déplacement, action).", icon: "gamepad" },
        processing: { title: "Traitement", description: "Le processeur et la carte graphique calculent en temps réel les images, les sons et la logique du jeu.", icon: "cpu" },
        storage: { title: "Stockage", description: "Les données du jeu (graphismes, sons) sont lues rapidement depuis le disque dur ou SSD.", icon: "storage" },
        output: { title: "Sortie", description: "Le jeu est affiché sur l'écran et les sons sont joués par les haut-parleurs ou un casque.", icon: "monitor" }
    }
  },
  {
    id: 'video',
    title: 'Regarder une vidéo (YouTube, film, etc.).',
    cycle: {
        input: { title: "Entrée", description: "L'utilisateur clique sur le bouton 'Lecture' avec la souris pour lancer la vidéo.", icon: "mouse" },
        processing: { title: "Traitement", description: "Le processeur décode le fichier vidéo pour transformer les données en images et en son.", icon: "cpu" },
        storage: { title: "Stockage", description: "La vidéo est lue depuis le disque dur ou chargée en continu (streaming) depuis Internet.", icon: "network" },
        output: { title: "Sortie", description: "Les images de la vidéo sont affichées sur l'écran et le son est diffusé par les haut-parleurs.", icon: "monitor" }
    }
  },
  {
    id: 'mic',
    title: 'Parler au micro (enregistrer sa voix).',
    cycle: {
        input: { title: "Entrée", description: "Le microphone capte les ondes sonores de la voix et les transforme en un signal électrique.", icon: "microphone" },
        processing: { title: "Traitement", description: "La carte son et le processeur convertissent le signal électrique en données numériques compréhensibles.", icon: "cpu" },
        storage: { title: "Stockage", description: "Les données audio sont enregistrées sous forme de fichier (ex: MP3) sur le disque dur.", icon: "storage" },
        output: { title: "Sortie", description: "Le son peut être réécouté via des haut-parleurs. Une onde sonore peut s'afficher à l'écran.", icon: "speaker" }
    }
  },
  {
    id: 'music',
    title: 'Écouter de la musique (casque ou haut-parleurs).',
    cycle: {
        input: { title: "Entrée", description: "L'utilisateur double-clique avec la souris sur un fichier musical ou lance une playlist.", icon: "mouse" },
        processing: { title: "Traitement", description: "Le processeur lit et décode le fichier audio pour le transformer en un signal sonore.", icon: "cpu" },
        storage: { title: "Stockage", description: "La chanson est lue depuis le disque dur ou en streaming via une connexion Internet.", icon: "storage" },
        output: { title: "Sortie", description: "La musique est jouée par les haut-parleurs de l'ordinateur ou dans un casque audio.", icon: "speaker" }
    }
  },
  {
    id: 'print',
    title: 'Imprimer une photo ou un document.',
    cycle: {
        input: { title: "Entrée", description: "L'utilisateur clique sur le bouton 'Imprimer' avec la souris dans un logiciel.", icon: "mouse" },
        processing: { title: "Traitement", description: "Le processeur prépare les données de l'image ou du texte pour qu'elles soient comprises par l'imprimante.", icon: "cpu" },
        storage: { title: "Stockage", description: "Le fichier à imprimer est lu depuis le disque dur où il est sauvegardé.", icon: "storage" },
        output: { title: "Sortie", description: "L'imprimante reçoit les données et dépose de l'encre sur une feuille de papier pour créer une copie physique.", icon: "printer" }
    }
  },
  {
    id: 'web',
    title: 'Naviguer sur Internet (rechercher une information).',
    cycle: {
        input: { title: "Entrée", description: "L'utilisateur tape une adresse web ou une recherche dans le navigateur avec le clavier.", icon: "keyboard" },
        processing: { title: "Traitement", description: "Le processeur envoie une requête via le réseau pour obtenir les données de la page web demandée.", icon: "cpu" },
        storage: { title: "Stockage", description: "Les données du site (images, textes) sont temporairement stockées dans le cache du navigateur pour un accès plus rapide.", icon: "ram" },
        output: { title: "Sortie", description: "La page web est assemblée et affichée sur l'écran de l'ordinateur.", icon: "monitor" }
    }
  },
  {
    id: 'scan',
    title: 'Scanner un document (mettre une feuille dans le scanner).',
    cycle: {
        input: { title: "Entrée", description: "Le scanner numérise une feuille de papier en utilisant une source de lumière pour en capturer l'image.", icon: "scanner" },
        processing: { title: "Traitement", description: "Le processeur traite les données de l'image capturée et les transforme en un fichier numérique (PDF, JPEG).", icon: "cpu" },
        storage: { title: "Stockage", description: "Le nouveau fichier numérique du document est sauvegardé sur le disque dur de l'ordinateur.", icon: "storage" },
        output: { title: "Sortie", description: "L'image du document scanné apparaît à l'écran. On peut ensuite l'imprimer pour en faire une copie.", icon: "monitor" }
    }
  },
  {
    id: 'photo',
    title: 'Prendre une photo avec une webcam.',
    cycle: {
        input: { title: "Entrée", description: "La webcam capture la lumière à travers sa lentille pour prendre une image de ce qui se trouve devant.", icon: "webcam" },
        processing: { title: "Traitement", description: "Le processeur de l'ordinateur reçoit les données de l'image et les encode dans un format de fichier (JPEG).", icon: "cpu" },
        storage: { title: "Stockage", description: "La photo est enregistrée sous forme de fichier image sur le disque dur pour être consultée plus tard.", icon: "storage" },
        output: { title: "Sortie", description: "Un aperçu de la photo capturée est immédiatement affiché sur l'écran.", icon: "monitor" }
    }
  },
  {
    id: 'call',
    title: 'Faire un appel vidéo (visioconférence, cours en ligne).',
    cycle: {
        input: { title: "Entrée", description: "La webcam capture la vidéo et le microphone capture l'audio simultanément.", icon: "webcam" },
        processing: { title: "Traitement", description: "Le processeur compresse les données vidéo et audio pour les envoyer efficacement sur Internet.", icon: "cpu" },
        storage: { title: "Stockage", description: "Les données transitent principalement par la mémoire vive (RAM) pour être traitées en temps réel.", icon: "ram" },
        output: { title: "Sortie", description: "L'image et le son de l'autre personne sont affichés sur l'écran et diffusés par les haut-parleurs.", icon: "monitor" }
    }
  }
];