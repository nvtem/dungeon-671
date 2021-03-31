<template>
    <div>
        <div class="help-window">
            <div class="message">
                Welcome! The goal of the game is to live as long as you can. Move the player card with a mouse or keyboard <span style="white-space: nowrap"> (arrows / wasd)</span>
            </div>
            <button class="ok" @click="markHelpMessageAsRead">OK</button>
        </div>
        <div class="help-window-overlay"></div>
    </div>
</template>

<script>
    export default {
        name: "HelpWindow",

        methods: {
            markHelpMessageAsRead() {
                localStorage.helpMessageWasRead = true
                this.$emit('help-message-was-read')
            }
        }
    }
</script>

<style lang="sass" scoped>
    .help-window
        width: 500px
        padding: 30px
        position: fixed
        z-index: 100
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        background-color: #131313
        color: #fff
        border: 1px solid #bfbfbf
        border-radius: 3px
        text-align: center

        .message
            font-size: 18px
            line-height: 1.3

        &-overlay
            z-index: 99
            top: -10000px
            left: -10000px
            position: fixed
            width: 20000px
            height: 20000px
            opacity: .2
            background-color: #fff

        .ok
            background-color: transparent
            font-family: inherit
            font-size: 14px
            display: inline-block
            color: #fff
            border: 1px solid #fff
            padding: 5px 20px
            margin-top: 20px
            border-radius: 3px
            cursor: pointer
            &:hover
                background-color: #222222
</style>
