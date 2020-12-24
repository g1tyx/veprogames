var game = {
    version: "1.0",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    automators: {
        autoMaxAll: new Automator("自动最大化所有", "在所有层级上自动最大化所有", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 3) + 1, () => null, () => "减少自动器的生效时间间隔",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("自动转生", "在所有层级上自动转生", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2) + 2, () => null, () => "减少自动器的生效时间间隔",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("自动阿列夫", "自动最大化所有阿列夫升级", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "减少自动器的生效时间间隔",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "使下一层不再不定";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    let val1 = this.level.eq(0) ? "无" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    let val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "增加每秒获得的转生奖励",
            function(level)
            {
                let max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.1 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "使下一层每个时刻自动最大化";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    let val1 = this.level.eq(0) ? "无" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    let val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    achievements: [
        new Achievement("启程出发", "到达 10 α", "α", () => game.layers[0] && game.layers[0].resource.gt(10)),
        new Achievement("放置之始", "拥有1个 <span>α<sub>1</sub></span> 发生器", "<span>α<sub>1</sub></span>", () => game.layers[0] && game.layers[0].generators[0].bought.gt(0)),
        new Achievement("多项式增长", "拥有1个 <span>α<sub>2</sub></span> 发生器", "<span>α<sub>2</sub></span>", () => game.layers[0] && game.layers[0].generators[1].bought.gt(0)),
        new Achievement("还是多项式增长", "拥有1个 <span>α<sub>3</sub></span> 发生器", "<span>α<sub>3</sub></span>", () => game.layers[0] && game.layers[0].generators[2].bought.gt(0)),
        new Achievement("发生器方形", "拥有1个 <span>α<sub>4</sub></span> 发生器", "<span>α<sub>4</sub></span>", () => game.layers[0] && game.layers[0].generators[3].bought.gt(0)),
        new Achievement("发生器五方", "拥有1个 <span>α<sub>5</sub></span> 发生器", "<span>α<sub>5</sub></span>", () => game.layers[0] && game.layers[0].generators[4].bought.gt(0)),
        new Achievement("我是六号", "拥有1个 <span>α<sub>6</sub></span> 发生器", "<span>α<sub>6</sub></span>", () => game.layers[0] && game.layers[0].generators[5].bought.gt(0)),
        new Achievement("第七天堂", "拥有1个 <span>α<sub>7</sub></span> 发生器", "<span>α<sub>7</sub></span>", () => game.layers[0] && game.layers[0].generators[6].bought.gt(0)),
        new Achievement("八核", "拥有1个 <span>α<sub>8</sub></span> 发生器", "<span>α<sub>8</sub></span>", () => game.layers[0] && game.layers[0].generators[7].bought.gt(0)),
        new Achievement("优质升级", "首次购买升级", "<span>α<sub>UP</sub></span>", () => game.layers[0] && game.layers[0].upgrades[0].level.gt(0)),
        new Achievement("储备丰富", "到达 1e18 α", "α", () => game.layers[0] && game.layers[0].resource.gte(1e18)),
        new Achievement("来生再会", "到达 β", "β", () => game.layers[1] && game.layers[1].timesReset > 0),
        new Achievement("能量爆发", "拥有1个 <span>β<sub>P<sub>1</sub></sub></span> 发生器", "<span>β<sub>P<sub>1</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[0].bought.gt(0)),
        new Achievement("多项式能量", "拥有1个 <span>β<sub>P<sub>2</sub></sub></span> 发生器", "<span>β<sub>P<sub>2</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[1].bought.gt(0)),
        new Achievement("数以千计", "拥有超过1000个 <span>α<sub>1</sub></span> 发生器", "<span>α<sub>1</sub></span>", () => game.layers[0] && game.layers[0].generators[0].bought.gte(1000)),
        new Achievement("来生已至", "到达10次 β", "β", () => game.layers[1] && game.layers[1].timesReset >= 10),
        new Achievement("自动运转！", "激活 \"最大化所有\" 自动器", "<img src=\"images/hardware-chip.svg\" alt=\"A\">", () => game.automators.autoMaxAll.upgrade.level.gte(1)),
        new Achievement("数值爆炸", "到达 1e6 β", "β", () => game.layers[1] && game.layers[1].resource.gte(1e6)),
        new Achievement("巨大加成", "到达 1e9 β-能量", "<span>β<sub>P</sub></span>", () => game.layers[1] && game.layers[1].power.gte(1e9)),
        new Achievement("能量方形", "拥有1个 <span>β<sub>P<sub>4</sub></sub></span> 发生器", "<span>β<sub>P<sub>4</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[3].bought.gt(0)),
        new Achievement("又来一层？！", "到达 1e20 β", "β", () => game.layers[1] && game.layers[1].resource.gte(1e20)),
        new Achievement("来生……再再会", "到达 γ", "γ", () => game.layers[2] && game.layers[2].timesReset > 0),
        new Achievement("γ的能量", "拥有1个 <span>γ<sub>P<sub>1</sub></sub></span> 发生器", "<span>γ<sub>P<sub>1</sub></sub></span>", () => game.layers[2] && game.layers[2].powerGenerators[0].bought.gt(0)),
        new Achievement("真实时间", "到达42次 γ", "γ", () => game.layers[2] && game.layers[2].timesReset >= 42),
        new Achievement("伽马既涨，加成当附", "到达 1e6 γ", "γ", () => game.layers[2] && game.layers[2].resource.gte(1e6)),
        new Achievement("巨额数字", "到达 1e100000 α", "α", () => game.layers[0] && game.layers[0].resource.gte("1e100000")),
        new Achievement("挑战，就这？", "至少完成一次y-01挑战", "γ", () => game.layers[2] && game.layers[2].challenges[0].level > 0),
        new Achievement("持续性", "使层级α不再不定", '<img src="images/save.svg" alt="S">', () => game.volatility.layerVolatility.level.gt(0)),
        new Achievement("来生……还再会", "到达 δ", "δ", () => game.layers[3] && game.layers[3].timesReset > 0),
        new Achievement("阿列夫-0", "到达 1,000 ℵ", '<span class="aleph">ℵ</span>', () => game.alephLayer.aleph.gte(1000)),
        new Achievement("阿列夫-1", "到达 1e30 ℵ", '<span class="aleph">ℵ</span>', () => game.alephLayer.aleph.gte(1e30)),
        new Achievement("阿列夫-2", "到达 1.8e308 ℵ", '<span class="aleph">ℵ<sub>∞</sub></span>', () => game.alephLayer.aleph.gte(INFINITY)),
        new Achievement("无人值守", "激活自动阿列夫自动器", "<img src=\"images/hardware-chip.svg\" alt=\"A\">", () => game.automators.autoAleph.upgrade.level.gte(1)),
        new Achievement("还有多少层啊？！", "到达 ε", "ε", () => game.layers[4] && game.layers[4].timesReset > 0),
        new Achievement("该停下来了吧！(并不)", "到达 ζ", "ζ", () => game.layers[5] && game.layers[5].timesReset > 0),
        new Achievement("到游戏末期了吗？", "到达 1e1000000000 α", "α", () => game.layers[0] && game.layers[0].resource.gte("1ee9")),
        new Achievement("温度", "到达 θ", "θ", () => game.layers[7] && game.layers[7].timesReset > 0),
        new Achievement("叠出一片新天地！", "进行重新堆叠", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.timesReset > 0),
        new Achievement("半 λ 条 λ 命", "到达 λ", "λ", () => game.layers[10] && game.layers[10].timesReset > 0),
        new Achievement("见者有份", "拥有7800000000层级币", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.layerCoins.gte(7.8e9)),
        new Achievement("层级的存在意义是什么？", "购买元升级", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.metaUpgrade.level.gt(0)),
        new Achievement("醒悟", "到达元", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.metaLayer.active),
        new Achievement("Ω-层级", "到达层级 Ω", "Ω", () => game.metaLayer.layer.gte(47)),
        new Achievement("一秒一个", "每秒前进1个层级", "»", () => game.metaLayer.getLayersPS().gte(1)),
        new Achievement("无尽的阶梯", "到达层级1000", "Ρ↑β", () => game.metaLayer.layer.gte(1000)),
        new Achievement("快到发呆", "每秒前进10个层级", "»»", () => game.metaLayer.getLayersPS().gte(10)),
        new Achievement("层级重置是什么？", "购买第5行的重新堆叠树升级", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.upgradeTreeNames.substractLayers.apply()),
        new Achievement("超越光速", "每秒前进约300e9个层级", "»»»", () => game.metaLayer.getLayersPS().gte(299792458)),
        new Achievement("永不停息", "到达层级1e10", "<span style='font-size: 30%;'><span>Ω<sub>ϝ</sub></span><sup>ρ</sup>↑<span>Ω<sub>ϙ</sub></span><sup>Ν</sup>↑<span>Ω<sub>ϛ</sub></span><sup>κ</sup>↑<span>Ω</span><sup>Σ</sup></span>", () => game.metaLayer.layer.gte(1e10)),
        new Achievement("超越无限", "到达层级约1.8e308", "<span class='flipped-v'>Ω</span>", () => game.metaLayer.layer.gte(INFINITY))
    ],
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: false,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: "dark.css"
    }
};

let initialGame = functions.getSaveString();