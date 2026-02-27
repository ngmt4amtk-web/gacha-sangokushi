// ======== ENCYCLOPEDIA SCREEN ========
window.Game = window.Game || {};

Game.encyclopediaTab = 'chars'; // 'chars' | 'bonds' | 'weapons'
Game.encyclopediaFilter = null;

Game.renderEncyclopedia = function() {
  var g = Game.state;
  var el = document.getElementById('screen-encyclopedia');
  var html = '';

  // Tabs
  html += '<div class="enc-tab-bar">';
  html += '<button class="enc-tab' + (Game.encyclopediaTab === 'chars' ? ' active' : '') + '" ' +
    'onclick="Game.encyclopediaTab=\'chars\';Game.renderEncyclopedia()">武将図鑑</button>';
  html += '<button class="enc-tab' + (Game.encyclopediaTab === 'bonds' ? ' active' : '') + '" ' +
    'onclick="Game.encyclopediaTab=\'bonds\';Game.renderEncyclopedia()">絆一覧</button>';
  html += '<button class="enc-tab' + (Game.encyclopediaTab === 'weapons' ? ' active' : '') + '" ' +
    'onclick="Game.encyclopediaTab=\'weapons\';Game.renderEncyclopedia()">武器図鑑</button>';
  html += '</div>';

  switch (Game.encyclopediaTab) {
    case 'chars': html += Game.renderEncChars(); break;
    case 'bonds': html += Game.renderEncBonds(); break;
    case 'weapons': html += Game.renderEncWeapons(); break;
  }

  el.innerHTML = html;
};

Game.renderEncChars = function() {
  var g = Game.state;
  if (!Game.CHARACTERS) return '<div style="padding:20px;text-align:center;color:var(--text2)">データなし</div>';

  var html = '';

  // Collection rate
  var total = Game.CHARACTERS.filter(function(c) { return c; }).length;
  var owned = Game.getOwnedCount();
  var pct = total > 0 ? (owned / total * 100).toFixed(1) : 0;
  html += '<div class="collection-rate">' +
    '<span style="color:var(--gold);font-weight:bold">' + owned + '</span> / ' + total + ' (' + pct + '%)' +
    '</div>';
  html += '<div class="collection-bar"><div class="collection-fill" style="width:' + pct + '%"></div></div>';

  // Filters
  html += '<div class="filter-bar">';
  var filters = [
    { label: '全て', val: null },
    { label: 'UR', val: 'ur' }, { label: 'SSR', val: 'ssr' }, { label: 'SR', val: 'sr' }, { label: 'R', val: 'r' }, { label: 'N', val: 'n' },
    { label: '蜀', val: 'f0' }, { label: '魏', val: 'f1' }, { label: '呉', val: 'f2' }, { label: '群', val: 'f3' },
  ];
  filters.forEach(function(f) {
    var active = Game.encyclopediaFilter === f.val;
    html += '<button class="filter-btn' + (active ? ' active' : '') + '" ' +
      'onclick="Game.encyclopediaFilter=' + (f.val ? '\'' + f.val + '\'' : 'null') + ';Game.renderEncyclopedia()">' + f.label + '</button>';
  });
  html += '</div>';

  // Character grid
  html += '<div class="char-grid">';
  var chars = Game.CHARACTERS.filter(function(c) { return c; });

  // Apply filter
  if (Game.encyclopediaFilter) {
    var fv = Game.encyclopediaFilter;
    if (fv === 'ur') chars = chars.filter(function(c) { return c.rarity === 5; });
    else if (fv === 'ssr') chars = chars.filter(function(c) { return c.rarity === 4; });
    else if (fv === 'sr') chars = chars.filter(function(c) { return c.rarity === 3; });
    else if (fv === 'r') chars = chars.filter(function(c) { return c.rarity === 2; });
    else if (fv === 'n') chars = chars.filter(function(c) { return c.rarity === 1; });
    else if (fv.charAt(0) === 'f') chars = chars.filter(function(c) { return c.faction === parseInt(fv.charAt(1)); });
  }

  // Sort: owned first, then by rarity desc, chapter asc
  chars.sort(function(a, b) {
    var oa = g.owned[a.id] ? 1 : 0;
    var ob = g.owned[b.id] ? 1 : 0;
    if (oa !== ob) return ob - oa;
    if (a.rarity !== b.rarity) return b.rarity - a.rarity;
    return a.chapter - b.chapter;
  });

  chars.forEach(function(c) {
    var isOwned = g.owned[c.id];
    var rc = Game.rarityClass(c.rarity);
    var isNew = g.newFlags[c.id];

    html += '<div class="char-card ' + rc + (isOwned ? '' : ' unowned') + '" ' +
      'style="background-image:url(' + Game.genAvatar(c.id, 210) + ')" ' +
      'onclick="Game.showDetail(' + c.id + ')">';

    if (isNew) html += '<div class="new-badge">NEW</div>';
    html += '<div class="type-badge">' + Game.TYPE_NAMES[c.type] + '</div>';
    html += '<div class="card-info">' +
      '<div class="stars">' + Game.RARITY_STARS[c.rarity] + '</div>' +
      '<div class="name">' + (isOwned ? c.name : '???') + '</div>' +
      '</div>';

    if (isOwned && g.owned[c.id].totsu > 0) {
      html += '<div class="totsuki">' + g.owned[c.id].totsu + '凸</div>';
    }

    html += '</div>';
  });

  html += '</div>';
  return html;
};

Game.renderEncBonds = function() {
  var g = Game.state;
  if (!Game.BONDS) return '<div style="padding:20px;text-align:center;color:var(--text2)">データなし</div>';

  var html = '';

  // Discovery rate
  var total = Game.BONDS.length;
  var discovered = Object.keys(g.discoveredBonds).length;
  var pct = total > 0 ? (discovered / total * 100).toFixed(1) : 0;
  html += '<div class="collection-rate">' +
    '発見済: <span style="color:var(--gold);font-weight:bold">' + discovered + '</span> / ' + total + ' (' + pct + '%)' +
    '</div>';
  html += '<div class="collection-bar"><div class="collection-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#ffd700,#ff9800)"></div></div>';

  // Category labels
  var categories = [
    { key: 'sworn', label: '誓約' },
    { key: 'rival', label: '宿敵' },
    { key: 'strategic', label: '軍略' },
    { key: 'betrayal', label: '離反' },
    { key: 'family', label: '血縁' },
    { key: 'if', label: 'IF' },
  ];

  categories.forEach(function(cat) {
    var catBonds = Game.BONDS.filter(function(b) { return b.category === cat.key; });
    if (catBonds.length === 0) return;

    html += '<div class="section-title">' + cat.label + ' (' + catBonds.filter(function(b) { return g.discoveredBonds[b.id]; }).length + '/' + catBonds.length + ')</div>';

    catBonds.forEach(function(bond) {
      var isDiscovered = g.discoveredBonds[bond.id];
      var isIF = bond.isIF && (g.ngPlusLevel || 0) < 1;

      html += '<div class="bond-card' + (isDiscovered ? ' discovered' : '') + '">';

      if (isDiscovered) {
        html += '<div class="bond-card-header">';
        html += '<div class="bond-card-name">' + bond.name + '</div>';
        html += '<div class="bond-card-effect">';
        if (bond.effect.atk) html += '<span class="effect-tag atk">ATK+' + Math.round(bond.effect.atk * 100) + '%</span>';
        if (bond.effect.hp) html += '<span class="effect-tag hp">HP+' + Math.round(bond.effect.hp * 100) + '%</span>';
        if (bond.effect.def) html += '<span class="effect-tag def">DEF+' + Math.round(bond.effect.def * 100) + '%</span>';
        html += '</div></div>';

        html += '<div class="bond-card-desc">' + bond.desc + '</div>';

        // Heroes
        html += '<div class="bond-card-heroes">';
        bond.heroes.forEach(function(hid) {
          var c = Game.getChar(hid);
          if (!c) return;
          var owned = g.owned[hid];
          html += '<div class="bond-hero-icon' + (owned ? '' : ' unowned') + '" onclick="Game.showDetail(' + hid + ')">' +
            '<img src="' + Game.genAvatar(hid, 80) + '" style="width:32px;height:32px;border-radius:50%">' +
            '<div style="font-size:9px">' + c.name + '</div></div>';
        });
        html += '</div>';

        // Lore toggle
        if (bond.lore) {
          html += '<div class="bond-lore-toggle" onclick="this.nextElementSibling.classList.toggle(\'show\');this.textContent=this.nextElementSibling.classList.contains(\'show\')?\'閉じる\':\'詳しく読む\'">' +
            '詳しく読む</div>';
          html += '<div class="bond-lore-full">' +
            '<div class="bond-lore-quote">"' + bond.lore.short + '"</div>' +
            '<div class="bond-lore-text">' + bond.lore.full + '</div></div>';
        }
      } else {
        // Undiscovered
        html += '<div class="bond-card-header">';
        html += '<div class="bond-card-name" style="color:var(--text2)">???</div>';
        html += '</div>';
        if (isIF) {
          html += '<div class="bond-card-desc" style="color:var(--text2)">覇道モードで解放</div>';
        } else if (bond.hint) {
          html += '<div class="bond-card-desc" style="color:var(--text2)">' + bond.hint + '</div>';
        }

        // Show battle progress if heroes are all owned
        var allOwned = true;
        for (var j = 0; j < bond.heroes.length; j++) {
          if (!g.owned[bond.heroes[j]]) { allOwned = false; break; }
        }
        if (allOwned && !isIF) {
          var battleCount = g.bondBattleCounts[bond.id] || 0;
          html += '<div style="font-size:11px;color:var(--text2);margin-top:4px">発見進捗: ' + battleCount + '/20</div>';
        }
      }

      html += '</div>';
    });
  });

  return html;
};

Game.renderEncWeapons = function() {
  var g = Game.state;
  if (!Game.WEAPONS) return '<div style="padding:20px;text-align:center;color:var(--text2)">データなし</div>';

  var html = '';

  // Collection rate
  var total = Game.WEAPONS.length;
  var owned = Object.keys(g.ownedWeapons).length;
  var pct = total > 0 ? (owned / total * 100).toFixed(1) : 0;
  html += '<div class="collection-rate">' +
    '所持: <span style="color:var(--gold);font-weight:bold">' + owned + '</span> / ' + total + ' (' + pct + '%)' +
    '</div>';
  html += '<div class="collection-bar"><div class="collection-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#42a5f5,#1e88e5)"></div></div>';

  html += '<div class="weapon-grid">';

  var weapons = Game.WEAPONS.slice().sort(function(a, b) {
    var oa = g.ownedWeapons[a.id] ? 1 : 0;
    var ob = g.ownedWeapons[b.id] ? 1 : 0;
    if (oa !== ob) return ob - oa;
    return b.rarity - a.rarity;
  });

  weapons.forEach(function(w) {
    var isOwned = g.ownedWeapons[w.id];
    var rc = Game.rarityClass(w.rarity);
    var isNew = g.newWeaponFlags[w.id];

    html += '<div class="weapon-enc-card ' + rc + (isOwned ? '' : ' unowned') + '">';

    if (isNew) html += '<div class="new-badge">NEW</div>';

    html += '<div class="weapon-enc-icon" style="background-image:url(' + Game.genWeaponIcon(w.id, 120) + ')"></div>';
    html += '<div class="weapon-enc-info">';
    html += '<div class="weapon-enc-name" style="color:' + Game.RARITY_COLORS[w.rarity] + '">' +
      (isOwned ? w.name : '???') + '</div>';
    html += '<div class="weapon-enc-stars">' + Game.RARITY_STARS[w.rarity] + '</div>';

    if (isOwned) {
      var ws = Game.getWeaponStats(w.id);
      html += '<div class="weapon-enc-stats">' +
        'ATK+' + ws.atk + ' HP+' + ws.hp + ' DEF+' + ws.def +
        '</div>';
      if (ws.skillName) {
        html += '<div class="weapon-enc-skill">' + ws.skillName + '</div>';
        html += '<div style="font-size:10px;color:var(--text2);margin-top:2px">' + (w.skillDesc || '') + '</div>';
      }
      if (ws.totsu > 0) {
        html += '<div style="font-size:10px;color:var(--gold)">' + ws.totsu + '凸</div>';
      }
    }

    html += '</div></div>';
  });

  html += '</div>';
  return html;
};
