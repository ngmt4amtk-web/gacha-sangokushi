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
      // Run migrations if save is older than current version
      if (loaded.saveVersion && loaded.saveVersion < Game.SAVE_VERSION) {
        loaded = Game.migrateSave(loaded);
      }
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

// --- Save Migrations ---
Game.migrateSave = function(saved) {
  // v11 → v12: 旧8章→新12章マイグレーション
  if (saved.saveVersion < 12) {
    var chapterMap = {1:2, 2:4, 3:5, 4:7, 5:9, 6:10, 7:11, 8:12};
    var oldChapter = saved.currentChapter || 1;
    saved.currentChapter = chapterMap[oldChapter] || oldChapter;

    // 前の章のボスステージをクリア済みにする（新IDで）
    // 各章のボスステージID: 1-6, 2-7, 3-8, 4-9, 5-10, 6-11, 7-12, 8-13, 9-14, 10-16, 11-18, 12-22
    if (!saved.clearedStages) saved.clearedStages = {};
    var bossIds = ['1-6','2-7','3-8','4-9','5-10','6-11','7-12','8-13','9-14','10-16','11-18','12-22'];
    for (var i = 0; i < bossIds.length; i++) {
      var chNum = parseInt(bossIds[i].split('-')[0]);
      if (chNum < saved.currentChapter) {
        saved.clearedStages[bossIds[i]] = true;
      }
    }

    // クイズ履歴もリセット（章番号が変わるため）
    saved.quizHistory = {};

    saved.saveVersion = 12;
  }

  return saved;
};

Game.exportSave = function() {
  return btoa(JSON.stringify(Game.state));
};

Game.importSave = function(str) {
  try {
    var data = JSON.parse(atob(str));
    // Run migrations if needed
    if (data.saveVersion && data.saveVersion < Game.SAVE_VERSION) {
      data = Game.migrateSave(data);
    }
    if (data.saveVersion === Game.SAVE_VERSION) {
      var def = Game.defaultState();
      for (var key in def) {
        if (!(key in data)) data[key] = def[key];
      }
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
