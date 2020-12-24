Vue.component("aleph-layer", {
    data: function()
    {
        return {
            aleph: game.alephLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.aleph.getAlephBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.aleph.aleph.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>您拥有 {{formatNumber(aleph.aleph, 2, 2, 1e9)}} <span class="aleph">&aleph;</span></p>
    <p>您可获得 {{formatNumber(aleph.getAlephGain(), 2, 2, 1e9)}} <span class="aleph">&aleph;</span>/s</p>
</div>
<div class="boosts">
    <div v-if="canProduceAleph">
        <p>您最高到达的层级是 <resource-name :layerid="highestLayer()"></resource-name>，因此<span class="aleph">&aleph;</span> 产量增加了 {{formatNumber(aleph.getAlephBoostFromLayer(), 2, 2)}} 倍</p>
    </div>
    <div v-else>
        <p>您需要到达过 <resource-name :layerid="3"></resource-name> 才可以产生 <span class="aleph">&aleph;</span></p>
    </div>
</div>
<div class="tabs">
    <button @click="aleph.maxAll()">最大化所有(M)</button>
</div>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.alephGain"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephGainBonus"></aleph-upgrade>
</div>
<h3>增强升级</h3>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.deltaBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.powerGenerators"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeNoPowerBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.betterBetaFormula"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost2"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeRewards"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.layerExponentialBoost"></aleph-upgrade>
</div>
</div>`
});