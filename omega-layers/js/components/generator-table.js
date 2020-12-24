Vue.component("generator-table",{
    props: ["generators"],
    template: `<table class="generator-table">
    <thead>
        <th>发生器</th>
        <th>数量</th>
        <th>购买</th>
        <th>一次性购买10个</th>
    </thead>
    <generator v-for="(g, i) in generators" :key="i" :generator="g"></generator>
</table>`
});