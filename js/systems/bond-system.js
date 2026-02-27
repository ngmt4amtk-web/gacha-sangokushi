// ======== BOND SYSTEM ========
window.Game = window.Game || {};

// Get active bonds for a set of hero IDs
Game.getActiveBonds = function(teamIds) {
  if (!Game.BONDS || !teamIds) return [];
  var active = [];
  for (var i = 0; i < Game.BONDS.length; i++) {
    var bond = Game.BONDS[i];
    if (!Game.state.discoveredBonds[bond.id]) continue;
    var present = 0;
    for (var j = 0; j < bond.heroes.length; j++) {
      if (teamIds.indexOf(bond.heroes[j]) >= 0) present++;
    }
    if (present >= bond.minRequired) {
      active.push(bond);
    }
  }
  return active;
};

// Check if a bond can be discovered
Game.checkBondDiscovery = function(teamIds) {
  if (!Game.BONDS) return null;
  var discovered = [];
  for (var i = 0; i < Game.BONDS.length; i++) {
    var bond = Game.BONDS[i];
    if (Game.state.discoveredBonds[bond.id]) continue;
    // IF bonds require NG+
    if (bond.isIF && (Game.state.ngPlusLevel || 0) < 1) continue;
    // Check if all heroes are owned
    var allOwned = true;
    for (var j = 0; j < bond.heroes.length; j++) {
      if (!Game.state.owned[bond.heroes[j]]) { allOwned = false; break; }
    }
    if (!allOwned) continue;
    // Check if enough heroes are in team
    var present = 0;
    for (var j = 0; j < bond.heroes.length; j++) {
      if (teamIds.indexOf(bond.heroes[j]) >= 0) present++;
    }
    if (present < bond.minRequired) continue;

    // Calculate discovery chance
    var battleCount = Game.state.bondBattleCounts[bond.id] || 0;
    var chance = (bond.discoveryChance || 0.10) + battleCount * 0.02;
    // Guaranteed at 20 battles
    if (battleCount >= 20) chance = 1.0;

    if (Math.random() < chance) {
      Game.state.discoveredBonds[bond.id] = true;
      discovered.push(bond);
    }
  }
  return discovered;
};

// Increment battle counts for potential bonds
Game.incrementBondBattleCounts = function() {
  if (!Game.BONDS) return;
  var teamIds = Game.state.team.filter(function(id) { return id >= 0; });
  for (var i = 0; i < Game.BONDS.length; i++) {
    var bond = Game.BONDS[i];
    if (Game.state.discoveredBonds[bond.id]) continue;
    var present = 0;
    for (var j = 0; j < bond.heroes.length; j++) {
      if (teamIds.indexOf(bond.heroes[j]) >= 0) present++;
    }
    if (present >= bond.minRequired) {
      if (!Game.state.bondBattleCounts[bond.id]) Game.state.bondBattleCounts[bond.id] = 0;
      Game.state.bondBattleCounts[bond.id]++;
    }
  }
  // Try discovery
  var discovered = Game.checkBondDiscovery(teamIds);
  if (discovered && discovered.length > 0) {
    for (var i = 0; i < discovered.length; i++) {
      Game.showBondDiscovery(discovered[i]);
    }
  }
};

Game.showBondDiscovery = function(bond) {
  Game.playSound('bond_discover');
  var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  Game.spawnParticles(cx, cy, '#ffd700', 40);
  Game.spawnParticles(cx, cy, '#ff9800', 30);

  // Show toast
  Game.showToast('絆発見！【' + bond.name + '】');
  Game.saveGame();
};

Game.showToast = function(msg) {
  var existing = document.querySelector('.game-toast');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.className = 'game-toast';
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
    'background:rgba(255,215,0,0.9);color:#000;padding:10px 20px;border-radius:20px;' +
    'font-size:14px;font-weight:bold;z-index:500;animation:slideUp 0.3s,fadeOut 0.5s 2s forwards;' +
    'pointer-events:none;white-space:nowrap;';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 2500);
};
