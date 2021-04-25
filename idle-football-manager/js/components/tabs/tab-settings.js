app.component("tab-settings", {
    data(){
        return {
            saveString: "你的存档会出现在这里。把它放在安全的地方!确保经常备份。\n" +
                "导入存档将读取此文本框的内容。\n" +
                "下载的文件包含要粘贴到此文本框中的内容。",
            settings: game.settings
        };
    },
    methods: {
        restartTutorial(){
            game.restartedTutorial = true;
        },
        exportGame(){
            this.saveString = functions.getSaveString();
        },
        importGame(){
            if(functions.loadGame(this.saveString)){
                game.tab = "tab-team";
            }
            else{
                alert("Error: Save code could not be imported.");
            }
        },
        download(){
            this.saveString = functions.getSaveString();
            let a = document.createElement("a");
            let d = new Date();
            let y = d.getFullYear(), m = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"][d.getMonth()], day = d.getDate();
            a.href = "data:text/plain;charset=utf-8," + this.saveString;
            a.download = "idle-soccer-manager-" + [day, m, y].join("-") + ".txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        hardReset(){
            let t = 3;
            while(t > 0 && confirm("你确定你真的想抹去一切吗?没有奖赏，也没有回头路!点击 " + t + " 次以确认")){
                t--;
            }
            if(t === 0){
                functions.loadGame(initalGame);
                initializeGame();
                functions.saveGame();
                game.tab = "tab-team";
            }
        }
    },
    computed: {
        team(){
            return game.team;
        }
    },
    template: `<div class="tab-settings">
    <h3 class="big-heading">Team Settings</h3>
    <team-settings :team="team"></team-settings>
    <h3 class="big-heading">Game Settings</h3>
    <div class="card flex">
        <div>
            Term shown in Game Header<br/>
            <label><input type="radio" name="term" v-model="settings.term" value="Football"/> Football</label>
            <label><input type="radio" name="term" v-model="settings.term" value="Soccer"/> Soccer</label><br/>
        </div>
        <div>   
            <label>Match Autoplay <input type="checkbox" v-model="settings.match.autoPlay"/></label><br/>
            <label>Min Avg. Stamina required <input type="range" min="0" max="1" step="any" v-model.number="settings.match.minAutoPlayStamina"/></label><br/>
            <label>Refill Team after Match <input type="checkbox" v-model="settings.team.refillPlayers"/></label>
            <notation-select></notation-select><br/>
        </div>
        <div>
            <label>Hold Shift to sell Players <input type="checkbox" v-model="settings.players.shiftToSell"/></label><br/>
        </div>
    </div>
    <button @click="restartTutorial()">Restart Tutorial</button><br/>
    <h3 class="big-heading">Save Management</h3>
    <p>Note: The Game does <b>not</b> save if <b>cookies or storage</b> are disabled. Cleaning Utilities might clear Browser Storage.
    It is recommended to export your savegame <b>often</b>.</p>
    <div>
        <div>
            <button @click="exportGame()">Export Game</button>
            <button @click="importGame()">Import Game</button>
            <button @click="download()">Download Savegame</button>
            <button @click="hardReset()">HARD RESET</button>
        </div>
        <textarea v-model="saveString">
        </textarea>
    </div>
    <h3 class="big-heading">Social</h3>
    <a target="_blank" href="https://discord.gg/75d7Jj5" class="icon-flex"><img alt="" src="images/icons/discord.png"/> Join my Discord Server</a>
    <a target="_blank" href="https://cook1eegames.feedia.co" class="icon-flex"><img alt="" src="images/icons/website.png"/> Visit my Website</a>
</div>`
});