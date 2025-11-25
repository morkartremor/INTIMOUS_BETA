import React, { useState, useEffect } from 'react';
import { Dice5, Flame, Heart, Beer, Zap, Moon, Skull, Bomb, Layers, Timer, Pause, RotateCcw, Play, ArrowLeft, Image as ImageIcon, AlertTriangle, ShieldCheck, Shuffle } from 'lucide-react';

// --- CONFIGURACIÓN DE AUDIENCIAS ---
const AUDIENCES = [
  { id: 'couple', label: 'Pareja Estable', icon: Heart, desc: 'Reavivar la llama y fantasías', color: 'text-rose-500', bg: 'bg-rose-500/20' },
  { id: 'friends', label: 'Amigos / Fiesta', icon: Beer, desc: 'Descontrol y risas (Grupal)', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'date', label: 'Primera Cita', icon: Moon, desc: 'Tensión y romper el hielo', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'ons', label: 'Una Noche', icon: Flame, desc: 'Directo al grano, sin charla', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { id: 'fwb', label: 'Amigos con Derechos', icon: Zap, desc: 'Experimentar sin límites', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'ex', label: 'Ex Pareja', icon: Skull, desc: 'Rencor y nostalgia', color: 'text-gray-400', bg: 'bg-gray-500/20' },
];

// --- JUEGOS DISPONIBLES ---
const GAMES = [
  { id: 'dice', label: 'Dados Calientes', desc: 'El azar decide tu destino.', icon: Dice5, type: 'action' },
  { id: 'cards', label: 'Verdad o Reto', desc: 'Confesiones o castigos.', icon: Zap, type: 'social' },
  { id: 'kama', label: 'Kamasutra', desc: 'Biblioteca de posiciones.', icon: Layers, type: 'action' },
  { id: 'timer', label: 'Rally Cronometrado', desc: 'Cambio automático.', icon: Timer, type: 'action' },
  { id: 'never', label: 'Yo Nunca, Nunca', desc: 'Bebe o quítate prenda.', icon: Beer, type: 'social' },
  { id: 'roulette', label: 'Ruleta del Caos', desc: 'Riesgo total.', icon: Bomb, type: 'risk' },
];

// --- NIVELES DE INTENSIDAD (AHORA CON MODO ALEATORIO) ---
const HEAT_LEVELS = [
  { level: 1, label: 'Suave', icon: '🔥', color: 'text-yellow-400', desc: 'Divertido' },
  { level: 2, label: 'Picante', icon: '🔥🔥', color: 'text-orange-500', desc: 'Sensual' },
  { level: 3, label: 'Extremo', icon: '🔥🔥🔥', color: 'text-red-600', desc: 'Sin censura' },
  { level: 'all', label: 'Aleatorio', icon: <Shuffle size={18} />, color: 'text-blue-400', desc: '¡Todo vale!' }
];

// --- HELPER: BARAJAR ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- DATOS ---
const DICE_ACTIONS = [
  { text: 'Soplar', level: 1 }, { text: 'Acariciar', level: 1 }, { text: 'Masajear', level: 1 }, { text: 'Hacer cosquillas', level: 1 },
  { text: 'Besar', level: 1 }, { text: 'Rozar', level: 2 }, { text: 'Lamer', level: 2 }, { text: 'Morder', level: 2 },
  { text: 'Chupar', level: 2 }, { text: 'Apretar', level: 2 }, { text: 'Nalguear', level: 3 }, { text: 'Azotar', level: 3 },
  { text: 'Arañar', level: 3 }, { text: 'Dominar', level: 3 }
];

const DICE_BODYPARTS = [
  { text: 'Mano', level: 1 }, { text: 'Brazo', level: 1 }, { text: 'Mejilla', level: 1 }, { text: 'Cabello', level: 1 },
  { text: 'Cuello', level: 2 }, { text: 'Espalda', level: 2 }, { text: 'Ombligo', level: 2 }, { text: 'Muslo', level: 2 },
  { text: 'Oreja', level: 2 }, { text: 'Labios', level: 2 }, { text: 'Pechos', level: 3 }, { text: 'Trasero', level: 3 },
  { text: 'Entrepierna', level: 3 }, { text: 'Zona Íntima', level: 3 }
];

const KAMA_POSITIONS = [
  { name: "La Cucharita", level: 1, desc: "De lado, pegados espalda con pecho. Intimidad máxima.", img: "cucharita.png" },
  { name: "El Loto", level: 1, desc: "Sentados frente a frente, piernas entrelazadas.", img: "lotus.png" },
  { name: "Misionero", level: 1, desc: "El clásico contacto visual y emocional.", img: "missionary.png" },
  { name: "La Silla", level: 1, desc: "Él sentado, ella encima frente a frente.", img: "chair.png" },
  { name: "El Abrazo", level: 1, desc: "Misionero muy pegado, pecho con pecho.", img: "hug.png" },
  { name: "Perrito (Doggy)", level: 2, desc: "Un clásico infalible desde atrás.", img: "doggy.png" },
  { name: "Vaquera", level: 2, desc: "Ella arriba controlando el ritmo.", img: "cowgirl.png" },
  { name: "El 69", level: 2, desc: "Placer oral mutuo simultáneo.", img: "69.png" },
  { name: "Piernas al Hombro", level: 2, desc: "Ella boca arriba, piernas en hombros de él.", img: "legs_up.png" },
  { name: "La Boa", level: 2, desc: "Misionero con piernas de ella juntas y estiradas.", img: "boa.png" },
  { name: "El Sofá", level: 2, desc: "Ella boca abajo en el borde, él detrás.", img: "sofa.png" },
  { name: "El Yunque", level: 3, desc: "Ella levanta pelvis, piernas muy atrás.", img: "anvil.png" },
  { name: "La Carretilla", level: 3, desc: "De pie, él sostiene las piernas de ella.", img: "wheelbarrow.png" },
  { name: "El Helicóptero", level: 3, desc: "Giro sobre el cuerpo del otro. Difícil.", img: "helicopter.png" },
  { name: "De Pie", level: 3, desc: "Contra la pared o en el aire.", img: "standing.png" },
  { name: "La Araña", level: 3, desc: "Sentados, ella estilo cangrejo.", img: "spider.png" },
  { name: "69 de Pie", level: 3, desc: "Uno carga al otro invertido. ¡Cuidado!", img: "standing_69.png" }
];

const CARDS_DB = [
  { type: 'truth', text: '¿Qué fue lo primero que te gustó de mí?', level: 1 },
  { type: 'truth', text: '¿Cuál es tu lugar favorito para que te besen?', level: 1 },
  { type: 'dare', text: 'Dame un masaje en los hombros por 1 min.', level: 1 },
  { type: 'dare', text: 'Bésame en la mejilla por 5 segundos.', level: 1 },
  { type: 'truth', text: '¿Qué ropa interior te excita más?', level: 2 },
  { type: 'truth', text: '¿Cuál es tu fantasía recurrente?', level: 2 },
  { type: 'dare', text: 'Quítate una prenda (no ropa interior).', level: 2 },
  { type: 'dare', text: 'Bésame el cuello apasionadamente.', level: 2 },
  { type: 'dare', text: 'Hazme un baile sexy con ropa.', level: 2 },
  { type: 'truth', text: '¿Te gustaría grabarnos haciéndolo?', level: 3 },
  { type: 'truth', text: '¿Has tenido un trío o te gustaría?', level: 3 },
  { type: 'dare', text: 'Quítate la ropa interior y dámela.', level: 3 },
  { type: 'dare', text: 'Usa mi mano para tocarte.', level: 3 },
  { type: 'dare', text: 'Sexo oral por 2 minutos.', level: 3 },
  { type: 'dare', text: 'Véndate los ojos y déjate hacer.', level: 3 }
];

const ROULETTE_DB = [
  { text: "Bebe un trago.", level: 1 },
  { text: "Beso de 5 segundos.", level: 1 },
  { text: "Cuenta un chiste o bebe.", level: 1 },
  { text: "Quítate una prenda.", level: 2 },
  { text: "Nalgada.", level: 2 },
  { text: "Beso con lengua.", level: 2 },
  { text: "Muestra tu última foto.", level: 2 },
  { text: "Shot doble.", level: 3 },
  { text: "Ropa interior fuera.", level: 3 },
  { text: "Oral 1 minuto.", level: 3 },
  { text: "Deja que te aten las manos.", level: 3 }
];

const NEVER_DATA = [
  { text: "Yo nunca he tenido sexo en el coche.", level: 1 },
  { text: "Yo nunca he besado a un amigo.", level: 1 },
  { text: "Yo nunca he tenido sexo en la playa.", level: 2 },
  { text: "Yo nunca he mandado un nude.", level: 2 },
  { text: "Yo nunca he hecho un trío.", level: 3 },
  { text: "Yo nunca he tenido sexo anal.", level: 3 },
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
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const HeatSelector = ({ currentLevel, setLevel }) => (
  <div className="flex justify-between bg-gray-900/80 p-2 rounded-2xl mb-6 border border-gray-700 gap-2">
    {HEAT_LEVELS.map((h) => (
      <button
        key={h.level}
        onClick={() => setLevel(h.level)}
        className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${currentLevel === h.level ? 'bg-gray-800 border border-gray-600 shadow-lg scale-105' : 'opacity-50 hover:opacity-80'}`}
      >
        <span className="text-xl mb-1">{h.icon}</span>
        <span className={`text-[10px] font-bold uppercase ${h.color}`}>{h.label}</span>
      </button>
    ))}
  </div>
);

const CardItem = ({ label, desc, icon: Icon, onClick, color, bg }) => (
  <div onClick={onClick} className={`relative overflow-hidden cursor-pointer group p-4 rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 active:scale-95 select-none`}>
    <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${bg}`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-100 mt-2">{label}</h3>
    <p className="text-sm text-gray-400 mt-1">{desc}</p>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [heatLevel, setHeatLevel] = useState(1); // 1, 2, 3, or 'all'
  
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

  // Ruleta & Timer
  const [rouletteChambers, setRouletteChambers] = useState([]); 
  const [currentChamberIdx, setCurrentChamberIdx] = useState(0);
  const [rouletteStatus, setRouletteStatus] = useState('ready'); 
  const [punishment, setPunishment] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Audio
  const playSound = (type) => {
    if (navigator.vibrate) {
       if (type === 'bang') navigator.vibrate([500, 200, 500]);
       else if (type === 'click') navigator.vibrate(50);
    }
  };

  useEffect(() => {
    let interval = null;
    if (screen === 'play-timer' && isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (screen === 'play-timer' && isTimerActive && timer === 0) {
      playSound('bang'); drawPosition(); setTimer(60); 
    }
    return () => clearInterval(interval);
  }, [screen, isTimerActive, timer]);

  const handleAudienceSelect = (audience) => { setSelectedAudience(audience); setScreen('games'); };
  
  const handleGameSelect = (gameId) => {
    setRouletteStatus('ready'); setPunishment(""); setCurrentCard(null); setCurrentPos(null); setNeverText("Toca para empezar"); setIsTimerActive(false); setTimer(60);
    
    // FILTRADO DE CONTENIDO
    const filterContent = (data) => {
        if (heatLevel === 'all') return data;
        return data.filter(item => item.level <= heatLevel);
    };

    if (gameId === 'cards') {
        setCardDeck(shuffleArray(filterContent(CARDS_DB)));
    } else if (gameId === 'kama' || gameId === 'timer') {
        setKamaDeck(shuffleArray(filterContent(KAMA_POSITIONS)));
    } else if (gameId === 'never') {
        setNeverDeck(shuffleArray(filterContent(NEVER_DATA)));
    }
    
    setScreen(`play-${gameId}`);
  };

  const goBack = () => { setIsTimerActive(false); if (screen.startsWith('play-')) setScreen('games'); else if (screen === 'games') setScreen('audience'); else if (screen === 'audience') setScreen('home'); };

  // Mecánicas
  const rollDice = () => {
    if (isRolling) return; setIsRolling(true); playSound('click');
    
    let actions, parts;
    if (heatLevel === 'all') {
        actions = DICE_ACTIONS;
        parts = DICE_BODYPARTS;
    } else {
        actions = DICE_ACTIONS.filter(d => d.level <= heatLevel);
        parts = DICE_BODYPARTS.filter(d => d.level <= heatLevel);
    }
    
    let counter = 0;
    const interval = setInterval(() => {
      setDice1(actions[Math.floor(Math.random() * actions.length)].text.toUpperCase());
      setDice2(parts[Math.floor(Math.random() * parts.length)].text.toUpperCase());
      counter++;
      if (counter > 12) { clearInterval(interval); setIsRolling(false); playSound('click'); }
    }, 80);
  };

  const drawCard = () => {
    let currentDeck = [...cardDeck];
    if (currentDeck.length === 0) { 
        const data = heatLevel === 'all' ? CARDS_DB : CARDS_DB.filter(c => c.level <= heatLevel);
        currentDeck = shuffleArray(data); 
    }
    const card = currentDeck.pop(); setCardDeck(currentDeck); setCurrentCard(card);
  };

  const drawPosition = () => {
    let currentDeck = [...kamaDeck];
    if (currentDeck.length === 0) {
        const data = heatLevel === 'all' ? KAMA_POSITIONS : KAMA_POSITIONS.filter(p => p.level <= heatLevel);
        currentDeck = shuffleArray(data);
    }
    const pos = currentDeck.pop(); setKamaDeck(currentDeck); setCurrentPos(pos);
  };

  const nextNever = () => {
    let currentDeck = [...neverDeck];
    if (currentDeck.length === 0) {
        const data = heatLevel === 'all' ? NEVER_DATA : NEVER_DATA.filter(n => n.level <= heatLevel);
        currentDeck = shuffleArray(data);
    }
    const item = currentDeck.pop(); setNeverDeck(currentDeck); setNeverText(item.text);
  };

  const spinRoulette = () => {
    setRouletteStatus('spinning'); setPunishment(""); playSound('click');
    let chambers = ['BULLET', 'RISK', 'RISK', 'RISK', 'LUCKY', 'LUCKY'];
    setRouletteChambers(shuffleArray(chambers)); setCurrentChamberIdx(0);
    setTimeout(() => setRouletteStatus('active'), 1000);
  };

  const pullTrigger = () => {
    if (rouletteStatus !== 'active') return;
    const result = rouletteChambers[currentChamberIdx];
    if (result === 'BULLET') {
        playSound('bang'); setRouletteStatus('dead');
        let deaths;
        if (heatLevel === 'all') {
            deaths = ROULETTE_DB;
        } else {
            deaths = ROULETTE_DB.filter(r => r.level === heatLevel);
            if (deaths.length === 0) deaths = ROULETTE_DB.filter(r => r.level <= heatLevel);
        }
        setPunishment(deaths[Math.floor(Math.random() * deaths.length)]?.text || "Bebe todo el vaso.");
    } else if (result === 'RISK') {
        playSound('click'); setRouletteStatus('risk');
        setPunishment("¡Casi! Quítate una prenda pequeña o bebe.");
        prepareNextTurn();
    } else {
        playSound('click'); setRouletteStatus('safe');
        setPunishment("¡Click! Estás a salvo.");
        prepareNextTurn();
    }
  };
  const prepareNextTurn = () => { if (currentChamberIdx < 5) setTimeout(() => { setRouletteStatus('active'); setCurrentChamberIdx(p => p+1); setPunishment(""); }, 2000); else setTimeout(() => setRouletteStatus('ready'), 2000); };

  // --- RENDERS DE PANTALLAS ---
  const renderHome = () => (
    <div className="flex flex-col h-full justify-between pt-12 pb-6 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative inline-block"><div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 rounded-full animate-pulse"></div><Flame className="w-28 h-28 text-red-500 relative z-10 mx-auto" fill="currentColor" /></div>
        <div><h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">INTIMOUS</h1><p className="text-gray-400 text-sm font-medium tracking-widest mt-2 uppercase opacity-80">Intimidad & Anonimato</p></div>
      </div>
      <div className="space-y-6 px-8"><Button onClick={() => setScreen('audience')}><Play fill="currentColor" className="w-5 h-5" /> ENTRAR AL JUEGO</Button><div className="text-[10px] text-center text-gray-600 font-mono">v12.1 • COLORES ORIGINALES<br/><span className="opacity-50">by JTA</span></div></div>
    </div>
  );

  const renderAudience = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 pb-2"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-2xl font-bold text-white tracking-tight">Selecciona Vínculo</h2></div>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 gap-4 pb-20">{AUDIENCES.map((aud) => (<CardItem key={aud.id} {...aud} onClick={() => handleAudienceSelect(aud)} />))}</div>
    </div>
  );

  const renderGames = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 border-b border-gray-800/50"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><div className="ml-4"><h2 className="text-xl font-bold text-white">Elige el Caos</h2><div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}><selectedAudience.icon size={10} />{selectedAudience.label}</div></div></div>
      <div className="px-4 pt-4 pb-0"><div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider ml-1">Nivel de Intensidad</div><HeatSelector currentLevel={heatLevel} setLevel={setHeatLevel} /></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-0">{GAMES.map((game) => (<div key={game.id} onClick={() => handleGameSelect(game.id)} className="flex items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all active:scale-95 select-none shadow-lg"><div className="p-4 bg-gray-950 rounded-xl mr-5 text-pink-500 shadow-inner"><game.icon size={32} /></div><div><h3 className="font-bold text-lg text-white">{game.label}</h3><p className="text-sm text-gray-400">{game.desc}</p></div></div>))}</div>
    </div>
  );

  const renderDiceGame = () => (
    <div className="flex flex-col h-full bg-black/40 animate-fade-in relative">
      <div className="flex items-center p-4 absolute top-0 w-full z-10"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full backdrop-blur-md"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white drop-shadow-md">Dados Calientes</h2></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8"><div className="w-full space-y-6 perspective-1000"><div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-900 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice1}</div><div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em]">EN</div><div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-900 shadow-[0_0_40px_rgba(234,88,12,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice2}</div></div></div>
      <div className="p-6 pb-12"><Button onClick={rollDice} variant="primary">{isRolling ? '🎲 ...' : 'LANZAR'}</Button></div>
    </div>
  );

  const renderCardGame = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Verdad o Reto</h2></div>
      <div className="flex-1 flex items-center justify-center p-6">{!currentCard ? (<div onClick={drawCard} className="w-full h-96 bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors active:scale-95"><Zap className="text-gray-600 w-20 h-20 mb-6" /><p className="text-gray-400 font-bold text-xl">Sacar Carta</p><span className="text-xs text-gray-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel}</span></div>) : (<div className="w-full h-[450px] relative animate-flip-in"><div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}><span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">{currentCard.type === 'truth' ? 'VERDAD' : 'RETO'}</span><h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">{currentCard.text}</h3><button onClick={drawCard} className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">SIGUIENTE</button></div></div>)}</div>
    </div>
  );

  const renderKamaGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-purple-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Kamasutra</h2></div>
      <div className="flex-1 flex items-center justify-center p-6">{!currentPos ? (<div onClick={drawPosition} className="w-full h-96 bg-purple-900/20 rounded-3xl border-2 border-dashed border-purple-500/50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/30 transition-colors active:scale-95"><Layers className="text-purple-400 w-20 h-20 mb-6" /><p className="text-purple-200 font-bold text-xl">Sugerir Posición</p><span className="text-xs text-purple-400 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel} • {kamaDeck.length} restantes</span></div>) : (<div className="w-full h-[450px] relative animate-flip-in"><div className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="flex gap-1 mb-4">{[...Array(currentPos.level)].map((_, i) => (<Flame key={i} className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />))}</div>
      
      {/* IMAGEN SIN INVERTIR */}
      <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-purple-500/30 shadow-inner">
         <img src={`/${currentPos.img}`} onError={(e) => e.target.style.display='none'} alt={currentPos.name} className="w-full h-full object-contain p-2 opacity-90" />
         <ImageIcon className="text-purple-500/50 w-16 h-16 absolute -z-10" />
      </div>

      <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-purple-200 text-lg leading-relaxed">{currentPos.desc}</p><button onClick={drawPosition} className="mt-auto w-full py-3 bg-white/10 backdrop-blur-md rounded-xl text-white font-bold hover:bg-white/20 border border-white/10 transition-all">SIGUIENTE</button></div></div>)}</div>
    </div>
  );

  const renderTimerGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-emerald-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Rally</h2></div>
      <div className="flex-1 flex flex-col items-center justify-start p-6 pt-2">
        <div className="w-full flex items-center justify-between mb-4 bg-gray-900/50 p-4 rounded-2xl"><div className="flex items-center gap-2"><Timer className="text-emerald-400 w-6 h-6" /><span className={`text-3xl font-mono font-black ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timer}s</span></div></div>
        <div className="w-full flex-1 flex items-center justify-center relative">{!currentPos ? (<div onClick={() => {if(!isTimerActive) drawPosition(); setIsTimerActive(!isTimerActive)}} className="w-full h-full bg-emerald-900/10 rounded-3xl border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-900/20 transition-all"><Play className="text-emerald-500 w-20 h-20 mb-4 ml-2" /><p className="text-emerald-200 font-bold text-xl">INICIAR RALLY</p><span className="text-xs text-emerald-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel}</span></div>) : (<div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-emerald-900 to-teal-900 animate-flip-in relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-2 bg-emerald-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer/60)*100}%` }}></div>
        
        {/* IMAGEN SIN INVERTIR */}
        {currentPos.img ? (<img src={currentPos.img} alt={currentPos.name} className="w-40 h-40 object-contain mb-4 opacity-90" />) : null}
        
        <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-emerald-100 text-lg leading-relaxed">{currentPos.desc}</p></div>)}</div>
      </div>
      <div className="p-6 pb-10 flex gap-4"><Button onClick={() => setIsTimerActive(!isTimerActive)} variant={isTimerActive ? "secondary" : "green"}>{isTimerActive ? "PAUSAR" : "CONTINUAR"}</Button><button onClick={() => {drawPosition(); setTimer(60)}} className="bg-gray-800 p-4 rounded-2xl text-white border border-gray-700 hover:bg-gray-700"><RotateCcw className="w-6 h-6" /></button></div>
    </div>
  );

  const renderNeverGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-blue-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Yo Nunca</h2></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6"><div className="w-full h-80 bg-gradient-to-b from-blue-800 to-blue-950 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><Beer className="w-12 h-12 text-blue-400 mb-6 opacity-80" /><h3 className="text-2xl font-bold text-white leading-relaxed">"{neverText}"</h3></div><p className="text-gray-400 text-sm text-center px-8">Si lo has hecho, <span className="text-blue-400 font-bold">cumple la penitencia</span> (beber o prenda).</p></div>
      <div className="p-6 pb-10"><Button onClick={nextNever} className="bg-blue-600 hover:bg-blue-700 border-blue-400">SIGUIENTE</Button></div>
    </div>
  );

  const renderRoulette = () => (
    <div className="flex flex-col h-full animate-fade-in bg-red-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Ruleta</h2></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative"><div className="relative w-64 h-64 mb-6"><div className={`w-full h-full rounded-full border-8 border-gray-800 flex items-center justify-center relative transition-transform duration-1000 ${rouletteStatus === 'spinning' ? 'rotate-[720deg]' : ''}`}>{[0, 60, 120, 180, 240, 300].map((deg, index) => (<div key={index} className={`absolute w-10 h-10 rounded-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[50%_120px] border-2 border-gray-700 ${index === currentChamberIdx && rouletteStatus !== 'spinning' ? 'bg-yellow-500 shadow-[0_0_20px_yellow] border-yellow-300' : 'bg-gray-900'}`} style={{ transform: `rotate(${deg}deg) translate(0, -110px)` }}></div>))}<div className="absolute w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-inner">{rouletteStatus === 'dead' ? <Skull className="text-red-500 w-12 h-12 animate-bounce"/> : <Bomb className="text-gray-600 w-10 h-10"/>}</div></div></div><div className="h-36 flex items-center justify-center text-center px-4 w-full bg-black/20 rounded-xl border border-white/5">{rouletteStatus === 'ready' && <p className="text-gray-400">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel} de Peligro.</p>}{rouletteStatus === 'spinning' && <p className="text-yellow-500 font-bold animate-pulse text-xl">GIRANDO...</p>}{rouletteStatus === 'active' && <p className="text-white font-bold text-lg animate-pulse">Tu turno.</p>}{rouletteStatus === 'safe' && <p className="text-green-400 font-bold text-xl">{punishment}</p>}{rouletteStatus === 'risk' && <p className="text-orange-400 font-bold text-xl">{punishment}</p>}{rouletteStatus === 'dead' && (<div className="animate-bounce"><p className="text-red-600 font-black text-4xl mb-2">¡BANG!</p><p className="text-white text-md bg-red-900/50 p-2 rounded-lg border border-red-500">{punishment}</p></div>)}</div></div>
      <div className="p-6 pb-10 space-y-4">{rouletteStatus === 'ready' || rouletteStatus === 'dead' ? (<Button onClick={spinRoulette} variant="secondary">GIRAR CILINDRO</Button>) : (<Button onClick={pullTrigger} disabled={rouletteStatus !== 'active'} variant="danger">APRETAR GATILLO</Button>)}</div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="w-full h-screen bg-black text-slate-200 font-sans overflow-hidden flex justify-center selection:bg-pink-500/30">
      <div className="w-full max-w-md h-full bg-[#0a0a0a] relative flex flex-col shadow-2xl border-x border-gray-900">
        {screen === 'home' && renderHome()}
        {screen === 'audience' && renderAudience()}
        {screen === 'games' && renderGames()}
        {screen === 'play-dice' && renderDiceGame()}
        {screen === 'play-cards' && renderCardGame()}
        {screen === 'play-kama' && renderKamaGame()}
        {screen === 'play-timer' && renderTimerGame()}
        {screen === 'play-never' && renderNeverGame()}
        {screen === 'play-roulette' && renderRoulette()}
      </div>
      <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.4s ease-out forwards; } @keyframes flip-in { from { transform: rotateY(90deg) scale(0.9); opacity: 0; } to { transform: rotateY(0) scale(1); opacity: 1; } } .animate-flip-in { animation: flip-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); } .perspective-1000 { perspective: 1000px; } .rotate-x-12 { transform: rotateX(12deg); } .-rotate-x-12 { transform: rotateX(-12deg); }`}</style>
    </div>
  );
}