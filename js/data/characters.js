// ======== CHARACTER DATABASE (正史準拠 v13) ========
// 77 characters: 7 UR, 15 SSR, 26 SR, 22 R, 7 N
// All based on 正史三国志 (陳寿) and 晋書
window.Game = window.Game || {};

// FEMALE_IDS used by avatar gen
Game.FEMALE_IDS = new Set([41, 42]);

Game.CHARACTERS = [
  // ===== Chapter 1: 黄巾の乱 (184年) =====
  // 5: 張角 (R)
  {
    id:5, name:'張角', title:'天公将軍', rarity:2, type:1, faction:3, chapter:1,
    atk:90, hp:800, def:55, spd:45,
    skill:{ name:'太平要術', desc:'敵全体に攻撃力80%ダメージ+敵全体防御10%DOWN(3ターン)', type:'damage', mult:0.8, target:'all_enemy' },
    lore:{
      novel:'「蒼天已に死す、黄天当に立つべし」。太平道の教祖として三十六万の信徒を率い、後漢末の天下を揺るがした黄巾の乱の首謀者。',
      history:'冀州鉅鹿郡の人。後漢書によれば太平道を布教し信徒数十万を三十六方に編成した。中平元年に蜂起するも数ヶ月で鎮圧、張角自身は蜂起中に病死した。'
    },
    voiceLine:'蒼天已に死す！',
    look:{skin:'#f0c8a0',hair:'long',hc:'#555',beard:'goatee',gear:'cloth_hat',wpn:'staff',out:'#616161'}
  },
  // 10: 華雄 (R)
  {
    id:10, name:'華雄', title:'猛将', rarity:2, type:0, faction:3, chapter:1,
    atk:120, hp:850, def:65, spd:50,
    skill:{ name:'猛攻', desc:'敵単体に攻撃力140%ダメージ', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'董卓配下の猛将。汜水関で連合軍の将を次々と斬り、諸侯を震え上がらせた。だが関羽の前に酒が冷めぬ間に斬られた。',
      history:'正史では華雄は孫堅に討たれている。陳寿『三国志』魏書董卓伝によれば、汜水関の戦いで孫堅軍と交戦して敗死した。演義の関羽による討伐は羅貫中の創作である。'
    },
    voiceLine:'我を倒せる者がおるか！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'circle',gear:'iron_helm',wpn:'halberd',out:'#424242'}
  },
  // 11: 廖化 (N)
  {
    id:11, name:'廖化', title:'蜀漢の先鋒', rarity:1, type:0, faction:0, chapter:1,
    atk:60, hp:600, def:45, spd:48,
    skill:{ name:'先駆けの槍', desc:'敵単体に攻撃力100%ダメージ+味方全体攻撃力8%UP(3ターン)', type:'damage', mult:1.0, target:'single' },
    lore:{
      novel:'黄巾の乱から蜀漢滅亡まで戦い続けた古参の将。「蜀に大将なきとき、廖化が先鋒となる」と言われるが、その忠誠は誰にも劣らない。',
      history:'元は関羽配下の主簿。陳寿『三国志』蜀書によれば、関羽敗死後に偽って死を装い荊州から蜀へ帰還。姜維の北伐にも従い、蜀漢滅亡時まで軍務に就いた。'
    },
    voiceLine:'蜀のために、この老骨を捧げよう',
    look:{skin:'#c9956b',hair:'shaved',hc:'#333',beard:'short',gear:null,wpn:'spear',out:'#c62828'}
  },
  // 18: 華佗 (N)
  {
    id:18, name:'華佗', title:'神医', rarity:1, type:1, faction:3, chapter:1,
    atk:45, hp:700, def:50, spd:42,
    skill:{ name:'神医の術', desc:'味方全体HP12%回復+味方全体攻撃力8%UP(3ターン)', type:'heal', mult:1.12, target:'all_ally' },
    lore:{
      novel:'麻酔薬「麻沸散」を世界で初めて用いたとされる伝説の名医。関羽の腕の毒を骨を削って治療し、曹操の頭痛を開頭術で治そうとして投獄された。',
      history:'沛国譙の人。『後漢書』方術伝に外科手術と麻沸散による麻酔の記録がある。曹操に召されたが辞退を繰り返し、獄中で死去した。'
    },
    voiceLine:'病は気から。心を治しましょう',
    look:{skin:'#f0c8a0',hair:'long',hc:'#555',beard:'goatee',gear:'cloth_hat',wpn:null,out:'#e0e0e0'}
  },

  // ===== Chapter 2: 反董卓連合 (189-192年) =====
  // 6: 董卓 (UR)
  {
    id:6, name:'董卓', title:'暴虐の太師', rarity:5, type:0, faction:3, chapter:2,
    atk:340, hp:2400, def:160, spd:40,
    skill:{ name:'暴虐の焔', desc:'敵全体に攻撃力200%ダメージ+敵全体攻撃力30%DOWN(3ターン)', type:'damage', mult:2.0, target:'all_enemy' },
    lore:{
      novel:'西涼の軍閥の長として漢の朝廷を牛耳り、少帝を廃して献帝を立てた暴君。洛陽を焼き払い長安に遷都する暴挙に天下の諸侯が反旗を翻した。',
      history:'隴西臨洮の人。後漢書・魏書董卓伝によれば北方異民族との戦いで武功を積み、霊帝崩御後の混乱に乗じて入京。相国を称して権力を掌握した。陳寿は「狼戻不仁、恣行暴虐」と評す。初平三年に呂布に殺された。'
    },
    voiceLine:'この天下、全て余のものぞ',
    look:{skin:'#d4a574',hair:'topknot',hc:'#222',beard:'circle',gear:'crown',wpn:'sword',out:'#424242'}
  },
  // 7: 呂布 (SSR)
  {
    id:7, name:'呂布', title:'飛将', rarity:4, type:0, faction:3, chapter:2,
    atk:240, hp:1600, def:120, spd:58,
    skill:{ name:'天下無双', desc:'敵単体に攻撃力220%ダメージ', type:'damage', mult:2.2, target:'single' },
    lore:{
      novel:'「人中の呂布、馬中の赤兎」と謳われた三国志最強の武将。方天画戟を振るい、虎牢関で劉備・関羽・張飛の三人を相手に一歩も退かなかった。',
      history:'五原郡九原の人。魏書呂布伝によれば丁原・董卓と二人の主を殺して天下を彷徨った。陳寿は「勇にして無謀、軽慮短略、反覆して恩義なし」と評す。下邳で曹操に捕らわれ処刑された。'
    },
    voiceLine:'この天下に、我に並ぶ者はおらぬ',
    look:{skin:'#f0c8a0',hair:'wild',hc:'#222',beard:null,gear:'pheasant',wpn:'halberd',out:'#4a148c'}
  },
  // 8: 袁紹 (SR)
  {
    id:8, name:'袁紹', title:'四世三公', rarity:3, type:1, faction:3, chapter:2,
    atk:155, hp:1150, def:95, spd:42,
    skill:{ name:'名門の威光', desc:'味方全体攻撃力20%UP(3ターン)+味方全体防御15%UP(3ターン)', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'四代にわたり三公を輩出した名門袁家の嫡男。反董卓連合の盟主として諸侯を束ねるが、官渡の戦いで曹操に敗れ、覇業は潰えた。',
      history:'汝南汝陽の人。魏書袁紹伝によれば河北四州を支配して最大勢力を誇った。陳寿は「外は寛にして内は忌み、好謀にして断ぜず」と評し、優柔不断が敗因とした。'
    },
    voiceLine:'我が袁家の名に恥じぬ戦いを',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#616161'}
  },
  // 9: 公孫瓚 (R)
  {
    id:9, name:'公孫瓚', title:'白馬将軍', rarity:2, type:2, faction:3, chapter:2,
    atk:115, hp:830, def:60, spd:62,
    skill:{ name:'白馬義従', desc:'敵単体に攻撃力130%ダメージ', type:'damage', mult:1.3, target:'single' },
    lore:{
      novel:'北方の異民族を相手に武名を轟かせた白馬将軍。白馬義従と呼ばれる精鋭騎兵を率いたが、袁紹との争いに敗れ易京楼で自刎した。',
      history:'遼西令支の人。魏書公孫瓚伝によれば劉備とともに盧植に師事。白馬の精鋭騎兵で鮮卑・烏桓を震撼させたが、袁紹に追い詰められ建安四年に自刎。'
    },
    voiceLine:'白馬義従、突撃！',
    look:{skin:'#f5d5b5',hair:'ponytail',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#616161'}
  },
  // 16: 袁術 (R)
  {
    id:16, name:'袁術', title:'偽帝', rarity:2, type:1, faction:3, chapter:2,
    atk:85, hp:900, def:70, spd:38,
    skill:{ name:'僭称の威', desc:'味方全体攻撃力12%UP(3ターン)', type:'buff', mult:1.12, target:'all_ally' },
    lore:{
      novel:'袁紹の異母弟。伝国の璽を手に入れて皇帝を僭称するが、天下から孤立し血を吐いて死んだ。蜂蜜水を求めて得られなかったという。',
      history:'汝南汝陽の人。魏書袁術伝によれば建安二年に帝号を僭称。陳寿は「奢淫放肆にして節操なし」と評す。裴松之注引『呉書』に最期に蜂蜜水を求めた逸話がある。'
    },
    voiceLine:'余こそが正統なる皇帝なり！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'goatee',gear:'crown',wpn:'fan',out:'#616161'}
  },

  // ===== Chapter 3: 群雄割拠 (192-199年) =====
  // 0: 劉備 (SSR)
  {
    id:0, name:'劉備', title:'漢中王', rarity:4, type:1, faction:0, chapter:3,
    atk:195, hp:1600, def:110, spd:50,
    skill:{ name:'仁徳の絆', desc:'味方全体HP15%回復+味方全体攻撃力10%UP(3ターン)', type:'heal', mult:1.5, target:'all_ally' },
    lore:{
      novel:'織り草履を売る身から身を起こし、関羽・張飛と義兄弟の契りを結んだ。流浪の果てに漢中王となり蜀漢の礎を築いた仁の人。',
      history:'涿郡涿県の人。陳寿『三国志』蜀書先主伝によれば前漢中山靖王劉勝の末裔を称した。曹操に「天下の英雄は、ただ使君と操のみ」と評された。'
    },
    voiceLine:'天下の民のため、我が剣を振るう',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#1a1a1a',beard:'goatee',gear:'crown',wpn:'dual_sword',out:'#c62828'}
  },
  // 1: 関羽 (SSR)
  {
    id:1, name:'関羽', title:'武聖', rarity:4, type:0, faction:0, chapter:3,
    atk:240, hp:1400, def:120, spd:48,
    skill:{ name:'青龍偃月斬', desc:'敵単体に攻撃力200%ダメージ', type:'damage', mult:2.0, target:'single' },
    lore:{
      novel:'青龍偃月刀を携え赤兎馬に跨る義の武人。温酒の間に華雄を斬り、千里を駆けて義兄の元へ帰った武聖。',
      history:'陳寿『三国志』蜀書関羽伝に「万人の敵」と評された。建安五年、曹操の客将として白馬の戦いで顔良を斬った。のち荊州で于禁を降して威震華夏。呂蒙の策に敗れ麦城に散った。'
    },
    voiceLine:'義に背く者、この青龍偃月刀が許さぬ',
    look:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:null,wpn:'guandao',out:'#2e7d32'}
  },
  // 2: 張飛 (SR)
  {
    id:2, name:'張飛', title:'燕人張飛', rarity:3, type:0, faction:0, chapter:3,
    atk:185, hp:1100, def:85, spd:55,
    skill:{ name:'蛇矛乱舞', desc:'敵全体に攻撃力120%ダメージ', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'長坂橋の上で一喝、曹操の百万の大軍を退けた豪傑。義兄・劉備のためならば死地にも飛び込む猛将。',
      history:'涿郡の人。陳寿『三国志』蜀書張飛伝によれば関羽とともに劉備に仕えた。長坂では二十騎で追撃を阻み、入蜀戦では厳顔を捕らえて心服させた知略も持つ。'
    },
    voiceLine:'俺様の蛇矛が唸るぜ！',
    look:{skin:'#5d4037',hair:'wild',hc:'#111',beard:'circle',gear:null,wpn:'snake_spear',out:'#37474f'}
  },
  // 4: 孫堅 (SR)
  {
    id:4, name:'孫堅', title:'江東の虎', rarity:3, type:0, faction:2, chapter:3,
    atk:170, hp:1050, def:90, spd:58,
    skill:{ name:'猛虎の咆哮', desc:'敵単体に攻撃力150%ダメージ+自身攻撃力15%UP(3ターン)', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'江東の虎と呼ばれた孫呉の祖。洛陽で伝国の璽を拾い、董卓討伐軍の先鋒として華雄を討った武勇の将。',
      history:'呉郡富春の人。陳寿『三国志』呉書孫破虜伝によれば黄巾の乱で功を立て長沙太守となった。董卓討伐では洛陽へ最初に入城した将の一人。初平三年、劉表攻めで戦死。'
    },
    voiceLine:'孫家の武名、此処に轟かせん',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'sword',out:'#2e7d32'}
  },
  // 13: 典韋 (SR)
  {
    id:13, name:'典韋', title:'古の悪来', rarity:3, type:0, faction:1, chapter:3,
    atk:190, hp:1050, def:88, spd:45,
    skill:{ name:'悪来の双戟', desc:'敵単体に攻撃力170%ダメージ', type:'damage', mult:1.7, target:'single' },
    lore:{
      novel:'曹操の親衛隊長として常に主君を守った忠臣。宛城の戦いで張繡の奇襲を受け、両手に戟を持ち門前で奮戦し、曹操を逃がして壮絶に散った。',
      history:'陳留己吾の人。魏書典韋伝によれば膂力絶倫にして曹操の親衛隊長を務めた。建安二年の宛城で「瞋目大罵して死す」。曹操はその死を聞いて慟哭した。'
    },
    voiceLine:'主の背中は、この双戟が守る',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'short',gear:'headband',wpn:'halberd',out:'#1565c0'}
  },
  // 15: 陳宮 (R)
  {
    id:15, name:'陳宮', title:'義に殉ずる軍師', rarity:2, type:1, faction:3, chapter:3,
    atk:95, hp:850, def:60, spd:48,
    skill:{ name:'命懸けの献策', desc:'敵全体防御30%DOWN(3ターン)+敵全体攻撃力10%DOWN(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'呂布に仕えた軍師。曹操に捕らえられた際「仁義を知る者は二君に仕えぬ」と降伏を拒絶し、従容として死に臨んだ。',
      history:'東郡の人。陳寿『三国志』魏書呂布伝によれば初め曹操に従ったが離反し、呂布を迎えて徐州を奪取。下邳落城後、曹操の再三の勧告を退け処刑された。'
    },
    voiceLine:'策はある。あとは…覚悟だけだ',
    look:{skin:'#f0c8a0',hair:'long',hc:'#333',beard:'goatee',gear:'scholar',wpn:'scroll',out:'#424242'}
  },
  // 17: 孫策 (SSR)
  {
    id:17, name:'孫策', title:'小覇王', rarity:4, type:0, faction:2, chapter:3,
    atk:230, hp:1350, def:100, spd:63,
    skill:{ name:'覇王の突進', desc:'敵2体に攻撃力150%ダメージ', type:'damage', mult:1.5, target:'multi' },
    lore:{
      novel:'父・孫堅の遺志を継ぎ、わずか数年で江東を平定した「小覇王」。項羽の再来と恐れられた武勇だが、二十六歳の若さで刺客に倒れた。',
      history:'呉郡富春の人。呉書孫討逆伝によればわずか千余の兵で江東を制覇。陳寿は「英気傑済、猛鋭冠世、覚えて項羽有り」と評す。建安五年、許貢の門客に暗殺された。'
    },
    voiceLine:'江東の地は、この覇王が切り拓く！',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:null,gear:'headband',wpn:'spear',out:'#2e7d32'}
  },
  // 68: 李典 (R) ★NEW★
  {
    id:68, name:'李典', title:'好学の将', rarity:2, type:1, faction:1, chapter:3,
    atk:100, hp:880, def:72, spd:44,
    skill:{ name:'私情なき共闘', desc:'味方全体防御20%UP(3ターン)+味方全体攻撃力10%UP(3ターン)', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'学問を好み儒者を敬った魏の知将。合肥の戦いでは不仲の張遼と私情を捨てて共闘し、孫権の大軍を退ける大勝に貢献した。',
      history:'山陽鉅野の人。魏書李典伝によれば好学にして儒者を尊重した。合肥の戦いで張遼・楽進と協力し孫権軍を撃退。三十六歳で早世した。'
    },
    voiceLine:'学問も武芸も、国のためにある',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 76: 曹操[若] (SSR) ★NEW★
  {
    id:76, name:'曹操[若]', title:'陳留の旗揚げ', rarity:4, type:1, faction:1, chapter:3,
    atk:185, hp:1350, def:110, spd:52,
    skill:{ name:'唯才是挙', desc:'味方全体攻撃力20%UP(3ターン)+味方全体HP8%回復', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'宦官の家系に生まれながら乱世に名乗りを上げた若き曹孟徳。陳留で挙兵し、兗州を拠点に呂布・袁術と戦いながら群雄の中を駆け上がる。',
      history:'沛国譙の人。魏書武帝紀によれば黄巾討伐で騎都尉に任ぜられた後、陳留で挙兵。兗州牧となるも呂布の侵攻で本拠を失いかけ、荀彧・程昱の助けで三城を死守した。'
    },
    voiceLine:'天下に名を示す時が来た',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'headband',wpn:'sword',out:'#1565c0'}
  },

  // ===== Chapter 4: 官渡の戦い (200-207年) =====
  // 3: 曹操 (UR)
  {
    id:3, name:'曹操', title:'唯才是挙', rarity:5, type:1, faction:1, chapter:4,
    atk:260, hp:2000, def:140, spd:55,
    skill:{ name:'唯才是挙', desc:'味方全体攻撃力40%UP+防御20%UP(3ターン)+味方全体HP20%回復', type:'buff', mult:1.4, target:'all_ally' },
    lore:{
      novel:'「乱世の奸雄」と評された曹孟徳。唯才是挙——才さえあれば身分を問わず登用する革新的人材観で中原を制覇した。短歌行に「対酒当歌、人生幾何」と詠い、詩文にも比類なき才を示した。',
      history:'陳寿は曹操を「非常の人、超世の傑」と記した（魏書武帝紀）。官渡の戦いでは袁紹の十万に対し一万弱で勝利。建安年間に求賢令を三度出し、門閥にとらわれない人材登用を推し進めた。'
    },
    voiceLine:'天下の才を用いる者が、天下を治める',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },
  // 12: 夏侯惇 (SR/守)
  {
    id:12, name:'夏侯惇', title:'隻眼の猛将', rarity:3, type:3, faction:1, chapter:4,
    atk:155, hp:1365, def:133, spd:42,
    skill:{ name:'隻眼の怒り', desc:'味方全体防御25%UP(3ターン)+味方全体HP10%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'曹操の従兄弟にして最も信頼された将。呂布軍との戦いで流矢に左目を射抜かれても戦い続けた隻眼の猛将。蝗害の際は自ら鋤を取り、軍民の飢えを救った清廉の人。',
      history:'沛国譙県の人。曹操の挙兵以来の最古参で、諸将の中で唯一、曹操の車に同乗し寝室に入ることを許された（魏書夏侯惇伝）。陳寿は「清廉にして余財を蓄えず」と記す。'
    },
    voiceLine:'この眼を失ってなお、敵を見据えられる',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 14: 許褚 (SSR/武) ★NEW★
  {
    id:14, name:'許褚', title:'虎痴', rarity:4, type:0, faction:1, chapter:4,
    atk:270, hp:1680, def:105, spd:48,
    skill:{ name:'裸衣闘', desc:'敵単体に攻撃力220%ダメージ+敵単体防御20%DOWN(3ターン)', type:'damage', mult:2.2, target:'single' },
    lore:{
      novel:'「虎痴」と恐れられた曹操の近衛隊長。潼関の戦いでは上半身裸で馬超と渡り合い、その凄まじい威圧に馬超は「虎侯がいたか」と引き下がった。',
      history:'譙国譙の人、字は仲康。膂力絶倫で曹操の虎士を務めた（魏書許褚伝）。潼関の会見では許褚が背後に立ちにらみを利かせ、馬超は手を出せなかった。陳寿は「性格が忠謹にして、曹操の信頼は群臣に冠す」と評す。'
    },
    voiceLine:'主の背後に、この虎がいる限り',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:'short',gear:'headband',wpn:'mace',out:'#1565c0'}
  },
  // 27: 張郃 (SR/速) ★NEW★
  {
    id:27, name:'張郃', title:'巧変の将', rarity:3, type:2, faction:1, chapter:4,
    atk:180, hp:1000, def:82, spd:70,
    skill:{ name:'巧変迎撃', desc:'敵2体に攻撃力130%ダメージ+敵全体攻撃力10%DOWN(3ターン)', type:'damage', mult:1.3, target:'multi' },
    lore:{
      novel:'袁紹から曹操に降り、巧みな用兵で数々の戦場を駆け抜けた名将。街亭の戦いでは馬謖を撃破し、蜀の第一次北伐を頓挫させた。木門で蜀軍の伏兵に当たり壮絶に散った。',
      history:'河間鄚の人、字は儁乂。街亭の戦いで馬謖を破ったのは張郃であり、演義で司馬懿に差し替えられている（魏書張郃伝）。太和五年、木門で戦死。陳寿は「巧変を以て称され、戦場の機宜に長ず」と評す。'
    },
    voiceLine:'地形を読み、機を察す。それが儁乂の戦い方だ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 28: 郭嘉 (SSR)
  {
    id:28, name:'郭嘉', title:'鬼才', rarity:4, type:1, faction:1, chapter:4,
    atk:200, hp:1300, def:90, spd:56,
    skill:{ name:'十勝十敗論', desc:'敵全体に攻撃力120%ダメージ+敵全体攻撃力15%DOWN(3ターン)', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'曹操が最も信頼した若き天才軍師。「十勝十敗論」で官渡の大勝を導き、烏丸征伐では千里の遠征を成功させた。赤壁前夜に夭折し、曹操は「奉孝あらば此の窮地に至らざりしものを」と嘆いた。',
      history:'穎川陽翟の人。荀彧の推薦で曹操に仕えた（魏書郭嘉伝）。官渡の戦い・烏丸征伐で的確な献策を行う。建安十二年、三十八歳で病没。陳寿は「才策謀略、世の奇士なり」と評す。'
    },
    voiceLine:'十の勝因と十の敗因、お聞かせしましょう',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:null,wpn:'fan',out:'#1565c0'}
  },
  // 29: 荀彧 (SR)
  {
    id:29, name:'荀彧', title:'王佐の才', rarity:3, type:1, faction:1, chapter:4,
    atk:150, hp:1200, def:95, spd:48,
    skill:{ name:'王佐の策', desc:'味方全体攻撃力15%UP+防御15%UP(3ターン)', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'曹操の覇業を支えた最高参謀。郭嘉・荀攸・陳群ら多くの人材を推薦し、内政を整えた「王佐の才」。しかし曹操の魏公就任に反対し、空の食器を贈られて自決した。',
      history:'穎川穎陰の人。曹操に「吾の子房なり」と評された（魏書荀彧伝）。建安十七年、曹操の魏公就任と九錫授与に反対。裴松之注引『魏氏春秋』は空の箱を見て服毒自殺したとする。'
    },
    voiceLine:'人材こそが天下の礎です',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'goatee',gear:null,wpn:'scroll',out:'#1565c0'}
  },
  // 31: 顔良 (R)
  {
    id:31, name:'顔良', title:'河北の猛将', rarity:2, type:0, faction:3, chapter:4,
    atk:130, hp:900, def:60, spd:40,
    skill:{ name:'猛撃', desc:'敵単体に攻撃力140%ダメージ', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'袁紹配下の猛将。白馬の戦いで曹操軍を圧倒するも、関羽の一刀のもとに斬られた。その最期は関羽の武名を天下に轟かせることとなった。',
      history:'白馬の戦いで陣頭に立ち、関羽に万軍の中から刺された。「羽、良を刺して其の首を斬り、紹の諸将、能く当たる者莫し」と蜀書関羽伝に記される。'
    },
    voiceLine:'河北一の武勇、見せてやる！',
    look:{skin:'#d4a574',hair:'short',hc:'#111',beard:'circle',gear:'helmet',wpn:'halberd',out:'#616161'}
  },
  // 32: 文醜 (R)
  {
    id:32, name:'文醜', title:'河北の豪傑', rarity:2, type:0, faction:3, chapter:4,
    atk:125, hp:870, def:58, spd:42,
    skill:{ name:'豪撃', desc:'敵単体に攻撃力135%ダメージ', type:'damage', mult:1.35, target:'single' },
    lore:{
      novel:'顔良と並び称される袁紹配下の双璧。延津の戦いで曹操軍を追撃するも、曹操の釣り野伏せに掛かり戦死した。',
      history:'正史では文醜を討ったのが誰かは明記されていない。曹操が輜重を放棄して敵兵を誘い、混乱に乗じて撃破したと魏書武帝紀に記される。'
    },
    voiceLine:'顔良の仇、討たせてもらう！',
    look:{skin:'#c9956b',hair:'wild',hc:'#111',beard:'short',gear:'helmet',wpn:'axe',out:'#616161'}
  },
  // 56: 荀攸 (R)
  {
    id:56, name:'荀攸', title:'謀の達人', rarity:2, type:1, faction:1, chapter:4,
    atk:100, hp:850, def:65, spd:48,
    skill:{ name:'密計', desc:'敵単体攻撃力20%DOWN+防御15%DOWN(3ターン)', type:'debuff', mult:1.0, target:'single' },
    lore:{
      novel:'荀彧の甥にして曹操の軍師。十二の奇策を献じ、官渡の勝利に貢献した。表舞台には出ず、裏方で曹操の覇業を支えた策士中の策士。',
      history:'穎川穎陰の人。荀彧の甥。官渡の戦いで烏巣奇襲を進言し勝利を導いた（魏書荀攸伝）。陳寿は「荀攸は深密にして、外観では才略の有無を窺い知ることができない」と記す。'
    },
    voiceLine:'十二の策、お望みのものをどうぞ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:null,wpn:'scroll',out:'#1565c0'}
  },
  // 57: 程昱 (R/守)
  {
    id:57, name:'程昱', title:'剛毅の参謀', rarity:2, type:3, faction:1, chapter:4,
    atk:85, hp:975, def:91, spd:38,
    skill:{ name:'鉄壁の守り', desc:'味方全体防御25%UP(3ターン)+味方全体HP8%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'曹操の古参の参謀。呂布が兗州を奪った際、鄄城・范・東阿の三城を死守して曹操の帰還を可能にした。官渡では荀彧とともに許都を守り、曹操の後方を盤石とした。',
      history:'東郡東阿の人。黄巾の乱の頃から曹操に仕え、三城防衛がなければ曹操は本拠を失っていた（魏書程昱伝）。陳寿は「程昱・郭嘉は才策に優れ、世の奇士なり」と評す。'
    },
    voiceLine:'守りを固めてこそ、攻めが活きる',
    look:{skin:'#c9956b',hair:'shaved',hc:'#555',beard:'goatee',gear:null,wpn:'scroll',out:'#1565c0'}
  },
  // 69: 楽進 (R/武) ★NEW★
  {
    id:69, name:'楽進', title:'先登一番', rarity:2, type:0, faction:1, chapter:4,
    atk:130, hp:864, def:55, spd:42,
    skill:{ name:'先登突撃', desc:'敵単体に攻撃力150%ダメージ', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'小柄ながら勇猛果敢、常に先陣を切って敵に突入した。官渡の戦いでは先登の功を立て、合肥では張遼・李典とともに孫権の十万を撃退した五子良将の一人。',
      history:'陽平衛国の人、字は文謙。体は小柄だが先登一番の勇で知られた（魏書楽進伝）。官渡・合肥で活躍。陳寿は「楽進は以て胆烈を称す」と評す。'
    },
    voiceLine:'先陣は俺が切る。続け！',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:null,gear:'helmet',wpn:'sword',out:'#1565c0'}
  },

  // ===== Chapter 5: 赤壁の戦い (208年) =====
  // 21: 周瑜 (UR)
  {
    id:21, name:'周瑜', title:'赤壁之焔', rarity:5, type:1, faction:2, chapter:5,
    atk:270, hp:1800, def:110, spd:65,
    skill:{ name:'赤壁之焔', desc:'敵全体に攻撃力250%ダメージ+敵全体防御40%DOWN(3ターン)', type:'damage', mult:2.5, target:'all_enemy' },
    lore:{
      novel:'容姿端麗にして音楽に通じ「曲に誤りあれば周郎は顧みる」と讃えられた天才。赤壁の戦いの真の英雄であり、黄蓋の火攻めを採用して曹操の大軍を壊滅させた。演義と異なり、諸葛亮への嫉妬は正史に一切記述がない。',
      history:'廬江舒の人、字は公瑾。孫策とは総角の交わり（呉書周瑜伝）。赤壁の実質的総指揮官として曹操を撃退した。程普は「周公瑾と交わるは芳醪を飲むが如し」と度量の広さを讃えた。建安十五年、三十六歳で病没。'
    },
    voiceLine:'北方の兵は水戦に慣れぬ。勝機は我にあり',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:null,wpn:'sword',out:'#2e7d32'}
  },
  // 22: 魯粛 (SR)
  {
    id:22, name:'魯粛', title:'呉の柱石', rarity:3, type:1, faction:2, chapter:5,
    atk:140, hp:1200, def:95, spd:45,
    skill:{ name:'天下三分の策', desc:'味方全体HP15%回復+味方全体防御15%UP(3ターン)', type:'heal', mult:1.15, target:'all_ally' },
    lore:{
      novel:'孫権に「天下三分」の大戦略を最初に献策した呉の戦略家。赤壁では劉備との同盟を取りまとめ、三国鼎立の礎を築いた。単刀赴会では関羽を論理で問い詰めた知の巨人。',
      history:'臨淮東城の人、字は子敬。周瑜の推薦で孫権に仕え、天下三分を進言（呉書魯粛伝）。赤壁では「群臣は降伏しても問題ないが主公だけは降伏できない」と説き、開戦を決断させた。'
    },
    voiceLine:'争うだけが戦ではありませぬ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:null,wpn:'scroll',out:'#2e7d32'}
  },
  // 25: 甘寧 (SR)
  {
    id:25, name:'甘寧', title:'錦帆賊', rarity:3, type:0, faction:2, chapter:5,
    atk:200, hp:1200, def:82, spd:50,
    skill:{ name:'百騎夜襲', desc:'敵単体に攻撃力180%ダメージ', type:'damage', mult:1.8, target:'single' },
    lore:{
      novel:'若き日は長江の水賊「錦帆賊」の頭目。帆に鈴をつけた船で暴れ回った豪傑が、孫権に仕えて名将となった。百騎で曹操の陣を夜襲し、一兵も失わなかった勇猛は伝説。',
      history:'巴郡臨江の人、字は興覇。濡須口の戦いで百余騎による曹操陣夜襲を敢行し、一兵も失わなかった（呉書甘寧伝）。孫権に「孟徳に張遼あれば、孤には甘興覇あり」と讃えられた。'
    },
    voiceLine:'錦帆の風に乗って、敵陣を駆け抜ける！',
    look:{skin:'#d4a574',hair:'wild',hc:'#111',beard:null,gear:'headband',wpn:'sword',out:'#2e7d32'}
  },
  // 37: 黄蓋 (R)
  {
    id:37, name:'黄蓋', title:'苦肉の策', rarity:2, type:0, faction:2, chapter:5,
    atk:135, hp:950, def:62, spd:38,
    skill:{ name:'火攻突入', desc:'敵全体に攻撃力160%ダメージ', type:'damage', mult:1.6, target:'all_enemy' },
    lore:{
      novel:'赤壁の戦いで周瑜とともに火攻めを献策し、自ら火船で曹操の船団に突入した老将。孫堅・孫策・孫権の三代に仕え、その忠義は揺るがなかった。',
      history:'零陵泉陵の人、字は公覆。孫堅の挙兵から従った三代の古参（呉書黄蓋伝）。赤壁では「敵船は互いに繋がれている、火を以て攻めるべし」と献策し、自ら火船で突入した。'
    },
    voiceLine:'この老骨、主のために燃やそう',
    look:{skin:'#c9956b',hair:'shaved',hc:'#555',beard:'short',gear:null,wpn:'sword',out:'#2e7d32'}
  },
  // 40: 周泰 (R) ★NEW★
  {
    id:40, name:'周泰', title:'孫権の盾', rarity:2, type:0, faction:2, chapter:5,
    atk:135, hp:900, def:65, spd:40,
    skill:{ name:'十二の傷', desc:'敵単体に攻撃力140%ダメージ+味方全体防御10%UP(3ターン)', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'全身に十二箇所の傷を負いながら、ただ一心に孫権を守り続けた猛将。宴席で孫権が傷の一つ一つを指差して由来を尋ね、周泰が答えるたびに酒を飲ませた。一座は涙を流した。',
      history:'下蔡の人、字は幼平。孫権を命がけで守った護衛将で、全身に十二の傷跡があった（呉書周泰伝）。孫権が宴で傷を一つ一つ語らせた逸話は正史に記される。'
    },
    voiceLine:'この傷の一つ一つが、主への忠誠の証',
    look:{skin:'#d4a574',hair:'short',hc:'#111',beard:null,gear:'headband',wpn:'sword',out:'#2e7d32'}
  },
  // 41: 蔡文姫 (N)
  {
    id:41, name:'蔡文姫', title:'胡笳の才女', rarity:1, type:1, faction:3, chapter:5,
    atk:48, hp:680, def:45, spd:45,
    skill:{ name:'胡笳十八拍', desc:'味方全体HP15%回復', type:'heal', mult:1.15, target:'all_ally' },
    lore:{
      novel:'蔡邕の娘にして漢末随一の才媛。匈奴に拉致され十二年、胡笳の音に故国への想いを込めた「胡笳十八拍」は涙なしには聞けぬ悲歌。',
      history:'陳留圉の人。蔡邕の娘。董卓滅亡後の混乱で南匈奴に掠われ左賢王の妻となった。曹操が金璧で身請けし、帰国後は父・蔡邕の蔵書四百余篇を暗記から復元した。'
    },
    voiceLine:'胡笳の音色に、故郷への想いを乗せて…',
    look:{skin:'#fce4ec',hair:'flowing',hc:'#333',beard:null,gear:'hairpin',wpn:null,out:'#9c27b0',fem:true}
  },
  // 74: 程普 (R) ★NEW★
  {
    id:74, name:'程普', title:'孫家最古参', rarity:2, type:0, faction:2, chapter:5,
    atk:130, hp:880, def:60, spd:42,
    skill:{ name:'古参の鉄槍', desc:'敵単体に攻撃力135%ダメージ+味方全体攻撃力8%UP(3ターン)', type:'damage', mult:1.35, target:'single' },
    lore:{
      novel:'孫堅の挙兵から従った孫家最古参の将。赤壁では周瑜の副将として指揮を執った。当初は若き周瑜を侮っていたが、その度量の広さに感服し「周公瑾と交わるは芳醪を飲むが如し」と讃えた。',
      history:'右北平土垠の人、字は徳謀。孫堅・孫策・孫権の三代に仕えた最古参（呉書程普伝）。赤壁では周瑜とともに指揮を執り、周瑜の器量に感服した逸話が陳寿の評に引用されている。'
    },
    voiceLine:'周公瑾と交わるは、芳醪を飲むが如し',
    look:{skin:'#c9956b',hair:'shaved',hc:'#555',beard:'short',gear:'helmet',wpn:'spear',out:'#2e7d32'}
  },

  // ===== Chapter 6: 益州攻略 (209-214年) =====
  // 20: 趙雲 (SSR)
  {
    id:20, name:'趙雲', title:'常山の龍', rarity:4, type:2, faction:0, chapter:6,
    atk:225, hp:1450, def:115, spd:62,
    skill:{ name:'龍胆一閃', desc:'敵単体に攻撃力200%ダメージ+味方全体HP10%回復', type:'damage', mult:2.0, target:'single' },
    lore:{
      novel:'長坂の戦いで幼き劉禅を胸に抱き、曹操の大軍を単騎で突破した「常山の龍」。箕谷の撤退では殿軍を務め、軍資を一切失わなかった。劉備は「子龍は一身これ胆なり」と讃えた。',
      history:'常山真定の人、字は子龍。長坂で劉備の妻子を救出した（蜀書趙雲伝）。裴松之注引『趙雲別伝』では「霍去病は匈奴未だ滅せずして家を顧みず」と益州の田宅分配に反対した。'
    },
    voiceLine:'主の御子は、この趙子龍が守る！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#90a4ae'}
  },
  // 24: 太史慈 (R)
  {
    id:24, name:'太史慈', title:'義の弓豪', rarity:2, type:2, faction:2, chapter:6,
    atk:125, hp:850, def:62, spd:58,
    skill:{ name:'精密射撃', desc:'敵単体に攻撃力145%ダメージ', type:'damage', mult:1.45, target:'single' },
    lore:{
      novel:'弓の名手にして義に厚い武将。孫策と一騎打ちを演じ、その武勇に惚れ込んだ孫策に迎え入れられた。死に際し「大丈夫、七尺の剣を帯びて天子の階に登るべし」と嘆いた。',
      history:'東莱黄県の人、字は子義。孫策との一騎打ちは正史にも記録がある（呉書太史慈伝）。城壁上の兵の手を射つけた弓の精度も記される。建安十一年頃、四十一歳で病没。'
    },
    voiceLine:'大丈夫、七尺の剣を帯びて天子の階に登るべし',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:null,gear:'headband',wpn:'bow',out:'#2e7d32'}
  },
  // 33: 馬超 (SR)
  {
    id:33, name:'馬超', title:'錦馬超', rarity:3, type:0, faction:0, chapter:6,
    atk:200, hp:1100, def:78, spd:55,
    skill:{ name:'西涼の疾風', desc:'敵単体に攻撃力180%ダメージ', type:'damage', mult:1.8, target:'single' },
    lore:{
      novel:'西涼の勇将、錦馬超。潼関の戦いで曹操を追い詰め、「馬児死なずんば吾に葬地無し」と嘆かせた。許褚と裸で対峙した一騎打ちは三国志屈指の名場面。',
      history:'扶風茂陵の人、字は孟起。建安十六年、韓遂と十万の兵で曹操に反旗を翻した（蜀書馬超伝）。蜀に帰順後は驃騎将軍に任じられたが、陳寿は「英雄の器に非ず」と厳しく評す。'
    },
    voiceLine:'西涼の風は、誰にも止められぬ！',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#c62828'}
  },
  // 34: 龐統 (SR)
  {
    id:34, name:'龐統', title:'鳳雛', rarity:3, type:1, faction:0, chapter:6,
    atk:165, hp:1100, def:88, spd:50,
    skill:{ name:'上中下三策', desc:'敵全体防御20%DOWN(3ターン)+味方全体攻撃力15%UP(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'「臥龍と鳳雛、どちらかを得れば天下を取れる」と水鏡先生に評された天才軍師。益州攻略に際し上中下三策を劉備に提示した。雒城攻めの最中に流れ矢で三十六歳にして散った。',
      history:'襄陽の人、字は士元。司馬徽に「南州の士人の冠冕たり」と評された（蜀書龐統伝）。益州攻略で上中下三策を献じ劉備は中策を採用。陳寿は「軍略の才においても秀でていた」と評す。'
    },
    voiceLine:'上策・中策・下策、いずれをお選びになりますか',
    look:{skin:'#c9956b',hair:'short',hc:'#333',beard:'goatee',gear:null,wpn:'fan',out:'#c62828'}
  },
  // 35: 黄権 (N)
  {
    id:35, name:'黄権', title:'忠義の臣', rarity:1, type:1, faction:0, chapter:6,
    atk:55, hp:680, def:55, spd:42,
    skill:{ name:'忠言の盾', desc:'味方全体防御15%UP(3ターン)+味方全体HP5%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'劉備の益州入りに反対するも、帰順後は忠実に仕えた。夷陵の戦いで退路を断たれやむなく魏に降るが、劉備は「黄権が孤に背いたのではない。孤が黄権に背いたのだ」と庇った。',
      history:'巴西閬中の人。劉璋配下から劉備に帰順し、夷陵では江北軍を率いた。退路を断たれ魏に降ったが、劉備は黄権の家族を罰さなかった（蜀書黄権伝）。陳寿はその清廉と忠節を評す。'
    },
    voiceLine:'たとえ降将と呼ばれようと、この心は変わらぬ',
    look:{skin:'#c9956b',hair:'topknot',hc:'#444',beard:'short',gear:null,wpn:'scroll',out:'#c62828'}
  },
  // 42: 孫尚香 (R)
  {
    id:42, name:'孫尚香', title:'弓腰姫', rarity:2, type:2, faction:0, chapter:6,
    atk:120, hp:860, def:62, spd:60,
    skill:{ name:'弓腰姫の奮迅', desc:'敵単体に攻撃力150%ダメージ+攻撃力15%UP(3ターン)', type:'damage', mult:1.5, target:'single' },
    lore:{
      novel:'孫権の妹にして劉備の妻。武芸を好み侍女にも武装させた勝ち気な姫。政略結婚ながらも豪胆な気性で劉備を圧倒した。',
      history:'正史に個人名は記されず「孫夫人」とのみある。建安十四年頃に劉備に嫁いだ。侍女に武器を持たせ劉備を恐れさせたと裴松之注引『法正伝注』に見える。'
    },
    voiceLine:'弓腰姫と呼ぶがよい！',
    look:{skin:'#fce4ec',hair:'ponytail',hc:'#222',beard:null,gear:'headband',wpn:'bow',out:'#c62828',fem:true}
  },

  // ===== Chapter 7: 漢中争奪 (215-219年) =====
  // 36: 諸葛亮 (UR)
  {
    id:36, name:'諸葛亮', title:'臥龍', rarity:5, type:1, faction:0, chapter:7,
    atk:250, hp:1800, def:120, spd:60,
    skill:{ name:'出師の表', desc:'味方全体攻撃力30%UP+敵全体攻撃力25%DOWN(3ターン)+味方全体HP15%回復', type:'buff', mult:1.3, target:'all_ally' },
    lore:{
      novel:'「鞠躬尽瘁、死して後已む」。三顧の礼に応えて劉備に仕え、天下三分の計を実現した蜀漢の丞相。五度の北伐を敢行し、五丈原に散った。',
      history:'陳寿『三国志』蜀書諸葛亮伝によれば、琅邪陽都の人。隆中対で天下三分を提唱し、赤壁では孫劉同盟を成立させた。出師表は中国文学史上屈指の名文とされる。'
    },
    voiceLine:'鞠躬尽瘁、死して後已む',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:'goatee',gear:'cloth_hat',wpn:'fan',out:'#c62828'}
  },
  // 43: 魏延 (SR)
  {
    id:43, name:'魏延', title:'漢中太守', rarity:3, type:0, faction:0, chapter:7,
    atk:180, hp:1100, def:82, spd:55,
    skill:{ name:'子午谷の奇策', desc:'敵単体に攻撃力160%ダメージ+自身攻撃力15%UP(3ターン)', type:'damage', mult:1.6, target:'single' },
    lore:{
      novel:'劉備に見出され漢中太守に大抜擢された蜀漢の主力将軍。子午谷の奇策を献じるも退けられ、諸葛亮の死後は楊儀との権力闘争に敗れた。',
      history:'蜀書魏延伝によれば、義陽の人。漢中太守に抜擢された際「曹操が来れば大王のために防ぐ」と宣言した。正史には「反骨の相」の記載はなく、楊儀との対立で殺された。'
    },
    voiceLine:'俺の策なら、長安は落とせた',
    look:{skin:'#d4a574',hair:'wild',hc:'#222',beard:'short',gear:'headband',wpn:'sword',out:'#c62828'}
  },
  // 45: 黄忠 (SR)
  {
    id:45, name:'黄忠', title:'老将', rarity:3, type:0, faction:0, chapter:7,
    atk:189, hp:1140, def:85, spd:45,
    skill:{ name:'百歩穿楊', desc:'敵単体に攻撃力175%ダメージ', type:'damage', mult:1.75, target:'single' },
    lore:{
      novel:'六十を過ぎてなお衰えぬ弓の名手。定軍山で夏侯淵を討ち取り、五虎将軍の名に恥じぬ武功を立てた老将軍。',
      history:'蜀書黄忠伝によれば、南陽の人。「推鋒必進、金鼓振天」と記され、定軍山で士卒を奮い立たせ一気に夏侯淵を討ち取った。関羽は同格任命に不満を示したと伝わる。'
    },
    voiceLine:'老いてなお、この弓は衰えぬ',
    look:{skin:'#d4a574',hair:'short',hc:'#aaa',beard:'long',gear:'headband',wpn:'bow',out:'#c62828'}
  },
  // 46: 法正 (SR)
  {
    id:46, name:'法正', title:'蜀の軍師', rarity:3, type:1, faction:0, chapter:7,
    atk:158, hp:1100, def:85, spd:50,
    skill:{ name:'反間の計', desc:'敵単体に攻撃力120%ダメージ+敵全体防御20%DOWN(3ターン)', type:'damage', mult:1.2, target:'single' },
    lore:{
      novel:'劉備の入蜀を内から画策し、漢中攻略では定軍山の地形を読んで黄忠に突撃の好機を指示した蜀漢屈指の策士。',
      history:'蜀書法正伝によれば、扶風郿の人。定軍山では高所から夏侯淵の動きを観察し、黄忠に攻撃時機を伝えた。法正の死を劉備は数日間慟哭したと記される。'
    },
    voiceLine:'勝機は敵の油断の中にある',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'cloth_hat',wpn:'scroll',out:'#c62828'}
  },
  // 49: 厳顔 (R)
  {
    id:49, name:'厳顔', title:'断頭将軍', rarity:2, type:0, faction:0, chapter:7,
    atk:125, hp:950, def:80, spd:40,
    skill:{ name:'老将の意地', desc:'敵単体に攻撃力140%ダメージ+自身防御15%UP(3ターン)', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'張飛に捕らえられ「なぜ降伏せぬ」と問われ「我が州には断頭将軍はいても降将軍はおらぬ」と答えた気骨の老将。その胆力に張飛が心服した。',
      history:'蜀書張飛伝の記述によれば、巴郡太守の厳顔は張飛に捕らわれた際に屈せず、その態度に張飛が敬意を表して縛を解いた。以後の消息は正史に記録がない。'
    },
    voiceLine:'断頭将軍はいても、降将軍はおらぬ',
    look:{skin:'#d4a574',hair:'short',hc:'#999',beard:'long',gear:null,wpn:'axe',out:'#c62828'}
  },
  // 55: 夏侯淵 (SR)
  {
    id:55, name:'夏侯淵', title:'疾風の将', rarity:3, type:2, faction:1, chapter:7,
    atk:175, hp:1050, def:80, spd:65,
    skill:{ name:'急襲', desc:'敵単体に攻撃力155%ダメージ', type:'damage', mult:1.55, target:'single' },
    lore:{
      novel:'三日で五百里を駆ける電撃戦の名将。西涼の異民族を次々と平定したが、定軍山で黄忠の急襲に遭い壮絶に散った。',
      history:'魏書夏侯淵伝によれば、沛国譙県の人。「三日五百、六日一千」と伝えられた行軍速度で知られる。曹操は「勇猛なだけでは匹夫に過ぎない」と常々戒めていた。'
    },
    voiceLine:'速さこそ兵法の極意よ',
    look:{skin:'#f0c8a0',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'spear',out:'#1565c0'}
  },

  // ===== Chapter 8: 荊州の落日 (219-220年) =====
  // 23: 張遼 (UR)
  {
    id:23, name:'張遼', title:'威震逍遥津', rarity:5, type:2, faction:1, chapter:8,
    atk:320, hp:2000, def:140, spd:75,
    skill:{ name:'遼来来', desc:'敵単体に攻撃力300%ダメージ+自身攻撃力20%UP(3ターン)', type:'damage', mult:3.0, target:'single' },
    lore:{
      novel:'合肥でわずか八百の決死隊を率いて孫権の十万を急襲。「遼来来！」の喊声に呉兵は震え上がり、小児の夜泣きすら止んだという「張遼止啼」の伝説を生んだ。',
      history:'魏書張遼伝によれば、雁門馬邑の人。合肥の戦いでは孫権の麾下にまで突入し、大将を斬り数十人を殺した。曹操は「周亞夫の風あり」に比して称えたと伝わる。'
    },
    voiceLine:'遼来来！退く者は斬る！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'halberd',out:'#1565c0'}
  },
  // 19: 徐晃 (SSR) ★NEW★
  {
    id:19, name:'徐晃', title:'周亞夫の風', rarity:4, type:0, faction:1, chapter:8,
    atk:230, hp:1400, def:105, spd:48,
    skill:{ name:'深溝高塁', desc:'敵単体に攻撃力180%ダメージ+自身防御20%UP(3ターン)', type:'damage', mult:1.8, target:'single' },
    lore:{
      novel:'樊城の戦いで援軍を率い、関羽の包囲網を突破して曹仁を救援した堅実なる名将。曹操に「周亞夫の風あり」と讃えられた五子良将の一人。',
      history:'魏書徐晃伝によれば、河東楊の人、字は公明。楊奉の配下から曹操に帰順。陳寿は「常に深溝高塁を以て自ら守り、然る後に戦いて勝つ」と記す。五子良将の中で最も堅実。'
    },
    voiceLine:'深溝高塁、然る後に撃つ',
    look:{skin:'#e8b88a',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'axe',out:'#1565c0'}
  },
  // 26: 孫権 (SR)
  {
    id:26, name:'孫権', title:'呉大帝', rarity:3, type:1, faction:2, chapter:8,
    atk:155, hp:1250, def:98, spd:48,
    skill:{ name:'呉の結束', desc:'味方全体攻撃力15%UP+味方全体HP10%回復', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'父・孫堅の遺志と兄・孫策の覇業を継ぎ、赤壁で曹操を退け、荊州を奪って呉の版図を最大にした守成の名君。',
      history:'呉書呉主伝によれば、呉郡富春の人。曹操は「生子当に孫仲謀の如くなるべし」と賛辞を贈った。赤壁の開戦決断と夷陵の勝利で三国鼎立を確立した。'
    },
    voiceLine:'江東は我が守る。父兄の遺志のために',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'goatee',gear:'crown',wpn:'sword',out:'#2e7d32'}
  },
  // 30: 賈詡 (SSR)
  {
    id:30, name:'賈詡', title:'毒士', rarity:4, type:1, faction:3, chapter:8,
    atk:195, hp:1350, def:110, spd:52,
    skill:{ name:'毒士の計', desc:'敵全体攻撃力25%DOWN+敵全体防御20%DOWN(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'董卓、李傕、張繍、曹操と主を変えながら全ての局面で的確な献策を繰り出し、生き延びた乱世最高の策士。その毒計は味方すら震え上がらせた。',
      history:'魏書賈詡伝によれば、武威姑臧の人。張繍に曹操への反撃を勧め典韋と曹昂を死に追いやった。後に曹丕の後継決定に際し、袁紹と劉表を引き合いに出して嫡子相続を暗に勧めた。'
    },
    voiceLine:'策を語らず、結果を出す。それが毒士の流儀',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#444',beard:'goatee',gear:'cloth_hat',wpn:'scroll',out:'#616161'}
  },
  // 38: 于禁 (SR/守) ★NEW★
  {
    id:38, name:'于禁', title:'五子良将筆頭', rarity:3, type:3, faction:1, chapter:8,
    atk:148, hp:1144, def:109, spd:40,
    skill:{ name:'軍令鉄則', desc:'味方全体防御25%UP(3ターン)+味方全体攻撃力10%UP(3ターン)', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'三十年以上にわたり魏軍の規律を支えた五子良将筆頭。しかし樊城で漢水の氾濫に七軍を失い関羽に降伏。一生の功績が一瞬で水泡に帰した悲劇の将。',
      history:'魏書于禁伝によれば、泰山鉅平の人、字は文則。軍紀の厳しさで知られたが、建安二十四年に降伏。帰還後、曹丕は降伏場面を描いた壁画を見せ、于禁は恥辱のうちに病死した。'
    },
    voiceLine:'軍令は鉄なり…この身もまた',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'short',gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 47: 呂蒙 (SSR)
  {
    id:47, name:'呂蒙', title:'呉下の阿蒙にあらず', rarity:4, type:1, faction:2, chapter:8,
    atk:200, hp:1400, def:105, spd:52,
    skill:{ name:'白衣渡江', desc:'敵単体に攻撃力180%ダメージ+敵全体防御20%DOWN(3ターン)', type:'damage', mult:1.8, target:'single' },
    lore:{
      novel:'兵を白い商人の衣に偽装させ荊州に渡り、関羽の留守部隊を無血開城させた知将。かつて「呉下の阿蒙」と嘲られた男が、三国の勢力図を塗り替えた。',
      history:'呉書呂蒙伝によれば、汝南富陂の人。孫権に勧められ学問を修め、魯粛に「刮目して相待つべし」と言わしめた。白衣渡江で荊州を奪取し関羽を追い詰めた。'
    },
    voiceLine:'もはや呉下の阿蒙ではない',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'sword',out:'#2e7d32'}
  },
  // 65: 曹仁 (SR/守)
  {
    id:65, name:'曹仁', title:'魏の壁', rarity:3, type:3, faction:1, chapter:8,
    atk:145, hp:1170, def:112, spd:38,
    skill:{ name:'鉄壁防衛', desc:'味方全体防御30%UP(3ターン)+味方全体HP10%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'江陵では周瑜の攻勢を一年以上凌ぎ、樊城では関羽の猛攻と漢水の氾濫に耐え抜いた。魏が誇る鉄壁の守護者。',
      history:'魏書曹仁伝によれば、沛国譙県の人、字は子孝。曹操の従弟。満寵が「退けば洛陽以南が失われる」と進言し、曹仁は樊城に留まり守り抜いた。陳寿の評は「武猛は一世に壮なり」。'
    },
    voiceLine:'この城は、一歩たりとも譲らぬ',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'mace',out:'#1565c0'}
  },

  // ===== Chapter 9: 夷陵の炎 (221-223年) =====
  // 39: 孟獲 (R)
  {
    id:39, name:'孟獲', title:'南蛮王', rarity:2, type:0, faction:3, chapter:9,
    atk:140, hp:1000, def:80, spd:42,
    skill:{ name:'南蛮王の力', desc:'敵単体に攻撃力140%ダメージ+自身防御15%UP(3ターン)', type:'damage', mult:1.4, target:'single' },
    lore:{
      novel:'南中の王として諸葛亮に七度捕らえられ七度放された末に心服した豪傑。その後は蜀漢に忠誠を誓い南方の安定に貢献した。',
      history:'正史『三国志』本文には孟獲の名は登場しない。七擒七縦の記録は『漢晋春秋』と『華陽国志』に見え、孟氏は南中四大姓の一つで漢人系の有力氏族であった。'
    },
    voiceLine:'この南蛮王、もう逃げぬ！',
    look:{skin:'#5d4037',hair:'wild',hc:'#111',beard:'circle',gear:'headband',wpn:'mace',out:'#616161'}
  },
  // 50: 曹丕 (SR)
  {
    id:50, name:'曹丕', title:'魏の初代皇帝', rarity:3, type:1, faction:1, chapter:9,
    atk:160, hp:1200, def:100, spd:50,
    skill:{ name:'禅譲の威', desc:'味方全体攻撃力15%UP+味方全体防御10%UP(3ターン)', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'漢の献帝から禅譲を受け、四百年続いた漢王朝を終わらせた魏の初代皇帝。文才にも優れ「文章は経国の大業なり」と説いた。',
      history:'魏書文帝紀によれば、沛国譙の人。延康元年に禅譲を受けて即位。弟・曹植への圧力は苛烈で、領地を転々とさせて監視した。司馬懿を顧命大臣に任じたことが司馬氏台頭の起点となった。'
    },
    voiceLine:'漢の天命は尽きた。これより魏の世ぞ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#1565c0'}
  },
  // 51: 陸遜 (SSR)
  {
    id:51, name:'陸遜', title:'呉の大都督', rarity:4, type:1, faction:2, chapter:9,
    atk:200, hp:1400, def:100, spd:52,
    skill:{ name:'夷陵の火計', desc:'敵全体に攻撃力140%ダメージ+敵全体防御15%DOWN(3ターン)', type:'damage', mult:1.4, target:'all_enemy' },
    lore:{
      novel:'若く無名であることを武器とし、関羽を油断させ、劉備の50以上の陣を火計で壊滅させた呉の天才軍師。しかし晩年は二宮の変に巻き込まれ憤死した。',
      history:'呉書陸遜伝によれば、呉郡呉県の人、字は伯言。夷陵では半年間守りを固めた後、火計で蜀軍を壊滅させた。孫権の信任厚かったが、二宮の変で繰り返し叱責を受け憤死。'
    },
    voiceLine:'兵は詐を以て立つ',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'cloth_hat',wpn:'fan',out:'#2e7d32'}
  },
  // 67: 馬良 (N)
  {
    id:67, name:'馬良', title:'白眉', rarity:1, type:1, faction:0, chapter:9,
    atk:55, hp:680, def:48, spd:46,
    skill:{ name:'白眉の知恵', desc:'味方全体攻撃力10%UP+味方全体HP5%回復', type:'buff', mult:1.1, target:'all_ally' },
    lore:{
      novel:'馬氏の五兄弟で最も優れた才を持ち「白眉最も良し」と謳われた文官。劉備の夷陵の戦いに従軍し、武陵蛮族との連絡役を務めたが、戦場に散った。',
      history:'蜀書馬良伝によれば、襄陽宜城の人、字は季常。眉に白毛があり「馬氏の五常、白眉最も良し」と称された。夷陵の敗戦で戦死。弟の馬謖は街亭で敗れた人物。'
    },
    voiceLine:'白眉の名に恥じぬ策を献じましょう',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'cloth_hat',wpn:'scroll',out:'#c62828'}
  },
  // 75: 曹植 (R) ★NEW★
  {
    id:75, name:'曹植', title:'七歩の詩人', rarity:2, type:1, faction:1, chapter:9,
    atk:95, hp:850, def:65, spd:45,
    skill:{ name:'七歩成詩', desc:'味方全体攻撃力15%UP(3ターン)+敵全体攻撃力10%DOWN(3ターン)', type:'buff', mult:1.15, target:'all_ally' },
    lore:{
      novel:'「天下の才十あらば八は子建」と謳われた曹操の息子にして三国随一の文人。七歩のうちに詩を成す天才だが、後継争いに敗れ不遇の生涯を送った。',
      history:'魏書陳思王伝によれば、沛国譙の人、字は子建。陳寿は「陳思の文才、世に比なし」と評す。代表作「洛神賦」は中国文学の至宝。曹丕に領地を転々とさせられ、失意のうちに没した。'
    },
    voiceLine:'七歩の内に詩を成す。それが曹子建だ',
    look:{skin:'#f0c8a0',hair:'long',hc:'#222',beard:null,gear:'crown',wpn:'scroll',out:'#1565c0'}
  },

  // ===== Chapter 10: 出師の表 (227-234年) =====
  // 52: 司馬懿 (UR/守)
  {
    id:52, name:'司馬懿', title:'高平陵', rarity:5, type:3, faction:1, chapter:10,
    atk:200, hp:2800, def:200, spd:50,
    skill:{ name:'狼顧の忍', desc:'味方全体防御40%UP(3ターン)+自身反撃200%', type:'counter', mult:2.0, target:'all_ally' },
    lore:{
      novel:'「内忌にして外寛」。五丈原で諸葛亮に女物の髪飾りを贈られても耐え忍び、高平陵の変では詐病で曹爽を欺いて一族皆殺しにした。殺せない壁、忍耐の化身。',
      history:'晋書宣帝紀に「帝内忌而外寛、猜忌多権変」と記される。曹操は「狼顧の相」を見抜き警戒したが、曹丕が庇い続けた。249年の高平陵の変で魏の実権を掌握し、晋王朝の礎を築いた。'
    },
    voiceLine:'急がぬことだ。天下は…待つ者のもの',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#555',beard:'goatee',gear:'crown_helm',wpn:'fan',out:'#0d47a1'}
  },
  // 48: 馬謖 (R)
  {
    id:48, name:'馬謖', title:'街亭の罪人', rarity:2, type:1, faction:0, chapter:10,
    atk:95, hp:750, def:50, spd:48,
    skill:{ name:'山上布陣', desc:'味方全体攻撃力35%UP(3ターン)+自身HP100%減', type:'buff', mult:1.35, target:'all_ally' },
    lore:{
      novel:'諸葛亮に才を認められるも、街亭で水辺を捨て山上に布陣する致命的判断を下した。副将・王平の諫言も聞かず大敗。「泣いて馬謖を斬る」の故事の主。',
      history:'正史では街亭で馬謖を破ったのは張郃であり司馬懿ではない。馬謖は諸葛亮の命に背き山上に陣取り、張郃に水路を断たれ壊滅。軍法により処刑された。'
    },
    voiceLine:'この山頂こそ天険…なぜ誰も分からぬ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'cloth_hat',wpn:'scroll',out:'#c62828'}
  },
  // 53: 姜維 (SSR)
  {
    id:53, name:'姜維', title:'蜀漢最後の希望', rarity:4, type:0, faction:0, chapter:10,
    atk:215, hp:1400, def:105, spd:58,
    skill:{ name:'北伐の誓い', desc:'敵全体に攻撃力140%ダメージ+自身攻撃力20%UP(3ターン)', type:'damage', mult:1.4, target:'all_enemy' },
    lore:{
      novel:'諸葛亮が「涼州の上士」と認め、後継者に指名した蜀漢最後の名将。北伐を十一回にわたり敢行し、蜀滅亡後もなお復興を企てた。蜀漢への忠誠に死ぬまで背かなかった。',
      history:'天水冀県の人。魏から蜀に降り、諸葛亮に重用された。北伐を継続したが、宦官黄皓の讒言と国力の衰退に阻まれた。蜀滅亡後、鍾会と共謀して反乱を企てるも敗死。'
    },
    voiceLine:'丞相の志、この姜維が継ぐ！',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'helmet',wpn:'spear',out:'#c62828'}
  },
  // 58: 張昭 (N)
  {
    id:58, name:'張昭', title:'呉の長老', rarity:1, type:1, faction:2, chapter:10,
    atk:50, hp:700, def:55, spd:38,
    skill:{ name:'長老の訓戒', desc:'味方全体防御12%UP(3ターン)+HP5%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'孫策が「外の事は周瑜に、内の事は張昭に」と遺言した呉の長老。赤壁の前夜には降伏を主張し、孫権に机を斬られるほど叱責されたが、その忠節は終生変わらなかった。',
      history:'彭城の人、字は子布。孫策の遺言により孫権を補佐した。陳寿は「張昭は厳毅にして威重あり」と評す。呉の文官の筆頭として国政を支えた。'
    },
    voiceLine:'老臣の言、聞き入れられずとも述べねばならぬ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#aaa',beard:'long',gear:'cloth_hat',wpn:'scroll',out:'#2e7d32'}
  },
  // 59: 管輅 (N)
  {
    id:59, name:'管輅', title:'天機の占師', rarity:1, type:1, faction:3, chapter:10,
    atk:45, hp:720, def:50, spd:42,
    skill:{ name:'天機の占', desc:'敵全体の防御20%DOWN(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'魏に仕えた天才易者。風雲の兆しから吉凶を言い当て、人の寿命すら見通したという。天機を漏らしすぎた報いか、四十八歳の若さで没した。',
      history:'平原の人、字は公明。正史『三国志』魏書管輅伝に独立した伝が立つ稀有な占い師。周易に通じ、その卜占は百発百中と記される。正元元年没。'
    },
    voiceLine:'天機を観る…この卦は凶、いや、凶の中に光あり',
    look:{skin:'#f0c8a0',hair:'long',hc:'#444',beard:'goatee',gear:'cloth_hat',wpn:'staff',out:'#616161'}
  },

  // ===== Chapter 11: 蜀漢の黄昏 (234-263年) =====
  // 54: 鄧艾 (SSR)
  {
    id:54, name:'鄧艾', title:'奇策の将', rarity:4, type:2, faction:1, chapter:11,
    atk:210, hp:1350, def:100, spd:62,
    skill:{ name:'陰平越え', desc:'敵単体に攻撃力190%ダメージ+敵全体の防御15%DOWN(3ターン)', type:'damage', mult:1.9, target:'single' },
    lore:{
      novel:'魏の名将。険しい陰平の山道を越え、鎧を纏ったまま断崖を滑り降りるという前代未聞の奇策で蜀の背後を突いた。成都を陥落させ蜀漢を滅ぼしたが、功を妬まれ殺された。',
      history:'義陽棘陽の人。吃音があったが才能を認められ屯田改革に功があった。景元四年、陰平越えで綿竹を破り蜀を滅ぼしたが、鍾会の讒言により殺害された。'
    },
    voiceLine:'道なきところに道を作る。それが戦いだ',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'spear',out:'#1565c0'}
  },
  // 63: 劉禅 (R)
  {
    id:63, name:'劉禅', title:'安楽公', rarity:2, type:1, faction:0, chapter:11,
    atk:80, hp:900, def:70, spd:35,
    skill:{ name:'楽不思蜀', desc:'味方全体HP10%回復+味方全体防御15%DOWN(3ターン)', type:'heal', mult:1.1, target:'all_ally' },
    lore:{
      novel:'蜀漢の二代目にして最後の皇帝。諸葛亮の死後、宦官黄皓に国政を壟断させ、鄧艾の侵攻にあっさり降伏した。「楽不思蜀」の逸話は暗愚の代名詞として語り継がれる。',
      history:'蜀書後主伝によれば、降伏後は安楽公に封ぜられた。司馬昭の宴席で「此の間楽しくして蜀を思わず」と答え、亡国の主の悲哀を象徴する人物となった。'
    },
    voiceLine:'此の間楽しくして蜀を思わず',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'crown',wpn:null,out:'#c62828'}
  },
  // 64: 鍾会 (SR)
  {
    id:64, name:'鍾会', title:'野心の策士', rarity:3, type:1, faction:1, chapter:11,
    atk:170, hp:1100, def:85, spd:52,
    skill:{ name:'権謀術数', desc:'敵全体の攻撃力20%DOWN(3ターン)+自身攻撃力20%UP(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'魏の知将にして野心家。鄧艾と共に蜀征伐の司令官を務めたが、蜀平定後に鄧艾を讒言で排除し、自らは独立を企てた。しかし姜維との共謀が露見し、兵士の反乱により殺された。',
      history:'穎川長社の人、字は士季。鍾繇の子。幼少より才覚に優れ、司馬昭に重用された。蜀征伐後に反乱を企てるも部下に殺害された。'
    },
    voiceLine:'功を立てた者が次に欲するもの…分かるだろう',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },
  // 70: 司馬師 (SR) ★NEW★
  {
    id:70, name:'司馬師', title:'三千の死士', rarity:3, type:1, faction:1, chapter:11,
    atk:165, hp:1150, def:95, spd:50,
    skill:{ name:'高平陵の変', desc:'味方全体攻撃力20%UP(3ターン)+味方全体防御15%UP(3ターン)', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'司馬懿の長子にして高平陵の変の実行部隊を率いた男。密かに三千の死士を養い、決起当日まで計画を秘匿し続けた冷徹な実行力の持ち主。父の死後は魏の全権を掌握した。',
      history:'晋書景帝紀によれば、河内温県の人、字は子元。高平陵の変で三千の死士を統率。司馬懿没後、撫軍大将軍として権力を掌握。254年に皇帝曹芳を廃立。毌丘倹の反乱鎮圧中に眼の腫瘍が悪化し、255年死去。'
    },
    voiceLine:'三千の死士、この手の中に',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'short',gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },
  // 71: 司馬昭 (SR) ★NEW★
  {
    id:71, name:'司馬昭', title:'路人皆知', rarity:3, type:1, faction:1, chapter:11,
    atk:168, hp:1180, def:92, spd:48,
    skill:{ name:'路人皆知の心', desc:'敵全体の攻撃力15%DOWN(3ターン)+敵全体の防御15%DOWN(3ターン)', type:'debuff', mult:1.0, target:'all_enemy' },
    lore:{
      novel:'「司馬昭の心は道行く人さえ知っている」と皇帝曹髦に叫ばれた、魏の実質的支配者。蜀漢を滅ぼし晋王に封ぜられるが、帝位に就く前に病没。息子の司馬炎が禅譲を受けた。',
      history:'晋書文帝紀によれば、河内温県の人、字は子上。兄・司馬師の死後、大将軍に就任。260年、皇帝曹髦のクーデター未遂を賈充に鎮圧させ、事実上の弑逆を行った。263年に蜀漢を滅ぼし、265年に病死。'
    },
    voiceLine:'路人が知る心。だが止められはすまい',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'goatee',gear:'crown_helm',wpn:'sword',out:'#1565c0'}
  },

  // ===== Chapter 12: 天下統一 (263-280年) =====
  // 60: 司馬炎 (SSR)
  {
    id:60, name:'司馬炎', title:'天下統一の帝', rarity:4, type:1, faction:1, chapter:12,
    atk:210, hp:1500, def:120, spd:50,
    skill:{ name:'天下統一', desc:'味方全体攻撃力25%UP(3ターン)+味方全体HP15%回復', type:'buff', mult:1.25, target:'all_ally' },
    lore:{
      novel:'祖父・司馬懿が蒔き、父・司馬昭が育てた天下取りの果実を摘み取った男。魏から禅譲を受けて晋を建国し、呉を滅ぼして三国時代に終止符を打った。しかし統一後は奢侈に耽った。',
      history:'晋書武帝紀によれば、河内温県の人、字は安世。265年に魏の元帝から禅譲を受け晋を建国。280年に呉を滅ぼし天下を統一。しかし八王の乱の遠因を作った。'
    },
    voiceLine:'三国の世は終わる。晋の世が始まるのだ',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'crown',wpn:'sword',out:'#1565c0'}
  },
  // 61: 羊祜 (SR)
  {
    id:61, name:'羊祜', title:'仁徳の将', rarity:3, type:1, faction:1, chapter:12,
    atk:150, hp:1200, def:100, spd:45,
    skill:{ name:'徳化の策', desc:'味方全体HP12%回復+味方全体防御15%UP(3ターン)', type:'heal', mult:1.12, target:'all_ally' },
    lore:{
      novel:'荊州都督として徳を以て呉の民を懐柔した仁将。敵将・陸抗が病に伏せた際には薬を贈り、陸抗は「羊祜は人に毒を盛るような者ではない」と躊躇なく服用した。死後、堕涙碑が建てられた。',
      history:'晋書羊祜伝によれば、泰山南城の人、字は叔子。荊州方面で呉との国境を守り、徳治による懐柔策を採った。呉征伐の大戦略を遺して278年に病没。民は碑を見て涙を流した。'
    },
    voiceLine:'徳を以て人を治めれば、剣は不要となる',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#333',beard:'short',gear:'cloth_hat',wpn:'scroll',out:'#1565c0'}
  },
  // 62: 杜預 (SR)
  {
    id:62, name:'杜預', title:'破竹の将', rarity:3, type:2, faction:1, chapter:12,
    atk:165, hp:1100, def:85, spd:55,
    skill:{ name:'破竹の勢い', desc:'敵全体に攻撃力120%ダメージ+敵全体の防御10%DOWN(3ターン)', type:'damage', mult:1.2, target:'all_enemy' },
    lore:{
      novel:'羊祜の遺志を継ぎ、呉征伐を完遂した知将。「破竹の勢い」の語源となった男。一度割れ目が入れば、あとは刃を当てるだけで竹は裂ける。その勢いで呉を滅ぼした。',
      history:'京兆杜陵の人、字は元凱。杜預は武人でありながら左伝の注釈書を著すなど学者としても知られた。279年から呉征伐を指揮し、280年に呉を滅亡させた。'
    },
    voiceLine:'竹を割る勢い、止められる者はおらぬ',
    look:{skin:'#e8b88a',hair:'short',hc:'#222',beard:'short',gear:'helmet',wpn:'sword',out:'#1565c0'}
  },
  // 66: 孫皓 (R)
  {
    id:66, name:'孫皓', title:'呉の末帝', rarity:2, type:1, faction:2, chapter:12,
    atk:90, hp:850, def:60, spd:40,
    skill:{ name:'暴政', desc:'味方全体攻撃力20%UP(3ターン)+味方全体HP10%減', type:'buff', mult:1.2, target:'all_ally' },
    lore:{
      novel:'呉の最後の皇帝にして暴君。気に入らぬ臣下の目を抉り、顔の皮を剥ぐなど残虐の限りを尽くした。忠臣を次々と殺し、呉を滅亡へと導いた亡国の暗君。',
      history:'呉書孫皓伝によれば、孫権の孫。264年に即位。当初は善政を布いたが、次第に暴虐化。酒宴で臣下を辱め、諫言する者を処刑した。280年、晋に降伏して呉は滅亡した。'
    },
    voiceLine:'余に逆らう者の末路…見せてやろう',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:null,gear:'crown',wpn:'sword',out:'#2e7d32'}
  },
  // 72: 陸抗 (SR/守) ★NEW★
  {
    id:72, name:'陸抗', title:'呉最後の盾', rarity:3, type:3, faction:2, chapter:12,
    atk:148, hp:1350, def:130, spd:42,
    skill:{ name:'徳将の守り', desc:'味方全体防御25%UP(3ターン)+味方全体HP10%回復', type:'buff', mult:1.0, target:'all_ally' },
    lore:{
      novel:'陸遜の子にして呉最後の名将。荊州で晋の羊祜と対峙し、敵同士でありながら酒や薬を贈り合う徳の交流を行った。陸抗の死後、呉の防衛線は崩壊し、滅亡への道が開かれた。',
      history:'呉書陸抗伝によれば、呉郡呉県の人、字は幼節。陸遜の子。羊祜が病の際に薬を贈り、部下は毒を疑ったが陸抗は「羊祜はそのような人ではない」と服用した。彼の死後、呉の守りは急速に崩壊した。'
    },
    voiceLine:'徳を知る敵将こそ、最も手強い',
    look:{skin:'#f0c8a0',hair:'topknot',hc:'#222',beard:'short',gear:'helmet',wpn:'spear',out:'#2e7d32'}
  },
  // 73: 丁奉 (SR) ★NEW★
  {
    id:73, name:'丁奉', title:'雪中の老将', rarity:3, type:0, faction:2, chapter:12,
    atk:180, hp:1150, def:90, spd:52,
    skill:{ name:'雪中急襲', desc:'敵単体に攻撃力165%ダメージ+敵単体の防御15%DOWN(3ターン)', type:'damage', mult:1.65, target:'single' },
    lore:{
      novel:'孫権・孫亮・孫休・孫皓の四代に仕えた歴戦の老将。252年の東興の戦いでは、雪の中を鎧も着けずに短兵で魏軍に突撃し、大勝を収めた。呉の晩年を支えた最後の勇将。',
      history:'呉書丁奉伝によれば、廬江安豊の人、字は承淵。若い頃から従軍し、四代の君主に仕えた。東興の戦いでの雪中突撃が有名。陳寿は「計略において秀で、勇敢において冠す」と評した。'
    },
    voiceLine:'雪中の突撃、この老兵にはまだ早い',
    look:{skin:'#d4a574',hair:'short',hc:'#aaa',beard:'short',gear:'headband',wpn:'sword',out:'#2e7d32'}
  },

  // ===== NG+: 2周目解禁 =====
  // 44: 関羽[神] (UR)
  {
    id:44, name:'関羽[神]', title:'武神降臨', rarity:5, type:0, faction:0, chapter:13,
    atk:380, hp:2200, def:150, spd:55,
    skill:{ name:'武神降臨', desc:'敵全体に攻撃力280%ダメージ+自身攻撃力30%UP(3ターン)', type:'damage', mult:2.8, target:'all_enemy' },
    lore:{
      novel:'死して神となった武聖。関聖帝君として万民に崇められ、義の化身として永遠に戦場に立つ。その青龍偃月刀の一閃は、生前を遥かに凌駕する武神の力を宿す。',
      history:'死後、歴代王朝に追封され、清代には「関聖大帝」「忠義神武霊佑仁勇威顕関聖大帝」として最高位の神格を与えられた。商業の神・義の神として現在も中華圏で広く信仰される。'
    },
    voiceLine:'義の道に終わりはない。この魂、永遠に戦場にあり',
    look:{skin:'#c0392b',hair:'long',hc:'#111',beard:'long',gear:'crown',wpn:'guandao',out:'#ffd700'}
  }
];

// Build ID lookup map (array is sorted by chapter, not by ID)
Game.CHAR_BY_ID = {};
Game.CHARACTERS.forEach(function(c) { if (c) Game.CHAR_BY_ID[c.id] = c; });
