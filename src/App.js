import React, { useState, useEffect, useRef } from 'react';
import { Dice5, Flame, Heart, Users, ArrowLeft, Zap, Moon, Sun, Shuffle, Play, AlertTriangle, Skull, Beer, Trophy, Bomb, Layers, Timer, Pause, RotateCcw, ShieldCheck, Plus } from 'lucide-react';

// --- CONFIGURACIÓN DE AUDIENCIAS ---

const AUDIENCES = [
  { id: 'couple', label: 'Pareja Estable', icon: Heart, desc: 'Reavivar la llama y fantasías', color: 'text-rose-500', bg: 'bg-rose-500/20' },
  { id: 'friends', label: 'Amigos / Fiesta', icon: Beer, desc: 'Descontrol y risas (Grupal)', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'date', label: 'Primera Cita', icon: Moon, desc: 'Tensión y romper el hielo', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'ons', label: 'Una Noche', icon: Flame, desc: 'Directo al grano, sin charla', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { id: 'fwb', label: 'Amigos con Derechos', icon: Zap, desc: 'Experimentar sin límites', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'ex', label: 'Ex Pareja', icon: Skull, desc: 'Rencor y nostalgia', color: 'text-gray-400', bg: 'bg-gray-500/20' },
];

const GAMES = [
  { id: 'dice', label: 'Dados Calientes', desc: 'El azar decide tu destino.', icon: Dice5, type: 'action' },
  { id: 'cards', label: 'Verdad o Reto', desc: 'Confesiones o castigos.', icon: Zap, type: 'social' },
  { id: 'kama', label: 'Kamasutra', desc: 'Manual de posiciones (+30).', icon: Layers, type: 'action' },
  { id: 'timer', label: 'Rally Cronometrado', desc: 'Cambio de posición automático con alarma.', icon: Timer, type: 'action' },
  { id: 'never', label: 'Yo Nunca, Nunca', desc: 'Bebe o quítate prenda.', icon: Beer, type: 'social' },
  { id: 'roulette', label: 'Ruleta del Caos', desc: 'Balas, riesgos y suerte. Nadie se salva.', icon: Bomb, type: 'risk' },
];

// --- BASE DE DATOS DE CONTENIDO ---

const DICE_ACTIONS = [
  'Lamer', 'Morder', 'Chupar', 'Soplar', 'Masajear', 'Apretar', 'Azotar', 'Acariciar con lengua',
  'Pellizcar suavemente', 'Besar apasionadamente', 'Rozar con la nariz', 'Hacer cosquillas', 'Susurrar cochinadas', 'Rasguñar suave'
];
const DICE_BODYPARTS = [
  'Cuello', 'Pezones', 'Lóbulo Oreja', 'Muslos Int.', 'Zona Íntima', 'Nalgas', 'Abdomen', 'Dedos',
  'Espalda baja', 'Ombligo', 'Tobillos', 'Muñecas', 'Detrás de rodilla', 'Clavícula'
];

// KAMA_DATA (Resumido para ahorrar espacio visual, mantiene lógica completa)
const KAMA_DATA = {
  soft: [
    { name: "La Cucharita", diff: 1, desc: "De lado, pegados espalda con pecho. Intimidad máxima." },
    { name: "El Loto", diff: 2, desc: "Sentados frente a frente, piernas entrelazadas." },
    { name: "Misionero Profundo", diff: 1, desc: "El clásico, pero ella sube las piernas a los hombros." },
    { name: "El Perrito (Doggy)", diff: 1, desc: "Un clásico infalible." },
    { name: "La Silla", diff: 2, desc: "Él sentado, ella encima frente a frente." },
    { name: "La Fusión", diff: 1, desc: "Acostados boca arriba, ella sobre él, piernas entrelazadas." },
    { name: "El 69 Lateral", diff: 2, desc: "Acostados de lado, cabeza con genitales." },
    { name: "La 'X'", diff: 1, desc: "Ambos acostados formando una X." },
    { name: "La Medusa", diff: 1, desc: "Sentados mirándose, contacto visual constante." }
  ],
  hard: [
    { name: "El Yunque", diff: 3, desc: "Ella levanta la pelvis, piernas hacia atrás sobre la cabeza." },
    { name: "La Carretilla", diff: 3, desc: "De pie, él sostiene las piernas de ella." },
    { name: "La Amazonia", diff: 2, desc: "Ella arriba, de espaldas, rodillas flexionadas." },
    { name: "El 69 de Pie", diff: 4, desc: "Solo para fuertes. Uno carga al otro invertido." },
    { name: "La Araña", diff: 3, desc: "Sentados, ella se apoya en manos y pies (cangrejo)." },
    { name: "El Helicóptero", diff: 4, desc: "Ella gira sobre él mientras él está acostado." },
    { name: "El Puente", diff: 3, desc: "Ella hace un arco con la espalda." }
  ]
};

// ROULETTE DEATHS (Castigos Extremos - BALA)
const ROULETTE_DEATHS = {
  couple: [ "Quítate la ropa interior.", "Véndate los ojos 5 turnos.", "Baila erótico 30s.", "Usa un juguete.", "Masaje 2 min.", "Foto picante ahora.", "Deja que te aten las manos.", "Oral por 3 minutos.", "Hielo en la espalda.", "Nalgada fuerte." ],
  friends: [ "Shot doble.", "Intercambia prenda.", "Leer último chat.", "Beso de tres.", "Quítate dos prendas.", "Lame cuello izquierda.", "Haz un gemido fuerte.", "Baila perreo solo/a.", "Deja que te escriban en la frente.", "Bebe del vaso de todos." ],
  default: [ "Quítate una prenda.", "Bebe un shot.", "Beso con lengua.", "Muestra ropa interior.", "Gemir alto.", "Nalgada." ]
};

// ROULETTE RISKS (Castigos Leves - CÁMARA SUCIA)
const ROULETTE_RISKS = [
  "¡Salvado! Pero bebe un trago.",
  "Casi... Da un beso en la mejilla a tu derecha.",
  "Uff... Quítate un zapato o accesorio.",
  "Seguro... Pero confiesa tu última mentira.",
  "Sin bala... Pero tienes que gemir.",
  "Click... Haz 5 sentadillas.",
  "Vivo... Pero deja que te huelan el cuello.",
  "Suerte... Manda un sticker raro al grupo."
];

// ROULETTE LUCKY (Suerte Total - CÁMARA VACÍA)
const ROULETTE_LUCKY = [
  "¡CLICK! Vacío total. Estás a salvo.",
  "¡Suerte pura! Elige quién bebe.",
  "¡Salvado! Ganas inmunidad por 1 turno.",
  "¡Click! Nada pasó. Respira.",
  "¡Limpio! Puedes saltar tu próximo turno."
];

const NEVER_DATA = {
  default: [ "Yo nunca he tenido sexo en coche.", "Yo nunca he usado comida.", "Yo nunca he sido pillado.", "Yo nunca he tenido sexo anal.", "Yo nunca he tenido sexo en la playa.", "Yo nunca he tenido cibersexo." ]
};

const CARDS_DATA = {
  default: [ { type: 'truth', text: '¿Lugar más extraño?' }, { type: 'dare', text: 'Muestra última foto.' }, { type: 'dare', text: 'Gemir fingiendo.' } ]
};

// --- COMPONENTES UI ---

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white border border-red-400/30",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
    danger: "bg-gradient-to-r from-red-900 to-red-600 text-white border border-red-500",
    purple: "bg-gradient-to-r from-purple-900 to-indigo-600 text-white border border-purple-500",
    green: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const CardItem = ({ label, desc, icon: Icon, onClick, color, bg }) => (
  <div onClick={onClick} className={`relative overflow-hidden cursor-pointer group p-4 rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 active:scale-95 select-none`}>
    <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${bg}`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-100 mt-2">{label}</h3>
    <p className="text-sm text-gray-400 mt-1">{desc}</p>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [selectedAudience, setSelectedAudience] = useState(null);
  
  // Estados Generales
  const [dice1, setDice1] = useState('?');
  const [dice2, setDice2] = useState('?');
  const [isRolling, setIsRolling] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [neverText, setNeverText] = useState("Toca para empezar");
  const [currentPos, setCurrentPos] = useState(null);

  // Estados Ruleta
  const [rouletteChambers, setRouletteChambers] = useState([]); // Array con el contenido de las balas
  const [currentChamberIdx, setCurrentChamberIdx] = useState(0);
  const [rouletteStatus, setRouletteStatus] = useState('ready'); // ready, spinning, active, dead, risk, safe
  const [punishment, setPunishment] = useState("");
  const [doubleBullet, setDoubleBullet] = useState(false);

  // Estados Timer (Rally)
  const [timer, setTimer] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // --- AUDIO HELPER ---
  const playSound = (type) => {
    if (navigator.vibrate) {
        if (type === 'bang') navigator.vibrate([500, 200, 500]); // Vibración fuerte
        else if (type === 'click') navigator.vibrate(50); // Vibración corta
        else if (type === 'spin') navigator.vibrate(200);
    }
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === 'bang') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } else if (type === 'click') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }
      }
    } catch (e) {}
  };

  // --- LOGICA RALLY ---
  useEffect(() => {
    let interval = null;
    if (screen === 'play-timer' && isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (screen === 'play-timer' && isTimerActive && timer === 0) {
      playSound('bang'); // Usar sonido bang como alarma
      drawPosition(); 
      setTimer(selectedTime); 
    }
    return () => clearInterval(interval);
  }, [screen, isTimerActive, timer, selectedTime]);

  // --- HANDLERS ---

  const handleAudienceSelect = (audience) => {
    setSelectedAudience(audience);
    setScreen('games');
  };

  const handleGameSelect = (gameId) => {
    setRouletteStatus('ready');
    setPunishment("");
    setCurrentCard(null);
    setCurrentPos(null);
    setNeverText("Toca para empezar");
    setIsTimerActive(false);
    setTimer(60);
    
    setScreen(`play-${gameId}`);
  };

  const goBack = () => {
    setIsTimerActive(false);
    if (screen.startsWith('play-')) setScreen('games');
    else if (screen === 'games') setScreen('audience');
    else if (screen === 'audience') setScreen('home');
  };

  // Funciones Básicas
  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    playSound('click');
    let counter = 0;
    const interval = setInterval(() => {
      setDice1(DICE_ACTIONS[Math.floor(Math.random() * DICE_ACTIONS.length)]);
      setDice2(DICE_BODYPARTS[Math.floor(Math.random() * DICE_BODYPARTS.length)]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setIsRolling(false);
        playSound('click');
      }
    }, 80);
  };

  const drawCard = () => {
    const deck = CARDS_DATA[selectedAudience?.id] || CARDS_DATA.default;
    setCurrentCard(deck[Math.floor(Math.random() * deck.length)]);
  };

  const drawPosition = () => {
    let deck = (['couple', 'fwb', 'ons'].includes(selectedAudience?.id)) ? [...KAMA_DATA.soft, ...KAMA_DATA.hard] : KAMA_DATA.soft;
    setCurrentPos(deck[Math.floor(Math.random() * deck.length)]);
  };

  const nextNever = () => {
    const deck = NEVER_DATA[selectedAudience?.id] || NEVER_DATA.default;
    setNeverText(deck[Math.floor(Math.random() * deck.length)]);
  };

  // --- LÓGICA DE RULETA AVANZADA ---
  const spinRoulette = () => {
    setRouletteStatus('spinning');
    setPunishment("");
    playSound('spin');
    
    // Generar contenido de las 6 cámaras
    // Por defecto: 1 Bala, 3 Riesgos, 2 Suertes
    let chambers = ['BULLET', 'RISK', 'RISK', 'RISK', 'LUCKY', 'LUCKY'];
    
    // Si activaron Doble Bala: 2 Balas, 2 Riesgos, 2 Suertes
    if (doubleBullet) chambers = ['BULLET', 'BULLET', 'RISK', 'RISK', 'LUCKY', 'LUCKY'];

    // Mezclar el array (Fisher-Yates shuffle simplificado)
    for (let i = chambers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chambers[i], chambers[j]] = [chambers[j], chambers[i]];
    }

    setRouletteChambers(chambers);
    setCurrentChamberIdx(0);

    setTimeout(() => setRouletteStatus('active'), 1000);
  };

  const pullTrigger = () => {
    if (rouletteStatus !== 'active') return;

    const currentResult = rouletteChambers[currentChamberIdx];

    if (currentResult === 'BULLET') {
      // MUERTE
      playSound('bang');
      setRouletteStatus('dead');
      const deaths = ROULETTE_DEATHS[selectedAudience?.id] || ROULETTE_DEATHS.default;
      setPunishment(deaths[Math.floor(Math.random() * deaths.length)]);
    } else if (currentResult === 'RISK') {
      // RIESGO (Cámara Sucia)
      playSound('click'); // Sonido normal pero...
      setRouletteStatus('risk');
      setPunishment(ROULETTE_RISKS[Math.floor(Math.random() * ROULETTE_RISKS.length)]);
      prepareNextTurn();
    } else {
      // SUERTE (Cámara Vacía)
      playSound('click');
      setRouletteStatus('safe');
      setPunishment(ROULETTE_LUCKY[Math.floor(Math.random() * ROULETTE_LUCKY.length)]);
      prepareNextTurn();
    }
  };

  const prepareNextTurn = () => {
    if (currentChamberIdx < 5) {
        setTimeout(() => {
            setRouletteStatus('active');
            setCurrentChamberIdx(prev => prev + 1);
            setPunishment(""); // Limpiar mensaje para el siguiente
        }, 2500); // Tiempo para leer el mensaje
    } else {
        // Se acabaron las balas
        setTimeout(() => setRouletteStatus('ready'), 2500);
    }
  };

  // Timer Helpers
  const toggleTimer = () => {
    if (!currentPos && !isTimerActive) drawPosition();
    setIsTimerActive(!isTimerActive);
  };
  const manualTimerChange = () => {
    drawPosition();
    setTimer(selectedTime);
  };
  const changeTime = () => {
    setIsTimerActive(false);
    const times = [30, 60, 90, 120];
    const nextTime = times[(times.indexOf(selectedTime) + 1) % times.length];
    setSelectedTime(nextTime);
    setTimer(nextTime);
  };

  // --- RENDERS ---

  const renderHome = () => (
    <div className="flex flex-col h-full justify-between pt-12 pb-6 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 rounded-full animate-pulse"></div>
          <Flame className="w-28 h-28 text-red-500 relative z-10 mx-auto" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">INTIMOUS</h1>
          <p className="text-gray-400 text-sm font-medium tracking-widest mt-2 uppercase opacity-80">Intimidad & Anonimato</p>
        </div>
      </div>
      <div className="space-y-6 px-8">
        <Button onClick={() => setScreen('audience')}><Play fill="currentColor" className="w-5 h-5" /> ENTRAR AL JUEGO</Button>
        <div className="text-[10px] text-center text-gray-600 font-mono">v7.0 • +18 • DISCRECIÓN ASEGURADA</div>
      </div>
    </div>
  );

  const renderAudience = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 pb-2">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button>
        <h2 className="ml-4 text-2xl font-bold text-white tracking-tight">Selecciona Vínculo</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 gap-4 pb-20">
        {AUDIENCES.map((aud) => (<CardItem key={aud.id} {...aud} onClick={() => handleAudienceSelect(aud)} />))}
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 border-b border-gray-800/50">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-white">Elige el Caos</h2>
          <div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}>
            <selectedAudience.icon size={10} />{selectedAudience.label}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {GAMES.map((game) => (
          <div key={game.id} onClick={() => handleGameSelect(game.id)} className="flex items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all active:scale-95 select-none shadow-lg">
            <div className={`p-4 rounded-xl mr-5 shadow-inner ${game.type === 'risk' ? 'bg-red-900/20 text-red-500' : game.type === 'action' ? 'bg-purple-900/20 text-purple-400' : 'bg-gray-950 text-pink-500'}`}><game.icon size={32} /></div>
            <div><h3 className="font-bold text-lg text-white">{game.label}</h3><p className="text-sm text-gray-400">{game.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- RENDERS DE JUEGOS ---

  const renderDiceGame = () => (
    <div className="flex flex-col h-full bg-black/40 animate-fade-in relative">
      <div className="flex items-center p-4 absolute top-0 w-full z-10">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full backdrop-blur-md"><ArrowLeft className="text-white w-5 h-5" /></button>
        <h2 className="ml-4 text-xl font-bold text-white drop-shadow-md">Dados Calientes</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="w-full space-y-6 perspective-1000">
          <div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-900 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice1.toUpperCase()}</div>
          <div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em]">EN</div>
          <div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-900 shadow-[0_0_40px_rgba(234,88,12,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>{dice2.toUpperCase()}</div>
        </div>
      </div>
      <div className="p-6 pb-12"><Button onClick={rollDice} variant="primary">{isRolling ? '🎲 ...' : 'LANZAR'}</Button></div>
    </div>
  );

  const renderCardGame = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Verdad o Reto</h2></div>
      <div className="flex-1 flex items-center justify-center p-6">
        {!currentCard ? (
           <div onClick={drawCard} className="w-full h-96 bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors active:scale-95"><Zap className="text-gray-600 w-20 h-20 mb-6" /><p className="text-gray-400 font-bold text-xl">Sacar Carta</p></div>
        ) : (
          <div className="w-full h-[450px] relative animate-flip-in">
             <div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}>
               <span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">{currentCard.type === 'truth' ? 'VERDAD' : 'RETO'}</span>
               <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">{currentCard.text}</h3>
               <button onClick={drawCard} className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">SIGUIENTE</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderKamaGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-purple-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Kamasutra</h2></div>
      <div className="flex-1 flex items-center justify-center p-6">
        {!currentPos ? (
           <div onClick={drawPosition} className="w-full h-96 bg-purple-900/20 rounded-3xl border-2 border-dashed border-purple-500/50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/30 transition-colors active:scale-95"><Layers className="text-purple-400 w-20 h-20 mb-6" /><p className="text-purple-200 font-bold text-xl">Sugerir Posición</p></div>
        ) : (
          <div className="w-full h-[450px] relative animate-flip-in">
             <div className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-purple-900 to-indigo-900">
               <div className="flex gap-1 mb-6">{[...Array(currentPos.diff)].map((_, i) => (<Flame key={i} className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />))}</div>
               <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3>
               <p className="text-purple-200 text-lg leading-relaxed">{currentPos.desc}</p>
               <button onClick={drawPosition} className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">OTRA POSICIÓN</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTimerGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-emerald-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Rally (Tiempo)</h2></div>
      <div className="flex-1 flex flex-col items-center justify-start p-6 pt-2">
        <div className="w-full flex items-center justify-between mb-4 bg-gray-900/50 p-4 rounded-2xl">
           <div className="flex items-center gap-2">
              <Timer className="text-emerald-400 w-6 h-6" /><span className={`text-3xl font-mono font-black ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timer}s</span>
           </div>
           <button onClick={changeTime} className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-400 hover:text-white border border-gray-600">Cambiar: {selectedTime}s</button>
        </div>
        <div className="w-full flex-1 flex items-center justify-center relative">
            {!currentPos ? (
                <div onClick={toggleTimer} className="w-full h-full bg-emerald-900/10 rounded-3xl border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-900/20 transition-all"><Play className="text-emerald-500 w-20 h-20 mb-4 ml-2" /><p className="text-emerald-200 font-bold text-xl">INICIAR RALLY</p></div>
            ) : (
                <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-emerald-900 to-teal-900 animate-flip-in relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-2 bg-emerald-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer/selectedTime)*100}%` }}></div>
                    <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3>
                    <p className="text-emerald-100 text-lg leading-relaxed">{currentPos.desc}</p>
                    <div className="mt-8 flex gap-2">{[...Array(currentPos.diff)].map((_, i) => (<Flame key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />))}</div>
                </div>
            )}
        </div>
      </div>
      <div className="p-6 pb-10 flex gap-4">
        <Button onClick={toggleTimer} variant={isTimerActive ? "secondary" : "green"}>{isTimerActive ? <><Pause className="w-5 h-5"/> PAUSAR</> : <><Play className="w-5 h-5"/> {currentPos ? 'CONTINUAR' : 'INICIAR'}</>}</Button>
        <button onClick={manualTimerChange} className="bg-gray-800 p-4 rounded-2xl text-white border border-gray-700 hover:bg-gray-700"><RotateCcw className="w-6 h-6" /></button>
      </div>
    </div>
  );

  const renderNeverGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-blue-950/20">
      <div className="flex items-center p-4"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Yo Nunca</h2></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full h-80 bg-gradient-to-b from-blue-800 to-blue-950 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><Beer className="w-12 h-12 text-blue-400 mb-6 opacity-80" /><h3 className="text-2xl font-bold text-white leading-relaxed">"{neverText}"</h3></div>
          <p className="text-gray-400 text-sm text-center px-8">Si lo has hecho, <span className="text-blue-400 font-bold">cumple la penitencia</span> (beber o prenda).</p>
      </div>
      <div className="p-6 pb-10"><Button onClick={nextNever} className="bg-blue-600 hover:bg-blue-700 border-blue-400">SIGUIENTE FRASE</Button></div>
    </div>
  );

  const renderRoulette = () => (
    <div className="flex flex-col h-full animate-fade-in bg-red-950/20">
      <div className="flex items-center p-4 justify-between">
        <div className="flex items-center">
            <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button>
            <h2 className="ml-4 text-xl font-bold text-white">Ruleta del Caos</h2>
        </div>
        {rouletteStatus === 'ready' && (
            <button onClick={() => setDoubleBullet(!doubleBullet)} className={`px-3 py-1 rounded-full text-xs font-bold border ${doubleBullet ? 'bg-red-600 border-red-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}>
               {doubleBullet ? '2 BALAS 💀' : '1 BALA'}
            </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="relative w-64 h-64 mb-6">
            <div className={`w-full h-full rounded-full border-8 border-gray-800 flex items-center justify-center relative transition-transform duration-1000 ${rouletteStatus === 'spinning' ? 'rotate-[720deg]' : ''}`}>
               {/* Cámaras */}
               {[0, 60, 120, 180, 240, 300].map((deg, index) => (
                  <div key={index} className={`absolute w-10 h-10 rounded-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[50%_120px] border-2 border-gray-700
                    ${index === currentChamberIdx && rouletteStatus !== 'spinning' ? 'bg-yellow-500 shadow-[0_0_20px_yellow] border-yellow-300' : 'bg-gray-900'}
                    `} style={{ transform: `rotate(${deg}deg) translate(0, -110px)` }}>
                  </div>
               ))}
               {/* Centro */}
               <div className="absolute w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-inner">
                  {rouletteStatus === 'dead' ? <Skull className="text-red-500 w-12 h-12 animate-bounce"/> : <Bomb className="text-gray-600 w-10 h-10"/>}
               </div>
            </div>
        </div>

        <div className="h-36 flex items-center justify-center text-center px-4 w-full bg-black/20 rounded-xl border border-white/5">
            {rouletteStatus === 'ready' && <p className="text-gray-400">¿Te atreves? Gira el cilindro.</p>}
            {rouletteStatus === 'spinning' && <p className="text-yellow-500 font-bold animate-pulse text-xl">GIRANDO...</p>}
            {rouletteStatus === 'active' && <p className="text-white font-bold text-lg animate-pulse">Tu turno. Aprieta.</p>}
            
            {rouletteStatus === 'safe' && (
                <div>
                    <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2"/>
                    <p className="text-green-400 font-bold text-xl">¡SUERTE!</p>
                    <p className="text-white text-sm mt-1">{punishment}</p>
                </div>
            )}
            
            {rouletteStatus === 'risk' && (
                <div>
                    <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2"/>
                    <p className="text-orange-400 font-bold text-xl">CÁMARA SUCIA</p>
                    <p className="text-white text-sm mt-1">{punishment}</p>
                </div>
            )}

            {rouletteStatus === 'dead' && (
                <div className="animate-bounce">
                    <p className="text-red-600 font-black text-4xl mb-2">¡BANG!</p>
                    <p className="text-white text-md bg-red-900/50 p-2 rounded-lg border border-red-500">{punishment}</p>
                </div>
            )}
        </div>
      </div>

      <div className="p-6 pb-10 space-y-4">
        {rouletteStatus === 'ready' || rouletteStatus === 'dead' ? (
           <Button onClick={spinRoulette} variant="secondary">GIRAR CILINDRO</Button>
        ) : (
           <Button onClick={pullTrigger} disabled={rouletteStatus !== 'active'} variant="danger">APRETAR GATILLO</Button>
        )}
      </div>
    </div>
  );

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
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes flip-in { from { transform: rotateY(90deg) scale(0.9); opacity: 0; } to { transform: rotateY(0) scale(1); opacity: 1; } }
        .animate-flip-in { animation: flip-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .-rotate-x-12 { transform: rotateX(-12deg); }
      `}</style>
    </div>
  );
}