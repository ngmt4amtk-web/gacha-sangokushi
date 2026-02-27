// ======== PROGRESSION SYSTEM ========
window.Game = window.Game || {};

// Check if a chapter should be unlocked based on cleared stages
Game.checkChapterUnlock = function() {
  var g = Game.state;
  if (!Game.CHAPTERS) return;
  for (var i = 0; i < Game.CHAPTERS.length; i++) {
    var ch = Game.CHAPTERS[i];
    // Check if previous chapter's boss is cleared
    if (ch.id > 1) {
      var prevCh = Game.CHAPTERS[i - 1];
      if (prevCh) {
        var lastStage = prevCh.stages[prevCh.stages.length - 1];
        if (lastStage && g.clearedStages[lastStage.id]) {
          if (g.currentChapter < ch.id) {
            g.currentChapter = ch.id;
            Game.playSound('chapter_clear');
            Game.showToast('第' + ch.id + '章 解放！ ' + ch.name);
          }
        }
      }
    }
  }
};

// New Game+ (覇道モード) on chapter 8 clear
Game.checkNewGamePlus = function() {
  var g = Game.state;
  if (!Game.CHAPTERS) return;
  var lastChapter = Game.CHAPTERS[Game.CHAPTERS.length - 1];
  if (!lastChapter) return;
  var lastStage = lastChapter.stages[lastChapter.stages.length - 1];
  if (!lastStage || !g.clearedStages[lastStage.id]) return;

  // Already handled?
  var ngFlag = 'ng_plus_' + (g.ngPlusLevel || 0);
  if (g.clearedStages[ngFlag]) return;
  g.clearedStages[ngFlag] = true;

  // Start NG+
  g.ngPlusLevel = (g.ngPlusLevel || 0) + 1;
  g.currentChapter = 1;
  g.currentStageId = '1-1';
  // Clear stage progress but keep characters, weapons, bonds
  var clearedBackup = {};
  clearedBackup[ngFlag] = true;
  g.clearedStages = clearedBackup;

  // Bonus rewards
  var bonus = 1000 * g.ngPlusLevel;
  g.medals += bonus;
  g.heroTickets += 10;
  g.totalMedalsEarned += bonus;

  Game.saveGame();
  Game.playSound('chapter_clear');
  Game.showToast('覇道' + g.ngPlusLevel + '周目突入！ ボーナス +' + Game.formatNum(bonus) + 'メダル + 10武将券');
};

// Called after battle win to check progression
Game.checkProgression = function() {
  Game.checkChapterUnlock();
  Game.checkNewGamePlus();
};
