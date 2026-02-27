// ======== BOND DATABASE ========
window.Game = window.Game || {};

Game.BONDS = [
  // ===== Sworn (5) =====
  {
    id:0, name:'桃園の誓い', category:'sworn', chapter:1,
    heroes:[0,1,2], minRequired:3,
    discoveryChance:0.15, isIF:false,
    effect:{ atk:0.25, hp:0.15, def:0.10 },
    desc:'劉備・関羽・張飛。桃園で義兄弟の契りを結んだ三人の絆',
    lore:{
      short:'我ら三人、生まれし日は違えど、死すべき日は同じと誓う',
      full:'中山靖王の末裔を称する劉備、塩と棗を商う関羽、肉屋の張飛。身分も生まれも異なる三人が、桃園にて天に誓い義兄弟となった。この絆は三国時代を通じて不変であり、関羽の死は劉備を夷陵の惨敗へ、張飛を暗殺へと導いた。彼らの義は、千年を超えて人々の心に生き続けている。'
    },
    hint:'蜀の三兄弟を同じ編成に'
  },
  {
    id:1, name:'江東の虎', category:'sworn', chapter:2,
    heroes:[4,17,26], minRequired:3,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.15, hp:0.25, def:0.15 },
    desc:'孫堅・孫策・孫権。三代にわたる江東の覇者たち',
    lore:{
      short:'父が拓き、兄が広げ、弟が守る。江東の礎は血で築かれた',
      full:'孫堅が武勇で切り拓いた江東の地を、嫡子・孫策が若き覇王として統一し、その弟・孫権が大国・呉として完成させた。三代の志が一つに連なるとき、長江は最強の防壁となる。'
    },
    hint:'孫家三代を揃えよ'
  },
  {
    id:2, name:'五虎将', category:'sworn', chapter:5,
    heroes:[1,2,20,33,45], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.35, hp:0.10, def:0.05 },
    desc:'関羽・張飛・趙雲・馬超・黄忠。蜀が誇る最強の矛',
    lore:{
      short:'五虎の牙が揃うとき、天下に敵なし',
      full:'関羽の武聖、張飛の猛勇、趙雲の忠義、馬超の疾風、黄忠の剛弓。蜀漢が誇る五人の将軍は、それぞれが一騎当千の武勇を持つ。三人以上が集えば、その戦力は倍増する。'
    },
    hint:'蜀の猛将を3人以上編成'
  },
  {
    id:3, name:'覇道の始まり', category:'sworn', chapter:1,
    heroes:[3,12,13], minRequired:3,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.20, hp:0.10, def:0.20 },
    desc:'曹操・夏侯惇・典韋。魏の覇業はこの三人から始まった',
    lore:{
      short:'覇者の道は、信じる臣と共に歩む',
      full:'曹操の挙兵に真っ先に駆けつけた従弟・夏侯惇と、命を賭して主を守った典韋。魏の覇業は、この絶対的な信頼関係から始まった。'
    },
    hint:'曹操と魏の古参を揃えよ'
  },
  {
    id:4, name:'呉下の阿蒙', category:'sworn', chapter:6,
    heroes:[26,47,22], minRequired:3,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.15, hp:0.20, def:0.15 },
    desc:'孫権・呂蒙・魯粛。学問と実戦で成長した呉の知将たち',
    lore:{
      short:'呉下の阿蒙にあらず。刮目して見よ',
      full:'呂蒙は孫権の勧めで学問に励み、「呉下の阿蒙」から脱した。魯粛は戦略家として三国鼎立の礎を築いた。彼らの成長こそが呉の底力である。'
    },
    hint:'呉の知将を揃えよ'
  },

  // ===== Rival (5) =====
  {
    id:5, name:'虎牢関の死闘', category:'rival', chapter:1,
    heroes:[7,1,2], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.40, hp:-0.10, def:0 },
    desc:'呂布vs関羽・張飛。虎牢関での伝説の戦い',
    lore:{
      short:'三英、呂布と戦う。天下第一の武を巡る死闘',
      full:'虎牢関にて呂布を相手に、劉備・関羽・張飛の三兄弟が挑んだ伝説の一戦。一対三でも互角に戦った呂布の武は天下無双だが、義兄弟の絆がそれを上回った。'
    },
    hint:'呂布と蜀の兄弟を同じチームに'
  },
  {
    id:6, name:'智略の果て', category:'rival', chapter:7,
    heroes:[36,52], minRequired:2,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.30, hp:0.10, def:0.10 },
    desc:'諸葛亮vs司馬懿。三国最高の頭脳の対決',
    lore:{
      short:'臥龍と冢虎。天下を賭けた知恵比べに終わりはない',
      full:'五丈原の決戦。攻める諸葛亮と、ひたすら守る司馬懿。「出師表」の誓いを胸に戦い続けた臥龍は、ついに病に倒れた。しかし死せる孔明、生ける仲達を走らす――その智は死してなお敵を退けた。'
    },
    hint:'臥龍と冢虎を同じ編成に'
  },
  {
    id:7, name:'宿命の対峙', category:'rival', chapter:6,
    heroes:[1,47], minRequired:2,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.25, hp:0.05, def:0.10 },
    desc:'関羽vs呂蒙。荊州を巡る宿命の対決',
    lore:{
      short:'武聖の誇りと、知将の謀略。荊州の覇権を懸けて',
      full:'関羽が守る荊州を、呂蒙は白衣渡江で奪取した。武の関羽に知の呂蒙が勝利した戦いだが、呂蒙もまた直後に病死した。関羽の怨霊に祟られたとも伝わる。'
    },
    hint:'関羽と呂蒙を組ませよ'
  },
  {
    id:8, name:'四世三公の矜持', category:'rival', chapter:1,
    heroes:[8,3], minRequired:2,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.15, hp:0.15, def:0.15 },
    desc:'袁紹vs曹操。官渡の戦いの宿命のライバル',
    lore:{
      short:'名門の誇りと、才覚の挑戦。天下の行方を決した一戦',
      full:'幼馴染にして最大のライバル。四世三公の名門・袁紹と、宦官の孫・曹操。官渡の戦いで曹操が寡兵で勝利し、中原の覇権を決した。'
    },
    hint:'袁紹と曹操を同じチームに'
  },
  {
    id:9, name:'北伐の宿敵', category:'rival', chapter:7,
    heroes:[53,54], minRequired:2,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.25, hp:0.10, def:0.05 },
    desc:'姜維vs鄧艾。蜀と魏の最後の戦い',
    lore:{
      short:'師の遺志を継ぐ者と、奇策で蜀を滅ぼす者',
      full:'諸葛亮の北伐を継いだ姜維と、陰平越えで蜀を滅ぼした鄧艾。二人は幾度も剣を交え、最後は共に非業の死を遂げた。三国時代の終幕を彩る宿敵。'
    },
    hint:'姜維と鄧艾を組ませよ'
  },

  // ===== Strategic (5) =====
  {
    id:10, name:'赤壁の炎', category:'strategic', chapter:3,
    heroes:[36,21,37], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.45, hp:0, def:-0.10 },
    desc:'諸葛亮・周瑜・黄蓋。天下を焼く赤壁の策',
    lore:{
      short:'東風を借り、苦肉を演じ、業火を放つ。赤壁の三策は完璧だった',
      full:'諸葛亮が東風を呼び、黄蓋が苦肉の策で偽降し、周瑜が火攻めを指揮した。三者の策が完璧に噛み合った赤壁の戦いは、三国鼎立を決定づけた。'
    },
    hint:'赤壁の策士と実行者を揃えよ'
  },
  {
    id:11, name:'五大謀臣', category:'strategic', chapter:4,
    heroes:[28,29,30,56,57], minRequired:3,
    discoveryChance:0.08, isIF:false,
    effect:{ atk:0.20, hp:0.15, def:0.20 },
    desc:'魏の五大謀臣。曹操を支えた頭脳集団',
    lore:{
      short:'覇者の背後には、常に最高の参謀団がいた',
      full:'郭嘉・荀彧・賈詡・荀攸・程昱。曹操の覇業を支えた五人の知恵者たち。彼らなくして魏の中原制覇はなかった。三人揃えば天下を動かす。'
    },
    hint:'魏の謀臣を3人以上編成'
  },
  {
    id:12, name:'三顧の礼', category:'strategic', chapter:5,
    heroes:[0,36,34], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.30, hp:0.15, def:0.05 },
    desc:'劉備・諸葛亮・龐統。蜀の頭脳が揃いし時',
    lore:{
      short:'臥龍と鳳雛、どちらかを得れば天下を取れる。両方得た蜀は…',
      full:'三度草廬を訪れてまで諸葛亮を迎え、さらに龐統も配下に加えた劉備。「臥龍鳳雛のどちらかを得れば天下を取れる」と水鏡先生は言った。両方を得た蜀の布陣は最強。'
    },
    hint:'劉備と蜀の軍師たちを揃えよ'
  },
  {
    id:13, name:'美周郎', category:'strategic', chapter:3,
    heroes:[21,17], minRequired:2,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.25, hp:0.10, def:0.05 },
    desc:'周瑜と孫策。刎頚の友',
    lore:{
      short:'曲に誤りあれば周郎は顧みる。その音楽のような戦略眼',
      full:'同い年で同じ志を持つ二人。孫策が江東を切り拓く時、常に傍らには周瑜がいた。二人の友情は三国志随一の美談として語り継がれる。'
    },
    hint:'孫策と周瑜を組ませよ'
  },
  {
    id:14, name:'夷陵の火計', category:'strategic', chapter:6,
    heroes:[51,26], minRequired:2,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.20, hp:0.15, def:0.10 },
    desc:'陸遜と孫権。夷陵で蜀を退けし主従',
    lore:{
      short:'書生と侮った者たちに、火の洗礼を浴びせてやろう',
      full:'劉備の大軍を前に、孫権は若き陸遜を総大将に任命した。諸将の反発を抑え、火攻めのタイミングを待ち続けた陸遜は、一夜にして蜀軍を壊滅させた。'
    },
    hint:'陸遜と孫権を組ませよ'
  },

  // ===== Betrayal (3) =====
  {
    id:15, name:'鳳儀亭の誘惑', category:'betrayal', chapter:2,
    heroes:[14,7,6], minRequired:3,
    discoveryChance:0.08, isIF:false,
    effect:{ atk:0.45, hp:-0.15, def:0 },
    desc:'貂蝉・呂布・董卓。連環の計が天下を動かした',
    lore:{
      short:'美女連環の計。愛と裏切りが暴君を滅ぼす',
      full:'王允が仕掛けた連環の計。貂蝉を董卓と呂布の間に入れ、二人の間に亀裂を生じさせた。鳳儀亭での密会が発覚し、呂布は遂に董卓を殺害する。'
    },
    hint:'貂蝉・呂布・董卓を同時に編成'
  },
  {
    id:16, name:'泣いて馬謖を斬る', category:'betrayal', chapter:6,
    heroes:[36,48], minRequired:2,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.30, hp:-0.05, def:0 },
    desc:'諸葛亮と馬謖。信頼と軍法の狭間で',
    lore:{
      short:'涙を流しても、法は曲げられない。それが丞相の責務',
      full:'第一次北伐の要衝・街亭の守備を任された馬謖は、諸葛亮の指示に背いて山上に布陣し大敗。才を愛しつつも、諸葛亮は軍法に従い馬謖を処刑した。'
    },
    hint:'諸葛亮と馬謖を組ませよ'
  },
  {
    id:17, name:'反骨の相', category:'betrayal', chapter:5,
    heroes:[43,36], minRequired:2,
    discoveryChance:0.12, isIF:false,
    effect:{ atk:0.30, hp:-0.05, def:0 },
    desc:'魏延と諸葛亮。子午谷の奇策は幻に',
    lore:{
      short:'反骨の相あり。されどその武は蜀に不可欠だった',
      full:'魏延は子午谷を越えて長安を直撃する奇策を献じたが、諸葛亮は採用しなかった。もし実行されていたら、歴史は変わっていたかもしれない。二人の関係は信頼と猜疑の複雑な織物。'
    },
    hint:'魏延と諸葛亮を組ませよ'
  },

  // ===== Family (3) =====
  {
    id:18, name:'曹家一門', category:'family', chapter:4,
    heroes:[3,12,50], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.20, hp:0.10, def:0.25 },
    desc:'曹操・夏侯惇・曹丕。魏を築いた一族の絆',
    lore:{
      short:'血は水よりも濃い。曹家の絆は天下を動かした',
      full:'曹操の覇業は一族の団結なくしてはあり得なかった。従弟の夏侯惇は最も信頼された将であり、嫡子の曹丕は魏王朝を建国した。'
    },
    hint:'曹操一族を3人揃えよ'
  },
  {
    id:19, name:'孫家三代', category:'family', chapter:3,
    heroes:[4,17,26], minRequired:3,
    discoveryChance:0.10, isIF:false,
    effect:{ atk:0.15, hp:0.25, def:0.15 },
    desc:'孫堅・孫策・孫権。三代で築いた大国・呉',
    lore:{
      short:'虎の子は虎。三代の志が江東を不落の地にした',
      full:'孫堅が種を蒔き、孫策が芽を育て、孫権が大樹にした。呉の国は三代の血と汗で築かれた。'
    },
    hint:'孫家三代を揃えよ'
  },
  {
    id:20, name:'蜀漢の継承', category:'family', chapter:8,
    heroes:[0,36,53,63], minRequired:3,
    discoveryChance:0.08, isIF:false,
    effect:{ atk:0.20, hp:0.15, def:0.10 },
    desc:'劉備・諸葛亮・姜維・劉禅。蜀漢の志を受け継ぐ者たち',
    lore:{
      short:'白帝城の遺詔は、三代にわたって受け継がれた',
      full:'劉備から諸葛亮へ、諸葛亮から姜維へ。蜀漢の「漢室復興」の志は代を超えて受け継がれた。そして最後に残されたのは、楽不思蜀の劉禅だけだった。'
    },
    hint:'蜀の指導者たちを揃えよ'
  },

  // ===== IF/NG+ (4) =====
  {
    id:21, name:'もう一つの赤壁', category:'if', chapter:5,
    heroes:[36,21,3], minRequired:3,
    discoveryChance:0.05, isIF:true,
    effect:{ atk:0.40, hp:0.10, def:0.10 },
    desc:'もし曹操が赤壁の同盟に加わっていたら？',
    lore:{
      short:'三国の智が一つになった時、天下に敵はない',
      full:'IF——もし赤壁の戦いで曹操が孫劉と手を結んでいたら。諸葛亮の戦略、周瑜の火攻め、曹操の兵力。三国最強の頭脳が同じ旗の下に集う、ありえたかもしれない最強の布陣。'
    },
    hint:'三国の頭脳を一つの旗の下に'
  },
  {
    id:22, name:'天下三分の夢', category:'if', chapter:7,
    heroes:[0,3,26], minRequired:3,
    discoveryChance:0.05, isIF:true,
    effect:{ atk:0.15, hp:0.30, def:0.15 },
    desc:'劉備・曹操・孫権。三国の主が手を結ぶ時',
    lore:{
      short:'もし三人の英雄が争わず、共に歩んでいたら',
      full:'IF——もし劉備・曹操・孫権が争わず、共に漢を支えていたら。天下は分かれず、民は戦禍を免れ、三国の英傑たちは異民族の脅威に共同で立ち向かっていたかもしれない。'
    },
    hint:'三国の主を一つのチームに'
  },
  {
    id:23, name:'乱世の覇者たち', category:'if', chapter:8,
    heroes:[7,52,60], minRequired:3,
    discoveryChance:0.03, isIF:true,
    effect:{ atk:0.50, hp:0.10, def:0.10 },
    desc:'呂布・司馬懿・司馬炎。武と知と権で天下を統べる者',
    lore:{
      short:'最強の武、最深の知、最後の勝者。乱世の覇者が集う',
      full:'IF——呂布の武力、司馬懿の謀略、司馬炎の統治力。三人の覇者が手を組めば、天下統一は一瞬で成し遂げられるだろう。しかし、誰がこの三人を従えられるのか。'
    },
    hint:'各時代の覇者を揃えよ'
  },
  {
    id:24, name:'歴史を超えた絆', category:'if', chapter:8,
    heroes:[44,36,52,60], minRequired:4,
    discoveryChance:0.02, isIF:true,
    effect:{ atk:0.35, hp:0.25, def:0.20 },
    desc:'神関羽・諸葛亮・司馬懿・司馬炎。時代を超えた四傑',
    lore:{
      short:'神と臥龍と冢虎と帝。歴史の全てがここに',
      full:'IF——武神と化した関羽、天下の奇才・諸葛亮、三国を終わらせた司馬父子。歴史のあらゆる時代の英傑が一堂に会する、時空を超えた最終編成。発見すること自体が至難の業。'
    },
    hint:'三国の全ての時代を代表する英傑を4人揃えよ'
  },
];
