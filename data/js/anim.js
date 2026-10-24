/* ANIMACIONES — no lo tocas */

window.JZ_ANIM = (function () {
  let escena, char, prop, corazones, bubble, timer, timerFrio;

  const PROPS = {
    comer:'🍲', abrigo:'🧥', arropar:'🛏️', cafe:'☕',
    guitarra:'🎸', abrazo:'❤️', jugar:'🎲', frio:'🧣'
  };

  function montar(){
    escena = document.getElementById('escena');
    char = document.getElementById('char');
    prop = document.getElementById('prop');
    corazones = document.getElementById('corazones');
    bubble = document.getElementById('bubble');
  }

  function play(nombre, texto){
    if (!escena || !char) return;
    escena.dataset.anim = nombre;
    if (prop) prop.textContent = PROPS[nombre] || '';
    if (texto && bubble) bubble.textContent = texto;
    clearTimeout(timer);
    const dur = nombre === 'abrazo' ? 1900 : 2200;
    timer = setTimeout(() => { escena.dataset.anim = ''; if (prop) prop.textContent = ''; }, dur);
    if (nombre === 'abrazo') corazones_();
  }

  function corazones_(){
    if (!corazones) return;
    corazones.innerHTML = '';
    for (let i = 0; i < 7; i++){
      const h = document.createElement('i');
      h.textContent = '❤';
      h.style.left = (30 + Math.random() * 40) + '%';
      h.style.animationDelay = (Math.random() * 0.6) + 's';
      corazones.appendChild(h);
    }
    setTimeout(() => { if (corazones) corazones.innerHTML = ''; }, 2400);
  }

  function mood(animo, dormido, frio){
    if (!char) return;
    char.classList.toggle('mimir', !!dormido);
    char.classList.toggle('triste', !dormido && animo < 45);
    if (escena) escena.style.filter = dormido ? 'grayscale(.8) brightness(.75)' : 'none';
    if (frio && !dormido && !escena.dataset.anim){
      clearTimeout(timerFrio);
      escena.dataset.anim = 'frio';
      if (prop) prop.textContent = PROPS.frio;
      timerFrio = setTimeout(() => { escena.dataset.anim = ''; if (prop) prop.textContent = ''; }, 1400);
    }
  }

  function decir(txt){ if (bubble) bubble.textContent = txt; }

  return { montar: montar, play: play, mood: mood, decir: decir };
})();
