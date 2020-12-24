Vue.component("guide-tab", {
    computed: {
        betaUnlocked: () => game.layers.length >= 2 || game.metaLayer.active,
        gammaUnlocked: () => game.layers.length >= 3 || game.metaLayer.active,
        epsilonUnlocked: () => game.layers.length >= 5 || game.metaLayer.active,
        alephUnlocked: () => game.alephLayer.isUnlocked() || game.metaLayer.active,
        restackUnlocked: () => game.restackLayer.isUnlocked() || game.metaLayer.active,
        metaUnlocked: () => game.metaLayer.active
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="guide-tab">
    <guide-item>
        <template v-slot:title>开始吧</template>
        <template v-slot:text>在欧米茄层级中，您的目标是获取资源 (例如 &alpha;)，然后转生以获取更高级的资源。您可以通过购买发生器和升级来达到这个目标。<br/>
        首先，先点击 "+1 &alpha;" 按钮，直到您一共获得了 10 &alpha;。这样您就可以购买发生器 &alpha;<sub>1</sub>了，它会每秒产生 1 &alpha;。继续购买发生器可以提升 &alpha; 产量。</template>
    </guide-item>
    <guide-item>
        <template v-slot:title>导出和导入存档</template>
        <template v-slot:text>在设置菜单中，您可以导出和导入您的存档，以备不时之需。<b>强烈建议您经常导出备份存档</b>。浏览器缓存不一定可靠。如果有需要，您也可以与他人分享存档。</template>
    </guide-item>
    <guide-item>
        <template v-slot:title>发生器</template>
        <template v-slot:text>发生器每秒产生资源或其他发生器。第1个发生器产生资源，第2个发生器产生第1个发生器，第3个发生器产生第2个发生器，依此类推。您需要使用资源来购买发生器</template>
    </guide-item>
    <guide-item>
        <template v-slot:title>升级</template>
        <template v-slot:text>升级可以影响游戏的方方面面。例如，它们可以使发生器效果变得更好，或者使转生奖励变得更多，从而增加资源产量。</template>
    </guide-item>
    <guide-item>
        <template v-slot:title>转生</template>
        <template v-slot:text>当您到达 {{formatNumber(1e24, 2, 0)}} &alpha; 时，您就可以重置目前的进度，然后获得 1 &beta; 了，您可以将它用在不同的地方来加快进度。您可以在 {{formatNumber(1e31, 2, 0)}} &alpha; 时获得第2个 &beta;。</template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>自动器</template>
        <template v-slot:text>只要拥有自动器，您就可以按照喜好来进行自动操作了。例如，可以利用它们来自动转生和最大化层级。您还可以设置一个生效时间间隔，这样可以让它们更晚生效。例如，如果将生效时间间隔设置为3秒，则自动器永远不会在时间间隔小于3秒的情况下生效。</template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>简单加成</template>
        <template v-slot:text>如果您在拥有的资源数量下方看到一条消息，则说明该层级拥有了"简单加成"。简单加成使第一个阿尔法发生器的效果变得更好，从而使数字变得更大。简单加成的数值与您当前拥有的资源数量有关。</template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>能量发生器</template>
        <template v-slot:text>能量发生器跟发生器类似，但它们产生的是能量。能量可以提升其他层级的效果，帮助它们的数字增长到更大！</template>
    </guide-item>
    <guide-item v-if="gammaUnlocked">
        <template v-slot:title>挑战</template>
        <template v-slot:text>通过挑战可以增加产量。当进行挑战时，会对产量造成一定的负面效果，您必须达到特定的目标后才能完成挑战。完成挑战后，您可以获得一定的奖励。</template>
    </guide-item>
    <guide-item v-if="gammaUnlocked">
        <template v-slot:title>不定性</template>
        <template v-slot:text>整天都得手动按转生，您是不是有点烦了？现在您可以使层级不再不定，永不重置了。此后，它们将每秒给予一部分转生奖励。之后，层级还可以自动进行最大化。</template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>阿列夫</template>
        <template v-slot:text>到达过 &delta; 之后，您就可以开始获得阿列夫了，您可以使用它来购买全局生效的升级。在 &delta; 之后，每解锁一个新的层级，阿列夫的获取数量就变为之前的10倍。</template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>层级指数因子</template>
        <template v-slot:text>层级指数因子决定了两个层级之间的指数差异。例如，如果层级指数因子为22，一个层级上的简单加成为e10倍，则下一个层级的简单加成变为e220倍，下两个层级的简单加成变为e4840倍，依此类推。<br/>
        层级指数因子为24时，则是: e10倍，e240倍，e5760倍，依此类推……<br/>
        层级指数因子为30时，则是: e10倍，e300倍，e9000倍，依此类推……<br/>
        它几乎对所有相关参数都有效，例如特定的挑战奖励，升级效果及能量加成等。</template>
    </guide-item>
    <guide-item v-if="epsilonUnlocked">
        <template v-slot:title>升级树</template>
        <template v-slot:text>升级树提供跟时间有关的升级。您只能从多条路径中选择一条，但您可以在洗点后重新选择一条。请注意，洗点不会返还任何资源！自动器不会选择路径，所以您需要手动先选择一条，然后自动器才会生效。</template>
    </guide-item>
    <guide-item v-if="restackUnlocked">
        <template v-slot:title>重新堆叠</template>
        <template v-slot:text>解锁 &kappa; 以后，您就可以进行重新堆叠了。这将重置之前的所有进度，但您可以获得层级币，您可以用它来购买一些强大的升级。如果您觉得自己选择了错误的永久升级路径，您可以进行洗点。洗点后将全额返还所有层级币，但您将自动进行一次无奖励的重新堆叠。每解锁一个新的层级，层级币获取数量就变为之前的10倍。</template>
    </guide-item>
    <guide-item v-if="metaUnlocked">
        <template v-slot:title>元</template>
        <template v-slot:text>您已经从层级的幻梦中苏醒过来，现在对您来说，一个新的层级不过就是层级罢了。您现在可以购买增加资源倍率的升级了，它们可以使您更快地提升层级。重新堆叠仍然有效，请注意这一点！同时也出现了一个新的升级树。</template>
    </guide-item>
</div>`
})