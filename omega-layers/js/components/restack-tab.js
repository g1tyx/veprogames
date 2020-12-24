Vue.component("restack-tab", {
    data: function()
    {
        return {
            restack: game.restackLayer
        }
    },
    computed: {
        showMetaHint: function()
        {
            return this.restack.metaUpgrade.level.gt(0);
        },
        canRestack: function()
        {
            return this.restack.getRestackGain().gt(0);
        },
        isMeta: function()
        {
            return game.metaLayer.active;
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="restack-tab">
<button class="restack-2" @click="restack.restack()" :disabled="!canRestack" v-if="isMeta">+{{formatNumber(restack.getRestackGain(), 2, 0)}} <img alt="LC" class="inline" src="images/layercoin.svg"/></button>
<p>您拥有 <span class="big-number">{{formatNumber(restack.layerCoins, 2, 0)}}</span> <img alt="LC" class="inline" src="images/layercoin.svg"/></p>
<button v-if="!restack.allPermUpgradesBought() && !isMeta" @click="restack.respecPermUpgrades()">洗点: 返还所有花费的 <img alt="LC" class="inline" src="images/layercoin.svg"/>，但进行一次无奖励的重新堆叠</button>
<h4 v-if="!isMeta">永久升级</h4>
<div v-if="!isMeta" class="upgrades">
    <restack-upgrade v-for="(u, i) in restack.permUpgrades" :upgrade="u" :key="i"></restack-upgrade>
</div>
<h4>元升级</h4>
<div class="upgrades">
    <restack-upgrade :upgrade="restack.metaUpgrade"></restack-upgrade>
</div>
<div v-if="isMeta">
    <h4>升级树</h4>
    <button class="respec" @click="restack.respecUpgradeTree()">洗点</button>
    <upgrade-tree v-if="isMeta" :upgrades="restack.upgradeTree"></upgrade-tree>
</div>
<button class="restack" @click="restack.restack()" :disabled="!canRestack" v-if="!isMeta">重新堆叠<br/>+{{formatNumber(restack.getRestackGain(), 2, 0)}} <img alt="LC" class="inline" src="images/layercoin.svg"/></button>
<p v-if="showMetaHint && !restack.canMeta()">先到达 <resource-name :layerid="23"></resource-name> 后再来吧</p>
<button v-if="restack.canMeta() && !isMeta" @click="restack.goMeta()" class="meta">我已经醒悟了。一个新的层级不过就是层级罢了。是时候成为元了。</button>
</div>`
});