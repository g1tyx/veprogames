Vue.component("current-challenge", {
    methods: {
        getCurrentChallenge: function()
        {
            return game.currentChallenge;
        },
        getCurrentLayer: function()
        {
            return game.currentChallenge.layer;
        }
    },
    template: `<div class="current-challenge">
<p>您目前进行的是挑战 <layer-colored-text :layer="getCurrentLayer()" v-html="getCurrentChallenge().name"></layer-colored-text>.</p>
<button @click="getCurrentChallenge().leave()">退出挑战</button>
</div>`
})