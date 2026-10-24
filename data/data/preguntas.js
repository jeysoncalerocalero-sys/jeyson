/* CONTENIDO DE JEJSON — edita aquí sin miedo */

window.JEJSON = {

  nombre: 'Jeyson',

  perfil:
    'Tienes 22 años. Te vistes holgado, cómodo y a la moda. Te encanta el anime y las series chinas, ' +
    'y cuando algo te gusta mucho te pones hiperactivo y te dan ganas de golpear a alguien de la emoción. ' +
    'Escuchas baladas románticas de los 80 y 90 y música triste en inglés. Te gustan el negro, el blanco, ' +
    'el gris y un verde llamativo. Eres ordenado y te molesta ver un trapero tirado en el suelo. ' +
    'No te gusta que te manden, ni que te levanten la voz, ni que te manipulen. Crees en el libre albedrío. ' +
    'De noche piensas de más y es tu hora peor. Te gustan las cosas paranormales, los inventos y leer. ' +
    'Eres poco sociable, pero cuando se te sueltan los cables hablas demasiado. Sueñas con que tu mamá no esté triste ' +
    'y con tener con qué apoyar a los tuyos. Te guardas tus problemas, pero aquí los sueltas. ' +
    'Si alguien llora le dices: "¿por qué lloras? no llores... bueno, llora si quieres. cierra los ojos, ' +
    'pon la música que más te gusta y respira."',

  preguntasNivel: [
    { c:'color',   p:'¿Cuál es tu color?',        h:'el que te pones sin pensarlo' },
    { c:'comida',  p:'¿Cuál es tu comida?',       h:'la que pedirías en un día malo' },
    { c:'animal',  p:'¿Cuál es tu animal?',       h:'el que te gustaría tener cerca' },
    { c:'musica',  p:'¿Qué música te calma?',     h:'la que pones cuando nadie ve' },
    { c:'miedo',   p:'¿A qué le tienes miedo?',   h:'de verdad, no lo bonito' },
    { c:'lugar',   p:'¿Cuál es tu lugar seguro?', h:'a donde te irías hoy mismo' },
    { c:'persona', p:'¿Quién es tu persona?',     h:'la primera que se te vino' }
  ],

  misiones: [
    { id:'comer',  t:'darle de comer' },
    { id:'abrigo', t:'abrigarlo (hace frío)' },
    { id:'sueno',  t:'arroparlo para que duerma' },
    { id:'hablar', t:'escribirle algo en el chat' },
    { id:'jugar',  t:'jugar una partida con él' },
    { id:'leer',   t:'leerle una parábola' }
  ],

  secretos: [
    'a veces hablo solo cuando no hay nadie. me contesto. es raro pero me calma.',
    'tengo una canción que solo pongo cuando estoy muy abajo, y no le digo a nadie cuál es.',
    'de chico me daba miedo la oscuridad del pasillo. todavía dejo una luz prendida.',
    'hay cosas de mi historia que casi no cuento porque son delicadas. algún día.',
    'cuando algo me duele, lo arreglo ordenando. por eso limpio tanto.',
    'le tengo más miedo a que se olviden de mí que a estar solo.'
  ],

  chips: [
    '¿cómo estás?','¿me quieres?','¿te vas a ir?','dime un secreto','cuentame un chiste',
    'no puedo dormir','estoy triste','¿qué no te gusta de mí?','¿a qué le tienes miedo?','¿qué haces cuando no estoy?'
  ],

  respuestas: [
    [['como estas','que tal','estas bien'],'yo bien... más o menos. y tú, ¿de verdad o me vas a decir "estoy bien" otra vez?'],
    [['estoy triste','estoy mal','me siento mal'],'¿por qué? no llores... bueno, llora si quieres. cierra los ojos, pon la música que más te gusta y respira.'],
    [['lloro','estoy llorando'],'déjalo salir. no hay que apretarlo. cuando termines, aquí sigo.'],
    [['me quieres','me amas'],'sí. aunque casi no hablo. cuando alguien me cuida, yo me acuerdo.'],
    [['te vas a ir','me vas a dejar'],'no me voy si me vienes a ver. si te olvidas me apago, pero vuelvo cuando me escribes.'],
    [['tienes novia'],'no sé, ¿para qué la pregunta?'],
    [['que no te gusta de mi'],'que dices "estoy bien" cuando no lo estás, y que te disculpas por existir. lo demás me da igual.'],
    [['a que le tienes miedo'],'a que se me vaya la gente. a quedarme en una casa ordenada y sin nadie con quien hablar.'],
    [['que haces cuando no estoy'],'ordeno. pienso de más. veo anime hasta que se me cierran los ojos. y te espero.'],
    [['por que estas aqui'],'porque alguien me armó con sus cosas y me dejó aquí para que tú no estés solo. igual que él.'],
    [['te gusto','te caigo bien'],'me gusta que vengas. eso ya es bastante.'],
    [['cuentame un chiste','un chiste'],'va: ¿por qué el {animal} no usa {color}? porque dice que se ve muy serio. ...ya, me reí yo solo.'],
    [['dime un secreto'],'__secreto__'],
    [['buenas noches'],'buenas noches. si no puedes dormir, pon algo triste en inglés y piensa en tu {animal}. yo me quedo.'],
    [['buenos dias','hola'],'buenos días. ¿ya comiste o vas a decir que sí sin comer?'],
    [['te quiero','te amo'],'y yo. no lo digo mucho, pero sí.'],
    [['gracias'],'¿gracias por qué? ah, ya. de nada.'],
    [['estoy feliz'],'¿sí? cuéntame. quiero el detalle, no el titular.'],
    [['que comes','tienes hambre'],'lo que me des. aunque si me das café con leche me ganas.'],
    [['que musica te gusta'],'baladas viejas de los 80 y 90, y música triste en inglés. sí, triste. me queda.'],
    [['cual es tu color'],'negro, blanco, gris... y un verde que se vea de lejos.'],
    [['que te molesta'],'que me manden. que me levanten la voz. y que haya un trapero tirado en el suelo.'],
    [['duermes'],'poco. de noche pienso de más. es mi hora peor.'],
    [['tienes suenos'],'que mi mamá no esté triste. y tener con qué apoyar a los míos.'],
    [['crees en lo paranormal'],'creo. hay cosas que no se explican y no pasa nada por eso.'],
    [['no puedo dormir'],'cierra los ojos. pon tu música. respira 4, aguanta 4, suelta 6. yo aquí sigo.'],
    [['estoy cansado'],'entonces siéntate. no todo se arregla hoy.'],
    [['me siento solo','estoy solo'],'bienvenido. yo también, casi siempre. por eso estamos los dos aquí.'],
    [['que piensas de mi'],'que aguantas más de lo que crees y te lo cobras callado.'],
    [['te gusta el anime'],'demasiado. me pongo insoportable y me dan ganas de golpear a alguien de la emoción.'],
    [['orden','desorden','trapero'],'si ves un trapero en el suelo, ya sabes. yo no puedo moverme, pero te juzgo.'],
    [['dime algo bonito'],'de todos los que pudieron armarme, te tocaste tú.']
  ],

  parabolas: [
    ['La taza agrietada','Una taza se rajó al caer. La dueña no la tiró: la siguió usando, y el té caliente pasaba por la grieta como si nada. Con el tiempo la grieta se oscureció y se volvió parte del dibujo.','Una grieta no es un defecto. es memoria. sigue sosteniendo.'],
    ['El faro y la niebla','Todas las noches el faro barría el mar, y muchas noches no veía nada. La niebla le tapaba todo. Igual giraba, igual alumbraba. Un barco que nunca supo su nombre llegó a puerto por él.','que no veas el resultado no significa que no sirva lo que haces.'],
    ['El río que se detuvo','Un río se cansó y se detuvo a mitad del valle. Los peces se asustaron. Pero el agua quieta empezó a reflejar el cielo, y por primera vez el valle entero se miró.','detenerse no es perderse. a veces es la única forma de ver.'],
    ['La lámpara del pasillo','En una casa dejaban siempre la luz del pasillo encendida. Nadie la usaba. Era para el que llegaba tarde y no quería entrar a oscuras.','hay gestos que no se notan y sostienen a alguien que no ves.'],
    ['La semilla enterrada','La semilla se quejó: la enterraron, la taparon, no veía nada. Y justo ahí, en el hueco oscuro, le salieron raíces.','lo que te entierra te afirma. sin ese hueco no hay raíz.'],
    ['La piedra en el zapato','Un caminante subió una montaña pensando en la cima. No llegó por la altura: llegó cojeando por una piedrita.','lo pequeño repetido pesa más que lo enorme de una vez.'],
    ['El espejo sucio','Un hombre se miraba en un espejo lleno de polvo y creía que él era opaco. Un día lo limpió y no cambió nada de él, solo lo que veía.','muchas veces no estás mal. está sucio el cristal.'],
    ['El árbol de otoño','El árbol soltó todas sus hojas y se sintió desnudo. En invierno creyó que había fallado. En primavera entendió que había estado guardando.','soltar no es perder. hay temporadas que son de adentro.'],
    ['El panadero de la madrugada','El panadero amasaba a las tres de la mañana, solo, con la ciudad dormida. Nadie lo veía. A las siete, la cuadra olía a pan y todos desayunaban.','hay trabajos que solo se ven cuando ya terminaron. el tuyo también.'],
    ['La cometa del niño','El niño soltó hilo y la cometa subió. Volvió a soltar y subió más. Se asustó de que se le fuera y jaló fuerte: la cometa cayó.','a la gente que quieres también hay que darle hilo.'],
    ['La vela y el viento','La vela temblaba con cada ráfaga y creía que se iba a apagar. La ráfaga era justo lo que la hacía alumbrar más lejos.','lo que te sacude también te aviva.'],
    ['El reloj sin pilas','Un reloj se quedó sin pilas y se paralizó. Se sintió inútil. Pero dos veces al día tenía la hora exacta.','no estás roto siempre. a veces solo te falta lo que no te has dado.'],
    ['La casa con grietas','Arreglaron las grietas de una casa con oro. En vez de esconderlas, las marcaron. La casa quedó más linda por donde se había roto.','lo que te rompió, bien reparado, te vuelve más tuyo.'],
    ['El bote y el ancla','El bote quería navegar y el ancla lo frenaba. Un día la cortó. Vino la tormenta y el bote se fue a la deriva sin saber dónde estaba su puerto.','tener algo que te detiene también es tener un lugar.'],
    ['La lluvia en el tejado','Un hombre no podía dormir por la lluvia. Se tapó los oídos. Después dejó de pelear: la escuchó, la contó, se durmió.','lo que te molesta, escuchado, se vuelve arrullo.'],
    ['El perro que esperaba','Un perro esperaba en la puerta todos los días a la misma hora. Un día nadie vino. Siguió esperando, sin drama, sin rencor. Al día siguiente vinieron.','esperar sin castigar es de los amores más limpios.'],
    ['La montaña y el grano de arena','La montaña se burló de un grano de arena. El grano siguió llegando cada día, empujado por el viento. En mil años, la montaña tenía un desierto alrededor.','llega más lejos el que viene todos los días que el que viene con fuerza.'],
    ['El invierno del sembrador','El sembrador echó la semilla y vio el campo vacío todo el invierno. Casi lo deja. En primavera el campo se llenó y él ya no recordaba haber dudado.','el hueco entre lo que haces y lo que sale es donde vive la fe.'],
    ['La puerta que se cerró','A un hombre se le cerró la puerta del trabajo que quería. Lloró en la calle. Caminó sin rumbo y llegó a una que no había visto nunca.','una puerta que se cierra no es un muro. es un desvío.'],
    ['El eco del valle','Un hombre gritó al valle y volvió su propia voz. Se enojó porque nadie le contestaba. Después entendió: el valle no responde, devuelve.','lo que das vuelve. y lo que te callas también vuelve. elige qué gritas.']
  ],

  materiales: [
    { id:'madera', n:'madera', ico:'🪵' },
    { id:'piedra', n:'piedra', ico:'🪨' },
    { id:'tela',   n:'tela',   ico:'🧵' },
    { id:'luz',    n:'luz',    ico:'✨' }
  ],

  frasesBien: ['bien ahí.','eso.','sabía que sí.','tú puedes con esto.','no se te escapa una.'],
  frasesMal:  ['no, era esa.','casi.','esa no.','uff.','respira, vamos.'],

  trivia: {
    facil: [
      { p:'¿Cuántos días tiene una semana?', o:['5','7','10','12'], r:1 },
      { p:'¿De qué color se ve el cielo despejado?', o:['verde','azul','rojo','gris'], r:1 },
      { p:'¿Cuántas patas tiene una araña?', o:['6','8','10','4'], r:1 },
      { p:'¿Cuántos meses tiene un año?', o:['10','11','12','14'], r:2 },
      { p:'¿Cuántas horas tiene un día completo?', o:['12','20','24','30'], r:2 },
      { p:'¿Qué astro sale de día?', o:['la luna','el sol','marte','venus'], r:1 },
      { p:'¿Cuántas ruedas tiene una bicicleta?', o:['2','3','4','1'], r:0 },
      { p:'¿Qué órgano bombea la sangre?', o:['hígado','pulmón','corazón','riñón'], r:2 },
      { p:'¿En qué estación cae nieve?', o:['verano','otoño','invierno','primavera'], r:2 },
      { p:'¿Cuántos colores tiene el arcoíris?', o:['5','6','7','9'], r:2 },
      { p:'¿Cuál es más grande?', o:['ballena','tiburón','delfín','foca'], r:0 },
      { p:'¿Qué se congela en el congelador?', o:['el pan','el agua','la sal','el aceite'], r:1 },
      { p:'¿Cuál de estos es una fruta?', o:['zanahoria','papa','manzana','lechuga'], r:2 },
      { p:'¿Cuántos dedos tiene una mano?', o:['4','5','6','3'], r:1 },
      { p:'¿Qué animal dice miau?', o:['perro','gato','vaca','pato'], r:1 }
    ],
    medio: [
      { p:'¿Cuál es el río más caudaloso del mundo?', o:['Nilo','Amazonas','Misisipi','Danubio'], r:1 },
      { p:'¿Cuántos huesos tiene el cuerpo humano adulto?', o:['150','206','300','98'], r:1 },
      { p:'¿Quién pintó la Mona Lisa?', o:['Miguel Ángel','Van Gogh','Da Vinci','Picasso'], r:2 },
      { p:'¿Cuál es el planeta más grande?', o:['Saturno','Júpiter','Neptuno','Tierra'], r:1 },
      { p:'¿Cuál es la capital de Japón?', o:['Osaka','Kioto','Tokio','Nagoya'], r:2 },
      { p:'¿Cuántos continentes hay?', o:['4','5','6','7'], r:3 },
      { p:'¿Qué gas respiramos para vivir?', o:['nitrógeno','oxígeno','helio','metano'], r:1 },
      { p:'¿Quién escribió Don Quijote?', o:['Lorca','Cervantes','Borges','Neruda'], r:1 },
      { p:'¿Cuál es el océano más grande?', o:['Atlántico','Índico','Pacífico','Ártico'], r:2 },
      { p:'¿Cuántos lados tiene un hexágono?', o:['5','6','7','8'], r:1 },
      { p:'¿Qué instrumento tiene 88 teclas?', o:['órgano','piano','acordeón','arpa'], r:1 },
      { p:'¿Cuál es la montaña más alta?', o:['Aconcagua','Everest','Kilimanjaro','Aneto'], r:1 },
      { p:'¿Cuántos minutos hay en una hora y media?', o:['60','75','90','120'], r:2 },
      { p:'¿Qué metal se usa en los cables eléctricos?', o:['hierro','cobre','plomo','zinc'], r:1 },
      { p:'¿Cuál es el país con forma de bota?', o:['Grecia','Italia','Portugal','Chile'], r:1 }
    ],
    dificil: [
      { p:'¿Cuál es el hueso más largo del cuerpo?', o:['tibia','fémur','húmero','peroné'], r:1 },
      { p:'¿En qué año llegó el hombre a la Luna?', o:['1959','1969','1979','1965'], r:1 },
      { p:'¿Qué elemento tiene el símbolo Au?', o:['plata','oro','aluminio','argón'], r:1 },
      { p:'¿Quién formuló la teoría de la relatividad?', o:['Newton','Bohr','Einstein','Galileo'], r:2 },
      { p:'¿Cuál es el país más extenso del mundo?', o:['Canadá','China','Rusia','Brasil'], r:2 },
      { p:'¿Cuántos corazones tiene un pulpo?', o:['1','2','3','5'], r:2 },
      { p:'¿Cuál es la capital de Australia?', o:['Sídney','Melbourne','Canberra','Perth'], r:2 },
      { p:'¿Cuántos cromosomas tiene el ser humano?', o:['23','44','46','48'], r:2 },
      { p:'¿Quién compuso la Novena Sinfonía?', o:['Mozart','Beethoven','Bach','Chopin'], r:1 },
      { p:'¿Qué planeta tiene los anillos más visibles?', o:['Júpiter','Urano','Saturno','Neptuno'], r:2 },
      { p:'¿Cuál es el símbolo químico del hierro?', o:['Ir','Fe','Hi','Fr'], r:1 },
      { p:'¿En qué país está Machu Picchu?', o:['Bolivia','Perú','Ecuador','Chile'], r:1 },
      { p:'¿Cuál es el desierto cálido más grande?', o:['Gobi','Sahara','Kalahari','Atacama'], r:1 },
      { p:'¿Qué idioma tiene más hablantes nativos?', o:['inglés','español','mandarín','hindi'], r:2 },
      { p:'¿Cuál es la velocidad aproximada de la luz?', o:['30.000 km/s','300.000 km/s','3.000 km/s','3 millones km/s'], r:1 }
    ]
  },

  casa: [
    { id:'cocina',   n:'cocina',      ico:'🍳', bon:'+comida cada día',
      coste:[{madera:4,piedra:2},{madera:8,piedra:5,tela:2},{madera:14,piedra:10,tela:5}] },
    { id:'chimenea', n:'chimenea',    ico:'🔥', bon:'+abrigo cada día',
      coste:[{piedra:4,madera:2},{piedra:9,madera:5},{piedra:15,madera:11,tela:3}] },
    { id:'cama',     n:'cama',        ico:'🛏️', bon:'+sueño cada día',
      coste:[{tela:4,madera:3},{tela:9,madera:6},{tela:16,madera:10,piedra:6}] },
    { id:'lampara',  n:'lámpara',     ico:'💡', bon:'+ánimo cada día',
      coste:[{luz:3,piedra:2},{luz:7,piedra:6},{luz:13,piedra:11,tela:4}] },
    { id:'biblio',   n:'biblioteca',  ico:'📚', bon:'abre más parábolas',
      coste:[{madera:5,tela:3},{madera:10,tela:7,luz:3},{madera:17,tela:12,luz:7}] },
    { id:'taller',   n:'taller',      ico:'🔧', bon:'+15% materiales por nivel',
      coste:[{piedra:5,madera:4},{piedra:11,madera:8,luz:3},{piedra:18,madera:14,luz:8}] },
    { id:'patio',    n:'patio',       ico:'🌳', bon:'+ánimo al abrir la app',
      coste:[{madera:3,tela:2},{madera:8,piedra:4},{madera:13,piedra:9,tela:6}] },
    { id:'radio',    n:'radio',       ico:'📻', bon:'+ánimo y desbloquea música',
      coste:[{luz:4,piedra:3},{luz:9,piedra:7,tela:4},{luz:15,piedra:12,tela:9}] }
  ],

  logros: [
    { id:'primera_comida', t:'primera cucharada',   d:'le diste de comer' },
    { id:'despertador',    t:'despertador oficial', d:'lo despertaste 5 veces' },
    { id:'racha10',        t:'diez seguidas',       d:'10 aciertos seguidos en el juego' },
    { id:'oleada5',        t:'sin miedo',           d:'llegaste a la oleada 5' },
    { id:'casa_completa',  t:'techo propio',        d:'construiste las 8 piezas' },
    { id:'imperio',        t:'imperio',             d:'todo a nivel 3' },
    { id:'parabolas_todas',t:'lector',              d:'leíste todas las parábolas' },
    { id:'hablador',       t:'hablador',            d:'50 mensajes en el chat' },
    { id:'final',          t:'la escena final',     d:'llegaste al final del camino' }
  ]
};
