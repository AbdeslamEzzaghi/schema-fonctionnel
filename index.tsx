import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Keyboard, Mouse, Mic, ScanLine, Camera, Cpu, MemoryStick, HardDrive, Monitor, Speaker, Printer, Gamepad, Wifi, FileCode, Mail, Video, type Icon as LucideIcon, ArrowRight, ArrowDown, ArrowUp, Server
} from 'lucide-react';

// --- From types.ts ---
interface CycleStep {
  title: string;
  description: string;
  icon: string;
}

interface SimulationCycle {
  input: CycleStep;
  processing: CycleStep;
  storage: CycleStep;
  output: CycleStep;
}

interface Scenario {
  id: string;
  title: string;
  cycle: SimulationCycle;
}

// --- From constants.ts ---
const SCENARIOS: Scenario[] = [
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
        storage: { title: "Stockage", description: "Pour une vidéo en streaming (YouTube), les données sont chargées en continu depuis un serveur distant via Internet.", icon: "server" },
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

// --- From components/Icon.tsx ---
interface IconProps {
  name: string;
  className?: string;
}

const iconMap: { [key: string]: LucideIcon } = {
  keyboard: Keyboard,
  mouse: Mouse,
  microphone: Mic,
  scanner: ScanLine,
  webcam: Camera,
  cpu: Cpu,
  ram: MemoryStick,
  storage: HardDrive,
  monitor: Monitor,
  speaker: Speaker,
  printer: Printer,
  gamepad: Gamepad,
  network: Wifi,
  'file-code': FileCode,
  mail: Mail,
  video: Video,
  server: Server,
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-8 h-8' }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} strokeWidth={2} />;
};


// --- From components/AnimatedText.tsx ---
interface AnimatedTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, speed = 70, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    if (text) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false); 
          onCompleteRef.current?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {isTyping && <span className="inline-block w-0.5 animate-pulse bg-slate-600 h-4 ml-1 align-middle"></span>}
    </span>
  );
};


// --- From components/CycleStage.tsx ---
interface CycleStageProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  isCompleted: boolean;
  onAnimationComplete?: () => void;
}

const iconColorMap: { [key: string]: string } = {
  keyboard: 'text-slate-600',
  mouse: 'text-slate-500',
  microphone: 'text-rose-500',
  scanner: 'text-teal-600',
  webcam: 'text-purple-600',
  cpu: 'text-blue-600',
  ram: 'text-emerald-500',
  storage: 'text-green-600',
  monitor: 'text-indigo-700',
  speaker: 'text-violet-500',
  printer: 'text-gray-600',
  gamepad: 'text-red-600',
  network: 'text-cyan-500',
  server: 'text-slate-700',
};

const iconBgColorMap: { [key: string]: string } = {
    keyboard: 'bg-slate-600/10',
    mouse: 'bg-slate-500/10',
    microphone: 'bg-rose-500/10',
    scanner: 'bg-teal-600/10',
    webcam: 'bg-purple-600/10',
    cpu: 'bg-blue-600/10',
    ram: 'bg-emerald-500/10',
    storage: 'bg-green-600/10',
    monitor: 'bg-indigo-700/10',
    speaker: 'bg-violet-500/10',
    printer: 'bg-gray-600/10',
    gamepad: 'bg-red-600/10',
    network: 'bg-cyan-500/10',
    server: 'bg-slate-700/10',
};

const iconBorderColorMap: { [key: string]: string } = {
    keyboard: 'border-slate-500',
    mouse: 'border-slate-400',
    microphone: 'border-rose-500',
    scanner: 'border-teal-500',
    webcam: 'border-purple-500',
    cpu: 'border-blue-500',
    ram: 'border-emerald-500',
    storage: 'border-green-500',
    monitor: 'border-indigo-600',
    speaker: 'border-violet-500',
    printer: 'border-gray-500',
    gamepad: 'border-red-500',
    network: 'border-cyan-500',
    server: 'border-slate-600',
};

const iconShadowColorMap: { [key: string]: string } = {
    keyboard: 'shadow-slate-500/20',
    mouse: 'shadow-slate-400/20',
    microphone: 'shadow-rose-500/20',
    scanner: 'shadow-teal-500/20',
    webcam: 'shadow-purple-500/20',
    cpu: 'shadow-blue-500/20',
    ram: 'shadow-emerald-500/20',
    storage: 'shadow-green-500/20',
    monitor: 'shadow-indigo-600/20',
    speaker: 'shadow-violet-500/20',
    printer: 'shadow-gray-500/20',
    gamepad: 'shadow-red-500/20',
    network: 'shadow-cyan-500/20',
    server: 'shadow-slate-600/20',
};

const iconAnimationMap: { [key: string]: string } = {
  keyboard: 'animate-slow-pulse',
  mouse: 'animate-slow-pulse',
  gamepad: 'animate-slow-pulse',
  microphone: 'animate-slow-pulse',
  webcam: 'animate-slow-pulse',
  scanner: 'animate-slow-pulse',
  cpu: 'animate-slow-pulse',
  ram: 'animate-slow-pulse',
  storage: 'animate-slow-pulse',
  monitor: 'animate-slow-pulse',
  speaker: 'animate-slow-pulse',
  printer: 'animate-slow-pulse',
  network: 'animate-slow-pulse',
  server: 'animate-slow-pulse',
};

const componentNameMap: { [key: string]: string } = {
  keyboard: 'Clavier',
  mouse: 'Souris',
  microphone: 'Microphone',
  scanner: 'Scanner',
  webcam: 'Webcam',
  cpu: 'Processeur (CPU)',
  ram: 'Mémoire vive (RAM)',
  storage: 'Disque dur / SSD',
  monitor: 'Écran (Moniteur)',
  speaker: 'Haut-parleurs',
  printer: 'Imprimante',
  gamepad: 'Manette de jeu',
  network: 'Réseau (Internet)',
  server: 'Serveur distant',
};

const iconPingColorMap: { [key: string]: string } = {
    keyboard: 'bg-slate-400/80',
    mouse: 'bg-slate-400/80',
    microphone: 'bg-rose-400/80',
    scanner: 'bg-teal-400/80',
    webcam: 'bg-purple-400/80',
    cpu: 'bg-blue-400/80',
    ram: 'bg-emerald-400/80',
    storage: 'bg-green-400/80',
    monitor: 'bg-indigo-400/80',
    speaker: 'bg-violet-400/80',
    printer: 'bg-gray-400/80',
    gamepad: 'bg-red-400/80',
    network: 'bg-cyan-400/80',
    server: 'bg-slate-500/80',
};


const CycleStage: React.FC<CycleStageProps> = ({ title, description, icon, isActive, isCompleted, onAnimationComplete }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isActive) {
      timer = setTimeout(() => {
        setShowText(true);
      }, 500);
    } else {
      setShowText(isCompleted);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isActive, isCompleted]);

  const color = iconColorMap[icon] || 'text-orange-500';
  const bgColor = iconBgColorMap[icon] || 'bg-orange-500/10';
  const borderColor = iconBorderColorMap[icon] || 'border-orange-500';
  const shadowColor = iconShadowColorMap[icon] || 'shadow-orange-500/20';
  const componentName = componentNameMap[icon] || '';
  const pingColor = iconPingColorMap[icon] || 'bg-orange-400/80';

  const animationClass = isActive ? (iconAnimationMap[icon] || '') : '';

  return (
    <div
      className={`relative bg-white p-6 rounded-lg border-2 w-full transition-all duration-750 ease-in-out transform shadow-sm
        ${isActive ? `${borderColor} ${shadowColor} shadow-lg scale-105` :
          isCompleted ? `${borderColor} shadow-md` :
          'border-slate-200 opacity-70'}`}
    >
      <div className="flex flex-col items-center text-center gap-2 mb-4">
        <h3 className={`text-xl font-bold transition-colors duration-750 ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
          {title}
        </h3>
        <div className={`relative p-3 rounded-full transition-colors duration-750 ${isActive || isCompleted ? bgColor : 'bg-slate-100'}`}>
          {isActive && (
            <div className={`absolute inset-0 rounded-full ${pingColor} animate-ping-signal`}></div>
          )}
          <Icon name={icon} className={`relative w-10 h-10 transition-all duration-750 ease-in-out ${
            isActive ? `${color} ${animationClass}` :
            isCompleted ? color :
            'text-slate-400'
          }`} />
        </div>
        <p className={`text-sm font-semibold transition-colors duration-750 ${isActive || isCompleted ? color : 'text-slate-400'}`}>
          {componentName}
        </p>
      </div>
      <p className="text-slate-600 min-h-[60px] sm:min-h-[80px] text-center">
        {showText && isActive && <AnimatedText key={description} text={description} onComplete={onAnimationComplete} speed={90} />}
        {showText && isCompleted && <span>{description}</span>}
      </p>
    </div>
  );
};


// --- From App.tsx ---
const Arrow: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="flex items-center justify-center min-h-[50px] md:flex-1 md:min-h-0 md:min-w-[50px] lg:min-w-[100px] px-2">
    <ArrowRight
      className={`hidden md:block w-8 h-8 md:w-12 md:h-12 transition-colors duration-750 ease-in-out ${isActive ? 'text-violet-500 animate-nudge-right' : 'text-slate-300'}`}
      strokeWidth={2.5}
    />
     <ArrowDown
      className={`block md:hidden w-8 h-8 transition-colors duration-750 ease-in-out ${isActive ? 'text-violet-500 animate-nudge-down' : 'text-slate-300'}`}
      strokeWidth={2.5}
    />
  </div>
);

const App: React.FC = () => {
  const [simulationData, setSimulationData] = useState<SimulationCycle | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);

  const advanceStage = useCallback(() => {
    if (currentStage < 3) {
      setCurrentStage(prev => prev + 1);
    } else {
      setIsSimulating(false);
    }
  }, [currentStage]);


  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scenarioId = e.target.value;
    setSelectedScenarioId(scenarioId);
    
    if (scenarioId) {
        const selectedScenario = SCENARIOS.find(s => s.id === scenarioId);
        if (selectedScenario) {
            setSimulationData(selectedScenario.cycle);
            setIsSimulating(false);
            setCurrentStage(-1);
        }
    } else {
        setSimulationData(null);
    }
  };


  const startSimulation = useCallback(() => {
    if (!simulationData) return;
    setCurrentStage(0);
    setIsSimulating(true);
  }, [simulationData]);

  const resetSimulation = useCallback(() => {
    setSimulationData(null);
    setIsSimulating(false);
    setCurrentStage(-1);
    setSelectedScenarioId('');
  }, []);
  
  const isSimulationOver = !isSimulating && currentStage !== -1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-violet-600">
            Cycle Fonctionnel de l'Ordinateur
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Une simulation interactive du cycle Entrée → Traitement → Stockage → Sortie.
          </p>
        </header>

        <main>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-md">
                    <label htmlFor="scenario-select" className="text-2xl font-bold text-center text-violet-600 mb-4 block">1. Choisissez une situation à simuler</label>
                    <select
                        id="scenario-select"
                        value={selectedScenarioId}
                        onChange={handleScenarioChange}
                        className="w-full p-3 bg-white text-slate-700 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    >
                        <option value="">-- Sélectionnez un scénario --</option>
                        {SCENARIOS.map((scenario) => (
                          <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
                        ))}
                    </select>
                </div>
            </div>

          {simulationData && (
            <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200/80 shadow-md">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-violet-600 mb-2">2. Simulation</h3>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 lg:gap-4">
                  <div className="w-full md:basis-1/4">
                    <CycleStage 
                        title={simulationData.input.title}
                        description={simulationData.input.description}
                        icon={simulationData.input.icon}
                        isActive={isSimulating && currentStage === 0}
                        isCompleted={currentStage > 0 || isSimulationOver}
                        onAnimationComplete={currentStage === 0 ? advanceStage : undefined}
                    />
                  </div>
                  <Arrow isActive={currentStage >= 1} />
                  <div className="w-full md:basis-5/12 p-4 border-2 border-dashed border-violet-300 rounded-lg flex flex-col gap-2 justify-center">
                      <CycleStage 
                          title={simulationData.processing.title}
                          description={simulationData.processing.description}
                          icon={simulationData.processing.icon}
                          isActive={isSimulating && currentStage === 1}
                          isCompleted={currentStage > 1 || isSimulationOver}
                          onAnimationComplete={currentStage === 1 ? advanceStage : undefined}
                      />
                      <div className="flex justify-center items-center gap-4 my-1">
                        <ArrowDown className={`w-6 h-6 transition-colors duration-750 ${currentStage >= 2 ? 'text-green-500 animate-nudge-down' : 'text-slate-300'}`} strokeWidth={2.5}/>
                        <ArrowUp className={`w-6 h-6 transition-colors duration-750 ${currentStage >= 2 ? 'text-green-500 animate-nudge-up' : 'text-slate-300'}`} strokeWidth={2.5}/>
                      </div>
                      <CycleStage 
                          title={simulationData.storage.title}
                          description={simulationData.storage.description}
                          icon={simulationData.storage.icon}
                          isActive={isSimulating && currentStage === 2}
                          isCompleted={currentStage > 2 || isSimulationOver}
                          onAnimationComplete={currentStage === 2 ? advanceStage : undefined}
                      />
                  </div>
                  <Arrow isActive={currentStage >= 3} />
                  <div className="w-full md:basis-1/4">
                    <CycleStage 
                        title={simulationData.output.title}
                        description={simulationData.output.description}
                        icon={simulationData.output.icon}
                        isActive={isSimulating && currentStage === 3}
                        isCompleted={isSimulationOver}
                        onAnimationComplete={currentStage === 3 ? advanceStage : undefined}
                    />
                  </div>
              </div>

              <div className="mt-8 flex justify-center">
                {!isSimulating && currentStage === -1 ? (
                   <button 
                     onClick={startSimulation}
                     className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 hover:scale-105"
                   >
                     Démarrer la simulation
                   </button>
                ) : isSimulating ? (
                    <div className="text-lg text-violet-600 flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-t-violet-500 border-r-violet-500 border-b-violet-500 border-l-transparent rounded-full animate-spin"></div>
                      Simulation en cours...
                    </div>
                ) : (
                    <button 
                      onClick={resetSimulation}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 hover:scale-105"
                    >
                      Choisir une autre simulation
                    </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};


// --- Original index.tsx entry point ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);