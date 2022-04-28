Vue.component("layer-statistics", {
    props: ["layer"],
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        formatTime: s => functions.formatTime(s),
        formatTimesReset: function(t)
        {
            return t.toLocaleString("en-us", {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }
    },
    template: `<div class="layer-statistics">
<p>您拥有 {{formatNumber(layer.resource, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>您总共拥有 {{formatNumber(layer.totalResource, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>您最高拥有过 {{formatNumber(layer.maxResource, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>您在此 <resource-name :layerid="layer.layer"></resource-name> 中经过了 {{formatTime(layer.timeSpent)}}</p>
<p v-if="layer.layer > 0">您已经进行过 {{formatTimesReset(layer.timesReset)}} 次 <resource-name :layerid="layer.layer"></resource-name> 转生</p>
<p v-if="layer.layer > 0 && layer.hasPower()">您拥有 {{formatNumber(layer.power, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name>-能量</p>
</div>`
});