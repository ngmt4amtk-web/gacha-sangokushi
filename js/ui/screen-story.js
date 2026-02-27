// ======== STORY SCREEN ========
window.Game = window.Game || {};

Game.renderStory = function() {
  var g = Game.state;
  var el = document.getElementById('screen-story');
  var html = '';

  html += '<div class="story-header">';
  html += '<div class="story-title">三国志年表</div>';
  html += '<div style="font-size:12px;color:var(--text2);text-align:center;margin-bottom:12px">あなたの覇道の記録</div>';
  if (g.ngPlusLevel > 0) {
    html += '<div style="text-align:center;color:var(--ur);font-size:13px;margin-bottom:8px">覇道' + g.ngPlusLevel + '周目</div>';
  }
  html += '</div>';

  if (!Game.CHAPTERS) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text2)">データ読み込み中...</div>';
    return;
  }

  // Timeline
  html += '<div class="story-timeline">';

  for (var i = 0; i < Game.CHAPTERS.length; i++) {
    var ch = Game.CHAPTERS[i];
    var isUnlocked = ch.id <= g.currentChapter;
    var isComplete = false;
    if (ch.stages && ch.stages.length > 0) {
      var lastStage = ch.stages[ch.stages.length - 1];
      isComplete = g.clearedStages[lastStage.id] === true;
    }
    var clearedCount = 0;
    if (ch.stages) {
      ch.stages.forEach(function(st) {
        if (g.clearedStages[st.id]) clearedCount++;
      });
    }
    var totalStages = ch.stages ? ch.stages.length : 0;

    html += '<div class="timeline-chapter' + (isUnlocked ? '' : ' locked') + (isComplete ? ' complete' : '') + '">';

    // Timeline node
    html += '<div class="timeline-node">';
    html += '<div class="timeline-dot' + (isComplete ? ' complete' : isUnlocked ? ' active' : '') + '"></div>';
    if (i < Game.CHAPTERS.length - 1) {
      html += '<div class="timeline-line' + (isComplete ? ' complete' : '') + '"></div>';
    }
    html += '</div>';

    // Chapter content
    html += '<div class="timeline-content">';
    html += '<div class="timeline-year">' + (isUnlocked ? ch.year : '???') + '</div>';
    html += '<div class="timeline-chapter-title">' +
      '第' + ch.id + '章 ' + (isUnlocked ? ch.name : '???') + '</div>';

    if (isUnlocked) {
      html += '<div class="timeline-desc">' + ch.desc + '</div>';
      html += '<div class="timeline-progress">' + clearedCount + '/' + totalStages + ' クリア</div>';

      // Story text
      var storyText = Game.STORY_TEXT ? Game.STORY_TEXT[ch.id] : null;
      if (storyText) {
        html += '<div class="story-text-block">';
        html += '<div class="story-text-intro">' + storyText.intro + '</div>';
        if (isComplete && storyText.outro) {
          html += '<div class="story-text-outro">' + storyText.outro + '</div>';
        }
        html += '</div>';
      }

      // Key characters for this chapter
      if (Game.CHARACTERS) {
        var chapterChars = Game.CHARACTERS.filter(function(c) { return c && c.chapter === ch.id; });
        if (chapterChars.length > 0) {
          html += '<div class="story-chars">';
          chapterChars.forEach(function(c) {
            var owned = g.owned[c.id];
            html += '<div class="story-char-icon' + (owned ? '' : ' unowned') + '" ' +
              (owned ? 'onclick="Game.showDetail(' + c.id + ')"' : '') + '>' +
              '<img src="' + Game.genAvatar(c.id, 80) + '" style="width:36px;height:36px;border-radius:50%;border:2px solid ' +
              Game.RARITY_COLORS[c.rarity] + '">' +
              '<div style="font-size:9px;margin-top:2px;' + (owned ? '' : 'color:var(--text2)') + '">' +
              (owned ? c.name : '???') + '</div></div>';
          });
          html += '</div>';
        }
      }
    } else {
      html += '<div class="timeline-desc" style="color:var(--text2)">前の章をクリアして解放</div>';
    }

    html += '</div>'; // timeline-content
    html += '</div>'; // timeline-chapter
  }

  // NG+ indicator
  var lastCh = Game.CHAPTERS.length > 0 ? Game.CHAPTERS[Game.CHAPTERS.length - 1] : null;
  var allCleared = lastCh && lastCh.stages && lastCh.stages.length > 0 && g.clearedStages[lastCh.stages[lastCh.stages.length - 1].id];
  if (g.ngPlusLevel > 0 || allCleared) {
    html += '<div class="timeline-chapter complete">';
    html += '<div class="timeline-node"><div class="timeline-dot complete"></div></div>';
    html += '<div class="timeline-content">';
    html += '<div class="timeline-chapter-title" style="color:var(--ur)">覇道モード</div>';
    html += '<div class="timeline-desc">全章クリア後、より強い敵と新たな絆が待つ二周目以降の世界</div>';
    if (g.ngPlusLevel > 0) {
      html += '<div class="timeline-progress">現在: 覇道' + g.ngPlusLevel + '周目</div>';
    }
    html += '</div></div>';
  }

  html += '</div>'; // story-timeline

  el.innerHTML = html;
};
