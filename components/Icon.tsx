import React from 'react';
import {
  Keyboard,
  Mouse,
  Mic,
  ScanLine,
  Camera,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Speaker,
  Printer,
  Gamepad,
  Wifi,
  FileCode,
  Mail,
  Video,
  type Icon as LucideIcon,
} from 'lucide-react';

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
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-8 h-8' }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Render a fallback or nothing if the icon name is not found
    return null;
  }

  return <IconComponent className={className} strokeWidth={2} />;
};

export default Icon;
