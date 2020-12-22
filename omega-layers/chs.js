/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //主界面等：
    'Initializing...': '初始化中……',
    'Layers': '层级',
    'Achievements': '成就',
    'Guide': '教程',
    'Settings': '设置',
    'Automators': '自动器',
    'Volatility': '不定性',
    'Aleph': '阿列夫',
    'ReStack': '重新堆叠',
    'Website': '官方网站地址',
    'Loading Savegame...': '读取已保存的游戏存档……',

    //升级
    'Max': '最大',
    'and ': ' 与',

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

    //多重层级
    'Increase the Resource Multiplier': '增加资源倍率',
    'Increase the Resource Power': '增加资源的指数',

    //重新堆叠
    'All Prestige gains are higher': '增加所有转生资源的获取数量',
    'The Layer Exponential Factor increases over time': '层级的指数因子随着时间而增加',
    'All Upgrade Effects are stronger (including Tree Upgrades)': '所有的升级效果变得更好(包括树的升级)',
    'All Power Generators are stronger': '所有能量发生器的效果变得更好',
    '"Increase your Aleph gain" Upgrade scales better': '“增加阿列夫获取数量”的升级效果变得更好',
    'The Layer Exponential Factor is higher': '增加层级的指数因子',
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
    /^\d?\.?(\d+)?e?[\d\,]*\d+\s\(\d+\,$/, //处理不该抓取的数字
    /^x\s\d\.\d+e[\d\,]*$/, //处理不该抓取的数字
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
    [/^Boost (.+) Production$/, '增加$1产量'], //升级
    [/^Boost Production of Generators (.+)$/, '以下发生器产量增加：$1'], //升级
    [/^All Upgrade and Simple Boost Effects are raised to the Power of(.*)$/, '所有升级和简单加成的效果变为该数值为幂的指数:$1'], //挑战
    [/^All Generator and Upgrade Prices are raised to the Power of (.+). Power Effects are raised to the Power of(.*)$/, '所有能量发生器和升级的价格变为该数值为幂的指数: $1。能量效果变为该数值为幂的指数:$2'], //挑战
    [/^All Generator Multipliers are raised to the Power of(.*)$/, '所有发生器倍率变为该数值为幂的指数:$1'], //挑战
    [/^All Prestige Rewards are raised to the Power of(.*)$/, '所有转生奖励变为该数值为幂的指数:$1'], //挑战
    [/^Reward: All Power Generators are x(.+) stronger$/, '奖励: 所有能量发生器的效果变为$1倍'], //挑战
    [/^Reward: All Generator Multiplicators per 10 Levels are \+(.+) better$/, '奖励: 所有发生器倍率每10级增加$1'], //挑战
    [/^Reward: Prestige Reward of Layer (.+) is x(.+) higher$/, '奖励: 层级$1的转生奖励变为$2倍'], //挑战
    [/^Reward: All Alpha Generators are x(.+) stronger$/, '奖励: 阿尔法发生器的效果变为$1倍'], //挑战
]);