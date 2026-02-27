// ======== BATTLE SCREEN ========
window.Game = window.Game || {};

Game.battleChapterTab = null; // null = current chapter

Game.renderBattle = function() {
  var g = Game.state;
  var el = document.getElementById('screen-battle');
  var html = '';

  // Chapter tabs
  var displayChapter = Game.battleChapterTab || g.currentChapter;
  html += '<div class="chapter-tab-bar">';
  for (var ch = 1; ch <= g.currentChapter; ch++) {
    var chData = Game.CHAPTERS ? Game.CHAPTERS[ch - 1] : null;
    var active = ch === displayChapter;
    html += '<button class="chapter-tab' + (active ? ' active' : '') + '" ' +
      'onclick="Game.battleChapterTab=' + ch + ';Game.renderBattle()">' +
      '第' + ch + '章</button>';
  }
  html += '</div>';

  // Chapter info
  var chapterData = Game.CHAPTERS ? Game.CHAPTERS[displayChapter - 1] : null;
  if (chapterData) {
    html += '<div class="chapter-banner">' +
      '<div class="chapter-banner-title">第' + chapterData.id + '章 ' + chapterData.name + '</div>' +
      '<div class="chapter-banner-year">' + chapterData.year + '</div>' +
      '<div class="chapter-banner-desc">' + chapterData.desc + '</div>' +
      '</div>';

    // Team power vs recommended
    var teamPower = Game.getTeamPower();
    var teamCount = g.team.filter(function(id) { return id >= 0 && g.owned[id]; }).length;
    html += '<div class="battle-team-info">' +
      '<span>編成: ' + teamCount + '/5</span>' +
      '<span>戦力: ' + Game.formatNum(teamPower) + '</span>' +
      '</div>';

    if (teamCount === 0) {
      html += '<div style="text-align:center;color:#f44336;font-size:13px;margin:8px 0;padding:10px;background:rgba(244,67,54,0.1);border-radius:8px">' +
        '武将を編成してから出撃してください</div>';
    }

    // NG+ indicator
    if (g.ngPlusLevel > 0) {
      html += '<div style="text-align:center;color:var(--ur);font-size:12px;margin:4px 0">' +
        '覇道' + g.ngPlusLevel + '周目 (敵強化x' + (1 + g.ngPlusLevel * 0.5).toFixed(1) + ')</div>';
    }

    // Auto-battle button
    var firstPlayable = null;
    for (var si = 0; si < chapterData.stages.length; si++) {
      var stg = chapterData.stages[si];
      if (!g.clearedStages[stg.id] || si === 0) {
        // Find first uncleaared or first stage
        var prevOk = si === 0 || g.clearedStages[chapterData.stages[si - 1].id];
        if (prevOk && chapterData.id <= g.currentChapter) {
          firstPlayable = stg.id;
          break;
        }
      }
    }
    if (!firstPlayable) {
      // All cleared — replay from first
      firstPlayable = chapterData.stages[0].id;
    }
    if (teamCount > 0 && displayChapter <= g.currentChapter) {
      html += '<div style="text-align:center;margin:8px 0">' +
        '<button class="gacha-btn multi" style="width:auto;padding:10px 24px" ' +
        'onclick="Game.startAutoBattle(\'' + firstPlayable + '\')">' +
        '⚔ 連戦 (負けるまで自動)</button></div>';
    }

    // Stage list
    html += '<div class="stage-list">';
    for (var s = 0; s < chapterData.stages.length; s++) {
      var stage = chapterData.stages[s];
      var cleared = g.clearedStages[stage.id];
      var isCurrent = stage.id === g.currentStageId;
      var isLocked = false;

      // Check if stage is accessible
      if (s > 0) {
        var prevStage = chapterData.stages[s - 1];
        if (!g.clearedStages[prevStage.id]) isLocked = true;
      }
      // Chapter lock
      if (chapterData.id > g.currentChapter) isLocked = true;

      var stageClass = 'stage-btn';
      if (stage.isBoss) stageClass += ' boss';
      if (cleared) stageClass += ' cleared';
      if (isCurrent) stageClass += ' current';
      if (isLocked) stageClass += ' locked';

      html += '<button class="' + stageClass + '" ' +
        (isLocked ? 'disabled' : 'onclick="Game.startBattle(\'' + stage.id + '\')"') + '>';

      html += '<div class="stage-label">' +
        (cleared ? '&#10003; ' : '') +
        (stage.isBoss ? 'BOSS ' : '') +
        stage.id + ' ' + stage.name +
        (isCurrent && !cleared ? ' <span style="color:var(--gold)">&lt; NOW</span>' : '') +
        '</div>';

      html += '<div class="stage-reward">' +
        (stage.rewards ? Game.formatNum(stage.rewards.medals) + 'メダル + ' + stage.rewards.tickets + '武将券' : '') +
        '</div>';

      if (stage.storyBefore && !isLocked) {
        html += '<div style="font-size:11px;color:var(--text2);margin-top:2px">' + stage.storyBefore + '</div>';
      }

      html += '</button>';
    }
    html += '</div>';
  }

  // Battle speed
  html += '<div class="section-title">戦闘設定</div>';
  html += '<div class="battle-settings">';
  html += '<div class="stat-row">';
  html += '<span class="stat-label">戦闘速度</span>';
  html += '<span class="stat-val">';
  [1, 1.5, 2, 3].forEach(function(spd) {
    var active = (g.battleSpeed || 1) === spd;
    html += '<button class="filter-btn' + (active ? ' active' : '') + '" ' +
      'onclick="Game.state.battleSpeed=' + spd + ';Game.saveGame();Game.renderBattle()">' +
      'x' + spd + '</button> ';
  });
  html += '</span></div></div>';

  el.innerHTML = html;
};
