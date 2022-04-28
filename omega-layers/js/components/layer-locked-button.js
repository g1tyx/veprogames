Vue.component("layer-locked-button", {
    props: ["layerid"],
    methods: {
        maxLayerUnlocked: () => game.highestLayer
    },
    template: `<button @click="$emit('click')" :disabled="maxLayerUnlocked() < layerid">
    <span v-if="maxLayerUnlocked() < layerid">需要到达 <resource-name :layerid="layerid"></resource-name></span>
    <span v-else><slot></slot></span>
</button>`
})