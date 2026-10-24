/* AJUSTES — este es el archivo que tú tocas */

window.CONFIG = {

  /* Clave gratis de Gemini: https://aistudio.google.com/apikey
     Si la dejas vacía, todo funciona igual, pero sin IA. */
  geminiKey: '',

  modelo: 'gemini-3.6-flash',

  /* Respaldo por si Google cambia los nombres. */
  modelosAlternos: ['gemini-3.8-flash','gemini-3.5-flash-lite','gemini-3.1-flash-lite','gemini-2.5-flash'],

  usarIA: true,
  temperatura: 0.95,
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
