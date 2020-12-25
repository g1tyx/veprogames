Vue.component("settings-menu", {
    data: function ()
    {
        return {
            settings: game.settings,
            exportString: "导出的游戏存档会出现在这里。请妥善保管。" +
                " 在此处输入存档代码后，点击导入以导入游戏存档。(译者注：导入前请把这段话删了，否则会导入失败！)",
            themes: [["黑暗", "dark.css"], ["明亮", "light.css"], ["霓虹", "neon.css"], ["暗蓝", "darkblue.css"]]
        }
    },
    mounted: function()
    {
        this.$refs.exportBox.onfocus = e => textBoxFocused = true;
        this.$refs.exportBox.onblur = e => textBoxFocused = false;
    },
    beforeDestroy: function()
    {
        this.$refs.exportBox.onfocus = null;
        this.$refs.exportBox.onblur = null;
    },
    methods: {
        save: () => functions.saveGame(),
        clear: function()
        {
            this.exportString = "";
        },
        download: function()
        {
            this.exportGame();

            let date = new Date();
            let dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(d => d.toString().padStart(2, "0")).join("-") + "-" +
                [date.getHours(), date.getMinutes(), date.getSeconds()].map(d => d.toString().padStart(2, "0")).join("");

            let a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = "data:application/octet-stream;charset=utf-8," + this.exportString;
            a.download = "omega-layers-" + dateString + ".txt";
            a.click();
            document.body.removeChild(a);
        },
        paste: function()
        {
            navigator.permissions.query({name: "clipboard-read"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.readText().then(text =>
                    {
                        this.exportString = text;
                    })
                }
            });
        },
        copy: function()
        {
            navigator.permissions.query({name: "clipboard-write"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.writeText(this.exportString).then(function()
                    {
                        functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "已复制到剪贴板", "images/save.svg"));
                    })
                }
            });
        },
        exportGame: function()
        {
            this.exportString = functions.getSaveString();
        },
        importGame: function()
        {
            let ret = functions.loadGame(this.exportString);
            if(game.settings.notifications)
            {
                if(!ret)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "导入存档时发生错误", "images/save.svg"));
                }
                else if(ret === -1)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "您在做什么……"));
                }
                else
                {
                    functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "游戏存档已导入", "images/save.svg"));
                }
            }
            game.settings.tab = "Layers";
        },
        hardResetGame: () => functions.hardResetGame(),
        setTheme: css => functions.setTheme(css),
        volatilityUnlocked: () => functions.maxLayerUnlocked() >= 2
    },
    template: `<div class="settings">
<div class="settings-panel-container">
    <div class="settings-panel">
        <label>显示所有层级 <input type="checkbox" v-model="settings.showAllLayers"/></label>
        <label>显示层级序号 (&alpha;: #1, &beta;: #2, 依此类推) <input type="checkbox" v-model="settings.showLayerOrdinals"/></label>
    </div>
    <div class="settings-panel">
        <label>只显示最前面的 <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMinLayers"/> 个层级</label>
        <label>只显示最后面的 <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMaxLayers"/> 个层级</label>
    </div>
    <div class="settings-panel">
        <label>最大化所有时总是一次性购买10个 <input type="checkbox" v-model="settings.buyMaxAlways10"/></label>
        <label>对最高的层级不使用最大化所有 <input type="checkbox" v-model="settings.disableBuyMaxOnHighestLayer"/></label>
        <label v-if="volatilityUnlocked()">自动最大化所有 <input type="checkbox" v-model="settings.autoMaxAll"/></label>
        <label>自动转生最高的层级 <input type="checkbox" v-model="settings.autoPrestigeHighestLayer"/></label>
    </div>
    <div class="settings-panel">
        <label>启用资源颜色 <input type="checkbox" v-model="settings.resourceColors"/></label>
        <label>启用资源光亮 <input type="checkbox" v-model="settings.resourceGlow"/></label>
        <label>启用滚动新闻 <input type="checkbox" v-model="settings.newsTicker"/></label>
        <label>启用提示框 <input type="checkbox" v-model="settings.notifications"/></label>
        <label>启用存档提示框 <input type="checkbox" v-model="settings.saveNotifications"/></label>
        <label>启用确认弹出窗口 <input type="checkbox" v-model="settings.confirmations"/></label>
    </div>
    <div class="settings-panel">
        <span>标题显示内容</span><br/>
        <fieldset>
            <label><input type="radio" value="0" v-model.number="settings.titleStyle"/> 无</label><br/>
            <label><input type="radio" value="1" v-model.number="settings.titleStyle"/> 每日箴言</label><br/>
            <label><input type="radio" value="2" v-model.number="settings.titleStyle"/> 当前层级</label>
        </fieldset>
    </div>
    <div class="settings-panel">
        <label>启用离线进度 <input type="checkbox" v-model="settings.offlineProgress"/><br/>(可能需要更多时间载入游戏)</label>
    </div>
</div>
<div class="settings-row">
    <label>游戏主题 <button :class="{selected: settings.theme === t[1]}" v-for="t in themes" @click="setTheme(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <button @click="save()">保存游戏</button>
    <button @click="exportGame()">导出存档</button>
    <button @click="importGame()">导入存档</button>
    <button @click="hardResetGame()">抹除游戏进度</button>
</div>
<div class="settings-row">
    <textarea ref="exportBox" class="export" v-model="exportString"></textarea>
</div>
<div class="settings-row">
    <button @click="copy()">复制到剪贴板</button>
    <button @click="paste()">从剪贴板粘贴</button>
    <button @click="clear()">清空</button>
    <button @click="download()">下载为文本文档</button>
</div>
<div class="settings-row">
    <p>快捷键：按M可在当前层级最大化所有<br/>
    按左右方向键可以切换层级<br/>
    按P可以在当前层级进行转生<br/>
    按选项卡的英文首字母可以选择它(如按L选择层级，按V选择不定性)，按C可以选择成就</p>
</div>
<div class="credits">
    <h4>致谢名单(中文版由by22dgb汉化)</h4>
    <p>灵感来源：hevipelle制作的反物质维度，dan-simon制作的无限层级</p>
    <p>由vue.js和break eternity.js提供的技术支持</p>
</div>
</div>`
})