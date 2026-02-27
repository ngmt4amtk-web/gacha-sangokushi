// ======== GACHA SCREEN ========
window.Game = window.Game || {};

Game.renderGacha = function() {
  var g = Game.state;
  var el = document.getElementById('screen-gacha');
  var isHero = g.gachaTab !== 'weapon';
  var pool = Game.getGachaPool();
  var poolSize = pool.length;

  // Tab bar
  var html = '<div class="gacha-tab-bar">' +
    '<button class="gacha-tab' + (isHero ? ' active' : '') + '" onclick="Game.state.gachaTab=\'hero\';Game.renderGacha()">武将召喚</button>' +
    '<button class="gacha-tab' + (!isHero ? ' active' : '') + '" onclick="Game.state.gachaTab=\'weapon\';Game.renderGacha()">武器鍛造</button>' +
    '</div>';

  if (isHero) {
    // Hero gacha
    html += '<div class="banner">' +
      '<div class="banner-title">武将召喚</div>' +
      '<div style="font-size:24px;margin:8px 0">第' + g.currentChapter + '章 排出</div>' +
      '<div class="banner-sub">' + poolSize + '体の武将が排出対象</div>' +
      '</div>';

    // Pity bar
    var pityPct = Math.min(100, g.pity / 80 * 100);
    html += '<div class="pity-bar">' +
      '<div class="pity-bar-bg"><div class="pity-bar-fill" style="width:' + pityPct + '%"></div></div>' +
      '<div class="pity-text">天井: ' + g.pity + ' / 80</div>' +
      '</div>';

    // Buttons
    html += '<div class="gacha-btns">' +
      '<button class="gacha-btn single" onclick="Game.pullSingle()" ' + (g.heroTickets < 1 ? 'disabled' : '') + '>' +
        '単発<span class="cost">武将券 x1</span></button>' +
      '<button class="gacha-btn multi" onclick="Game.pullMulti()" ' + (g.heroTickets < 10 ? 'disabled' : '') + '>' +
        '10連<span class="cost">武将券 x10</span></button>' +
      '</div>';

    // Rates
    html += '<div class="rate-info">' +
      '<div style="font-weight:bold;margin-bottom:6px">排出確率</div>' +
      '<div class="rate-row"><span class="rarity" style="color:var(--ur)">UR ★5</span><span>0.3%</span></div>' +
      '<div class="rate-row"><span class="rarity" style="color:var(--ssr)">SSR ★4</span><span>1.5%</span></div>' +
      '<div class="rate-row"><span class="rarity" style="color:var(--sr)">SR ★3</span><span>18.2%</span></div>' +
      '<div class="rate-row"><span class="rarity" style="color:var(--r)">R ★2</span><span>35%</span></div>' +
      '<div class="rate-row"><span class="rarity" style="color:var(--n)">N ★1</span><span>45%</span></div>' +
      '<div style="margin-top:8px;font-size:11px;color:var(--text2)">65回目から確率UP、80回で★4以上確定</div>' +
      '</div>';

    // Chapter pool info
    html += '<div class="section-title">排出対象武将 (第' + g.currentChapter + '章まで)</div>';
    html += '<div class="char-grid">';
    pool.forEach(function(c) {
      var rc = Game.rarityClass(c.rarity);
      var owned = g.owned[c.id];
      html += '<div class="char-card ' + rc + (owned ? '' : ' unowned') + '" ' +
        'style="background-image:url(' + Game.genAvatar(c.id, 210) + ')" onclick="Game.showDetail(' + c.id + ')">' +
        '<div class="card-info"><div class="stars">' + Game.RARITY_STARS[c.rarity] + '</div>' +
        '<div class="name">' + c.name + '</div></div></div>';
    });
    html += '</div>';

  } else {
    // Weapon gacha
    html += '<div class="banner">' +
      '<div class="banner-title">武器鍛造</div>' +
      '<div style="font-size:16px;margin:4px 0;color:var(--text2)">メダルで武器を鍛造</div>' +
      '<div style="font-size:12px;color:#ffd700;margin-top:4px">★ 超低確率で専用装備が出現 ★</div>' +
      '</div>';

    var wpPityPct = Math.min(100, (g.weaponPity || 0) / 60 * 100);
    html += '<div class="pity-bar">' +
      '<div class="pity-bar-bg"><div class="pity-bar-fill" style="width:' + wpPityPct + '%"></div></div>' +
      '<div class="pity-text">天井: ' + (g.weaponPity || 0) + ' / 60</div>' +
      '</div>';

    var maxPulls = Math.floor(g.medals / 900) * 10 + Math.floor((g.medals % 900) / 100);
    html += '<div class="gacha-btns">' +
      '<button class="gacha-btn single" onclick="Game.pullWeaponSingle()" ' + (g.medals < 100 ? 'disabled' : '') + '>' +
        '単発<span class="cost">100メダル</span></button>' +
      '<button class="gacha-btn multi" onclick="Game.pullWeaponMulti()" ' + (g.medals < 900 ? 'disabled' : '') + '>' +
        '10連<span class="cost">900メダル</span></button>' +
      '</div>' +
      '<div class="gacha-btns" style="margin-top:6px">' +
      '<button class="gacha-btn multi" style="width:auto;padding:10px 24px;background:linear-gradient(135deg,#e65100,#bf360c)" onclick="Game.pullWeaponAll()" ' + (g.medals < 100 ? 'disabled' : '') + '>' +
        '🎰 全部回す<span class="cost">' + maxPulls + '回 (' + Game.formatNum(g.medals) + 'メダル)</span></button>' +
      '</div>';

    // Owned weapons
    html += '<div class="section-title">所持武器</div><div class="char-grid">';
    if (Game.WEAPONS) {
      Game.WEAPONS.forEach(function(w) {
        var owned = g.ownedWeapons[w.id];
        if (!owned) return;
        var rc = Game.rarityClass(w.rarity);
        html += '<div class="wpn-card" style="background-image:url(' + Game.genWeaponIcon(w.id, 160) + ')">' +
          '<div class="wpn-info"><div class="wpn-stars">' + Game.RARITY_STARS[w.rarity] + '</div>' +
          '<div class="wpn-name">' + w.name + '</div></div></div>';
      });
    }
    html += '</div>';
  }

  el.innerHTML = html;
};
