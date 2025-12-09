// --- CONFIGURACIÓN DE AUDIENCIAS ---
export const AUDIENCES = [
  { id: 'couple', label: 'Pareja Estable', icon: Heart, desc: 'Confianza, amor y nuevos límites.', color: 'text-rose-500', bg: 'bg-rose-500/20' },
  { id: 'fwb', label: 'Amigos con Beneficios', icon: Zap, desc: 'Sudor, placer y cero drama.', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'ons', label: 'Una Noche', icon: Flame, desc: 'Directo, rápido y sin preguntas.', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { id: 'kinky', label: 'Kinky & BDSM', icon: Feather, desc: 'Poder, control y dolor.', color: 'text-purple-500', bg: 'bg-purple-500/20' },
  { id: 'public', label: 'Adrenalina (Público)', icon: Eye, desc: 'El morbo de que nos vean.', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { id: 'situationship', label: 'Casi Algo', icon: Sparkles, desc: 'Tensión no resuelta.', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/20' },
  { id: 'ex', label: 'Ex Pareja', icon: Skull, desc: 'Morbo y recuerdos.', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  { id: 'friends', label: 'Fiesta / Grupo', icon: Beer, desc: 'Descontrol social.', color: 'text-blue-400', bg: 'bg-blue-500/20' },
];

// --- JUEGOS ---
export const GAMES = [
  { id: 'cards', label: 'Verdad o Reto X', desc: 'Cientos de retos por nivel.', icon: Zap, type: 'social' },
  { id: 'roleplay', label: 'Roleplay Roulette', desc: 'Roles y fantasías al azar.', icon: UserPlus, type: 'action' }, // JUEGO DEL WORD
  { id: 'dice', label: 'Dados Calientes', desc: 'Acción aleatoria rápida.', icon: Dice5, type: 'action' },
  { id: 'kama', label: 'Kamasutra', desc: 'Biblioteca masiva (+60).', icon: Layers, type: 'action' },
  { id: 'photo', label: 'Paparazzi X', desc: 'Fotos y poses prohibidas.', icon: Camera, type: 'action' },
  { id: 'timer', label: 'Rally Cronometrado', desc: 'Cambio de posición automático.', icon: Timer, type: 'action' },
  { id: 'roulette', label: 'Ruleta Rusa', desc: 'Castigos extremos.', icon: Bomb, type: 'risk' },
  { id: 'never', label: 'Yo Nunca XXX', desc: 'Confesiones calientes.', icon: Beer, type: 'social' },
];

export const HEAT_LEVELS = [
  { level: 1, label: 'Coqueto', icon: '🔥', color: 'text-blue-300', desc: 'Calentamiento' },
  { level: 2, label: 'Caliente', icon: '🔥🔥', color: 'text-yellow-400', desc: 'Manos inquietas' },
  { level: 3, label: 'Erótico', icon: '🔥🔥🔥', color: 'text-orange-500', desc: 'Oral y Juguetes' },
  { level: 4, label: 'Hardcore', icon: '💀', color: 'text-red-500', desc: 'Fetiches y Acción' },
  { level: 5, label: 'XXX', icon: '😈', color: 'text-purple-500', desc: 'Sin Límites' },
  { level: 'all', label: 'Caos', icon: <Shuffle size={16} />, color: 'text-white', desc: '¡TODO VALE!' }
];
