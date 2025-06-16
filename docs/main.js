import { palavraspy } from './Bibliografia/disciplina_py.js';
import { palavrasjs } from './Bibliografia/disciplina.js';
import { palavrascss } from './Bibliografia/disciplina_css.js';
import { palavrasart } from './Bibliografia/disciplina_art.js';
import { palavrashis } from './Bibliografia/disciplina_hist.js';

// 🎯 chamadas desorganizadas (organizar ainda)
const teclas = document.querySelectorAll(".tecla");
const trilho = document.getElementById("trilho");
const body = document.querySelector('body');
let section = document.querySelector('section');
let coteudos = document.getElementById('coteudos');
let key = document.getElementById('key');
let randomwords = document.getElementById('palavras_aleatorias');
let opcao = document.getElementById("opcao");
let cbutton = document.getElementsByClassName('cbutton');
let modos_telas = document.getElementById('modos_telas');
let selectkey = document.getElementById('selectkey');
let op1 = document.getElementById('op1');
let op2 = document.getElementById('op2');
let op3 = document.getElementById('op3');
let op4 = document.getElementById('op4');
let op5 = document.getElementById('op5');
let op6 = document.getElementById('op6');
let optionkey = document.getElementById('optionkey');
let buttonkey = document.querySelector('.custom-option');
let teclado = document.getElementById('teclado');

//_______________________________________________________________________________________//

// 🎯 Modo Claro e Escuro
function saved_theme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    [
    trilho,
    body,
    section,
    key,
    opcao,
    coteudos,
    op1,
    op2,
    op3,
    op4,
    op5,
    op6,
    optionkey
  ].forEach(e=>{
    e.classList.add('dark');
  for (let b of cbutton) {
  b.classList.add('dark');
  };
  });
    
    
  }
  else {
        [
    trilho,
    body,
    section,
    key,
    opcao,
    coteudos,
    op1,
    op2,
    op3,
    op4,
    op5,
    op6,
    optionkey
  ].forEach(e=>{
    e.classList.remove('dark');
  });
   for (let b of cbutton) {
  b.classList.remove('dark');
  };
  }
}

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark');
  body.classList.toggle('dark');
  section.classList.toggle('dark');
  key.classList.toggle('dark');
  opcao.classList.toggle('dark');
  for (let b of cbutton) {
    b.classList.toggle('dark');
  }

  coteudos.classList.toggle('dark');
  op1.classList.toggle('dark');
  op2.classList.toggle('dark');
  op3.classList.toggle('dark');
  op4.classList.toggle('dark');
  op5.classList.toggle('dark');
  op6.classList.toggle('dark');
  optionkey.classList.toggle('dark');

  teclas.forEach(x => {
    x.classList.toggle('dark');
  });

  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  }
  else {
    localStorage.setItem('theme', 'light');
  }
});
saved_theme();
//_______________________________________________________________________________________//

// 🎯 DRAG AND DROP DO TECLADO
function dragdrop(elemento) {
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  elemento.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
    offset.x = e.clientX - elemento.offsetLeft;
    offset.y = e.clientY - elemento.offsetTop;

    elemento.style.cursor = "grabbing";
    elemento.style.zIndex = "999";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
    elemento.style.cursor = "grab";
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      let x = e.clientX - offset.x;
      let y = e.clientY - offset.y;

      // Limitar movimento para dentro da tela (evitar que o teclado saia da janela)
      let maxX = window.innerWidth - elemento.offsetWidth;
      let maxY = window.innerHeight - elemento.offsetHeight;
      //____________________________________________________________🙆‍♀️🙆‍♂️________________//
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      elemento.style.left = x + "px";
      elemento.style.top = y + "px";
    }
  });
}

dragdrop(key);
dragdrop(randomwords);

//_______________________________________________________________________________________//

// 🎯 Interagindo com o Teclado
let layout = 'qwerty';
let palavras = [];
let nav = document.querySelector('nav');
//coteudos 📖📚
nav.addEventListener('click', function (e) {
  if (e.pointerType === 'mouse' && e.target.closest('#opcao1')) { //python
    palavras = palavraspy;
    novaPalavra();
    e.target.blur();
  } else if (e.pointerType === 'mouse' && e.target.closest('#opcao2')) { // js
    palavras = palavrasjs;
    novaPalavra();
    e.target.blur();
  } else if (e.pointerType === 'mouse' && e.target.closest('#opcao3')) { // css
    palavras = palavrascss;
    novaPalavra();
    e.target.blur();
  } else if (e.pointerType === 'mouse' && e.target.closest('#opcao4')) { //artes
    palavras = palavrasart;
    novaPalavra();
    e.target.blur();
  } else if (e.pointerType === 'mouse' && e.target.closest('#opcao5')) { //hitoria
    palavras = palavrashis;
    novaPalavra();
    e.target.blur();
  }
  //________________________________________________________________☑️➖➕______________
});

let palavraAtual = "";
let indexLetra = 0;
let letrasDigitadas = [];

function novaPalavra() {
  palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];
  indexLetra = 0;
  letrasDigitadas = [];
  const palavraElemento = document.getElementById("aleatorias");
  palavraElemento.innerHTML = palavraAtual  // aqui foi mudado 
    .split("")
    .map((letra, index) => `<span id="letra-${index}">${letra}</span>`)
    .join("");
  resetTeclas();
}

function resetTeclas() {
  teclas.forEach(tecla => {
    tecla.classList.remove("correta", "errada", "ativa");
    tecla.style.backgroundColor = '';
  });
}

document.addEventListener("keydown", function (event) {
  const letraPressionada = event.key.toLowerCase();
  const letraEsperada = palavraAtual[indexLetra]?.toLowerCase();

  const teclaVirtual = document.getElementById(letraPressionada);
  const letraElemento = document.getElementById(`letra-${indexLetra}`);

  if (teclaVirtual) {
    teclaVirtual.classList.remove("ativa", "correta", "errada");
    teclaVirtual.classList.add("ativa");
    teclaVirtual.style.backgroundColor = 'lightgray';
  }

  if (letraPressionada === letraEsperada) {
    if (letraElemento) {
      letraElemento.style.color = 'green';
    }
    letrasDigitadas[indexLetra] = letraPressionada;
    indexLetra++;

    if (teclaVirtual) teclaVirtual.classList.add("correta");

    if (indexLetra === palavraAtual.length) {
      setTimeout(novaPalavra, 800);
    }
  } else if (palavraAtual.includes(letraPressionada) && !letrasDigitadas.includes(letraPressionada)) {
    const letrasNaPalavra = document.querySelectorAll("#aleatorias span");
    letrasNaPalavra.forEach((span, i) => {
      if (span.textContent.toLowerCase() === letraPressionada) {
        span.style.color = 'orange';
      }
    });
    if (teclaVirtual) teclaVirtual.classList.add("errada");
  } else {
    if (letraElemento) {
      letraElemento.style.color = 'red';
    }
    if (teclaVirtual) teclaVirtual.classList.add("errada");
  }
});

document.addEventListener("keyup", function (event) {
  const teclaVirtual = document.getElementById(event.key.toLowerCase());
  if (teclaVirtual) {
    teclaVirtual.classList.remove("ativa");
    teclaVirtual.style.backgroundColor = '';
  }
});

let buttons = document.getElementsByClassName('cbutton');

for (let button of buttons) {
  button.addEventListener('click',
    function () {
      for (let btn of buttons) {
        btn.classList.remove('clicked');
      }
      this.classList.toggle('clicked');
    }
  );
}

//_______________________________________________________________________________________//

//🎯keybords dinamicos
function acenderTecla(codigo) {
  const tecla = document.getElementById(codigo.toLowerCase());

  if (tecla) {
    tecla.classList.add('ativa');

    setTimeout(() => {
      tecla.classList.remove('ativa');
    }, 150);
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  //mapa🗺️
  const mapeamento = {
    ' ': 'space',
    'Shift': 'shift-esq',
    'Control': 'ctrl-esq',
    'Alt': 'alt-esq',
    'Escape': 'esc',
    'Enter': 'enter',
    'Tab': 'tab',
    'Backspace': 'backspace',
    ',': 'virgula',
    '.': 'ponto',
    '/': 'barra-final',
    '\\': 'barra',
    '-': 'menos',
    '=': 'igual',
    '[': 'colchete-abre',
    ']': 'colchete-fecha',
    'ç': 'cedilha',
    '~': 'tio',
    '`': 'acento_agudo'
  };

  const idTecla = mapeamento[key] || key.toLowerCase();
  acenderTecla(idTecla);
});

teclas.forEach(tecla => {
  tecla.addEventListener('click', () => {
    tecla.classList.add('ativa');
    setTimeout(() => tecla.classList.remove('ativa'), 150);
  });
});

function colorbuttons(e) {
  e.addEventListener('click',
    function () {
      e.classList.toggle('catalagokey');
    }
  );
}

colorbuttons(op1);
colorbuttons(op2);
colorbuttons(op3);
colorbuttons(op4);
colorbuttons(op5);
colorbuttons(op6);

let botoes = [op1, op2, op3, op4, op5, op6];

function removeButtons(bu) {
  bu.addEventListener('click',
    function () {
      botoes.forEach(b => b.classList.remove('catalagokey'));
      bu.classList.add('catalagokey');
    }
  );
}

removeButtons(op1);
removeButtons(op2);
removeButtons(op3);
removeButtons(op4);
removeButtons(op5);
removeButtons(op6);

const optionKeyDiv = document.getElementById('optionkey');
const customOptions = document.querySelector('.custom-options-container');

optionKeyDiv.addEventListener('click', (e) => {
  customOptions.classList.toggle('show');
});

customOptions.addEventListener('click', (e) => {
  e.stopPropagation();
});

const btnEsc = document.getElementById('esc');
const btn1 = document.getElementById('tecla1');
const btn2 = document.getElementById('tecla2');
const btn3 = document.getElementById('tecla3');
const btn4 = document.getElementById('tecla4');
const btn5 = document.getElementById('tecla5');
const btn6 = document.getElementById('tecla6');
const btn7 = document.getElementById('tecla7');
const btn8 = document.getElementById('tecla8');
const btn9 = document.getElementById('tecla9');
const btn0 = document.getElementById('tecla0');
const btnMenos = document.getElementById('menos');
const btnIgual = document.getElementById('igual');
const btnBackspace = document.getElementById('backspace');

const btnTab = document.getElementById('tab');
const btnQ = document.getElementById('q');
const btnW = document.getElementById('w');
const btnE = document.getElementById('e');
const btnR = document.getElementById('r');
const btnT = document.getElementById('t');
const btnY = document.getElementById('y');
const btnU = document.getElementById('u');
const btnI = document.getElementById('i');
const btnO = document.getElementById('o');
const btnP = document.getElementById('p');
const btnAcento = document.getElementById('acento_agudo');
const btnColAbre = document.getElementById('colchete-abre');
const btnEnter = document.getElementById('enter');
const eltTopText = document.getElementById('top-text');

const btnCaps = document.getElementById('caps');
const btnA = document.getElementById('a');
const btnS = document.getElementById('s');
const btnD = document.getElementById('d');
const btnF = document.getElementById('f');
const btnG = document.getElementById('g');
const btnH = document.getElementById('h');
const btnJ = document.getElementById('j');
const btnK = document.getElementById('k');
const btnL = document.getElementById('l');
const btnCedilha = document.getElementById('cedilha');
const btnTio = document.getElementById('tio');
const btnColFecha = document.getElementById('colchete-fecha');

const btnShiftEsq = document.getElementById('shift-esq');
const btnBarraInv = document.getElementById('barra');
const btnZ = document.getElementById('z');
const btnX = document.getElementById('x');
const btnC = document.getElementById('c');
const btnV = document.getElementById('v');
const btnB = document.getElementById('b');
const btnN = document.getElementById('n');
const btnM = document.getElementById('m');
const btnVirgula = document.getElementById('virgula');
const btnPonto = document.getElementById('ponto');
const btnBarraFim = document.getElementById('barra-final');
const btnShiftDir = document.getElementById('shift-dir');

const btnCtrlEsq = document.getElementById('ctrl-esq');
const btnWin = document.getElementById('win');
const btnAltEsq = document.getElementById('alt-esq');
const btnSpace = document.getElementById('space');
const btnAltDir = document.getElementById('alt-dir');
const btnFn = document.getElementById('fn');
const btnCtrlDir = document.getElementById('ctrl-dir');

const te = {
  '1': btn1, '2': btn2, '3': btn3, '4': btn4, '5': btn5,
  '6': btn6, '7': btn7, '8': btn8, '9': btn9, '0': btn0,
  '-': btnMenos, '=': btnIgual,

  q: btnQ, w: btnW, e: btnE, r: btnR, t: btnT,
  y: btnY, u: btnU, i: btnI, o: btnO, p: btnP,
  '`': btnAcento,
  '[': btnColAbre,

  a: btnA, s: btnS, d: btnD, f: btnF, g: btnG,
  h: btnH, j: btnJ, k: btnK, l: btnL,
  'ç': btnCedilha, '~': btnTio, ']': btnColFecha,

  '\\': btnBarraInv, z: btnZ, x: btnX, c: btnC, v: btnV,
  b: btnB, n: btnN, m: btnM, ',': btnVirgula,
  '.': btnPonto, '/': btnBarraFim
};

const layouts = {
  qwerty: {
    '1': '1 !', '2': '2 @', '3': '3 #', '4': '4 $', '5': '5 %',
    '6': '6 ¨', '7': '7 &', '8': '8 *', '9': '9 (', '0': '0 )',
    '-': '- _', '=': '= +',

    q: 'Q', w: 'W', e: 'E', r: 'R', t: 'T',
    y: 'Y', u: 'U', i: 'I', o: 'O', p: 'P',
    '`': '´ `',
    '[': '[ {',

    a: 'A', s: 'S', d: 'D', f: 'F', g: 'G',
    h: 'H', j: 'J', k: 'K', l: 'L',
    'ç': 'Ç', '~': '~ ^',
    ']': '] }',

    '\\': '\\ |',
    z: 'Z', x: 'X', c: 'C', v: 'V', b: 'B',
    n: 'N', m: 'M', ',': ',', '.': '.', '/': '/ ?'
  },
  abnt2: {
    '1': '1 !', '2': '2 @', '3': '3 #', '4': '4 $', '5': '5 %',
    '6': '6 ¨', '7': '7 &', '8': '8 *', '9': '9 (', '0': '0 )',
    '-': '- _', '=': '= +',

    q: 'Q', w: 'W', e: 'E', r: 'R', t: 'T',
    y: 'Y', u: 'U', i: 'I', o: 'O', p: 'P',
    '`': "' \"",
    '[': '[ {',

    a: 'A', s: 'S', d: 'D', f: 'F', g: 'G',
    h: 'H', j: 'J', k: 'K', l: 'L',
    'ç': 'Ç', '~': '` ~',
    ']': '] }',

    '\\': '\\ |',
    z: 'Z', x: 'X', c: 'C', v: 'V', b: 'B',
    n: 'N', m: 'M', ',': ',', '.': '.', '/': '; :'
  },
  azerty: {
    '1': '1 &', '2': '2 é', '3': '3 "', '4': '4 ’', '5': '5 (',
    '6': '6 -', '7': '7 è', '8': '8 _', '9': '9 ç', '0': '0 à',
    '-': ')', '=': '=',

    q: 'A', w: 'Z', e: 'E', r: 'R', t: 'T',
    y: 'Y', u: 'U', i: 'I', o: 'O', p: 'P',
    '`': '^',
    '[': '$',

    a: 'Q', s: 'S', d: 'D', f: 'F', g: 'G',
    h: 'H', j: 'J', k: 'K', l: 'L',
    'ç': 'M',
    '~': 'Ù',
    ']': '`',

    '\\': '* µ',
    z: 'W', x: 'X', c: 'C', v: 'V', b: 'B',
    n: 'N', m: ',',
    ',': ';',
    '.': ':',
    '/': '!'
  },
  qwertz: {
    '1': '1 !', '2': '2 "', '3': '3 §', '4': '4 $', '5': '5 %',
    '6': '6 &', '7': '7 /', '8': '8 (', '9': '9 )', '0': '0 =',
    '-': 'ß ?', '=': '´ `',

    q: 'Q', w: 'W', e: 'E', r: 'R', t: 'T',
    y: 'Z', u: 'U', i: 'I', o: 'O', p: 'P',
    '`': 'Ü',
    '[': '+ *',

    a: 'A', s: 'S', d: 'D', f: 'F', g: 'G',
    h: 'H', j: 'J', k: 'K', l: 'L',
    'ç': 'Ö',
    '~': 'Ä',
    ']': '# \'',

    '\\': '< >',
    z: 'Y', x: 'X', c: 'C', v: 'V', b: 'B',
    n: 'N', m: 'M', ',': ',', '.': '.', '/': '-'
  },
  dvorak: {
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
    '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
    '-': '[ {',
    '=': '] }',

    q: "' \"",
    w: ', <',
    e: '. >',
    r: 'P', t: 'Y',
    y: 'F', u: 'G', i: 'C', o: 'R', p: 'L',
    '`': '/',
    '[': '= +',

    a: 'A', s: 'O', d: 'E', f: 'U', g: 'I',
    h: 'D', j: 'H', k: 'T', l: 'N',
    'ç': 'S',
    '~': '-',
    ']': '\\ |',

    '\\': '?',
    z: '; :',
    x: 'Q',
    c: 'J', v: 'K', b: 'X',
    n: 'B', m: 'M', ',': 'W', '.': 'V', '/': 'Z'
  },
  colemak: {
    '1': '1 !', '2': '2 @', '3': '3 #', '4': '4 $', '5': '5 %',
    '6': '6 ¨', '7': '7 &', '8': '8 *', '9': '9 (', '0': '0 )',
    '-': '- _', '=': '= +',

    q: 'Q', w: 'W', e: 'F', r: 'P', t: 'G',
    y: 'J', u: 'L', i: 'U', o: 'Y', p: ';',
    '`': '´ `',
    '[': '[ {',

    a: 'A', s: 'R', d: 'S', f: 'T', g: 'D',
    h: 'H', j: 'N', k: 'E', l: 'I',
    'ç': 'O',
    '~': '~ ^',
    ']': '] }',

    '\\': '\\ |',
    z: 'Z', x: 'X', c: 'C', v: 'V', b: 'B',
    n: 'K', m: 'M', ',': ',', '.': '.', '/': '/ ?'
  }
};

function aplicarLayout(layout) {
  for (const [id, valorPadrao] of Object.entries(layouts.qwerty)) {
    if (te[id]) {
      te[id].classList.remove('azerty', 'qwertz', 'dvorak', 'colemak', 'abnt2');
      te[id].textContent = valorPadrao.split(' ')[0];
    }
  }

  const keyContainer = document.getElementById('keyboard-container');
  if (keyContainer) {
    keyContainer.classList.remove('azerty', 'qwertz', 'dvorak', 'colemak', 'abnt2');
  }

  btnEnter.textContent = ' ';
  eltTopText.textContent = 'enter';
  btnEnter.classList.remove('azerty', 'qwertz', 'dvorak', 'colemak', 'abnt2');
  eltTopText.classList.remove('azerty', 'qwertz', 'dvorak', 'colemak', 'abnt2');

  const teclasLayout = layouts[layout];

  if (keyContainer) {
    keyContainer.classList.add(layout);
  }

  for (const [id, novoValor] of Object.entries(teclasLayout)) {
    if (te[id]) {
      te[id].textContent = novoValor.split(' ')[0];
      te[id].classList.add(layout);
    }
  }

  if (layout === 'azerty') {
    btnEnter.textContent = '';
    eltTopText.textContent = 'enter';
    btnEnter.classList.add('azerty');
    eltTopText.classList.add('azerty');
  } else if (layout === 'dvorak') {
    btnEnter.textContent = '';
    eltTopText.textContent = 'Enter';
    btnEnter.classList.add('dvorak');
    eltTopText.classList.add('dvorak');
  }
}

document.querySelectorAll('.custom-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const layout = btn.getAttribute('data-value');
    aplicarLayout(layout);
  });
});

const linha1 = document.getElementsByClassName('linha1');
const linha2 = document.getElementsByClassName('linha2');
const linha3 = document.getElementsByClassName('linha3');
const linha4 = document.getElementsByClassName('linha4');
const linha5 = document.getElementsByClassName('linha5');

// qwerty
op1.addEventListener('click',
  () => {
    btnCedilha.textContent = '; :';
    btnTio.textContent = "' \"";
  }
);

//azeryt ⌨️
function adicionarClasseAzerty() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(el => {
      el.classList.add('azerty');
    });
  });
}

function removerClasseAzerty() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(el => {
      el.classList.remove('azerty');
    });
  });
}

op3.addEventListener('click', () => {
  adicionarClasseAzerty();
  btnColFecha.classList.add('azerty');
});

[op1, op2, op4, op5].forEach(b => {
  b.addEventListener('click', () => {
    removerClasseAzerty();
    btnColFecha.classList.remove('azerty');
  });
});

//dvorak ⌨️
function adicionarClassedvorak() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(el => {
      el.classList.add('dvorak');
    });
  });
}

function removeClasseDvorak() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(el => {
      el.classList.remove('dvorak');
    });
  });
}

op5.addEventListener('click',
  () => {
    adicionarClassedvorak();
    btnColFecha.classList.add('dvorak');
  }
);

[op1, op2, op3, op4, op6].forEach(b => {
  b.addEventListener('click',
    () => {
      removeClasseDvorak();
      btnColFecha.classList.remove('dvorak');
    }
  );
});

//colemak ⌨️
function adicionarClasscolemak() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(el => {
      el.classList.add('colemak');
    });
  });
}

function removerClasscolemak() {
  [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
    Array.from(collection).forEach(e => {
      e.classList.remove('colemak');
    });
  });
}

op6.addEventListener('click',
  () => {
    adicionarClasscolemak();
    btnColFecha.classList.add('colemak');
    btnEnter.classList.add('colemak');
  }
);

[op1, op2, op3, op4, op5].forEach(c => {
  c.addEventListener('click',
    () => {
      removerClasscolemak();
      btnColFecha.classList.remove('colemak');
      btnEnter.classList.remove('colemak');
    }
  );
});

//_______________________________________________________________________________________//

// mudando teclado conforme idioma
document.addEventListener('DOMContentLoaded', () => {
  let languagelocal = navigator.language;
  let language = languagelocal.split('-')[0];

  if (language === 'en') {
    // QWERTY
    aplicarLayout('qwerty');
    btnCedilha.textContent = '; :'
    btnTio.textContent = "' \"";
  } else if (language === 'pt') {
    // ABNT2;
    aplicarLayout('abnt2');
  } else if (language === 'fr') {
    // AZERTY
    aplicarLayout('azerty');
    [linha1, linha2, linha3, linha4, linha5].forEach(collection => {
      Array.from(collection).forEach(el => {
        el.classList.add('azerty');
      });
    });
  } else if (language === 'de') {
    // QWERTZ
    aplicarLayout('qwertz');
  } else if (languagelocal === 'en-US-dvorak') {
    // DVORAK (layout alternativo)
    alert('Dvorak layout detected!');
    aplicarLayout('dvorak');
    btnCedilha.textContent = '; :'
    btnTio.textContent = "' \"";
  } else if (languagelocal === 'en-US-colemak') {
    // COLEMAK (layout alternativo)
    aplicarLayout('colemak');
    btnCedilha.textContent = '; :'
    btnTio.textContent = "' \"";
    alert('Colemak layout detected!');
  } else {
    // Layout padrão não identificado
    alert('Layout não identificado, usando QWERTY padrão.');
    aplicarLayout('qwerty');
    btnCedilha.textContent = '; :'
    btnTio.textContent = "' \"";
  }
});

