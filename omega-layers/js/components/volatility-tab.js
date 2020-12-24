Vue.component("volatility-tab", {
    data: function()
    {
        return {
            volatility: game.volatility
        }
    },
    template: `<div class="volatility-tab">
<p class="description">不定性(持续性)可以使更早出现的层级变得不再不定。不再不定的层级永不重置，它们将每秒给予一部分转生奖励。</p>
<div class="upgrades">
    <upgrade :upgrade="volatility.layerVolatility"></upgrade>
    <upgrade :upgrade="volatility.autoMaxAll"></upgrade>
    <upgrade :upgrade="volatility.prestigePerSecond"></upgrade>
</div>
</div>`
});