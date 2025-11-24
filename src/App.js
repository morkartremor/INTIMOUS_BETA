import React, { useState, useEffect } from 'react';
import { Dice5, Flame, Heart, Users, ArrowLeft, Zap, Moon, Sun, Shuffle, Play, AlertTriangle } from 'lucide-react';

// --- CONFIGURACIÓN Y DATOS ---
const AUDIENCES = [
  { id: 'couple', label: 'Pareja Estable', icon: Heart, desc: 'Para reavivar la llama.', color: 'text-red-500', bg: 'bg-red-500/20' },
  { id: 'friends', label: 'Amigos / Fiesta', icon: Users, desc: 'Divertido y atrevido.', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'date', label: 'Primera Cita', icon: Moon, desc: 'Romper el hielo.', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'ons', label: 'Una Noche', icon: Flame, desc: 'Sin ataduras, directo al grano.', color: 'text-orange-500', bg: 'bg-orange-500/20' },
  { id: 'fwb', label: 'Amigos con Derechos', icon: Zap, desc: 'Tensión sexual al máximo.', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'ex', label: 'Ex Pareja / Algo', icon: Shuffle, desc: 'Terreno peligroso...', color: 'text-gray-400', bg: 'bg-gray-500/20' },
];

const GAMES = [
  { id: 'dice', label: 'Dados Calientes', desc: 'El azar decide qué y dónde.', icon: Dice5 },
  { id: 'cards', label: 'Verdad o Reto', desc: 'Preguntas incómodas y retos físicos.', icon: Zap },
  { id: 'roulette', label: 'Ruleta Rusa', desc: 'Un castigo aleatorio para el perdedor.', icon: Shuffle },
];

const DICE_ACTIONS = ['Besar', 'Lamer', 'Tocar', 'Mordisquear', 'Soplar', 'Masajear', 'Apretar', 'Acariciar'];
const DICE_BODYPARTS = ['Cuello', 'Labios', 'Oreja', 'Muslos Int.', 'Pecho', 'Zona Íntima (X)', 'Espalda', 'Nalgas'];

const CARDS_DATA = {
  couple: [
    { type: 'truth', text: '¿Cuál es tu fantasía no cumplida conmigo?' },
    { type: 'dare', text: 'Da un masaje sensual de 1 minuto sin usar las manos.' },
    { type: 'dare', text: 'Quítate una prenda usando solo los dientes.' },
  ],
  friends: [
    { type: 'truth', text: '¿Con quién de este grupo tendrías sexo si fuera el fin del mundo?' },
    { type: 'dare', text: 'Besa el cuello de la persona a tu derecha.' },
    { type: 'dare', text: 'Deja que el grupo te envíe un mensaje a quien quieran.' },
  ],
  default: [
    { type: 'truth', text: '¿Cuál es tu lugar favorito para hacerlo?' },
    { type: 'dare', text: 'Gemir fingiendo placer por 10 segundos.' },
    { type: 'dare', text: 'Muestra tu última foto de la galería.' }
  ]
};

// --- COMPONENTES ---
const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyle = "w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 select-none";
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white border border-red-400/30",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
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
  const [dice1, setDice1] = useState('?');
  const [dice2, setDice2] = useState('?');
  const [isRolling, setIsRolling] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const handleAudienceSelect = (audience) => {
    setSelectedAudience(audience);
    setScreen('games');
  };

  const handleGameSelect = (gameId) => {
    setScreen(`play-${gameId}`);
  };

  const goBack = () => {
    if (screen.startsWith('play-')) setScreen('games');
    else if (screen === 'games') setScreen('audience');
    else if (screen === 'audience') setScreen('home');
  };

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
    const deck = CARDS_DATA[selectedAudience?.id] || CARDS_DATA.friends || CARDS_DATA.default;
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    setCurrentCard(randomCard);
  };

  const renderHome = () => (
    <div className="flex flex-col h-full justify-between pt-12 pb-6 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 rounded-full animate-pulse"></div>
          <Flame className="w-28 h-28 text-red-500 relative z-10 mx-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">
            INTIMOUS
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-widest mt-2 uppercase opacity-80">
            Donde lo íntimo se encuentra con lo anónimo
          </p>
        </div>
      </div>
      <div className="space-y-6 px-8">
        <Button onClick={() => setScreen('audience')}>
          <Play fill="currentColor" className="w-5 h-5" /> JUGAR AHORA
        </Button>
        <div className="text-[10px] text-center text-gray-600 font-mono">
          v1.0.0 • +18 • DISCRECIÓN ASEGURADA
        </div>
      </div>
    </div>
  );

  const renderAudience = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center p-4 pb-2">
        <button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors">
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
          <h2 className="text-xl font-bold text-white">Modo de Juego</h2>
          <div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}>
            <selectedAudience.icon size={10} />
            {selectedAudience.label}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {GAMES.map((game) => (
          <div key={game.id} onClick={() => handleGameSelect(game.id)} className="flex items-center p-5 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl cursor-pointer hover:border-pink-500/50 transition-all active:scale-95 select-none shadow-lg">
            <div className="p-4 bg-gray-950 rounded-xl mr-5 text-pink-500 shadow-inner">
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
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10">
        <div className="w-full space-y-6 perspective-1000">
          <div className={`h-36 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-900 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-4xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>
            {dice1.toUpperCase()}
          </div>
          <div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em]">EN</div>
          <div className={`h-36 w-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-900 shadow-[0_0_40px_rgba(234,88,12,0.25)] text-4xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'}`}>
             {dice2.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="p-6 pb-12 bg-gradient-to-t from-black to-transparent">
        <Button onClick={rollDice} variant="primary">
          {isRolling ? '🎲 AGITANDO...' : 'LANZAR DADOS'}
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
             <p className="text-gray-400 font-bold text-xl">Toca para sacar carta</p>
           </div>
        ) : (
          <div className="w-full h-[450px] relative animate-flip-in">
             <div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}>
               <span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">
                 {currentCard.type === 'truth' ? 'VERDAD' : 'RETO'}
               </span>
               <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                 {currentCard.text}
               </h3>
               <button onClick={drawCard} className="mt-12 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">
                 SIGUIENTE CARTA
               </button>
             </div>
          </div>
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
        {screen === 'play-roulette' && (
            <div className="flex flex-col h-full items-center justify-center p-8 text-center animate-fade-in">
                <AlertTriangle className="text-yellow-500 w-20 h-20 mb-6"/>
                <h2 className="text-2xl font-bold text-white">En Construcción</h2>
                <p className="text-gray-400 mt-2">La Ruleta Rusa estará disponible en la próxima actualización.</p>
                <Button className="mt-8" onClick={goBack} variant="secondary">VOLVER</Button>
            </div>
        )}
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