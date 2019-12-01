<template>
    <div class="game-over-window">
        <div><img :src="require('../assets/game-over.png')" alt=""></div>

        <div class="text">
            Game over! Score: {{$store.state.score}}
        </div>

        <button class="start-new-game" @click="startNewGame()">New game</button>
    </div>
</template>

<script>
    export default {
        name: "GameOverWindow",

        props: ['start-new-game']
    }
</script>

<style lang="sass" scoped>
    .game-over-window
        font-size: 22px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        background-color: #131313
        border: 1px solid #bfbfbf
        border-radius: 3px
        color: #fff
        width: 500px
        height: 350px

        .text
            margin-top: 20px

        .start-new-game
            margin-top: 20px
            background-color: transparent
            font-family: inherit
            font-size: 18px
            display: inline-block
            color: #fff
            border: 1px solid #fff
            padding: 5px 10px
            border-radius: 3px
            cursor: pointer
            &:hover
                background-color: #222
</style>
