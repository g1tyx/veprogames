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

    //阿列夫升级
    'Increase your Aleph gain': '增加阿列夫的获取数量',
    'Get a Bonus to Aleph gain': '阿列夫的获取数量得到一个加成',
    'Gain more Aleph based on the log(ℵ) you have': '根据拥有的log(ℵ)，增加阿列夫的获取数量',
    'Gain more δ': '增加δ的获取数量',
    'All Power Generators on every Layer are stronger': '每个层级的能量发生器效果更好',
    'Increase Prestige Reward on all Layers that don\'t have Power Generators': '增加没有能量发生器的所有层级的转生奖励',
    'Gain more Aleph based on the log(log(α)) you have': '根据拥有的log(log(α))，增加阿列夫的获取数量',
    'The β Prestige Formula is better': 'β转生的公式变得更好',
    'Increase the Prestige Reward of all Layers': '增加所有层级的转生奖励',
    'Increase the exponential difference of boosts between layers, resulting in a large boost!': '使各层之间的加成指数变得更高，从而增加加成总量！',

    //挑战
    'All Upgrade and Simple Boost Effects are raised to the Power of': '所有升级和简单加成的效果变为该数值为幂的指数：',
    'All Generator Multipliers are raised to the Power of ': '所有发生器倍率变为该数值为幂的指数：',
    'All Prestige Rewards are raised to the Power of': '所有转生奖励变为该数值为幂的指数：',
    'That\'s weird. Something\'s different...': '奇怪，有什么东西不一样了……',
    'A Cake.': '蛋糕。',
    '': '',
    '': '',
    '': '',



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
    [/^All Generator and Upgrade Prices are raised to the Power of (.+). Power Effects are raised to the Power of$/, '所有能量发生器和升级的价格变为该数值为幂的指数： $1。能量效果变为该数值为幂的指数：'], //挑战
    [/^All Power Generators are x(.+) stronger$/, '所有能量发生器的效果变为$1倍'], //挑战
    [/^All Generator Multiplicators per 10 Levels are \+(.+) better$/, '所有发生器倍率每10级增加$1'], //挑战
    [/^Prestige Reward of Layer (.+) is x(.+) higher$/, '层级$1的转生奖励变为$2倍'], //挑战
    [/^All Alpha Generators are x(.+) stronger$/, '阿尔法发生器的效果变为$1倍'], //挑战
]);