// ======== QUIZ SCREEN ========
window.Game = window.Game || {};

// In-memory quiz session (not saved)
Game.quizSession = null;

Game.renderQuiz = function() {
  var el = document.getElementById('screen-quiz');
  if (!el) return;

  if (!Game.quizSession) {
    el.innerHTML = Game.renderQuizChapterSelect();
  } else if (Game.quizSession.done) {
    el.innerHTML = Game.renderQuizResult();
  } else {
    el.innerHTML = Game.renderQuizQuestion();
  }
};

// ===== Chapter Select Screen =====
Game.renderQuizChapterSelect = function() {
  var g = Game.state;
  var html = '<div style="text-align:center;margin-bottom:12px">' +
    '<h2 style="color:var(--gold);margin:0;font-size:20px">正史三国志クイズ</h2>' +
    '<div style="font-size:12px;color:var(--text2);margin-top:4px">正史の知識で武将を手に入れよ</div>' +
    '</div>';

  // Reward info
  html += '<div style="font-size:12px;color:var(--text2);margin:0 4px 12px;padding:10px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:8px;line-height:1.6">' +
    '<div style="color:var(--gold);font-weight:bold;margin-bottom:4px">報酬: 章限定武将ガチャ券</div>' +
    '全問正解(10問) → <span style="color:var(--gold)">3枚</span>　' +
    '7-9問 → <span style="color:var(--gold)">2枚</span>　' +
    '4-6問 → <span style="color:var(--gold)">1枚</span>　' +
    '0-3問 → 0枚<br>' +
    '<span style="color:var(--sr)">章限定ガチャ: UR 3% / SSR 12% / SR 35%</span>' +
    '</div>';

  // Chapter grid
  html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:0 4px">';
  for (var ch = 1; ch <= 8; ch++) {
    var unlocked = ch <= g.currentChapter;
    var chData = Game.CHAPTERS ? Game.CHAPTERS[ch - 1] : null;
    var qCount = (Game.QUIZ_QUESTIONS && Game.QUIZ_QUESTIONS[ch]) ? Game.QUIZ_QUESTIONS[ch].length : 0;

    if (unlocked && qCount > 0) {
      html += '<button style="padding:14px 8px;border-radius:10px;border:1px solid rgba(255,215,0,0.3);' +
        'background:rgba(255,215,0,0.08);color:var(--text);cursor:pointer;text-align:center" ' +
        'onclick="Game.startQuiz(' + ch + ')">' +
        '<div style="font-size:16px;font-weight:bold;color:var(--gold)">第' + ch + '章</div>' +
        (chData ? '<div style="font-size:12px;color:var(--text2);margin-top:2px">' + chData.name + '</div>' : '') +
        '<div style="font-size:10px;color:var(--text2);margin-top:4px">' + qCount + '問収録</div>' +
        '</button>';
    } else {
      html += '<button disabled style="padding:14px 8px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);' +
        'background:rgba(255,255,255,0.03);color:var(--text2);text-align:center;opacity:0.5">' +
        '<div style="font-size:16px;font-weight:bold">第' + ch + '章</div>' +
        (chData ? '<div style="font-size:12px;margin-top:2px">' + chData.name + '</div>' : '') +
        '<div style="font-size:10px;margin-top:4px">' + (qCount === 0 ? '準備中' : '未解放') + '</div>' +
        '</button>';
    }
  }
  html += '</div>';

  return html;
};

// ===== Start Quiz =====
Game.startQuiz = function(chapterId) {
  var questions = Game.selectQuizQuestions(chapterId);
  if (questions.length < 10) {
    Game.showToast('問題数が不足しています');
    return;
  }
  var shuffled = [];
  for (var i = 0; i < questions.length; i++) {
    shuffled.push(Game.shuffleChoices(questions[i]));
  }
  Game.quizSession = {
    chapterId: chapterId,
    questions: shuffled,
    currentIndex: 0,
    answers: [],
    done: false
  };
  for (var i = 0; i < 10; i++) Game.quizSession.answers.push(null);
  Game.playSound('medal');
  Game.renderQuiz();
};

// ===== Question Screen =====
Game.renderQuizQuestion = function() {
  var s = Game.quizSession;
  var q = s.questions[s.currentIndex];
  var num = s.currentIndex + 1;
  var answered = s.answers[s.currentIndex] !== null;

  var html = '';

  // Header
  html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
    '<button style="background:none;border:none;color:var(--text2);font-size:13px;cursor:pointer;padding:4px 8px" ' +
    'onclick="if(confirm(\'クイズを中断しますか？\')){Game.quizSession=null;Game.renderQuiz()}">← 戻る</button>' +
    '<span style="color:var(--gold);font-size:14px;font-weight:bold">第' + s.chapterId + '章</span>' +
    '<span style="color:var(--text2);font-size:13px">' + num + ' / 10</span>' +
    '</div>';

  // Progress bar
  var correctSoFar = 0;
  for (var i = 0; i < s.currentIndex; i++) {
    if (s.answers[i] === s.questions[i].answer) correctSoFar++;
  }
  var pct = s.currentIndex / 10 * 100;
  html += '<div style="background:rgba(255,255,255,0.1);height:6px;border-radius:3px;margin:0 0 12px;overflow:hidden">' +
    '<div style="background:var(--gold);height:100%;border-radius:3px;width:' + pct + '%;transition:width 0.3s"></div>' +
    '</div>';

  // Score so far
  html += '<div style="text-align:center;font-size:11px;color:var(--text2);margin-bottom:8px">' +
    '現在 ' + correctSoFar + ' 問正解</div>';

  // Question
  html += '<div style="margin:0 0 12px;padding:16px;background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.2);border-radius:12px">' +
    '<div style="font-size:15px;line-height:1.7;color:var(--text)">' + q.q + '</div>' +
    '</div>';

  // Choices
  var labels = ['\u2460', '\u2461', '\u2462', '\u2463']; // ①②③④
  html += '<div style="display:grid;gap:8px">';
  for (var i = 0; i < q.choices.length; i++) {
    var isSelected = s.answers[s.currentIndex] === i;
    var isCorrect = i === q.answer;

    var bg = 'rgba(255,255,255,0.05)';
    var border = 'rgba(255,255,255,0.15)';
    var color = 'var(--text)';

    if (answered) {
      if (isCorrect) {
        bg = 'rgba(76,175,80,0.2)';
        border = '#4caf50';
        color = '#66bb6a';
      } else if (isSelected) {
        bg = 'rgba(244,67,54,0.2)';
        border = '#f44336';
        color = '#ef5350';
      }
    }

    html += '<button style="padding:12px 14px;border-radius:8px;border:1px solid ' + border + ';' +
      'background:' + bg + ';color:' + color + ';font-size:14px;text-align:left;cursor:' + (answered ? 'default' : 'pointer') + ';' +
      'transition:all 0.2s;line-height:1.5" ' +
      (answered ? 'disabled' : 'onclick="Game.answerQuiz(' + i + ')"') + '>' +
      labels[i] + ' ' + q.choices[i] +
      (answered && isCorrect ? ' <span style="float:right">&#10003;</span>' : '') +
      (answered && isSelected && !isCorrect ? ' <span style="float:right">&#10007;</span>' : '') +
      '</button>';
  }
  html += '</div>';

  // After answering: source + next button
  if (answered) {
    if (q.source) {
      html += '<div style="font-size:11px;color:var(--text2);text-align:center;margin-top:8px;font-style:italic">' +
        '出典: ' + q.source + '</div>';
    }
    html += '<div style="text-align:center;margin-top:12px">';
    if (s.currentIndex < 9) {
      html += '<button class="battle-close-btn" onclick="Game.nextQuizQuestion()" ' +
        'style="padding:10px 32px">次の問題 →</button>';
    } else {
      html += '<button class="battle-close-btn" onclick="Game.finishQuiz()" ' +
        'style="padding:10px 32px;background:linear-gradient(135deg,#f57f17,#e65100)">結果を見る</button>';
    }
    html += '</div>';
  }

  return html;
};

// ===== Answer =====
Game.answerQuiz = function(choiceIdx) {
  if (!Game.quizSession || Game.quizSession.answers[Game.quizSession.currentIndex] !== null) return;
  var s = Game.quizSession;
  s.answers[s.currentIndex] = choiceIdx;

  // Sound feedback
  if (choiceIdx === s.questions[s.currentIndex].answer) {
    Game.playSound('medal');
  } else {
    Game.playSound('lose');
  }

  Game.renderQuiz();
};

// ===== Next Question =====
Game.nextQuizQuestion = function() {
  if (!Game.quizSession) return;
  Game.quizSession.currentIndex++;
  Game.renderQuiz();
};

// ===== Finish Quiz =====
Game.finishQuiz = function() {
  if (!Game.quizSession) return;
  Game.quizSession.done = true;
  Game.renderQuiz();
};

// ===== Result Screen =====
Game.renderQuizResult = function() {
  var s = Game.quizSession;

  // Count correct
  var correct = 0;
  for (var i = 0; i < s.questions.length; i++) {
    if (s.answers[i] === s.questions[i].answer) correct++;
  }

  var tickets = Game.calcQuizReward(correct);

  // Record history
  var qIds = [];
  for (var i = 0; i < s.questions.length; i++) qIds.push(s.questions[i].id);
  Game.recordQuizSession(s.chapterId, qIds);
  Game.saveGame();

  // Build result HTML
  var html = '<div style="padding:8px;text-align:center">';

  // Score
  var scoreColor = correct >= 7 ? '#4caf50' : correct >= 4 ? '#ff9800' : '#f44336';
  html += '<h2 style="color:var(--gold);font-size:20px;margin:0 0 8px">クイズ結果</h2>';
  html += '<div style="font-size:11px;color:var(--text2);margin-bottom:12px">第' + s.chapterId + '章</div>';
  html += '<div style="font-size:56px;font-weight:bold;color:' + scoreColor + ';line-height:1">' + correct + '</div>';
  html += '<div style="font-size:15px;color:var(--text2);margin-bottom:16px">/ 10問 正解</div>';

  // Per-question results
  html += '<div style="margin:0 0 16px;text-align:left">';
  for (var i = 0; i < s.questions.length; i++) {
    var ok = s.answers[i] === s.questions[i].answer;
    var qText = s.questions[i].q;
    if (qText.length > 28) qText = qText.substring(0, 28) + '…';
    html += '<div style="font-size:12px;padding:5px 8px;margin:3px 0;border-radius:6px;' +
      'background:rgba(255,255,255,0.04);display:flex;align-items:center;gap:6px">' +
      '<span style="color:' + (ok ? '#4caf50' : '#f44336') + ';font-size:14px;flex-shrink:0">' + (ok ? '✓' : '✗') + '</span>' +
      '<span style="color:var(--text2)">' + qText + '</span>' +
      '</div>';
  }
  html += '</div>';

  // Reward
  if (tickets > 0) {
    var chData = Game.CHAPTERS ? Game.CHAPTERS[s.chapterId - 1] : null;
    var chName = chData ? chData.name : '';
    html += '<div style="padding:12px;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);border-radius:10px;margin-bottom:12px">' +
      '<div style="font-size:16px;color:var(--gold);font-weight:bold">第' + s.chapterId + '章限定ガチャ券</div>' +
      '<div style="font-size:28px;color:var(--gold);font-weight:bold;margin:4px 0">× ' + tickets + '</div>' +
      '<div style="font-size:11px;color:var(--text2)">' + chName + ' の武将のみ排出</div>' +
      '</div>';

    html += '<button class="battle-close-btn" ' +
      'style="padding:12px 28px;background:linear-gradient(135deg,#7b1fa2,#4a148c);font-size:15px;margin-bottom:8px" ' +
      'onclick="Game.runChapterGachaReward(' + s.chapterId + ',' + tickets + ')">' +
      '章限定ガチャを引く！</button><br>';
  } else {
    html += '<div style="font-size:14px;color:var(--text2);margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px">' +
      '4問以上正解で報酬を獲得できます</div>';
  }

  html += '<button class="battle-close-btn" style="padding:10px 24px;margin-bottom:6px" ' +
    'onclick="Game.quizSession=null;Game.startQuiz(' + s.chapterId + ')">もう一度挑戦</button><br>';

  html += '<button style="background:none;border:none;color:var(--text2);font-size:13px;cursor:pointer;padding:8px;margin-top:4px" ' +
    'onclick="Game.quizSession=null;Game.renderQuiz()">章選択に戻る</button>';

  html += '</div>';
  return html;
};
