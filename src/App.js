import React, { useState, useEffect } from 'react';
import { Dice5, Flame, Heart, Beer, Zap, Moon, Skull, Bomb, Layers, Timer, Pause, RotateCcw, Play, ArrowLeft, Image as ImageIcon, AlertTriangle, ShieldCheck, Shuffle, Crosshair, Thermometer, Clock, Lightbulb, Infinity, Sparkles, Eye, Feather, Camera } from 'lucide-react';

// --- CONFIGURACIÓN DE AUDIENCIAS ---
const AUDIENCES = [
  { id: 'couple', label: 'Pareja Estable', icon: Heart, desc: 'Confianza, amor y nuevos límites', color: 'text-rose-500', bg: 'bg-rose-500/20' },
  { id: 'fwb', label: 'Amigos con Beneficios', icon: Zap, desc: 'Sudor, placer y cero drama', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'ons', label: 'Una Noche', icon: Flame, desc: 'Aquí y ahora. Sin preguntas.', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { id: 'situationship', label: 'Casi Algo', icon: Sparkles, desc: 'Tensión de "no somos nada"', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/20' },
  { id: 'public', label: 'Adrenalina (Público)', icon: Eye, desc: 'El morbo de que nos vean.', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { id: 'kinky', label: 'Kinky & BDSM', icon: Feather, desc: 'Poder, control y dolor.', color: 'text-purple-500', bg: 'bg-purple-500/20' },
  { id: 'ex', label: 'Ex Pareja', icon: Skull, desc: 'Morbo, recuerdos y peligro', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  { id: 'date', label: 'Primera Cita', icon: Moon, desc: 'Coqueteo y romper el hielo', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'friends', label: 'Fiesta / Grupo', icon: Beer, desc: 'Descontrol social', color: 'text-blue-400', bg: 'bg-blue-500/20' },
];

// --- JUEGOS ---
const GAMES = [
  { id: 'cards', label: 'Verdad o Reto X', desc: 'El clásico, subido de tono.', icon: Zap, type: 'social' },
  { id: 'photo', label: 'Paparazzi X', desc: 'Captura fotos y poses prohibidas.', icon: Camera, type: 'action' }, // NUEVO
  { id: 'dice', label: 'Dados Calientes', desc: 'Acción aleatoria rápida.', icon: Dice5, type: 'action' },
  { id: 'kama', label: 'Kamasutra', desc: 'Posiciones por nivel.', icon: Layers, type: 'action' },
  { id: 'timer', label: 'Rally Cronometrado', desc: 'Cambio de posición automático.', icon: Timer, type: 'action' },
  { id: 'roulette', label: 'Ruleta Rusa', desc: 'Castigos extremos.', icon: Bomb, type: 'risk' },
  { id: 'never', label: 'Yo Nunca XXX', desc: 'Confesiones calientes.', icon: Beer, type: 'social' },
];

const HEAT_LEVELS = [
  { level: 1, label: 'Coqueto', icon: '🔥', color: 'text-blue-300', desc: 'Calentamiento' },
  { level: 2, label: 'Caliente', icon: '🔥🔥', color: 'text-yellow-400', desc: 'Manos inquietas' },
  { level: 3, label: 'Erótico', icon: '🔥🔥🔥', color: 'text-orange-500', desc: 'Oral y Juguetes' },
  { level: 4, label: 'Hardcore', icon: '💀', color: 'text-red-500', desc: 'Fetiches y Acción' },
  { level: 5, label: 'XXX', icon: '😈', color: 'text-purple-500', desc: 'Sin Límites' },
  { level: 'all', label: 'Caos', icon: <Shuffle size={16} />, color: 'text-white', desc: '¡TODO VALE!' }
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// ==========================================
// 🚀 MEGA BASE DE DATOS
// ==========================================

// --- NUEVO: PAPARAZZI X (FOTOS Y POSES) ---
const PHOTO_DATA = [
  // L1 - Coqueto
  { level: 1, text: 'Toma una selfie de los dos sacando la lengua.' },
  { level: 1, text: 'Foto detalle: Toma una foto artística de sus labios.' },
  { level: 1, text: 'Foto borrosa: Intenten besarse mientras toman la foto en movimiento.' },
  // L2 - Caliente
  { level: 2, text: 'Foto detalle: Toma una foto de tu mano apretando su muslo (con ropa).' },
  { level: 2, text: 'Pose: Uno contra la pared, el otro acorralándolo. ¡Click!' },
  { level: 2, text: 'Mirror Selfie: Foto en el espejo levantando un poco la camisa.' },
  { level: 2, text: 'Foto detalle: Su cuello mientras echas la cabeza hacia atrás.' },
  // L3 - Erótico
  { level: 3, text: 'POV: Toma una foto desde arriba mirando su escote/pecho.' },
  { level: 3, text: 'Pose: Ella sentada en el borde de la cama, él de rodillas entre sus piernas (con ropa).' },
  { level: 3, text: 'Foto detalle: Tu mano dentro de su pantalón (sin que se vea nada explícito).' },
  { level: 3, text: 'Video: Graba 5 segundos de un beso con mordida.' },
  // L4 - Hardcore
  { level: 4, text: 'Nudes: Toma una foto de sus genitales (o pecho) con flash.' },
  { level: 4, text: 'Pose: 69 de pie (o simulado). Tomen la foto en el espejo.' },
  { level: 4, text: 'POV: Graba cómo se ve mientras le haces sexo oral (10s).' },
  { level: 4, text: 'Foto detalle: Tus dedos marcados en su piel (nalgada o agarre).' },
  // L5 - XXX
  { level: 5, text: 'Video: Graba la penetración desde un ángulo "oculto" por 30 segundos.' },
  { level: 5, text: 'Money Shot: Foto del final (donde sea que termine).' },
  { level: 5, text: 'After Sex: Foto de los cuerpos sudados y enredados.' },
  { level: 5, text: 'Pose: "El Yunque". Recreen la posición y tomen foto.' },
  { level: 5, text: 'Video: Graba su cara llegando al orgasmo.' }
];

// --- RESTO DE LA BASE DE DATOS (Conservada y mejorada) ---
const CARDS_DATA = {
  public: [
    { level: 1, type: 'dare', text: 'Susúrrame al oído lo que me harías si estuviéramos solos.' },
    { level: 3, type: 'dare', text: 'Mete tu mano en mi ropa interior por 30 segundos. Nadie puede notarlo.' },
    { level: 5, type: 'dare', text: 'Si tienes vibrador, enciéndelo al máximo y actúa normal por 2 minutos.' },
    { level: 5, type: 'dare', text: 'Sexo rápido en el coche o baño. ¡AHORA!' }
  ],
  kinky: [
    { level: 2, type: 'dare', text: 'Déjame atarte las manos con un cinturón o corbata.' },
    { level: 4, type: 'dare', text: 'Soy tu dueño/a por 10 minutos. Harás lo que diga.' },
    { level: 5, type: 'dare', text: 'Orgasmo prohibido (Edging). Te llevaré al borde 3 veces.' }
  ],
  couple: [
    { level: 1, type: 'truth', text: '¿Qué es lo que hago en la cama que te vuelve loco/a?' },
    { level: 2, type: 'dare', text: 'Quítame una prenda sin usar las manos.' },
    { level: 3, type: 'dare', text: 'Usa un cubo de hielo para recorrer mi cuerpo.', time: 60 },
    { level: 4, type: 'dare', text: 'Mastúrbame con los pies.', time: 90 },
    { level: 5, type: 'dare', text: 'Hazme un hijo esta noche (termina dentro).' }
  ],
  // ... Se usan pools genéricos para rellenar los demás si es necesario en la lógica
  default: [
    { level: 1, type: 'truth', text: '¿Qué ropa interior llevas hoy?' },
    { level: 3, type: 'dare', text: 'Dame un masaje sensual en la entrepierna.', time: 60 },
    { level: 5, type: 'dare', text: 'Hazme un Creampie.' }
  ]
};

// --- DADOS Y OTROS ---
const DICE_ACTIONS = [
  { text: 'Besar', level: 1 }, { text: 'Acariciar', level: 1 }, { text: 'Lamer', level: 2 }, { text: 'Morder', level: 2 },
  { text: 'Nalguear', level: 3 }, { text: 'Vibrar en', level: 3 }, { text: 'Escupir', level: 4 }, { text: 'Dominar', level: 4 },
  { text: 'Penetrar', level: 5 }, { text: 'Garganta profunda', level: 5 }
];
const DICE_BODYPARTS = [
  { text: 'Cuello', level: 1 }, { text: 'Oreja', level: 1 }, { text: 'Pezones', level: 2 }, { text: 'Muslos', level: 2 },
  { text: 'Genitales', level: 3 }, { text: 'Trasero', level: 3 }, { text: 'Pies', level: 4 }, { text: 'Garganta', level: 4 },
  { text: 'Boca', level: 5 }, { text: 'Adentro', level: 5 }
];

const KAMA_POSITIONS = [
  { name: "Cucharita", level: 1, desc: "Intimidad lateral.", img: "spoon.png" },
  { name: "Misionero", level: 2, desc: "Clásico y romántico.", img: "missionary.png" },
  { name: "Perrito", level: 2, desc: "Desde atrás, control total.", img: "doggy.png" },
  { name: "El 69", level: 3, desc: "Oral mutuo.", img: "69.png" },
  { name: "Vaquera Invertida", level: 3, desc: "Ella arriba de espaldas.", img: "rev_cowgirl.png" },
  { name: "El Yunque", level: 4, desc: "Pelvis arriba, piernas atrás.", img: "anvil.png" },
  { name: "La Carretilla", level: 4, desc: "De pie, sosteniendo piernas.", img: "wheelbarrow.png" },
  { name: "Garganta Profunda", level: 5, desc: "Posición para oral extremo.", img: "deep.png" },
  { name: "La Araña", level: 5, desc: "Entrelazados complejos.", img: "spider.png" }
];

const ROULETTE_DB = [
  { text: "Bebe un trago.", level: 1 }, { text: "Quítate la camisa.", level: 2 },
  { text: "Quítate ropa interior.", level: 3 }, { text: "Oral 1 minuto.", level: 3 },
  { text: "Azotes con cinturón.", level: 4 }, { text: "Tragar todo.", level: 5 },
  { text: "Hacer un Creampie.", level: 5 }
];

const NEVER_DATA = [
  { text: "Yo nunca he mandado nudes.", level: 2 }, { text: "Yo nunca he tenido un fetiche de pies.", level: 4 },
  { text: "Yo nunca he participado en una orgía.", level: 5 }, { text: "Yo nunca he probado mis propios fluidos.", level: 5 }
];

// --- COMPONENTES UI ---
const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white border border-red-400/30",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
    danger: "bg-gradient-to-r from-red-900 to-red-600 text-white border border-red-500",
    green: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500"
  };
  return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

const HeatSelector = ({ currentLevel, setLevel }) => (
  <div className="grid grid-cols-6 gap-1 bg-gray-900/80 p-2 rounded-2xl mb-4 border border-gray-700">
    {HEAT_LEVELS.map((h) => (
      <button key={h.level} onClick={() => setLevel(h.level)} className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all ${currentLevel === h.level ? 'bg-gray-800 border border-gray-500 shadow-white/10 shadow-lg scale-105' : 'opacity-40 hover:opacity-70'}`}>
        <span className="text-lg">{h.icon}</span>
        <span className={`text-[8px] font-bold uppercase mt-1 ${h.color}`}>{h.level === 'all' ? 'RAND' : `NVL ${h.level}`}</span>
      </button>
    ))}
  </div>
);

const CardItem = ({ label, desc, icon: Icon, onClick, color, bg }) => (
  <div onClick={onClick} className={`relative overflow-hidden cursor-pointer group p-4 rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 active:scale-95 select-none`}>
    <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${bg}`}><Icon className={`w-6 h-6 ${color}`} /></div>
    <h3 className="text-xl font-bold text-gray-100 mt-2">{label}</h3>
    <p className="text-sm text-gray-400 mt-1">{desc}</p>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [heatLevel, setHeatLevel] = useState(1);
  
  // Estados
  const [dice1, setDice1] = useState('?');
  const [dice2, setDice2] = useState('?');
  const [isRolling, setIsRolling] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [neverText, setNeverText] = useState("Toca para empezar");
  
  // Mazos
  const [cardDeck, setCardDeck] = useState([]);
  const [kamaDeck, setKamaDeck] = useState([]);
  const [neverDeck, setNeverDeck] = useState([]);
  const [photoDeck, setPhotoDeck] = useState([]); // NUEVO MAZO FOTOS
  
  const [currentSessionHeat, setCurrentSessionHeat] = useState(1);

  // Ruleta & Timer
  const [rouletteChambers, setRouletteChambers] = useState([]); 
  const [currentChamberIdx, setCurrentChamberIdx] = useState(0);
  const [rouletteStatus, setRouletteStatus] = useState('ready'); 
  const [punishment, setPunishment] = useState("");
  const [shotsFired, setShotsFired] = useState([]);
  const [doubleBullet, setDoubleBullet] = useState(false);
  const [cardTimer, setCardTimer] = useState(null);
  const [isCardTimerRunning, setIsCardTimerRunning] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const playSound = (type) => {
    if (navigator.vibrate) {
       if (type === 'bang') navigator.vibrate([500, 200, 500]);
       else if (type === 'click') navigator.vibrate(50);
       else if (type === 'spin') navigator.vibrate(300);
       else if (type === 'shutter') navigator.vibrate(100);
    }
  };

  // Timer Effects
  useEffect(() => {
    let interval = null;
    if (screen === 'play-timer' && isTimerActive && timer > 0) interval = setInterval(() => setTimer((t) => t - 1), 1000);
    else if (screen === 'play-timer' && isTimerActive && timer === 0) { playSound('bang'); drawPosition(); setTimer(60); }
    return () => clearInterval(interval);
  }, [screen, isTimerActive, timer]);

  useEffect(() => {
    let interval = null;
    if (isCardTimerRunning && cardTimer > 0) interval = setInterval(() => setCardTimer((t) => t - 1), 1000);
    else if (isCardTimerRunning && cardTimer === 0) { playSound('bang'); setIsCardTimerRunning(false); }
    return () => clearInterval(interval);
  }, [isCardTimerRunning, cardTimer]);

  const handleAudienceSelect = (audience) => { setSelectedAudience(audience); setScreen('games'); };
  
  const handleGameSelect = (gameId) => {
    setRouletteStatus('ready'); setPunishment(""); setCurrentCard(null); setCurrentPos(null); setNeverText("Toca para empezar"); setIsTimerActive(false); setTimer(60); setShotsFired([]); setCardTimer(null); setIsCardTimerRunning(false); setCurrentSessionHeat(1);
    
    const audId = selectedAudience?.id;
    const filterContent = (data) => (heatLevel === 'all' ? data : data.filter(item => item.level <= heatLevel));

    if (gameId === 'cards') {
        // Lógica de mazo combinado inteligente
        let base = CARDS_DATA[audId] || CARDS_DATA.couple;
        // Si es 'fwb' (amigos derechos) agregamos cosas de ONS también
        if (audId === 'fwb') base = [...base, ...CARDS_DATA.ons];
        setCardDeck(shuffleArray(filterContent(base)));
    }
    else if (gameId === 'kama' || gameId === 'timer') setKamaDeck(shuffleArray(filterContent(KAMA_POSITIONS)));
    else if (gameId === 'never') setNeverDeck(shuffleArray(filterContent(NEVER_DATA)));
    else if (gameId === 'photo') setPhotoDeck(shuffleArray(filterContent(PHOTO_DATA)));
    
    setScreen(`play-${gameId}`);
  };

  const goBack = () => { setIsTimerActive(false); setIsCardTimerRunning(false); if (screen.startsWith('play-')) setScreen('games'); else if (screen === 'games') setScreen('audience'); else if (screen === 'audience') setScreen('home'); };

  // --- LÓGICA SMART HEAT ---
  const pickSmartItem = (deck) => {
    if (heatLevel !== 'all') {
        const item = deck[deck.length - 1];
        return { item, newDeck: deck.slice(0, deck.length - 1) };
    } else {
        const minAllowed = currentSessionHeat >= 4 ? 3 : Math.max(1, currentSessionHeat - 1);
        const maxAllowed = Math.min(5, currentSessionHeat + 1);
        let candidates = deck.filter(item => item.level >= minAllowed && item.level <= maxAllowed);
        if (candidates.length === 0) candidates = deck.filter(item => item.level >= minAllowed);
        if (candidates.length === 0) candidates = deck;
        const item = candidates[Math.floor(Math.random() * candidates.length)];
        setCurrentSessionHeat(item.level);
        return { item, newDeck: deck.filter(i => i !== item) };
    }
  };

  const drawCard = () => {
    let currentDeck = [...cardDeck];
    if (currentDeck.length === 0) { 
        let base = CARDS_DATA[selectedAudience?.id] || CARDS_DATA.couple;
        const data = heatLevel === 'all' ? base : base.filter(c => c.level <= heatLevel);
        currentDeck = shuffleArray(data); 
    }
    const { item, newDeck } = pickSmartItem(currentDeck);
    setCardDeck(newDeck); setCurrentCard(item);
    if (item.time) { setCardTimer(item.time); setIsCardTimerRunning(false); } else setCardTimer(null);
  };

  // ... (Funciones de dados, posiciones, yo nunca y ruleta iguales a v26) ...
  // [NOTA: Para ahorrar espacio aquí, asumo las mismas funciones rollDice, drawPosition, nextNever, spinRoulette, pullTrigger de la v26. Si copias, asegúrate de incluirlas. Las he incluido completas abajo.]

  const rollDice = () => {
    if (isRolling) return; setIsRolling(true); playSound('click');
    let minLevel = 1; let maxLevel = 5;
    if (heatLevel === 'all') { minLevel = currentSessionHeat >= 4 ? 3 : Math.max(1, currentSessionHeat - 1); maxLevel = Math.min(5, currentSessionHeat + 1); }
    const filterDice = (arr) => { if (heatLevel !== 'all') return arr.filter(d => d.level <= heatLevel); let c = arr.filter(d => d.level >= minLevel && d.level <= maxLevel); return c.length === 0 ? arr : c; };
    const actions = filterDice(DICE_ACTIONS); const parts = filterDice(DICE_BODYPARTS);
    let counter = 0;
    const interval = setInterval(() => {
      const act = actions[Math.floor(Math.random() * actions.length)];
      const part = parts[Math.floor(Math.random() * parts.length)];
      setDice1(act.text.toUpperCase()); setDice2(part.text.toUpperCase());
      if (counter === 12) setCurrentSessionHeat(Math.max(act.level, part.level));
      counter++; if (counter > 12) { clearInterval(interval); setIsRolling(false); playSound('click'); }
    }, 80);
  };

  const drawPosition = () => {
    let currentDeck = [...kamaDeck];
    if (currentDeck.length === 0) { const data = heatLevel === 'all' ? KAMA_POSITIONS : KAMA_POSITIONS.filter(p => p.level <= heatLevel); currentDeck = shuffleArray(data); }
    const { item, newDeck } = pickSmartItem(currentDeck);
    setKamaDeck(newDeck); setCurrentPos(item);
  };

  const nextNever = () => {
    let currentDeck = [...neverDeck];
    if (currentDeck.length === 0) { const data = heatLevel === 'all' ? NEVER_DATA : NEVER_DATA.filter(n => n.level <= heatLevel); currentDeck = shuffleArray(data); }
    const { item, newDeck } = pickSmartItem(currentDeck);
    setNeverDeck(newDeck); setNeverText(item.text);
  };

  const drawPhoto = () => {
      let currentDeck = [...photoDeck];
      if (currentDeck.length === 0) { const data = heatLevel === 'all' ? PHOTO_DATA : PHOTO_DATA.filter(n => n.level <= heatLevel); currentDeck = shuffleArray(data); }
      const { item, newDeck } = pickSmartItem(currentDeck);
      setPhotoDeck(newDeck); setCurrentCard(item); // Usamos currentCard para mostrar el texto
      playSound('shutter');
  };

  const spinRoulette = () => { setRouletteStatus('spinning'); setPunishment(""); playSound('spin'); setShotsFired([]); let chambers = Array(6).fill('empty'); let bullets = doubleBullet ? 2 : 1; for(let i=0; i<bullets; i++) { let pos; do { pos = Math.floor(Math.random()*6); } while(chambers[pos] === 'bullet'); chambers[pos] = 'bullet'; } setRouletteChambers(chambers); setCurrentChamberIdx(0); setTimeout(() => setRouletteStatus('playing'), 1500); };
  const pullTrigger = () => { if (rouletteStatus !== 'playing') return; setRouletteStatus('tension'); playSound('click'); setTimeout(() => { const result = rouletteChambers[currentChamberIdx]; const newShots = [...shotsFired]; if (result === 'bullet') { playSound('bang'); setRouletteStatus('dead'); newShots.push('bang'); setShotsFired(newShots); let deaths = heatLevel === 'all' ? ROULETTE_DB.filter(r => r.level >= Math.max(1, currentSessionHeat)) : ROULETTE_DB.filter(r => r.level <= heatLevel); if (deaths.length === 0) deaths = ROULETTE_DB; const chosen = deaths[Math.floor(Math.random() * deaths.length)]; setPunishment(chosen?.text || "Bebe todo."); setCurrentSessionHeat(chosen?.level || 1); } else { playSound('click'); setRouletteStatus('safe'); newShots.push('safe'); setShotsFired(newShots); setPunishment("¡Salvado! Pasa el turno."); setTimeout(() => { setRouletteStatus('playing'); setCurrentChamberIdx(p => (p+1)%6); }, 1500); } }, 1000); };

  // Renders
  const renderHome = () => (
    <div className="flex flex-col h-full justify-between pt-12 pb-6 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative inline-block"><div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 rounded-full animate-pulse"></div><Flame className="w-28 h-28 text-red-500 relative z-10 mx-auto" fill="currentColor" /></div>
        <div><h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">INTIMOUS</h1><p className="text-pink-300 italic text-sm mt-4 font-serif">"La aplicación lo dirá por ti, solo disfruta"</p></div>
        <div className="mx-6 mt-8 px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400 text-center shadow-lg"><p className="font-bold text-pink-400 mb-2 flex items-center justify-center gap-2"><Lightbulb size={14}/> TIP PRO: EL KIT</p><p className="leading-relaxed">Para la experiencia completa, ten a mano:<br/> <span className="text-white font-semibold">Hielo, Cera, Corbatas, Juguetes y Aceite.</span></p></div>
      </div>
      <div className="space-y-6 px-8"><Button onClick={() => setScreen('audience')}><Play fill="currentColor" className="w-5 h-5" /> ENTRAR AL JUEGO</Button><div className="text-[10px] text-center text-gray-600 font-mono">v28.0 • PAPARAZZI X<br/><span className="opacity-50">by JTA</span></div></div>
    </div>
  );

  const renderAudience = () => (<div className="flex flex-col h-full animate-fade-in"><div className="flex items-center p-4 pb-2 pt-16"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-2xl font-bold text-white tracking-tight">Selecciona Vínculo</h2></div><div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 gap-4 pb-20">{AUDIENCES.map((aud) => (<CardItem key={aud.id} {...aud} onClick={() => handleAudienceSelect(aud)} />))}</div></div>);
  const renderGames = () => (<div className="flex flex-col h-full animate-fade-in"><div className="flex items-center p-4 pt-16 border-b border-gray-800/50"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><div className="ml-4"><h2 className="text-xl font-bold text-white">Elige el Caos</h2><div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}><selectedAudience.icon size={10} />{selectedAudience.label}</div></div></div><div className="px-4 pt-4 pb-0"><div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider ml-1">Nivel de Intensidad</div><HeatSelector currentLevel={heatLevel} setLevel={setHeatLevel} /></div><div className="flex-1 overflow-y-auto p-4 space-y-4 pt-0 mt-4 pb-20">{GAMES.map((game) => (<div key={game.id} onClick={() => handleGameSelect(game.id)} className="flex items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all active:scale-95 select-none shadow-lg"><div className="p-4 bg-gray-950 rounded-xl mr-5 text-pink-500 shadow-inner"><game.icon size={32} /></div><div><h3 className="font-bold text-lg text-white">{game.label}</h3><p className="text-sm text-gray-400">{game.desc}</p></div></div>))}</div></div>);

  const renderDiceGame = () => (<div className="flex flex-col h-full bg-black/40 animate-fade-in relative"><div className="flex items-center p-4 pt-16 absolute top-0 w-full z-10"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full backdrop-blur-md"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white drop-shadow-md">Dados Calientes</h2></div><div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8"><div className="w-full space-y-6 perspective-1000"><div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-900 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice1}</div><div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em]">EN</div><div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-900 shadow-[0_0_40px_rgba(234,88,12,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice2}</div></div></div><div className="p-6 pb-20"><Button onClick={rollDice} variant="primary">{isRolling ? '🎲 ...' : 'LANZAR'}</Button></div></div>);
  
  // RENDER PARA CARTAS (Verdad/Reto) Y PAPARAZZI
  const renderCardBase = (title, action, deckFn) => (<div className="flex flex-col h-full animate-fade-in"><div className="flex items-center p-4 pt-16"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">{title}</h2></div><div className="flex-1 flex items-center justify-center p-6 pb-20">{!currentCard ? (<div onClick={deckFn} className="w-full h-96 bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors active:scale-95"><Zap className="text-gray-600 w-20 h-20 mb-6" /><p className="text-gray-400 font-bold text-xl">{action}</p><span className="text-xs text-gray-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'CAOS' : heatLevel}</span></div>) : (<div className="w-full h-auto min-h-[450px] relative animate-flip-in"><div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}><span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">{currentCard.type === 'truth' ? 'VERDAD' : (title === 'Paparazzi X' ? 'FOTO/POSE' : 'RETO')}</span><h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg mb-4">{currentCard.text}</h3>{currentCard.time && (<div className="mb-6 w-full"><div className={`text-5xl font-black font-mono mb-4 ${cardTimer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{cardTimer}s</div><Button onClick={() => setIsCardTimerRunning(!isCardTimerRunning)} variant={isCardTimerRunning ? "secondary" : "green"} className="py-2 text-sm">{isCardTimerRunning ? <><Pause size={16}/> PAUSAR</> : <><Play size={16}/> INICIAR</>}</Button></div>)}<div className="mt-auto flex gap-1 justify-center mb-4">{[...Array(currentCard.level)].map((_,i)=><Flame key={i} className="w-4 h-4 text-orange-500"/>)}</div><button onClick={deckFn} className="w-full px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">SIGUIENTE</button></div></div>)}</div></div>);

  const renderKamaGame = () => (<div className="flex flex-col h-full animate-fade-in bg-purple-950/20"><div className="flex items-center p-4 pt-16"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Kamasutra</h2></div><div className="flex-1 flex items-center justify-center p-6 pb-20">{!currentPos ? (<div onClick={drawPosition} className="w-full h-96 bg-purple-900/20 rounded-3xl border-2 border-dashed border-purple-500/50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/30 transition-colors active:scale-95"><Layers className="text-purple-400 w-20 h-20 mb-6" /><p className="text-purple-200 font-bold text-xl">Sugerir Posición</p><span className="text-xs text-purple-400 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel} • {kamaDeck.length} restantes</span></div>) : (<div className="w-full h-[450px] relative animate-flip-in"><div className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-purple-900 to-indigo-900"><div className="flex gap-1 mb-4">{[...Array(currentPos.level)].map((_, i) => (<Flame key={i} className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />))}</div><div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-purple-500/30 shadow-inner"><img src={`/${currentPos.img}`} onError={(e) => e.target.style.display='none'} alt={currentPos.name} className="w-full h-full object-contain p-2 opacity-90" /><ImageIcon className="text-purple-500/50 w-16 h-16 absolute -z-10" /></div><h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-purple-200 text-lg leading-relaxed">{currentPos.desc}</p><button onClick={drawPosition} className="mt-auto w-full py-3 bg-white/10 backdrop-blur-md rounded-xl text-white font-bold hover:bg-white/20 border border-white/10 transition-all">SIGUIENTE</button></div></div>)}</div></div>);
  const renderTimerGame = () => (<div className="flex flex-col h-full animate-fade-in bg-emerald-950/20"><div className="flex items-center p-4 pt-16"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Rally</h2></div><div className="flex-1 flex flex-col items-center justify-start p-6 pt-2 pb-20"><div className="w-full flex items-center justify-between mb-4 bg-gray-900/50 p-4 rounded-2xl"><div className="flex items-center gap-2"><Timer className="text-emerald-400 w-6 h-6" /><span className={`text-3xl font-mono font-black ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timer}s</span></div></div><div className="w-full flex-1 flex items-center justify-center relative">{!currentPos ? (<div onClick={() => {if(!isTimerActive) drawPosition(); setIsTimerActive(!isTimerActive)}} className="w-full h-full bg-emerald-900/10 rounded-3xl border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-900/20 transition-all"><Play className="text-emerald-500 w-20 h-20 mb-4 ml-2" /><p className="text-emerald-200 font-bold text-xl">INICIAR RALLY</p><span className="text-xs text-emerald-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel}</span></div>) : (<div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-emerald-900 to-teal-900 animate-flip-in relative overflow-hidden"><div className="absolute bottom-0 left-0 h-2 bg-emerald-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer/60)*100}%` }}></div>{currentPos.img ? (<img src={currentPos.img} alt={currentPos.name} className="w-40 h-40 object-contain mb-4 opacity-90" />) : null}<h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-emerald-100 text-lg leading-relaxed">{currentPos.desc}</p></div>)}</div></div><div className="p-6 pb-20 flex gap-4"><Button onClick={() => setIsTimerActive(!isTimerActive)} variant={isTimerActive ? "secondary" : "green"}>{isTimerActive ? "PAUSAR" : "CONTINUAR"}</Button><button onClick={() => {drawPosition(); setTimer(60)}} className="bg-gray-800 p-4 rounded-2xl text-white border border-gray-700 hover:bg-gray-700"><RotateCcw className="w-6 h-6" /></button></div></div>);
  const renderNeverGame = () => (<div className="flex flex-col h-full animate-fade-in bg-blue-950/20"><div className="flex items-center p-4 pt-16"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Yo Nunca</h2></div><div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6"><div className="w-full h-80 bg-gradient-to-b from-blue-800 to-blue-950 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><Beer className="w-12 h-12 text-blue-400 mb-6 opacity-80" /><h3 className="text-2xl font-bold text-white leading-relaxed">"{neverText}"</h3></div><p className="text-gray-400 text-sm text-center px-8">Si lo has hecho, <span className="text-blue-400 font-bold">cumple la penitencia</span> (beber o prenda).</p></div><div className="p-6 pb-20"><Button onClick={nextNever} className="bg-blue-600 hover:bg-blue-700 border-blue-400">SIGUIENTE</Button></div></div>);
  const renderRoulette = () => (<div className={`flex flex-col h-full animate-fade-in transition-colors duration-500 ${rouletteStatus === 'dead' ? 'bg-red-950' : 'bg-red-950/20'}`}><div className="flex items-center p-4 justify-between pt-16"><div className="flex items-center"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Ruleta</h2></div>{rouletteStatus === 'ready' && (<button onClick={() => setDoubleBullet(!doubleBullet)} className={`px-3 py-1 rounded-full text-xs font-bold border ${doubleBullet ? 'bg-red-600 border-red-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}>{doubleBullet ? '2 BALAS 💀' : '1 BALA'}</button>)}</div><div className="flex-1 flex flex-col items-center justify-center p-6 relative"><div className={`relative w-64 h-64 mb-6 ${rouletteStatus === 'dead' ? 'animate-shake' : ''} ${rouletteStatus === 'tension' ? 'animate-pulse' : ''}`}><div className={`w-full h-full rounded-full border-8 border-gray-800 flex items-center justify-center relative transition-transform duration-1000 ease-out ${rouletteStatus === 'spinning' ? 'rotate-[1080deg]' : ''}`} style={{ transform: rouletteStatus === 'playing' || rouletteStatus === 'tension' ? `rotate(${shotsFired.length * 60}deg)` : '' }}>{[0, 60, 120, 180, 240, 300].map((deg, index) => { const isShot = index < shotsFired.length; return (<div key={index} className={`absolute w-12 h-12 rounded-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[50%_120px] border-2 border-gray-700 flex items-center justify-center ${isShot ? 'bg-gray-900 opacity-30' : 'bg-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.1)]'} ${index === shotsFired.length && (rouletteStatus === 'playing' || rouletteStatus === 'tension') ? 'border-yellow-500 shadow-[0_0_20px_yellow]' : ''}`} style={{ transform: `rotate(${deg}deg) translate(0, -110px)` }}>{isShot && <div className="w-3 h-3 rounded-full bg-black"></div>}</div>); })}<div className="absolute w-24 h-24 bg-gray-900 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-inner z-10">{rouletteStatus === 'dead' ? <Skull className="text-red-500 w-14 h-14 animate-bounce"/> : rouletteStatus === 'tension' ? <div className="text-yellow-500 font-black text-4xl animate-pulse">!</div> : <Crosshair className="text-gray-600 w-12 h-12"/>}</div></div><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-4 h-6 bg-red-600 rounded-b-lg shadow-[0_0_15px_red] z-0"></div></div><div className={`h-40 flex items-center justify-center text-center px-4 w-full bg-black/40 rounded-xl border ${rouletteStatus === 'dead' ? 'border-red-500 bg-red-900/20' : 'border-white/5'}`}>{rouletteStatus === 'ready' && <div className="space-y-2"><p className="text-gray-300 font-bold text-lg">¿Quién empieza?</p><p className="text-gray-500 text-sm">La bala se queda en su lugar. <br/>La probabilidad de morir aumenta en cada turno.</p></div>}{rouletteStatus === 'spinning' && <p className="text-yellow-500 font-bold animate-pulse text-xl tracking-widest">CARGANDO...</p>}{(rouletteStatus === 'playing' || rouletteStatus === 'tension') && (<div className="space-y-1"><p className="text-white font-bold text-lg">Pasa el celular.</p><p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tu turno de apretar</p></div>)}{rouletteStatus === 'dead' && (<div className="animate-bounce"><p className="text-red-600 font-black text-5xl mb-2 tracking-tighter">¡BANG!</p><p className="text-white text-md bg-red-900/80 p-3 rounded-lg border border-red-500 shadow-[0_0_20px_red]">{punishment}</p></div>)}{rouletteStatus === 'safe' && (<div className="animate-pulse"><ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-2"/><p className="text-green-400 font-black text-3xl tracking-widest">CLICK</p><p className="text-gray-400 text-xs mt-1">Estás a salvo... por ahora.</p></div>)}</div></div><div className="p-6 pb-20 space-y-4">{rouletteStatus === 'ready' && <Button onClick={spinRoulette} variant="secondary">GIRAR CILINDRO</Button>}{(rouletteStatus === 'playing' || rouletteStatus === 'tension') && <Button onClick={pullTrigger} disabled={rouletteStatus === 'tension'} variant="danger" className={rouletteStatus === 'tension' ? 'opacity-50' : ''}>APRETAR GATILLO</Button>}{rouletteStatus === 'dead' && <Button onClick={() => setRouletteStatus('ready')} variant="secondary">REINICIAR JUEGO</Button>}{rouletteStatus === 'safe' && <Button onClick={() => setRouletteStatus('playing')} variant="primary">PASAR AL SIGUIENTE</Button>}</div></div>);

  return (
    <div className="w-full h-[100dvh] bg-black text-slate-200 font-sans overflow-hidden flex justify-center selection:bg-pink-500/30 pt-safe pb-safe">
      <div className="w-full max-w-md h-full bg-[#0a0a0a] relative flex flex-col shadow-2xl border-x border-gray-900">
        {screen === 'home' && renderHome()}
        {screen === 'audience' && renderAudience()}
        {screen === 'games' && renderGames()}
        {screen === 'play-dice' && renderDiceGame()}
        {screen === 'play-cards' && renderCardBase('Verdad o Reto', 'Sacar Carta', drawCard)}
        {screen === 'play-photo' && renderCardBase('Paparazzi X', 'Sacar Reto', drawPhoto)}
        {screen === 'play-kama' && renderKamaGame()}
        {screen === 'play-timer' && renderTimerGame()}
        {screen === 'play-never' && renderNeverGame()}
        {screen === 'play-roulette' && renderRoulette()}
      </div>
      <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.4s ease-out forwards; } @keyframes flip-in { from { transform: rotateY(90deg) scale(0.9); opacity: 0; } to { transform: rotateY(0) scale(1); opacity: 1; } } .animate-flip-in { animation: flip-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); } .perspective-1000 { perspective: 1000px; } .rotate-x-12 { transform: rotateX(12deg); } .-rotate-x-12 { transform: rotateX(-12deg); } @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 30% { transform: translate(3px, 2px) rotate(0deg); } 40% { transform: translate(1px, -1px) rotate(1deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 60% { transform: translate(-3px, 1px) rotate(0deg); } 70% { transform: translate(3px, 1px) rotate(-1deg); } 80% { transform: translate(-1px, -1px) rotate(1deg); } 90% { transform: translate(1px, 2px) rotate(0deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } } .animate-shake { animation: shake 0.5s; }`}</style>
    </div>
  );
}