// ======== WEAPON ICON GENERATION ========
window.Game = window.Game || {};

Game.weaponIconCache = {};

Game.genWeaponIcon = function(wid, sz) {
  var k = 'w' + wid + '_' + sz;
  if (Game.weaponIconCache[k]) return Game.weaponIconCache[k];
  var cv = document.createElement('canvas'); cv.width = cv.height = sz;
  var x = cv.getContext('2d');
  var w = Game.WEAPONS ? Game.WEAPONS[wid] : null;
  if (!w) return '';
  var rar = w.rarity;
  var bgs = { 1:['#222','#111'], 2:['#1a2a4a','#0a1a2a'], 3:['#2a1a3a','#1a0a2a'], 4:['#3a2a00','#2a1a00'] };
  var pair = bgs[rar] || bgs[1];
  var g = x.createLinearGradient(0, 0, 0, sz);
  g.addColorStop(0, pair[0]); g.addColorStop(1, pair[1]);
  x.fillStyle = g; x.fillRect(0, 0, sz, sz);
  x.save(); x.globalAlpha = 0.8;
  var wpnTypes = ['spear','sword','fan','bow','mace'];
  Game.drawWpn(x, wpnTypes[w.weaponType] || 'sword', sz / 2, sz);
  x.restore();
  if (rar >= 3) {
    x.strokeStyle = rar === 4 ? '#ffd700' : '#ab47bc';
    x.lineWidth = sz * .03; x.strokeRect(sz * .015, sz * .015, sz * .97, sz * .97);
  }
  x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(0, sz * 0.7, sz, sz * 0.3);
  x.fillStyle = '#fff'; x.font = 'bold ' + Math.floor(sz * 0.12) + 'px sans-serif';
  x.textAlign = 'center'; x.fillText(w.name, sz / 2, sz * 0.88);
  return Game.weaponIconCache[k] = cv.toDataURL();
};
