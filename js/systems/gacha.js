// ======== GACHA SYSTEM ========
window.Game = window.Game || {};

// Rates: N=45%, R=35%, SR=18.3%, SSR=1.5%, UR=0.2%
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
    if (roll < (0.002 + bonus)) { rarity = 5; g.pity = 0; } // UR
    else if (roll < (0.018 + bonus * 2)) { rarity = 4; g.pity = 0; } // SSR
    else if (roll < 0.200) rarity = 3; // SR
    else if (roll < 0.550) rarity = 2; // R
    else rarity = 1; // N
  }
  else {
    var roll = Math.random();
    if (roll < 0.002) { rarity = 5; g.pity = 0; } // UR 0.2%
    else if (roll < 0.018) { rarity = 4; g.pity = 0; } // SSR 1.5%
    else if (roll < 0.200) rarity = 3; // SR 18.2%
    else if (roll < 0.550) rarity = 2; // R 35%
    else rarity = 1; // N 45%
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
  // Signature item lottery (bonus roll alongside weapon)
  var signatureId = null;
  if (Game.SIGNATURE_ITEMS && Game.CHARACTERS) {
    var sigRoll = Math.random();
    var sigCumul = 0;
    var sigRates = {1:0.00002, 2:0.000006, 3:0.000002, 4:0.000001, 5:0.0000002};
    for (var sid = 0; sid < Game.CHARACTERS.length; sid++) {
      if (!Game.SIGNATURE_ITEMS[sid]) continue;
      if (Game.state.ownedSignatures[sid]) continue; // already owned
      var sch = Game.CHARACTERS[sid];
      sigCumul += sigRates[sch.rarity] || 0;
      if (sigRoll < sigCumul) {
        Game.state.ownedSignatures[sid] = true;
        signatureId = sid;
        break;
      }
    }
  }
  return { charId: wid, isNew: isNew, isWeapon: true, signatureId: signatureId };
};

Game.pullWeaponSingle = function() {
  if (Game.state.medals < 100 || Game.isGachaAnimating) return;
  Game.state.medals -= 100;
  Game.initAudio();
  var result = Game.doWeaponPull();
  Game.pendingSignatureReveals = [];
  if (result.signatureId !== null) Game.pendingSignatureReveals.push(result.signatureId);
  Game.showGachaAnimation([result], true);
  Game.saveGame();
};

Game.pullWeaponMulti = function() {
  if (Game.state.medals < 900 || Game.isGachaAnimating) return;
  Game.state.medals -= 900;
  Game.initAudio();
  var results = [];
  Game.pendingSignatureReveals = [];
  for (var i = 0; i < 10; i++) {
    var r = Game.doWeaponPull();
    results.push(r);
    if (r.signatureId !== null) Game.pendingSignatureReveals.push(r.signatureId);
  }
  Game.showGachaAnimation(results, true);
  Game.saveGame();
};

Game.pullWeaponAll = function() {
  var g = Game.state;
  if (g.medals < 100 || Game.isGachaAnimating) return;
  Game.initAudio();
  var results = [];
  Game.pendingSignatureReveals = [];
  // 10-pulls first, then singles
  while (g.medals >= 900) {
    g.medals -= 900;
    for (var i = 0; i < 10; i++) {
      var r = Game.doWeaponPull();
      results.push(r);
      if (r.signatureId !== null) Game.pendingSignatureReveals.push(r.signatureId);
    }
  }
  while (g.medals >= 100) {
    g.medals -= 100;
    var r = Game.doWeaponPull();
    results.push(r);
    if (r.signatureId !== null) Game.pendingSignatureReveals.push(r.signatureId);
  }
  // Show summary instead of animation for large pulls
  if (results.length > 30) {
    Game.showWeaponAllSummary(results);
  } else {
    Game.showGachaAnimation(results, true);
  }
  Game.saveGame();
};

Game.showWeaponAllSummary = function(results) {
  var counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  var newCount = 0;
  var sigCount = 0;
  results.forEach(function(r) {
    var w = Game.getWeapon(r.charId);
    if (w) counts[w.rarity] = (counts[w.rarity] || 0) + 1;
    if (r.isNew) newCount++;
    if (r.signatureId !== null) sigCount++;
  });
  Game.isGachaAnimating = true;
  var overlay = document.getElementById('gacha-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gacha-overlay';
    overlay.className = 'gacha-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:20px">' +
    '<div style="background:rgba(0,0,0,0.95);border:2px solid var(--gold);max-width:340px;width:90%;padding:24px;border-radius:12px;text-align:center">' +
      '<h2 style="color:var(--gold);margin-bottom:16px">武器鍛造結果</h2>' +
      '<div style="font-size:18px;margin-bottom:12px">' + results.length + '回 鍛造</div>' +
      (counts[4] ? '<div style="color:var(--ssr);font-size:16px;font-weight:bold">★4 SSR x' + counts[4] + '</div>' : '') +
      (counts[3] ? '<div style="color:var(--sr);font-size:15px">★3 SR x' + counts[3] + '</div>' : '') +
      (counts[2] ? '<div style="color:var(--r);font-size:14px">★2 R x' + counts[2] + '</div>' : '') +
      (counts[1] ? '<div style="color:var(--n);font-size:13px">★1 N x' + counts[1] + '</div>' : '') +
      (newCount > 0 ? '<div style="color:#4caf50;font-size:14px;margin-top:8px">NEW x' + newCount + '</div>' : '') +
      (sigCount > 0 ? '<div style="color:#ffd700;font-size:16px;font-weight:bold;margin-top:8px;text-shadow:0 0 10px #ff6f00">★専用装備 x' + sigCount + '★</div>' : '') +
      '<button class="battle-close-btn" style="margin-top:16px" onclick="Game.endGachaAnim()">閉じる</button>' +
    '</div></div>';
  overlay.classList.add('show');
};
