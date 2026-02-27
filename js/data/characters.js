// ======== CHARACTER DATABASE ========
window.Game = window.Game || {};

// FEMALE_IDS used by avatar gen
Game.FEMALE_IDS = new Set([9, 22, 43, 49, 50, 52]);

Game.CHARACTERS = [
  // ===== Chapter 1 (12): 黄巾の乱〜群雄割拠 =====
  // 0: 劉備 (SSR)
  {
    id:0, name:'劉備', title:'漢中王', rarity:4, type:1, faction:0, chapter:1,
    atk:195, hp:1600, def:110, spd:50,
    skill:{ name:'仁徳の絆', desc:'味方全体のHPを15%回復し攻撃力10%UP', type:'heal', mult:1.5, target:'all_ally' },
    lore:{
      novel:'「人の上に立つ者は、まず人の心を得なければならぬ」。織り草履を売る身から身を起こし、関羽・張飛と義兄弟の契りを結んだ。流浪の果てに漢中王となり、蜀漢の礎を築く。',
      history:'陳寿『三国志』蜀書先主伝によれば、劉備は涿郡涿県の人。前漢中山靖王劉勝の末裔を称した。曹操に「天下の英雄は、ただ使君と操のみ」と評される器量の持ち主であった。'
    },
    voiceLine:'天下の民のため、我が剣を振るう',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#1a1a1a',beard:'goatee',gear:'crown',wpn:'dual_sword',out:'#c62828'}
  },
  // 1: 関羽 (SSR)
  {
    id:1, name:'関羽', title:'武聖', rarity:4, type:0, faction:0, chapter:1,
    atk:240, hp:1400, def:120, spd:48,
    skill:{ name:'青龍偃月斬', desc:'敵単体に攻撃力200%ダメージ', type:'damage', mult:2.0, target:'single' },
    lore:{
      novel:'青龍偃月刀を携え、赤兎馬に跨る義の武人。温酒の間に華雄を斬り、五関を破って六将を斬る。千里を駆けて義兄の元へ帰る姿は、まさに武聖の名に相応しい。',
      history:'陳寿は関羽を「万人の敵」と評した。建安五年、曹操の客将として白馬の戦いで顔良を斬る。のち荊州を守り、于禁を降して威震華夏。しかし呂蒙の策に敗れ、麦城に散った。'
    },
    voiceLine:'義に背く者、この青龍偃月刀が許さぬ',
    look:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:null,wpn:'guandao',out:'#2e7d32'}
  },
  // 2: 張飛 (SR)
  {
    id:2, name:'張飛', title:'燕人張飛', rarity:3, type:0, faction:0, chapter:1,
    atk:185, hp:1100, def:85, spd:55,
    skill:{ name:'蛇矛乱舞', desc:'敵全体に攻撃力120%ダメージ', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'長坂橋の上で一喝、曹操の百万の大軍を退けた豪傑。義兄・劉備のためならば死地にも飛び込む猛将であり、酒と怒りが玉に瑕。',
      history:'陳寿によれば張飛は涿郡の人で関羽とともに劉備に仕えた。長坂では二十騎で追撃を阻み、入蜀戦では厳顔を捕らえて心服させた知略も持つ。'
    },
    voiceLine:'俺様の蛇矛が唸るぜ！',
    look:{skin:'#5d4037',hair:'wild',hc:'#111',beard:'circle',gear:null,wpn:'snake_spear',out:'#37474f'}
  },
  // 3: 曹操 (SSR)
  {
    id:3, name:'曹操', title:'治世の能臣', rarity:4, type:1, faction:1, chapter:1,
    atk:220, hp:1500, def:125, spd:52,
    skill:{ name:'覇道の剣', desc:'味方全体の攻撃力30%UP(3ターン)', type:'buff', mult:1.3, target:'all_ally' },
    lore:{
      novel:'「乱世の奸雄」と評された曹孟徳。唯才是挙——才さえあれば身分を問わず登用する革新的人材観で、中原を制覇した。詩文にも優れ、短歌行は今なお名文として知られる。',
      history:'陳寿は曹操を「非常の人、超世の傑」と記した。建安年間に献帝を奉じて天子を挟み諸侯を令す。屯田制・求賢令など政治的革新も多い。'
    },
    voiceLine:'天下を治める者は、天下の才を用いる',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },
  // 4: 孫堅 (SR)
  {
    id:4, name:'孫堅', title:'江東の虎', rarity:3, type:0, faction:2, chapter:1,
    atk:170, hp:1050, def:90, spd:58,
    skill:{ name:'猛虎の咆哮', desc:'敵単体に攻撃力150%ダメージ+自身ATK15%UP', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'江東の虎と呼ばれた孫呉の祖。洛陽で伝国の璽を拾い、董卓討伐軍の先鋒として華雄を討った武勇の将。しかし荊州攻めの陣中、黄祖の伏兵に倒れる。',
      history:'孫堅は呉郡富春の人。黄巾の乱で功を立て長沙太守となった。董卓討伐では実質的に洛陽へ最初に入城した将の一人。初平三年、劉表攻めで戦死。'
    },
    voiceLine:'孫家の武名、此処に轟かせん',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'sword',out:'#2e7d32'}
  },
  // 5: 張角 (R)
  {
    id:5, name:'張角', title:'天公将軍', rarity:2, type:1, faction:3, chapter:1,
    atk:90, hp:800, def:55, spd:45,
    skill:{ name:'太平要術', desc:'敵全体に攻撃力80%+20%で行動不能', type:'damage', mult:0.8, target:'all_enemy' },
    lore:{
      novel:'「蒼天已に死す、黄天当に立つべし」。太平道の教祖として三十六万の信徒を率い、後漢末の天下を揺るがした黄巾の乱の首謀者。',
      history:'陳寿『三国志』には張角の詳細な伝は立てられていないが、霊帝の中平元年に挙兵。大方郡出身で、太平道を広めた。乱は数ヶ月で鎮圧されたが、後漢の権威は決定的に失墜した。'
    },
    voiceLine:'蒼天已に死す！',
    look:{skin:'#f0c8a0',hair:'long',hc:'#555',beard:'goatee',gear:'cloth_hat',wpn:'staff',out:'#616161'}
  },
  // 6: 董卓 (SR)
  {
    id:6, name:'董卓', title:'暴虐の太師', rarity:3, type:1, faction:3, chapter:1,
    atk:160, hp:1200, def:100, spd:35,
    skill:{ name:'暴虐の宴', desc:'味方全体攻撃25%UP+HP10%減', type:'buff', mult:1.25, target:'all_ally' },
    lore:{
      novel:'西涼の軍閥の長として漢の朝廷を牛耳り、少帝を廃して献帝を立てた暴君。洛陽を焼き払い長安に遷都する暴挙に、天下の諸侯が反旗を翻した。',
      history:'隴西臨洮の人。北方異民族との戦いで武功を積み、霊帝崩御の混乱に乗じて入京。相国を称して権力を掌握したが、初平三年に養子の呂布に殺された。'
    },
    voiceLine:'この天下、全て余のものぞ',
    look:{skin:'#d4a574',hair:'topknot',hc:'#222',beard:'circle',gear:'crown',wpn:'sword',out:'#424242'}
  },
  // 7: 呂布 (UR)
  {
    id:7, name:'呂布', title:'飛将', rarity:5, type:0, faction:3, chapter:1,
    atk:290, hp:2000, def:130, spd:65,
    skill:{ name:'天下無双', desc:'敵単体に攻撃力250%ダメージ', type:'damage', mult:2.5, target:'single' },
    lore:{
      novel:'「人中の呂布、馬中の赤兎」と謳われた三国志最強の武将。方天画戟を振るい、虎牢関で劉備・関羽・張飛の三人を相手に一歩も退かなかった。',
      history:'五原郡九原の人。丁原、董卓と二人の主を殺して天下を彷徨った。陳寿は「勇にして無謀、軽慮短略」と評する。下邳で曹操に捕らわれ、縊死させられた。'
    },
    voiceLine:'この天下に、我に並ぶ者はおらぬ',
    look:{skin:'#f0c8a0',hair:'wild',hc:'#222',beard:null,gear:'pheasant',wpn:'halberd',out:'#4a148c'}
  },
  // 8: 袁紹 (R)
  {
    id:8, name:'袁紹', title:'四世三公', rarity:2, type:1, faction:3, chapter:1,
    atk:100, hp:900, def:75, spd:40,
    skill:{ name:'名門の威光', desc:'味方全体攻撃力15%UP', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'四代にわたり三公を輩出した名門袁家の嫡男。反董卓連合の盟主として諸侯を束ねるが、官渡の戦いで曹操に敗れ、覇業は潰えた。',
      history:'汝南汝陽の人。名門の出自と広い人脈で河北四州を支配した。しかし陳寿は「外は寛にして内は忌む」と評し、優柔不断な性格が敗因となったと記す。'
    },
    voiceLine:'我が袁家の名に恥じぬ戦いを',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#616161'}
  },
  // 9: 公孫瓚 (R)
  {
    id:9, name:'公孫瓚', title:'白馬将軍', rarity:2, type:2, faction:3, chapter:1,
    atk:115, hp:830, def:60, spd:62,
    skill:{ name:'白馬義従', desc:'先制攻撃+攻撃力130%', type:'damage', mult:1.3, target:'single' },
    lore:{
      novel:'北方の異民族を相手に武名を轟かせた白馬将軍。白馬義従と呼ばれる精鋭騎兵を率いたが、袁紹との争いに敗れ、易京楼で自刎した。',
      history:'遼西令支の人。劉備とともに盧植に師事した。鮮卑・烏桓に対する防衛で名を上げ、幽州を支配。しかし袁紹との界橋の戦いに敗れ、建安四年に滅んだ。'
    },
    voiceLine:'白馬義従、突撃！',
    look:{skin:'#f5d5b5',hair:'ponytail',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#616161'}
  },
  // 10: 華雄 (R)
  {
    id:10, name:'華雄', title:'猛将', rarity:2, type:0, faction:3, chapter:1,
    atk:120, hp:850, def:65, spd:50,
    skill:{ name:'猛攻', desc:'敵単体に攻撃力140%ダメージ', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'董卓配下の猛将。汜水関で連合軍の将を次々と斬り、諸侯を震え上がらせた。だが関羽の前に立ちはだかり、酒の温もりが冷めぬ間に斬られた。',
      history:'正史では華雄は孫堅に討たれている。演義では関羽に斬られる場面が有名だが、これは羅貫中の創作。実際には汜水関の戦いで孫堅軍と戦い敗死した。'
    },
    voiceLine:'我を倒せる者がおるか！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'circle',gear:'iron_helm',wpn:'halberd',out:'#424242'}
  },
  // 11: 廖化 (N)
  {
    id:11, name:'廖化', title:'蜀漢の先鋒', rarity:1, type:0, faction:0, chapter:1,
    atk:60, hp:600, def:45, spd:48,
    skill:{ name:'先駆けの槍', desc:'味方全体攻撃力10%UP+先制攻撃', type:'buff', mult:1.1, target:'all_ally' },
    lore:{
      novel:'黄巾の乱から蜀漢滅亡まで戦い続けた古参の将。「蜀に大将なきとき、廖化が先鋒となる」と言われるが、その忠誠は誰にも劣らない。',
      history:'元は関羽配下の主簿。関羽敗死後、偽って死んだふりをし、荊州から蜀へ戻った。姜維の北伐にも従い、蜀漢滅亡時まで軍務に就いた。'
    },
    voiceLine:'蜀のために、この老骨を捧げよう',
    look:{skin:'#c9956b',hair:'shaved',hc:'#333',beard:'short',gear:null,wpn:'spear',out:'#c62828'}
  },

  // ===== Chapter 2 (8): 群雄割拠〜呂布の最期 =====
  // 12: 夏侯惇 (SR)
  {
    id:12, name:'夏侯惇', title:'隻眼の猛将', rarity:3, type:0, faction:1, chapter:2,
    atk:175, hp:1150, def:95, spd:50,
    skill:{ name:'隻眼の怒り', desc:'被ダメージ時に反撃(攻撃力80%)', type:'counter', mult:0.8, target:'self' },
    lore:{
      novel:'曹操の従兄弟にして最も信頼された将。呂布軍との戦いで矢に射抜かれた左目を「父母の精、食らわぬわけにはいかぬ」と自ら抉り喰った逸話は壮絶。',
      history:'沛国譙県の人。曹操の挙兵以来の腹心で、軍事よりも内政・治安に功があった。陳寿は「清廉で自らの俸禄を分け与えた」と記す。'
    },
    voiceLine:'この眼を失ってなお、敵を見据えられる',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:null,gear:'iron_helm',wpn:'spear',out:'#1565c0'}
  },
  // 13: 典韋 (SR)
  {
    id:13, name:'典韋', title:'古の悪来', rarity:3, type:0, faction:1, chapter:2,
    atk:190, hp:1050, def:88, spd:45,
    skill:{ name:'悪来の双戟', desc:'敵単体に攻撃力170%ダメージ', type:'damage', mult:1.7, target:'single' },
    lore:{
      novel:'曹操の親衛隊長として常に主君を守った忠臣。宛城の戦いで張繍の奇襲を受け、両手に十余りの戟を持ち門前で奮戦。曹操を逃がして壮絶に散った。',
      history:'陳己郡の人。膂力に優れ、曹操の校尉として常に護衛した。建安二年の宛城の変で主君を守り戦死。「古の悪来の如し」と称えられた。'
    },
    voiceLine:'主の背中は、この双戟が守る',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'short',gear:'headband',wpn:'halberd',out:'#1565c0'}
  },
  // 14: 貂蝉 (SSR)
  {
    id:14, name:'貂蝉', title:'傾国の美女', rarity:4, type:2, faction:3, chapter:2,
    atk:185, hp:1350, def:95, spd:60,
    skill:{ name:'傾国の舞', desc:'敵全体を1ターン行動不能', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'中国四大美女の一人。養父・王允の連環の計に身を捧げ、董卓と呂布の間に愛憎を植え付け、暴君を内側から崩壊させた悲劇の美女。',
      history:'貂蝉は正史には登場しない架空の人物。ただし『三国志』呂布伝に「布、卓の侍婢と私通す」とあり、董卓の侍女がモデルとされる。'
    },
    voiceLine:'この身が天下を動かすなら…',
    look:{skin:'#fce4ec',hair:'updo',hc:'#222',beard:null,gear:'hairpin',wpn:null,out:'#e91e63',fem:true}
  },
  // 15: 陳宮 (R)
  {
    id:15, name:'陳宮', title:'義に殉ずる軍師', rarity:2, type:1, faction:3, chapter:2,
    atk:95, hp:850, def:60, spd:48,
    skill:{ name:'命懸けの献策', desc:'敵全体の防御25%DOWN', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'呂布に仕えた軍師。曹操に捕らえられた際、降伏を勧められるも「仁義を知る者は二君に仕えぬ」と拒絶し、従容として死に臨んだ。',
      history:'東郡の人。初め曹操に従ったが離反し、呂布を迎えて徐州を奪取。下邳落城後、曹操の再三の勧告を退け処刑された。'
    },
    voiceLine:'策はある。あとは…覚悟だけだ',
    look:{skin:'#f0c8a0',hair:'long',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#424242'}
  },
  // 16: 袁術 (R)
  {
    id:16, name:'袁術', title:'偽帝', rarity:2, type:1, faction:3, chapter:2,
    atk:85, hp:900, def:70, spd:38,
    skill:{ name:'僭称の威', desc:'味方全体攻撃力12%UP(2ターン)', type:'buff', mult:1.12, target:'all_ally' },
    lore:{
      novel:'袁紹の異母弟。伝国の璽を手に入れて皇帝を僭称するが、天下の嘲笑を買い、孤立の末に血を吐いて死んだ。蜂蜜水を求めて得られなかったという。',
      history:'汝南汝陽の人。名門袁氏の出だが、建安二年に帝号を僭称。周辺勢力の攻撃を受け、建安四年に病死した。陳寿は「奢侈放縦」と評す。'
    },
    voiceLine:'余こそが正統なる皇帝なり！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'goatee',gear:'crown',wpn:'fan',out:'#616161'}
  },
  // 17: 孫策 (SSR)
  {
    id:17, name:'孫策', title:'小覇王', rarity:4, type:0, faction:2, chapter:2,
    atk:230, hp:1350, def:100, spd:63,
    skill:{ name:'覇王の突進', desc:'敵2体に攻撃力150%ダメージ', type:'damage', mult:1.5, target:'multi' },
    lore:{
      novel:'父・孫堅の遺志を継ぎ、わずか数年で江東を平定した「小覇王」。項羽の再来と恐れられた武勇だが、二十六歳の若さで刺客に倒れた。',
      history:'呉郡富春の人。孫堅の嫡男。袁術から父の旧兵を受け継ぎ、周瑜と共に江東を制圧。建安五年、許貢の門客に暗殺され、弟・孫権に後事を託した。'
    },
    voiceLine:'江東の地は、この覇王が切り拓く！',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:null,gear:'headband',wpn:'spear',out:'#2e7d32'}
  },
  // 18: 華佗 (N)
  {
    id:18, name:'華佗', title:'神医', rarity:1, type:1, faction:3, chapter:2,
    atk:45, hp:700, def:50, spd:42,
    skill:{ name:'神医の術', desc:'味方全体HP12%回復+攻撃力8%UP', type:'heal', mult:1.12, target:'all_ally' },
    lore:{
      novel:'麻酔薬「麻沸散」を世界で初めて用いたとされる伝説の名医。関羽の腕の毒を骨を削って治療し、曹操の頭痛を開頭術で治そうとして投獄された。',
      history:'沛国譙の人。外科手術に長じ、麻沸散による麻酔手術を行ったと『後漢書』に記される。曹操に召されたが辞退を繰り返し、獄死した。'
    },
    voiceLine:'病は気から。心を治しましょう',
    look:{skin:'#f0c8a0',hair:'long',hc:'#555',beard:'goatee',gear:'cloth_hat',wpn:null,out:'#e0e0e0'}
  },
  // 19: 于吉 (N)
  {
    id:19, name:'于吉', title:'仙人', rarity:1, type:1, faction:3, chapter:2,
    atk:50, hp:750, def:52, spd:40,
    skill:{ name:'太平清領道', desc:'味方全体HP10%回復+蘇生30%', type:'heal', mult:1.1, target:'all_ally' },
    lore:{
      novel:'江東で民の信仰を集めた道士。孫策がその人望を恐れて斬首したが、以後孫策は于吉の亡霊に悩まされたという。',
      history:'琅邪の人とされるが詳細は不明。『後漢書』には太平清領書を伝えたと記される。孫策に殺されたとする話は『江表伝』に見える。'
    },
    voiceLine:'天の道は、争わずして善く勝つ',
    look:{skin:'#f5d5b5',hair:'long',hc:'#aaa',beard:'long',gear:'cloth_hat',wpn:'staff',out:'#e0e0e0'}
  },

  // ===== Chapter 3 (8): 赤壁前夜〜三国鼎立 =====
  // 20: 趙雲 (SSR)
  {
    id:20, name:'趙雲', title:'常山の龍', rarity:4, type:2, faction:0, chapter:3,
    atk:225, hp:1450, def:115, spd:62,
    skill:{ name:'龍胆一閃', desc:'敵単体に攻撃力180%+自己HP10%回復', type:'damage', mult:1.8, target:'single' },
    lore:{
      novel:'長坂の戦いで幼い劉禅を胸に抱き、曹操の大軍を単騎で突破した「常山の龍」。一生涯一度の敗北もなく、忠義と武勇の化身として語り継がれる。',
      history:'常山真定の人。公孫瓚、のち劉備に仕えた。長坂の戦いでは劉備の妻子を救出。陳寿は伝を関張馬黄と同巻に立て、その武勇を評価している。'
    },
    voiceLine:'主の御子は、この趙子龍が守る！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#90a4ae'}
  },
  // 21: 周瑜 (SSR)
  {
    id:21, name:'周瑜', title:'美周郎', rarity:4, type:1, faction:2, chapter:3,
    atk:210, hp:1450, def:105, spd:55,
    skill:{ name:'赤壁の業火', desc:'敵全体に攻撃力140%ダメージ', type:'damage', mult:1.4, target:'all_enemy' },
    lore:{
      novel:'容姿端麗にして音楽に通じ、「曲に誤りあれば周郎は顧みる」と讃えられた。赤壁の戦いで火攻めを献策し、曹操の大軍を壊滅させた天才軍師。',
      history:'廬江舒の人。孫策とは同年の刎頚の友。赤壁の戦いの実質的な総指揮官であり、黄蓋の火攻めを採用して曹操を撃退した。建安十五年、三十六歳で病没。'
    },
    voiceLine:'東風よ吹け。天下の趨勢を、この火で決する',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'sword',out:'#c62828'}
  },
  // 22: 魯粛 (SR)
  {
    id:22, name:'魯粛', title:'呉の柱石', rarity:3, type:1, faction:2, chapter:3,
    atk:140, hp:1200, def:95, spd:45,
    skill:{ name:'天下三分の策', desc:'味方全体HP10%回復+防御15%UP', type:'heal', mult:1.1, target:'all_ally' },
    lore:{
      novel:'孫権に「天下三分」の大戦略を最初に献策した呉の戦略家。赤壁では劉備との同盟を取りまとめ、三国鼎立の礎を築いた穏やかなる知将。',
      history:'臨淮東城の人。周瑜の推薦で孫権に仕えた。赤壁の戦いでは開戦論を主張し、周瑜亡き後は荊州問題の調整に尽力。建安二十二年に病没。'
    },
    voiceLine:'争うだけが戦ではありませぬ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#2e7d32'}
  },
  // 23: 張遼 (SR)
  {
    id:23, name:'張遼', title:'威震逍遥津', rarity:3, type:2, faction:1, chapter:3,
    atk:180, hp:1100, def:88, spd:60,
    skill:{ name:'遼来来', desc:'敵2体に攻撃力100%ダメージ', type:'damage', mult:1.0, target:'multi' },
    lore:{
      novel:'合肥の戦いでわずか八百の兵で孫権の十万の大軍を急襲。「遼来来！」の喊声に呉兵は恐怖し、小児の夜泣きすら止んだという。',
      history:'雁門馬邑の人。呂布、曹操に仕えた。合肥の戦い（建安二十年）で八百の決死隊を率いて孫権本陣を急襲し、「張遼止啼」の故事を生んだ。'
    },
    voiceLine:'遼来来！退く者は斬る！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'halberd',out:'#1565c0'}
  },
  // 24: 太史慈 (R)
  {
    id:24, name:'太史慈', title:'義の弓豪', rarity:2, type:2, faction:2, chapter:3,
    atk:125, hp:850, def:62, spd:58,
    skill:{ name:'精密射撃', desc:'敵単体に攻撃力145%ダメージ', type:'damage', mult:1.45, target:'single' },
    lore:{
      novel:'弓の名手にして義に厚い武将。孫策と一騎打ちを演じ、その武勇に惚れ込んだ孫策に迎え入れられた。死に際して「大丈夫、当に七尺の剣を帯びて天子の階に登るべし」と嘆いた。',
      history:'東莱黄県の人。初め劉繇に従い、のち孫策に降った。弓術に優れ、孫権にも重用されたが、建安十一年頃に病没。四十一歳。'
    },
    voiceLine:'この矢に、義を込めて射る',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:null,gear:'headband',wpn:'bow',out:'#2e7d32'}
  },
  // 25: 甘寧 (R)
  {
    id:25, name:'甘寧', title:'錦帆賊', rarity:2, type:0, faction:2, chapter:3,
    atk:130, hp:870, def:58, spd:60,
    skill:{ name:'百騎夜襲', desc:'敵単体に攻撃力150%+先制', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'若き日は長江の水賊「錦帆賊」の頭目。帆に鈴をつけた船で暴れまわった豪傑が、孫権に仕えて名将となった。百騎で曹操の陣を夜襲した勇猛は伝説。',
      history:'巴郡臨江の人。初め黄祖に仕え、のち孫権に帰順。濡須口の戦いでは百余騎で曹操陣を夜襲し、一兵も失わなかった。「孟徳に張遼あれば、孤には甘興覇あり」と孫権に讃えられた。'
    },
    voiceLine:'錦帆の風に乗って、敵陣を駆け抜ける！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:null,gear:'headband',wpn:'dual_blade',out:'#2e7d32'}
  },
  // 26: 孫権 (SR)
  {
    id:26, name:'孫権', title:'呉大帝', rarity:3, type:1, faction:2, chapter:3,
    atk:155, hp:1250, def:98, spd:48,
    skill:{ name:'呉の結束', desc:'味方全体HP8%回復+攻撃5%UP', type:'heal', mult:1.05, target:'all_ally' },
    lore:{
      novel:'兄・孫策の遺志を継ぎ、十八歳で江東の主となった。赤壁で曹操を退け、夷陵で劉備を破り、呉を大国に育て上げた。曹操をして「生子当如孫仲謀」と言わしめた。',
      history:'呉郡富春の人。孫堅の次男。建安十三年の赤壁の戦いで曹操を撃退し、黄龍元年に皇帝に即位して呉を建国。在位二十四年。'
    },
    voiceLine:'江東は我が守る。父兄の遺志のために',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown_helm',wpn:'sword',out:'#2e7d32'}
  },
  // 27: 左慈 (N)
  {
    id:27, name:'左慈', title:'仙術使い', rarity:1, type:1, faction:3, chapter:3,
    atk:55, hp:720, def:52, spd:45,
    skill:{ name:'変化の術', desc:'ランダムで超強力効果(ATK50%UPか全体回復20%かDEF30%DOWN)', type:'random', mult:1.5, target:'random' },
    lore:{
      novel:'曹操を手玉に取った伝説の仙人。杯中の魚を釣り上げ、花の季節でもないのに牡丹を咲かせた。追っ手を幻術で翻弄し、ついに捕まることはなかった。',
      history:'廬江の人。『後漢書』方術伝に記述がある。曹操に召されたが幻術を使って逃亡したと伝えられる。道教の祖の一人とされる。'
    },
    voiceLine:'ふふ…見えるものだけが真実とは限りませんぞ',
    look:{skin:'#f5d5b5',hair:'long',hc:'#ccc',beard:'long',gear:'cloth_hat',wpn:'staff',out:'#e0e0e0'}
  },

  // ===== Chapter 4 (8): 三国鼎立〜赤壁後 =====
  // 28: 郭嘉 (SSR)
  {
    id:28, name:'郭嘉', title:'鬼才', rarity:4, type:1, faction:1, chapter:4,
    atk:200, hp:1300, def:90, spd:56,
    skill:{ name:'鬼才の策', desc:'敵全体に攻撃力85%+確率で混乱', type:'damage', mult:0.85, target:'all_enemy' },
    lore:{
      novel:'曹操が最も信頼した若き天才軍師。「十勝十敗論」で曹操に勝機を説き、官渡の大勝を導いた。赤壁前夜に夭折し、曹操は「奉孝あらば、孤をしてこの窮地に至らしめざりしものを」と嘆いた。',
      history:'穎川陽翟の人。荀彧の推薦で曹操に仕えた。呂布討伐・官渡の戦い・烏丸征伐で的確な献策を行う。建安十二年、三十八歳で病没。'
    },
    voiceLine:'十の勝因と十の敗因、お聞かせしましょう',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'fan',out:'#1565c0'}
  },
  // 29: 荀彧 (SR)
  {
    id:29, name:'荀彧', title:'王佐の才', rarity:3, type:1, faction:1, chapter:4,
    atk:150, hp:1200, def:95, spd:48,
    skill:{ name:'王佐の策', desc:'味方全体の攻撃力12%UP+防御10%UP', type:'buff', mult:1.12, target:'all_ally' },
    lore:{
      novel:'曹操の覇業を文官として支えた最高参謀。数々の人材を推薦し、内政を整え、まさに「王佐の才」。しかし曹操の皇帝簒奪に反対し、空の食器を贈られて自決した。',
      history:'穎川穎陰の人。曹操に「吾の子房なり」と評された。郭嘉・荀攸・陳群など多くの人材を推薦。建安十七年、曹操の魏公就任に反対し、病死（自殺説あり）。'
    },
    voiceLine:'人材こそが天下の礎です',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#1565c0'}
  },
  // 30: 賈詡 (SR)
  {
    id:30, name:'賈詡', title:'毒士', rarity:3, type:1, faction:3, chapter:4,
    atk:155, hp:1150, def:90, spd:50,
    skill:{ name:'毒士の計', desc:'敵全体の攻撃力15%DOWN+防御10%DOWN', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'「毒士」の異名を持つ稀代の謀略家。張繍に曹操への反撃を勧め、曹操の長子・曹昂と典韋を死に至らしめた。のち曹操に仕え、赤壁後も魏の重鎮として活躍。',
      history:'武威姑臧の人。董卓・李傕・段煨・張繍と主を変え、最後に曹操に仕えた。陳寿は賈詡伝を荀彧伝と同巻に立て、その策略を高く評価している。'
    },
    voiceLine:'策を語らず、結果を出す。それが毒士の流儀',
    look:{skin:'#c9956b',hair:'topknot',hc:'#333',beard:'goatee',gear:'cloth_hat',wpn:'fan',out:'#424242'}
  },
  // 31: 顔良 (R)
  {
    id:31, name:'顔良', title:'河北の猛将', rarity:2, type:0, faction:3, chapter:4,
    atk:125, hp:880, def:68, spd:48,
    skill:{ name:'猛撃', desc:'敵単体に攻撃力140%ダメージ', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'袁紹配下の猛将。白馬の戦いで曹操軍を圧倒するも、関羽の一刀のもとに斬られた。その最期は関羽の武名を天下に轟かせることとなった。',
      history:'陳寿の記述では、関羽が万軍の中から顔良を刺したとある。「羽、良を刺して其の首を斬り、紹の諸将、能く当たる者莫し」と、その武勇を間接的に称えている。'
    },
    voiceLine:'河北一の武勇、見せてやる！',
    look:{skin:'#d4a574',hair:'short',hc:'#111',beard:'circle',gear:'iron_helm',wpn:'halberd',out:'#616161'}
  },
  // 32: 文醜 (R)
  {
    id:32, name:'文醜', title:'河北の豪傑', rarity:2, type:0, faction:3, chapter:4,
    atk:120, hp:870, def:65, spd:50,
    skill:{ name:'豪撃', desc:'敵単体に攻撃力135%ダメージ', type:'damage', mult:1.35, target:'single' },
    lore:{
      novel:'顔良と並び称される袁紹配下の双璧。延津の戦いで曹操軍を追撃するも、曹操の釣り野伏せに掛かり戦死した。',
      history:'正史では文醜を討ったのが誰かは明確でない。曹操の計略で輜重を放棄して敵兵を誘い、混乱に乗じて撃破したとある。'
    },
    voiceLine:'顔良の仇、討たせてもらう！',
    look:{skin:'#c9956b',hair:'wild',hc:'#111',beard:'short',gear:'helmet',wpn:'axe',out:'#616161'}
  },
  // 33: 馬超 (SR)
  {
    id:33, name:'馬超', title:'錦馬超', rarity:3, type:0, faction:0, chapter:4,
    atk:185, hp:1080, def:82, spd:62,
    skill:{ name:'西涼の疾風', desc:'敵単体に攻撃力160%ダメージ', type:'damage', mult:1.6, target:'single' },
    lore:{
      novel:'西涼の勇将、錦馬超。潼関の戦いで曹操を追い詰め、「馬児不死、吾に葬地無し」と嘆かせた。のち劉備に帰順し、五虎将軍の一人に数えられる。',
      history:'扶風茂陵の人。羌族との繋がりが深い。建安十六年、韓遂と共に曹操に反旗を翻したが敗北。のち張魯のもとを経て劉備に帰順。蜀では驃騎将軍に任じられた。'
    },
    voiceLine:'西涼の風は、誰にも止められぬ！',
    look:{skin:'#f0c8a0',hair:'ponytail',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#c62828'}
  },
  // 34: 龐統 (SR)
  {
    id:34, name:'龐統', title:'鳳雛', rarity:3, type:1, faction:0, chapter:4,
    atk:165, hp:1100, def:88, spd:50,
    skill:{ name:'鳳雛の計', desc:'敵全体の防御15%DOWN+攻撃力10%DOWN', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'「臥龍と鳳雛、どちらかを得れば天下を取れる」と水鏡先生に評された天才軍師。劉備の入蜀を導いたが、落鳳坡で流れ矢に当たり三十六歳で散った。',
      history:'襄陽の人。周瑜に仕え、のち劉備に帰順。益州攻略の策を献じ、劉備の信頼を得たが、雒城攻めの最中に流れ矢で戦死。諸葛亮と並び称された。'
    },
    voiceLine:'臥龍の友として、蜀の天下を拓く',
    look:{skin:'#c9956b',hair:'short',hc:'#333',beard:'goatee',gear:'scholar',wpn:'fan',out:'#c62828'}
  },
  // 35: 黄権 (N)
  {
    id:35, name:'黄権', title:'忠義の臣', rarity:1, type:1, faction:0, chapter:4,
    atk:55, hp:680, def:55, spd:42,
    skill:{ name:'忠言の盾', desc:'味方全体防御15%UP+HP5%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'劉備の益州入りに反対するも、帰順後は忠実に仕えた。夷陵の戦いで退路を断たれ、やむなく魏に降るが、劉備は「黄権が孤に背いたのではない。孤が黄権に背いたのだ」と嘆いた。',
      history:'巴西閬中の人。劉璋、劉備、曹丕と三人の主に仕えた。陳寿は黄権伝で、その清廉さと忠節を高く評価している。'
    },
    voiceLine:'たとえ降将と呼ばれようと、この心は変わらぬ',
    look:{skin:'#c9956b',hair:'topknot',hc:'#444',beard:'short',gear:null,wpn:'scroll',out:'#c62828'}
  },

  // ===== Chapter 5 (8): 天下三分〜南征 =====
  // 36: 諸葛亮 (UR)
  {
    id:36, name:'諸葛亮', title:'臥龍', rarity:5, type:1, faction:0, chapter:5,
    atk:260, hp:2200, def:150, spd:52,
    skill:{ name:'臥龍の天火', desc:'敵全体に攻撃力150%ダメージ+味方全体攻撃15%UP', type:'damage', mult:1.5, target:'all_enemy' },
    lore:{
      novel:'「伏龍」と号し、三顧の礼を以て劉備に迎えられた天下の奇才。天下三分の計を立て、赤壁では東風を呼び、北伐では魏を震撼させた。五丈原に散るその日まで、出師表の誓いを果たし続けた。',
      history:'琅邪陽都の人。劉備に仕え、赤壁の同盟を実現。蜀漢の丞相として内政・外交・軍事すべてを担った。陳寿は「管仲・蕭何に匹敵する」と評す。建興十二年、五丈原で病没。'
    },
    voiceLine:'鞠躬尽瘁、死而後已',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'fan',out:'#e0e0e0'}
  },
  // 37: 黄蓋 (R)
  {
    id:37, name:'黄蓋', title:'苦肉の策', rarity:2, type:0, faction:2, chapter:5,
    atk:135, hp:950, def:78, spd:45,
    skill:{ name:'苦肉の策', desc:'自傷20%+敵全体に攻撃力200%ダメージ', type:'damage', mult:2.0, target:'all_enemy' },
    lore:{
      novel:'赤壁の戦いで周瑜と共謀し、偽りの降伏を演じた老将。火船で曹操の水軍に突入し、赤壁の大勝利を決定づけた。「苦肉の策」の語源となった英雄。',
      history:'零陵泉陵の人。孫堅・孫策・孫権の三代に仕えた古参。赤壁では火攻めの実行者として決定的な役割を果たした。'
    },
    voiceLine:'この老骨、主のために燃やそう',
    look:{skin:'#c9956b',hair:'shaved',hc:'#555',beard:'short',gear:null,wpn:'sword',out:'#2e7d32'}
  },
  // 38: 小喬 (R)
  {
    id:38, name:'小喬', title:'江東の華', rarity:2, type:1, faction:2, chapter:5,
    atk:90, hp:800, def:55, spd:55,
    skill:{ name:'絶世の調べ', desc:'味方全体HP8%回復+速度10%UP', type:'heal', mult:1.08, target:'all_ally' },
    lore:{
      novel:'姉の大喬と共に「江東の二喬」と讃えられた絶世の美女。周瑜の妻として赤壁の戦いを支えた。杜牧の詩「東風利ぜずんば銅雀、春深くして二喬を鎖さん」は有名。',
      history:'正史での記述は極めて少なく、「橋公の二女、皆国色あり」と記されるのみ。周瑜が娶ったのが妹とされる。'
    },
    voiceLine:'周郎の帰りを、琴の音色で待ちましょう',
    look:{skin:'#fce4ec',hair:'flowing',hc:'#222',beard:null,gear:'hairpin',wpn:null,out:'#4caf50',fem:true}
  },
  // 39: 孟獲 (R)
  {
    id:39, name:'孟獲', title:'南蛮王', rarity:2, type:0, faction:3, chapter:5,
    atk:140, hp:1000, def:80, spd:42,
    skill:{ name:'南蛮王の力', desc:'被ダメ50%減+反撃120%', type:'counter', mult:1.2, target:'self' },
    lore:{
      novel:'南蛮の王として諸葛亮に七度捕らえられ七度放された。心まで屈服させられた孟獲は、以後二度と反乱を起こさなかった。「心を攻めるは城を攻めるに勝る」の典型。',
      history:'正史での孟獲の記述は少ないが、『漢晋春秋』に七縦七擒の故事がある。建興三年の南征で諸葛亮に降伏し、以後南中は安定した。'
    },
    voiceLine:'この南蛮王を七度も捕えるとは…天晴れじゃ！',
    look:{skin:'#8d6e63',hair:'wild',hc:'#111',beard:'circle',gear:'headband',wpn:'axe',out:'#616161'}
  },
  // 40: 祝融 (R)
  {
    id:40, name:'祝融', title:'祝融夫人', rarity:2, type:2, faction:3, chapter:5,
    atk:130, hp:830, def:58, spd:58,
    skill:{ name:'火神の加護', desc:'敵全体に攻撃力120%+火傷+味方ATK10%UP', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'孟獲の妻にして火神・祝融の末裔を称する女傑。飛刀の名手で、蜀軍の将を次々と捕縛した。演義において最も武勇に優れた女性武将の一人。',
      history:'祝融夫人は演義の創作上の人物であり、正史には登場しない。南蛮征伐のエピソードを彩る存在として、羅貫中が創造したとされる。'
    },
    voiceLine:'南蛮の女は強いのよ！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:null,gear:'headband',wpn:'dagger',out:'#ff5722',fem:true}
  },
  // 41: 蔡文姫 (N)
  {
    id:41, name:'蔡文姫', title:'胡笳の才女', rarity:1, type:1, faction:3, chapter:5,
    atk:48, hp:680, def:45, spd:45,
    skill:{ name:'胡笳十八拍', desc:'味方全体HP15%回復+状態異常解除', type:'heal', mult:1.15, target:'all_ally' },
    lore:{
      novel:'蔡邕の娘にして漢末随一の才媛。匈奴に拉致され十二年、胡笳の音に故国への想いを込めた「胡笳十八拍」は涙なしには聞けない。',
      history:'陳留圉の人。蔡邕の娘。董卓滅亡後の混乱で南匈奴に掠われ、左賢王の妻となった。曹操が金璧で身請けし、帰国後は蔡邕の蔵書を暗記から復元した。'
    },
    voiceLine:'胡笳の音色に、故郷への想いを乗せて…',
    look:{skin:'#fce4ec',hair:'flowing',hc:'#333',beard:null,gear:'hairpin',wpn:null,out:'#9c27b0',fem:true}
  },
  // 42: 孫尚香 (R)
  {
    id:42, name:'孫尚香', title:'弓腰姫', rarity:2, type:2, faction:0, chapter:5,
    atk:120, hp:860, def:62, spd:60,
    skill:{ name:'弓腰姫の奮迅', desc:'敵単体に攻撃力150%+自己ATK20%UP', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'孫権の妹にして劉備の妻。武芸を好み、侍女にも武装させた勝ち気な姫。政略結婚ながら劉備に惹かれるが、呉に戻された後、夫の死を知り長江に身を投じた。',
      history:'正史に個人名は記されず、「孫夫人」とのみある。劉備との婚姻は建安十四年頃。侍女に武器を持たせ、劉備を恐れさせたと裴松之注に見える。'
    },
    voiceLine:'弓腰姫と呼ぶがよい！',
    look:{skin:'#fce4ec',hair:'ponytail',hc:'#222',beard:null,gear:'headband',wpn:'bow',out:'#c62828',fem:true}
  },
  // 43: 魏延 (SR)
  {
    id:43, name:'魏延', title:'反骨の猛将', rarity:3, type:0, faction:0, chapter:5,
    atk:180, hp:1100, def:82, spd:55,
    skill:{ name:'反骨の刃', desc:'敵単体に攻撃力160%ダメージ(暴走時220%)', type:'damage', mult:1.6, target:'single' },
    lore:{
      novel:'劉備に見出され漢中太守に抜擢された猛将。子午谷の奇策は諸葛亮に退けられたが、もし実行されていれば歴史は変わっていたかもしれない。「反骨の相」の烙印を押された悲運の将。',
      history:'義陽の人。入蜀戦から漢中防衛まで軍功多し。北伐では常に先鋒を務めた。諸葛亮没後、楊儀と対立し反乱者として誅殺された。陳寿はこの処遇に疑問を呈している。'
    },
    voiceLine:'俺の策なら、長安は落とせた…！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'short',gear:'iron_helm',wpn:'sword',out:'#c62828'}
  },

  // ===== Chapter 6 (8): 荊州の争い〜北伐 =====
  // 44: 関羽[神] (UR)
  {
    id:44, name:'関羽[神]', title:'武神', rarity:5, type:0, faction:0, chapter:6,
    atk:280, hp:2100, def:160, spd:55,
    skill:{ name:'武神降臨', desc:'敵全体に攻撃力200%ダメージ+味方全体HP10%回復', type:'damage', mult:2.0, target:'all_enemy' },
    lore:{
      novel:'関聖帝君として神格化された武聖。樊城の戦いで于禁を降し、龐徳を斬り、「威震華夏」の名声を天下に轟かせた。しかし呂蒙の白衣渡江により麦城に追い詰められ、神話となった。',
      history:'死後、歴代王朝に追封され、清代には「関聖大帝」として最高位の神格を与えられた。商業の神・義の神として現在も中華圏で広く信仰される。'
    },
    voiceLine:'義の道に終わりはない。この魂、永遠に戦場にあり',
    look:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:'crown',wpn:'guandao',out:'#ffd700'}
  },
  // 45: 黄忠 (SR)
  {
    id:45, name:'黄忠', title:'老将', rarity:3, type:0, faction:0, chapter:6,
    atk:175, hp:1050, def:85, spd:45,
    skill:{ name:'百歩穿楊', desc:'敵単体に攻撃力175%ダメージ(会心率UP)', type:'damage', mult:1.75, target:'single' },
    lore:{
      novel:'六十を超えてなお衰えぬ弓の名手。定軍山の戦いで夏侯淵を一刀のもとに斬り、五虎将軍に列せられた老将。老いてなお盛んなることの象徴。',
      history:'南陽の人。劉表に仕え、のち劉備に帰順。建安二十四年の定軍山の戦いで夏侯淵を討ち取った。陳寿は「勇毅冠三軍」と評す。'
    },
    voiceLine:'老いてなお、この弓は衰えぬ！',
    look:{skin:'#c9956b',hair:'topknot',hc:'#aaa',beard:'goatee',gear:null,wpn:'bow',out:'#c62828'}
  },
  // 46: 法正 (SR)
  {
    id:46, name:'法正', title:'蜀の軍師', rarity:3, type:1, faction:0, chapter:6,
    atk:158, hp:1100, def:85, spd:50,
    skill:{ name:'反間の計', desc:'敵の最強ユニットの攻撃力25%DOWN', type:'debuff', mult:1.0, target:'single' },
    lore:{
      novel:'劉備の益州入りを内から画策した策士。漢中の戦いでは実質的な軍師として劉備を導き、定軍山の大勝を演出した。諸葛亮をして「孝直が存命なら」と嘆かせた才。',
      history:'扶風郿の人。劉璋に仕えたが不遇で、劉備を益州に迎え入れた。漢中争奪戦での献策は諸葛亮以上と評される。建安二十五年に病没。'
    },
    voiceLine:'勝機は敵の油断の中にある',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#c62828'}
  },
  // 47: 呂蒙 (SR)
  {
    id:47, name:'呂蒙', title:'呉下の阿蒙にあらず', rarity:3, type:1, faction:2, chapter:6,
    atk:165, hp:1150, def:92, spd:52,
    skill:{ name:'白衣渡江', desc:'敵の防御を無視して攻撃力130%ダメージ', type:'damage', mult:1.3, target:'single' },
    lore:{
      novel:'若き日は「呉下の阿蒙」と嘲られた無学の武将。しかし孫権の勧めで猛勉強し、魯粛を驚嘆させた。白衣渡江で荊州を奪取し、関羽を追い詰めた知将。',
      history:'汝南富陂の人。孫権に仕え、荊州奪回作戦を立案・実行。商人に偽装した白衣渡江で関羽を破った。しかし荊州制圧直後に病没。三十九歳。'
    },
    voiceLine:'もはや呉下の阿蒙ではない',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:'short',gear:'light_helm',wpn:'sword',out:'#2e7d32'}
  },
  // 48: 馬謖 (R)
  {
    id:48, name:'馬謖', title:'街亭の罪人', rarity:2, type:1, faction:0, chapter:6,
    atk:95, hp:750, def:50, spd:48,
    skill:{ name:'山上布陣', desc:'味方全体攻撃35%UP+自身戦闘不能', type:'buff', mult:1.35, target:'all_ally' },
    lore:{
      novel:'諸葛亮が才能を愛した若き参謀。しかし第一次北伐で街亭の守備を任された際、独断で山上に布陣し大敗。「泣いて馬謖を斬る」の故事を生んだ。',
      history:'襄陽宜城の人。兄の馬良の推薦で蜀に仕えた。建興六年、街亭で張郃に大敗し、諸葛亮に軍法で処刑された。'
    },
    voiceLine:'丞相…この失敗、必ず取り返して見せます…',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'scholar',wpn:'scroll',out:'#c62828'}
  },
  // 49: 厳顔 (R)
  {
    id:49, name:'厳顔', title:'断頭将軍', rarity:2, type:0, faction:0, chapter:6,
    atk:125, hp:950, def:80, spd:40,
    skill:{ name:'老将の意地', desc:'被ダメ時反撃(攻撃力100%)+防御20%UP', type:'counter', mult:1.0, target:'self' },
    lore:{
      novel:'「断頭将軍あるも、降将軍なし！」。張飛に捕らえられた際、一切の命乞いをせず首を差し出した剛毅の老将。その心意気に感じ入った張飛に厚遇された。',
      history:'正史での厳顔の記述は少ないが、劉璋配下として巴郡太守を務めた。張飛に捕らえられて降伏したとある。演義ほど劇的な描写はない。'
    },
    voiceLine:'頭を斬れ！降参はせぬ！',
    look:{skin:'#c9956b',hair:'shaved',hc:'#aaa',beard:'short',gear:'iron_helm',wpn:'axe',out:'#c62828'}
  },
  // 50: 曹丕 (SR)
  {
    id:50, name:'曹丕', title:'魏の初代皇帝', rarity:3, type:1, faction:1, chapter:6,
    atk:160, hp:1200, def:100, spd:50,
    skill:{ name:'禅譲の威', desc:'味方全体攻撃力15%UP+防御10%UP', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'曹操の後継者として魏を建国し、後漢から禅譲を受けて初代皇帝となった。文才にも優れ、「典論」は中国文学批評の先駆け。',
      history:'沛国譙の人。曹操の嫡子。延康元年に献帝から禅譲を受け、魏の文帝となった。在位七年。詩文に優れ、建安文学の中心人物の一人。'
    },
    voiceLine:'漢の天命は尽きた。これより魏の世ぞ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },
  // 51: 陸遜 (SSR)
  {
    id:51, name:'陸遜', title:'呉の大都督', rarity:4, type:1, faction:2, chapter:6,
    atk:200, hp:1400, def:100, spd:52,
    skill:{ name:'夷陵の火計', desc:'敵全体に攻撃力130%ダメージ+防御15%DOWN', type:'damage', mult:1.3, target:'all_enemy' },
    lore:{
      novel:'夷陵の戦いで劉備の大軍を火攻めで壊滅させた呉の天才軍師。書生と侮られたが、呂蒙の後任として荊州方面の総指揮を執り、呉の国運を守った。',
      history:'呉郡呉県の人。孫権に仕え、荊州奪取・夷陵の戦いで功を立てた。のち丞相となるが、孫権の後継者争いに巻き込まれ、憤死した。'
    },
    voiceLine:'兵は詐を以て立つ。この火計がその証',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'fan',out:'#2e7d32'}
  },

  // ===== Chapter 7 (8): 北伐〜五丈原 =====
  // 52: 司馬懿 (UR)
  {
    id:52, name:'司馬懿', title:'冢虎', rarity:5, type:1, faction:1, chapter:7,
    atk:270, hp:2300, def:170, spd:48,
    skill:{ name:'冢虎の深淵', desc:'敵全体の能力を20%封印+攻撃力160%ダメージ', type:'damage', mult:1.6, target:'all_enemy' },
    lore:{
      novel:'「狼顧の相」を持つ魏の最高参謀。諸葛亮の北伐を五度にわたり退け、空城の計にすら動じなかった忍耐の化身。最後に天下を手にしたのは、この冢虎であった。',
      history:'河内温県の人。曹操に仕え、曹丕・曹叡・曹芳の三代に重用された。高平陵の変で曹爽を排除し、魏の実権を掌握。晋王朝の基礎を築いた。'
    },
    voiceLine:'急がぬことだ。天下は…待つ者のもの',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'crown_helm',wpn:'fan',out:'#0d47a1'}
  },
  // 53: 姜維 (SSR)
  {
    id:53, name:'姜維', title:'蜀漢最後の希望', rarity:4, type:0, faction:0, chapter:7,
    atk:215, hp:1400, def:105, spd:58,
    skill:{ name:'北伐の誓い', desc:'敵全体に攻撃力140%ダメージ+自身ATK20%UP', type:'damage', mult:1.4, target:'all_enemy' },
    lore:{
      novel:'諸葛亮が「涼州の上士」と認め、後継者に指名した蜀漢最後の名将。北伐を十一回にわたり敢行し、蜀滅亡後もなお復興を企てた。「蜀漢への忠誠に背かず」と死ぬまで戦い続けた。',
      history:'天水冀県の人。魏から蜀に降り、諸葛亮に重用された。北伐を継続したが、宦官黄皓の讒言と国力の衰退に阻まれた。蜀滅亡後、鍾会と共謀して反乱を企てるも敗死。'
    },
    voiceLine:'丞相の志、この姜維が継ぐ！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#c62828'}
  },
  // 54: 鄧艾 (SR)
  {
    id:54, name:'鄧艾', title:'奇策の将', rarity:3, type:2, faction:1, chapter:7,
    atk:170, hp:1100, def:88, spd:58,
    skill:{ name:'陰平越え', desc:'防御を無視して敵単体に攻撃力155%ダメージ', type:'damage', mult:1.55, target:'single' },
    lore:{
      novel:'魏の名将。険しい陰平の山道を越えて蜀の背後を突くという前代未聞の奇策で成都を陥落させ、蜀漢を滅ぼした。しかし功を妬まれ、讒言により殺された。',
      history:'義陽棘陽の人。吃音があったが才能を認められ、屯田の改革を行った。景元四年、陰平越えで綿竹を破り蜀を滅ぼしたが、鍾会の讒言により殺害された。'
    },
    voiceLine:'道なきところに道を作る。それが戦いだ',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'light_helm',wpn:'spear',out:'#1565c0'}
  },
  // 55: 夏侯淵 (SR)
  {
    id:55, name:'夏侯淵', title:'疾風の将', rarity:3, type:2, faction:1, chapter:7,
    atk:175, hp:1050, def:80, spd:65,
    skill:{ name:'急襲', desc:'敵単体に攻撃力155%ダメージ+先制', type:'damage', mult:1.55, target:'single' },
    lore:{
      novel:'「三日で五百里、五日で千里」を行軍する機動力で恐れられた曹操配下の猛将。しかし定軍山で黄忠に討たれ、西方の盾は崩れ去った。',
      history:'沛国譙の人。曹操の従弟。西方の軍事を担い、馬超・韓遂平定に活躍。建安二十四年、定軍山で黄忠に討たれた。「白地将軍」と嘲られたことも。'
    },
    voiceLine:'速さこそ兵法の極意よ！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 56: 荀攸 (R)
  {
    id:56, name:'荀攸', title:'謀の達人', rarity:2, type:1, faction:1, chapter:7,
    atk:100, hp:850, def:65, spd:48,
    skill:{ name:'密計', desc:'敵単体の攻撃力20%DOWN+防御15%DOWN', type:'debuff', mult:1.0, target:'single' },
    lore:{
      novel:'荀彧の甥にして曹操の軍師。十二の奇策を献じ、官渡の勝利に貢献した。表舞台には出ず、裏方で曹操の覇業を支えた「策士中の策士」。',
      history:'穎川穎陰の人。荀彧とは叔父と甥の関係。曹操に仕え、官渡の戦いなどで多くの献策を行った。建安十九年に病没。陳寿は「荀攸の策は十二あり」と記す。'
    },
    voiceLine:'十二の策、お望みのものをどうぞ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#1565c0'}
  },
  // 57: 程昱 (R)
  {
    id:57, name:'程昱', title:'剛毅の参謀', rarity:2, type:1, faction:1, chapter:7,
    atk:105, hp:880, def:70, spd:45,
    skill:{ name:'鉄壁の守り', desc:'味方全体防御20%UP', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'曹操の古参の参謀。官渡の戦いでは荀彧とともに許都を守り、曹操の退路を確保した。戦略眼と実務能力を兼ね備えた魏の重鎮。',
      history:'東郡東阿の人。黄巾の乱の頃から曹操に仕え、兗州・徐州の経営に功績があった。八十歳近くまで活躍した古参中の古参。'
    },
    voiceLine:'守りを固めてこそ、攻めが活きる',
    look:{skin:'#c9956b',hair:'shaved',hc:'#555',beard:'goatee',gear:null,wpn:'scroll',out:'#1565c0'}
  },
  // 58: 張昭 (N)
  {
    id:58, name:'張昭', title:'呉の長老', rarity:1, type:1, faction:2, chapter:7,
    atk:50, hp:700, def:55, spd:38,
    skill:{ name:'長老の訓戒', desc:'味方全体防御12%UP+HP5%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'孫策の遺言「内事は張昭に問え」で知られる呉の文官筆頭。赤壁では降伏論を唱えて周瑜と対立したが、孫権は内心では最も信頼した重臣。',
      history:'彭城の人。孫策・孫権に仕え、内政を担当した。赤壁では降伏を主張したことで知られるが、呉の国内統治には不可欠な存在だった。'
    },
    voiceLine:'戦わずして勝つが上策ですぞ',
    look:{skin:'#f5d5b5',hair:'topknot',hc:'#aaa',beard:'long',gear:'scholar',wpn:'scroll',out:'#2e7d32'}
  },
  // 59: 管輅 (N)
  {
    id:59, name:'管輅', title:'天機の占師', rarity:1, type:1, faction:3, chapter:7,
    atk:45, hp:720, def:50, spd:42,
    skill:{ name:'天機の占', desc:'全スキル発動率UP+敵の弱点露出DEF20%DOWN', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'三国時代最高の占師。天文と人相で吉凶を読み、曹操にも重用された。「南斗が生を司り、北斗が死を司る」の故事でも知られる。',
      history:'平原の人。『三国志』魏書に伝がある。八歳で星座を暗記し、占術に通じた。管輅の占いは驚くべき的中率を誇ったと記される。四十八歳で没。'
    },
    voiceLine:'星の巡りが…変わりましたな',
    look:{skin:'#f5d5b5',hair:'long',hc:'#888',beard:'goatee',gear:'cloth_hat',wpn:'staff',out:'#424242'}
  },

  // ===== Chapter 8 (8): 三国統一〜晋 =====
  // 60: 司馬炎 (UR)
  {
    id:60, name:'司馬炎', title:'天下統一の帝', rarity:5, type:1, faction:1, chapter:8,
    atk:255, hp:2400, def:165, spd:50,
    skill:{ name:'天下統一', desc:'味方全体攻撃力25%UP+HP20%回復+敵全体攻撃力15%DOWN', type:'buff', mult:1.25, target:'all' },
    lore:{
      novel:'司馬懿の孫にして晋の武帝。祖父と父が三代にわたって築いた基盤の上に、遂に天下を統一した。しかし統一後の治世は奢侈に流れ、八王の乱の遠因となった。',
      history:'河内温県の人。司馬昭の嫡子。泰始元年に魏から禅譲を受けて晋を建国。太康元年に呉を滅ぼし三国統一を完成させた。しかし晩年の政治は緩み、西晋の短命につながった。'
    },
    voiceLine:'三国の争いは、今日この時に終わる',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#ffd700'}
  },
  // 61: 羊祜 (SR)
  {
    id:61, name:'羊祜', title:'仁徳の将', rarity:3, type:1, faction:1, chapter:8,
    atk:150, hp:1200, def:100, spd:45,
    skill:{ name:'徳化の策', desc:'味方全体HP12%回復+防御15%UP', type:'heal', mult:1.12, target:'all_ally' },
    lore:{
      novel:'呉との国境を守りながら、敵味方を超えた徳で知られた晋の名将。羊祜が亡くなった時、敵国・呉の民までもが涙したという。呉征伐の大戦略を立案した。',
      history:'泰山南城の人。荊州方面の司令官として呉の陸抗と対峙。徳を以て呉の民心を懐柔する戦略を取った。死に際して呉征伐を進言し、杜預がそれを実行した。'
    },
    voiceLine:'徳を以て人を治めれば、剣は不要となる',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#1565c0'}
  },
  // 62: 杜預 (SR)
  {
    id:62, name:'杜預', title:'破竹の将', rarity:3, type:2, faction:1, chapter:8,
    atk:165, hp:1100, def:85, spd:55,
    skill:{ name:'破竹の勢い', desc:'敵全体に攻撃力120%ダメージ+防御10%DOWN', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'「破竹の勢い」の故事で知られる晋の名将。羊祜の遺志を継ぎ、呉征伐を完遂して三国時代に終止符を打った。文武両道の人物で、学者としても名高い。',
      history:'京兆杜陵の人。太康元年、呉征伐の総指揮官として長江を下り、孫皓を降伏させた。「春秋左氏伝」の注釈でも名高い学者でもあった。'
    },
    voiceLine:'竹を割るが如く、一気に攻め落とす！',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'sword',out:'#1565c0'}
  },
  // 63: 劉禅 (R)
  {
    id:63, name:'劉禅', title:'安楽公', rarity:2, type:1, faction:0, chapter:8,
    atk:80, hp:900, def:70, spd:35,
    skill:{ name:'楽不思蜀', desc:'味方全体HP10%回復(被ダメ20%UP)', type:'heal', mult:1.1, target:'all_ally' },
    lore:{
      novel:'蜀漢の二代目にして最後の皇帝。諸葛亮に「陛下は凡庸」と評されつつも四十年間在位した。降伏後「此の間楽しくして蜀を思わず」と答えた逸話は有名。',
      history:'劉備の嫡子。建興元年に即位し、諸葛亮に国政を委ねた。景耀六年、鄧艾の侵攻に降伏。洛陽で安楽公に封じられ、安穏に余生を送った。'
    },
    voiceLine:'此間楽しく、蜀を思わず…なんてね',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'crown',wpn:null,out:'#c62828'}
  },
  // 64: 鍾会 (SR)
  {
    id:64, name:'鍾会', title:'野心の策士', rarity:3, type:1, faction:1, chapter:8,
    atk:170, hp:1100, def:85, spd:52,
    skill:{ name:'権謀術数', desc:'敵全体の攻撃力20%DOWN+自身ATK20%UP', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'魏の若き天才軍師。蜀征伐を主導したが、成都入城後に反乱を企て、自らも命を落とした。その才能と野心は表裏一体であった。',
      history:'穎川長社の人。鍾繇の子。景元四年の蜀征伐で鄧艾と共に功を立てたが、鄧艾を陥れた後、自らも反乱を起こして殺された。'
    },
    voiceLine:'天下を動かすのは、腕力ではなく頭脳だ',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'scholar',wpn:'fan',out:'#1565c0'}
  },
  // 65: 曹仁 (R)
  {
    id:65, name:'曹仁', title:'魏の壁', rarity:2, type:0, faction:1, chapter:8,
    atk:110, hp:950, def:85, spd:42,
    skill:{ name:'鉄壁防衛', desc:'味方全体防御25%UP(2ターン)', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'曹操の従弟にして魏屈指の守将。樊城で関羽の猛攻を耐え凌いだ鉄壁の守備は「魏の壁」と称される。攻城戦では必ず名前が挙がる名将。',
      history:'沛国譙県の人。曹操に従い各地を転戦した。樊城の戦いでは関羽の水攻めに耐え、援軍を待った。黄初四年に病没。大司馬に追贈された。'
    },
    voiceLine:'この城は、一歩たりとも譲らぬ',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'circle',gear:'iron_helm',wpn:'mace',out:'#1565c0'}
  },
  // 66: 孫皓 (R)
  {
    id:66, name:'孫皓', title:'呉の末帝', rarity:2, type:1, faction:2, chapter:8,
    atk:90, hp:850, def:60, spd:40,
    skill:{ name:'暴政', desc:'味方全体攻撃力20%UP+HP10%減', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'呉の最後の皇帝。即位当初は聡明な君主と期待されたが、やがて暴虐な暴君と化した。晋の侵攻に抗しきれず降伏し、三国時代は終わりを告げた。',
      history:'孫権の孫。元興元年に即位。初期は善政を敷いたが、次第に猜疑心と残虐さを増した。太康元年、杜預の侵攻に降伏。洛陽に移され、帰命侯に封じられた。'
    },
    voiceLine:'朕に逆らう者は…皆殺しじゃ！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#2e7d32'}
  },
  // 67: 馬良 (N)
  {
    id:67, name:'馬良', title:'白眉', rarity:1, type:1, faction:0, chapter:8,
    atk:55, hp:680, def:48, spd:46,
    skill:{ name:'白眉の知恵', desc:'味方全体攻撃力10%UP+HP5%回復', type:'buff', mult:1.1, target:'all_ally' },
    lore:{
      novel:'馬氏五兄弟の中で最も優れ、「馬氏の五常、白眉最も良し」と称された。蜀漢の文官として活躍したが、夷陵の戦いで劉備と共に戦い、戦死した。',
      history:'襄陽宜城の人。馬謖の兄。劉備に仕え、武陵の蛮族を招撫する外交手腕を発揮した。章武二年、夷陵の戦いで戦死。'
    },
    voiceLine:'兄弟の中で最も良きもの…それが白眉',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#c62828'}
  },
];
