/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //标点处理：
    '.': '。',

    //主界面及层级等：
    'Initializing...': '初始化中……',
    'Loading Savegame...': '读取已保存的游戏存档……',
    'Applying Offline Progress...': '计算离线进度并应用……',
    'Layers': '层级',
    'Achievements': '成就',
    'Guide': '教程',
    'Settings': '设置',
    'Reach': '到达',
    'Automators': '自动器',
    'Volatility': '不定性',
    'Aleph': '阿列夫',
    'ReStack': '重新堆叠',
    'Max All (M': '最大化所有(M',
    'Discord': 'Discord地址',
    'Website': '官方网站地址',
    'This translates to a': '因此增加了',
    'Boost on': '加成，作用于',
    'Respec to reset all the Upgrades, but you don\'t get the spent': '洗点可以重置所有升级，但您不会获得',
    'back!': '返还！',
    'Prestige to go': '转生以到达',
    'Generators': '发生器',
    'Upgrades': '升级',
    'Power': '能量',
    'Challenges': '挑战',
    'Upgrade Tree': '升级树',
    'Statistics': '统计',
    'Generator': '发生器',
    'Amount': '数量',
    'Buy': '购买',
    'Buy Until': '一次性购买',
    'Desired Interval': '生效时间间隔',
    'Seconds': '秒',
    'Active': '是否生效',
    'Your highest Layer is': '您最高到达的层级是',
    'Production': '产量',
    'You need to go': '您需要到达过',
    'at least once to produce': '才可以产生',
    'Respec: get your spent': '洗点: 返还所有花费的',
    'back, and do a ReStack without reward': '，但进行一次无奖励的重新堆叠',
    'Enhancers': '增强升级',
    'Resource Multipliers': '资源倍率',
    'Resource Powerers': '资源强化',

    //升级
    'Max': '最大',
    'Boost the Production Boost of Generators per 10 Levels': '增加每10级发生器的产量',
    'It boosts stuff. Sadly I have no idea what exactly it boosts :(': '它可以使其他的东西变得更强。但很遗憾您还不知道它能使什么变得更强 :(',

    //自动器
    'Automatically buys max on all Layers': '在所有层级上自动最大化所有',
    'Decrease the Automator interval': '减少自动器的生效时间间隔',
    'Auto Prestige': '自动转生',
    'Automatically prestiges all Layers': '在所有层级上自动转生',
    'Auto Aleph': '自动阿列夫',
    'Automatically Max All Aleph Upgrades': '自动最大化所有阿列夫升级',

    //不定性
    'Make the next Layer non-volatile': '使下一层不再不定',
    'None → α': '无 → α',
    'Boost the Prestige Reward you get per second': '增加每秒获得的转生奖励',
    'The next Layer is maxed automatically each tick': '使下一层每个时刻自动最大化',

    //阿列夫升级
    'Increase your Aleph gain': '增加阿列夫的获取数量',
    'Get a Bonus to Aleph gain': '阿列夫的获取数量获得加成',
    'Gain more Aleph based on the log(ℵ) you have': '根据拥有的log(ℵ)，增加阿列夫的获取数量',
    'Gain more δ': '增加δ的获取数量',
    'All Power Generators on every Layer are stronger': '每个层级的能量发生器效果更好',
    'Increase Prestige Reward on all Layers that don\'t have Power Generators': '增加没有能量发生器的所有层级的转生奖励',
    'Gain more Aleph based on the log(log(α)) you have': '根据拥有的log(log(α))，增加阿列夫的获取数量',
    'The β Prestige Formula is better': 'β转生的公式变得更好',
    'Increase the Prestige Reward of all Layers': '增加所有层级的转生奖励',
    'Increase the exponential difference of boosts between layers, resulting in a large boost!': '使各层之间的加成指数变得更高，从而增加加成总量！',

    //挑战
    'That\'s weird. Something\'s different...': '奇怪，有什么东西不一样了……',
    'A Cake.': '蛋糕。',
    'You are currently in Challenge': '您目前进行的是挑战',
    'Leave Challenge': '退出挑战',
    'Completed!': '已完成！',
    'Goal': '目标',

    //多重层级
    'Increase the Resource Multiplier': '增加资源倍率',
    'Increase the Resource Power': '增加资源的指数',

    //重新堆叠
    'Permanent Upgrades': '永久升级',
    'All Prestige gains are higher': '增加所有转生资源的获取数量',
    'The Layer Exponential Factor increases over time': '层级指数因子随着时间而增加',
    'All Upgrade Effects are stronger (including Tree Upgrades': '所有的升级效果变得更好(包括树的升级',
    'All Power Generators are stronger': '所有能量发生器的效果变得更好',
    '"Increase your Aleph gain" Upgrade scales better': '“增加阿列夫获取数量”的升级效果变得更好',
    'The Layer Exponential Factor is higher': '增加层级指数因子',
    'All your Layer Resources are multiplied each second': '所有层级的资源乘以秒数',
    'Resource Multipliers are stronger': '资源倍率效果变得更好',
    'Resource Multiplier Upgrades are stronger based on time spent this ReStack': '根据本次重新堆叠经过的时间，使资源倍率升级的效果变得更好',
    'Unlock Resource Powerers': '解锁资源强化',
    'Unlocked': '已解锁',
    'Locked': '未解锁',
    'Resource Powerers are stronger': '资源强化效果变得更好',
    'Your Layer gets substracted instead of reset when buying Upgrades': '购买升级时，您的层级会减去相应数值，而不是进行重置',
    'Resource Multipliers scale better to their level': '资源倍率根据等级效果变得更好',
    'Other Times await...': '来生再会……',
    'Meta Upgrade': '元升级',
    'Respec': '洗点',
    'Check back after reaching': '到达这个以后再来吧:',
    'I have woken up. I am now aware that a new Layer is just another layer. It is time to become meta.': '我已经醒悟了。一个新的层级不过就是层级罢了。是时候成为元了。',

    //成就
    //Achievement Get: 成就名称
    'Starting Out': '启程出发',
    'The beginning of Idling': '放置之始',
    'Polynomial Growth': '多项式增长',
    'Still Polynomial Growth': '还是多项式增长',
    'A Square of Generators': '发生器方形',
    'Pentagen': '发生器五方',
    'Power of Six': '我是六号',
    'Seven Heaven': '第七天堂',
    'Octacore': '八核',
    'Upgradalicious': '优质升级',
    'Stonks': '储备丰富',
    'Other Times Await': '来生再会',
    'POW': '能量',
    'Polynomial POW': '多项式能量',
    'In thousands': '数以千计',
    'Other Times Arrived': '来生已至',
    'Automatic!': '自动运转',

    'Reach 10 α': '到达10α',
    'Buy your first α Upgrade': '首次购买升级',
    'Reach 1e18 α': '到达1e18α',
    'Go β': '到达β',
    'Go β 10 Times': '到达10次β',
    'Enable the "Max All" Automator': '激活 自动化所有 自动器',

    //教程
    'Getting Started': '开始吧',
    'To start, click the  "+1 α" button until you have 10 α. With 10 α, you can buy a Generator α': '首先，先点击 +1α 按钮，直到您一共获得了10α。这样您就可以购买发生器α',
    'Export & Import': '导出和导入存档',
    'In the Settings Menu, you can Export and Import your Game, allowing you to keep it somewhere safe.': '在设置菜单中，您可以导出和导入您的存档，以备不时之需。',
    'It is recommended to Export often': '强烈建议您经常导出备份存档',
    'Prestige': '转生',
    'Simple Boost': '简单加成',
    'Power Generators': '能量发生器',
    'Power Generators work like Generators, but they produce Power. Power boosts other Layers and help ramping those numbers up!': '能量发生器跟发生器类似，但它们产生的是能量。能量可以提升其他层级的效果，帮助它们的数字增长到更大！',
    'Layer Exponential Factor': '层级指数因子',
    'With a Layer Exponential Factor of 24, it would be: xe10, xe240, xe5760, ...': '层级指数因子为24时，则是: e10倍，e240倍，e5760倍，依此类推……',
    'With a Layer Exponential Factor of 30, it would be: xe10, xe300, xe9000, ...': '层级指数因子为30时，则是: e10倍，e300倍，e9000倍，依此类推……',
    'This applies to basically everything like certain challenge rewards, Upgrade Effects and Power Boosts.': '它几乎对所有相关参数都有效，例如特定的挑战奖励，升级效果及能量加成等。',
    'Meta': '元',

    //设置
    'Show all Layers': '显示所有层级',
    'Show Layer Ordinals (α: #1, β: #2, ...': '显示层级序号(α: #1，β: #2，依此类推',
    'Show first': '只显示最前面的',
    'Show last': '只显示最后面的',
    'Buy Max always buys until': '最大化所有时总是一次性购买',
    'Disable Buy Max on highest unlocked Layer': '对最高的层级不使用最大化所有',
    'Auto Max All': '自动最大化所有',
    'Auto Prestige Highest Layer': '自动转生最高的层级',
    'Allow Resource Colors': '启用资源颜色',
    'Allow Resource Glow': '启用资源光亮',
    'News Ticker': '启用滚动新闻',
    'Notifications': '启用提示框',
    'Save Notifications': '启用存档提示框',
    'Confirmations': '启用确认窗口',
    'Title Style': '标题显示内容',
    'None': '无',
    'Motd': '每日箴言',
    'Current Layer': '当前层级',
    'Offline Progress': '启用离线进度',
    'increases loading time': '可能需要更多时间载入游戏',
    'Theme': '游戏主题',
    'Dark': '黑暗',
    'Light': '明亮',
    'Neon': '霓虹',
    'Godot Blue': '暗蓝',
    'Save Game': '保存游戏',
    'Export': '导出存档',
    'Import': '导入存档',
    'Wipe Game': '抹除游戏进度',
    'Game Saved!': '游戏已保存存档！',
    'Error Saving Game': '保存存档时发生错误',
    'Error importing Game': '导入存档时发生错误',
    'Error loading save': '读取存档时发生错误',
    'Error loading Settings': '读取设置时发生错误',
    'What have you done...': '您在做什么……',
    'Game Imported': '游戏存档已导入',
    'Copy to Clipboard': '复制到剪贴板',
    'Paste from Clipboard': '从剪贴板粘贴',
    'Clear': '清空',
    'Download as .txt': '下载为文本文档',
    'Copied to Clipboard': '已复制到剪贴板',
    'Controls: M to Max All on the selected Layer': '快捷键：按M可在当前层级最大化所有',
    'Left and Right Arrows to change Layers': '按左右方向键可以切换层级',
    'P to Prestige the selected Layer': '按P可以在当前层级进行转生',
    'First Letter of a tab ([L]ayers, [V]olatility) to select it; C to select Achievements': '按选项卡的英文首字母可以选择它(如按L选择层级，按V选择不定性)，按C可以选择成就',
    'Credits': '致谢名单(中文版由by22dgb汉化)',
    'Inspiration: Antimatter Dimensions by hevipelle, Infinite Layers by dan-simon': '灵感来源：hevipelle制作的反物质维度，dan-simon制作的无限层级',
    'Powered by vue.js and break eternity.js': '由vue.js和break eternity.js提供的技术支持',

    //滚动新闻
    'Every Incremental needs a News Ticker': '增量游戏就该有滚动新闻',
    '1.79769313e308 / 10 -IGN': 'IGN评分: 1.79769313e308 / 10',
    'Powered by RNG': '随机数生产器荣誉出品',
    'Maybe there are new News here? Nope, just the old news...': '这有新的一点的新闻吗？不不，只有旧闻……',
    'The Number limit is above 10↑↑308, good luck!': '数字上限超过10↑↑308，祝您好运！',
    'Your ad here': '广告虚位以待',
    'ζ is Fake News!': 'ζ完全是假新闻！',
    'Suggest more messages in the Discord!': '有建议欢迎来Discord上提出！',
    'The Cell is the Powerhouse of the Mitochondria': '细胞才是线粒体的动力源',
    '"where is the potato layer ?!" - some pig dude': '“土豆层级哪去了？！”————某个大概是猪头娃的家伙',
    '"Imagine quoting your name on your news ticker" - ???': '“想象一下在滚动新闻中引用到你的名字会如何”————？？？',
    '"if you hit a wall, keep hitting" -winston churchill': '“纵为至暗时刻，终有形势反转”————温X顿 丘X尔',
    'Die, frickin pie - PewDiePie': '给爷死啊，该死的馅饼————PewDiePie',
    'This definitly beats Mega Layers! -RΨZΞΠ 9 935ΘX': '这显然比米茄层级好！————RΨZΞΠ 9 935ΘX',
    'hey, I bet this isnt a newsticker. Or is it?': '说白了这根本就不是滚动新闻吧喂？',
    '╯°□°）╯︵ ┻━┻   -   TableFlipper': '╯°□°）╯︵ ┻━┻   ————   掀桌',
    'Don\'t click the X at the top right, it\'s a game breaking bug!': '请不要点击右上角的X，这会导致游戏运行不正常的！',
    'Nerf This!': '来削我呀！',
    'To nerf, or not to nerf. That is the Question!': '削，还是不削。值得考虑！',
    'A news ticker. How original.': '这是滚动新闻。多有创意嘛。',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "and ": "与",
    "Have 1 ": "拥有1个", //成就
    "Have over 1,000 ": "拥有超过1000个", //成就
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "\n": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
    /^(\d+)?\.?(\d+)?e?[\d\,]*\s\([\d\,]*$/, //处理不该抓取的数字
    /^[\d\,]*\,$/, //处理不该抓取的数字
    /^x\s?\d+\.\d+e[\d\,]*$/, //处理不该抓取的数字
    /^[\d\.\,\s]+→(.*)$/, //误抓取的内容
    /^奖励: (.+)$/, //误抓取的内容
    /^打开微信扫一扫$/, //误抓取的内容
    /^点击加群$/, //误抓取的内容
    /^更多同类游戏$/, //误抓取的内容
    /^关注公众号$/, //误抓取的内容
    /^旧版$/, //误抓取的内容
    /^论坛$/, //误抓取的内容
    /^您拥有$/, //误抓取的内容
    /^所有能量发生器和升级的价格变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^所有升级和简单加成的效果变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^所有发生器倍率变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^所有转生奖励变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^可获得$/, //误抓取的内容
    /^以下发生器产量增加(.*)$/, //误抓取的内容
    /^与(.*)$/, //误抓取的内容
    /^增加(.+)的产量$/, //误抓取的内容
    /^Git游戏$/, //误抓取的内容
    /^QQ群号$/, //误抓取的内容
    /^能量，因此增加了$/, //误抓取的内容
    /^您经过了(.*)于此$/, //误抓取的内容
    /^您已经进行过$/, //误抓取的内容
    /^您拥有(.*)$/, //误抓取的内容
    /^您总共拥有(.*)$/, //误抓取的内容
    /^您最高拥有过(.*)$/, //误抓取的内容
    /^转生(.*)次$/, //误抓取的内容
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^You were offline for(.*)$/, '您总共离线了$1'], //主界面及层级等
    [/^You have made a total of(.*)$/, '您总共拥有$1'], //主界面及层级等
    [/^You have gone(.*)$/, '您已经进行过$1'], //主界面及层级等
    [/^You have unlocked (.+) \/ (.+) Achievements.$/, '一共有$2个成就，您解锁了其中的$1个成就。'], //成就，前置
    [/^You have(.*)$/, '您拥有$1'], //主界面及层级等
    [/^Get \+(.*)$/, '可获得$1'], //主界面及层级等
    [/^Power,(\s+)translated to a$/, '能量，因此增加了'], //主界面及层级等
    [/^The highest you ever had is(.*)$/, '您最高拥有过$1'], //主界面及层级等
    [/^You spent (.+) this(.*)$/, '您经过了$1于此$2'], //主界面及层级等
    [/^(.+) Times$/, '转生$1次'], //主界面及层级等
    [/^You have approx.(.*)$/, '您大概拥有$1'], //主界面及层级等
    [/^You are on Layer(.*)$/, '您在层级$1'], //主界面及层级等
    [/^Your Resource multiplies by x(.+) each second$/, '您的资源倍率每秒变为$1倍'], //主界面及层级等
    [/^and thus advancing (.+) Layers per second$/, '因此每秒前进$1个层级'], //主界面及层级等
    [/^You get(.*)$/, '您可获得$1'], //主界面及层级等
    [/^, translated to a x(.+) Boost on$/, '，因此获得了对以下生效的$1倍产量加成: '], //主界面及层级等
    [/^Boost on (.+) Production$/, '$1的产量'], //升级
    [/^Boost (.+) Production$/, '增加$1的产量'], //升级
    [/^Boost Production of Generators (.+)$/, '以下发生器产量增加: $1'], //升级
    [/^Boost Prestige Reward on Layer (.+)$/, '增加层级$1的转生奖励'], //升级
    [/^Boost (.+) Production based on Time spent this (.+)$/, '根据本次$2经过的时间，增加$1的产量'], //升级
    [/^Boost all (.+) Generators based on time spent this (.+)$/, '根据本次$2经过的时间，增加$1的所有发生器产量'], //升级
    [/^All (.+) Generators are stronger based on time spent this (.+)$/, '根据本次$2经过的时间，$1的所有发生器产量变得更高'], //升级
    [/^Inactive →(.*)s$/, '未生效 →$1秒'], //自动器
    [/^(.*)s →(.*)s$/, '$1秒 →$2秒'], //自动器
    [/^Volatility \(persistence\) allows you to make earlier Layers non-volatile. Non-volatile Layers(\s+)never reset and reward a percentage of the its prestige reward every second.$/, '不定性(持续性)可以使更早出现的层级变得不再不定。不再不定的层级永不重置，它们将每秒给予一部分转生奖励。'], //不定性
    [/^All Upgrade and Simple Boost Effects are raised to the Power of(.*)$/, '所有升级和简单加成的效果变为该数值为幂的指数:$1'], //挑战
    [/^All Generator and Upgrade Prices are raised to the Power of (.+). Power Effects are raised to the Power of(.*)$/, '所有能量发生器和升级的价格变为该数值为幂的指数: $1。能量效果变为该数值为幂的指数:$2'], //挑战
    [/^All Generator Multipliers are raised to the Power of(.*)$/, '所有发生器倍率变为该数值为幂的指数:$1'], //挑战
    [/^All Prestige Rewards are raised to the Power of(.*)$/, '所有转生奖励变为该数值为幂的指数:$1'], //挑战
    [/^Reward: All Power Generators are x(.+) stronger$/, '奖励: 所有能量发生器的效果变为$1倍'], //挑战
    [/^Reward: All Generator Multiplicators per 10 Levels are \+(.+) better$/, '奖励: 所有发生器倍率每10级增加$1'], //挑战
    [/^Reward: Prestige Reward of Layer (.+) is x(.+) higher$/, '奖励: 层级$1的转生奖励变为$2倍'], //挑战
    [/^Reward: All Alpha Generators are x(.+) stronger$/, '奖励: 阿尔法发生器的效果变为$1倍'], //挑战
    [/^In Omega Layers, your Goal is to produce Resources \(e.g. α\) and Prestige for higher Resources. You can buy(\s+)things like Generators and Upgrades to accomplish that.$/, '在欧米茄层级中，您的目标是获取资源(例如α)，然后转生以获取更高级的资源。您可以通过购买发生器和升级来达到这个目标。'], //教程
    [/^, which(\s+)produces 1 α every second. Continue buying Generators to increase your α production.$/, '了，它会每秒产生1α。继续购买发生器可以提升α产量。'], //教程
    [/^.(\s+)Browser Storage isn't the most reliable thing. You may share Export Codes in my Discord Server, if you want.$/, '。浏览器缓存不一定可靠。如果有需要，您也可以与他人分享存档。'], //教程
    [/^Generators produce Resources every second or other Generators. The first Generator produces Resources. The 2nd Generator produces(\s+)1st Generators, the 3rd Generator produces 2nd Generators and so on. You buy Generators with Resources$/, '发生器每秒产生资源或其他发生器。第1个发生器产生资源，第2个发生器产生第1个发生器，第3个发生器产生第2个发生器，依此类推。您需要使用资源来购买发生器'], //教程
    [/^Upgrades improve several Aspects of the Game. For example, they help produce more Resource by making Generators stronger or increasing(\s+)Prestige Rewards.$/, '升级可以影响游戏的方方面面。例如，它们可以使发生器效果变得更好，或者使转生奖励变得更多，从而增加资源产量。'], //教程
    [/^Once you reach (.+) α, you can reset your current progress to get 1 β, which(\s+)can be spent on various things to make progress faster. You will gain your second β at about (.+) α$/, '当您拥有$1α时，您就可以重置目前的进度，然后获得1β了，您可以将它用在不同的地方来加快进度。您可以在$3α时获得第2个β'], //教程
    [/^With Automators, you can automate the Game to your liking. For example, they can Prestige and Maximize Layers(\s+)automatically. You can also set a desired interval, which you can use if you want to make them slower. For example, with a desired(\s+)interval of 3 seconds, the automator will never be faster than 3 seconds.$/, '只要拥有自动器，您就可以按照喜好来进行自动操作了。例如，可以利用它们来自动转生和最大化层级。您还可以设置一个生效时间间隔，这样可以让它们更晚生效。例如，如果将生效时间间隔设置为3秒，则自动器永远不会在时间间隔小于3秒的情况下生效。'], //教程
    [/^If you see a message below the amount of Resource you have, the Layer has a "Simple Boost". Simple Boost boosts the first Alpha Generator, resulting in much higher numbers. The Boost you get is based on the current Resource you(\s+)have.$/, '如果您在拥有的资源数量下方看到一条消息，则说明该层级拥有了 简单加成 。简单加成使第一个阿尔法发生器的效果变得更好，从而使数字变得更大。简单加成的数值与您当前拥有的资源数量有关。'], //教程
    [/^Challenges are a way to increase your production. While active, they pose a penalty to your production, and you have(\s+)to reach a certain goal. When the Goal is reached, you get a reward form completing the Challenge.$/, '通过挑战可以增加产量。当进行挑战时，会对产量造成一定的负面效果，您必须达到特定的目标后才能完成挑战。完成挑战后，您可以获得一定的奖励。'], //教程
    [/^Are you tired of clicking Prestige all the time\? Now you can make layers non-volatile, resulting in them never resetting and instead(\s+)giving a part of their Prestige Reward every second. Later on, Layers can also max themselves automatically.$/, '整天都得手动按转生，您是不是有点烦了？现在您可以使层级不再不定，永不重置了。此后，它们将每秒给予一部分转生奖励。之后，层级还可以自动进行最大化。'], //教程
    [/^After going δ at least once, you can gain Aleph, allowing you to buy Upgrades that globally boost the game.(\s+)You gain 10x more Aleph for every new Layer you unlock after δ.$/, '到达过δ之后，您就可以开始获得阿列夫了，您可以使用它来购买全局生效的升级。在δ之后，每解锁一个新的层级，阿列夫的获取数量就变为之前的10倍。'], //教程
    [/^The Layer Exponential Factor determines the exponential difference between 2 Layers. For example, with a Layer Exponential Factor(\s+)of 22, a Simple Boost of xe10 on a Layer means xe220 on 1 Layer later, xe4840 2 Layers later and so on.$/, '层级指数因子决定了两个层级之间的指数差异。例如，如果层级指数因子为22，一个层级上的简单加成为e10倍，则下一个层级的简单加成变为e220倍，下两个层级的简单加成变为e4840倍，依此类推。'], //教程
    [/^Upgrade Trees provide time-based Upgrades. You have to pick a path while buying them, but you can respec to pick a new one. This(\s+)won't give back spent resource! Automators don't assume a path, so you will have to pick one manually.$/, '升级树提供跟时间有关的升级。您只能从多条路径中选择一条，但您可以在洗点后重新选择一条。请注意，洗点不会返还任何资源！自动器不会选择路径，所以您需要手动先选择一条，然后自动器才会生效。'], //教程
    [/^After unlocking κ, you are able to ReStack. This resets all progress so far in exchange for Layer Coins, which can be spent(\s+)on powerful Upgrades. If you feel like you took the wrong Path on the permanent Upgrades, you can respec. You will get all spent Layer Coins back but you do(\s+)a ReStack without any rewards. ReStack yields 10x more Layer Coins for every new Layer unlocked.$/, '解锁κ以后，您就可以进行重新堆叠了。这将重置之前的所有进度，但您可以获得层级币，您可以用它来购买一些强大的升级。如果您觉得自己选择了错误的永久升级路径，您可以进行洗点。洗点后将全额返还所有层级币，但您将自动进行一次无奖励的重新堆叠。每解锁一个新的层级，层级币获取数量就变为之前的10倍。'], //教程
    [/^You just woke up from the Layer dream and realized that a new Layer is just another Layer. You can now buy Upgrades to increase your Resource(\s+)multiplier and climb Layers faster. ReStack is still available, so check that out! There is a new Upgrade Tree waiting to be upgraded.$/, '您已经从层级的幻梦中苏醒过来，现在对您来说，一个新的层级不过就是层级罢了。您现在可以购买增加资源倍率的升级了，它们可以使您更快地提升层级。重新堆叠仍然有效，请注意这一点！同时也出现了一个新的升级树。'], //教程
    [/^This Number is randomly generated -> (.+). If it's above 1,000, consider yourself lucky!$/, '此数字为随机生成的 -> $1。如果它大于1000，说明您的运气相当好！'], //滚动新闻
    [/^get Layer (.+) now \[working 2020\]$/, '点此直接解锁$1层级[2020年内有效]'], //滚动新闻
    [/^(.+) α\? That's rookie numbers$/, '$1α？这数字弱爆了'], //滚动新闻
    [/^Motto of the Day: (.+)$/, '每日箴言: (译者注: 作者没有吃药，这边的内容无法翻译，各位就当这里不存在，完毕)'], //滚动新闻
]);