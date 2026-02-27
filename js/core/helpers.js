// ======== HELPER FUNCTIONS ========
window.Game = window.Game || {};

Game.formatNum = function(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 10000) return (n/10000).toFixed(1) + '万';
  return Math.floor(n).toLocaleString();
};

Game.rarityClass = function(r) {
  return r === 5 ? 'ur' : r === 4 ? 'ssr' : r === 3 ? 'sr' : r === 2 ? 'r' : 'n';
};

Game.getChar = function(id) {
  return Game.CHARACTERS ? Game.CHARACTERS[id] : null;
};

Game.getCharStats = function(id) {
  var c = Game.getChar(id);
  if (!c) return null;
  var g = Game.state;
  var owned = g.owned[id];
  var totsu = owned ? owned.totsu : 0;
  var mult = 1 + totsu * 0.12 + (totsu > 6 ? (totsu - 6) * 0.05 : 0);
  var wAtk=0, wHp=0, wDef=0;
  var teamIdx = g.team.indexOf(id);
  if (teamIdx >= 0 && g.teamWeapons[teamIdx] >= 0 && g.ownedWeapons[g.teamWeapons[teamIdx]]) {
    var ws = Game.getWeaponStats(g.teamWeapons[teamIdx]);
    if (ws) { wAtk=ws.atk; wHp=ws.hp; wDef=ws.def; }
  }
  return {
    id: c.id, name: c.name, title: c.title, rarity: c.rarity,
    type: c.type, faction: c.faction, chapter: c.chapter,
    skillName: c.skill.name, skillDesc: c.skill.desc, skillType: c.skill.type,
    skillMult: c.skill.mult, skillTarget: c.skill.target,
    lore: c.lore, voiceLine: c.voiceLine, look: c.look,
    totsu: totsu, count: owned ? owned.count : 0,
    atk: Math.floor(c.atk * mult) + wAtk,
    hp: Math.floor(c.hp * mult) + wHp,
    def: Math.floor(c.def * mult) + wDef,
    spd: c.spd || 50,
    baseAtk: c.atk, baseHp: c.hp, baseDef: c.def,
    power: Math.floor((c.atk + c.hp/5 + c.def) * mult) + wAtk + wHp/5 + wDef,
  };
};

Game.getWeapon = function(id) {
  return Game.WEAPONS ? Game.WEAPONS[id] : null;
};

Game.getWeaponStats = function(id) {
  var w = Game.getWeapon(id);
  if (!w) return null;
  var owned = Game.state.ownedWeapons[id];
  var totsu = owned ? owned.totsu : 0;
  var mult = 1 + totsu * 0.1;
  return {
    id: w.id, name: w.name, rarity: w.rarity, weaponType: w.weaponType,
    atk: Math.floor(w.atk * mult), hp: Math.floor(w.hp * mult), def: Math.floor(w.def * mult),
    skillName: w.skillName, skillDesc: w.skillDesc,
    totsu: totsu, count: owned ? owned.count : 0,
  };
};

Game.getTeamPower = function() {
  var p = 0;
  for (var i = 0; i < Game.state.team.length; i++) {
    var id = Game.state.team[i];
    if (id >= 0 && Game.state.owned[id]) p += Game.getCharStats(id).power;
  }
  return p;
};

Game.getOwnedCount = function() {
  return Object.keys(Game.state.owned).length;
};

Game.getGachaPool = function() {
  if (!Game.CHARACTERS) return [];
  var chapter = Game.state.currentChapter;
  return Game.CHARACTERS.filter(function(c) {
    return c && c.chapter <= chapter;
  });
};

Game.getPoolSize = function() {
  return Game.getGachaPool().length;
};

Game.getCurrentChapter = function() {
  if (!Game.CHAPTERS) return null;
  return Game.CHAPTERS.find(function(ch) { return ch.id === Game.state.currentChapter; });
};

Game.getStageData = function(stageId) {
  if (!Game.CHAPTERS) return null;
  for (var i = 0; i < Game.CHAPTERS.length; i++) {
    var ch = Game.CHAPTERS[i];
    for (var j = 0; j < ch.stages.length; j++) {
      if (ch.stages[j].id === stageId) return { chapter: ch, stage: ch.stages[j] };
    }
  }
  return null;
};

Game.getMedalRate = function() {
  return 1 + Math.floor(Game.state.currentChapter * 2);
};
