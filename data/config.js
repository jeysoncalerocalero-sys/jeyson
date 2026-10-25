
/* AJUSTES DE JEYSON */

window.CONFIG = {
  geminiKey: '',

  modelo: 'gemini-2.5-flash',

  modelosAlternos: [
    'gemini-2.5-flash',
    'gemini-2.0-flash'
  ],

  usarIA: true,
  temperatura: 0.8,
  maxTokens: 400,
  thinkingBudget: 0,

  promptExtra: 'Responde corto, como en WhatsApp. Máximo 3 frases.',

  juego: {
    vidas: 3,
    preguntasPorOleada: 5,
    segundos: [15, 13, 11, 9, 7],
    opciones: [3, 4, 4, 4, 4],
    puntosBase: 10,
    poderesPorPartida: 3
  }
};
