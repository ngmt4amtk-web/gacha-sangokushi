// ======== AVATAR GENERATION ========
window.Game = window.Game || {};

Game.avatarCache = {};

Game.CHAR_LOOKS = {
  0:{skin:'#f0c8a0',hair:'topknot',hc:'#1a1a1a',beard:'goatee',gear:'crown',wpn:'dual_sword',out:'#c62828'},
  1:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:null,wpn:'guandao',out:'#2e7d32'},
  2:{skin:'#5d4037',hair:'wild',hc:'#111',beard:'circle',gear:null,wpn:'snake_spear',out:'#37474f'},
  3:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown_helm',wpn:'sword',out:'#1565c0'},
  7:{skin:'#f0c8a0',hair:'wild',hc:'#222',beard:null,gear:'pheasant',wpn:'halberd',out:'#4a148c'},
  14:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'short',gear:'headband',wpn:'mace',out:'#1565c0'},
  36:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'fan',out:'#e0e0e0'},
  44:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:'crown',wpn:'guandao',out:'#ffd700'},
  52:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'crown_helm',wpn:'fan',out:'#0d47a1'},
  60:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#ffd700'},
};

Game.seedRng = function(s) {
  return function() { s = (s * 16807) % 2147483647; return s / 2147483647; };
};

Game.autoLook = function(c, rng) {
  var fem = Game.FEMALE_IDS && Game.FEMALE_IDS.has(c.id);
  var type = c.type, fac = c.faction;
  var pick = function(a) { return a[Math.floor(rng() * a.length)]; };
  var skins = ['#f0c8a0','#e8b88a','#d4a574','#c9956b','#f5d5b5'];
  var hcs = ['#1a1a1a','#222','#333','#2c1810'];
  var hm = ['topknot','short','wild','long','shaved','ponytail'];
  var hf = ['updo','long','ponytail','flowing','buns'];
  var outs = [['#c62828','#d32f2f','#b71c1c'],['#1565c0','#1976d2','#0d47a1'],['#2e7d32','#388e3c','#1b5e20'],['#424242','#616161','#546e7a']];
  var gW = ['helmet','iron_helm',null,'headband'];
  var gI = ['scholar','cloth_hat',null];
  var gS = [null,'headband','light_helm'];
  var gD = ['helmet','iron_helm','crown_helm',null];
  var wW = ['sword','spear','axe','mace','halberd'];
  var wI = ['fan','scroll','staff',null];
  var wS = ['bow','dual_blade','dagger','spear'];
  var wD = ['sword','spear','mace','halberd'];
  return {
    skin: pick(skins), hair: fem ? pick(hf) : pick(hm), hc: pick(hcs),
    beard: fem ? null : (rng() > 0.5 ? pick(['short','goatee','circle']) : null),
    gear: type === 0 ? pick(gW) : type === 1 ? pick(gI) : type === 3 ? pick(gD) : pick(gS),
    wpn: type === 0 ? pick(wW) : type === 1 ? pick(wI) : type === 3 ? pick(wD) : pick(wS),
    out: pick(outs[fac] || outs[3]), fem: fem
  };
};

Game.genAvatar = function(charId, sz) {
  var k = charId + '_' + sz;
  if (Game.avatarCache[k]) return Game.avatarCache[k];
  var cv = document.createElement('canvas'); cv.width = cv.height = sz;
  var x = cv.getContext('2d');
  var c = Game.CHAR_BY_ID ? Game.CHAR_BY_ID[charId] : null;
  if (!c) return '';
  var rng = Game.seedRng(charId * 7919 + 42);
  var lk = c.look || Game.CHAR_LOOKS[charId] || Game.autoLook(c, rng);
  Game.drawPortrait(x, c, lk, sz);
  return Game.avatarCache[k] = cv.toDataURL();
};

Game.drawPortrait = function(x, c, lk, s) {
  var fac = c.faction, rar = c.rarity;
  var bgs = [['#4a1a1a','#2a0a0a'],['#1a1a4a','#0a0a2a'],['#1a4a1a','#0a2a0a'],['#2a2a2a','#1a1a1a']];
  var pair = bgs[fac] || bgs[3];
  var g = x.createLinearGradient(0, 0, 0, s);
  g.addColorStop(0, pair[0]); g.addColorStop(1, pair[1]);
  x.fillStyle = g; x.fillRect(0, 0, s, s);
  if (rar >= 5) { x.fillStyle = 'rgba(255,215,0,0.12)'; x.fillRect(0, 0, s, s); }
  var cx = s / 2, hy = s * 0.38, hr = s * 0.18;
  Game.drawWpn(x, lk.wpn, cx, s);
  // Body
  x.fillStyle = lk.out; x.beginPath();
  x.moveTo(cx - s * .28, s); x.lineTo(cx - s * .22, s * .58);
  x.quadraticCurveTo(cx, s * .50, cx + s * .22, s * .58); x.lineTo(cx + s * .28, s); x.fill();
  x.strokeStyle = 'rgba(255,255,255,0.3)'; x.lineWidth = s * .012;
  x.beginPath(); x.moveTo(cx - s * .1, s * .56); x.lineTo(cx, s * .61); x.lineTo(cx + s * .1, s * .56); x.stroke();
  // Neck
  x.fillStyle = lk.skin; x.fillRect(cx - s * .05, s * .48, s * .1, s * .1);
  // Head
  x.fillStyle = lk.skin; x.beginPath(); x.ellipse(cx, hy, hr, hr * 1.1, 0, 0, Math.PI * 2); x.fill();
  // Hair
  Game.drawHairFn(x, lk.hair, lk.hc, cx, hy, hr, s);
  // Eyes
  var ey = hy + hr * .05, es = hr * .4;
  x.fillStyle = '#111';
  if (lk.fem) {
    x.beginPath(); x.ellipse(cx - es, ey, hr * .13, hr * .1, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(cx + es, ey, hr * .13, hr * .1, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#fff';
    x.beginPath(); x.arc(cx - es + hr * .04, ey - hr * .03, hr * .04, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx + es + hr * .04, ey - hr * .03, hr * .04, 0, Math.PI * 2); x.fill();
  } else {
    x.beginPath(); x.moveTo(cx - es - hr * .12, ey); x.lineTo(cx - es, ey - hr * .07);
    x.lineTo(cx - es + hr * .12, ey); x.lineTo(cx - es, ey + hr * .04); x.fill();
    x.beginPath(); x.moveTo(cx + es - hr * .12, ey); x.lineTo(cx + es, ey - hr * .07);
    x.lineTo(cx + es + hr * .12, ey); x.lineTo(cx + es, ey + hr * .04); x.fill();
  }
  // Eyebrows
  x.strokeStyle = lk.hc; x.lineWidth = s * .015;
  x.beginPath(); x.moveTo(cx - es - hr * .15, ey - hr * .22); x.lineTo(cx - es + hr * .15, ey - hr * .15); x.stroke();
  x.beginPath(); x.moveTo(cx + es - hr * .15, ey - hr * .15); x.lineTo(cx + es + hr * .15, ey - hr * .22); x.stroke();
  // Mouth
  var my = hy + hr * .45;
  x.strokeStyle = lk.fem ? '#c0392b' : '#8d6e63'; x.lineWidth = s * .01;
  x.beginPath();
  if (lk.fem) { x.ellipse(cx, my, hr * .1, hr * .05, 0, 0, Math.PI); }
  else { x.moveTo(cx - hr * .12, my); x.lineTo(cx + hr * .12, my); }
  x.stroke();
  // Beard
  if (lk.beard) Game.drawBeardFn(x, lk.beard, lk.hc, cx, my, hr);
  // Gear
  if (lk.gear) Game.drawGearFn(x, lk.gear, cx, hy, hr, s);
  // Rarity border
  if (rar >= 4) {
    x.strokeStyle = rar === 5 ? '#ff4081' : '#ffd700';
    x.lineWidth = s * .03; x.strokeRect(s * .015, s * .015, s * .97, s * .97);
  }
};

Game.drawHairFn = function(x, style, color, cx, hy, hr, s) {
  x.fillStyle = color;
  if (style === 'topknot') {
    x.beginPath(); x.ellipse(cx, hy - hr * 1.2, hr * .2, hr * .25, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(cx, hy - hr * .7, hr * .9, hr * .4, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillRect(cx - hr * .9, hy - hr * .5, hr * .15, hr * .8);
    x.fillRect(cx + hr * .75, hy - hr * .5, hr * .15, hr * .8);
  } else if (style === 'long') {
    x.beginPath(); x.ellipse(cx, hy - hr * .6, hr * 1.1, hr * .5, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillRect(cx - hr * 1.1, hy - hr * .3, hr * .2, s * .35);
    x.fillRect(cx + hr * .9, hy - hr * .3, hr * .2, s * .35);
  } else if (style === 'short') {
    x.beginPath(); x.ellipse(cx, hy - hr * .6, hr * .95, hr * .5, 0, Math.PI, Math.PI * 2); x.fill();
  } else if (style === 'wild') {
    x.beginPath(); x.ellipse(cx, hy - hr * .5, hr * 1.2, hr * .6, 0, Math.PI, Math.PI * 2); x.fill();
    for (var i = -3; i <= 3; i++) {
      x.beginPath();
      x.moveTo(cx + i * hr * .25, hy - hr * .8);
      x.lineTo(cx + i * hr * .3 + hr * .1, hy - hr * 1.3 - Math.abs(i) * hr * .1);
      x.lineTo(cx + i * hr * .35, hy - hr * .8); x.fill();
    }
    x.fillRect(cx - hr * 1.15, hy - hr * .3, hr * .2, hr * .6);
    x.fillRect(cx + hr * .95, hy - hr * .3, hr * .2, hr * .6);
  } else if (style === 'shaved') {
    x.beginPath(); x.ellipse(cx, hy - hr * .5, hr * .85, hr * .35, 0, Math.PI, Math.PI * 2); x.fill();
  } else if (style === 'ponytail') {
    x.beginPath(); x.ellipse(cx, hy - hr * .6, hr * .95, hr * .5, 0, Math.PI, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx + hr * .5, hy - hr * .8);
    x.quadraticCurveTo(cx + hr * 1.5, hy - hr * .5, cx + hr * 1.2, hy + hr * .5);
    x.lineTo(cx + hr * .9, hy + hr * .3);
    x.quadraticCurveTo(cx + hr * 1.1, hy - hr * .3, cx + hr * .3, hy - hr * .7); x.fill();
  } else if (style === 'updo') {
    x.beginPath(); x.ellipse(cx, hy - hr * .7, hr * .9, hr * .5, 0, Math.PI, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(cx, hy - hr * 1.2, hr * .35, hr * .3, 0, 0, Math.PI * 2); x.fill();
    x.fillRect(cx - hr * .95, hy - hr * .2, hr * .12, hr * 1.2);
    x.fillRect(cx + hr * .83, hy - hr * .2, hr * .12, hr * 1.2);
  } else if (style === 'flowing') {
    x.beginPath(); x.ellipse(cx, hy - hr * .6, hr * 1.0, hr * .5, 0, Math.PI, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - hr * 1.0, hy - hr * .3);
    x.quadraticCurveTo(cx - hr * 1.3, hy + hr * .5, cx - hr * .8, s * .8);
    x.lineTo(cx - hr * .6, s * .7); x.quadraticCurveTo(cx - hr * 1.0, hy + hr * .3, cx - hr * .85, hy - hr * .1); x.fill();
    x.beginPath(); x.moveTo(cx + hr * 1.0, hy - hr * .3);
    x.quadraticCurveTo(cx + hr * 1.3, hy + hr * .5, cx + hr * .8, s * .8);
    x.lineTo(cx + hr * .6, s * .7); x.quadraticCurveTo(cx + hr * 1.0, hy + hr * .3, cx + hr * .85, hy - hr * .1); x.fill();
  } else if (style === 'buns') {
    x.beginPath(); x.ellipse(cx, hy - hr * .6, hr * .9, hr * .45, 0, Math.PI, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx - hr * .6, hy - hr * 1.0, hr * .3, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx + hr * .6, hy - hr * 1.0, hr * .3, 0, Math.PI * 2); x.fill();
  }
};

Game.drawBeardFn = function(x, type, color, cx, my, hr) {
  x.fillStyle = color;
  if (type === 'long') {
    x.beginPath(); x.moveTo(cx - hr * .3, my);
    x.quadraticCurveTo(cx - hr * .4, my + hr * 1.5, cx, my + hr * 2);
    x.quadraticCurveTo(cx + hr * .4, my + hr * 1.5, cx + hr * .3, my); x.fill();
  } else if (type === 'short') {
    x.beginPath(); x.moveTo(cx - hr * .25, my + hr * .1);
    x.quadraticCurveTo(cx, my + hr * .5, cx + hr * .25, my + hr * .1); x.fill();
  } else if (type === 'goatee') {
    x.beginPath(); x.ellipse(cx, my + hr * .3, hr * .12, hr * .25, 0, 0, Math.PI * 2); x.fill();
  } else if (type === 'circle') {
    x.beginPath(); x.ellipse(cx, my + hr * .15, hr * .3, hr * .3, 0, 0, Math.PI); x.fill();
    x.fillRect(cx - hr * .2, my - hr * .05, hr * .4, hr * .1);
  }
};

Game.drawGearFn = function(x, type, cx, hy, hr, s) {
  if (type === 'crown') {
    x.fillStyle = '#ffd700'; x.beginPath();
    x.moveTo(cx - hr * .6, hy - hr * .9); x.lineTo(cx - hr * .5, hy - hr * 1.4);
    x.lineTo(cx - hr * .2, hy - hr * 1.1); x.lineTo(cx, hy - hr * 1.5);
    x.lineTo(cx + hr * .2, hy - hr * 1.1); x.lineTo(cx + hr * .5, hy - hr * 1.4);
    x.lineTo(cx + hr * .6, hy - hr * .9); x.fill();
    x.fillRect(cx - hr * .65, hy - hr * .95, hr * 1.3, hr * .15);
    x.fillStyle = '#e53935'; x.beginPath(); x.arc(cx, hy - hr * 1.0, hr * .08, 0, Math.PI * 2); x.fill();
  } else if (type === 'crown_helm') {
    x.fillStyle = '#b0bec5'; x.beginPath();
    x.ellipse(cx, hy - hr * .7, hr * 1.0, hr * .4, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillStyle = '#ffd700';
    x.fillRect(cx - hr * .7, hy - hr * .95, hr * 1.4, hr * .2);
    x.beginPath(); x.moveTo(cx - hr * .15, hy - hr * 1.05); x.lineTo(cx, hy - hr * 1.4);
    x.lineTo(cx + hr * .15, hy - hr * 1.05); x.fill();
  } else if (type === 'helmet') {
    x.fillStyle = '#78909c'; x.beginPath();
    x.ellipse(cx, hy - hr * .6, hr * 1.05, hr * .55, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillStyle = '#546e7a'; x.fillRect(cx - hr * .8, hy - hr * .65, hr * 1.6, hr * .15);
  } else if (type === 'iron_helm') {
    x.fillStyle = '#607d8b'; x.beginPath();
    x.ellipse(cx, hy - hr * .55, hr * 1.1, hr * .6, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillRect(cx - hr * .05, hy - hr * .65, hr * .1, hr * .5);
  } else if (type === 'scholar') {
    x.fillStyle = '#3e2723'; x.fillRect(cx - hr * .8, hy - hr * 1.1, hr * 1.6, hr * .25);
    x.fillStyle = '#4e342e'; x.beginPath();
    x.ellipse(cx, hy - hr * .85, hr * .6, hr * .35, 0, Math.PI, Math.PI * 2); x.fill();
  } else if (type === 'cloth_hat') {
    x.fillStyle = '#5d4037'; x.beginPath();
    x.ellipse(cx, hy - hr * .8, hr * .8, hr * .45, 0, Math.PI, Math.PI * 2); x.fill();
    x.fillRect(cx - hr * .5, hy - hr * .85, hr * 1.0, hr * .15);
  } else if (type === 'headband') {
    x.fillStyle = '#f44336'; x.fillRect(cx - hr * 1.0, hy - hr * .6, hr * 2.0, hr * .12);
    x.beginPath(); x.arc(cx + hr * 1.0, hy - hr * .55, hr * .1, 0, Math.PI * 2); x.fill();
  } else if (type === 'pheasant') {
    x.fillStyle = '#ffd700'; x.fillRect(cx - hr * .7, hy - hr * 1.0, hr * 1.4, hr * .2);
    x.fillStyle = '#e91e63';
    x.beginPath(); x.moveTo(cx - hr * .2, hy - hr * 1.1);
    x.quadraticCurveTo(cx - hr * .8, hy - hr * 2.0, cx - hr * .3, hy - hr * 2.2);
    x.quadraticCurveTo(cx - hr * .1, hy - hr * 1.8, cx - hr * .1, hy - hr * 1.1); x.fill();
    x.beginPath(); x.moveTo(cx + hr * .2, hy - hr * 1.1);
    x.quadraticCurveTo(cx + hr * .8, hy - hr * 2.0, cx + hr * .3, hy - hr * 2.2);
    x.quadraticCurveTo(cx + hr * .1, hy - hr * 1.8, cx + hr * .1, hy - hr * 1.1); x.fill();
  } else if (type === 'hairpin') {
    x.fillStyle = '#ffd700'; x.beginPath();
    x.moveTo(cx - hr * .5, hy - hr * 1.1); x.lineTo(cx + hr * .5, hy - hr * 1.3);
    x.lineTo(cx + hr * .55, hy - hr * 1.2); x.lineTo(cx - hr * .45, hy - hr * 1.0); x.fill();
    x.fillStyle = '#e91e63'; x.beginPath(); x.arc(cx - hr * .5, hy - hr * 1.1, hr * .12, 0, Math.PI * 2); x.fill();
  } else if (type === 'light_helm') {
    x.fillStyle = '#90a4ae'; x.beginPath();
    x.ellipse(cx, hy - hr * .65, hr * .9, hr * .4, 0, Math.PI, Math.PI * 2); x.fill();
  }
};

Game.drawWpn = function(x, type, cx, s) {
  if (!type) return;
  x.save(); x.globalAlpha = 0.6;
  var lw = s * .025;
  if (type === 'sword') {
    x.strokeStyle = '#b0bec5'; x.lineWidth = lw; x.beginPath(); x.moveTo(cx + s * .25, s * .2); x.lineTo(cx + s * .15, s * .75); x.stroke();
    x.strokeStyle = '#795548'; x.lineWidth = s * .03; x.beginPath(); x.moveTo(cx + s * .15, s * .75); x.lineTo(cx + s * .12, s * .85); x.stroke();
    x.strokeStyle = '#ffd700'; x.lineWidth = s * .02; x.beginPath(); x.moveTo(cx + s * .08, s * .74); x.lineTo(cx + s * .22, s * .76); x.stroke();
  } else if (type === 'dual_sword') {
    x.strokeStyle = '#b0bec5'; x.lineWidth = s * .02;
    [-1, 1].forEach(function(d) { x.beginPath(); x.moveTo(cx + d * s * .2, s * .2); x.lineTo(cx + d * s * .15, s * .7); x.stroke(); });
  } else if (type === 'spear') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = lw; x.beginPath(); x.moveTo(cx + s * .2, s * .05); x.lineTo(cx + s * .2, s * .9); x.stroke();
    x.fillStyle = '#b0bec5'; x.beginPath(); x.moveTo(cx + s * .2, s * .05); x.lineTo(cx + s * .16, s * .12); x.lineTo(cx + s * .24, s * .12); x.fill();
  } else if (type === 'snake_spear') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = s * .03; x.beginPath(); x.moveTo(cx - s * .2, s * .05); x.lineTo(cx - s * .2, s * .9); x.stroke();
    x.fillStyle = '#b0bec5'; x.beginPath(); x.moveTo(cx - s * .2, s * .05); x.lineTo(cx - s * .27, s * .1); x.lineTo(cx - s * .2, s * .15); x.lineTo(cx - s * .13, s * .1); x.fill();
  } else if (type === 'guandao') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = s * .03; x.beginPath(); x.moveTo(cx - s * .22, s * .1); x.lineTo(cx - s * .22, s * .95); x.stroke();
    x.fillStyle = '#4caf50'; x.beginPath(); x.moveTo(cx - s * .22, s * .1);
    x.quadraticCurveTo(cx - s * .38, s * .05, cx - s * .35, s * .22); x.lineTo(cx - s * .22, s * .22); x.fill();
  } else if (type === 'halberd') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = lw; x.beginPath(); x.moveTo(cx + s * .22, s * .05); x.lineTo(cx + s * .22, s * .9); x.stroke();
    x.fillStyle = '#b0bec5';
    x.beginPath(); x.moveTo(cx + s * .22, s * .05); x.lineTo(cx + s * .35, s * .12); x.lineTo(cx + s * .22, s * .2); x.fill();
    x.beginPath(); x.moveTo(cx + s * .22, s * .1); x.lineTo(cx + s * .1, s * .15); x.lineTo(cx + s * .22, s * .2); x.fill();
  } else if (type === 'axe') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = s * .03; x.beginPath(); x.moveTo(cx + s * .22, s * .15); x.lineTo(cx + s * .22, s * .85); x.stroke();
    x.fillStyle = '#78909c'; x.beginPath(); x.moveTo(cx + s * .22, s * .15);
    x.quadraticCurveTo(cx + s * .38, s * .22, cx + s * .35, s * .35); x.lineTo(cx + s * .22, s * .3); x.fill();
  } else if (type === 'fan') {
    x.fillStyle = '#e0e0e0'; x.beginPath(); x.moveTo(cx + s * .15, s * .65);
    x.quadraticCurveTo(cx + s * .35, s * .45, cx + s * .25, s * .35);
    x.quadraticCurveTo(cx + s * .1, s * .4, cx + s * .15, s * .65); x.fill();
    x.strokeStyle = '#795548'; x.lineWidth = s * .01; x.stroke();
  } else if (type === 'scroll') {
    x.fillStyle = '#fff9c4'; x.fillRect(cx + s * .12, s * .45, s * .15, s * .25);
    x.fillStyle = '#f44336'; x.beginPath(); x.arc(cx + s * .12, s * .45, s * .03, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(cx + s * .27, s * .45, s * .03, 0, Math.PI * 2); x.fill();
  } else if (type === 'staff') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = s * .02; x.beginPath(); x.moveTo(cx + s * .2, s * .1); x.lineTo(cx + s * .2, s * .9); x.stroke();
    x.fillStyle = '#ffd700'; x.beginPath(); x.arc(cx + s * .2, s * .1, s * .03, 0, Math.PI * 2); x.fill();
  } else if (type === 'bow') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = s * .02; x.beginPath();
    x.moveTo(cx + s * .3, s * .15); x.quadraticCurveTo(cx + s * .15, s * .45, cx + s * .3, s * .75); x.stroke();
    x.strokeStyle = '#e0e0e0'; x.lineWidth = s * .008; x.beginPath(); x.moveTo(cx + s * .3, s * .15); x.lineTo(cx + s * .3, s * .75); x.stroke();
  } else if (type === 'dual_blade') {
    x.strokeStyle = '#b0bec5'; x.lineWidth = s * .015;
    [-1, 1].forEach(function(d) { x.beginPath(); x.moveTo(cx + d * s * .25, s * .3); x.lineTo(cx + d * s * .2, s * .65); x.stroke(); });
  } else if (type === 'dagger') {
    x.strokeStyle = '#b0bec5'; x.lineWidth = s * .02; x.beginPath(); x.moveTo(cx + s * .2, s * .4); x.lineTo(cx + s * .18, s * .6); x.stroke();
  } else if (type === 'mace') {
    x.strokeStyle = '#8d6e63'; x.lineWidth = lw; x.beginPath(); x.moveTo(cx + s * .2, s * .2); x.lineTo(cx + s * .2, s * .8); x.stroke();
    x.fillStyle = '#616161'; x.beginPath(); x.arc(cx + s * .2, s * .2, s * .05, 0, Math.PI * 2); x.fill();
  }
  x.restore();
};
