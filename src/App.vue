<template>

    <div id="app" :style="{backgroundImage: 'url(' + require('./assets/app-bg.png') + ')'}">
        <div class="inner" :style="{transform: 'scale('+this.scale+')'}">

            <div v-show="status === 'game_in_progress'" class="top-bar">
                <div>
                    <span class="logo">dungeon-671</span>
                    <span><a class="github-link" href="https://github.com/nvzaa/dungeon-671" target="_blank">github</a></span>
                </div>
                <button class="start-new-game" @click="startNewGame()">New game</button>
                <score/>
            </div>

            <board
                v-show="status === 'game_in_progress'"
                :start-new-game="startNewGame"
                :finish-game="finishGame"
                :app-status="status"
            />

        </div>

        <game-over-window
            v-show="status === 'game_over'"
            :start-new-game="startNewGame"
        />

        <div style="display: none">
            <img
                v-for="filename in ['icon-hp.png', 'icon-power.png', 'icon-power-poison.png', 'icon-poison-countdown.png', 'game-over.png', 'enemy-bee.png', 'enemy-scorpion.png', 'enemy-hedgehog.png', 'enemy-spider.png', 'enemy-warrior-1.png', 'enemy-warrior-2.png', 'enemy-mutant.png', 'enemy-green-dragon.png', 'enemy-blue-dragon.png', 'enemy-red-dragon.png', 'weapon-dagger-normal.png', 'weapon-dagger-poisoned.png', 'weapon-sword-normal.png', 'weapon-sword-poisoned.png', 'weapon-axe-normal.png', 'weapon-axe-poisoned.png', 'potion-small.png', 'potion-big.png', 'spikes-single.png', 'spikes-double.png', 'spikes-double-180.png', 'spikes-triple.png', 'bomb-horizontal.png', 'bomb-vertical.png', 'lightning.png', 'shuffle.png', 'chest.png', 'nothing.png']"
                :src="'dist/' + filename"
            >
        </div>

        <help-window
            v-if="showHelpWindow"
            @help-message-was-read="showHelpWindow = false"
        />
    </div>

</template>

<script>
    import Board from "./components/Board";
    import Score from "./components/Score";
    import GameOverWindow from "./components/GameOverWindow";
    import HelpWindow from "./components/HelpWindow";

    export default {
        components: {
            Board,
            Score,
            GameOverWindow,
            HelpWindow
        },

        data() {
            return {
                status: '',
                scale: 1,
                showHelpWindow: false,
                initBoard: null,
            }
        },

        methods: {
            startNewGame(initBoardFunction = null) {
                if (initBoardFunction) this.initBoard = initBoardFunction

                this.initBoard()
                this.status = 'game_in_progress'
                this.$store.commit('setScoreToZero')
            },

            finishGame() {
                this.status = 'game_over'
                this.$store.commit('updateHighScore')
            }
        },

        created() {
            if (window.innerHeight < 710)
                this.scale = window.innerHeight / 710

            this.showHelpWindow = !localStorage.helpMessageWasRead
        }
    }

</script>

<style lang="sass">
    #app
        font-family: "Times New Roman", serif
        font-size: 16px
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        -webkit-touch-callout: none
        -webkit-user-select: none
        -khtml-user-select: none
        -moz-user-select: none
        -ms-user-select: none
        user-select: none

    .top-bar
        display: flex
        align-items: baseline
        justify-content: space-between
        margin: 0 5px
        width: 615px

        .logo
            color: #fff
            font-size: 26px

        .github-link
            color: #fff
            text-decoration: underline
            &:hover
                text-decoration: none

        .start-new-game
            font-family: inherit
            font-size: inherit
            background-color: transparent
            outline: none
            color: #fff
            border: 1px solid #fff
            padding: 3px 8px
            border-radius: 3px
            cursor: pointer
            &:hover
                background-color: #222
</style>
