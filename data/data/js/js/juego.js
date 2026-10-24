/* MINIJUEGO "EL TALLER" + LA CASA */

window.JZ_JUEGO = (function () {
  const D = window.JEJSON || {}, C = window.CONFIG || {};
  const $ = id => document.getElementById(id);
  const rnd = a => a[Math.floor(Math.random() * a.length)];
  const rev = a => a.slice().sort(() => Math.random() - 0.5);
  let JZ, cont, partida = null, tick = null;

  const cfg = () => C.juego || {};
  const segs = n => (cfg().segundos || [15,13,11,9,7])[Math.min(n, 4)] || 7;
  const nOps = n => (cfg().opciones || [3,4,4,4,4])[Math.min(n, 4)] || 4;

  function montar(core){ JZ = core; cont = $('tab-jugar'); }

  function banco(tier){ return ((D.trivia || {})[tier] || []).concat(personal()); }

  function personal(){
    const g = JZ.S.gustos || {}, out = [];
    const campos = ['color','animal','comida','musica','lugar'];
    const otros = ['azul','negro','verde','rojo','gris','blanco','amarillo','violeta','naranja','rosado','celeste','dorado'];
    campos.forEach(c => {
      const v = g[c];
      if (!v) return;
      const malos = rev(otros.filter(x => x.toLowerCase() !== String(v).toLowerCase())).slice(0, 3);
      const ops = rev([v].concat(malos));
      out.push({ p:'¿Cuál era tu ' + c + '?', o: ops, r: ops.indexOf(v) });
    });
    return out;
  }

  function nuevaPregunta(oleada){
    const tier = oleada <= 1 ? 'facil' : oleada <= 3 ? 'medio' : 'dificil';
    const lista = banco(tier);
    let q = rnd(lista), guardia = 0;
    while (partida.usadas.includes(q.p) && guardia++ < 30) q = rnd(lista);
    partida.usadas.push(q.p);
    const ops = q.o.slice(0, nOps(oleada));
    const correcta = q.o[q.r];
    const mezcla = rev(ops);
    return { p:q.p, o:mezcla, r:mezcla.indexOf(correcta), tier:tier };
  }

  function empezar(){
    if (partida && partida.vivo) return;
    partida = { oleada:1, enOleada:0, vidas:(cfg().vidas||3), racha:0, puntos:0, usadas:[],
                poderes:(cfg().poderesPorPartida||3), congelado:0, vivo:true, bien:0, mal:0,
                q:null, bloqueado:false, restante:0 };
    JZ.S.partidas++;
    JZ.anim.play('jugar', 'vamos. te pregunto y tú me dices. sin miedo.');
    pintar();
    siguiente();
  }

  function siguiente(){
    if (!partida || !partida.vivo) return;
    if (partida.enOleada >= (cfg().preguntasPorOleada || 5)){
      partida.enOleada = 0;
      partida.oleada++;
      partida.poderes++;
      partida.puntos += 20 * partida.oleada;
      JZ.aviso('oleada ' + partida.oleada + ' desbloqueada');
      JZ.confeti();
      if (partida.oleada >= 5) JZ.logro('oleada5');
    }
    if (partida.vidas <= 0){ terminar(); return; }
    partida.q = nuevaPregunta(partida.oleada);
    partida.bloqueado = false;
    partida.enOleada++;
    pintar();
  }

  function arrancarReloj(){
    clearInterval(tick);
    const total = segs(partida.oleada - 1);
    partida.restante = total;
    tick = setInterval(() => {
      if (!partida || !partida.vivo || partida.bloqueado) return;
      if (partida.congelado > 0){ partida.congelado--; return; }
      partida.restante -= 0.25;
      const b = $('jTiempo');
      if (b) b.style.width = Math.max(0, (partida.restante / total) * 100) + '%';
      if (partida.restante <= 0){ clearInterval(tick); fallar(true); }
    }, 250);
  }

  function responder(i){
    if (!partida || partida.bloqueado) return;
    partida.bloqueado = true;
    clearInterval(tick);
    const q = partida.q;
    const ops = cont.querySelectorAll('.op');
    ops[q.r].classList.add('ok');
    if (i !== q.r){ ops[i].classList.add('no'); fallar(false); return; }

    partida.racha++;
    partida.bien++;
    JZ.S.mejorRacha = Math.max(JZ.S.mejorRacha, partida.racha);
    if (partida.racha >= 10) JZ.logro('racha10');
    const mult = Math.min(4, 1 + Math.floor(partida.racha / 3));
    partida.puntos += (cfg().puntosBase || 10) * mult;
    JZ.S.animo = Math.min(100, JZ.S.animo + 2);
    JZ.anim.decir(rnd(D.frasesBien || ['bien.']) + '  (x' + mult + ')');
    setTimeout(siguiente, 850);
  }

  function fallar(tiempo){
    partida.racha = 0;
    partida.mal++;
    partida.vidas--;
    if (partida.vidas <= 0){ terminar(); return; }
    partida.bloqueado = true;
    JZ.anim.decir(tiempo ? 'se acabó el tiempo.' : rnd(D.frasesMal || ['no.']));
    setTimeout(siguiente, 900);
  }

  function terminar(){
    if (!partida) return;
    partida.vivo = false;
    clearInterval(tick);
    const b = JZ.bonos();
    const total = Math.floor(partida.puntos / 12 * b.matMult);
    const mats = D.materiales || [];
    for (let i = 0; i < total; i++){
      const m = rnd(mats);
      if (m) JZ.S.mat[m.id] = (JZ.S.mat[m.id] || 0) + 1;
    }
    JZ.S.puntos += partida.puntos;
    JZ.guardar();
    JZ.anim.play('abrazo', 'eso fue todo. me cansé pero valió.');
    pintar();
    JZ.overlay(
      '<div class="ovHead"><b>se acabó la partida</b><button class="btn ghost" id="ovX">cerrar</button></div>' +
      '<div class="card"><div class="kv">' +
      'oleada alcanzada: <b>' + partida.oleada + '</b><br>' +
      'aciertos: <b>' + partida.bien + '</b> · fallos: <b>' + partida.mal + '</b><br>' +
      'mejor racha: <b>' + partida.racha + '</b><br>' +
      'puntos de la partida: <b>' + partida.puntos + '</b><br>' +
      'materiales ganados: <b>' + total + '</b>' +
      '</div><div class="tip" style="margin-top:8px">con eso puedes construir su casa.</div></div>'
    );
  }

  function poder(tipo){
    if (!partida || !partida.vivo || partida.bloqueado || partida.poderes <= 0) return;
    const q = partida.q; if (!q) return;
    if (tipo === 'cincuenta'){
      const malas = q.o.map((_, i) => i).filter(i => i !== q.r);
      rev(malas).slice(0, 2).forEach(i => cont.querySelectorAll('.op')[i].classList.add('apagada'));
    } else if (tipo === 'congelar'){
      partida.congelado = 20;
    } else if (tipo === 'saltar'){
      partida.bloqueado = true; clearInterval(tick); partida.poderes--; pintar(); setTimeout(siguiente, 200); return;
    } else if (tipo === 'pista'){
      JZ.anim.decir('pista: la respuesta tiene ' + String(q.o[q.r]).length + ' letras.');
      return;
    }
    partida.poderes--;
    pintar();
  }

  function construir(id){
    const p = (D.casa || []).find(x => x.id === id); if (!p) return;
    const niv = (JZ.S.casa[id] || 0);
    if (niv >= 3) return;
    const coste = p.coste[niv];
    for (const k in coste) if ((JZ.S.mat[k] || 0) < coste[k]) { JZ.aviso('te falta ' + k); return; }
    for (const k in coste) JZ.S.mat[k] -= coste[k];
    JZ.S.casa[id] = niv + 1;
    JZ.guardar();
    JZ.anim.play('jugar', 'quedó linda la ' + p.n + '.');
    JZ.confeti();
    if ((D.casa || []).every(x => (JZ.S.casa[x.id] || 0) >= 1)) JZ.logro('casa_completa');
    if ((D.casa || []).every(x => (JZ.S.casa[x.id] || 0) >= 3)) JZ.logro('imperio');
    pintar();
  }

  function pintar(){
    if (!cont) return;
    if (!partida) partida = { vivo:false, oleada:1, vidas:(cfg().vidas||3), racha:0, puntos:0, poderes:0, q:null, bloqueado:true };
    const mats = (D.materiales || []).map(m =>
      '<span>' + m.ico + ' <b>' + (JZ.S.mat[m.id] || 0) + '</b></span>').join('');

    let html = '';
    html += '<div class="card"><div class="q">el taller</div>' +
      '<div class="hint">responde rápido. cada oleada es más difícil: menos tiempo y más opciones. ' +
      'con los materiales construyes su casa abajo.</div>' +
      '<div class="jhead">' +
      '<div class="jstat"><b>' + (partida.vivo ? partida.oleada : '—') + '</b>oleada</div>' +
      '<div class="jstat"><b>' + '❤'.repeat(Math.max(0, partida.vidas)) + '</b>vidas</div>' +
      '<div class="jstat"><b>x' + Math.min(4, 1 + Math.floor((partida.racha || 0) / 3)) + '</b>racha ' + (partida.racha || 0) + '</div>' +
      '<div class="jstat"><b>' + (partida.puntos || 0) + '</b>puntos</div>' +
      '</div>';

    if (partida.vivo && partida.q){
      html += '<div class="q" style="font-size:14.5px">' + partida.q.p + '</div>' +
        '<div class="opciones">' + partida.q.o.map((o, i) => '<button class="op" data-i="' + i + '">' + o + '</button>').join('') + '</div>' +
        '<div class="tiempo"><i id="jTiempo" style="width:100%"></i></div>' +
        '<div class="poderes">' +
        '<button class="btn" data-p="cincuenta">50/50</button>' +
        '<button class="btn" data-p="congelar">congelar</button>' +
        '<button class="btn" data-p="saltar">saltar</button>' +
        '<button class="btn" data-p="pista">pista</button>' +
        '</div>' +
        '<div class="tip" style="margin-top:8px">movimientos locos disponibles: <b>' + partida.poderes + '</b></div>';
    } else {
      html += '<button class="btn solid" id="jEmpezar" style="width:100%">' + (partida.oleada > 1 ? 'otra partida' : 'empezar') + '</button>';
    }
    html += '</div>';

    const casa = D.casa || [];
    html += '<div class="card"><div class="q">su casa</div>' +
      '<div class="hint">esto es lo que se construye con lo que ganas. cada pieza le da algo bueno de verdad.</div>' +
      '<div class="patio">' + casa.map(p => '<span class="' + ((JZ.S.casa[p.id] || 0) > 0 ? 'on' : '') + '">' + p.ico + '</span>').join('') + '</div>' +
      '<div class="mats">' + mats + '</div>' +
      '<div class="casaGrid">' + casa.map(p => {
        const niv = JZ.S.casa[p.id] || 0;
        const coste = niv < 3 ? p.coste[niv] : null;
        const puede = coste && Object.keys(coste).every(k => (JZ.S.mat[k] || 0) >= coste[k]);
        return '<div class="pieza ' + (niv >= 3 ? 'tope' : '') + '">' +
          '<div class="ico">' + p.ico + '</div>' +
          '<div class="nom">' + p.n + '</div>' +
          '<div class="bon">' + p.bon + '</div>' +
          '<div class="niv">' + [0,1,2].map(i => '<i class="' + (i < niv ? 'on' : '') + '"></i>').join('') + '</div>' +
          (coste ? '<div class="cos">' + Object.keys(coste).map(k => coste[k] + ' ' + k).join(' · ') + '</div>' +
            '<button class="btn" data-c="' + p.id + '" ' + (puede ? '' : 'disabled') + '>' +
            (niv === 0 ? 'construir' : 'mejorar') + '</button>'
            : '<div class="cos">nivel máximo</div><button class="btn" disabled>listo</button>') +
          '</div>';
      }).join('') + '</div></div>';

    cont.innerHTML = html;

    const e = $('jEmpezar'); if (e) e.onclick = empezar;
    cont.querySelectorAll('.op').forEach(o => o.onclick = () => responder(+o.dataset.i));
    cont.querySelectorAll('[data-p]').forEach(b => b.onclick = () => poder(b.dataset.p));
    cont.querySelectorAll('[data-c]').forEach(b => b.onclick = () => construir(b.dataset.c));

    if (partida.vivo && partida.q && !partida.bloqueado) arrancarReloj();
  }

  return { montar: montar, pintar: pintar };
})();
