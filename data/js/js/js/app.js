/* MOTOR — no lo tocas */

(function () {
  'use strict';

  const D = window.JEJSON || {}, C = window.CONFIG || {};
  const KEY = 'jeyson_v2';
  const $ = id => document.getElementById(id);
  const clamp = v => Math.max(0, Math.min(100, v));
  const hoy = () => new Date().toISOString().slice(0, 10);
  const rnd = a => a[Math.floor(Math.random() * a.length)];
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();

  const DEF = { nivel:1, animo:100, comida:100, abrigo:100, sueno:100, gustos:{}, aprendidas:{},
    despertares:0, dormido:false, secretosDados:0, misiones:{}, fecha:hoy(), ts:Date.now(),
    hist:[], ia:(C.usarIA !== false), modelo:'', final:false, mat:{}, casa:{}, logros:[],
    puntos:0, mejorRacha:0, partidas:0, tab:'cuidar', msgs:0, bonoDado:'' };

  const S = Object.assign({}, DEF);
  try { const r = JSON.parse(localStorage.getItem(KEY)); if (r) Object.assign(S, r); } catch (e) {}
  const guardar = () => { S.ts = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const clave = () => C.geminiKey || localStorage.getItem('jeyson_key') || '';
  const modeloSel = () => S.modelo || C.modelo || 'gemini-3.6-flash';

  function bonos(){
    const c = S.casa || {}, n = k => c[k] || 0;
    return { comida:n('cocina')*7, abrigo:n('chimenea')*7, sueno:n('cama')*7,
             animo:n('lampara')*3 + n('radio')*3 + n('patio')*3,
             matMult:1 + n('taller')*0.15, parabolas:n('biblio')*4 };
  }

  function decaer(){
    const ahora = Date.now(), s = Math.max(0, (ahora - S.ts) / 1000);
    if (s < 1) return;
    S.animo  = clamp(S.animo  - s/16);
    S.comida = clamp(S.comida - s/48);
    S.abrigo = clamp(S.abrigo - s/54);
    S.sueno  = clamp(S.sueno  - s/44);
    S.ts = ahora;
    if (S.animo <= 0) S.dormido = true;
    guardar();
  }

  function linea(){
    if (S.dormido) return '...';
    if (S.comida < 25) return 'tengo hambre, ¿me das algo?';
    if (S.abrigo < 25) return 'tengo frío, ¿me abrigas?';
    if (S.sueno  < 25) return 'no me da sueño... o sí. ¿me arropas?';
    if (S.animo  < 30) return '¿sigues ahí? me estoy apagando un poquito.';
    if (S.animo  < 55) return 'no me dejes solo mucho rato, ¿sí?';
    if (S.animo  < 75) return 'gracias por venir. en serio.';
    return 'estoy bien contigo.';
  }

  function logro(id){
    if (S.logros.includes(id)) return;
    const L = (D.logros || []).find(x => x.id === id); if (!L) return;
    S.logros.push(id); guardar(); aviso('logro: ' + L.t);
  }

  let tAviso;
  function aviso(t){
    let el = $('aviso');
    if (!el){
      el = document.createElement('div'); el.id = 'aviso';
      el.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);top:10px;background:#0f1512;border:1px solid #24352b;color:#e9f2ec;font-size:11.5px;padding:7px 12px;border-radius:20px;z-index:90;max-width:90%;text-align:center';
      document.body.appendChild(el);
    }
    el.textContent = t; el.style.display = 'block';
    clearTimeout(tAviso); tAviso = setTimeout(() => el.style.display = 'none', 3000);
  }

  function confeti(){
    for (let i = 0; i < 26; i++){
      const d = document.createElement('div');
      d.className = 'conf';
      d.style.left = Math.random()*100 + 'vw';
      d.style.top = '-14px';
      d.style.background = ['#3ee07f','#e0b83a','#e05a5a','#8ba294','#fff'][i % 5];
      d.style.animationDelay = (Math.random()*0.4) + 's';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2200);
    }
  }

  function overlay(html){
    $('ovIn').innerHTML = html;
    $('ov').classList.add('on');
    const x = $('ovX'); if (x) x.onclick = () => $('ov').classList.remove('on');
  }
  const cerrarOverlay = () => $('ov').classList.remove('on');

  function ir(tab){
    S.tab = tab; guardar();
    document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    ['cuidar','jugar','hablar','libro'].forEach(t => $('tab-' + t).classList.toggle('hidden', t !== tab));
    if (tab === 'jugar') JZ_JUEGO.pintar();
    if (tab === 'libro') pintarLibro();
  }

  const barra = (n, v) => '<div class="need"><b>' + n + '</b>' + Math.round(v) + '%<div class="mini"><i style="width:' + v + '%"></i></div></div>';
  const boton = (a, t) => '<button class="btn" data-a="' + a + '">' + t + '</button>';

  function pintarCuidar(){
    const niveles = D.preguntasNivel || [];
    let html = '<div class="needs">' +
      barra('comida', S.comida) + barra('abrigo', S.abrigo) + barra('sueño', S.sueno) + '</div>' +
      '<div class="care">' +
      boton('comer','darle de comer') + boton('abrigo','abrigarlo') + boton('arropar','arroparlo') +
      boton('cafe','café con leche') + boton('guitarra','tocarle guitarra') + boton('abrazo','abrazo largo') +
      '</div>';

    if (S.nivel <= niveles.length){
      const q = niveles[S.nivel - 1];
      html += '<div class="card" style="margin-top:10px"><div class="q">' + q.p + '</div>' +
        '<div class="hint">' + q.h + '</div>' +
        '<div class="inRow"><input id="qIn" placeholder="escribe tu respuesta...">' +
        '<button class="btn solid" id="qOk">decirle</button></div></div>';
    } else {
      if (S.fecha !== hoy()){ S.fecha = hoy(); S.misiones = {}; guardar(); }
      const ms = D.misiones || [];
      const hechas = ms.filter(m => S.misiones[m.id]).length;
      html += '<div class="card" style="margin-top:10px"><div class="q">nivel 8 · mantenerlo vivo</div>' +
        '<div class="hint">ya no hay que llenar nada. ahora es venir a verlo. misiones de hoy (' + hechas + '/' + ms.length + ')</div>' +
        '<div class="mis">' + ms.map(m => '<label><input type="checkbox" data-m="' + m.id + '" ' + (S.misiones[m.id] ? 'checked' : '') + '> ' + m.t + '</label>').join('') + '</div>' +
        '<button class="btn solid" id="btnFinal" ' + (hechas < ms.length ? 'disabled' : '') + '>ver la escena final</button></div>';
    }
    $('tab-cuidar').innerHTML = html;

    $('tab-cuidar').querySelectorAll('.care .btn').forEach(b => b.onclick = () => actuar(b.dataset.a));
    const qk = $('qOk'); if (qk) qk.onclick = () => responder(niveles[S.nivel - 1].c);
    const qi = $('qIn'); if (qi) qi.onkeydown = e => { if (e.key === 'Enter') $('qOk').click(); };
    $('tab-cuidar').querySelectorAll('input[data-m]').forEach(c => c.onchange = () => {
      S.misiones[c.dataset.m] = c.checked; guardar(); pintarCuidar();
    });
    const bf = $('btnFinal'); if (bf) bf.onclick = escenaFinal;
  }

  function responder(campo){
    const el = $('qIn'), v = el ? el.value.trim() : '';
    if (!v) return;
    S.gustos[campo] = v;
    S.nivel++;
    S.animo = clamp(S.animo + 10);
    S.comida = clamp(S.comida + 5); S.abrigo = clamp(S.abrigo + 5); S.sueno = clamp(S.sueno + 5);
    guardar(); confeti(); pintar();
    aviso('guardado: "' + v + '"');
  }

  function actuar(a){
    if (S.dormido){ despertar(); return; }
    const m = { comer:['comida',18,'gracias. ya no me suena la panza.'],
                abrigo:['abrigo',18,'ya estoy tibio. gracias.'],
                arropar:['sueno',18,'...así. ya me da sueño.'],
                cafe:['animo',9,'mmm. café con leche. ahora sí.'],
                guitarra:['animo',8,'toca otra. esa me gustó.'],
                abrazo:['animo',10,'...no te sueltes todavía.'] }[a];
    if (!m) return;
    S[m[0]] = clamp(S[m[0]] + m[1]);
    S.animo = clamp(S.animo + 6);
    if (a === 'comer'){ S.misiones.comer = true; logro('primera_comida'); }
    if (a === 'abrigo') S.misiones.abrigo = true;
    if (a === 'arropar') S.misiones.sueno = true;
    guardar();
    JZ_ANIM.play(a, m[2]);
    pintarCuidar();
  }

  function despertar(){
    S.dormido = false; S.animo = clamp(S.animo + 22); S.despertares++;
    if (S.despertares >= 5) logro('despertador');
    guardar(); pintar();
    JZ_ANIM.play('despertar', '...ah, ya volví. no me dejes tanto, ¿sí?');
  }

  const relleno = t => t.replace('{animal}', S.gustos.animal || 'animal').replace('{color}', S.gustos.color || 'color');

  function buscar(txt){
    const n = norm(txt);
    if (S.aprendidas[n]) return S.aprendidas[n];
    for (const par of (D.respuestas || [])) for (const k of par[0]) if (n.includes(norm(k))) return par[1];
    return null;
  }

  function mensaje(cls, txt){
    const m = $('msgs'); if (!m) return null;
    const d = document.createElement('div');
    d.className = 'msg ' + cls; d.textContent = txt;
    m.appendChild(d); m.scrollTop = m.scrollHeight;
    return d;
  }

  function pintarHablar(){
    const cont = $('tab-hablar');
    if (cont.dataset.listo === '1') return;
    cont.dataset.listo = '1';
    cont.innerHTML =
      '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:9px">' +
      '<button class="btn ghost" id="btnIA">IA: ' + (S.ia ? 'sí' : 'no') + '</button>' +
      '<button class="btn ghost" id="btnAjustes">ajustes</button></div>' +
      '<div class="msgs" id="msgs"></div>' +
      '<div class="chips" id="chips"></div>' +
      '<div class="inRow"><input id="chatInput" placeholder="escríbele algo..."><button class="btn solid" id="chatSend">enviar</button></div>' +
      '<div class="teach hidden" id="teach">esa no me la sé. enséñame qué digo: <input id="teachInput"><button class="btn" id="teachSave">guardar</button></div>' +
      '<div class="ajustes hidden" id="ajustes">' +
      '<div>clave de Gemini (se guarda solo en este dispositivo):</div>' +
      '<input id="inKey" type="password" placeholder="AIza...">' +
      '<div>modelo:</div><input id="inModelo" placeholder="gemini-3.6-flash">' +
      '<div class="row"><button class="btn" id="btnDetectar">detectar modelos gratis</button>' +
      '<button class="btn" id="btnGuardarAjustes">guardar</button></div>' +
      '<div id="ajInfo"></div>' +
      '<div>La clave queda visible en el código. Es normal.</div>' +
      '</div></div>';

    if (!S.hist.length){
      mensaje('sys', '— chat libre: pregúntale lo que quieras —');
      mensaje('him', 'hola. si preguntas algo que no sé, me lo enseñas y lo guardo. ¿qué quieres saber?');
    } else {
      S.hist.forEach(h => mensaje(h.role === 'user' ? 'me' : 'him', h.parts[0].text));
    }

    chips();
    $('chatSend').onclick = () => { enviar($('chatInput').value.trim()); $('chatInput').value = ''; };
    $('chatInput').onkeydown = e => { if (e.key === 'Enter') $('chatSend').click(); };
    $('teachSave').onclick = ensenar;
    $('btnIA').onclick = () => { S.ia = !S.ia; guardar(); $('btnIA').textContent = 'IA: ' + (S.ia ? 'sí' : 'no'); };
    $('btnAjustes').onclick = () => {
      const a = $('ajustes'); a.classList.toggle('hidden');
      if (!a.classList.contains('hidden')){ $('inKey').value = clave(); $('inModelo').value = modeloSel(); }
    };
    $('btnGuardarAjustes').onclick = () => {
      const k = $('inKey').value.trim(), m = $('inModelo').value.trim();
      if (k) localStorage.setItem('jeyson_key', k);
      if (m){ S.modelo = m; guardar(); }
      $('ajInfo').textContent = 'guardado.';
    };
    $('btnDetectar').onclick = detectar;
  }

  function sistema(){
    const g = S.gustos || {};
    const datos = Object.keys(g).length ? Object.keys(g).map(k => k + ': ' + g[k]).join(', ') : 'todavía no le contó nada';
    const ens = Object.keys(S.aprendidas || {});
    return [
      'Eres ' + (D.nombre || 'Jeyson') + '. Hablas español, informal, tuteando, frases cortas de chat.',
      'Nunca usas emojis, ni markdown, ni listas. Texto plano.',
      'PERFIL: ' + (D.perfil || ''),
      'DATOS QUE TE DIO TU JUGADOR: ' + datos,
      ens.length ? 'COSAS QUE TE ENSEÑÓ (respétalas): ' + ens.map(q => '"' + q + '" -> "' + S.aprendidas[q] + '"').join(' | ') : '',
      'REGLAS: nunca digas "todo pasa por algo". Si no sabes algo, dilo y pide que te lo enseñe. ' +
      'Si está mal, no lo consueles con frases hechas. Puedes preguntarle tú también.',
      'Nivel: ' + S.nivel + '. Ánimo: ' + Math.round(S.animo) + '/100.',
      C.promptExtra || ''
    ].filter(Boolean).join('\n');
  }

  async function llamar(modelo, k, texto, pensamiento){
    const gc = { temperature: C.temperatura != null ? C.temperatura : 0.95, maxOutputTokens: C.maxTokens || 400 };
    if (pensamiento && C.thinkingBudget != null) gc.thinkingConfig = { thinkingBudget: C.thinkingBudget };
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + modelo + ':generateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': k },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sistema() }] },
          contents: (S.hist || []).slice(-8).concat([{ role: 'user', parts: [{ text: texto }] }]),
          generationConfig: gc
        })
      });
      if (!res.ok) return { ok: false, status: res.status };
      const d = await res.json();
      const partes = (((d.candidates || [])[0] || {}).content || {}).parts || [];
      const txt = partes.filter(p => !p.thought).map(p => p.text || '').join('').trim();
      return txt ? { ok: true, txt: txt } : { ok: false, status: 204 };
    } catch (e) { return { ok: false, status: 'red' }; }
  }

  async function pedirIA(texto){
    const k = clave(); if (!k) return { err: 'sin-clave' };
    const lista = [modeloSel()].concat(C.modelosAlternos || []);
    for (const m of lista){
      const r = await llamar(m, k, texto, true);
      if (r.status === 404) continue;
      if (r.ok){ S.modelo = m; guardar(); return { txt: r.txt }; }
      if (r.status === 400){
        const r2 = await llamar(m, k, texto, false);
        if (r2.ok){ S.modelo = m; guardar(); return { txt: r2.txt }; }
      }
      return { err: 'http-' + r.status };
    }
    return { err: 'sin-modelo' };
  }

  let ocupado = false;
  async function enviar(txt){
    if (!txt || ocupado) return;
    if (S.dormido){ despertar(); }
    mensaje('me', txt);
    S.msgs++; if (S.msgs >= 50) logro('hablador');
    S.animo = clamp(S.animo + 8);
    S.misiones.hablar = true;
    S.hist = (S.hist || []).concat([{ role: 'user', parts: [{ text: txt }] }]).slice(-12);
    guardar();

    if (S.ia && clave()){
      ocupado = true;
      const t = mensaje('typing', 'escribiendo...');
      const r = await pedirIA(txt);
      if (t) t.remove();
      ocupado = false;
      if (r.txt){
        mensaje('him', r.txt);
        S.hist = S.hist.concat([{ role: 'model', parts: [{ text: r.txt }] }]).slice(-12);
        guardar(); return;
      }
      mensaje('sys', 'falló la conexión (' + r.err + '). sigo sin IA.');
    }

    const r = buscar(txt);
    if (!r){
      $('teach').classList.remove('hidden');
      $('teachInput').value = '';
      $('teachInput').dataset.q = txt;
      setTimeout(() => mensaje('him', '¿y esa pregunta? esa no me la sé todavía. enséñame y la guardo, ¿sí?'), 380);
      return;
    }
    if (r === '__secreto__'){
      const sec = (D.secretos || [''])[S.secretosDados % (D.secretos || ['']).length];
      S.secretosDados++; guardar();
      setTimeout(() => mensaje('him', 'te digo uno: ' + sec), 380);
      return;
    }
    setTimeout(() => mensaje('him', relleno(r)), 380);
  }

  function ensenar(){
    const q = norm($('teachInput').dataset.q || ''), v = $('teachInput').value.trim();
    if (!q || !v) return;
    S.aprendidas[q] = v; guardar();
    $('teach').classList.add('hidden');
    mensaje('him', 'ya. eso queda guardado. la próxima te lo digo tal cual.');
    aviso('aprendido');
  }

  function chips(){
    const base = (D.chips || []).slice();
    const c = $('chips'); if (!c) return;
    c.innerHTML = base.map(x => '<span class="chip">' + x + '</span>').join('') + '<span class="chip" id="masChips">otras preguntas</span>';
    c.querySelectorAll('.chip').forEach(el => el.onclick = () => {
      if (el.id === 'masChips'){ base.push(base.shift()); chips(); } else enviar(el.textContent);
    });
  }

  async function detectar(){
    const k = $('inKey').value.trim() || clave();
    if (!k){ $('ajInfo').textContent = 'pega primero tu clave.'; return; }
    $('ajInfo').textContent = 'buscando...';
    try {
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models', { headers: { 'x-goog-api-key': k } });
      if (!r.ok){ $('ajInfo').textContent = 'error ' + r.status; return; }
      const d = await r.json();
      const ok = (d.models || []).filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
        .map(m => m.name.replace('models/', ''))
        .filter(n => /flash/i.test(n) && !/(image|tts|live|transcribe|embedding|omni|lyria|robotics|deep-research|computer)/i.test(n));
      if (!ok.length){ $('ajInfo').textContent = 'no encontré modelos flash.'; return; }
      $('ajInfo').innerHTML = 'disponibles: ' + ok.slice(0, 12).map(n => '<a href="#" data-m="' + n + '" style="color:#3ee07f">' + n + '</a>').join(', ');
      $('ajInfo').querySelectorAll('a').forEach(a => a.onclick = ev => { ev.preventDefault(); $('inModelo').value = a.dataset.m; });
    } catch (e) { $('ajInfo').textContent = 'no pude conectar.'; }
  }

  function pintarLibro(){
    const un = Math.min((D.parabolas || []).length, 3 + S.nivel * 2 + bonos().parabolas);
    $('tab-libro').innerHTML = '<div class="card"><div class="q">parábolas y reflexiones</div>' +
      '<div class="hint">se abren cuidándolo, jugando y hablando. la biblioteca de su casa abre más rápido.</div>' +
      (D.parabolas || []).map((p, i) => {
        const lock = i >= un;
        return '<div class="par ' + (lock ? 'lock' : '') + '"><h4>' + p[0] + (lock ? ' · bloqueada' : '') + '</h4>' +
          (lock ? '<p>sigue así para abrirla.</p>' : '<p>' + p[1] + '</p><div class="ref">' + p[2] + '</div>') + '</div>';
      }).join('') + '</div>';
  }

  function verFicha(){
    const g = S.gustos || {}, ks = Object.keys(g);
    const casa = (D.casa || []).map(p => p.ico + ' ' + p.n + ': nivel ' + (S.casa[p.id] || 0)).join('<br>');
    const lg = (D.logros || []).map(l => (S.logros.includes(l.id) ? '✔ ' : '· ') + l.t).join('<br>');
    overlay('<div class="ovHead"><b>su ficha</b><button class="btn ghost" id="ovX">cerrar</button></div>' +
      '<div class="card"><div class="kv"><b>' + (D.nombre || 'Jeyson') + '</b><br><span>' + (D.perfil || '') + '</span>' +
      '<hr style="border:none;border-top:1px solid #24352b"><b>lo que aprendió de ti</b><br>' +
      (ks.length ? ks.map(x => '<span>' + x + ':</span> ' + g[x] + '<br>').join('') : '<span>nada todavía</span>') +
      '<hr style="border:none;border-top:1px solid #24352b"><b>su casa</b><br>' + (casa || '<span>nada construido</span>') +
      '<hr style="border:none;border-top:1px solid #24352b"><b>logros</b><br>' + lg +
      '<hr style="border:none;border-top:1px solid #24352b">confianza: ' + Math.round(S.animo) + '% · partidas: ' + S.partidas +
      ' · mejor racha: ' + S.mejorRacha + ' · veces que lo despertaste: ' + S.despertares +
      '</div><div class="row"><button class="btn" id="btnEnse">lo que le enseñé</button>' +
      '<button class="btn bad" id="btnReset">reiniciar todo</button></div></div>');
    const b = $('btnEnse'); if (b) b.onclick = verEnsenadas;
    const r = $('btnReset'); if (r) r.onclick = () => {
      if (!confirm('¿borrar todo el progreso?')) return;
      localStorage.removeItem(KEY);
      Object.assign(S, DEF); guardar(); cerrarOverlay();
      $('tab-hablar').dataset.listo = '0';
      pintar(); JZ_JUEGO.pintar(); pintarLibro();
    };
  }

  function verEnsenadas(){
    const k = Object.keys(S.aprendidas || {});
    overlay('<div class="ovHead"><b>lo que le enseñé</b><button class="btn ghost" id="ovX">cerrar</button></div><div class="card"><div class="kv">' +
      (k.length ? k.map(q => '<span>le preguntaste:</span> ' + q + '<br><span>él dice:</span> ' + S.aprendidas[q] + '<hr style="border:none;border-top:1px solid #24352b">').join('') : 'todavía no le has enseñado nada.') +
      '</div></div>');
  }

  function escenaFinal(){
    const g = S.gustos || {};
    const t = 'Es de noche. ' + (D.nombre || 'Jeyson') + ' está tibio, con el café a medias, y por una vez no está ordenando nada.\n\n' +
      '"¿Te acuerdas de todo lo que te pregunté? Lo tengo guardado. Cuando te apagues, yo sigo aquí con eso.\n\n' +
      'Tu color es ' + (g.color || '—') + '. Cuando algo se ponga gris, piensa en eso. Tu comida es ' + (g.comida || '—') + ': cómela un día malo, no un día bueno. Tu animal es ' + (g.animal || '—') + '. Tu música es ' + (g.musica || '—') + ', esa que pones cuando nadie ve.\n\n' +
      'Tu miedo es ' + (g.miedo || '—') + '. No hay que vencerlo, hay que caminar con él. Tu lugar seguro es ' + (g.lugar || '—') + '. Y tu persona es ' + (g.persona || '—') + '.\n\n' +
      'No te voy a decir que todo estará bien. Te voy a decir algo mejor: yo me quedo. Vuelve cuando quieras, aunque sea a no hablar. Yo me acuerdo."\n\n' +
      'Y se queda ahí, en el pasillo, con la lámpara prendida.';
    overlay('<div class="ovHead"><b>la escena final</b><button class="btn ghost" id="ovX">cerrar</button></div>' +
      '<div class="card"><div class="kv" style="white-space:pre-line" id="ftxt"></div></div>');
    $('ftxt').textContent = t;
    confeti(); S.final = true; guardar(); logro('final');
  }

  function pintar(){
    decaer();
    $('nombre').textContent = D.nombre || 'Jeyson';
    $('animoFill').style.width = S.animo + '%';
    $('lvlTxt').textContent = S.nivel > (D.preguntasNivel || []).length ? 'nivel 8 · mantenerlo vivo' : 'nivel ' + S.nivel;
    $('sleep').classList.toggle('hidden', !S.dormido);
    if (!document.querySelector('.escena[data-anim]')) $('bubble').textContent = linea();
    JZ_ANIM.mood(S.animo, S.dormido, S.abrigo < 30);
    pintarCuidar();
    pintarHablar();
  }

  JZ_ANIM.montar();
  JZ_JUEGO.montar({
    S: S, guardar: guardar, aviso: aviso, confeti: confeti, logro: logro,
    anim: JZ_ANIM, bonos: bonos, overlay: overlay
  });

  document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => ir(b.dataset.tab));
  $('btnFicha').onclick = verFicha;
  $('ov').onclick = e => { if (e.target.id === 'ov') cerrarOverlay(); };

  if (!S.mat) S.mat = {};
  if (!S.casa) S.casa = {};

  if (S.bonoDado !== hoy()){
    const b = bonos();
    S.comida = clamp(S.comida + b.comida); S.abrigo = clamp(S.abrigo + b.abrigo);
    S.sueno = clamp(S.sueno + b.sueno); S.animo = clamp(S.animo + b.animo);
    S.bonoDado = hoy(); guardar();
  }

  let promptInstalar = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); promptInstalar = e; $('btnInstalar').classList.remove('hidden');
  });
  $('btnInstalar').onclick = () => { if (promptInstalar){ promptInstalar.prompt(); promptInstalar = null; $('btnInstalar').classList.add('hidden'); } };

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0){
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  ir(S.tab || 'cuidar');
  pintar();

  setInterval(() => {
    const qi = $('qIn'), v = qi ? qi.value : null;
    pintar();
    const n = $('qIn'); if (n && v != null) n.value = v;
  }, 3000);

  window.JZ = { S: S, guardar: guardar, aviso: aviso, confeti: confeti, logro: logro,
                anim: JZ_ANIM, bonos: bonos, overlay: overlay };
})();
