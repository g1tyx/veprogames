Vue.component("automator", {
    props: ["automator"],
    computed: {
        isResourceUpgrade: function()
        {
            return this.automator.upgrade instanceof ResourceUpgrade;
        }
    },
    template: `<div class="automator">
<div>
    <h4>{{automator.name}}</h4>
    <p>{{automator.description}}</p>
    <label>生效时间间隔: <input type="number" v-model.number.lazy="automator.desiredInterval" step="0.1"/> 秒</label>
    <label><input type="checkbox" v-model="automator.active"/> 是否生效</label>
</div>
<upgrade :upgrade="automator.upgrade" v-if="!isResourceUpgrade"></upgrade>
<resource-upgrade :upgrade="automator.upgrade" v-else></resource-upgrade>
</div>`
});