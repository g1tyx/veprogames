class ReStackLayer
{
    constructor()
    {
        this.layerCoins = new Decimal(0);
        this.timeSpent = 0;
        this.timesReset = 0;
        this.permUpgrades = {
            prestigeGains: new RestackLayerUpgrade("增加所有转生资源的获取数量",
                level => this.getPermUpgradeCost(),
                level => Decimal.pow(128, level), {
                    maxLevel: 1
                }),
            layerExponentialBoostFactorTime: new RestackLayerUpgrade("层级指数因子随着时间而增加",
                level => this.getPermUpgradeCost(),
                level => Math.min(1, this.timeSpent / 28800) * 3 * level.toNumber(), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(4, "+")
                }),
            upgradeEffects: new RestackLayerUpgrade("所有的升级效果变得更好(包括树的升级)",
                level => this.getPermUpgradeCost(),
                level => new Decimal(1).add(level.mul(2)), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            powerGenerators: new RestackLayerUpgrade("所有能量发生器的效果变得更好",
                level => this.getPermUpgradeCost(),
                level => new Decimal(1).add(level.mul(0.15)), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            aleph: new RestackLayerUpgrade("\"增加阿列夫获取数量\"的升级效果变得更好",
                level => this.getPermUpgradeCost(),
                level => 0.005 * level.toNumber(), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "+")
                }),
            layerExponentialBoostFactor: new RestackLayerUpgrade("增加层级指数因子",
                level => this.getPermUpgradeCost(),
                level => level.toNumber(), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(0, "+")
                })
        };
        this.metaUpgrade = new RestackLayerUpgrade("所有层级的资源乘以秒数",
            level => new Decimal(1e10),
            level => 1 + 0.2 * level.toNumber(),{
                maxLevel: 1
            });
        this.upgradeTree = [
            [
                new RestackLayerUpgrade("增加资源倍率",
                    level => new Decimal(1e24),
                    level => Decimal.pow(2, level),{
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(0, "^")
                    })
            ],
            [
                new RestackLayerUpgrade("资源倍率效果变得更好",
                    level => new Decimal(1e50),
                    level => Decimal.pow(4, level),{
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                    }),
                new RestackLayerUpgrade("根据本次重新堆叠经过的时间，使资源倍率升级的效果变得更好",
                level => new Decimal(1e50),
                level => new Decimal(1).add(Decimal.pow(2, level).sub(1).mul(this.timeSpent / 1000)),{
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                    })
            ],
            [
                new RestackLayerUpgrade("解锁资源强化",
                    level => new Decimal(1e150),
                    level => level.gt(0), {
                        maxLevel: 1,
                        getEffectDisplay: function()
                        {
                            return this.level.gt(0) ? "已解锁" : "未解锁";
                        }
                    })
            ],
            [
                new RestackLayerUpgrade("资源强化效果变得更好",
                    level => new Decimal("1e2000"),
                    level => new Decimal(1).add(level.mul(0.1)), {
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                    }),
                new RestackLayerUpgrade("资源倍率效果变得更好",
                    level => new Decimal("1e1500"),
                    level => new Decimal(1).add(level.mul(3)), {
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                    })
            ],
            [
                new RestackLayerUpgrade("购买升级时，您的层级会减去相应数值，而不是进行重置",
                    level => new Decimal("1e10000"),
                    level => level.gt(0), {
                        maxLevel: 1,
                        getEffectDisplay: function()
                        {
                            return this.level.gt(0) ? "已解锁" : "未解锁";
                        }
                    })
            ],
            [
                new RestackLayerUpgrade("资源强化效果变得更好",
                    level => new Decimal("1ee10"),
                    level => new Decimal(1).add(level), {
                        maxLevel: 1
                    }),
                new RestackLayerUpgrade("资源倍率根据其等级，效果变得更好",
                    level => new Decimal("1ee10"),
                    level => new Decimal(1).add(level.mul(0.15)), {
                        maxLevel: 1,
                        getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                    }),
            ]
        ];
        this.upgradeTree[1][0].setRequirements([this.upgradeTree[0][0]], [this.upgradeTree[1][1]]);
        this.upgradeTree[1][1].setRequirements([this.upgradeTree[0][0]], [this.upgradeTree[1][0]]);
        this.upgradeTree[2][0].setRequirements([this.upgradeTree[1][0], this.upgradeTree[1][1]], []);
        this.upgradeTree[3][0].setRequirements([this.upgradeTree[2][0]], [this.upgradeTree[3][1]]);
        this.upgradeTree[3][1].setRequirements([this.upgradeTree[2][0]], [this.upgradeTree[3][0]]);
        this.upgradeTree[4][0].setRequirements([this.upgradeTree[3][0], this.upgradeTree[3][1]], []);
        this.upgradeTree[5][0].setRequirements([this.upgradeTree[4][0]], [this.upgradeTree[5][1]]);
        this.upgradeTree[5][1].setRequirements([this.upgradeTree[4][0]], [this.upgradeTree[5][0]]);
        this.upgradeTreeNames = {
            resourceMultiplier: this.upgradeTree[0][0],
            resourceMultiplierUpgrades: this.upgradeTree[1][0],
            resourceMultiplierUpgradesTime: this.upgradeTree[1][1],
            unlockResourcePowerers: this.upgradeTree[2][0],
            resourceMultiplierUpgrades2: this.upgradeTree[3][1],
            resourcePowerersUpgrades: this.upgradeTree[3][0],
            substractLayers: this.upgradeTree[4][0],
            resourcePowerersStrength: this.upgradeTree[5][0],
            resourceMultipliersLevelScaling: this.upgradeTree[5][1]
        };
    }

    isUnlocked()
    {
        return game.highestLayer >= 9;
    }

    getPermUpgradeCost()
    {
        return Decimal.pow(5, Object.values(this.permUpgrades).filter(u => u.level.gt(0)).length).floor();
    }

    getRestackGain()
    {
        let l = game.metaLayer.active ? game.metaLayer.layer : new Decimal(game.layers.length - 1);
        return l >= 9 ? Decimal.pow(10, l.sub(9).floor()) : new Decimal(0);
    }

    allPermUpgradesBought()
    {
        return Object.values(this.permUpgrades).filter(u => u.level.eq(0)).length === 0;
    }

    respecPermUpgrades()
    {
        if(game.settings.confirmations && (!confirm("您确定要洗点吗？") || this.allPermUpgradesBought()))
        {
            return;
        }
        this.restack(false);
        for(let k of Object.keys(this.permUpgrades))
        {
            if(this.permUpgrades[k].level.gt(0))
            {
                this.permUpgrades[k].level = new Decimal(0);
                this.layerCoins = this.layerCoins.add(this.getPermUpgradeCost());
            }
        }
    }

    respecUpgradeTree()
    {
        if(game.settings.confirmations && !confirm("您确定要洗点吗？您将自动进行一次重新堆叠，而且不会获得任何层级币。"))
        {
            return;
        }
        this.restack(false);
        for(let row of this.upgradeTree)
        {
            for(let upg of row)
            {
                upg.level = new Decimal(0);
            }
        }
    }

    restack(reward = true)
    {
        if(reward && game.settings.confirmations && !confirm("您确定要进行重新堆叠吗？您将失去目前的所有进度以换取层级币。"))
        {
            return;
        }
        if(reward)
        {
            this.layerCoins = this.layerCoins.add(this.getRestackGain());
            this.timesReset++;
        }
        game.currentChallenge = null;
        game.layers = [];
        functions.generateLayer(0);
        game.currentLayer = game.layers[0];
        this.timeSpent = 0;
        if(game.metaLayer.active)
        {
            game.metaLayer.layer = new Decimal(0);
            game.metaLayer.resource = new Decimal(1);
        }
        game.alephLayer = new AlephLayer(); //reset Aleph Layer
        for(let k of Object.keys(game.automators))
        {
            game.automators[k].upgrade.level = new Decimal(0);
        }
        for(let k of Object.keys(game.volatility))
        {
            game.volatility[k].level = new Decimal(0);
        }
    }

    canMeta()
    {
        return game.highestLayer >= 23 && this.metaUpgrade.level.gt(0);
    }

    goMeta()
    {
        this.restack(false);
        game.metaLayer.active = true;
        functions.createNotification(new Notification(NOTIFICATION_SPECIAL, "来生再会……"));
    }

    tick(dt)
    {
        this.timeSpent += dt;
    }

    load(obj)
    {
        this.layerCoins = obj.layerCoins;
        this.timeSpent = obj.timeSpent;
        for(let k of Object.keys(obj.permUpgrades))
        {
            this.permUpgrades[k].level = obj.permUpgrades[k].level;
        }
        this.metaUpgrade.level = obj.metaUpgrade.level;
        if(obj.upgradeTree)
        {
            for(let r = 0; r < obj.upgradeTree.length; r++)
            {
                for(let c = 0; c < obj.upgradeTree[r].length; c++)
                {
                    this.upgradeTree[r][c].level = obj.upgradeTree[r][c].level;
                }
            }
        }
    }
}