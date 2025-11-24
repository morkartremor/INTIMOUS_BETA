import React, { useState, useEffect } from 'react';
import { Dice5, Flame, Heart, Users, ArrowLeft, Zap, Moon, Sun, Shuffle, Play, AlertTriangle, Skull, Beer, Trophy, Bomb } from 'lucide-react';

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
  { id: 'never', label: 'Yo Nunca, Nunca', desc: 'Bebe o quítate prenda.', icon: Beer, type: 'social' },
  { id: 'roulette', label: 'Ruleta Rusa', desc: '1 bala. El perdedor paga caro.', icon: Bomb, type: 'risk' },
];

// --- BASE DE DATOS DE CONTENIDO PICANTE ---

const DICE_ACTIONS = ['Lamer', 'Morder', 'Chupar', 'Soplar', 'Masajear', 'Apretar', 'Azotar', 'Acariciar con lengua'];
const DICE_BODYPARTS = ['Cuello', 'Pezones', 'Lóbulo Oreja', 'Muslos Int.', 'Zona Íntima', 'Nalgas', 'Abdomen', 'Dedos'];

// Castigos de la Ruleta (Específicos por Audiencia)
const ROULETTE_DATA = {
  couple: [
    "Quítate la ropa interior y dásela a tu pareja.",
    "Permite que te venden los ojos por 5 turnos.",
    "Baila sin música de forma erótica por 30 segundos.",
    "Tu pareja elige un juguete o accesorio para usar ahora.",
    "Masaje de 2 minutos donde tu pareja elija.",
    "Envía una foto picante a tu pareja (ahora mismo)."
  ],
  friends: [
    "Shot doble de tequila.",
    "Intercambia una prenda con la persona de la derecha.",
    "Deja que el grupo lea tu último chat de WhatsApp.",
    "Beso de tres con dos personas que elija el grupo.",
    "Quítate dos prendas.",
    "Lame el cuello de la persona a tu izquierda."
  ],
  ex: [
    "Confiesa qué es lo que más extrañas del sexo con tu ex.",
    "Deja que tu ex te revise la galería de fotos por 1 minuto.",
    "Recrea el mejor beso que se dieron.",
    "Responde: ¿Te arrepientes de terminar?",
    "Quítate una prenda que a tu ex le gustaba.",
    "Permite un toqueteo de 10 segundos sin hacer nada."
  ],
  ons: [
    "Quítate todo lo de arriba.",
    "Quítate todo lo de abajo.",
    "Sexo oral por 1 minuto (o simulado).",
    "Posición 69 por el próximo turno.",
    "Besos con lengua en todo el cuerpo.",
    "Manos atadas (o agarradas) por 3 turnos."
  ],
  date: [
    "Beso apasionado de 10 segundos.",
    "Quítate la camisa/blusa.",
    "Deja que la otra persona te toque por debajo de la ropa.",
    "Confiesa tu mayor fetiche.",
    "Muerde el labio inferior de la otra persona.",
    "Masaje de cuello sensual."
  ],
  default: [
    "Quítate una prenda.",
    "Bebe un shot.",
    "Beso con lengua.",
    "Muestra tu ropa interior."
  ]
};

// Yo Nunca (Específico por Audiencia)
const NEVER_DATA = {
  couple: [
    "Yo nunca he fingido un orgasmo contigo.",
    "Yo nunca he deseado hacerlo en un lugar público contigo.",
    "Yo nunca he querido usar juguetes y no te he dicho.",
    "Yo nunca he tenido una fantasía con un amigo tuyo.",
    "Yo nunca he revisado tu celular a escondidas."
  ],
  ex: [
    "Yo nunca he stalkeado tus redes después de terminar.",
    "Yo nunca he tenido sexo de rebote pensando en ti.",
    "Yo nunca he hablado mal de ti con mis amigos.",
    "Yo nunca he guardado fotos nuestras desnudas.",
    "Yo nunca he deseado volver contigo solo por el sexo."
  ],
  friends: [
    "Yo nunca me he liado con alguien de este grupo.",
    "Yo nunca he tenido sexo en el baño de un bar.",
    "Yo nunca he mandado nudes a la persona equivocada.",
    "Yo nunca he sido infiel.",
    "Yo nunca he tenido un sueño húmedo con alguien presente."
  ],
  ons: [
    "Yo nunca he tenido una ETS.",
    "Yo nunca he hecho un trío.",
    "Yo nunca he usado esposas.",
    "Yo nunca me he grabado haciéndolo.",
    "Yo nunca he tragado."
  ],
  default: [
    "Yo nunca he tenido sexo en un coche.",
    "Yo nunca he usado comida en la cama.",
    "Yo nunca he sido pillado/a teniéndolo.",
    "Yo nunca he tenido sexo anal."
  ]
};

// Verdad o Reto (Específico por Audiencia)
const CARDS_DATA = {
  couple: [
    { type: 'truth', text: '¿Cuál es la fantasía más sucia que tienes conmigo y no has dicho?' },
    { type: 'dare', text: 'Véndame los ojos y hazme lo que quieras por 2 minutos.' },
    { type: 'dare', text: 'Usa un cubo de hielo en mi cuerpo hasta que se derrita.' },
    { type: 'truth', text: '¿Qué ropa interior mía te excita más?' },
    { type: 'dare', text: 'Sexo oral hasta que yo diga basta (mínimo 2 min).' },
  ],
  ex: [
    { type: 'truth', text: '¿En qué momento exacto supiste que esto se acabó?' },
    { type: 'truth', text: '¿Quién era mejor en la cama, yo o tu pareja anterior?' },
    { type: 'dare', text: 'Mirándonos a los ojos, dime algo que nunca me perdonaste.' },
    { type: 'dare', text: 'Vuelve a tocarme como lo hacías cuando estábamos bien.' },
    { type: 'truth', text: '¿Has fingido estar bien sin mí?' },
  ],
  date: [
    { type: 'truth', text: '¿Qué fue lo primero que pensaste al verme hoy?' },
    { type: 'dare', text: 'Pon mi mano en tu pierna y déjala ahí 5 minutos.' },
    { type: 'truth', text: '¿Besas en la primera cita o esperas?' },
    { type: 'dare', text: 'Susúrrame al oído qué te gustaría hacerme.' },
    { type: 'dare', text: 'Dame un beso en el cuello, sin usar las manos.' },
  ],
  ons: [
    { type: 'dare', text: 'Cállate y bésame.' },
    { type: 'dare', text: 'Quítame los pantalones sin usar las manos.' },
    { type: 'truth', text: '¿Te gusta rudo o suave?' },
    { type: 'dare', text: 'Ponte en la posición que más te guste ahora mismo.' },
    { type: 'truth', text: '¿Qué es lo que NO te gusta que te hagan?' },
  ],
  friends: [ // Solo aquí hay interacción externa
    { type: 'truth', text: '¿Con quién de aquí tendrías sexo si fuera el fin del mundo?' },
    { type: 'dare', text: 'Manda un mensaje a tu ex diciendo "Te extraño".' },
    { type: 'dare', text: 'Intercambia camiseta con la persona de tu derecha.' },
  ],
  default: [
    { type: 'truth', text: '¿Lugar más extraño donde lo has hecho?' },
    { type: 'dare', text: 'Muestra tu última foto de la galería.' },
    { type: 'dare', text: 'Gemir fingiendo placer.' }
  ]
};

// --- COMPONENTES UI ---

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white border border-red-400/30",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
    danger: "bg-gradient-to-r from-red-900 to-red-600 text-white border border-red-500"
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
  
  // Estados de Juegos
  const [dice1, setDice1] = useState('?');
  const [dice2, setDice2] = useState('?');
  const [isRolling, setIsRolling] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [neverText, setNeverText] = useState("Toca para empezar");
  
  // Estados Ruleta
  const [bulletPosition, setBulletPosition] = useState(0);
  const [currentChamber, setCurrentChamber] = useState(0);
  const [rouletteStatus, setRouletteStatus] = useState('ready');
  const [punishment, setPunishment] = useState("");

  const handleAudienceSelect = (audience) => {
    setSelectedAudience(audience);
    setScreen('games');
  };

  const handleGameSelect = (gameId) => {
    setRouletteStatus('ready');
    setPunishment("");
    setCurrentChamber(0);
    setCurrentCard(null);
    setNeverText("Toca para empezar");
    setScreen(`play-${gameId}`);
  };

  const goBack = () => {
    if (screen.startsWith('play-')) setScreen('games');
    else if (screen === 'games') setScreen('audience');
    else if (screen === 'audience') setScreen('home');
  };

  // --- LÓGICA DE JUEGOS ---

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    if (navigator.vibrate) navigator.vibrate(50);
    let counter = 0;
    const interval = setInterval(() => {
      setDice1(DICE_ACTIONS[Math.floor(Math.random() * DICE_ACTIONS.length)]);
      setDice2(DICE_BODYPARTS[Math.floor(Math.random() * DICE_BODYPARTS.length)]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setIsRolling(false);
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      }
    }, 80);
  };

  const drawCard = () => {
    // Selección inteligente de mazo
    const deck = CARDS_DATA[selectedAudience?.id] || CARDS_DATA.default;
    // Si es "Amigos con Derechos" (fwb), usamos una mezcla de ONS y Pareja
    let finalDeck = deck;
    if (selectedAudience?.id === 'fwb') finalDeck = [...CARDS_DATA.ons, ...CARDS_DATA.couple];

    const randomCard = finalDeck[Math.floor(Math.random() * finalDeck.length)];
    setCurrentCard(randomCard);
  };

  const nextNever = () => {
    const deck = NEVER_DATA[selectedAudience?.id] || NEVER_DATA.default;
    const text = deck[Math.floor(Math.random() * deck.length)];
    setNeverText(text);
  };

  const spinRoulette = () => {
    setRouletteStatus('spinning');
    setPunishment("");
    const bullet = Math.floor(Math.random() * 6);
    setBulletPosition(bullet);
    setCurrentChamber(0);
    setTimeout(() => setRouletteStatus('active'), 1000);
  };

  const pullTrigger = () => {
    if (rouletteStatus !== 'active') return;

    if (currentChamber === bulletPosition) {
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
      setRouletteStatus('dead');
      // Seleccionar castigo basado en la audiencia
      const punishments = ROULETTE_DATA[selectedAudience?.id] || ROULETTE_DATA.default;
      setPunishment(punishments[Math.floor(Math.random() * punishments.length)]);
    } else {
      if (navigator.vibrate) navigator.vibrate(50);
      setRouletteStatus('safe');
      setTimeout(() => {
        setRouletteStatus('active');
        setCurrentChamber(prev => prev + 1);
      }, 1500);
    }
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
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">
            INTIMOUS
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-widest mt-2 uppercase opacity-80">
            Intimidad & Anonimato
          </p>
        </div>
      </div>
      <div className="space-y-6 px-8">
        <Button onClick={() => setScreen('audience')}>
          <Play fill="currentColor" className="w-5 h-5" /> ENTRAR AL JUEGO
        </Button>
        <div className="text-[10px] text-center text-gray-600 font-mono">
          v3.0 • +18 • DISCRECIÓN ASEGURADA
        </div>
      </div>
    </div>
  );

  const renderAudience = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 pb-2">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h2 className="ml-4 text-2xl font-bold text-white tracking-tight">Selecciona Vínculo</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 gap-4 pb-20">
        {AUDIENCES.map((aud) => (
          <CardItem key={aud.id} {...aud} onClick={() => handleAudienceSelect(aud)} />
        ))}
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 border-b border-gray-800/50">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-white">Elige el Caos</h2>
          <div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}>
            <selectedAudience.icon size={10} />
            {selectedAudience.label}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {GAMES.map((game) => (
          <div key={game.id} onClick={() => handleGameSelect(game.id)} className="flex items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all active:scale-95 select-none shadow-lg">
            <div className={`p-4 rounded-xl mr-5 shadow-inner ${game.type === 'risk' ? 'bg-red-900/20 text-red-500' : 'bg-gray-950 text-pink-500'}`}>
              <game.icon size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{game.label}</h3>
              <p className="text-sm text-gray-400">{game.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiceGame = () => (
    <div className="flex flex-col h-full bg-black/40 animate-fade-in relative">
      <div className="flex items-center p-4 absolute top-0 w-full z-10">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full backdrop-blur-md">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h2 className="ml-4 text-xl font-bold text-white drop-shadow-md">Dados Calientes</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="w-full space-y-6 perspective-1000">
          <div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-900 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>
            {dice1.toUpperCase()}
          </div>
          <div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em]">EN</div>
          <div className={`h-32 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-900 shadow-[0_0_40px_rgba(234,88,12,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>
             {dice2.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="p-6 pb-12">
        <Button onClick={rollDice} variant="primary">
          {isRolling ? '🎲 ...' : 'LANZAR'}
        </Button>
      </div>
    </div>
  );

  const renderCardGame = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h2 className="ml-4 text-xl font-bold text-white">Verdad o Reto</h2>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        {!currentCard ? (
           <div onClick={drawCard} className="w-full h-96 bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors active:scale-95">
             <Zap className="text-gray-600 w-20 h-20 mb-6" />
             <p className="text-gray-400 font-bold text-xl">Sacar Carta</p>
           </div>
        ) : (
          <div className="w-full h-[450px] relative animate-flip-in">
             <div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}>
               <span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">
                 {currentCard.type === 'truth' ? 'VERDAD' : 'RETO'}
               </span>
               <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                 {currentCard.text}
               </h3>
               <button onClick={drawCard} className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">
                 SIGUIENTE
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderNeverGame = () => (
    <div className="flex flex-col h-full animate-fade-in bg-blue-950/20">
      <div className="flex items-center p-4">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h2 className="ml-4 text-xl font-bold text-white">Yo Nunca</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full h-80 bg-gradient-to-b from-blue-800 to-blue-950 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Beer className="w-12 h-12 text-blue-400 mb-6 opacity-80" />
            <h3 className="text-2xl font-bold text-white leading-relaxed">
              "{neverText}"
            </h3>
          </div>
          <p className="text-gray-400 text-sm text-center px-8">Si lo has hecho, <span className="text-blue-400 font-bold">cumple la penitencia</span> (beber o prenda).</p>
      </div>
      <div className="p-6 pb-10">
        <Button onClick={nextNever} className="bg-blue-600 hover:bg-blue-700 border-blue-400">
           SIGUIENTE FRASE
        </Button>
      </div>
    </div>
  );

  const renderRoulette = () => (
    <div className="flex flex-col h-full animate-fade-in bg-red-950/20">
      <div className="flex items-center p-4">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h2 className="ml-4 text-xl font-bold text-white">Ruleta Rusa</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="relative w-64 h-64 mb-10">
            <div className={`w-full h-full rounded-full border-4 border-gray-700 flex items-center justify-center relative transition-transform duration-1000 ${rouletteStatus === 'spinning' ? 'rotate-[720deg]' : ''}`}>
               {[0, 60, 120, 180, 240, 300].map((deg, index) => (
                  <div key={index} 
                    className={`absolute w-8 h-8 rounded-full border-2 border-gray-600 top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[50%_120px]
                    ${index === currentChamber && rouletteStatus !== 'spinning' ? 'bg-yellow-500 shadow-[0_0_15px_yellow]' : 'bg-gray-900'}
                    `}
                    style={{ transform: `rotate(${deg}deg) translate(0, -110px)` }}
                  ></div>
               ))}
               <div className="absolute w-20 h-20 bg-gray-800 rounded-full border-2 border-gray-600 flex items-center justify-center">
                  {rouletteStatus === 'dead' ? <Skull className="text-red-500 w-10 h-10 animate-bounce"/> : <Bomb className="text-gray-500 w-8 h-8"/>}
               </div>
            </div>
        </div>

        <div className="h-32 flex items-center justify-center text-center px-4 w-full">
            {rouletteStatus === 'ready' && <p className="text-gray-400">Gira el cilindro para empezar...</p>}
            {rouletteStatus === 'spinning' && <p className="text-yellow-500 font-bold animate-pulse">GIRANDO...</p>}
            {rouletteStatus === 'active' && <p className="text-white font-bold text-lg">Pasa el cel. Tu turno.</p>}
            {rouletteStatus === 'safe' && <p className="text-green-500 font-black text-2xl scale-125 transition-transform">¡CLICK! (Seguro)</p>}
            {rouletteStatus === 'dead' && (
                <div className="animate-bounce">
                    <p className="text-red-600 font-black text-4xl mb-2">¡BANG!</p>
                    <p className="text-white text-md bg-red-900/50 p-4 rounded-lg border border-red-500">{punishment}</p>
                </div>
            )}
        </div>
      </div>

      <div className="p-6 pb-10 space-y-4">
        {rouletteStatus === 'ready' || rouletteStatus === 'dead' ? (
           <Button onClick={spinRoulette} variant="secondary">
              GIRAR CILINDRO
           </Button>
        ) : (
           <Button onClick={pullTrigger} disabled={rouletteStatus !== 'active'} variant="danger">
              APRETAR GATILLO
           </Button>
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