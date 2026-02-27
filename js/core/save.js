// ======== SAVE / LOAD ========
window.Game = window.Game || {};

Game.saveGame = function() {
  Game.state.lastSave = Date.now();
  try { localStorage.setItem(Game.SAVE_KEY, JSON.stringify(Game.state)); } catch(e) {}
};

Game.loadGame = function() {
  try {
    var d = localStorage.getItem(Game.SAVE_KEY);
    if (d) {
      var loaded = JSON.parse(d);
      if (loaded.saveVersion === Game.SAVE_VERSION) {
        var def = Game.defaultState();
        for (var key in def) {
          if (!(key in loaded)) loaded[key] = def[key];
        }
        Game.state = loaded;
        return true;
      }
    }
    // Check for v1 save migration
    var v1 = localStorage.getItem('sangoku_save');
    if (v1) {
      Game.migrateV1(JSON.parse(v1));
      return true;
    }
  } catch(e) { console.error('Load failed:', e); }
  return false;
};

Game.migrateV1 = function(old) {
  var g = Game.defaultState();
  g.medals = old.medals || 0;
  g.heroTickets = (old.heroTickets || 0) + 5; // Bonus for migration
  g.totalPulls = old.totalPulls || 0;
  g.pity = old.pity || 0;
  g.ssrPulled = old.ssrPulled || 0;
  g.totalMedalsEarned = old.totalMedalsEarned || 0;
  g.soundOn = old.soundOn !== false;
  g.battleSpeed = old.battleSpeed || 1;
  // Map old character IDs (0-39) to new IDs (same for first 40)
  if (old.owned) {
    for (var id in old.owned) {
      var nid = parseInt(id);
      if (nid < 40 && Game.CHARACTERS && Game.CHARACTERS[nid]) {
        g.owned[nid] = old.owned[id];
      }
    }
  }
  if (old.ownedWeapons) {
    for (var wid in old.ownedWeapons) {
      var nwid = parseInt(wid);
      if (nwid < 30 && Game.WEAPONS && Game.WEAPONS[nwid]) {
        g.ownedWeapons[nwid] = old.ownedWeapons[wid];
      }
    }
  }
  // Map team
  if (old.team) g.team = old.team.slice(0, 5);
  if (old.teamWeapons) g.teamWeapons = old.teamWeapons.slice(0, 5);
  // Chapter progress based on old maxStage
  var ms = old.maxStage || 1;
  g.currentChapter = Math.min(8, Math.max(1, Math.ceil(ms / 6)));
  g.firstPlay = false;
  Game.state = g;
  Game.saveGame();
};

Game.exportSave = function() {
  return btoa(JSON.stringify(Game.state));
};

Game.importSave = function(str) {
  try {
    var data = JSON.parse(atob(str));
    if (data.saveVersion === Game.SAVE_VERSION) {
      Game.state = data;
      Game.saveGame();
      return true;
    }
  } catch(e) {}
  return false;
};

Game.resetSave = function() {
  if (confirm('セーブデータを完全に削除しますか？')) {
    localStorage.removeItem(Game.SAVE_KEY);
    Game.state = Game.defaultState();
    Game.saveGame();
    location.reload();
  }
};
