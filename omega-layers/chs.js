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
    'Layers': '层级',
    'Achievements': '成就',
    'Guide': '教程',
    'Settings': '设置',
    'Automators': '自动器',
    'Volatility': '不定性',
    'Aleph': '阿列夫',
    'ReStack': '重新堆叠',
    'Max All (M': '最大化所有(M',
    'Website': '官方网站地址',
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
    'Enhancers': '增强升级',

    //升级
    'Max': '最大',
    'Boost the Production Boost of Generators per 10 Levels': '增加每10级发生器的产量',
    'It boosts stuff. Sadly I have no idea what exactly it boosts :(': '它可以使其他的东西变得更强。但很遗憾您还不知道它能使什么变得更强 :(',

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
    'Other Times await...': '其他时间在等待着……',

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
    'With a Layer Exponential Factor of 24, it would be: xe10, xe240, xe5760, ...': '层级指数因子为24时，则是：e10倍，e240倍，e5760倍，依此类推……',
    'With a Layer Exponential Factor of 30, it would be: xe10, xe300, xe9000, ...': '层级指数因子为30时，则是：e10倍，e300倍，e9000倍，依此类推……',
    'This applies to basically everything like certain challenge rewards, Upgrade Effects and Power Boosts.': '它几乎对所有相关参数都有效，例如特定的挑战奖励，升级效果及能量加成等。',

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
    /^(.+)→(.*)$/, //误抓取的内容
    /^奖励：(.+)$/, //误抓取的内容
    /^打开微信扫一扫$/, //误抓取的内容
    /^点击加群$/, //误抓取的内容
    /^更多同类游戏$/, //误抓取的内容
    /^关注公众号$/, //误抓取的内容
    /^旧版$/, //误抓取的内容
    /^论坛$/, //误抓取的内容
    /^您拥有$/, //误抓取的内容
    /^所有能量发生器和升级的价格变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^所有升级和简单加成的效果变为该数值为幂的指数(.*)$/, //误抓取的内容
    /^以下发生器产量增加(.*)$/, //误抓取的内容
    /^与(.*)$/, //误抓取的内容
    /^增加(.+)的产量$/, //误抓取的内容
    /^Git游戏$/, //误抓取的内容
    /^QQ群号$/, //误抓取的内容
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
    [/^You have(.*)$/, '您拥有$1'], //主界面及层级等
    [/^You get(.*)$/, '您可获得$1'], //主界面及层级等
    [/^, translated to a x(.+) Boost on$/, '，因此获得了对以下生效的$1倍产量加成：'], //主界面及层级等
    [/^Boost on (.+) Production$/, '$1的产量'], //升级
    [/^Boost (.+) Production$/, '增加$1的产量'], //升级
    [/^Boost Production of Generators (.+)$/, '以下发生器产量增加：$1'], //升级
    [/^Boost Prestige Reward on Layer (.+)$/, '增加层级$1的转生奖励'], //升级
    [/^Boost (.+) Production based on Time spent this (.+)$/, '根据本次$2经过的时间，增加$1的产量'], //升级
    [/^Boost all (.+) Generators based on time spent this (.+)$/, '根据本次$2经过的时间，增加$1的所有发生器产量'], //升级
    [/^All (.+) Generators are stronger based on time spent this (.+)$/, '根据本次$2经过的时间，$1的所有发生器产量变得更高'], //升级
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
    [/^After going δ at least once, you can gain Aleph, allowing you to buy Upgrades that globally boost the game.(\s+)You gain 10x more Aleph for every new Layer you unlock after δ.$/, '获得过δ之后，您就可以开始获得阿列夫了，您可以使用它来购买全局生效的升级。在δ之后，每解锁一个新的层级，阿列夫的获取数量就变为之前的10倍。'], //教程
    [/^The Layer Exponential Factor determines the exponential difference between 2 Layers. For example, with a Layer Exponential Factor(\s+)of 22, a Simple Boost of xe10 on a Layer means xe220 on 1 Layer later, xe4840 2 Layers later and so on.$/, '层级指数因子决定了两个层级之间的指数差异。例如，如果层级指数因子为22，一个层级上的简单加成为e10倍，则下一个层级的简单加成变为e220倍，下两个层级的简单加成变为e4840倍，依此类推。'], //教程
    [/^Upgrade Trees provide time-based Upgrades. You have to pick a path while buying them, but you can respec to pick a new one. This(\s+)won't give back spent resource! Automators don't assume a path, so you will have to pick one manually.$/, '升级树提供跟时间有关的升级。您只能从多条路径中选择一条，但您可以在洗点后重新选择一条。请注意，洗点不会返还任何资源！自动器不会选择路径，所以您需要手动先选择一条，然后自动器才会生效。'], //教程
]);