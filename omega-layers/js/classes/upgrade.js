const UPGRADE_RESOURCE = 0, UPGRADE_GENERATOR = 1, UPGRADE_GENMULTI = 2, UPGRADE_POWERGENERATOR = 3, UPGRADE_PRESTIGEREWARD = 4,
    UPGRADE_RESOURCE_TIMELAYER = 5, UPGRADE_GENERATOR_TIMELAYER = 6, UPGRADE_POWERGENERATOR_TIMELAYER = 7;

const RESOURCE_ALEPH = 0, RESOURCE_LAYERCOINS = 1;

class AbstractUpgrade
{
    constructor(getPrice, getEffect, cfg)
    {
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.cfg = cfg;
        this.level = new Decimal(0);
        this.maxLevel = cfg && cfg.maxLevel ? new Decimal(cfg.maxLevel) : Infinity;
        this.getEffectDisplay = cfg && cfg.getEffectDisplay ? cfg.getEffectDisplay : this.getEffectDisplay;
        this.description = this.getDescription();
        this.requires = cfg && cfg.requires ? cfg.requires : []; //require any of those upgrades
        this.blacklist = cfg && cfg.blacklist ? cfg.blacklist : [];
    }

    getDescription()
    {
        return null;
    }

    currentPrice()
    {
        return this.getPrice(this.level);
    }

    apply()
    {
        return this.getEffect(this.level);
    }

    getEffectDisplay()
    {
        if(this.level.eq(this.maxLevel))
        {
            return "x" + functions.formatNumber(this.apply(), 2, 2);
        }
        return "x" + functions.formatNumber(this.getEffect(this.level), 2, 2) + " → " +
            "x" + functions.formatNumber(this.getEffect(this.level.add(1)), 2, 2);
    }

    getPriceDisplay()
    {
        if(this.level.eq(this.maxLevel))
        {
            return "最大";
        }
        return functions.formatNumber(this.currentPrice(), 2, 0, 1e9);
    }

    isUnlocked()
    {
        if(this.requires.length === 0) return true;
        for(let req of this.requires)
        {
            if(req.level.gt(0))
            {
                return true;
            }
        }
        return false;
    }

    isLocked()
    {
        for(let b of this.blacklist)
        {
            if(b.level.gt(0))
            {
                return true;
            }
        }
        return false;
    }

    setRequirements(requires, blacklist)
    {
        this.requires = requires;
        this.blacklist = blacklist;
    }

    isBuyable()
    {
        return this.isUnlocked() && !this.isLocked();
    }
}

class LayerUpgrade extends AbstractUpgrade
{
    constructor(layerCost, layerBoost, getPrice, getEffect, type, cfg)
    {
        super(getPrice, getEffect, cfg);
        this.layerCost = layerCost; //which resource has to be paid
        this.layerBoost = layerBoost; //which layer it boosts on
        this.type = type;
        this.description = this.getDescription();
    }

    getDescription()
    {
        switch (this.type)
        {
            case UPGRADE_RESOURCE:
                return "增加 " + this.layerBoost.name + " 的产量";
            case UPGRADE_GENERATOR:
            case UPGRADE_POWERGENERATOR:
                let genNames = [];
                let genName = this.type === UPGRADE_GENERATOR ? "发生器" : "能量发生器";
                for(let id of this.cfg.generators)
                {
                    genNames.push(this.layerBoost[this.type === UPGRADE_GENERATOR ? "generators" : "powerGenerators"][id].name);
                }
                return "以下" + genName + "产量增加: " + genNames.join(" 与 ");
            case UPGRADE_GENMULTI:
                return "增加每10级发生器的产量";
            case UPGRADE_PRESTIGEREWARD:
                return "以下层级转生奖励增加: " + this.layerBoost.name;
            case UPGRADE_RESOURCE_TIMELAYER:
                return "根据本次 " + this.layerCost.name + " 经过的时间，增加 " + this.layerBoost.name + " 的产量";
            case UPGRADE_GENERATOR_TIMELAYER:
                return "根据本次 " + this.layerCost.name + " 经过的时间，增加 " + this.layerBoost.name + " 的所有发生器产量";
            case UPGRADE_POWERGENERATOR_TIMELAYER:
                return "根据本次 " + this.layerCost.name + " 经过的时间， " + this.layerBoost.name + " 的所有发生器产量变得更高";
            default:
                return "它可以使其他的东西变得更强。但很遗憾您还不知道它能使什么变得更强 :(";
        }
    }

    // for challenges
    static getPricePower()
    {
        if(game.currentChallenge && game.currentChallenge.effectType === CHALLENGE_EFFECT_PRICES_POWER)
        {
            return game.currentChallenge.applyEffect();
        }
        return new Decimal(1);
    }

    static getEffectPower()
    {
        if(game.currentChallenge && game.currentChallenge.effectType === CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST)
        {
            return game.currentChallenge.applyEffect();
        }
        return game.restackLayer.permUpgrades.upgradeEffects.apply();
    }

    buy()
    {
        if(!this.isBuyable()) return;
        if(this.layerCost.resource.gte(this.currentPrice()) && this.level.lt(this.maxLevel))
        {
            this.layerCost.resource = this.layerCost.resource.sub(this.currentPrice());
            this.level = this.level.add(1);
        }
    }

    buyMax()
    {
        if(!this.isBuyable()) return;
        let oldLvl = new Decimal(this.level);
        this.level = new Decimal(Utils.determineMaxLevel(this.layerCost.resource, this));
        if(this.level.sub(oldLvl).gt(0) && this.level.lt(1e9))
        {
            this.layerCost.resource = this.layerCost.resource.sub(this.getPrice(this.level.sub(1)));
        }
        while(this.currentPrice().lte(this.layerCost.resource) && this.level.lt(1e9) && this.level.lt(this.maxLevel))
        {
            this.buy();
        }
    }
}

class TreeUpgrade extends LayerUpgrade
{
    constructor(layerCost, layerBoost, getPrice, getEffect, type, requires, blacklist, cfg)
    {
        if(!cfg)
        {
            cfg = {};
        }
        cfg = Object.assign(cfg, {requires, blacklist}); //have at least one required, don't have any blacklisted
        super(layerCost, layerBoost, getPrice, getEffect, type, cfg);
    }

    isUnlocked()
    {
        return super.isUnlocked();
    }

    isLocked()
    {
        if(this.layerCost.isNonVolatile())
        {
            return false;
        }
        return super.isLocked();
    }

    isBuyable()
    {
        if(this.layerCost.isNonVolatile()) return true;
        return super.isBuyable();
    }
}

class DynamicLayerUpgrade extends LayerUpgrade
{
    constructor(getCostLayer, getBoostLayer, getDescription, getPrice, getEffect, type, cfg)
    {
        super(null, null, getPrice, getEffect, type, cfg);
        this.getCostLayer = getCostLayer;
        this.getBoostLayer = getBoostLayer;
        this.description = getDescription(this);
    }

    currentCostLayer()
    {
        return game.layers[this.getCostLayer(this.level.toNumber())];
    }

    currentBoostLayer()
    {
        return game.layers[this.getBoostLayer(this.level.toNumber())];
    }

    buy()
    {
        if(!this.currentCostLayer() || !this.isBuyable()) return;
        if(this.currentCostLayer().resource.gte(this.currentPrice()) && this.level.lt(this.maxLevel))
        {
            this.currentCostLayer().resource = this.currentCostLayer().resource.sub(this.currentPrice());
            this.level = this.level.add(1);
        }
    }

    buyMax()
    {
        if(!this.currentCostLayer() || !this.isBuyable()) return;
        let oldLvl = new Decimal(this.level);
        this.level = new Decimal(Utils.determineMaxLevel(this.currentCostLayer().resource, this));
        if(this.level.sub(oldLvl).gt(0) && this.level.lt(1e9))
        {
            this.currentCostLayer().resource = this.currentCostLayer().resource.sub(this.getPrice(this.level.sub(1)));
        }
        while(this.currentPrice().lte(this.currentCostLayer().resource) && this.level.lt(1e9) && this.level.lt(this.maxLevel))
        {
            this.buy();
        }
    }
}

class ResourceUpgrade extends AbstractUpgrade
{
    constructor(description, getPrice, getEffect, resource, cfg)
    {
        super(getPrice, getEffect, cfg);
        this.resource = resource;
        this.description = description;
    }

    getResource()
    {
        switch(this.resource)
        {
            case RESOURCE_ALEPH:
                return game.alephLayer.aleph;
            case RESOURCE_LAYERCOINS:
                return game.restackLayer.layerCoins;
        }
    }

    substractResource(res)
    {
        switch(this.resource)
        {
            case RESOURCE_ALEPH:
                game.alephLayer.aleph = game.alephLayer.aleph.sub(res);
                break;
            case RESOURCE_LAYERCOINS:
                game.restackLayer.layerCoins = game.restackLayer.layerCoins.sub(res);
                break;
        }
    }

    buy()
    {
        if(!this.isBuyable()) return;
        if(this.getResource().gte(this.currentPrice()) && this.level.lt(this.maxLevel))
        {
            this.substractResource(this.currentPrice());
            this.level = this.level.add(1);
        }
    }

    buyMax()
    {
        if(!this.isBuyable()) return;
        let oldLvl = new Decimal(this.level);
        this.level = new Decimal(Utils.determineMaxLevel(this.getResource(), this));
        if(this.level.sub(oldLvl).gt(0) && this.level.lt(1e9))
        {
            this.substractResource(this.getPrice(this.level.sub(1)));
        }
        while(this.currentPrice().lte(this.getResource()) && this.level.lt(1e9) && this.level.lt(this.maxLevel))
        {
            this.buy();
        }
    }
}

class AlephUpgrade extends ResourceUpgrade
{
    constructor(description, getPrice, getEffect, cfg)
    {
        super(description, getPrice, getEffect, RESOURCE_ALEPH, cfg);
    }
}

class RestackLayerUpgrade extends ResourceUpgrade
{
    constructor(description, getPrice, getEffect, cfg)
    {
        super(description, getPrice, getEffect, RESOURCE_LAYERCOINS, cfg);
    }
}

class MetaDynamicLayerUpgrade extends AbstractUpgrade
{
    constructor(description, getLayer, getPrice, getEffect, cfg)
    {
        super(getPrice, getEffect, cfg);
        this.description = description;
        this.getLayer = getLayer;
    }

    currentLayer()
    {
        return this.getLayer(this.level);
    }

    canBuy()
    {
        return this.currentLayer().lt(game.metaLayer.layer) || (this.currentLayer().eq(game.metaLayer.layer) && game.metaLayer.resource.gte(this.currentPrice()));
    }

    buy()
    {
        if(!this.isBuyable()) return;
        let canBuy = this.canBuy();
        if(canBuy)
        {
            game.metaLayer.layer = game.restackLayer.upgradeTreeNames.substractLayers.apply() ? game.metaLayer.layer.sub(this.currentLayer()) : new Decimal(0);
            game.metaLayer.resource = new Decimal(1);
            this.level = this.level.add(1);
        }
    }

    buyMax()
    {
        let oldLvl = this.level;
        this.level = new Decimal(Utils.determineMaxLevel(game.metaLayer.layer, this));
        if(this.level.sub(oldLvl).gt(0) && this.level.lt(1e9))
        {
            game.metaLayer.layer = game.metaLayer.layer.sub(this.getLayer(this.level.sub(1)));
        }
        while(this.currentLayer().lte(game.metaLayer.layer) && this.level.lt(1e9) && this.level.lt(this.maxLevel))
        {
            this.buy();
        }
    }
}

var effectDisplayTemplates = {
    numberStandard: function(digits, prefix = "x", suffix = "")
    {
        return function()
        {
            if(this.level.eq(this.maxLevel))
            {
                return prefix + functions.formatNumber(this.apply(), digits, digits) + suffix;
            }
            return prefix + functions.formatNumber(this.apply(), digits, digits) + suffix + " → "
                + prefix + functions.formatNumber(this.getEffect(this.level.add(1)), digits, digits) + suffix;
        };
    },
    percentStandard: function(digits, prefix = "", suffix = " %", digits1000 = digits)
    {
        return function()
        {
            let thisVal = this.apply().mul(100);
            let nextVal = this.getEffect(this.level.add(1)).mul(100);
            if(this.level.eq(this.maxLevel))
            {
                return prefix + functions.formatNumber(thisVal, digits, digits1000) + suffix;
            }
            return prefix + functions.formatNumber(thisVal, digits, digits1000) + suffix + " → "
                + prefix + functions.formatNumber(nextVal, digits, digits1000) + suffix;
        };
    },
    automator: function()
    {
        return function()
        {
            let thisVal = this.level.eq(0) ? "未生效" : this.apply().toFixed(2) + " 秒";
            let nextVal = this.getEffect(this.level.add(1)).toFixed(2) + " 秒";
            if(this.level.eq(this.maxLevel))
            {
                return thisVal;
            }
            return thisVal + " → " + nextVal;
        }
    }
};