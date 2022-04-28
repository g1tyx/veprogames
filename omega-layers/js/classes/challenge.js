var CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST = 0, CHALLENGE_EFFECT_PRICES_POWER = 1, CHALLENGE_EFFECT_GENMULTI = 2,
    CHALLENGE_EFFECT_PRESTIGEREWARD = 3;
var CHALLENGE_REWARD_POWERGENERATORS = 0, CHALLENGE_REWARD_GENMULTI = 1, CHALLENGE_REWARD_PRESTIGEREWARD = 2,
    CHALLENGE_REWARD_GENMULTI_ABS = 3;

class Challenge
{
    constructor(layer, name, getEffect, getReward, effectType, rewardType, goalLayer, goalResource, maxLevel = 10, cfg)
    {
        this.layer = layer;
        this.name = name;
        this.getEffect = getEffect;
        this.getReward = getReward;
        this.effectType = effectType;
        this.rewardType = rewardType;
        this.goalLayer = goalLayer;
        this.goalResource = goalResource;
        this.level = 0;
        this.maxLevel = maxLevel;
        this.cfg = cfg;
    }

    applyEffect()
    {
        return this.getEffect(this.level);
    }

    applyReward()
    {
        return this.getReward(this.level);
    }

    getDescription()
    {
        switch (this.effectType)
        {
            case CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST:
                return "所有升级和简单加成的效果变为原数值\^" + this.applyEffect().toFixed(2);
            case CHALLENGE_EFFECT_PRICES_POWER:
                return "所有能量发生器和升级的价格变为原数值\^" + this.applyEffect().toFixed(2) + "。" +
                    "能量效果变为原数值\^" + this.applyEffect().pow(-1).toFixed(2);
            case CHALLENGE_EFFECT_GENMULTI:
                return "所有发生器倍率变为原数值\^" + this.applyEffect().toFixed(2);
            case CHALLENGE_EFFECT_PRESTIGEREWARD:
                return "所有转生奖励变为原数值\^" + this.applyEffect().toFixed(2);
            default:
                return "奇怪，有什么东西不一样了……"
        }
    }

    getRewardDescription()
    {
        switch (this.rewardType)
        {
            case CHALLENGE_REWARD_POWERGENERATORS:
                return "所有能量发生器的效果变为 " + functions.formatNumber(this.applyReward(), 2, 2) + " 倍";
            case CHALLENGE_REWARD_GENMULTI:
                return "所有发生器倍率每10级增加" + functions.formatNumber(this.applyReward(), 3, 3);
            case CHALLENGE_REWARD_PRESTIGEREWARD:
                return "层级 " + PrestigeLayer.getNameForLayer(this.cfg.layerid) + " 的转生奖励变为 " + functions.formatNumber(this.applyReward(), 2, 2) + " 倍";
            case CHALLENGE_REWARD_GENMULTI_ABS:
                return "阿尔法发生器的效果变为" + functions.formatNumber(this.applyReward(), 2, 2) + " 倍";
            default:
                return "一块蛋糕。"
        }
    }

    resetPreviousLayers()
    {
        for(let i = 0; i < game.layers.length; i++)
        {
            if(game.layers[i].isNonVolatile())
            {
                game.layers[i].resource = new Decimal(0);
                continue;
            }
            if(game.layers[i] === this.layer)
            {
                break;
            }
            game.layers[i].reset();
        }
    }

    getResourceGoal()
    {
        return Decimal.pow(this.goalResource, 1 + 0.2 * this.level);
    }

    canEnter()
    {
        return !game.currentChallenge && this.level < this.maxLevel;
    }

    isCompleted()
    {
        return this.goalLayer.resource.gte(this.getResourceGoal());
    }

    enter()
    {
        if(this.canEnter())
        {
            this.resetPreviousLayers();
            game.currentChallenge = this;
        }
    }

    leave()
    {
        this.resetPreviousLayers();
        game.currentChallenge = null;
    }

    succeed()
    {
        game.currentChallenge = null;
        this.level++;
    }

    tick(dt)
    {
        if(this.goalLayer.resource.gte(this.goalResource))
        {
            this.succeed();
        }
    }
}