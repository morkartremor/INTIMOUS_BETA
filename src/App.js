import React, { useState, useEffect } from 'react';
import { Dice5, Flame, Heart, Beer, Zap, Moon, Skull, Bomb, Layers, Timer, Pause, RotateCcw, Play, ArrowLeft, Image as ImageIcon, AlertTriangle, ShieldCheck, Shuffle, Crosshair, Thermometer, Clock, Lightbulb, Infinity, Sparkles, Eye, Feather, Camera, Gift, Flag, Wine, Utensils, MessageCircle, UserPlus, Music, BookOpen, Smile, Coffee, Film } from 'lucide-react';

// --- CONFIGURACIÓN DE AUDIENCIAS ---
const AUDIENCES = [
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
const GAMES = [
  { id: 'cards', label: 'Verdad o Reto X', desc: 'Cientos de retos por nivel.', icon: Zap, type: 'social' },
  { id: 'roleplay', label: 'Roleplay Roulette', desc: 'Roles y fantasías al azar.', icon: UserPlus, type: 'action' }, // JUEGO DEL WORD
  { id: 'dice', label: 'Dados Calientes', desc: 'Acción aleatoria rápida.', icon: Dice5, type: 'action' },
  { id: 'kama', label: 'Kamasutra', desc: 'Biblioteca masiva (+60).', icon: Layers, type: 'action' },
  { id: 'photo', label: 'Paparazzi X', desc: 'Fotos y poses prohibidas.', icon: Camera, type: 'action' }, 
  { id: 'timer', label: 'Rally Cronometrado', desc: 'Cambio de posición automático.', icon: Timer, type: 'action' },
  { id: 'roulette', label: 'Ruleta Rusa', desc: 'Castigos extremos.', icon: Bomb, type: 'risk' },
  { id: 'never', label: 'Yo Nunca XXX', desc: 'Confesiones calientes.', icon: Beer, type: 'social' },
];
//////////////////////////////////
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
//  BASE DE DATOS MAESTRA 
// ==========================================

// --- POOL UNIVERSAL ---
const UNIVERSAL_CARDS = [
  // NIVEL 1
  { level: 1, type: 'truth', text: '¿Qué parte de mi cuerpo te gusta más?' },
  { level: 1, type: 'truth', text: '¿Cuál fue tu primera impresión de mí?' },
  { level: 1, type: 'truth', text: '¿Qué parte de mi cuerpo te gustaría explorar más?' },
  { level: 1, type: 'truth', text: '¿Qué recuerdo romántico conmigo te excita más?' },
  { level: 1, type: 'dare', text: 'Susúrrame algo sexy al oído.' },
  { level: 1, type: 'dare', text: 'Bésame la frente tiernamente.' },
  
  // NIVEL 2
  { level: 2, type: 'dare', text: 'Si puedes hacerme reír, dame un beso donde quieras.' },
  { level: 2, type: 'dare', text: 'Muérdeme el labio inferior.' },
  { level: 2, type: 'dare', text: 'Quítate una prenda (no cuentan tenis o accesorios).' },
  { level: 2, type: 'dare', text: 'Bésame el cuello por 30 segundos.', time: 30 },
  { level: 2, type: 'dare', text: 'Mete tu mano bajo mi camisa.' },
  { level: 2, type: 'dare', text: 'Hazme un chupetón en el cuello.' },
  { level: 2, type: 'dare', text: 'Quítame una prenda lentamente.' },
  { level: 2, type: 'dare', text: 'Muérdeme lentamente y toma una foto de la marca (Subela a historias).' },
  { level: 2, type: 'truth', text: '¿Te has imaginado teniéndolo conmigo hoy?' },
  { level: 2, type: 'truth', text: '¿Qué fantasía ligera te gustaría probar conmigo?' },
  { level: 2, type: 'truth', text: '¿Qué parte de tu cuerpo te gusta que más te toque?' },
  { level: 2, type: 'dare', text: 'Toma 1 trago.' },
  { level: 2, type: 'dare', text: 'Toma 2 tragos.' },
  
  // NIVEL 3
  { level: 3, type: 'dare', text: 'Hazme un baile sensual por 30 segundos.', time: 30 },
  { level: 3, type: 'dare', text: 'Pásame un hielo por el pecho (o usa la lengua).' },
  { level: 3, type: 'dare', text: 'Masajea mi entrepierna por encima de la ropa.' },
  { level: 3, type: 'dare', text: 'Véndate los ojos 2 minutos.', time: 120 },
  { level: 3, type: 'dare', text: 'Muerde mis pezones suavemente.' },
  { level: 3, type: 'dare', text: 'Besos con lengua profundos por 1 min.', time: 60 },
  { level: 3, type: 'dare', text: 'Hazme un striptease improvisado (lo que dure una canción que elijas).' },
  { level: 3, type: 'dare', text: 'Lame mis pezones por 30 segundos.', time: 30 },
  { level: 3, type: 'dare', text: 'Véndame los ojos y tócame donde quieras por 90 segundos.', time: 90 },
  { level: 3, type: 'truth', text: '¿Qué fantasía te gustaría cumplir conmigo?' },
  
  // NIVEL 4
  { level: 4, type: 'dare', text: 'Mastúrbame con la mano.', time: 100 },
  { level: 4, type: 'dare', text: 'Sexo oral por 2 minutos.', time: 120 },
  { level: 4, type: 'dare', text: 'Ponte en cuatro y espera.' },
  { level: 4, type: 'dare', text: '69 hasta que alguien diga basta.' },
  { level: 4, type: 'dare', text: 'Mastúrbate frente a mí mirándome a los ojos.', time: 60 },
  { level: 4, type: 'dare', text: 'Mastúrbame con otra parte que no sean las manos.', time: 90 },
  { level: 4, type: 'dare', text: 'Azótame con la mano abierta 3 veces.' },
  { level: 4, type: 'dare', text: 'Hazme un "Edging" (al borde del orgasmo y para (el tiempo es para descansar)).', time: 90 },
  { level: 4, type: 'dare', text: 'Hazme un "Handjob" con aceite/crema corporal.', time: 120 },
  { level: 4, type: 'dare', text: 'Azótame el culo 5 veces.' },
  
  // NIVEL 5
  { level: 5, type: 'dare', text: 'Penetración rápida.', time: 45 },
  { level: 5, type: 'dare', text: 'Penetración fuerte y rápido durante 1 minuto sin terminar.', time: 60 },
  { level: 5, type: 'dare', text: 'Beso negro con mucha saliba.' },
  { level: 5, type: 'dare', text: 'Termina en mi boca.', isFinisher: true },
  { level: 5, type: 'dare', text: '69 hasta el final.', isFinisher: true },
  { level: 5, type: 'dare', text: 'Córrete dentro.', isFinisher: true },
  { level: 5, type: 'dare', text: 'Anal sin condón (si se puede).', isFinisher: true },
  { level: 5, type: 'dare', text: 'Sexo anal hasta que alguien diga "basta".' },
  { level: 5, type: 'dare', text: 'Garganta profunda y tomar foto (privada (¿o no?😈)).', isFinisher: true },
  { level: 5, type: 'dare', text: 'Terminar en la cara del otro.', isFinisher: true },
  { level: 5, type: 'dare', text: 'Hacer un Creampie y no sacarla en 2 minutos.', time: 120, isFinisher: true },
  // Additional cards for more variety
  { level: 1, type: 'truth', text: '¿Cuál es tu recuerdo favorito de nosotros?' },
  { level: 2, type: 'dare', text: 'Envíame un beso por mensaje de texto.' },
  { level: 3, type: 'dare', text: 'Dime un secreto que nunca le has contado a nadie.', time: 60 },
  { level: 4, type: 'dare', text: 'Hazme un masaje con aceite en la espalda.', time: 180 },
  { level: 5, type: 'dare', text: 'Prueba una posición nueva que nunca hemos hecho.', isFinisher: true }
];
/////////////////////////////////////////////////////////////////////
// --- NUEVO JUEGO: ROLEPLAY ROULETTE ---
const ROLEPLAY_DATA = [
  //lvl1
  { level: 1, text: '🎭 Compañeros de clase: "¿Quieres que te ayude con la tarea… o con otra cosa?"' },
  { level: 1, text: '🎭 Amigos en una fiesta: "Me quedé sin bebida, ¿me invitas a algo más interesante?"' },
  { level: 1, text: '🎭 Vecinos curiosos: "Se me olvidó el azúcar… ¿puedo pedirte un poco?"' },
  { level: 1, text: '🎭 Cita en cine: "La película está aburrida… ¿qué hacemos mejor?"' },
  { level: 1, text: '🎭 Extraños en transporte: "Ups, me senté demasiado cerca… ¿te molesta?"' },
  { level: 1, text: '🎭 Fotógrafo aficionado y modelo: "Solo quiero unas fotos artísticas… ¿te animas?"' },
  //lvl2
  { level: 2, text: '🎭 Profesor/a y Alumno/a: "Me he portado mal en clase, ¿cuál es mi castigo?"' },
  { level: 2, text: '🎭 Entrenador/a y Deportista: "Necesito entrenamiento extra… ¿me ayudas a sudar?"' },
  { level: 2, text: '🎭 Vecinos curiosos: "Me olvidé la llave, ¿puedo pasar a tu casa?"' },
  { level: 2, text: '🎭 Fotógrafo/a y Modelo: "Necesito que poses más atrevido/a para la sesión…" ' },
  //lvl3
  { level: 3, text: '🎭 Jefe/a y Empleado/a: "Te llamé a la oficina para revisar tu desempeño..."' },
  { level: 3, text: '🎭 Desconocidos en un bar: Intenta ligarme desde cero. Si fallas, bebes.' },
  { level: 3, text: '🎭 Entrenador/a de gimnasio: "Te corrijo la postura… pero necesito tocarte." ' },
  { level: 3, text: '🎭 Roommates: "La renta está cara… ¿qué me ofreces a cambio?"' },
  { level: 3, text: '🎭 Cliente y Camarero/a: "El servicio incluye algo más… ¿quieres probar?"' },
  //lvl4
  { level: 4, text: '🎭 Médico y Paciente: "Doctor/a, me duele aquí abajo..."' },
  { level: 4, text: '🎭 Ladrón y Policía: "Me has atrapado robando. ¿Me esposas o me castigas?"' },
  { level: 4, text: '🎭 Guardián/a de prisión y Recluso/a: "Tienes que obedecer mis órdenes si quieres salir." ' },
  { level: 4, text: '🎭 Amo/a y Sumiso/a: "Hoy no tienes derecho a hablar, solo obedecer." ' },
  { level: 4, text: '🎭 Profesor/a de yoga: "Respira profundo… ahora déjame corregir tu postura íntima." ' },
  //lvl5
  { level: 5, text: '🎭 Masajista "con final feliz": Empieza profesional, termina sucio.' },
  { level: 5, text: '🎭 Actor/a porno y Director/a: "Necesito que lo hagas más intenso para la cámara." ' },
  { level: 5, text: '🎭 Escort y Cliente VIP: "El paquete incluye todo… ¿quieres el servicio completo?"' },
  { level: 5, text: '🎭 Maestro/a de BDSM: "Hoy aprenderás a obedecer cada orden sin rechistar." ' },
  { level: 5, text: '🎭 Estrella de strip club y Cliente: "El baile termina en privado… ¿quieres el show completo?"' },
];
//////////////////////////////////////////////////////////////////////////////////////
// --- BASES DE DATOS ESPECÍFICAS ---
const CARDS_DATA = {
  couple: [ //pareja
    ...UNIVERSAL_CARDS,
    { level: 1, type: 'truth', text: '¿Qué fantasía te da vergüenza pedirme?' },
    { level: 1, type: 'truth', text: '¿Qué detalle mío te enamora más en el día a día?' },
    { level: 2, type: 'dare', text: 'Masaje de cuerpo completo con aceite o cream corporal.' , time: 120 },
    { level: 2, type: 'dare', text: 'Hazme un masaje de pies mientras hablamos.', time: 90 },
    { level: 3, type: 'dare', text: 'Véndame los ojos y usa una pluma o hielo en mi cuerpo.' },
    { level: 3, type: 'dare', text: 'Hazme un striptease sin tocarme (duración de 1 canción).' },
    { level: 4, type: 'dare', text: 'Amárrame a la cama y hazme lo que quieras por 2 minutos.' , time:120 },
    { level: 4, type: 'dare', text: 'Véndate los ojos, eres mía/o por 3 minutos.', time: 180 },
    { level: 5, type: 'dare', text: 'Hazme un hijo (termina dentro).', isFinisher: true },
    { level: 5, type: 'dare', text: 'Orgasmo simultáneo. Coordínense.', isFinisher: true },
    { level: 5, type: 'dare', text: 'Hazme lo que pienses que más me gusta hasta el orgasmo.', isFinisher: true }
  ],
  kinky: [ //kinky & bdsm
    ...UNIVERSAL_CARDS.filter(c => c.level > 1),
    { level: 1, type: 'truth', text: '¿Te gusta más dominar o ser dominado/a? Detalla.' },
    { level: 2, type: 'dare', text: 'Déjame atarte las manos con un cinturón o corbata.' },
    { level: 3, type: 'dare', text: 'Usa una prenda mía como mordaza por 2 minutos.', time: 120 }, 
    { level: 3, type: 'dare', text: 'Dame 3 nalgadas firmes y di "Gracias Amo/a".' },
    { level: 4, type: 'dare', text: 'Soy tu dueño/a 50 min. No puedes hablar, solo asentir.' , time:300},
    { level: 4, type: 'dare', text: 'Lame mis pies o axilas (Worship).' },
    { level: 5, type: 'dare', text: 'Orgasmo prohibido (Edging). Te llevaré al borde 3 veces.' },
    { level: 5, type: 'dare', text: 'Garganta profunda forzada y grabar video de 25 segundos minimo.', time: 25 }
  ],
  public: [ //publico
    ...UNIVERSAL_CARDS.filter(c => c.level <= 3),
    { level: 1, type: 'dare', text: 'Susúrrame qué me harías si estuviéramos solos (muy gráfico).' },
    { level: 1, type: 'truth', text: '¿Llevas ropa interior? Muéstramela discretamente.' },
    { level: 2, type: 'dare', text: 'Tócame la pierna bajo la mesa durante 1 minuto sin mirar.', time: 60 }, 
    { level: 3, type: 'dare', text: 'Mete tu mano en mi ropa interior 30s. Nadie puede notarlo.', time: 30 },
    { level: 3, type: 'dare', text: 'Ve al baño y mándame una foto de tu ropa interior bajada.' },
    { level: 4, type: 'dare', text: 'Si hay baño cerca, vamos a fajar 5 minutos.' },
    { level: 4, type: 'dare', text: 'Quítate la ropa interior y dámela en la mano (aquí o en el baño).' },
    { level: 5, type: 'dare', text: 'Sexo rápido aquí mismo (coche/baño). ¡AHORA!', isFinisher: true },
    { level: 5, type: 'dare', text: 'Mastúrbame aquí mismo por 1 minuto disimuladamente.', time: 60 }
  ],
  fwb: [ //amigos con beneficios
    ...UNIVERSAL_CARDS, 
    { level: 1, type: 'truth', text: '¿Qué es lo que más disfrutas de "nuestro trato"?' }, 
    { level: 2, type: 'dare', text: 'Dame un beso en el cuello muy sensual.' }, 
    { level: 3, type: 'dare', text: 'Hazme un striptease improvisado.', time: 60 }, 
    { level: 4, type: 'dare', text: 'Mastúrbame haciendo “edging” (al borde sin terminar).' }, 
    { level: 5, type: 'dare', text: 'Hacer sexo rápido y termina dentro (o en la boca).', isFinisher: true } 
  ],
  ons: [ //una sola noche
    ...UNIVERSAL_CARDS.filter(c => c.level >= 2), 
    { level: 1, type: 'truth', text: '¿Qué fue lo primero que te atrajo de mi hoy?' }, 
    { level: 2, type: 'dare', text: 'Bésame apasionadamente por 30 segundos.', time: 30 }, 
    { level: 3, type: 'dare', text: 'Hazme un oral breve pero intenso.', time: 60 }, 
    { level: 4, type: 'dare', text: 'Penetración en la posición que elija quien recibirá.' }, 
    { level: 4, type: 'dare', text: 'Penetración en la posición que elija quien dará.' }, 
    { level: 5, type: 'dare', text: 'Correrse en la boca.', isFinisher: true } 
  ],
  situationship: [ // "Casi Algo"
    ...UNIVERSAL_CARDS, 
    { level: 1, type: 'truth', text: '¿Qué intenciones tienes conmigo?' }, 
    { level: 2, type: 'dare', text: 'Dame un beso corto en los labios sin meter lengua.', time: 10 }, 
    { level: 3, type: 'dare', text: 'Hazme un masaje en la espalda baja.', time: 60 }, 
    { level: 4, type: 'dare', text: 'Mastúrbame con la mano que elija.', time: 140 }, 
    { level: 5, type: 'dare', text: 'Hazme sexo intenso como si fuera la ultima vez que me veras.' }
  ],
  ex: [ //ex
    ...UNIVERSAL_CARDS,
    { level: 1, type: 'truth', text: '¿Qué recuerdo íntimo nuestro aún te excita?' },
    { level: 2, type: 'dare', text: 'Dame un beso en el cuello apasionado.' },
    { level: 3, type: 'dare', text: 'Hazme un oral breve recordando como en algún momento se dio.' },
    { level: 4, type: 'dare', text: 'Penétrame en la posición que más usábamos.' },
    { level: 5, type: 'dare', text: 'Hazme correrme en la posición que más recuerdas de nosotros.', isFinisher: true }
  ],
  friends: [  //amigos/fiesta
    { level: 1, type: 'truth', text: '¿Con quién de aquí te atreverías a besar?' }, 
    { level: 2, type: 'dare', text: 'Yo elijo a quien besar por 60 segundos.', time: 60 }, 
    { level: 4, type: 'dare', text: 'Elijo quien me dará un oral rápido en el baño.', time: 180 }, 
    { level: 5, type: 'dare', text: 'Vamos a hacer un trio con quienes elija yo.' } 
  ],
  default: [...UNIVERSAL_CARDS]
};
///////////////////////////////////////////////////////////
// --- DADOS ---
const DICE_ACTIONS = [
  { text: 'Besar', level: 1 }, 
  { text: 'Acariciar', level: 1 }, 
  { text: 'Soplar', level: 1 }, 
  { text: 'Rozar', level: 1 },
  { text: 'Mirar fijamente', level: 1 },
  //lvl2
  { text: 'Lamer', level: 2 }, 
  { text: 'Morder', level: 2 }, 
  { text: 'Chupar', level: 2 }, 
  { text: 'Apretar', level: 2 },
  { text: 'Masajear', level: 2 },
  { text: 'Desvestir', level: 2 },
  { text: 'Provocar', level: 2 },
  //lvl3
  { text: 'Nalguear', level: 3 }, 
  { text: 'Venerar', level: 3 }, 
  { text: 'Vibrar', level: 3 },
  { text: 'Excitar', level: 3 },
  { text: 'Frotar fuerte', level: 3 },
  { text: 'Chupar con fuerza', level: 3 },
  { text: 'Morder profundo', level: 3 },

  //lvl4
  { text: 'Escupir', level: 4 }, 
  { text: 'Pellizcar', level: 4 }, 
  { text: 'Dominar', level: 4 }, 
  { text: 'Pies', level: 4 },
  { text: 'Asfixiar (Suave)', level: 4 }, 
  { text: 'Pisar', level: 4 },
  { text: 'Marcar con uñas', level: 4 },
  { text: 'Azotar', level: 4 },
  //lvl5
  { text: 'Penetrar', level: 5 }, 
  { text: 'Orgasmo', level: 5, isFinisher: true }, 
  { text: 'Garganta profunda', level: 5 }, 
  { text: 'Follar', level: 5 }, 
  { text: 'Llenar', level: 5, isFinisher: true },
  { text: 'Romper límites', level: 5 },
  { text: 'Exprimir hasta el final', level: 5, isFinisher: true }
];
const DICE_BODYPARTS = [
  //lvl1
  { text: 'Cuello', level: 1 }, 
  { text: 'Oreja', level: 1 }, 
  { text: 'Manos', level: 1 }, 
  { text: 'Labios', level: 1 },
  { text: 'Cabello', level: 1 },
  { text: 'Espalda Alta', level: 1 },
  //lvl2
  { text: 'Pezones', level: 2 }, 
  { text: 'Muslos', level: 2 }, 
  { text: 'Espalda Baja', level: 2 }, 
  { text: 'Ombligo', level: 2 },
  { text: 'Cadera', level: 2 },
  { text: 'Costados', level: 2 },
  //lvl3
  { text: 'Genitales', level: 3 }, 
  { text: 'Trasero', level: 3 }, 
  { text: 'Perineo', level: 3 }, 
  { text: 'Entrepierna', level: 3 }, 
  { text: 'Lengua', level: 3 },
  { text: 'Clítoris/Glande', level: 3 },
  //lvl4
  { text: 'Pies', level: 4 }, 
  { text: 'Garganta', level: 4 }, 
  { text: 'Ano', level: 4 }, 
  { text: 'Axilas', level: 4 },
  { text: 'Interior muslos', level: 4 },
  { text: 'Espalda completa', level: 4 },
  //lvl5
  { text: 'Donde quieras', level: 5 }, 
  { text: 'Boca', level: 5 }, 
  { text: 'Adentro', level: 5 }, 
  { text: 'Cara', level: 5 },
  { text: 'Pechos', level: 5 },
  { text: 'Trasero profundo', level: 5 }
  
];
//Dados Nivel Mas Caliente
const CLIMAX_ACTIONS = [
  { text: 'Terminar', level: 5, isFinisher: true },
  { text: 'Correrse', level: 5, isFinisher: true },
  { text: 'Llenar', level: 5, isFinisher: true },
  { text: 'Explotar', level: 5, isFinisher: true },
  { text: 'Dejarlo todo', level: 5, isFinisher: true },
  { text: 'Inundar', level: 5, isFinisher: true },
  { text: 'Descargar completo', level: 5, isFinisher: true }
];
const CLIMAX_BODYPARTS = [
  { text: 'Boca', level: 5 }, 
  { text: 'Adentro', level: 5 }, 
  { text: 'Pechos', level: 5 }, 
  { text: 'Cara', level: 5 }, 
  { text: 'Trasero', level: 5 }, 
  { text: 'Garganta', level: 5 },
  { text: 'Espalda', level: 5 },
  { text: 'Cabello', level: 5 }

];
/////////////////////////////////////////////////////////////////////
// --- KAMASUTRA  ---
const KAMA_POSITIONS = [
  { name: "Cucharita", level: 1, desc: "Intimidad lateral.", img: "spoon.png" },
  { name: "Loto", level: 1, desc: "Sentados frente a frente.", img: "lotus.png" },
  { name: "El Abrazo", level: 1, desc: "Misionero muy pegado.", img: "hug.png" },
  { name: "La Fusión", level: 1, desc: "Piernas entrelazadas.", img: "fusion.png" },
  { name: "Misionero", level: 2, desc: "Clásico y romántico.", img: "missionary.png" },
  { name: "Perrito", level: 2, desc: "Desde atrás, control total.", img: "doggy.png" },
  { name: "La Silla", level: 2, desc: "Él sentado, ella encima.", img: "chair.png" },
  { name: "El Sofá", level: 2, desc: "Borde del sofá/cama.", img: "sofa.png" },
  { name: "La Boa", level: 2, desc: "Piernas juntas y estiradas.", img: "boa.png" },
  { name: "Vaquera", level: 3, desc: "Ella arriba controla.", img: "cowgirl.png" },
  { name: "El 69", level: 3, desc: "Oral mutuo.", img: "69.png" },
  { name: "Piernas al Hombro", level: 3, desc: "Profundidad máxima.", img: "legs_up.png" },
  { name: "Vaquera Invertida", level: 3, desc: "Ella arriba de espaldas.", img: "rev_cowgirl.png" },
  { name: "La Cascada", level: 3, desc: "Colgando del borde.", img: "waterfall.png" },
  { name: "El Yunque", level: 4, desc: "Pelvis arriba, piernas atrás.", img: "anvil.png" },
  { name: "La Carretilla", level: 4, desc: "De pie, sosteniendo piernas.", img: "wheelbarrow.png" },
  { name: "Cara a Cara (Silla)", level: 4, desc: "Sentados, penetración profunda.", img: "chair_sex.png" },
  { name: "La Mesa", level: 4, desc: "Sobre superficie plana.", img: "table.png" },
  { name: "El Pretzel", level: 4, desc: "Piernas envueltas lateralmente.", img: "pretzel.png" },
  { name: "El Puente", level: 3, desc: "Ella arqueada, él encima. (Nuevo)", img: "bridge.png" },
  { name: "El Columpio", level: 5, desc: "Si hay soporte. (Nuevo)", img: "swing.png" },
  { name: "El Espejo", level: 3, desc: "Frente a espejo, penetración. (Nuevo)", img: "mirror.png" },
  { name: "El Triángulo", level: 3, desc: "Piernas formando figura. (Nuevo)", img: "triangle.png" },
  { name: "El Ascensor", level: 5, desc: "De pie, levantada. (Nuevo)", img: "elevator.png" },
  { name: "El Giro", level: 4, desc: "Rotación de 180° en el acto. (Nuevo)", img: "spin.png" },
  { name: "Anal (Cuchara)", level: 5, desc: "Acceso trasero suave.", img: "anal_spoon.png" },
  { name: "Garganta Profunda", level: 5, desc: "Posición para oral extremo.", img: "deep.png" },
  { name: "La Araña", level: 5, desc: "Entrelazados complejos.", img: "spider.png" },
  { name: "El Helicóptero", level: 5, desc: "Girando sobre el pene.", img: "helicopter.png" },
  { name: "De Pie", level: 5, desc: "Contra la pared. Rápido.", img: "standing.png" },
  { name: "El Trono", level: 5, desc: "Él sentado, ella encima de espaldas.", img: "throne.png" },
  // Additional positions for more variety
  { name: "El Cangrejo", level: 2, desc: "Piernas flexionadas, movimiento lateral.", img: "crab.png" },
  { name: "El Cangrejo Invertido", level: 3, desc: "Ella arriba, piernas flexionadas.", img: "rev_crab.png" },
  { name: "El Cangrejo Anal", level: 5, desc: "Acceso trasero con piernas flexionadas.", img: "anal_crab.png" },
  { name: "El Cangrejo de Pie", level: 4, desc: "De pie, una pierna arriba.", img: "standing_crab.png" },
  { name: "El Cangrejo en Mesa", level: 3, desc: "Sobre mesa, piernas flexionadas.", img: "table_crab.png" }
];
/////////////////////////////////////////////////////////////////////////////
//ruleta rusa
const ROULETTE_DB = [
  //lvl1
  { text: "Bebe un trago.", level: 1 }, 
  { text: "Beso de 10s.", level: 1 },
  { text: "Cuenta un secreto.", level: 1 },
  { text: "Beso en la mejilla con ternura.", level: 1 },
  { text: "Susurra algo sexy al oído.", level: 1 },
  { text: "Haz un selfie gracioso juntos.", level: 1 },
  //lvl2
  { text: "Quítate la camisa.", level: 2 }, 
  { text: "Nalgada seca.", level: 2 }, 
  { text: "Beso con lengua.", level: 2 },
  { text: "Muérdeme suavemente el labio.", level: 2 },
  { text: "Hazme un masaje en el cuello.", level: 2 },
  { text: "Quítame una prenda lentamente.", level: 2 },
  { text: "Hazme un baile sexy de 30 segundos.", level: 2 , time: 30 },

  //lvl3
  { text: "Quítate ropa interior.", level: 3 }, 
  { text: "Oral 1 minuto.", level: 3 },
  { text: "Hielo en genitales.", level: 3 }, 
  { text: "Hazme un beso profundo con lengua por 1 min.", level: 3 , time: 60 },
  { text: "Muerde mis pezones suavemente.", level: 3 },
  { text: "Hazme un masaje en la entrepierna por encima de la ropa.", level: 3 },
  { text: "Hazme un striptease improvisado.", level: 3 , time: 180 },

  //lvl4
  { text: "Chupar dedos del pie.", level: 4 }, 
  { text: "Azotes con cinturón.", level: 4 }, 
  { text: "Exponerse 10s.", level: 4 },
  { text: "Nalgada muy fuerte.", level: 4 },
  { text: "Hazme un oral hasta que yo diga basta.", level: 4 },
  { text: "Amárrame las manos por 2 minutos.", level: 4 , time: 120 },
  { text: "Hazme un edging (llevarme al borde y detenerte).", level: 4 },

  //lvl5
  { text: "Penetración anal.", level: 5 }, 
  { text: "Tragar todo.", level: 5, isFinisher: true },
  { text: "Hacer un Creampie.", level: 5, isFinisher: true }, 
  { text: "Sexo anal obligatorio.", level: 5, isFinisher: true },
  { text: "Orgasmo simultáneo obligatorio.", level: 5, isFinisher: true },
  { text: "Facial completo (terminar en la cara).", level: 5, isFinisher: true },
  { text: "Garganta profunda prolongado hasta el final.", level: 5, isFinisher: true }
];
/////////////////////////////////////////////////////////////////////////////////
//yo nunca nunca
const NEVER_DATA = [
  // L1
  { text: "Yo nunca he besado en la primera cita.", level: 1 }, 
  { text: "Yo nunca he stalkeado a un ex.", level: 1 },
  { text: "Yo nunca he mentido sobre mi edad.", level: 1 },
  { text: "Yo nunca he enviado un mensaje borracho.", level: 1 },
  { text: "Yo nunca he tenido un crush con un profesor/a.", level: 1 },
  { text: "Yo nunca he fingido estar ocupado para evitar a alguien.", level: 1 },
  { text: "Yo nunca he usado una excusa tonta para no salir.", level: 1 },
  // L2
  { text: "Yo nunca he mandado nudes.", level: 2 }, 
  { text: "Yo nunca he tenido sexo en la playa.", level: 2 },
  { text: "Yo nunca he subido una foto hot por error.", level: 2 },
  { text: "Yo nunca me he excitado en público.", level: 2 },
  { text: "Yo nunca he usado juguetes sexuales.", level: 2 },
  { text: "Yo nunca he tenido un sueño erótico con alguien cercano.", level: 2 },
  { text: "Yo nunca he visto porno con otra persona.", level: 2 },
  { text: "Yo nunca he tenido sexting con alguien desconocido.", level: 2 },
  // L3
  { text: "Yo nunca he tenido sexo en un lugar público.", level: 3 }, 
  { text: "Yo nunca he fingido un orgasmo.", level: 3 },
  { text: "Yo nunca he tenido cibersexo.", level: 3 },
  { text: "Yo nunca he tenido sexo anal.", level: 3 },
  { text: "Yo nunca he usado comida en la cama.", level: 3 },
  { text: "Yo nunca he tenido sexo en un coche.", level: 3 },
  { text: "Yo nunca he probado el sexo telefónico.", level: 3 },
  { text: "Yo nunca he tenido sexo con alguien mayor por más de 8 años.", level: 3 },

  // L4
  { text: "Yo nunca he tenido un fetiche de pies.", level: 4 }, 
  { text: "Yo nunca he sido infiel.", level: 4 },
  { text: "Yo nunca me he grabado teniendo sexo.", level: 4 },
  { text: "Yo nunca he tenido sexo con alguien cuyo nombre no sabía.", level: 4 },
  { text: "Yo nunca he practicado BDSM.", level: 4 },
  { text: "Yo nunca he usado disfraces sexuales (cuenta lenceria).", level: 4 },
  { text: "Yo nunca he tenido sexo con más de una persona en la misma noche.", level: 4 },
  { text: "Yo nunca he probado el intercambio de parejas.", level: 4 },

  // L5
  { text: "Yo nunca he participado en una orgía.", level: 5 }, 
  { text: "Yo nunca he probado mis propios fluidos.", level: 5 },
  { text: "Yo nunca he pagado por sexo.", level: 5 },
  { text: "Yo nunca he tenido una ETS.", level: 5 },
  { text: "Yo nunca he hecho un trío.", level: 5 },
  { text: "Yo nunca he tenido sexo sin protección con un desconocido.", level: 5 },
  { text: "Yo nunca he probado prácticas de dominación extrema.", level: 5 },
  { text: "Yo nunca he tenido sexo en estado de sobriedad cero (muy borracho/a).", level: 5 }

];
////////////////////////////////////////////////////////////////////////////////////
//bonus
const BONUS_DATA = [
  { icon: <Utensils/>, title: "Antojo", text: "Pidan comida a domicilio ahora mismo. Se lo han ganado." },
  { icon: <Heart/>, title: "Ducha Juntos", text: "Vayan a ducharse. Enjabónense mutuamente sin intención sexual, solo cuidado." },
  { icon: <MessageCircle/>, title: "Feedback", text: "Díganse una cosa que les encantó de esta sesión y una que quieren probar la próxima." },
  { icon: <Heart/>, title: "Abrazo", text: "5 minutos de abrazos en la cama, sin celulares, solo respirando juntos." },
  { icon: <Thermometer/>, title: "Masaje", text: "Masaje de pies o espalda de 3 minutos para relajar." },
  { icon: <Gift/>, title: "Juguete Nuevo", text: "Tarea: Comprar un juguete o lubricante nuevo para la próxima vez." },
  { icon: <Flag/>, title: "Ubicación", text: "La próxima sesión NO puede ser en la cama (Sofá, Cocina, Baño)." },
  { icon: <Eye/>, title: "Vendas", text: "Próxima vez: Traigan algo para vendarse los ojos desde el minuto 1." },
  { icon: <Feather/>, title: "Rol", text: "Próxima vez: Uno será el 'Esclavo' y el otro el 'Amo' por 1 hora." },
  { icon: <Camera/>, title: "Foto Recuerdo", text: "Tomen una foto de los dos ahora mismo (after-sex glow) para su carpeta privada." },
  { icon: <Beer/>, title: "Brindis", text: "Un último trago/shot para celebrar la sesión." },
  { icon: <RotateCcw/>, title: "Juego de Memoria", text: "Recordar qué reto fue el más excitante y repetirlo la próxima vez." }, // NUEVO
  { icon: <MessageCircle/>, title: "Confesiones Finales", text: "Cada uno revela algo que nunca había dicho." }, // NUEVO
  { icon: <Flag/>, title: "Plan Secreto", text: "Escribir en papel dónde será el próximo encuentro y guardarlo." }, // NUEVO
  { icon: <Music/>, title: "Playlist Sexy", text: "Pongan una canción y bailen abrazados, sin importar cómo se vean." },
  { icon: <BookOpen/>, title: "Historia Erótica", text: "Inventen juntos una mini historia erótica para la próxima vez." },
  { icon: <Zap/>, title: "Reto Flash", text: "Cada uno escribe un reto rápido en papel y lo guarda para la próxima sesión." },
  { icon: <Smile/>, title: "Selfie Tonto", text: "Tomen una foto graciosa en la cama para recordar el momento con humor." },
  { icon: <Moon/>, title: "Noche Diferente", text: "Decidan un lugar inesperado para dormir juntos (sofá, piso con cobijas, terraza)." },
  { icon: <Coffee/>, title: "Desayuno", text: "Planeen qué desayunarán mañana y quién lo prepara, agreguen algo extra si desean." },
  { icon: <Film/>, title: "Mini Video", text: "Graben un clip corto (sin mostrar todo) como recuerdo privado." },
  { icon: <Gift/>, title: "Sorpresa", text: "Cada uno debe preparar una sorpresa para la próxima sesión (puede ser juguete, ropa, comida)." },
  { icon: <Clock/>, title: "Cuenta Regresiva", text: "Pongan fecha exacta para repetir la experiencia y márquenla en calendario." }

];
/////////////////////////////////////////////////////////////////////////
//papparazzi X
const PHOTO_DATA = [
  //lvl1
  { level: 1, text: 'Foto con sombras y siluetas.' },
  { level: 1, text: 'Selfie sacando la lengua juntos.' },
  { level: 1, text: 'Foto de nuestras manos.' },
  { level: 1, text: 'Selfie con beso en la frente.' },
  { level: 1, text: 'Foto artística en blanco y negro.' },
  { level: 1, text: 'Selfie haciendo caras ridículas.' },
  { level: 1, text: 'Foto de pies juntos en la cama.' },
  //lvl 2
  { level: 2, text: 'Mirror Selfie levantando la camisa.' },
  { level: 2, text: 'Foto detalle: Mano apretando muslo.' },
  { level: 2, text: 'Foto ridícula en ropa interior.' },
  { level: 2, text: 'Poses absurdas.' },
  { level: 2, text: 'Foto de labios rozando sin beso.' },
  { level: 2, text: 'Foto de cuello con marca de beso.' },
  { level: 2, text: 'Foto de cuello con marca de chupeton.' },
  { level: 2, text: 'Selfie con ropa interior visible discretamente.' },

  //lvl3
  { level: 3, text: 'Foto de pies o manos.' },
  { level: 3, text: 'Foto de ropa interior usada.' },
  { level: 3, text: 'Foto de marca de beso/mordida.' },
  { level: 3, text: 'Foto de espalda desnuda con luz tenue.' },
  { level: 3, text: 'Foto de boca abierta con lengua afuera.' },
  { level: 3, text: 'Foto de ropa interior bajada parcialmente.' },
  { level: 3, text: 'Foto artística de silueta desnuda en espejo.' },

  //lvl4
  { level: 4, text: 'Foto de juguetes.' },
  { level: 4, text: 'Foto de genitales con flash.' },
  { level: 4, text: 'Foto POV desde arriba durante oral.' },
  { level: 4, text: 'Foto con mordaza o manos atadas.' },
  { level: 4, text: 'Foto de nalgas rojas después de azote.' },
  { level: 4, text: 'Foto con ropa interior completamente fuera.' },
  { level: 4, text: 'Foto con lubricante/juguete en acción.' },

  //lvl5
  { level: 5, text: 'Secuencia de 3 fotos contando una historia.' },
  { level: 5, text: 'Penetración desde ángulo oculto.' },
  { level: 5, text: 'Foto: Interior después de terminar.', isFinisher: true },
  { level: 5, text: 'Video corto de gemidos o respiración fuerte.' },
  { level: 5, text: 'Foto POV durante penetración.' },
  { level: 5, text: 'Foto de ambos sudados abrazados después del sexo.' },
  { level: 5, text: 'Foto POV del último empuje antes del clímax.' },
  { level: 5, text: 'Foto artística del “money shot” con luz tenue.' },
  { level: 5, text: 'Secuencia de fotos mostrando el orgasmo progresivo.' },
  { level: 5, text: 'Foto de ambos sonriendo exhaustos en la cama.' },
  { level: 5, text: 'Foto artística con sábanas revueltas y cuerpos entrelazados.' },
  { level: 5, text: 'Foto íntima de manos entrelazadas durante el clímax.' },
  { level: 5, text: 'Foto de espejo mostrando el cuerpo completo post-acto.' },
  { level: 5, text: 'Foto artística de gotas de sudor en la piel.' },
  { level: 5, text: 'Foto de beso profundo justo después de terminar.' },
  { level: 5, text: 'Foto de la cama desordenada como recuerdo del momento.' },
  { level: 5, text: 'Foto artística de la silueta desnuda contra la ventana después del acto.' },
  { level: 5, text: 'Foto macro del semen corriendo por la piel.' },
  { level: 5, text: 'Foto con la boca abierta recibiendo todo.' },
  { level: 5, text: 'Foto del ano justo después de la penetración.' },
  { level: 5, text: 'Foto con la lengua lamiendo restos del clímax.' },
  { level: 5, text: 'Foto del condón usado lleno, en la mano.' },
  { level: 5, text: 'Foto con la cara cubierta de semen (facial completo).' },
  { level: 5, text: 'Foto del interior de la ropa interior mojada.' },
  { level: 5, text: 'Foto con los glúteos abiertos mostrando el interior húmedo.' },
  { level: 5, text: 'Foto POV del pene aún dentro después del orgasmo.' }

];
/////////////////////////////////////////////////////////////////////////////////
// --- COMPONENTES UI ---
const Button = ({ children, onClick, className = "", variant = "primary", disabled = false, size = "normal" }) => {
  const sizeClasses = size === "small" ? "py-2 px-4 text-sm" : "w-full font-bold py-4 rounded-2xl shadow-lg";
  const baseStyle = `${sizeClasses} transition-all transform active:scale-95 flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed`;
  const variants = { primary: "bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white border border-red-400/30", secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700", danger: "bg-gradient-to-r from-red-900 to-red-600 text-white border border-red-500", green: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500", gold: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black border border-yellow-500 font-black animate-pulse" };
  return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};
const HeatSelector = ({ currentLevel, setLevel }) => (<div className="grid grid-cols-6 gap-1 bg-gray-900/80 p-2 rounded-2xl mb-4 border border-gray-700">{HEAT_LEVELS.map((h) => (<button key={h.level} onClick={() => setLevel(h.level)} className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all ${currentLevel === h.level ? 'bg-gray-800 border border-gray-500 shadow-white/10 shadow-lg scale-105' : 'opacity-40 hover:opacity-70'}`}><span className="text-lg">{h.icon}</span><span className={`text-[8px] font-bold uppercase mt-1 ${h.color}`}>{h.level === 'all' ? 'RAND' : `NVL ${h.level}`}</span></button>))}</div>);
const CardItem = ({ label, desc, icon: Icon, onClick, color, bg }) => (<div onClick={onClick} className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex items-start gap-4 hover:border-pink-500/50 transition-all active:scale-95 cursor-pointer relative overflow-hidden group min-h-[80px]"><div className={`absolute inset-0 ${bg} opacity-5 group-hover:opacity-10 transition-opacity`}></div><div className={`p-3 rounded-xl shrink-0 ${bg} ${color}`}><Icon size={28} /></div><div className="flex-1 flex flex-col justify-center z-10"><h3 className="text-lg font-bold text-gray-100 leading-snug mb-1">{label}</h3><p className="text-sm text-gray-400 leading-relaxed">{desc}</p></div></div>);
const PenaltyBadge = ({ level }) => { let t="", c=""; if (level <= 2) { t = "Castigo: 1 Trago"; c = "bg-blue-500/20 text-blue-300 border-blue-500/50"; } else if (level <= 4) { t = "Castigo: 1 Shot"; c = "bg-orange-500/20 text-orange-300 border-orange-500/50"; } else { t = "Castigo: 2 Shots / Fondo"; c = "bg-red-600/20 text-red-300 border-red-500/50 animate-pulse"; } return (<div className={`mt-4 mb-2 px-4 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${c}`}>{t}</div>); };
//////////////////////////////////////////////////////////////////////////////////////
// --- APP PRINCIPAL ---
export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [heatLevel, setHeatLevel] = useState(1);
  const [dice1, setDice1] = useState('?');
  const [dice2, setDice2] = useState('?');
  const [isRolling, setIsRolling] = useState(false);
  const [isClimaxMode, setIsClimaxMode] = useState(false); 
  const [currentCard, setCurrentCard] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [neverText, setNeverText] = useState("Toca para empezar");
  const [currentNeverLevel, setCurrentNeverLevel] = useState(1);
  const [cardDeck, setCardDeck] = useState([]);
  const [kamaDeck, setKamaDeck] = useState([]);
  const [neverDeck, setNeverDeck] = useState([]);
  const [photoDeck, setPhotoDeck] = useState([]); 
  const [currentSessionHeat, setCurrentSessionHeat] = useState(1);
  const [showBonusButton, setShowBonusButton] = useState(false); 
  const [bonusCard, setBonusCard] = useState(null);
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

  const playSound = (type) => { if (navigator.vibrate) { if (type === 'bang') navigator.vibrate([500, 200, 500]); else if (type === 'click') navigator.vibrate(50); else if (type === 'spin') navigator.vibrate(300); else if (type === 'shutter') navigator.vibrate(100); else if (type === 'success') navigator.vibrate([50, 50, 50, 50]); } };

  useEffect(() => { let interval = null; if (screen === 'play-timer' && isTimerActive && timer > 0) interval = setInterval(() => setTimer((t) => t - 1), 1000); else if (screen === 'play-timer' && isTimerActive && timer === 0) { playSound('bang'); drawPosition(); setTimer(60); setIsTimerActive(false); } return () => clearInterval(interval); }, [screen, isTimerActive, timer]);
  useEffect(() => { let interval = null; if (isCardTimerRunning && cardTimer > 0) interval = setInterval(() => setCardTimer((t) => t - 1), 1000); else if (isCardTimerRunning && cardTimer === 0) { playSound('bang'); setIsCardTimerRunning(false); } return () => clearInterval(interval); }, [isCardTimerRunning, cardTimer]);

  const handleAudienceSelect = (audience) => { setSelectedAudience(audience); setScreen('games'); };
  const handleGameSelect = (gameId) => { setRouletteStatus('ready'); setPunishment(""); setCurrentCard(null); setCurrentPos(null); setNeverText("Toca para empezar"); setIsTimerActive(false); setTimer(60); setShotsFired([]); setCardTimer(null); setIsCardTimerRunning(false); setCurrentSessionHeat(1); setShowBonusButton(false); setIsClimaxMode(false);
    const audId = selectedAudience?.id; const filterContent = (data) => (heatLevel === 'all' ? data : data.filter(item => item.level <= heatLevel));
    if (gameId === 'cards') { let base = CARDS_DATA[audId] || CARDS_DATA.default; if (audId !== 'default' && !CARDS_DATA[audId]) base = [...CARDS_DATA.default]; setCardDeck(shuffleArray(filterContent(base))); }
    else if (gameId === 'kama' || gameId === 'timer') setKamaDeck(shuffleArray(filterContent(KAMA_POSITIONS))); else if (gameId === 'never') setNeverDeck(shuffleArray(filterContent(NEVER_DATA))); else if (gameId === 'photo') { let base = PHOTO_DATA[audId] || PHOTO_DATA.default; if(!PHOTO_DATA[audId]) base = PHOTO_DATA.default; setPhotoDeck(shuffleArray(filterContent(base))); }
    else if (gameId === 'roleplay') setCardDeck(shuffleArray(filterContent(ROLEPLAY_DATA))); // Lógica especial para Roleplay
    setScreen(`play-${gameId}`);
  };
  const goBack = () => { setIsTimerActive(false); setIsCardTimerRunning(false); if (screen.startsWith('play-')) setScreen('games'); else if (screen === 'games') setScreen('audience'); else if (screen === 'audience') setScreen('home'); };

  const filterContent = (data) => (heatLevel === 'all' ? data : data.filter(item => item.level <= heatLevel));
  const pickSmartItem = (deck) => { if (heatLevel !== 'all') { const item = deck[deck.length - 1]; return { item, newDeck: deck.slice(0, deck.length - 1) }; } else { const minAllowed = currentSessionHeat >= 4 ? 3 : Math.max(1, currentSessionHeat - 1); const maxAllowed = Math.min(5, currentSessionHeat + 1); let candidates = deck.filter(item => item.level >= minAllowed && item.level <= maxAllowed); if (candidates.length === 0) candidates = deck.filter(item => item.level >= minAllowed); if (candidates.length === 0) candidates = deck; const item = candidates[Math.floor(Math.random() * candidates.length)]; setCurrentSessionHeat(item.level); return { item, newDeck: deck.filter(i => i !== item) }; } };
  const showBonusScreen = () => { const bonus = BONUS_DATA[Math.floor(Math.random() * BONUS_DATA.length)]; setBonusCard(bonus); setScreen('bonus'); playSound('success'); };

  const drawCard = () => { let currentDeck = [...cardDeck]; if (currentDeck.length === 0) { let base = CARDS_DATA[selectedAudience?.id] || CARDS_DATA.default; if (selectedAudience?.id !== 'default' && !CARDS_DATA[selectedAudience?.id]) base = [...CARDS_DATA.default]; const data = filterContent(base); currentDeck = shuffleArray(data); } const { item, newDeck } = pickSmartItem(currentDeck); setCardDeck(newDeck); setCurrentCard(item); if (item.time) { setCardTimer(item.time); setIsCardTimerRunning(true); } else setCardTimer(null); if (item.isFinisher) setShowBonusButton(true); else setShowBonusButton(false); };
  const drawRoleplay = () => { let currentDeck = [...cardDeck]; if (currentDeck.length === 0) { currentDeck = shuffleArray(ROLEPLAY_DATA); } const item = currentDeck.pop(); setCardDeck(currentDeck); setCurrentCard(item); }; // Función simple para Roleplay
  const drawPosition = () => { let currentDeck = [...kamaDeck]; if (currentDeck.length === 0) { const data = filterContent(KAMA_POSITIONS); currentDeck = shuffleArray(data); } const { item, newDeck } = pickSmartItem(currentDeck); setKamaDeck(newDeck); setCurrentPos(item); };
  const nextNever = () => { let currentDeck = [...neverDeck]; if (currentDeck.length === 0) { const data = filterContent(NEVER_DATA); currentDeck = shuffleArray(data); } const { item, newDeck } = pickSmartItem(currentDeck); setNeverDeck(newDeck); setNeverText(item.text); setCurrentNeverLevel(item.level || 1); };
  const drawPhoto = () => { let currentDeck = [...photoDeck]; if (currentDeck.length === 0) { let base = PHOTO_DATA; const data = filterContent(base); currentDeck = shuffleArray(data); } const { item, newDeck } = pickSmartItem(currentDeck); setPhotoDeck(newDeck); setCurrentCard(item); playSound('shutter'); if (item.isFinisher) setShowBonusButton(true); else setShowBonusButton(false); };

  const rollDice = () => {
      if (isRolling) return; setIsRolling(true); playSound('click');
      let actionsPool, partsPool;
      if (isClimaxMode) { actionsPool = CLIMAX_ACTIONS; partsPool = CLIMAX_BODYPARTS; } else {
          let minLevel = 1; let maxLevel = 5;
          if (heatLevel === 'all') { minLevel = currentSessionHeat >= 4 ? 3 : Math.max(1, currentSessionHeat - 1); maxLevel = Math.min(5, currentSessionHeat + 1); }
          const filterDice = (arr) => { if (heatLevel !== 'all') return arr.filter(d => d.level <= heatLevel); let c = arr.filter(d => d.level >= minLevel && d.level <= maxLevel); return c.length === 0 ? arr : c; };
          actionsPool = filterDice(DICE_ACTIONS); partsPool = filterDice(DICE_BODYPARTS);
      }
      let counter = 0;
      const interval = setInterval(() => {
        const act = actionsPool[Math.floor(Math.random() * actionsPool.length)];
        const part = partsPool[Math.floor(Math.random() * partsPool.length)];
        setDice1(act.text.toUpperCase()); setDice2(part.text.toUpperCase());
        if (counter === 12) { setCurrentSessionHeat(Math.max(act.level, part.level)); if(act.isFinisher || isClimaxMode) setShowBonusButton(true); else setShowBonusButton(false); }
        counter++; if (counter > 12) { clearInterval(interval); setIsRolling(false); playSound('click'); }
      }, 80);
  };

  const toggleClimaxMode = () => { setIsClimaxMode(!isClimaxMode); };

  const spinRoulette = () => { setRouletteStatus('spinning'); setPunishment(""); playSound('spin'); setShotsFired([]); let chambers = Array(6).fill('empty'); let bullets = doubleBullet ? 2 : 1; for(let i=0; i<bullets; i++) { let pos; do { pos = Math.floor(Math.random()*6); } while(chambers[pos] === 'bullet'); chambers[pos] = 'bullet'; } setRouletteChambers(chambers); setCurrentChamberIdx(0); setTimeout(() => setRouletteStatus('playing'), 1500); };
  const pullTrigger = () => { if (rouletteStatus !== 'playing') return; setRouletteStatus('tension'); playSound('click'); setTimeout(() => { const result = rouletteChambers[currentChamberIdx]; const newShots = [...shotsFired]; if (result === 'bullet') { playSound('bang'); setRouletteStatus('dead'); newShots.push('bang'); setShotsFired(newShots); let deaths = heatLevel === 'all' ? ROULETTE_DB.filter(r => r.level >= Math.max(1, currentSessionHeat)) : ROULETTE_DB.filter(r => r.level <= heatLevel); if (deaths.length === 0) deaths = ROULETTE_DB; const chosen = deaths[Math.floor(Math.random() * deaths.length)]; setPunishment(chosen?.text || "Bebe todo."); setCurrentSessionHeat(chosen?.level || 1); if (chosen?.isFinisher) setShowBonusButton(true); else setShowBonusButton(false); } else { playSound('click'); setRouletteStatus('safe'); newShots.push('safe'); setShotsFired(newShots); setPunishment("¡Salvado! Pasa el turno."); setTimeout(() => { setRouletteStatus('playing'); setCurrentChamberIdx(p => (p+1)%6); }, 1500); } }, 1000); };

  const GameFooter = () => (<div className="p-6 pb-20 flex flex-col gap-3 flex-none">{showBonusButton && ( <Button onClick={showBonusScreen} variant="gold" className="animate-bounce"> <Sparkles className="w-5 h-5"/> ✨ DESBLOQUEAR BONUS </Button> )}<Button onClick={showBonusScreen} variant="secondary" size="small" className="opacity-70 hover:opacity-100"> <Flag className="w-4 h-4"/> CLÍMAX / FINALIZAR </Button></div>);
//////////////////////////////////////////////////////////////////////////
  // Renders
  const renderHome = () => (
    <div className="flex flex-col h-full justify-between pt-12 pb-6 animate-fade-in bg-[#0a0a0a] overflow-y-auto">
      <div className="text-center space-y-6 mt-10">
        <div className="relative inline-block"><div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 rounded-full animate-pulse"></div><Flame className="w-28 h-28 text-red-500 relative z-10 mx-auto" fill="currentColor" /></div>
        <div><h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 tracking-tight">INTIMOUS</h1><p className="text-pink-300 italic text-sm mt-4 font-serif">"La aplicación lo dirá por ti, solo disfruta"</p></div>
        <div className="mx-6 mt-6 space-y-3"><div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 text-center shadow-lg"><p className="font-bold text-blue-400 mb-1 flex items-center justify-center gap-2"><Wine size={14}/> PREPARA LOS TRAGOS</p><p className="opacity-80">Recomendamos tener alcohol (shots/cerveza) para los castigos.</p></div><div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400 text-center shadow-lg"><p className="font-bold text-pink-400 mb-1 flex items-center justify-center gap-2"><Lightbulb size={14}/> KIT DE PLACER</p><p className="opacity-80">Ten a mano: Hielo, Cera, Corbatas, Juguetes y Aceite.</p></div></div>
      </div>
      <div className="space-y-6 px-8 pb-8 mt-auto"><Button onClick={() => setScreen('audience')}><Play fill="currentColor" className="w-5 h-5" /> ENTRAR AL JUEGO</Button><div className="text-[10px] text-center text-gray-600 font-mono">v46.0 • Much Content<br/><span className="opacity-50">by JTA</span></div></div>
    </div>
  );

  const renderAudience = () => (<div className="flex flex-col h-full animate-fade-in overflow-hidden"><div className="flex items-center p-4 pb-2 pt-16 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-2xl font-bold text-white tracking-tight">Selecciona Vínculo</h2></div><div className="flex-1 overflow-y-auto p-4 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{AUDIENCES.map((aud) => (<CardItem key={aud.id} {...aud} onClick={() => handleAudienceSelect(aud)} />))}</div></div>);
  const renderGames = () => (<div className="flex flex-col h-full animate-fade-in overflow-hidden"><div className="flex items-center p-4 pt-16 border-b border-gray-800/50 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700"><ArrowLeft className="text-white w-5 h-5" /></button><div className="ml-4"><h2 className="text-xl font-bold text-white">Elige el Caos</h2><div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${selectedAudience.bg} ${selectedAudience.color}`}><selectedAudience.icon size={10} />{selectedAudience.label}</div></div></div><div className="px-4 pt-4 pb-0 flex-none"><div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider ml-1">Nivel de Intensidad</div><HeatSelector currentLevel={heatLevel} setLevel={setHeatLevel} /></div><div className="flex-1 overflow-y-auto p-4 space-y-4 pt-4 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{GAMES.map((game) => (<div key={game.id} onClick={() => handleGameSelect(game.id)} className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 hover:border-pink-500/50 transition-all active:scale-95 cursor-pointer group"><div className="p-3 bg-gray-950 rounded-xl shrink-0 text-pink-500 shadow-inner"><game.icon size={28} /></div><div className="flex-1 min-w-0"><h3 className="text-lg font-bold text-white leading-tight mb-1">{game.label}</h3><p className="text-sm text-gray-400 leading-snug">{game.desc}</p></div></div>))}</div></div>);
  const renderBonusScreen = () => (<div className="flex flex-col h-full animate-fade-in bg-gradient-to-br from-purple-900 to-black overflow-hidden items-center justify-center p-6 relative"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div><div className="z-10 w-full max-w-md text-center"><div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-pulse"><Gift className="w-12 h-12 text-purple-200" /></div><h2 className="text-4xl font-black text-white mb-2">¡BONUS FINAL!</h2><p className="text-purple-300 text-sm uppercase tracking-widest mb-8">Para la próxima sesión o ahora mismo...</p><div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-all"><div className="mb-4 flex justify-center text-purple-300">{bonusCard?.icon}</div><h3 className="text-2xl font-bold text-white mb-4">{bonusCard?.title}</h3><p className="text-gray-200 text-xl leading-relaxed">{bonusCard?.text}</p></div><div className="mt-12 space-y-4 w-full max-w-xs mx-auto"><Button onClick={() => setScreen('home')} variant="primary">VOLVER AL INICIO</Button></div></div></div>);

  const renderDiceGame = () => (<div className={`flex flex-col h-full animate-fade-in relative overflow-hidden transition-colors duration-500 ${isClimaxMode ? 'bg-red-950/50' : 'bg-black/40'}`}><div className="flex items-center p-4 pt-16 absolute top-0 w-full z-10"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full backdrop-blur-md"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white drop-shadow-md">Dados Calientes</h2></div><div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8"><div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 items-center justify-center perspective-1000"><div className={`h-32 w-full md:w-64 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? 'rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'} ${isClimaxMode ? 'bg-gradient-to-br from-red-700 to-red-950 shadow-[0_0_50px_red]' : 'bg-gradient-to-br from-pink-600 to-purple-900'}`}>{dice1}</div><div className="text-center text-gray-500 font-bold text-xs tracking-[0.3em] md:hidden">{isClimaxMode ? 'EN' : 'EN'}</div><div className={`h-32 w-full md:w-64 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(234,88,12,0.25)] text-3xl font-black text-white border-t border-white/20 transition-all duration-150 ease-out transform ${isRolling ? '-rotate-x-12 scale-95 opacity-80 blur-[1px]' : 'rotate-x-0 scale-100'} ${isClimaxMode ? 'bg-gradient-to-br from-red-700 to-red-950 shadow-[0_0_50px_red]' : 'bg-gradient-to-br from-orange-600 to-red-900'}`}>{dice2}</div></div>{!isRolling && <PenaltyBadge level={currentSessionHeat} />}</div><div className="px-6 pb-4 flex flex-col gap-4 w-full max-w-md mx-auto"><Button onClick={toggleClimaxMode} variant={isClimaxMode ? "primary" : "secondary"} size="small" className="border border-red-500/50">{isClimaxMode ? "🔙 MODO NORMAL" : "💦 ¿LISTOS PARA TERMINAR?"}</Button><Button onClick={rollDice} variant={isClimaxMode ? "danger" : "primary"}>{isRolling ? '🎲 ...' : (isClimaxMode ? '🔥 FINALIZAR 🔥' : 'LANZAR')}</Button></div><GameFooter/></div>);
  const renderCardBase = (title, action, deckFn) => (<div className="flex flex-col h-full animate-fade-in overflow-hidden"><div className="flex items-center p-4 pt-16 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">{title}</h2></div><div className="flex-1 flex items-center justify-center p-6 pb-32 overflow-y-auto">{!currentCard ? (<div onClick={deckFn} className="w-full max-w-md h-96 bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors active:scale-95"><Zap className="text-gray-600 w-20 h-20 mb-6" /><p className="text-gray-400 font-bold text-xl">{action}</p><span className="text-xs text-gray-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'CAOS' : heatLevel}</span></div>) : (<div className="w-full max-w-md h-auto min-h-[450px] relative animate-flip-in"><div className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 ${currentCard.type === 'truth' ? 'bg-gradient-to-br from-blue-600 to-indigo-900' : 'bg-gradient-to-br from-red-600 to-pink-900'}`}><span className="text-xs font-black uppercase tracking-widest text-white/70 mb-8 bg-black/30 px-4 py-1.5 rounded-full">{currentCard.type === 'truth' ? 'VERDAD' : (title === 'Paparazzi X' ? 'FOTO/POSE' : title === 'Roleplay Roulette' ? 'ROL' : 'RETO')}</span><h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg mb-4">{currentCard.text}</h3>{currentCard.time && (<div className="mb-6 w-full"><div className={`text-5xl font-black font-mono mb-4 ${cardTimer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{cardTimer}s</div><Button onClick={() => setIsCardTimerRunning(!isCardTimerRunning)} variant={isCardTimerRunning ? "secondary" : "green"} className="py-2 text-sm">{isCardTimerRunning ? <><Pause size={16}/> PAUSAR</> : <><Play size={16}/> INICIAR</>}</Button></div>)}<PenaltyBadge level={currentCard.level} /><div className="mt-auto flex gap-1 justify-center mb-4">{[...Array(currentCard.level)].map((_,i)=><Flame key={i} className="w-4 h-4 text-orange-500"/>)}</div><button onClick={deckFn} className="w-full px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold hover:bg-white/20 border border-white/10 transition-all active:scale-95">SIGUIENTE</button></div></div>)}</div><GameFooter/></div>);

  const renderKamaGame = () => (<div className="flex flex-col h-full animate-fade-in bg-purple-950/20 overflow-hidden"><div className="flex items-center p-4 pt-16 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Kamasutra</h2></div><div className="flex-1 flex items-center justify-center p-6 pb-32 overflow-y-auto">{!currentPos ? (<div onClick={drawPosition} className="w-full max-w-md h-96 bg-purple-900/20 rounded-3xl border-2 border-dashed border-purple-500/50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/30 transition-colors active:scale-95"><Layers className="text-purple-400 w-20 h-20 mb-6" /><p className="text-purple-200 font-bold text-xl">Sugerir Posición</p><span className="text-xs text-purple-400 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel} • {kamaDeck.length} restantes</span></div>) : (<div className="w-full max-w-md h-[450px] relative animate-flip-in"><div className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-purple-900 to-indigo-900"><div className="flex gap-1 mb-4">{[...Array(currentPos.level)].map((_, i) => (<Flame key={i} className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />))}</div><div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-purple-500/30 shadow-inner"><img src={`/${currentPos.img}`} onError={(e) => e.target.style.display='none'} alt={currentPos.name} className="w-full h-full object-contain p-2 opacity-90" /><ImageIcon className="text-purple-500/50 w-16 h-16 absolute -z-10" /></div><h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-purple-200 text-lg leading-relaxed">{currentPos.desc}</p><button onClick={drawPosition} className="mt-auto w-full py-3 bg-white/10 backdrop-blur-md rounded-xl text-white font-bold hover:bg-white/20 border border-white/10 transition-all">SIGUIENTE</button></div></div>)}</div><GameFooter/></div>);
  const renderTimerGame = () => (<div className="flex flex-col h-full animate-fade-in bg-emerald-950/20 overflow-hidden"><div className="flex items-center p-4 pt-16 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Rally</h2></div><div className="flex-1 flex flex-col items-center justify-start p-6 pt-2 pb-32 overflow-y-auto"><div className="w-full max-w-md flex items-center justify-between mb-4 bg-gray-900/50 p-4 rounded-2xl"><div className="flex items-center gap-2"><Timer className="text-emerald-400 w-6 h-6" /><span className={`text-3xl font-mono font-black ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timer}s</span></div></div><div className="w-full max-w-md flex-1 flex items-center justify-center relative">{!currentPos ? (<div onClick={() => {if(!isTimerActive) drawPosition(); setIsTimerActive(!isTimerActive)}} className="w-full h-full bg-emerald-900/10 rounded-3xl border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-900/20 transition-all"><Play className="text-emerald-500 w-20 h-20 mb-4 ml-2" /><p className="text-emerald-200 font-bold text-xl">INICIAR RALLY</p><span className="text-xs text-emerald-500 mt-2 font-mono">Nivel {heatLevel === 'all' ? 'ALEATORIO' : heatLevel}</span></div>) : (<div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl border-t border-white/10 bg-gradient-to-br from-emerald-900 to-teal-900 animate-flip-in relative overflow-hidden"><div className="absolute bottom-0 left-0 h-2 bg-emerald-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer/60)*100}%` }}></div>{currentPos.img ? (<img src={currentPos.img} alt={currentPos.name} className="w-40 h-40 object-contain mb-4 opacity-90" />) : null}<h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">{currentPos.name}</h3><p className="text-emerald-100 text-lg leading-relaxed">{currentPos.desc}</p></div>)}</div></div><div className="px-6 flex gap-4 flex-none w-full max-w-md mx-auto"><Button onClick={() => setIsTimerActive(!isTimerActive)} variant={isTimerActive ? "secondary" : "green"}>{isTimerActive ? "PAUSAR" : "CONTINUAR"}</Button><button onClick={() => {drawPosition(); setTimer(60)}} className="bg-gray-800 p-4 rounded-2xl text-white border border-gray-700 hover:bg-gray-700"><RotateCcw className="w-6 h-6" /></button></div><GameFooter/></div>);
  const renderNeverGame = () => (<div className="flex flex-col h-full animate-fade-in bg-blue-950/20 overflow-hidden"><div className="flex items-center p-4 pt-16 flex-none"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Yo Nunca</h2></div><div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 overflow-y-auto pb-32"><div className="w-full max-w-md h-80 bg-gradient-to-b from-blue-800 to-blue-950 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><Beer className="w-12 h-12 text-blue-400 mb-6 opacity-80" /><h3 className="text-2xl font-bold text-white leading-relaxed">"{neverText}"</h3></div><p className="text-gray-400 text-sm text-center px-8">Si lo has hecho, <span className="text-blue-400 font-bold">cumple la penitencia</span> (beber o prenda).</p><PenaltyBadge level={currentNeverLevel} /></div><div className="p-6 pb-4 flex-none w-full max-w-md mx-auto"><Button onClick={nextNever} className="bg-blue-600 hover:bg-blue-700 border-blue-400">SIGUIENTE</Button></div><GameFooter/></div>);
  const renderRoulette = () => (<div className={`flex flex-col h-full animate-fade-in transition-colors duration-500 ${rouletteStatus === 'dead' ? 'bg-red-950' : 'bg-red-950/20'} overflow-hidden`}><div className="flex items-center p-4 justify-between pt-16 flex-none"><div className="flex items-center"><button onClick={goBack} className="p-3 bg-gray-800/50 rounded-full"><ArrowLeft className="text-white w-5 h-5" /></button><h2 className="ml-4 text-xl font-bold text-white">Ruleta</h2></div>{rouletteStatus === 'ready' && (<button onClick={() => setDoubleBullet(!doubleBullet)} className={`px-3 py-1 rounded-full text-xs font-bold border ${doubleBullet ? 'bg-red-600 border-red-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}>{doubleBullet ? '2 BALAS 💀' : '1 BALA'}</button>)}</div><div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto pb-32"><div className={`relative w-64 h-64 mb-6 ${rouletteStatus === 'dead' ? 'animate-shake' : ''} ${rouletteStatus === 'tension' ? 'animate-pulse' : ''}`}><div className={`w-full h-full rounded-full border-8 border-gray-800 flex items-center justify-center relative transition-transform duration-1000 ease-out ${rouletteStatus === 'spinning' ? 'rotate-[1080deg]' : ''}`} style={{ transform: rouletteStatus === 'playing' || rouletteStatus === 'tension' ? `rotate(${shotsFired.length * 60}deg)` : '' }}>{[0, 60, 120, 180, 240, 300].map((deg, index) => { const isShot = index < shotsFired.length; return (<div key={index} className={`absolute w-12 h-12 rounded-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[50%_120px] border-2 border-gray-700 flex items-center justify-center ${isShot ? 'bg-gray-900 opacity-30' : 'bg-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.1)]'} ${index === shotsFired.length && (rouletteStatus === 'playing' || rouletteStatus === 'tension') ? 'border-yellow-500 shadow-[0_0_20px_yellow]' : ''}`} style={{ transform: `rotate(${deg}deg) translate(0, -110px)` }}>{isShot && <div className="w-3 h-3 rounded-full bg-black"></div>}</div>); })}<div className="absolute w-24 h-24 bg-gray-900 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-inner z-10">{rouletteStatus === 'dead' ? <Skull className="text-red-500 w-14 h-14 animate-bounce"/> : rouletteStatus === 'tension' ? <div className="text-yellow-500 font-black text-4xl animate-pulse">!</div> : <Crosshair className="text-gray-600 w-12 h-12"/>}</div></div><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-4 h-6 bg-red-600 rounded-b-lg shadow-[0_0_15px_red] z-0"></div></div><div className={`h-40 flex items-center justify-center text-center px-4 w-full max-w-md bg-black/40 rounded-xl border ${rouletteStatus === 'dead' ? 'border-red-500 bg-red-900/20' : 'border-white/5'}`}>{rouletteStatus === 'ready' && <div className="space-y-2"><p className="text-gray-300 font-bold text-lg">¿Quién empieza?</p><p className="text-gray-500 text-sm">La bala se queda en su lugar. <br/>La probabilidad de morir aumenta en cada turno.</p></div>}{rouletteStatus === 'spinning' && <p className="text-yellow-500 font-bold animate-pulse text-xl tracking-widest">CARGANDO...</p>}{(rouletteStatus === 'playing' || rouletteStatus === 'tension') && (<div className="space-y-1"><p className="text-white font-bold text-lg">Pasa el celular.</p><p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tu turno de apretar</p></div>)}{rouletteStatus === 'dead' && (<div className="animate-bounce"><p className="text-red-600 font-black text-5xl mb-2 tracking-tighter">¡BANG!</p><p className="text-white text-md bg-red-900/80 p-3 rounded-lg border border-red-500 shadow-[0_0_20px_red]">{punishment}</p></div>)}{rouletteStatus === 'safe' && (<div className="animate-pulse"><ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-2"/><p className="text-green-400 font-black text-3xl tracking-widest">CLICK</p><p className="text-gray-400 text-xs mt-1">Estás a salvo... por ahora.</p></div>)}</div></div><div className="p-6 pb-4 space-y-4 flex-none w-full max-w-md mx-auto">{rouletteStatus === 'ready' && <Button onClick={spinRoulette} variant="secondary">GIRAR CILINDRO</Button>}{(rouletteStatus === 'playing' || rouletteStatus === 'tension') && <Button onClick={pullTrigger} disabled={rouletteStatus === 'tension'} variant="danger" className={rouletteStatus === 'tension' ? 'opacity-50' : ''}>APRETAR GATILLO</Button>}{rouletteStatus === 'dead' && <Button onClick={() => setRouletteStatus('ready')} variant="secondary">REINICIAR JUEGO</Button>}{rouletteStatus === 'safe' && <Button onClick={() => setRouletteStatus('playing')} variant="primary">PASAR AL SIGUIENTE</Button>}</div><GameFooter/></div>);

  return (
    <div className="w-full h-[100dvh] bg-black text-slate-200 font-sans overflow-hidden flex justify-center selection:bg-pink-500/30 pt-safe pb-safe">
      <div className="w-full max-w-7xl h-full bg-[#0a0a0a] relative flex flex-col shadow-2xl border-x border-gray-900 md:rounded-2xl md:h-[95vh] md:my-auto md:border md:border-gray-800">
        {screen === 'home' && renderHome()}
        {screen === 'audience' && renderAudience()}
        {screen === 'games' && renderGames()}
        {screen === 'bonus' && renderBonusScreen()}
        {screen === 'play-dice' && renderDiceGame()}
        {screen === 'play-cards' && renderCardBase('Verdad o Reto', 'Sacar Carta', drawCard)}
        {screen === 'play-photo' && renderCardBase('Paparazzi X', 'Sacar Reto', drawPhoto)}
        {screen === 'play-kama' && renderKamaGame()}
        {screen === 'play-timer' && renderTimerGame()}
        {screen === 'play-never' && renderNeverGame()}
        {screen === 'play-roulette' && renderRoulette()}
        {screen === 'play-roleplay' && renderCardBase('Roleplay Roulette', 'Generar Rol', drawRoleplay)}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes flip-in { from { transform: rotateY(90deg) scale(0.9); opacity: 0; } to { transform: rotateY(0) scale(1); opacity: 1; } }
        .animate-flip-in { animation: flip-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .-rotate-x-12 { transform: rotateX(-12deg); }
        @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 30% { transform: translate(3px, 2px) rotate(0deg); } 40% { transform: translate(1px, -1px) rotate(1deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 60% { transform: translate(-3px, 1px) rotate(0deg); } 70% { transform: translate(3px, 1px) rotate(-1deg); } 80% { transform: translate(-1px, -1px) rotate(1deg); } 90% { transform: translate(1px, 2px) rotate(0deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } } .animate-shake { animation: shake 0.5s; }
      `}</style>
    </div>
  );
}