Vue.component("meta-layer", {
    data: function()
    {
        return {
            metaLayer: game.metaLayer
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    computed: {
        showLayersPS: function()
        {
            return this.metaLayer.getLayersPS().gte(10);
        },
        showPowerers: function()
        {
            return game.restackLayer.upgradeTreeNames.unlockResourcePowerers.apply();
        },
        canMaxAll: function()
        {
            return game.restackLayer.upgradeTreeNames.substractLayers.apply();
        }
    },
    template: `<div class="meta-layer">
<p class="resource">您拥有 {{formatNumber(metaLayer.resource, 2, 0, 1e9)}} <resource-name :layerid="metaLayer.layer.floor()"></resource-name></p>
<p class="resource alpha" v-if="metaLayer.layer.gt(0)">您大概拥有 {{formatNumber(metaLayer.getApproxAlpha(), 2, 0, 1e9)}} <resource-name :layerid="0"></resource-name></p>
<p class="layer">您在层级 {{formatNumber(metaLayer.layer.add(1), 2, 0, 1e12)}}</p>
<p>您的资源倍率每秒变为{{formatNumber(metaLayer.getMultiPS(), 2, 2)}} 倍
<span v-if="showLayersPS"><br/>因此每秒前进 {{formatNumber(metaLayer.getLayersPS(), 2, 2)}} 个层级</span></p>
<button v-if="canMaxAll" @click="metaLayer.maxAll()" class="max-all">最大化所有(M)</button>
<h4>资源倍率</h4>
<upgrade-container :upgrades="metaLayer.multiplierUpgrades"></upgrade-container>
<h4 v-if="showPowerers">资源强化</h4>
<upgrade-container v-if="showPowerers" :upgrades="metaLayer.powerUpgrades"></upgrade-container>
</div>`
})