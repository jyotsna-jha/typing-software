// utils/characterMapping.js
const characterMapping = {
  a: "ं",
  A: "ा",
  s: "े",
  S: "ै",
  d: "क",
  D: "क्",
  g: "ह",
  G: "ळ",
  h: "ी",
  j: "र",
  J: "श्र",
  k: "ा",
  K: "ज्ञ",
  l: "स",
  L: "स्",
  q: "ु",
  Q: "फ",
  w: "ू",
  W: "ॅ",
  e: "म",
  E: "म्",
  r: "त",
  R: "त्",
  t: "ज",
  T: "ज्",
  y: "ल",
  Y: "ल्",
  u: "न",
  U: "न्",
  i: "प",
  I: "प्",
  o: "व",
  O: "व्",
  p: "च",
  P: "च्",
  /*  "]": "द्व", */
  "\\": ")",
  "~": "द्य",
  z: "्र",
  Z: "र्",
  x: "ग",
  X: "ग्",
  c: "ब",
  C: "ब्",
  v: "अ",
  V: "ट",
  b: "इ",
  B: "ठ",
  n: "द",
  N: "छ",
  m: "उ",
  M: "ड",
  /* ",": "ए", */
  "<": "ढ",
  ">": "झ",
  "`": "़",
  1: "1",
  2: "2",
  3: "3",
  "#": ":",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "(": "त्र",
  0: "0",
  ")": "ऋ",
 /*  _: ".", */
  "=": "ृ",
  "+": "्",
  /*   "ॅ": "ँ",
   */ "ं": "",

  "\u00BD": "½", // Alt+0189 mapped to ½
  "\u00BE": "¾", // Alt+0190 mapped to ¾
  "\u00D7": "×", // Alt+0215 mapped to ×
  "\u00D8": "Ø", // Alt+0216 mapped to Ø
  "\u00DE": "Þ", // Alt+0222 mapped to Þ
  "\u00DF": "ß", // Alt+0223 mapped to ß
  "\u00F7": "÷", // Alt+0247 mapped to ÷
  "\u0099": "™", // Alt+0153 mapped to ™
  "\u009A": "š", // Alt+0154 mapped to š
  "\u009B": "›", // Alt+0155 mapped to ›
  "\u009C": "œ", // Alt+0156 mapped to œ
  "\u00A9": "©", // Alt+0169 mapped to ©
  "\u00B9": "¹", // Alt+0185 mapped to ¹
  "\u0085": "•", // Alt+0149 mapped to •
  "\u0021": "!",
  "\u0025": "%",
  "\u0097": "—",
  "\u0098": "~", // Alt+0152 mapped to ~
  "\u0096": "–", // Alt+0150 mapped to –
 /*  "\u0084": '"', */ // Alt+0148 mapped to "
  "\u0082": "“", // Alt+0147 mapped to ,
  "\u007D": "}", // Alt+0125 mapped to }
  "\u005D": "]", // Alt+093 mapped to ]
  "\u003D": "=",
  "\u0060": "`",

  /* "\u005C": "\\", // Alt+092 mapped to \ */
  /*  "\u0022": '"',  */
  "}": "द्व",
  "{": "क्ष्‍",
  ".": "ण्",
  F: "थ्",
  H: "भ्",
  "[": "ख्",
  /* making half characters complete */
  "[A": "ख",
  "[k": "ख",
  ".A": "ण",
  ".k": "ण",
  "/A": "ध",
  "/k": "ध",
  "'A": "श",
  "'k": "श",
  '"A': "ष",
 '"k': "ष",
  HA: "भ",
  Hk: "भ",
  FA: "थ",
  Fk: "थ",
  "{A": "क्ष",
  "{k": "क्ष",

  /* conflict creating characters */

  /* "]": ",",
  ",": "ए", */

  /* "!": "|",
"|": "(",
"(": "त्र",
"#": ":",
":": "रु",
$: "*",
"*": "द्ध",
"%": "-",
"-": ";",
";": "य",
"@":"/" */
"_":".",
"*": "द्ध",
  "@": "/",
  "^": "'",
  "&": "'",
  "'": "श्",
   "/": "ध्", 
  '"': "ष्",
  /* "?": "घ्", */
  "\u003F": "?",
   "?A": "घ",
  "?k": "घ",

  f: "ि",
  "f[": "खि्",
 "f[k":"खि",
"f[A":"खि", 
"f'":"शि्",
"f'k":"शि",
"f'A":"शि",
"f/":"धि्",
"f/k":"धि",
"f/A":"धि",
'f"':"षि्",
'f"k':"षि",
'f"A':"षि",
'f{':"क्षि्",
'f{k':"क्षि",
'f{A':"क्षि",
'f?':"घि्",
'f?k':"घि",
'f?A':"घि",

'f.':"णि्",
'f.k':"णि",
'f.A':"णि",

'fF':"थि् ",
'fFk':"थि",
'fFA':"थि",

'fH':"भि् ",
'fHk':"भि",
'fHA':"भि",

"fD":"कि्", 
/*  "fDk":"कि",
 "fDA":"कि",
*/
 "fU":"नि्", 
 /* "fUk":"नि",
 "fUA":"नि"
*/
 /* "fL":"सि्",
"fE":"मि्",
"fR":"ति्",
"fT":"जि्",
"fY":"लि्",
"fI":"पि्",
"fO":"वि्",
"fP":"चि्",
"fX":"गि्",
"fC":" बि्" */
};

export default characterMapping;
