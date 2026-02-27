// ======== GACHA SYSTEM ========
window.Game = window.Game || {};

// Rates: N=40%, R=30%, SR=20%, SSR=8%, UR=2%
// Pity at 80, soft pity from 65

Game.doGachaPull = function() {
  var g = Game.state;
  g.pity++;
  g.totalPulls++;
  var rarity;

  // Pity at 80 = guaranteed SSR+
  if (g.pity >= 80) {
    rarity = Math.random() < 0.25 ? 5 : 4; // 25% UR, 75% SSR
    g.pity = 0;
  }
  // Soft pity from 65
  else if (g.pity >= 65) {
    var bonus = (g.pity - 64) * 0.04;
    var roll = Math.random();
    if (roll < (0.02 + bonus)) { rarity = 5; g.pity = 0; } // UR
    else if (roll < (0.10 + bonus * 2)) { rarity = 4; g.pity = 0; } // SSR
    else if (roll < 0.30) rarity = 3; // SR
    else if (roll < 0.60) rarity = 2; // R
    else rarity = 1; // N
  }
  else {
    var roll = Math.random();
    if (roll < 0.02) { rarity = 5; g.pity = 0; } // UR 2%
    else if (roll < 0.10) { rarity = 4; g.pity = 0; } // SSR 8%
    else if (roll < 0.30) rarity = 3; // SR 20%
    else if (roll < 0.60) rarity = 2; // R 30%
    else rarity = 1; // N 40%
  }

  // Pick character of that rarity from unlocked chapters
  var pool = Game.getGachaPool().filter(function(c) { return c.rarity === rarity; });
  if (pool.length === 0) {
    // Fallback: any character of that rarity
    pool = Game.CHARACTERS.filter(function(c) { return c && c.rarity === rarity; });
  }
  if (pool.length === 0) {
    // Emergency fallback
    pool = Game.CHARACTERS.filter(function(c) { return c && c.rarity <= 2; });
  }
  var picked = pool[Math.floor(Math.random() * pool.length)];
  return Game.processGachaPull(picked.id);
};

Game.processGachaPull = function(charId) {
  var g = Game.state;
  var isNew = !g.owned[charId];
  if (isNew) {
    g.owned[charId] = { count: 1, totsu: 0 };
    g.newFlags[charId] = true;
  } else {
    g.owned[charId].count++;
    g.owned[charId].totsu++;
  }
  if (Game.CHARACTERS[charId] && Game.CHARACTERS[charId].rarity >= 4) g.ssrPulled++;
  return { charId: charId, isNew: isNew };
};

Game.pullSingle = function() {
  var g = Game.state;
  if (g.heroTickets < 1 || Game.isGachaAnimating) return;
  g.heroTickets--;
  Game.initAudio();
  var result = Game.doGachaPull();
  Game.showGachaAnimation([result], false);
  Game.saveGame();
};

Game.pullMulti = function() {
  var g = Game.state;
  if (g.heroTickets < 10 || Game.isGachaAnimating) return;
  g.heroTickets -= 10;
  Game.initAudio();
  var results = [];
  for (var i = 0; i < 10; i++) results.push(Game.doGachaPull());
  Game.showGachaAnimation(results, false);
  Game.saveGame();
};

// Weapon gacha
Game.doWeaponPull = function() {
  var g = Game.state;
  g.weaponPity = (g.weaponPity || 0) + 1;
  g.weaponPulls = (g.weaponPulls || 0) + 1;
  var rarity;
  if (g.weaponPity >= 60) { rarity = 4; g.weaponPity = 0; }
  else if (g.weaponPity >= 50) {
    var bonus = (g.weaponPity - 49) * 0.06;
    if (Math.random() < 0.04 + bonus) { rarity = 4; g.weaponPity = 0; }
    else if (Math.random() < 0.15) rarity = 3;
    else if (Math.random() < 0.40) rarity = 2;
    else rarity = 1;
  } else {
    var roll = Math.random();
    if (roll < 0.04) { rarity = 4; g.weaponPity = 0; }
    else if (roll < 0.16) rarity = 3;
    else if (roll < 0.50) rarity = 2;
    else rarity = 1;
  }
  var pool = Game.WEAPONS.filter(function(w) { return w.rarity === rarity; });
  if (pool.length === 0) pool = Game.WEAPONS.filter(function(w) { return w.rarity <= 2; });
  var picked = pool[Math.floor(Math.random() * pool.length)];
  var wid = picked.id;
  var isNew = !Game.state.ownedWeapons[wid];
  if (isNew) {
    Game.state.ownedWeapons[wid] = { count: 1, totsu: 0 };
    Game.state.newWeaponFlags[wid] = true;
  } else {
    Game.state.ownedWeapons[wid].count++;
    Game.state.ownedWeapons[wid].totsu++;
  }
  return { charId: wid, isNew: isNew, isWeapon: true };
};

Game.pullWeaponSingle = function() {
  if (Game.state.medals < 100 || Game.isGachaAnimating) return;
  Game.state.medals -= 100;
  Game.initAudio();
  var result = Game.doWeaponPull();
  Game.showGachaAnimation([result], true);
  Game.saveGame();
};

Game.pullWeaponMulti = function() {
  if (Game.state.medals < 900 || Game.isGachaAnimating) return;
  Game.state.medals -= 900;
  Game.initAudio();
  var results = [];
  for (var i = 0; i < 10; i++) results.push(Game.doWeaponPull());
  Game.showGachaAnimation(results, true);
  Game.saveGame();
};
