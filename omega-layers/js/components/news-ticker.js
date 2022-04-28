Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "增量游戏就该有滚动新闻",
                "IGN评分: 1.79769313e308 / 10",
                "随机数生成器荣誉出品",
                "这有新一点的新闻吗？不不，只有旧闻……",
                "本游戏数字上限超过了10↑↑308，祝您好运！",
                "广告虚位以待",
                "ζ完全是假新闻！",
                "有建议欢迎来Discord上提出！",
                "细胞才是线粒体的动力源",
                "\"土豆层级哪去了？！\"————某个大概是猪头娃的家伙",
                "\"想象一下在滚动新闻中引用到你的名字会如何\" - ???",
                "\"纵是至暗时刻，终有情势反转\"————温X顿 丘X尔",
                "给爷死啊，该死的馅饼————PewDiePie",
                `<span style="color: hsl(0, 100%, 50%)">这</span>`
                +` <span style="color: hsl(45, 100%, 50%)">个</span>`
                +` <span style="color: hsl(90, 100%, 50%)">就</span>`
                +` <span style="color: hsl(135, 100%, 50%)">是</span>`
                +` <span style="color: hsl(180, 100%, 50%)">彩</span>`
                +` <span style="color: hsl(225, 100%, 50%)">虹</span>`
                +` <span style="color: hsl(270, 100%, 50%)">哟</span>`,
                "这显然比米伽层级好！————RΨZΞΠ 9 935ΘX",
                "说白了这根本就不是滚动新闻吧喂？",
                "(╯°□°）╯︵ ┻━┻   -   掀桌07",
                "请不要点击右上角的X，这会导致游戏运行不正常的！",
                "来削我呀！",
                "削，还是不削。这是个问题！",
                "这是滚动新闻。我多有创意啊。",
                () =>
                {
                    let res = "";
                    for(let i = 0; i < Math.floor(Math.random() * 6) + 4; i++)
                    {
                        let seed = Date.now() + i;
                        res += Utils.createRandomWord(Math.floor(Math.random() * 10) + 4, seed) + " ";
                    }
                    return res + "-" + Utils.createRandomWord(Math.floor(Math.random() * 3) + 4, Date.now() + 20) + " " + Utils.createRandomWord(Math.floor(Math.random() * 3) + 4, Date.now() + 21);
                },
                () => "此数字为随机生成的 -> " + Math.pow(10, Math.random() * 3.01).toFixed(2) +
                    "。如果它大于1000，说明您的运气相当好！",
                () => `<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">点此直接解锁 ` + PrestigeLayer.getNameForLayer(game.metaLayer.active ? game.metaLayer.layer.add(1).floor() : game.layers.length) + ` 层级[2020年内有效]</a>`,
                () => functions.formatNumber(game.metaLayer.active ? game.metaLayer.getApproxAlpha() : game.layers[0].resource, 2, 0, 1e9) + " α？这数字弱爆了",
                () => "每日箴言: " + Utils.getMOTD()
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length;
        }
    },
    methods: {
        getMessage: function()
        {
            let arr = Array.from(this.messages);
            if(this.messageIndex !== -1)
            {
                arr.splice(this.messageIndex, 1);
            }
            let index = Math.floor(Math.random() * arr.length);
            this.messageIndex = index;
            let element = arr[index];
            this.currentMessage = typeof element === "string" ? element : element();
        }
    },
    mounted: function()
    {
        this.getMessage();
        this.$refs.message.onanimationiteration = e =>
        {
            let anim = this.$refs.message.style.animation.slice();
            this.getMessage();
            this.$refs.message.style.animation = "none";
            void this.$refs.message.offsetWidth; //black magic
            this.$refs.message.style.animation = anim;
            Vue.nextTick(() =>
            {
                if(this.$refs.message.style.animationDuration === "")
                {
                    this.$refs.message.style.animationDuration = this.animationDuration + "s";
                }
            });
        };
    },
    template: `<div class="news-ticker">
    <span ref="message" :style="{'animation-duration': animationDuration + 's'}" v-html="currentMessage"></span>
</div>`
})