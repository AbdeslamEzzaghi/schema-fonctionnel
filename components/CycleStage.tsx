import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import AnimatedText from './AnimatedText';

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
};


const CycleStage: React.FC<CycleStageProps> = ({ title, description, icon, isActive, isCompleted, onAnimationComplete }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isActive) {
      // Delay for the text to appear, giving focus to the icon animation first.
      timer = setTimeout(() => {
        setShowText(true);
      }, 500);
    } else {
      setShowText(isCompleted); // Show text if completed, hide otherwise
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

export default CycleStage;